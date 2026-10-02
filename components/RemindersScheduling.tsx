'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  MapPin,
  Car,
  User,
  Building2,
  Bell,
  X,
  Plus,
  Check,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Trash2,
  FileText
} from 'lucide-react';
import {
  OperationalBooking,
  FleetVehicle,
  Driver,
  AppSettings,
  Itinerary,
  BookingReminder,
  BookingDayLocation,
  GoogleCalendarAccount
} from '@/types';
import { computeBookingStatus } from '@/lib/storage';
import { updateCalendarEventReminders, deleteCalendarEvent } from '@/lib/calendar';

interface RemindersSchedulingProps {
  bookings: OperationalBooking[];
  fleet: FleetVehicle[];
  drivers: Driver[];
  settings: AppSettings;
  onSaveBooking: (b: OperationalBooking) => void;
  itineraries: Itinerary[];
  onViewVoucher?: (itineraryId: string) => void;
}

// Helper for date stripping
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

const differenceInDays = (d1: Date, d2: Date) => {
  const diffTime = Math.abs(startOfDay(d1).getTime() - startOfDay(d2).getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

function getBookingsForDate(date: Date, bookings: OperationalBooking[]): OperationalBooking[] {
  const targetTime = startOfDay(date).getTime();
  return bookings.filter(b => {
    const s = startOfDay(new Date(b.startDate)).getTime();
    const e = startOfDay(new Date(b.endDate)).getTime();
    return targetTime >= s && targetTime <= e;
  });
}

function getStatusColors(status: string) {
  switch (status) {
    case 'scheduled': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'active': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'completed': return 'bg-gray-100 text-gray-500 border-gray-200';
    case 'cancelled': return 'bg-rose-100 text-rose-400 border-rose-200 line-through';
    default: return 'bg-slate-100 text-slate-700 border-slate-200';
  }
}

export default function RemindersScheduling({
  bookings,
  fleet,
  drivers,
  settings,
  onSaveBooking,
  itineraries,
  onViewVoucher
}: RemindersSchedulingProps) {
  const [activeTab, setActiveTab] = useState<'calendar' | 'timeline'>('calendar');
  const [selectedBooking, setSelectedBooking] = useState<OperationalBooking | null>(null);

  // Drawer interactive states
  const [showAddCustomReminder, setShowAddCustomReminder] = useState(false);
  const [customReminderType, setCustomReminderType] = useState<'offset' | 'custom'>('offset');
  const [customOffsetDays, setCustomOffsetDays] = useState(3);
  const [customDateTime, setCustomDateTime] = useState('');
  const [selectedCalendarToAdd, setSelectedCalendarToAdd] = useState('');
  const [editingLocationDay, setEditingLocationDay] = useState<number | null>(null);
  const [overrideLocationText, setOverrideLocationText] = useState('');
  const [viewingDayLocation, setViewingDayLocation] = useState<number | null>(null);

  // Calendar State
  const [currentMonth, setCurrentMonth] = useState(() => startOfDay(new Date()));

  // Timeline State
  const [rangeStart, setRangeStart] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - d.getDay()); // Start of week (Sunday)
    return startOfDay(d);
  });
  const [rangeEnd, setRangeEnd] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - d.getDay() + 14); // 2 weeks out
    return startOfDay(d);
  });
  const [groupBy, setGroupBy] = useState<'vehicle' | 'driver' | 'voucher'>('vehicle');

  // Drawer Handlers
  const handleBookingClick = (b: OperationalBooking) => {
    setSelectedBooking(b);
  };

  const closeDrawer = () => {
    setSelectedBooking(null);
  };

  const handlePrevMonth = () => {
    const d = new Date(currentMonth);
    d.setMonth(d.getMonth() - 1);
    setCurrentMonth(d);
  };

  const handleNextMonth = () => {
    const d = new Date(currentMonth);
    d.setMonth(d.getMonth() + 1);
    setCurrentMonth(d);
  };

  const handleToday = () => setCurrentMonth(startOfDay(new Date()));

  // ===================== CALENDAR RENDER =====================
  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const todayStr = startOfDay(new Date()).toISOString();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="min-h-[100px] bg-slate-50/50 border border-slate-100" />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const isToday = date.toISOString() === todayStr;
      const dayBookings = getBookingsForDate(date, bookings);

      days.push(
        <div key={`day-${d}`} className={`min-h-[120px] p-2 border border-slate-200 bg-white ${isToday ? 'ring-2 ring-inset ring-amber-400' : ''}`}>
          <div className="text-sm font-semibold text-slate-500 mb-1">{d}</div>
          <div className="space-y-1">
            {dayBookings.slice(0, 2).map((b) => {
              const status = computeBookingStatus(b);
              const colors = getStatusColors(status);
              const isTodayActive = isToday && status === 'active';
              return (
                <div
                  key={b.id}
                  onClick={() => handleBookingClick(b)}
                  className={`text-xs px-1.5 py-1 rounded border cursor-pointer truncate ${colors}`}
                >
                  {isTodayActive && <span className="mr-1">📍</span>}
                  {b.voucherNo} {b.client.name.split(' ')[0]}
                </div>
              );
            })}
            {dayBookings.length > 2 && (
              <div className="text-xs text-slate-400 font-medium px-1">
                +{dayBookings.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full space-y-4">
        <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800">
            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="flex items-center space-x-2">
            <button onClick={handlePrevMonth} className="p-2 rounded hover:bg-slate-100 text-slate-600">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={handleToday} className="px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-sm font-medium text-slate-700">
              Today
            </button>
            <button onClick={handleNextMonth} className="p-2 rounded hover:bg-slate-100 text-slate-600">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px bg-slate-200 rounded-xl overflow-hidden shadow-sm border border-slate-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="bg-slate-50 p-3 text-center text-sm font-medium text-slate-600">
              {day}
            </div>
          ))}
          <div className="col-span-7 grid grid-cols-7 bg-slate-200 gap-px">
            {days}
          </div>
        </div>
      </div>
    );
  };

  // ===================== TIMELINE RENDER =====================
  const renderTimeline = () => {
    // Generate date columns
    const dates: Date[] = [];
    let cur = new Date(rangeStart);
    while (cur <= rangeEnd) {
      dates.push(new Date(cur));
      cur.setDate(cur.getDate() + 1);
    }
    const todayStr = startOfDay(new Date()).toISOString();

    // Generate Resources
    let resources: { id: string; name: string; type: string }[] = [];
    if (groupBy === 'vehicle') {
      resources = fleet.map(v => ({ id: v.id, name: v.plateNumber, type: 'fleet' })).sort((a, b) => a.name.localeCompare(b.name));
      resources.push({ id: 'outsourced-vehicle', name: 'Outsourced Vehicles', type: 'outsourced' });
    } else if (groupBy === 'driver') {
      resources = drivers.map(d => ({ id: d.id, name: d.name, type: 'driver' })).sort((a, b) => a.name.localeCompare(b.name));
      resources.push({ id: 'outsourced-driver', name: 'Outsourced Drivers', type: 'outsourced' });
    } else {
      resources = bookings.map(b => ({ id: b.id, name: b.voucherNo, type: 'voucher' }));
    }

    return (
      <div className="flex flex-col space-y-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200 overflow-hidden h-[calc(100vh-200px)]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center bg-slate-100 p-1 rounded-lg">
            {(['vehicle', 'driver', 'voucher'] as const).map(type => (
              <button
                key={type}
                onClick={() => setGroupBy(type)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-colors ${groupBy === type ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <span className="text-slate-500">From</span>
            <input 
              type="date" 
              value={rangeStart.toISOString().split('T')[0]} 
              onChange={e => setRangeStart(startOfDay(new Date(e.target.value)))}
              className="border border-slate-300 rounded px-2 py-1 text-slate-700"
            />
            <span className="text-slate-500">To</span>
            <input 
              type="date" 
              value={rangeEnd.toISOString().split('T')[0]} 
              onChange={e => setRangeEnd(startOfDay(new Date(e.target.value)))}
              className="border border-slate-300 rounded px-2 py-1 text-slate-700"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto border border-slate-200 rounded-lg">
          <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
            <thead className="sticky top-0 bg-slate-50 z-10 shadow-sm">
              <tr>
                <th className="w-[180px] p-3 text-left font-semibold text-slate-600 border-r border-b border-slate-200 sticky left-0 bg-slate-50 z-20 shadow-[1px_0_0_0_#e2e8f0]">
                  Resource
                </th>
                {dates.map((d, i) => {
                  const isToday = d.toISOString() === todayStr;
                  return (
                    <th key={i} className={`w-[45px] p-2 border-b border-r border-slate-200 text-xs text-center font-medium ${isToday ? 'bg-amber-100 text-amber-800' : 'text-slate-500'}`}>
                      {d.getDate()}/{d.getMonth() + 1}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {resources.map(res => {
                // Filter bookings for this resource
                const resourceBookings = bookings.filter(b => {
                  if (groupBy === 'vehicle') {
                    if (res.type === 'fleet') return b.vehicleSource === 'own' && b.ownVehicleId === res.id;
                    return b.vehicleSource === 'outsourced';
                  } else if (groupBy === 'driver') {
                    if (res.type === 'driver') return b.vehicleSource === 'own' && b.ownDriverId === res.id;
                    return b.vehicleSource === 'outsourced';
                  } else {
                    return b.id === res.id;
                  }
                });

                return (
                  <tr key={res.id} className="group hover:bg-slate-50">
                    <td className="p-3 text-sm font-medium text-slate-700 border-r border-b border-slate-200 sticky left-0 bg-white group-hover:bg-slate-50 shadow-[1px_0_0_0_#e2e8f0] z-10 truncate" title={res.name}>
                      {res.name}
                    </td>
                    {dates.map((d, i) => {
                      const isToday = d.toISOString() === todayStr;
                      const dayBookings = getBookingsForDate(d, resourceBookings);
                      return (
                        <td key={i} className={`p-1 border-r border-b border-slate-200 relative ${isToday ? 'bg-amber-50/30' : ''}`}>
                          {dayBookings.map((b, idx) => {
                            // Only render a bar on the start date or the first day of the range
                            const bStart = startOfDay(new Date(b.startDate));
                            const isStart = bStart.getTime() === d.getTime() || (i === 0 && bStart.getTime() < d.getTime());
                            
                            if (isStart) {
                              const bEnd = startOfDay(new Date(b.endDate));
                              let length = 1;
                              let curDay = new Date(d);
                              curDay.setDate(curDay.getDate() + 1);
                              while (curDay <= bEnd && curDay <= rangeEnd) {
                                length++;
                                curDay.setDate(curDay.getDate() + 1);
                              }
                              
                              const status = computeBookingStatus(b);
                              const colors = getStatusColors(status);
                              
                              return (
                                <div
                                  key={b.id}
                                  onClick={() => handleBookingClick(b)}
                                  className={`absolute top-1 left-0 h-6 rounded-md px-2 text-[10px] font-semibold leading-6 cursor-pointer overflow-hidden whitespace-nowrap z-10 shadow-sm border ${colors}`}
                                  style={{ 
                                    width: `calc(${length * 100}% - 4px)`, 
                                    marginLeft: '2px',
                                    marginTop: `${idx * 28}px` 
                                  }}
                                  title={`${b.voucherNo} - ${b.client.name}`}
                                >
                                  {b.voucherNo} - {b.client.name}
                                </div>
                              );
                            }
                            return null;
                          })}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // ===================== DRAWER =====================
  const renderDrawer = () => {
    if (!selectedBooking) return null;
    const b = { ...selectedBooking }; // Draft
    const status = computeBookingStatus(b);
    const colors = getStatusColors(status);
    
    // Updates local state and calls save
    const update = (updates: Partial<OperationalBooking>) => {
      const updated = { ...b, ...updates };
      setSelectedBooking(updated);
      onSaveBooking(updated);
    };

    const handleReminderToggle = (days: number) => {
      const exists = b.reminders?.find(r => r.type === 'offset' && r.offsetDays === days);
      if (exists) {
        update({ reminders: b.reminders?.filter(r => r.id !== exists.id) || [] });
      } else {
        const nr: BookingReminder = {
          id: 'rem-' + Math.random().toString(36).substr(2, 6),
          type: 'offset',
          offsetDays: days,
          calendarAccountIds: b.calendarAccountIds || [],
          status: 'scheduled'
        };
        update({ reminders: [...(b.reminders || []), nr] });
      }
    };

    return (
      <>
        <div className="fixed inset-0 bg-black/40 z-40" onClick={closeDrawer} />
        <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-2xl z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
            <h3 className="font-bold text-slate-800">Booking Details</h3>
            <button onClick={closeDrawer} className="p-1 hover:bg-slate-200 rounded text-slate-500">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* A: Summary */}
            <section>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-lg">{b.voucherNo}</span>
                    <a href={`/?booking=${b.id}`} className="text-blue-500 hover:text-blue-600" title="Booking reference">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="text-sm text-slate-500">{b.tourPackageName}</div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full border ${colors} capitalize`}>
                  {status}
                </span>
              </div>
              <div className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1">
                <p><span className="font-medium">Client:</span> {b.client.name} {b.client.phone ? `(${b.client.phone})` : ''}</p>
                {b.client.email && <p><span className="font-medium">Email:</span> {b.client.email}</p>}
                <p><span className="font-medium">Dates:</span> {new Date(b.startDate).toLocaleDateString()} – {new Date(b.endDate).toLocaleDateString()}</p>
                {b.flightOrArrivalDetails && <p><span className="font-medium">Arrival:</span> {b.flightOrArrivalDetails}</p>}
                {b.tourCost !== undefined && <p><span className="font-medium">Total Cost:</span> ₹{b.tourCost.toLocaleString('en-IN')}</p>}
              </div>

              {onViewVoucher && (
                <button
                  onClick={() => onViewVoucher(b.itineraryId)}
                  className="mt-3 w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 transition-colors shadow-sm"
                >
                  <FileText className="w-4 h-4 text-amber-700" />
                  View / Download Travel Voucher
                </button>
              )}
            </section>

            <hr className="border-slate-100" />

            {/* B: Vehicle Assignment */}
            <section>
              <h4 className="font-semibold text-slate-800 mb-3 flex items-center">
                <Car className="w-4 h-4 mr-2" /> Vehicle Assignment
              </h4>
              <div className="flex bg-slate-100 p-1 rounded-lg mb-3">
                <button
                  className={`flex-1 py-1.5 text-sm font-medium rounded-md ${b.vehicleSource === 'own' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}
                  onClick={() => update({ vehicleSource: 'own' })}
                >
                  Own Fleet
                </button>
                <button
                  className={`flex-1 py-1.5 text-sm font-medium rounded-md ${b.vehicleSource === 'outsourced' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}
                  onClick={() => update({ vehicleSource: 'outsourced' })}
                >
                  Outsourced
                </button>
              </div>

              {b.vehicleSource === 'own' ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Vehicle</label>
                    <select
                      className="w-full border border-slate-300 rounded p-2 text-sm"
                      value={b.ownVehicleId || ''}
                      onChange={(e) => {
                        const vid = e.target.value;
                        const v = fleet.find(f => f.id === vid);
                        update({ ownVehicleId: vid, ownDriverId: v?.defaultDriverId || b.ownDriverId });
                      }}
                    >
                      <option value="">Select a vehicle...</option>
                      {fleet.filter(f => f.status === 'active').map(f => (
                        <option key={f.id} value={f.id}>{f.plateNumber} — {f.brand} {f.model}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Driver</label>
                    <select
                      className="w-full border border-slate-300 rounded p-2 text-sm"
                      value={b.ownDriverId || ''}
                      onChange={(e) => update({ ownDriverId: e.target.value })}
                    >
                      <option value="">Select a driver...</option>
                      {drivers.filter(d => d.status === 'active').map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Vendor Company</label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded p-2 text-sm"
                      value={b.outsourced?.vendorCompanyName || ''}
                      onChange={e => update({ outsourced: { ...(b.outsourced || { vendorContactNumber: '', bookingConfirmed: false, vendorCompanyName: '' }), vendorCompanyName: e.target.value } })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Vendor Contact</label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded p-2 text-sm"
                      value={b.outsourced?.vendorContactNumber || ''}
                      onChange={e => update({ outsourced: { ...(b.outsourced || { vendorCompanyName: '', bookingConfirmed: false, vendorContactNumber: '' }), vendorContactNumber: e.target.value } })}
                    />
                  </div>
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      className="mr-2 rounded text-amber-500 focus:ring-amber-500"
                      checked={b.outsourced?.bookingConfirmed || false}
                      onChange={e => update({ outsourced: { ...(b.outsourced || { vendorCompanyName: '', vendorContactNumber: '', bookingConfirmed: false }), bookingConfirmed: e.target.checked } })}
                    />
                    Confirmed with vendor
                  </label>
                </div>
              )}
            </section>

            <hr className="border-slate-100" />

            {/* C: Profit */}
            <section>
              <h4 className="font-semibold text-slate-800 mb-3">Profit Tracking</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Profit earned on this booking (₹)</label>
                  <input
                    type="number"
                    className="w-full border border-slate-300 rounded p-2 text-sm"
                    value={b.profit !== undefined ? b.profit : ''}
                    placeholder="e.g. 8500"
                    onChange={e => update({ profit: e.target.value ? Number(e.target.value) : undefined })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Profit Note</label>
                  <textarea
                    className="w-full border border-slate-300 rounded p-2 text-sm h-16"
                    placeholder="Short notes on margin, vendor payout, or driver bhatta..."
                    value={b.profitNote || ''}
                    onChange={e => update({ profitNote: e.target.value })}
                  />
                </div>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* D: Reminders */}
            <section>
              <h4 className="font-semibold text-slate-800 mb-3 flex items-center justify-between">
                <span className="flex items-center">
                  <Bell className="w-4 h-4 mr-2" /> Reminders
                </span>
                <button
                  type="button"
                  onClick={() => setShowAddCustomReminder(!showAddCustomReminder)}
                  className="text-xs text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  {showAddCustomReminder ? 'Cancel' : 'Add Custom'}
                </button>
              </h4>

              <div className="space-y-2 mb-4">
                {[7, 5, 2].map(days => (
                  <label key={days} className="flex items-center text-sm cursor-pointer group">
                    <input
                      type="checkbox"
                      className="mr-2 rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                      checked={!!b.reminders?.find(r => r.type === 'offset' && r.offsetDays === days)}
                      onChange={() => handleReminderToggle(days)}
                    />
                    <span className="text-slate-700 group-hover:text-slate-900">{days} days before tour starts</span>
                  </label>
                ))}
              </div>

              {/* Add Custom Reminder Form */}
              {showAddCustomReminder && (
                <div className="mb-4 p-3 bg-amber-50/60 rounded-lg border border-amber-200 space-y-3 text-xs">
                  <div className="flex gap-3">
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="customReminderType"
                        checked={customReminderType === 'offset'}
                        onChange={() => setCustomReminderType('offset')}
                      />
                      Days before tour
                    </label>
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="customReminderType"
                        checked={customReminderType === 'custom'}
                        onChange={() => setCustomReminderType('custom')}
                      />
                      Exact date & time
                    </label>
                  </div>

                  {customReminderType === 'offset' ? (
                    <div>
                      <label className="block text-slate-600 mb-1">Offset (days before departure):</label>
                      <input
                        type="number"
                        min="1"
                        max="60"
                        value={customOffsetDays}
                        onChange={(e) => setCustomOffsetDays(Math.max(1, Number(e.target.value)))}
                        className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-sm"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-slate-600 mb-1">Select date & time:</label>
                      <input
                        type="datetime-local"
                        value={customDateTime}
                        onChange={(e) => setCustomDateTime(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-sm"
                      />
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      const newRem: BookingReminder = {
                        id: 'rem-' + Math.random().toString(36).substring(2, 8),
                        type: customReminderType,
                        offsetDays: customReminderType === 'offset' ? customOffsetDays : undefined,
                        customDateTime: customReminderType === 'custom' ? customDateTime : undefined,
                        calendarAccountIds: b.calendarAccountIds || [],
                        status: 'scheduled',
                      };
                      update({ reminders: [...(b.reminders || []), newRem] });
                      setShowAddCustomReminder(false);
                      setCustomDateTime('');
                    }}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold py-1.5 rounded transition"
                  >
                    Save Reminder
                  </button>
                </div>
              )}
              
              {b.reminders?.filter(r => r.type === 'custom').length > 0 && (
                <div className="mb-4">
                  <h5 className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Custom Reminders</h5>
                  <div className="space-y-2">
                    {b.reminders.filter(r => r.type === 'custom').map(r => (
                      <div key={r.id} className="flex items-center justify-between bg-slate-50 p-2 rounded border border-slate-100">
                        <span className="text-sm">{r.customDateTime ? new Date(r.customDateTime).toLocaleString() : `${r.offsetDays} days before`}</span>
                        <button onClick={() => update({ reminders: b.reminders?.filter(rem => rem.id !== r.id) || [] })} className="text-rose-500 hover:bg-rose-50 p-1 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            <hr className="border-slate-100" />

            {/* E: Synced Calendars */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-slate-800">Synced Calendars</h4>
              </div>

              {b.calendarAccountIds && b.calendarAccountIds.length > 0 ? (
                <div className="space-y-2 mb-3">
                  {b.calendarAccountIds.map(accId => {
                    const acc = settings.connectedCalendars?.find(c => c.id === accId);
                    return (
                      <div key={accId} className="flex items-center justify-between text-sm bg-slate-50 p-2 rounded border border-slate-200">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${acc?.connectionStatus === 'connected' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          <span className="truncate max-w-[180px]">{acc?.label || accId}</span>
                        </div>
                        <button 
                          className="text-xs text-rose-500 font-medium px-2 py-1 hover:bg-rose-50 rounded"
                          onClick={() => update({ calendarAccountIds: b.calendarAccountIds?.filter(id => id !== accId) || [] })}
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-sm text-slate-500 italic mb-3">No calendars synced.</div>
              )}

              {/* Add to another calendar */}
              {settings.connectedCalendars && settings.connectedCalendars.filter(c => !b.calendarAccountIds?.includes(c.id)).length > 0 && (
                <div className="flex gap-2">
                  <select
                    className="flex-1 border border-slate-300 rounded px-2 py-1 text-xs"
                    value={selectedCalendarToAdd}
                    onChange={(e) => setSelectedCalendarToAdd(e.target.value)}
                  >
                    <option value="">Select calendar to sync...</option>
                    {settings.connectedCalendars
                      .filter(c => !b.calendarAccountIds?.includes(c.id))
                      .map(c => (
                        <option key={c.id} value={c.id}>{c.label} ({c.googleEmail})</option>
                      ))}
                  </select>
                  <button
                    type="button"
                    disabled={!selectedCalendarToAdd}
                    onClick={() => {
                      if (!selectedCalendarToAdd) return;
                      update({ calendarAccountIds: [...(b.calendarAccountIds || []), selectedCalendarToAdd] });
                      setSelectedCalendarToAdd('');
                    }}
                    className="px-2.5 py-1 text-xs font-semibold bg-slate-800 text-white rounded hover:bg-slate-700 disabled:opacity-50"
                  >
                    Sync
                  </button>
                </div>
              )}
            </section>

            {/* F: Day-wise Location (Only if active) */}
            {status === 'active' && b.dayLocations && b.dayLocations.length > 0 && (
              <>
                <hr className="border-slate-100" />
                <section>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-slate-800 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-amber-500" /> Day-Wise Location Tracking
                    </h4>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Live Tour
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">
                    Click any day to inspect planned stops. You can override today's location if the route changes in the field.
                  </p>

                  <div className="space-y-2">
                    {b.dayLocations.map(loc => {
                      const dayDate = new Date(b.startDate);
                      dayDate.setDate(dayDate.getDate() + loc.dayNo - 1);
                      const isTodayLoc = startOfDay(new Date()).getTime() === startOfDay(dayDate).getTime();
                      const isEditing = editingLocationDay === loc.dayNo;

                      return (
                        <div
                          key={loc.dayNo}
                          className={`p-2.5 rounded-lg border text-sm transition-all ${
                            isTodayLoc
                              ? 'bg-amber-50 border-amber-300 shadow-sm'
                              : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="font-semibold text-slate-800 mr-2">
                                Day {loc.dayNo} {isTodayLoc ? '📍 (Today)' : ''}:
                              </span>
                              <span className={`text-slate-700 ${loc.overridden ? 'font-medium text-amber-900 underline decoration-amber-400' : ''}`}>
                                {loc.place}
                              </span>
                              {loc.overridden && (
                                <span className="ml-1.5 text-[10px] text-amber-700 bg-amber-100 px-1 py-0.2 rounded font-medium">
                                  Overridden
                                </span>
                              )}
                            </div>

                            {isTodayLoc && !isEditing && (
                              <button
                                onClick={() => {
                                  setEditingLocationDay(loc.dayNo);
                                  setOverrideLocationText(loc.place);
                                }}
                                className="text-xs bg-white text-slate-700 font-semibold px-2 py-1 rounded shadow-sm border border-slate-200 hover:bg-slate-50 transition"
                              >
                                Override Today
                              </button>
                            )}
                          </div>

                          {/* Inline Location Override Input */}
                          {isEditing && (
                            <div className="mt-2.5 pt-2 border-t border-amber-200 flex gap-2">
                              <input
                                type="text"
                                value={overrideLocationText}
                                onChange={(e) => setOverrideLocationText(e.target.value)}
                                placeholder="Enter current field stop / city..."
                                className="flex-1 bg-white border border-slate-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-amber-500 outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedLocations = b.dayLocations.map(dl =>
                                    dl.dayNo === loc.dayNo
                                      ? { ...dl, place: overrideLocationText.trim() || dl.place, overridden: true }
                                      : dl
                                  );
                                  update({ dayLocations: updatedLocations });
                                  setEditingLocationDay(null);
                                }}
                                className="px-2.5 py-1 text-xs font-semibold bg-amber-500 text-slate-950 rounded hover:bg-amber-400"
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingLocationDay(null)}
                                className="px-2 py-1 text-xs text-slate-500 hover:text-slate-700"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              </>
            )}
          </div>
          
          <div className="p-4 border-t border-slate-200 bg-slate-50">
            <button 
              onClick={closeDrawer}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-2 rounded-lg"
            >
              Done
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="h-full flex flex-col p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Reminders & Scheduling</h1>
        
        {/* Tabs */}
        <div className="flex space-x-6 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('calendar')}
            className={`pb-3 px-1 font-medium flex items-center ${activeTab === 'calendar' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <CalendarIcon className="w-4 h-4 mr-2" /> Calendar View
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`pb-3 px-1 font-medium flex items-center ${activeTab === 'timeline' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Car className="w-4 h-4 mr-2" /> Fleet Timeline
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        {activeTab === 'calendar' ? renderCalendar() : renderTimeline()}
      </div>

      {renderDrawer()}
    </div>
  );
}
