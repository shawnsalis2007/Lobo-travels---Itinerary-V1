import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const stateRaw = searchParams.get('state');

  // Handle user cancellation or OAuth error
  if (error) {
    const errorDesc = searchParams.get('error_description') || error;
    return new Response(
      `<!DOCTYPE html>
      <html>
        <head><title>Google Calendar Connection Failed</title></head>
        <body style="font-family:sans-serif;padding:40px;background:#f8fafc;color:#1e293b;text-align:center;">
          <div style="max-width:480px;margin:0 auto;background:#fff;border-radius:16px;padding:32px;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
            <h2 style="color:#e11d48;margin-top:0;">Connection Cancelled or Failed</h2>
            <p style="color:#64748b;font-size:14px;">Google returned the following message:</p>
            <pre style="background:#fee2e2;color:#991b1b;padding:12px;border-radius:8px;font-size:12px;white-space:pre-wrap;">${errorDesc}</pre>
            <a href="/?tab=settings" style="display:inline-block;margin-top:16px;background:#151521;color:#fbbf24;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:13px;">Return to Settings</a>
          </div>
        </body>
      </html>`,
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }

  if (!code) {
    return new Response(
      `<!DOCTYPE html>
      <html>
        <head><title>Missing Code</title></head>
        <body style="font-family:sans-serif;padding:40px;background:#f8fafc;color:#1e293b;text-align:center;">
          <div style="max-width:480px;margin:0 auto;background:#fff;border-radius:16px;padding:32px;">
            <h2 style="color:#e11d48;">Authorization code missing</h2>
            <p><a href="/?tab=settings">Return to Settings</a></p>
          </div>
        </body>
      </html>`,
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }

  // Dynamically resolve redirect URI to match the current deployment domain
  const proto = req.headers.get('x-forwarded-proto') || (req.url.startsWith('https') ? 'https' : 'http');
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host') || 'lobo-travels-itinerary-v1.vercel.app';
  const redirectUri = `${proto}://${host}/api/auth/callback/google`;

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return new Response(
      `<!DOCTYPE html>
      <html>
        <head><title>Configuration Error</title></head>
        <body style="font-family:sans-serif;padding:40px;background:#f8fafc;color:#1e293b;text-align:center;">
          <div style="max-width:480px;margin:0 auto;background:#fff;border-radius:16px;padding:32px;">
            <h2 style="color:#e11d48;">Missing Google OAuth Credentials</h2>
            <p style="color:#64748b;font-size:14px;">NEXT_PUBLIC_GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET is missing from the environment.</p>
            <a href="/?tab=settings">Return to Settings</a>
          </div>
        </body>
      </html>`,
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }

  let label = 'Google Calendar';
  try {
    if (stateRaw) {
      const decoded = JSON.parse(Buffer.from(stateRaw, 'base64url').toString('utf8'));
      if (decoded.label) label = decoded.label;
    }
  } catch {
    // ignore parse error
  }

  try {
    // 1. Exchange authorization code for access & refresh tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok || tokenData.error) {
      const errMsg = tokenData.error_description || tokenData.error || 'Token exchange failed';
      return new Response(
        `<!DOCTYPE html>
        <html>
          <head><title>OAuth Token Exchange Failed</title></head>
          <body style="font-family:sans-serif;padding:40px;background:#f8fafc;color:#1e293b;text-align:center;">
            <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;padding:32px;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
              <h2 style="color:#e11d48;margin-top:0;">Failed to Exchange Token</h2>
              <p style="color:#64748b;font-size:14px;">Google responded with an error during token exchange:</p>
              <pre style="background:#fee2e2;color:#991b1b;padding:12px;border-radius:8px;font-size:12px;white-space:pre-wrap;text-align:left;">${JSON.stringify(tokenData, null, 2)}</pre>
              <p style="font-size:12px;color:#94a3b8;margin-top:12px;">Redirect URI used: <code>${redirectUri}</code></p>
              <a href="/?tab=settings" style="display:inline-block;margin-top:16px;background:#151521;color:#fbbf24;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:13px;">Return to Settings</a>
            </div>
          </body>
        </html>`,
        { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      );
    }

    const accessToken = tokenData.access_token as string;
    const refreshToken = (tokenData.refresh_token as string) || undefined;
    const expiresIn = Number(tokenData.expires_in || 3600);
    const tokenExpiresAt = Date.now() + expiresIn * 1000;

    // 2. Fetch authenticated user's email
    let userEmail = 'unknown@google.com';
    try {
      const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (userRes.ok) {
        const userInfo = await userRes.json();
        if (userInfo.email) userEmail = userInfo.email;
      }
    } catch {
      // fallback
    }

    // 3. Fetch user's calendars list to pick the primary calendar
    let calendarId = 'primary';
    try {
      const calRes = await fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (calRes.ok) {
        const calList = await calRes.json();
        const primary = (calList.items ?? []).find((c: { primary?: boolean; id: string }) => c.primary);
        if (primary?.id) {
          calendarId = primary.id;
        } else if (calList.items?.[0]?.id) {
          calendarId = calList.items[0].id;
        }
      }
    } catch {
      // fallback to primary
    }

    // 4. Construct GoogleCalendarAccount payload
    const accountPayload = {
      id: `gcal-${Date.now()}`,
      label,
      googleEmail: userEmail,
      calendarId,
      isDefault: true,
      connectionStatus: 'connected',
      accessToken,
      refreshToken,
      tokenExpiresAt,
    };

    // 5. Render auto-saving bridge page for popup or direct redirect
    const serializedPayload = JSON.stringify(accountPayload).replace(/</g, '\\u003c');

    return new Response(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>Google Calendar Connected — Lobo Travels</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;background:#0f172a;color:#f8fafc;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;padding:20px;">
          <div style="background:#1e293b;border-radius:20px;padding:36px;max-width:440px;width:100%;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,0.5);border:1px solid #334155;">
            <div style="width:56px;height:56px;border-radius:50%;background:rgba(16,185,129,0.15);color:#10b981;font-size:28px;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">✓</div>
            <h2 style="font-size:20px;font-weight:700;margin:0 0 8px;color:#f8fafc;">Calendar Connected!</h2>
            <p style="color:#94a3b8;font-size:13px;line-height:1.5;margin:0 0 20px;">
              Successfully linked <strong>${userEmail}</strong> with Lobo Travels. Syncing your operational calendars now…
            </p>
            <p style="font-size:12px;color:#64748b;">Redirecting back to dashboard…</p>
          </div>

          <script>
            (function() {
              const account = ${serializedPayload};
              try {
                // Save to localStorage directly
                const SETTINGS_KEY = 'lobo_settings_v1';
                const raw = localStorage.getItem(SETTINGS_KEY);
                let settings = {};
                try {
                  settings = raw ? JSON.parse(raw) : {};
                } catch (e) {
                  settings = {};
                }
                if (!settings || typeof settings !== 'object') {
                  settings = {};
                }

                // Guarantee core settings properties exist to prevent missing-property exceptions
                const defaults = {
                  companyName: 'Lobo Travels',
                  tagline: 'Travel packages, fleet operations, and all travel related solutions.',
                  logoUrl: '/logo.png',
                  phones: ['9811240072', '9891240072', '9312640072'],
                  email: 'info@lobotravels.com',
                  address: 'Shop No. 12, NDMC Market Near CNG Pump, Mandir Marg, New Delhi - 110001',
                  website: 'lobotravels.com',
                  referencePrefix: 'LT-2026-',
                  nextReferenceSequence: 3,
                  voucherTerms: 'Please reconfirm all hotel, sightseeing and transfer arrangements before the start of the tour. Valid government-issued photo ID is mandatory at all hotel check-ins and monument entrances. Chauffeur duty hours: 08:00 AM to 08:00 PM for local transfers except early morning scheduled transfers.',
                  defaultInclusions: [
                    'Private air-conditioned Kia Carens throughout the tour',
                    'Hotel Accommodation - 1 Room with triple occupancy',
                    'Breakfast as per hotel policy',
                    'Sightseeing as per itinerary',
                    'Experienced chauffeur',
                    'Guides in Agra and Jaipur',
                    'Fuel, tolls, parking & applicable taxes',
                    'Driver allowances'
                  ],
                  defaultExclusions: [
                    'Airfare & visa fees',
                    'Monument / attraction entrance fees',
                    'Guides - except where mentioned in the inclusions',
                    'Food & beverages (lunches, dinners, snacks, alcoholic drinks)',
                    'Additional sightseeing / activities not in itinerary',
                    'Travel insurance',
                    'Anything not specifically mentioned under inclusions'
                  ],
                  brandColorPrimary: '#151521',
                  brandColorSecondary: '#26214F',
                  brandColorAccent: '#9899A1'
                };

                settings = Object.assign({}, defaults, settings);
                let cals = Array.isArray(settings.connectedCalendars) ? settings.connectedCalendars : [];

                // Filter out any older duplicate with the same email or calendarId
                cals = cals.filter(function(c) {
                  return c && c.googleEmail !== account.googleEmail && c.calendarId !== account.calendarId;
                });

                // If this is the only calendar, set as default
                if (cals.length === 0) {
                  account.isDefault = true;
                }
                cals.push(account);
                settings.connectedCalendars = cals;
                localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));

                // Also notify window opener if opened in a popup window
                if (window.opener && window.opener !== window) {
                  try {
                    window.opener.postMessage({ type: 'LOBO_GCAL_CONNECTED', account: account }, '*');
                  } catch (e) {}
                  setTimeout(function() { window.close(); }, 800);
                  return;
                }
              } catch (e) {
                console.error('Failed to save to localStorage:', e);
              }

              // Direct navigation fallback
              setTimeout(function() {
                window.location.href = '/?tab=settings&gcal_connected=1';
              }, 600);
            })();
          </script>
        </body>
      </html>`,
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown exception';
    return new Response(
      `<!DOCTYPE html>
      <html>
        <head><title>Google Calendar Error</title></head>
        <body style="font-family:sans-serif;padding:40px;background:#f8fafc;color:#1e293b;text-align:center;">
          <div style="max-width:480px;margin:0 auto;background:#fff;border-radius:16px;padding:32px;">
            <h2 style="color:#e11d48;">Connection Error</h2>
            <p style="color:#64748b;font-size:13px;">${message}</p>
            <a href="/?tab=settings">Return to Settings</a>
          </div>
        </body>
      </html>`,
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }
}
