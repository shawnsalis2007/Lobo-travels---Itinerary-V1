import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { refreshToken } = body;

    if (!refreshToken) {
      return NextResponse.json({ error: 'Missing refreshToken in request body' }, { status: 400 });
    }

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { error: 'Google OAuth credentials not configured on server' },
        { status: 500 }
      );
    }

    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      return NextResponse.json(
        { error: data.error_description || data.error || 'Token refresh failed' },
        { status: res.status || 400 }
      );
    }

    const accessToken = data.access_token as string;
    const expiresIn = Number(data.expires_in || 3600);
    const tokenExpiresAt = Date.now() + expiresIn * 1000;

    return NextResponse.json({
      accessToken,
      tokenExpiresAt,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown exception';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
