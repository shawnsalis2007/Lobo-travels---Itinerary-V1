'use client';
/* global google */
// lib/calendar.ts — Google Calendar integration utilities
// Uses GIS Token Client (implicit grant) — session-based, no refresh token needed
// Scopes: calendar.events (read/write) + calendar.readonly (list calendars)

const SCOPES = [
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/calendar.readonly',
].join(' ');

import { GoogleCalendarAccount, Itinerary, OperationalBooking, CalendarEventRef } from '@/types';

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

// ─── Production OAuth Code Flow ──────────────────────────────────────────────

/**
 * Initiates production OAuth Authorization Code flow via redirect or popup.
 * Scopes: calendar.events, calendar.readonly, userinfo.email.
 * Redirects to /api/auth/callback/google which exchanges code with Google using GOOGLE_CLIENT_SECRET.
 */
export function openGoogleOAuthPopup(
  label: string,
  onConnected: (account: any) => void
): void {
  const width = 500;
  const height = 650;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  const url = `/api/auth/google?label=${encodeURIComponent(label || 'Google Calendar')}`;
  const popup = window.open(
    url,
    'GoogleCalendarOAuth',
    `width=${width},height=${height},left=${left},top=${top},status=no,toolbar=no,menubar=no`
  );

  const handleMessage = (event: MessageEvent) => {
    if (event.data?.type === 'LOBO_GCAL_CONNECTED' && event.data?.account) {
      window.removeEventListener('message', handleMessage);
      onConnected(event.data.account);
    }
  };

  window.addEventListener('message', handleMessage);
}

export function startGoogleOAuthRedirect(label: string): void {
  window.location.href = `/api/auth/google?label=${encodeURIComponent(label || 'Google Calendar')}`;
}

/**
 * Refreshes an expired access token using the backend refresh endpoint.
 */
export async function refreshCalendarAccessToken(refreshToken: string): Promise<{ accessToken: string; tokenExpiresAt: number }> {
  const res = await fetch('/api/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to refresh token');
  }
  return res.json();
}

/**
 * Returns a valid access token for a GoogleCalendarAccount, refreshing it if needed.
 */
export async function getValidAccessToken(account: any): Promise<string | null> {
  if (account.connectionStatus !== 'connected') return null;

  const isExpired = account.tokenExpiresAt ? Date.now() > account.tokenExpiresAt - 60000 : false;
  if (account.accessToken && !isExpired) {
    return account.accessToken;
  }

  if (account.refreshToken) {
    try {
      const refreshed = await refreshCalendarAccessToken(account.refreshToken);
      account.accessToken = refreshed.accessToken;
      account.tokenExpiresAt = refreshed.tokenExpiresAt;
      return refreshed.accessToken;
    } catch (e) {
      console.error('[calendar] Token refresh failed:', e);
      return account.accessToken || null;
    }
  }

  return account.accessToken || null;
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

/**
 * Triggers batch synchronization of existing itineraries and operational booking reminders to Google Calendar.
 */
export async function syncAllItinerariesToCalendar(payload: {
  calendarAccount: GoogleCalendarAccount;
  itineraries: Itinerary[];
  bookings: OperationalBooking[];
}): Promise<{
  success: boolean;
  syncedCount: number;
  totalConsidered: number;
  syncedBookings: { id: string; calendarEventIds: CalendarEventRef[] }[];
  syncedItineraries: { id: string; googleCalendarEventId: string; calendarEventIds: CalendarEventRef[] }[];
  updatedAccessToken?: string;
  tokenExpiresAt?: number;
  message: string;
}> {
  const res = await fetch('/api/calendar/sync-all', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Failed to synchronize items to Google Calendar');
  }

  return data;
}

