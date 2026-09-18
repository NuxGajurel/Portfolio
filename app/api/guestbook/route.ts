import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { isClerkUserAdmin } from '@/lib/admin';

export interface GuestbookReply {
  id: string;
  created_at: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  message: string;
  is_admin?: boolean;
}

export interface GuestbookEntry {
  id: string;
  created_at: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  message: string;
  is_admin?: boolean;
  has_owner_heart?: boolean;
  owner_heart_avatar?: string;
  replies?: GuestbookReply[];
}

export async function GET() {
  try {
    const db = getAdminDb();

    const snapshot = await db
      .collection('guestbook')
      .orderBy('created_at', 'desc')
      .get();

    const entries: GuestbookEntry[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        created_at: data.created_at || new Date().toISOString(),
        user_id: data.user_id || '',
        user_name: data.user_name || 'Anonymous',
        user_avatar: data.user_avatar || '',
        message: data.message || '',
        is_admin: Boolean(data.is_admin),
        has_owner_heart: Boolean(data.has_owner_heart),
        owner_heart_avatar: data.owner_heart_avatar || '',
        replies: Array.isArray(data.replies) ? data.replies : [],
      };
    });

    return NextResponse.json({ entries });
  } catch (error) {
    console.error('[Guestbook GET] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch guestbook entries.' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in to write in the guestbook.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const message = body?.message?.trim();

    if (!message || message.length === 0) {
      return NextResponse.json(
        { error: 'Message cannot be empty.' },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: 'Message is too long (max 500 characters).' },
        { status: 400 }
      );
    }

    const isAdmin = isClerkUserAdmin(clerkUser);

    const userName =
      clerkUser.fullName ||
      clerkUser.username ||
      clerkUser.firstName ||
      clerkUser.emailAddresses[0]?.emailAddress?.split('@')[0] ||
      'Anonymous Visitor';

    const userAvatar = clerkUser.imageUrl || '';

    const db = getAdminDb();
    const newEntryData = {
      created_at: new Date().toISOString(),
      user_id: clerkUser.id,
      user_name: userName,
      user_avatar: userAvatar,
      message,
      is_admin: isAdmin,
      has_owner_heart: false,
      replies: [],
      server_timestamp: FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection('guestbook').add(newEntryData);

    const newEntry: GuestbookEntry = {
      id: docRef.id,
      created_at: newEntryData.created_at,
      user_id: newEntryData.user_id,
      user_name: newEntryData.user_name,
      user_avatar: newEntryData.user_avatar,
      message: newEntryData.message,
      is_admin: isAdmin,
      has_owner_heart: false,
      replies: [],
    };

    return NextResponse.json({ entry: newEntry, success: true });
  } catch (error) {
    console.error('[Guestbook POST] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Server error' },
      { status: 500 }
    );
  }
}
