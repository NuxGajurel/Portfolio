import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { isClerkUserAdmin } from '@/lib/admin';

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
        { error: 'Forbidden. Only the guestbook admin can like comments.' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const entryId = body?.entryId;

    if (!entryId || typeof entryId !== 'string') {
      return NextResponse.json(
        { error: 'Entry ID is required.' },
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

    const currentData = docSnap.data();
    const currentHeart = Boolean(currentData?.has_owner_heart);
    const newHeartState = !currentHeart;
    const ownerAvatar = clerkUser.imageUrl || '/Nuxgajurel.jpg';

    await docRef.update({
      has_owner_heart: newHeartState,
      owner_heart_avatar: newHeartState ? ownerAvatar : null,
    });

    return NextResponse.json({
      success: true,
      entryId,
      has_owner_heart: newHeartState,
      owner_heart_avatar: newHeartState ? ownerAvatar : '',
    });
  } catch (error) {
    console.error('[Guestbook Like POST] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Server error' },
      { status: 500 }
    );
  }
}
