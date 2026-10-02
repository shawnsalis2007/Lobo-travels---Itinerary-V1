'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Calendar,
  CalendarCheck,
  ChevronRight,
  Car,
  User,
  Phone,
  Mail,
  Plane,
  IndianRupee,
  Loader2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { Itinerary, AppSettings, OperationalBooking, BookingDayLocation, GoogleCalendarAccount } from '@/types';
import { saveOperationalBooking } from '@/lib/storage';
import { formatDateDMY } from '@/lib/utils';

// ── helpers ──────────────────────────────────────────────────────────────────

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

function calcEndDate(startDate: string, daysCount: number): string {
  // end = start + (daysCount - 1) so a 5-day tour ends on day 5
  return addDays(startDate, Math.max(daysCount - 1, 0));
}

interface CreateCalendarEventPayload {
  summary: string;
  description: string;
  start: { date: string };
  end: { date: string };
}

async function createCalendarEvent(
  accessToken: string,
  calendarId: string,
  payload: CreateCalendarEventPayload
): Promise<string> {
  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        summary: payload.summary,
        description: payload.description,
        start: { date: payload.start.date },
        end: { date: payload.end.date },
      }),
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Google Calendar API error: ${err}`);
  }
  const data = await res.json();
  return data.id as string;
}

// ── step indicator ────────────────────────────────────────────────────────────

const STEPS = ['Confirm Details', 'Calendar Sync', 'Done'];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-6">
      {STEPS.map((label, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i < current
                  ? 'bg-amber-500 text-slate-950'
                  : i === current
                  ? 'bg-[#151521] text-amber-300 ring-2 ring-amber-400'
                  : 'bg-slate-200 text-slate-400'
              }`}
            >
              {i < current ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
            </div>
            <span
              className={`text-[10px] font-semibold whitespace-nowrap ${
                i === current ? 'text-[#151521]' : 'text-slate-400'
              }`}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`h-0.5 w-10 mt-[-12px] mx-1 transition-all ${
                i < current ? 'bg-amber-400' : 'bg-slate-200'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ── read-only info row ────────────────────────────────────────────────────────

function InfoRow({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5 py-1.5 border-b border-slate-100 last:border-0">
      {icon && <span className="mt-0.5 text-amber-600 shrink-0">{icon}</span>}
      <span className="text-xs text-slate-500 w-32 shrink-0">{label}</span>
      <span className="text-xs font-semibold text-slate-800 flex-1">{value || '—'}</span>
    </div>
  );
}

// ── props ─────────────────────────────────────────────────────────────────────

interface BookingCreationModalProps {
  itinerary: Itinerary;
  voucherNo: string;
  settings: AppSettings;
  onComplete: (booking: OperationalBooking) => void;
  onDismiss: () => void;
}

// ── modal ─────────────────────────────────────────────────────────────────────

export default function BookingCreationModal({
  itinerary,
  voucherNo,
  settings,
  onComplete,
  onDismiss,
}: BookingCreationModalProps) {
  const needsDates = itinerary.datesNotConfirmed === true || !itinerary.startDate;

  // ── date state ──
  const [bookingStartDate, setBookingStartDate] = useState<string>(
    itinerary.startDate ?? ''
  );
  const [bookingEndDate, setBookingEndDate] = useState<string>(
    itinerary.endDate ?? ''
  );

  // Auto-compute end date whenever start date changes (when dates not confirmed)
  useEffect(() => {
    if (needsDates && bookingStartDate) {
      setBookingEndDate(calcEndDate(bookingStartDate, itinerary.daysCount));
    }
  }, [bookingStartDate, needsDates, itinerary.daysCount]);

  // ── step & booking state ──
  const [step, setStep] = useState(0);
  const [booking, setBooking] = useState<OperationalBooking | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncErrors, setSyncErrors] = useState<string[]>([]);

  // ── calendar selection ──
  const calendars: GoogleCalendarAccount[] = settings.connectedCalendars ?? [];
  const defaultChecked = new Set(
    calendars.filter((c) => c.isDefault).map((c) => c.id)
  );
  const [selectedCalendarIds, setSelectedCalendarIds] = useState<Set<string>>(defaultChecked);

  // ── arrival info from Day 1 ──
  const day1 = itinerary.days.find((d) => d.dayNumber === 1);
  const arrivalInfo =
    day1?.arrivalDetails?.enabled
      ? [
          day1.arrivalDetails.point,
          day1.arrivalDetails.flightOrTrainNumber,
          day1.arrivalDetails.arrivalTime,
        ]
          .filter(Boolean)
          .join(' | ')
      : undefined;

  // ── step 1 → 2: build & save booking ──
  function handleCreateBooking() {
    if (needsDates && !bookingStartDate) return; // validation

    const effectiveStart = bookingStartDate || itinerary.startDate || '';
    const effectiveEnd = bookingEndDate || itinerary.endDate || '';

    const dayLocations: BookingDayLocation[] = itinerary.days.map((day) => ({
      dayNo: day.dayNumber,
      date: day.date,
      place: day.overnightLocation || day.destination,
      overridden: false,
    }));

    const newBooking: OperationalBooking = {
      id: 'bk-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      voucherNo,
      itineraryRef: itinerary.referenceNumber,
      itineraryId: itinerary.id,
      tourPackageName: itinerary.tourName,
      client: {
        name: itinerary.clientName,
        phone: itinerary.clientPhone || undefined,
        email: itinerary.clientEmail || undefined,
      },
      startDate: effectiveStart,
      endDate: effectiveEnd,
      flightOrArrivalDetails: arrivalInfo,
      tourCost: itinerary.totalCost,
      vehicleDisplay: itinerary.vehicleDisplay,
      vehicleSource: 'own',
      dayLocations,
      reminders: [],
      calendarEventIds: [],
      calendarAccountIds: Array.from(selectedCalendarIds),
      status: 'scheduled',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveOperationalBooking(newBooking);
    setBooking(newBooking);
    setStep(1);
  }

  // ── step 2 → 3: calendar sync ──
  async function handleCalendarSync() {
    if (!booking) return;
    setIsSyncing(true);
    setSyncErrors([]);

    const errors: string[] = [];
    const updatedBooking = { ...booking, calendarEventIds: [...booking.calendarEventIds] };

    const selectedCalendars = calendars.filter(
      (c) => selectedCalendarIds.has(c.id)
    );

    for (const calAccount of selectedCalendars) {
      if (calAccount.connectionStatus !== 'connected' || !calAccount.accessToken) continue;
      try {
        const eventId = await createCalendarEvent(
          calAccount.accessToken,
          calAccount.calendarId,
          {
            summary: `[${voucherNo}] ${itinerary.tourName} — ${itinerary.clientName}`,
            description: [
              `Client: ${itinerary.clientName}`,
              itinerary.clientPhone ? `Phone: ${itinerary.clientPhone}` : '',
              itinerary.clientEmail ? `Email: ${itinerary.clientEmail}` : '',
              arrivalInfo ? `Arrival: ${arrivalInfo}` : '',
              `Vehicle: ${itinerary.vehicleDisplay}`,
              `Total Cost: ₹${itinerary.totalCost.toLocaleString()}`,
              '',
              `View booking: ${window.location.origin}?booking=${booking.id}`,
            ]
              .filter(Boolean)
              .join('\n'),
            start: { date: booking.startDate },
            end: { date: addDays(booking.endDate, 1) },
          }
        );
        updatedBooking.calendarEventIds.push({ calendarAccountId: calAccount.id, eventId });
      } catch (e) {
        console.error('Failed to create calendar event for', calAccount.label, e);
        errors.push(`${calAccount.label}: ${e instanceof Error ? e.message : 'Unknown error'}`);
      }
    }

    saveOperationalBooking(updatedBooking);
    setBooking(updatedBooking);
    setIsSyncing(false);
    setSyncErrors(errors);
    setStep(2);
  }

  // skip calendar → go straight to done
  function handleSkipSync() {
    setStep(2);
  }

  // ── toggle calendar checkbox ──
  function toggleCalendar(id: string) {
    setSelectedCalendarIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  // ── event preview text ──
  const previewTitle = `[${voucherNo}] ${itinerary.tourName} — ${itinerary.clientName}`;
  const previewDesc = [
    `Client: ${itinerary.clientName}`,
    itinerary.clientPhone ? `Phone: ${itinerary.clientPhone}` : '',
    arrivalInfo ? `Arrival: ${arrivalInfo}` : '',
    `Vehicle: ${itinerary.vehicleDisplay}`,
  ]
    .filter(Boolean)
    .join('\n');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#151521] px-6 pt-6 pb-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CalendarCheck className="w-5 h-5 text-amber-400" />
                <span className="text-amber-300 font-bold text-sm tracking-wide">Create Operational Booking</span>
              </div>
              <p className="text-slate-400 text-xs">
                Voucher <span className="font-mono text-amber-300 font-semibold">{voucherNo}</span> has been generated.
                Schedule this tour in the reminders system.
              </p>
            </div>
            <button
              onClick={onDismiss}
              className="text-slate-400 hover:text-white transition mt-0.5 shrink-0"
              aria-label="Dismiss"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <StepIndicator current={step} />

          {/* ── STEP 0: Confirm Details ── */}
          {step === 0 && (
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 space-y-0.5">
                <InfoRow icon={<Car className="w-3.5 h-3.5" />} label="Voucher No." value={voucherNo} />
                <InfoRow label="Itinerary Ref" value={itinerary.referenceNumber} />
                <InfoRow label="Tour Package" value={itinerary.tourName} />
                <InfoRow icon={<User className="w-3.5 h-3.5" />} label="Client" value={itinerary.clientName} />
                {itinerary.clientPhone && (
                  <InfoRow icon={<Phone className="w-3.5 h-3.5" />} label="Phone" value={itinerary.clientPhone} />
                )}
                {itinerary.clientEmail && (
                  <InfoRow icon={<Mail className="w-3.5 h-3.5" />} label="Email" value={itinerary.clientEmail} />
                )}
                <InfoRow icon={<Car className="w-3.5 h-3.5" />} label="Vehicle" value={itinerary.vehicleDisplay} />
                <InfoRow
                  icon={<IndianRupee className="w-3.5 h-3.5" />}
                  label="Total Cost"
                  value={`${itinerary.currencySymbol}${itinerary.totalCost.toLocaleString('en-IN')}`}
                />
                {!needsDates && itinerary.startDate && (
                  <InfoRow
                    icon={<Calendar className="w-3.5 h-3.5" />}
                    label="Tour Dates"
                    value={`${formatDateDMY(itinerary.startDate)} → ${formatDateDMY(itinerary.endDate)}`}
                  />
                )}
                {arrivalInfo && (
                  <InfoRow
                    icon={<Plane className="w-3.5 h-3.5" />}
                    label="Flight / Arrival"
                    value={arrivalInfo}
                  />
                )}
              </div>

              {/* Date prompt if dates not confirmed */}
              {needsDates && (
                <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 space-y-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800 font-medium">
                      Tour dates were not confirmed. Please set the start date to schedule this booking:
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Start Date <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={bookingStartDate}
                        onChange={(e) => setBookingStartDate(e.target.value)}
                        className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        End Date (auto)
                      </label>
                      <input
                        type="date"
                        value={bookingEndDate}
                        readOnly
                        className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-500 bg-slate-100 cursor-not-allowed"
                      />
                    </div>
                  </div>
                  {bookingStartDate && bookingEndDate && (
                    <p className="text-[11px] text-slate-500">
                      Computed from {itinerary.daysCount}-day itinerary:{' '}
                      <span className="font-semibold text-slate-700">
                        {formatDateDMY(bookingStartDate)} → {formatDateDMY(bookingEndDate)}
                      </span>
                    </p>
                  )}
                </div>
              )}

              <button
                onClick={handleCreateBooking}
                disabled={needsDates && !bookingStartDate}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold text-sm rounded-xl py-3 transition active:scale-95"
              >
                Create Booking
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ── STEP 1: Calendar Sync ── */}
          {step === 1 && booking && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-bold text-slate-800">Sync to Google Calendar</h3>
              </div>

              {calendars.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center space-y-2">
                  <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-500">
                    No Google Calendars connected. Go to{' '}
                    <span className="font-semibold text-slate-700">Settings → Connected Calendars</span>{' '}
                    to connect one.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {calendars.map((cal) => (
                    <label
                      key={cal.id}
                      className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCalendarIds.has(cal.id)}
                        onChange={() => toggleCalendar(cal.id)}
                        className="w-4 h-4 accent-amber-500 rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-slate-800 truncate">{cal.label}</span>
                          {cal.isDefault && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 font-semibold border border-amber-200">
                              Default
                            </span>
                          )}
                          {cal.connectionStatus !== 'connected' && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-600 font-semibold border border-rose-200">
                              Needs reconnect
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 truncate">{cal.googleEmail}</p>
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {/* Event preview */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-1.5">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Event Preview</p>
                <p className="text-xs font-semibold text-slate-800 leading-snug">{previewTitle}</p>
                <p className="text-[11px] text-slate-500">
                  {formatDateDMY(booking.startDate)} → {formatDateDMY(booking.endDate)}
                </p>
                <p className="text-[11px] text-slate-400 whitespace-pre-line leading-relaxed">
                  {previewDesc}
                </p>
              </div>

              {syncErrors.length > 0 && (
                <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 space-y-1">
                  <p className="text-xs font-semibold text-rose-700">Some syncs failed:</p>
                  {syncErrors.map((e, i) => (
                    <p key={i} className="text-[11px] text-rose-600">{e}</p>
                  ))}
                </div>
              )}

              <button
                onClick={handleCalendarSync}
                disabled={isSyncing || selectedCalendarIds.size === 0 || calendars.length === 0}
                className="w-full flex items-center justify-center gap-2 bg-[#151521] hover:bg-[#1e1c35] disabled:opacity-50 disabled:cursor-not-allowed text-amber-300 font-bold text-sm rounded-xl py-3 transition active:scale-95"
              >
                {isSyncing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Syncing…
                  </>
                ) : (
                  <>
                    <CalendarCheck className="w-4 h-4" />
                    Sync to Calendar
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                onClick={handleSkipSync}
                className="w-full text-center text-xs text-slate-400 hover:text-slate-600 transition py-1 underline underline-offset-2"
              >
                Skip calendar sync
              </button>
            </div>
          )}

          {/* ── STEP 2: Done ── */}
          {step === 2 && booking && (
            <div className="space-y-5 text-center py-2">
              {/* Animated checkmark */}
              <div className="flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-200 flex items-center justify-center animate-[scale-in_0.35s_ease-out]">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900">Booking Created!</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  <span className="font-mono font-semibold text-amber-600">{voucherNo}</span> has been saved to
                  Reminders &amp; Scheduling.{' '}
                  {booking.calendarEventIds.length > 0 &&
                    `Calendar event created in ${booking.calendarEventIds.length} calendar${
                      booking.calendarEventIds.length > 1 ? 's' : ''
                    }.`}
                </p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => onComplete(booking)}
                  className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl py-3 transition active:scale-95"
                >
                  <ExternalLink className="w-4 h-4" />
                  View in Reminders &amp; Scheduling
                </button>
                <button
                  onClick={() => onComplete(booking)}
                  className="w-full text-xs text-slate-400 hover:text-slate-600 transition py-1 underline underline-offset-2"
                >
                  Back to Voucher
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scale-in keyframe (inline style for Tailwind v4 arbitrary animation) */}
      <style>{`
        @keyframes scale-in {
          from { transform: scale(0.5); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
      `}</style>
    </div>
  );
}
