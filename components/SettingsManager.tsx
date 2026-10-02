'use client';

import React, { useState } from 'react';
import { 
  Settings, 
  Save, 
  RotateCcw, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Hash, 
  ShieldCheck, 
  AlertCircle,
  FileText,
  CheckCircle2,
  CalendarClock,
  Star,
  StarOff,
  Wifi,
  WifiOff,
  Plus,
  Trash2
} from 'lucide-react';
import { AppSettings, GoogleCalendarAccount } from '@/types';
import { initGoogleCalendarAuth, listUserCalendars } from '@/lib/calendar';

interface SettingsManagerProps {
  settings: AppSettings;
  onSaveSettings: (settings: AppSettings) => void;
  onResetDefaults: () => void;
}

export default function SettingsManager({
  settings: initialSettings,
  onSaveSettings,
  onResetDefaults
}: SettingsManagerProps) {
  const [formData, setFormData] = useState<AppSettings>(initialSettings);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // ── Calendar connect state ──────────────────────────────────────────────────
  const [showCalendarConnect, setShowCalendarConnect] = useState(false);
  const [calendarConnectLabel, setCalendarConnectLabel] = useState('');
  const [calendarClientId, setCalendarClientId] = useState(() => process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '');
  const [availableCalendars, setAvailableCalendars] = useState<{ id: string; summary: string }[]>([]);
  const [selectedCalendarId, setSelectedCalendarId] = useState('');
  const [connectingCalendar, setConnectingCalendar] = useState(false);
  // Stores the live access token returned by GIS (session-scoped)
  const [pendingAccessToken, setPendingAccessToken] = useState('');
  // Stores the Google email (decoded from token hint or entered by user)
  const [pendingEmail, setPendingEmail] = useState('');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handlePhoneChange = (index: number, val: string) => {
    const updated = [...formData.phones];
    updated[index] = val;
    setFormData({ ...formData, phones: updated });
  };

  const handleAddPhone = () => {
    setFormData({ ...formData, phones: [...formData.phones, ''] });
  };

  const handleRemovePhone = (index: number) => {
    setFormData({ ...formData, phones: formData.phones.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Top Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Settings className="w-5 h-5 text-slate-700" />
            Lobo Travels Company Settings & Configuration
          </h1>
          <p className="text-xs text-slate-500">
            Configure agency details, logo URL, reference number sequencing, and voucher statements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              if (confirm('Reset application data and settings to default seed catalog?')) {
                onResetDefaults();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo DB</span>
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-sm transition"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Company settings and configuration updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Brand & Identity */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            Company Identity & Logo
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Company Name</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          {/* Logo URL & Live Preview */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-semibold text-slate-700">
              Agency Logo Image URL (Used across UI, Itinerary PDF & Voucher)
            </label>
            <input
              type="text"
              value={formData.logoUrl}
              onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono text-xs"
            />
            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 font-medium">Live Logo Preview:</span>
              <div className="h-12 w-28 bg-white p-1 rounded-md border border-slate-200 flex items-center justify-center overflow-hidden">
                <img src={formData.logoUrl} alt="Logo Preview" className="h-full w-full object-contain" />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Coordinates */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            Contact Coordinates (Displayed in Footers)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Official Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Website URL</label>
              <input
                type="text"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-semibold text-slate-700 mb-1">Physical Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg"
            />
          </div>

          {/* Contact Phones */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-700">Telephone / Operations Helplines</label>
              <button
                type="button"
                onClick={handleAddPhone}
                className="text-[11px] font-bold text-indigo-600 hover:underline"
              >
                + Add Phone
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {formData.phones.map((phone, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => handlePhoneChange(idx, e.target.value)}
                    placeholder="9811240072"
                    className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                  />
                  {formData.phones.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePhone(idx)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reference Prefix & Voucher Terms */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            Reference Number Sequencing & Voucher Terms
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Reference Number Prefix (e.g. LT-2026-)
              </label>
              <input
                type="text"
                value={formData.referencePrefix}
                onChange={(e) => setFormData({ ...formData, referencePrefix: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono font-bold text-slate-900"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Next generated record will appear as: {formData.referencePrefix}000X
              </span>
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-semibold text-slate-700 mb-1">
              Travel Voucher Terms & Reconfirmation Statement
            </label>
            <textarea
              rows={3}
              value={formData.voucherTerms}
              onChange={(e) => setFormData({ ...formData, voucherTerms: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg leading-relaxed"
            />
          </div>
        </div>


        {/* ── Connected Google Calendars ──────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          {/* Section header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CalendarClock className="w-4 h-4 text-indigo-500" />
              Connected Google Calendars
            </h2>
            <button
              type="button"
              onClick={() => {
                setShowCalendarConnect((v) => !v);
                setAvailableCalendars([]);
                setSelectedCalendarId('');
                setPendingAccessToken('');
                setPendingEmail('');
                setCalendarConnectLabel('');
                setCalendarClientId(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              Connect Google Calendar
            </button>
          </div>

          {/* Helper note */}
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Connect Google accounts to sync bookings and reminders. Events are created in
            real-time while you&apos;re logged in (session-based). For reminders that fire
            even when the app is closed, a backend OAuth flow is recommended.
          </p>

          {/* ── Connected calendar rows ── */}
          {(formData.connectedCalendars ?? []).length === 0 && (
            <p className="text-xs text-slate-400 italic py-2">No calendars connected yet.</p>
          )}

          <div className="space-y-2">
            {(formData.connectedCalendars ?? []).map((cal, idx) => {
              const others = (formData.connectedCalendars ?? []).filter((_, i) => i !== idx);
              return (
                <div
                  key={cal.id}
                  className="flex flex-wrap items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs"
                >
                  {/* Editable label */}
                  <input
                    type="text"
                    value={cal.label}
                    onChange={(e) => {
                      const updated = (formData.connectedCalendars ?? []).map((c, i) =>
                        i === idx ? { ...c, label: e.target.value } : c,
                      );
                      setFormData({ ...formData, connectedCalendars: updated });
                    }}
                    className="flex-1 min-w-[120px] px-2 py-1 border border-slate-200 rounded-md font-semibold text-slate-800 bg-white"
                    placeholder="Label"
                  />

                  {/* Google email (read-only) */}
                  <span className="text-slate-500 font-mono">{cal.googleEmail}</span>

                  {/* Calendar ID (read-only, truncated) */}
                  <span
                    className="text-slate-400 hidden sm:block truncate max-w-[180px]"
                    title={cal.calendarId}
                  >
                    {cal.calendarId}
                  </span>

                  {/* Status badge */}
                  {cal.connectionStatus === 'connected' ? (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                      <Wifi className="w-3 h-3" /> Connected
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
                      <WifiOff className="w-3 h-3" /> Needs Reconnect
                    </span>
                  )}

                  {/* Set as Default */}
                  <button
                    type="button"
                    title={cal.isDefault ? 'Default calendar' : 'Set as default'}
                    onClick={() => {
                      const updated = (formData.connectedCalendars ?? []).map((c, i) => ({
                        ...c,
                        isDefault: i === idx,
                      }));
                      setFormData({ ...formData, connectedCalendars: updated });
                    }}
                    className="text-amber-400 hover:text-amber-600 transition"
                  >
                    {cal.isDefault ? (
                      <Star className="w-4 h-4 fill-amber-400" />
                    ) : (
                      <StarOff className="w-4 h-4" />
                    )}
                  </button>

                  {/* Disconnect */}
                  <button
                    type="button"
                    title="Disconnect calendar"
                    onClick={() =>
                      setFormData({ ...formData, connectedCalendars: others })
                    }
                    className="text-slate-400 hover:text-rose-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* ── Inline connect panel ── */}
          {showCalendarConnect && (
            <div className="mt-2 p-4 bg-indigo-50 border border-indigo-200 rounded-xl space-y-3 text-xs">
              <p className="font-bold text-indigo-800 text-sm">Connect a Google Account</p>

              {/* GIS script warning */}
              {(typeof window === 'undefined' ||
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                !(window as any)?.google?.accounts?.oauth2) && (
                <div className="p-3 bg-amber-50 border border-amber-300 rounded-lg text-amber-800 text-[11px] leading-relaxed">
                  ⚠️ Google Identity Services not detected. Add{' '}
                  <code className="font-mono bg-amber-100 px-1 rounded">
                    {'<script src="https://accounts.google.com/gsi/client"></script>'}
                  </code>{' '}
                  to your{' '}
                  <code className="font-mono bg-amber-100 px-1 rounded">app/layout.tsx</code>{' '}
                  for calendar connection.
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Label */}
                <div>
                  <label className="block font-semibold text-indigo-900 mb-1">
                    Label (e.g. &quot;Ravi — Dispatch&quot;)
                  </label>
                  <input
                    type="text"
                    value={calendarConnectLabel}
                    onChange={(e) => setCalendarConnectLabel(e.target.value)}
                    placeholder="Ravi — Dispatch"
                    className="w-full px-3 py-2 border border-indigo-200 rounded-lg bg-white text-slate-800"
                  />
                </div>

                {/* Client ID */}
                <div>
                  <label className="block font-semibold text-indigo-900 mb-1">
                    Google OAuth Client ID
                  </label>
                  <input
                    type="text"
                    value={calendarClientId}
                    onChange={(e) => setCalendarClientId(e.target.value)}
                    placeholder="xxxx.apps.googleusercontent.com"
                    className="w-full px-3 py-2 border border-indigo-200 rounded-lg bg-white font-mono text-slate-800"
                  />
                </div>
              </div>

              {/* Google email hint (optional) */}
              {pendingAccessToken && (
                <div>
                  <label className="block font-semibold text-indigo-900 mb-1">
                    Google Account Email (for display)
                  </label>
                  <input
                    type="email"
                    value={pendingEmail}
                    onChange={(e) => setPendingEmail(e.target.value)}
                    placeholder="staff@gmail.com"
                    className="w-full px-3 py-2 border border-indigo-200 rounded-lg bg-white text-slate-800"
                  />
                </div>
              )}

              {/* Step 1 — Authorise button */}
              {!pendingAccessToken && (
                <button
                  type="button"
                  disabled={connectingCalendar || !calendarClientId.trim()}
                  onClick={() => {
                    setConnectingCalendar(true);
                    initGoogleCalendarAuth(calendarClientId.trim(), async (token) => {
                      setPendingAccessToken(token);
                      try {
                        const cals = await listUserCalendars(token);
                        setAvailableCalendars(cals);
                        // Pre-select primary calendar if available
                        const primary = cals.find((c) => c.primary);
                        if (primary) setSelectedCalendarId(primary.id);
                      } catch (err) {
                        console.error('[calendar] listUserCalendars error:', err);
                      } finally {
                        setConnectingCalendar(false);
                      }
                    });
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg transition"
                >
                  {connectingCalendar ? (
                    'Connecting…'
                  ) : (
                    <>
                      <Wifi className="w-3.5 h-3.5" />
                      Authorise with Google
                    </>
                  )}
                </button>
              )}

              {/* Step 2 — Pick calendar + confirm */}
              {pendingAccessToken && availableCalendars.length > 0 && (
                <div className="space-y-3">
                  <div>
                    <label className="block font-semibold text-indigo-900 mb-1">
                      Select Calendar to Sync
                    </label>
                    <select
                      value={selectedCalendarId}
                      onChange={(e) => setSelectedCalendarId(e.target.value)}
                      className="w-full px-3 py-2 border border-indigo-200 rounded-lg bg-white text-slate-800"
                    >
                      <option value="">— Choose a calendar —</option>
                      {availableCalendars.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.summary}
                          {c.id.endsWith('@gmail.com') || c.id === 'primary' ? ' (primary)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={!selectedCalendarId || !calendarConnectLabel.trim()}
                      onClick={() => {
                        const newCal: GoogleCalendarAccount = {
                          id: `gcal-${Date.now()}`,
                          label: calendarConnectLabel.trim() || 'Google Calendar',
                          googleEmail: pendingEmail.trim() || 'unknown@google.com',
                          calendarId: selectedCalendarId,
                          isDefault: (formData.connectedCalendars ?? []).length === 0,
                          connectionStatus: 'connected',
                          accessToken: pendingAccessToken,
                        };
                        setFormData({
                          ...formData,
                          connectedCalendars: [
                            ...(formData.connectedCalendars ?? []),
                            newCal,
                          ],
                        });
                        // Reset panel
                        setShowCalendarConnect(false);
                        setCalendarConnectLabel('');
                        setCalendarClientId(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '');
                        setAvailableCalendars([]);
                        setSelectedCalendarId('');
                        setPendingAccessToken('');
                        setPendingEmail('');
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-lg transition"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Save Calendar Connection
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowCalendarConnect(false);
                        setAvailableCalendars([]);
                        setSelectedCalendarId('');
                        setPendingAccessToken('');
                        setPendingEmail('');
                      }}
                      className="px-3 py-2 text-xs text-slate-500 hover:text-slate-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-sm transition"
          >
            Save All Settings
          </button>
        </div>

      </form>

    </div>
  );
}
