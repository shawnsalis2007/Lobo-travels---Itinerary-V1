'use client';
/* global google */
// lib/calendar.ts — Google Calendar integration utilities
// Uses GIS Token Client (implicit grant) — session-based, no refresh token needed
// Scopes: calendar.events (read/write) + calendar.readonly (list calendars)

const SCOPES = [
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/calendar.readonly',
].join(' ');

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CalendarEventPayload {
  summary: string;          // event title
  description?: string;     // event description
  start: { date: string };  // YYYY-MM-DD (all-day event)
  end: { date: string };    // YYYY-MM-DD (exclusive end — add 1 day to last day)
  colorId?: string;         // Google Calendar color ID
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

/**
 * Initialises a GIS Token Client and immediately requests a token popup.
 * On success, calls `callback` with the raw access_token string.
 * Errors are logged to console and NOT re-thrown (graceful failure).
 */
export function initGoogleCalendarAuth(
  clientId: string,
  callback: (token: string) => void,
): void {
  try {
    if (
      typeof window === 'undefined' ||
      !('google' in window) ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      !(window as any).google?.accounts?.oauth2
    ) {
      console.error('[calendar] GIS script not loaded — cannot init token client.');
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tokenClient = (window as any).google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: SCOPES,
      callback: (response: { access_token?: string; error?: string }) => {
        if (response.error) {
          console.error('[calendar] Token client error:', response.error);
          return;
        }
        if (response.access_token) {
          callback(response.access_token);
        }
      },
    });

    tokenClient.requestAccessToken({ prompt: 'consent' });
  } catch (err) {
    console.error('[calendar] initGoogleCalendarAuth failed:', err);
  }
}

// ─── Calendar List ────────────────────────────────────────────────────────────

/**
 * Lists the Google Calendars visible to the authenticated user.
 * Returns an array of { id, summary, primary? } objects.
 */
export async function listUserCalendars(
  accessToken: string,
): Promise<{ id: string; summary: string; primary?: boolean }[]> {
  const res = await fetch(
    'https://www.googleapis.com/calendar/v3/users/me/calendarList',
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`[calendar] listUserCalendars failed (${res.status}): ${text}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: { items?: any[] } = await res.json();
  return (data.items ?? []).map((item) => ({
    id: item.id as string,
    summary: item.summary as string,
    primary: item.primary as boolean | undefined,
  }));
}

// ─── CRUD ─────────────────────────────────────────────────────────────────────

/**
 * Creates a Google Calendar event and returns the new event's ID.
 */
export async function createCalendarEvent(
  accessToken: string,
  calendarId: string,
  event: CalendarEventPayload,
): Promise<string> {
  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    },
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`[calendar] createCalendarEvent failed (${res.status}): ${text}`);
  }

  const data: { id: string } = await res.json();
  return data.id;
}

/**
 * Patches an existing event's reminders.
 * Replaces all existing overrides with the provided minutesbefore values.
 */
export async function updateCalendarEventReminders(
  accessToken: string,
  calendarId: string,
  eventId: string,
  reminderMinutes: number[],
): Promise<void> {
  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events/${encodeURIComponent(eventId)}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reminders: {
          useDefault: false,
          overrides: reminderMinutes.map((m) => ({ method: 'popup', minutes: m })),
        },
      }),
    },
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `[calendar] updateCalendarEventReminders failed (${res.status}): ${text}`,
    );
  }
}

/**
 * Permanently deletes a Google Calendar event.
 */
export async function deleteCalendarEvent(
  accessToken: string,
  calendarId: string,
  eventId: string,
): Promise<void> {
  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events/${encodeURIComponent(eventId)}`,
    {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );

  // 204 No Content is the expected success response for DELETE
  if (!res.ok && res.status !== 204) {
    const text = await res.text();
    throw new Error(`[calendar] deleteCalendarEvent failed (${res.status}): ${text}`);
  }
}
