import { NextRequest, NextResponse } from 'next/server';
import { extractSessionToken, clearSessionCookie } from '@/lib/auth';
import { deleteDbSession } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const token = extractSessionToken(req);
    if (token) {
      await deleteDbSession(token);
    }

    const res = NextResponse.json({ success: true, message: 'Logged out successfully' });
    res.headers.set('Set-Cookie', clearSessionCookie());
    return res;
  } catch (error: any) {
    console.error('API /api/auth/logout error:', error);
    const res = NextResponse.json({ success: true });
    res.headers.set('Set-Cookie', clearSessionCookie());
    return res;
  }
}
