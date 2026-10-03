import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const label = searchParams.get('label') || 'Google Calendar';
  const mode = searchParams.get('mode') || 'redirect'; // 'redirect' or 'json'

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json(
      { error: 'NEXT_PUBLIC_GOOGLE_CLIENT_ID is not configured in environment variables' },
      { status: 500 }
    );
  }

  // Dynamically resolve redirect URI matching current deployment domain
  const proto = req.headers.get('x-forwarded-proto') || (req.url.startsWith('https') ? 'https' : 'http');
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host') || 'lobo-travels-itinerary-v1.vercel.app';
  const redirectUri = `${proto}://${host}/api/auth/callback/google`;

  const scopes = [
    'https://www.googleapis.com/auth/calendar.events',
    'https://www.googleapis.com/auth/calendar.readonly',
    'https://www.googleapis.com/auth/userinfo.email',
  ];

  const stateObj = {
    label,
    redirectUri,
    timestamp: Date.now(),
  };
  const state = Buffer.from(JSON.stringify(stateObj)).toString('base64url');

  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', scopes.join(' '));
  authUrl.searchParams.set('access_type', 'offline');
  authUrl.searchParams.set('prompt', 'consent');
  authUrl.searchParams.set('state', state);

  if (mode === 'json') {
    return NextResponse.json({ url: authUrl.toString(), redirectUri });
  }

  return NextResponse.redirect(authUrl.toString());
}
