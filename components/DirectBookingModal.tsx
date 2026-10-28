'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Calendar,
  Car,
  User,
  Phone,
  Mail,
  MapPin,
  Building,
  CheckCircle2,
  CalendarCheck,
  RefreshCw,
  AlertTriangle,
  ArrowRight,
  Shield,
  Clock,
  Link as LinkIcon
} from 'lucide-react';
import {
  FleetVehicle,
  Driver,
  AppSettings,
  OperationalBooking,
  GoogleCalendarAccount
} from '@/types';
import { saveOperationalBooking } from '@/lib/storage';

interface DirectBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  fleet: FleetVehicle[];
  drivers: Driver[];
  settings?: AppSettings;
  initialVehicleId?: string;
  initialDriverId?: string;
  onSaveVehicle?: (v: FleetVehicle) => void;
  onSaveDriver?: (d: Driver) => void;
  onBookingCreated?: (booking: OperationalBooking) => void;
}

export default function DirectBookingModal({
  isOpen,
  onClose,
  fleet,
  drivers,
  settings,
  initialVehicleId,
  initialDriverId,
  onSaveVehicle,
  onSaveDriver,
  onBookingCreated
}: DirectBookingModalProps) {
  // Booking Type: 'internal' (own fleet & chauffeur) vs 'external' (vendor / outsourced)
  const [bookingType, setBookingType] = useState<'internal' | 'external'>('internal');

  // Tour / Service Details
  const [packageName, setPackageName] = useState('');
  const [tourCost, setTourCost] = useState('');
  const [notes, setNotes] = useState('');

  // Client Details
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [paxCount, setPaxCount] = useState('2');

  // Dates & Times
  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [startDate, setStartDate] = useState(todayStr);
  const [endDate, setEndDate] = useState(todayStr);

  // Locations
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [pickupTime, setPickupTime] = useState('09:00');

  // Internal: Vehicle & Driver Selection (Bidirectional Linking)
  const [selectedVehicleId, setSelectedVehicleId] = useState(initialVehicleId || '');
  const [selectedDriverId, setSelectedDriverId] = useState(initialDriverId || '');

  // External / Vendor Details
  const [vendorCompanyName, setVendorCompanyName] = useState('');
  const [vendorContactPerson, setVendorContactPerson] = useState('');
  const [vendorPhone, setVendorPhone] = useState('');
  const [vendorCost, setVendorCost] = useState('');
  const [vendorVehicleDesc, setVendorVehicleDesc] = useState('');
  const [vendorDriverName, setVendorDriverName] = useState('');
  const [vendorDriverPhone, setVendorDriverPhone] = useState('');

  // Google Calendar Integration
  const connectedCalendar: GoogleCalendarAccount | undefined = useMemo(() => {
    return settings?.connectedCalendars?.find((c) => c.isDefault) || settings?.connectedCalendars?.[0];
  }, [settings?.connectedCalendars]);

  const [syncToCalendar, setSyncToCalendar] = useState<boolean>(!!connectedCalendar);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [calendarSyncStatus, setCalendarSyncStatus] = useState<string | null>(null);

  // Initialize or reset when initial props change
  useEffect(() => {
    if (initialVehicleId) {
      setSelectedVehicleId(initialVehicleId);
      const v = fleet.find((item) => item.id === initialVehicleId);
      if (v?.defaultDriverId) {
        setSelectedDriverId(v.defaultDriverId);
      }
    }
  }, [initialVehicleId, fleet]);

  useEffect(() => {
    if (initialDriverId) {
      setSelectedDriverId(initialDriverId);
      const d = drivers.find((item) => item.id === initialDriverId);
      if (d?.defaultVehicleId) {
        setSelectedVehicleId(d.defaultVehicleId);
      }
    }
  }, [initialDriverId, drivers]);

  // Handle vehicle selection with bidirectional auto-selection
  const handleVehicleChange = (vId: string) => {
    setSelectedVehicleId(vId);
    if (vId) {
      const v = fleet.find((item) => item.id === vId);
      if (v?.defaultDriverId) {
        setSelectedDriverId(v.defaultDriverId);
      }
    }
  };

  // Handle driver selection with bidirectional auto-selection
  const handleDriverChange = (dId: string) => {
    setSelectedDriverId(dId);
    if (dId) {
      const d = drivers.find((item) => item.id === dId);
      if (d?.defaultVehicleId) {
        setSelectedVehicleId(d.defaultVehicleId);
      }
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCalendarSyncStatus(null);

    // Validation
    if (!packageName.trim()) {
      setError('Please provide a Tour Package / Service Name.');
      return;
    }
    if (!clientName.trim()) {
      setError('Guest / Client Name is required.');
      return;
    }
    if (!clientPhone.trim()) {
      setError('Client Phone number is required.');
      return;
    }
    if (!startDate || !endDate) {
      setError('Please provide valid Start and End dates.');
      return;
    }
    if (new Date(endDate) < new Date(startDate)) {
      setError('End Date cannot be earlier than Start Date.');
      return;
    }

    if (bookingType === 'external') {
      if (!vendorCompanyName.trim()) {
        setError('Vendor Company Name is required for External Bookings.');
        return;
      }
      if (!vendorPhone.trim()) {
        setError('Vendor Contact Phone is required.');
        return;
      }
    }

    setSubmitting(true);

    try {
      const selectedVehicle = fleet.find((v) => v.id === selectedVehicleId);
      const selectedDriver = drivers.find((d) => d.id === selectedDriverId);

      // 1. Bidirectional Linking: update vehicle and driver records if internal
      if (bookingType === 'internal') {
        if (selectedVehicle && selectedDriverId && selectedVehicle.defaultDriverId !== selectedDriverId) {
          const updatedVehicle: FleetVehicle = {
            ...selectedVehicle,
            defaultDriverId: selectedDriverId,
          };
          onSaveVehicle?.(updatedVehicle);
        }
        if (selectedDriver && selectedVehicleId && selectedDriver.defaultVehicleId !== selectedVehicleId) {
          const updatedDriver: Driver = {
            ...selectedDriver,
            defaultVehicleId: selectedVehicleId,
          };
          onSaveDriver?.(updatedDriver);
        }
      }

      // 2. Generate unique IDs and voucher reference
      const nowIso = new Date().toISOString();
      const currentYear = new Date().getFullYear();
      const randomSeq = Math.floor(1000 + Math.random() * 9000);
      const voucherNo = `DIR-${currentYear}-${randomSeq}`;
      const bookingId = `ob-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

      const vehicleDisplay =
        bookingType === 'internal'
          ? selectedVehicle
            ? `${selectedVehicle.brand} ${selectedVehicle.model} (${selectedVehicle.plateNumber})`
            : 'Internal Vehicle Assigned'
          : vendorVehicleDesc || `${vendorCompanyName} (Vendor Vehicle)`;

      const arrivalDesc = [
        pickupLocation ? `From: ${pickupLocation}` : '',
        dropLocation ? `To: ${dropLocation}` : '',
        pickupTime ? `Time: ${pickupTime}` : '',
      ]
        .filter(Boolean)
        .join(' | ');

      // 3. Construct OperationalBooking
      const newBooking: OperationalBooking = {
        id: bookingId,
        voucherNo,
        itineraryRef: 'DIRECT',
        itineraryId: '',
        tourPackageName: packageName.trim(),
        client: {
          name: clientName.trim(),
          phone: clientPhone.trim(),
          email: clientEmail.trim() || undefined,
        },
        startDate,
        endDate,
        flightOrArrivalDetails: arrivalDesc || undefined,
        tourCost: tourCost ? Number(tourCost) : undefined,
        vehicleDisplay,
        vehicleSource: bookingType === 'internal' ? 'own' : 'outsourced',
        ownVehicleId: bookingType === 'internal' ? selectedVehicleId || undefined : undefined,
        ownDriverId: bookingType === 'internal' ? selectedDriverId || undefined : undefined,
        outsourced:
          bookingType === 'external'
            ? {
                vendorCompanyName: vendorCompanyName.trim(),
                vendorContactNumber: vendorPhone.trim(),
                vendorContactPerson: vendorContactPerson.trim() || undefined,
                rate: vendorCost ? Number(vendorCost) : undefined,
                vehicleDescription: vendorVehicleDesc.trim() || undefined,
                driverName: vendorDriverName.trim() || undefined,
                driverPhone: vendorDriverPhone.trim() || undefined,
                bookingConfirmed: true,
              }
            : undefined,
        dayLocations: [
          { dayNo: 1, date: startDate, place: pickupLocation || 'Pickup Point', overridden: false },
          { dayNo: 2, date: endDate, place: dropLocation || 'Drop-off Point', overridden: false },
        ],
        reminders: [
          {
            id: 'rem-' + Math.random().toString(36).substring(2, 9),
            type: 'offset',
            offsetDays: 1,
            calendarAccountIds: connectedCalendar ? [connectedCalendar.id] : [],
            status: 'scheduled',
          },
        ],
        calendarEventIds: [],
        calendarAccountIds: connectedCalendar && syncToCalendar ? [connectedCalendar.id] : [],
        status: 'scheduled',
        createdAt: nowIso,
        updatedAt: nowIso,
      };

      // 4. Save Operational Booking locally and to database
      saveOperationalBooking(newBooking);

      // 5. Google Calendar Sync
      if (syncToCalendar && connectedCalendar) {
        setCalendarSyncStatus('Syncing booking into Google Calendar…');
        try {
          const calRes = await fetch('/api/calendar/sync-all', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              calendarAccount: connectedCalendar,
              bookings: [newBooking],
              itineraries: [],
            }),
          });
          const calData = await calRes.json().catch(() => ({}));
          if (calRes.ok && calData.success) {
            if (Array.isArray(calData.syncedBookings) && calData.syncedBookings.length > 0) {
              const synced = calData.syncedBookings.find((sb: any) => sb.id === newBooking.id);
              if (synced?.calendarEventIds) {
                newBooking.calendarEventIds = synced.calendarEventIds;
                saveOperationalBooking(newBooking);
              }
            }
          }
        } catch (calErr: any) {
          console.warn('Direct Booking Google Calendar sync failed:', calErr);
        }
      }

      onBookingCreated?.(newBooking);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to save direct booking.');
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-[#151521] border border-[#26214F] text-white rounded-2xl shadow-2xl p-4 sm:p-6 overflow-hidden max-h-[92vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#26214F] mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Create Standalone Booking</h2>
              <p className="text-xs text-[#9899A1]">
                Assign fleet vehicles and chauffeurs directly without requiring a full tour itinerary.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-start gap-2 animate-shake">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Booking Type Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Booking Sourcing Type
            </label>
            <div className="grid grid-cols-2 gap-2 bg-[#1e1e2d] p-1 rounded-xl border border-[#26214F]">
              <button
                type="button"
                onClick={() => setBookingType('internal')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${
                  bookingType === 'internal'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Car className="w-4 h-4" />
                <span>Internal (Own Fleet)</span>
              </button>
              <button
                type="button"
                onClick={() => setBookingType('external')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${
                  bookingType === 'external'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Building className="w-4 h-4" />
                <span>External (Vendor / Partner)</span>
              </button>
            </div>
          </div>

          {/* Tour / Service Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Tour Package / Service Description *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Delhi Sightseeing & Airport Drop"
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#26214F]/60 border border-[#26214F] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Agreed Fare / Rate (₹)
              </label>
              <input
                type="number"
                placeholder="e.g. 15000"
                value={tourCost}
                onChange={(e) => setTourCost(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#26214F]/60 border border-[#26214F] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>
          </div>

          {/* Client Details */}
          <div className="p-3.5 bg-[#1b1b28] border border-[#26214F] rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <User className="w-3.5 h-3.5" />
              <span>Guest / Client Details</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-slate-300 mb-1">Client Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Singhal"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-[#26214F]/60 border border-[#26214F] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-300 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-[#26214F]/60 border border-[#26214F] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-300 mb-1">Email (Optional)</label>
                <input
                  type="email"
                  placeholder="guest@example.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-[#26214F]/60 border border-[#26214F] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Dates & Locations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Start / Pickup Date *</label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  if (new Date(endDate) < new Date(e.target.value)) {
                    setEndDate(e.target.value);
                  }
                }}
                className="w-full px-3 py-2 text-xs bg-[#26214F]/60 border border-[#26214F] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">End / Drop Date *</label>
              <input
                type="date"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#26214F]/60 border border-[#26214F] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Pickup Location</label>
              <input
                type="text"
                placeholder="e.g. IGI Airport T3, Delhi"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#26214F]/60 border border-[#26214F] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Drop Location</label>
              <input
                type="text"
                placeholder="e.g. Hotel Taj Palace / Agra"
                value={dropLocation}
                onChange={(e) => setDropLocation(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#26214F]/60 border border-[#26214F] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Pickup Time</label>
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#26214F]/60 border border-[#26214F] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>
          </div>

          {/* INTERNAL SOURCING: Vehicle and Driver with Bidirectional Linking */}
          {bookingType === 'internal' && (
            <div className="p-4 bg-[#1b1b28] border border-amber-500/20 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <Car className="w-4 h-4" />
                  <span>Fleet Vehicle & Driver Assignment</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  <LinkIcon className="w-3 h-3" />
                  <span>Bidirectional Sync Active</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Select Vehicle</label>
                  <select
                    value={selectedVehicleId}
                    onChange={(e) => handleVehicleChange(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#26214F]/70 border border-[#26214F] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  >
                    <option value="">-- Choose Vehicle --</option>
                    {fleet.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.plateNumber} — {v.brand} {v.model} ({v.status})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Select Chauffeur / Driver</label>
                  <select
                    value={selectedDriverId}
                    onChange={(e) => handleDriverChange(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#26214F]/70 border border-[#26214F] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  >
                    <option value="">-- Choose Chauffeur --</option>
                    {drivers.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.phone})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="text-[10px] text-[#9899A1]">
                Assigning a vehicle and driver links them to each other across the fleet registry automatically.
              </p>
            </div>
          )}

          {/* EXTERNAL SOURCING: Vendor Company Details */}
          {bookingType === 'external' && (
            <div className="p-4 bg-[#1b1b28] border border-blue-500/20 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
                <Building className="w-4 h-4" />
                <span>Vendor / Partner Agency Details</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Vendor Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Luxury Travels"
                    value={vendorCompanyName}
                    onChange={(e) => setVendorCompanyName(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-[#26214F]/60 border border-[#26214F] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Contact Person</label>
                  <input
                    type="text"
                    placeholder="e.g. Ramesh Verma"
                    value={vendorContactPerson}
                    onChange={(e) => setVendorContactPerson(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-[#26214F]/60 border border-[#26214F] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Vendor Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 99887 76655"
                    value={vendorPhone}
                    onChange={(e) => setVendorPhone(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-[#26214F]/60 border border-[#26214F] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Vendor Vehicle Model</label>
                  <input
                    type="text"
                    placeholder="e.g. Toyota Innova Crysta (DL 1Z 9820)"
                    value={vendorVehicleDesc}
                    onChange={(e) => setVendorVehicleDesc(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-[#26214F]/60 border border-[#26214F] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">External Driver Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Gurdeep Singh"
                    value={vendorDriverName}
                    onChange={(e) => setVendorDriverName(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-[#26214F]/60 border border-[#26214F] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Vendor Contract Cost (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g. 11000"
                    value={vendorCost}
                    onChange={(e) => setVendorCost(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-[#26214F]/60 border border-[#26214F] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Google Calendar Sync Section */}
          <div className="p-3 bg-[#1e1e2d] border border-[#26214F] rounded-xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <CalendarCheck className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-white">Google Calendar Sync</p>
                <p className="text-[11px] text-[#9899A1]">
                  {connectedCalendar
                    ? `Connected Account: ${connectedCalendar.googleEmail} (${connectedCalendar.label || 'Primary'})`
                    : 'No Google Calendar connected. Connect in Settings to enable direct calendar dispatch.'}
                </p>
              </div>
            </div>

            {connectedCalendar && (
              <label className="flex items-center gap-2 cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={syncToCalendar}
                  onChange={(e) => setSyncToCalendar(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-amber-400 bg-[#151521] border-[#26214F] w-4 h-4"
                />
                <span className="text-xs font-medium text-amber-300">Sync Event</span>
              </label>
            )}
          </div>

          {/* Submit & Cancel Buttons */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 pt-3 border-t border-[#26214F]">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium text-slate-400 hover:text-white transition rounded-xl text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg transition active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>{calendarSyncStatus || 'Confirming Booking…'}</span>
                </>
              ) : (
                <>
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Confirm Direct Booking</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
