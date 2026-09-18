import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { isClerkUserAdmin } from '@/lib/admin';
import { GuestbookReply } from '../route';

export async function POST(req: Request) {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in.' },
        { status: 401 }
      );
    }

    if (!isClerkUserAdmin(clerkUser)) {
      return NextResponse.json(
        { error: 'Forbidden. Only the guestbook admin can reply to comments.' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const entryId = body?.entryId;
    const message = body?.message?.trim();

    if (!entryId || typeof entryId !== 'string') {
      return NextResponse.json(
        { error: 'Entry ID is required.' },
        { status: 400 }
      );
    }

    if (!message || message.length === 0) {
      return NextResponse.json(
        { error: 'Reply message cannot be empty.' },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: 'Reply message is too long (max 500 characters).' },
        { status: 400 }
      );
    }

    const db = getAdminDb();
    const docRef = db.collection('guestbook').doc(entryId);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json(
        { error: 'Comment not found.' },
        { status: 404 }
      );
    }

    const userName =
      clerkUser.fullName ||
      clerkUser.username ||
      clerkUser.firstName ||
      'Nux Gajurel';

    const userAvatar = clerkUser.imageUrl || '/Nuxgajurel.jpg';

    const newReply: GuestbookReply = {
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      user_id: clerkUser.id,
      user_name: userName,
      user_avatar: userAvatar,
      message,
      is_admin: true,
    };

    await docRef.update({
      replies: FieldValue.arrayUnion(newReply),
    });

    return NextResponse.json({
      success: true,
      entryId,
      reply: newReply,
    });
  } catch (error) {
    console.error('[Guestbook Reply POST] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in.' },
        { status: 401 }
      );
    }

    if (!isClerkUserAdmin(clerkUser)) {
      return NextResponse.json(
        { error: 'Forbidden. Only the guestbook admin can delete replies.' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { entryId, replyId } = body;

    if (!entryId || !replyId) {
      return NextResponse.json(
        { error: 'Entry ID and Reply ID are required.' },
        { status: 400 }
      );
    }

    const db = getAdminDb();
    const docRef = db.collection('guestbook').doc(entryId);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json(
        { error: 'Comment not found.' },
        { status: 404 }
      );
    }

    const data = docSnap.data();
    const existingReplies: GuestbookReply[] = Array.isArray(data?.replies)
      ? data.replies
      : [];

    const updatedReplies = existingReplies.filter((r) => r.id !== replyId);

    await docRef.update({
      replies: updatedReplies,
    });

    return NextResponse.json({
      success: true,
      entryId,
      replyId,
    });
  } catch (error) {
    console.error('[Guestbook Reply DELETE] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Server error' },
      { status: 500 }
    );
  }
}
