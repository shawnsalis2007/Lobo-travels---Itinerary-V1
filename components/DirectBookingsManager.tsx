'use client';

import React, { useState, useMemo } from 'react';
import {
  CalendarCheck,
  Plus,
  Search,
  Car,
  User,
  Phone,
  Mail,
  MapPin,
  Building2,
  CheckCircle2,
  Clock,
  Trash2,
  Edit3,
  RefreshCw,
  Calendar,
  ArrowRight,
  Shield,
  AlertCircle,
  TrendingUp,
  FileText
} from 'lucide-react';
import {
  OperationalBooking,
  FleetVehicle,
  Driver,
  AppSettings,
  OperationalBookingStatus
} from '@/types';
import {
  saveOperationalBookingAsync,
  deleteOperationalBookingAsync
} from '@/lib/storage';
import DirectBookingModal from './DirectBookingModal';

interface DirectBookingsManagerProps {
  bookings: OperationalBooking[];
  fleet: FleetVehicle[];
  drivers: Driver[];
  settings?: AppSettings;
  onSaveBooking?: (b: OperationalBooking) => void;
  onDeleteBooking?: (id: string) => void;
}

export default function DirectBookingsManager({
  bookings,
  fleet,
  drivers,
  settings,
  onSaveBooking,
  onDeleteBooking
}: DirectBookingsManagerProps) {
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<OperationalBooking | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<'all' | 'own' | 'outsourced'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | OperationalBookingStatus>('all');
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [globalSyncing, setGlobalSyncing] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Filter direct bookings only (standalone bookings created without an itinerary or ref DIRECT)
  const directBookings = useMemo(() => {
    return bookings.filter(
      (b) =>
        b.itineraryRef === 'DIRECT' ||
        b.id.startsWith('bk-dir-') ||
        b.voucherNo?.startsWith('DIR-') ||
        !b.itineraryId
    );
  }, [bookings]);

  // Statistics
  const stats = useMemo(() => {
    const total = directBookings.length;
    const own = directBookings.filter((b) => b.vehicleSource === 'own').length;
    const outsourced = directBookings.filter((b) => b.vehicleSource === 'outsourced').length;
    const scheduled = directBookings.filter((b) => b.status === 'scheduled').length;
    const active = directBookings.filter((b) => b.status === 'active').length;
    const completed = directBookings.filter((b) => b.status === 'completed').length;
    const totalRevenue = directBookings.reduce((sum, b) => sum + (b.tourCost || 0), 0);
    return { total, own, outsourced, scheduled, active, completed, totalRevenue };
  }, [directBookings]);

  // Filtered direct bookings
  const filteredBookings = useMemo(() => {
    return directBookings
      .filter((b) => {
        // Source filter
        if (sourceFilter !== 'all' && b.vehicleSource !== sourceFilter) return false;
        // Status filter
        if (statusFilter !== 'all' && b.status !== statusFilter) return false;
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchVoucher = b.voucherNo?.toLowerCase().includes(q);
          const matchClient = b.client?.name?.toLowerCase().includes(q) || b.client?.phone?.includes(q);
          const matchPackage = b.tourPackageName?.toLowerCase().includes(q);
          const matchVehicle = b.vehicleDisplay?.toLowerCase().includes(q);
          const matchVendor = b.outsourced?.vendorCompanyName?.toLowerCase().includes(q);
          const matchAssigned = b.assignedTo?.toLowerCase().includes(q);
          const matchLocations =
            b.pickupLocation?.toLowerCase().includes(q) ||
            b.dropLocation?.toLowerCase().includes(q) ||
            b.dayLocations?.some((dl) => dl.place.toLowerCase().includes(q));
          if (
            !matchVoucher &&
            !matchClient &&
            !matchPackage &&
            !matchVehicle &&
            !matchVendor &&
            !matchAssigned &&
            !matchLocations
          ) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => new Date(b.createdAt || b.startDate).getTime() - new Date(a.createdAt || a.startDate).getTime());
  }, [directBookings, sourceFilter, statusFilter, searchQuery]);

  // Handle Quick Status Change
  const handleQuickStatusChange = async (booking: OperationalBooking, newStatus: OperationalBookingStatus) => {
    try {
      const updated: OperationalBooking = {
        ...booking,
        status: newStatus,
        updatedAt: new Date().toISOString()
      };
      await saveOperationalBookingAsync(updated);
      onSaveBooking?.(updated);
      showNotice(`Status updated to "${newStatus}" for voucher ${booking.voucherNo}`);
    } catch (err: any) {
      alert(`Failed to update status: ${err?.message || err}`);
    }
  };

  // Handle Quick Delete
  const handleDelete = async (booking: OperationalBooking) => {
    const confirmMsg = `Are you sure you want to permanently delete direct booking ${booking.voucherNo} for ${booking.client.name}?`;
    if (!confirm(confirmMsg)) return;

    try {
      await deleteOperationalBookingAsync(booking.id);
      onDeleteBooking?.(booking.id);
      showNotice(`Booking ${booking.voucherNo} deleted successfully.`);
    } catch (err: any) {
      alert(`Failed to delete booking: ${err?.message || err}`);
    }
  };

  // Handle Quick Calendar Sync for single booking
  const handleSyncBookingCalendar = async (booking: OperationalBooking) => {
    const connectedCals = settings?.connectedCalendars || [];
    if (connectedCals.length === 0) {
      alert('No Google Calendar accounts connected. Please connect one in Settings → Connected Calendars.');
      return;
    }

    setSyncingId(booking.id);
    try {
      const targetCals =
        booking.calendarAccountIds && booking.calendarAccountIds.length > 0
          ? connectedCals.filter((c) => booking.calendarAccountIds.includes(c.id))
          : connectedCals;

      const res = await fetch('/api/calendar/sync-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          calendarAccounts: targetCals,
          bookings: [booking],
          itineraries: []
        })
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        showNotice(`Calendar synchronized successfully for ${booking.voucherNo}!`);
      } else {
        alert(data.error || 'Calendar sync failed. Please check Google OAuth credentials.');
      }
    } catch (err: any) {
      alert(`Calendar sync error: ${err?.message || err}`);
    } finally {
      setSyncingId(null);
    }
  };

  // Bulk Sync all direct bookings
  const handleBulkSyncAll = async () => {
    const connectedCals = settings?.connectedCalendars || [];
    if (connectedCals.length === 0) {
      alert('No Google Calendar accounts connected. Please connect one in Settings → Connected Calendars.');
      return;
    }

    setGlobalSyncing(true);
    try {
      const res = await fetch('/api/calendar/sync-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          calendarAccounts: connectedCals,
          bookings: directBookings,
          itineraries: []
        })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        showNotice(`Successfully synced ${directBookings.length} direct bookings to Google Calendar!`);
      } else {
        alert(data.error || 'Bulk calendar sync failed.');
      }
    } catch (err: any) {
      alert(`Bulk calendar sync error: ${err?.message || err}`);
    } finally {
      setGlobalSyncing(false);
    }
  };

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 4000);
  };

  // Open Edit Modal
  const handleOpenEdit = (booking: OperationalBooking) => {
    setEditingBooking(booking);
    setModalOpen(true);
  };

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingBooking(null);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Action Toast Notice */}
      {actionNotice && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-[#151521] border border-[#26214F] text-white p-5 sm:p-7 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0 shadow-inner">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Direct Bookings Manager
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Fleet & Driver Direct
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#9899A1] mt-1 max-w-2xl">
              Track, manage, and edit direct fleet and chauffeur assignments without requiring an itinerary. Seamlessly reassign vehicles, update vendor details, and sync to Google Calendar.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={handleBulkSyncAll}
            disabled={globalSyncing || directBookings.length === 0}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-2 disabled:opacity-50 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${globalSyncing ? 'animate-spin' : ''}`} />
            <span>{globalSyncing ? 'Syncing Calendars…' : 'Sync All Calendars'}</span>
          </button>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black transition flex items-center gap-1.5 shadow-md active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>+ New Direct Booking</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Total Standalone */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Bookings</span>
            <FileText className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-black text-slate-900">{stats.total}</div>
          <span className="text-[10px] text-slate-400 font-medium">Standalone fleet records</span>
        </div>

        {/* Own Fleet */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Own Fleet</span>
            <Car className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600">{stats.own}</div>
          <span className="text-[10px] text-slate-400 font-medium">Internal Chauffeurs</span>
        </div>

        {/* Outsourced Vendor */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Outsourced</span>
            <Building2 className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-black text-indigo-600">{stats.outsourced}</div>
          <span className="text-[10px] text-slate-400 font-medium">External Vendors</span>
        </div>

        {/* Scheduled */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Scheduled</span>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-blue-600">{stats.scheduled}</div>
          <span className="text-[10px] text-slate-400 font-medium">Upcoming departures</span>
        </div>

        {/* Active & Ongoing */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Active</span>
            <CalendarCheck className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600">{stats.active}</div>
          <span className="text-[10px] text-slate-400 font-medium">Currently in-transit</span>
        </div>

        {/* Total Value */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Value</span>
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            ₹{stats.totalRevenue.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-slate-400 font-medium">Booked revenue</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search voucher, client, phone, vehicle, chauffeur, vendor..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 text-slate-800"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {/* Source Filter */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600 shrink-0">
            <button
              type="button"
              onClick={() => setSourceFilter('all')}
              className={`px-2.5 py-1 rounded-lg transition ${
                sourceFilter === 'all' ? 'bg-[#151521] text-amber-300 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              All Types
            </button>
            <button
              type="button"
              onClick={() => setSourceFilter('own')}
              className={`px-2.5 py-1 rounded-lg transition ${
                sourceFilter === 'own' ? 'bg-[#151521] text-amber-300 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              Own Fleet
            </button>
            <button
              type="button"
              onClick={() => setSourceFilter('outsourced')}
              className={`px-2.5 py-1 rounded-lg transition ${
                sourceFilter === 'outsourced' ? 'bg-[#151521] text-amber-300 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              Vendor Outsourced
            </button>
          </div>

          {/* Status Filter */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600 shrink-0">
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className={`px-2 py-1 rounded-lg transition ${
                statusFilter === 'all' ? 'bg-[#151521] text-amber-300 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('scheduled')}
              className={`px-2 py-1 rounded-lg transition ${
                statusFilter === 'scheduled' ? 'bg-blue-600 text-white shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              Scheduled
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('active')}
              className={`px-2 py-1 rounded-lg transition ${
                statusFilter === 'active' ? 'bg-emerald-600 text-white shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              Active
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('completed')}
              className={`px-2 py-1 rounded-lg transition ${
                statusFilter === 'completed' ? 'bg-slate-700 text-white shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              Completed
            </button>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-slate-300 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
            <CalendarCheck className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">No Direct Bookings Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              {searchQuery || sourceFilter !== 'all' || statusFilter !== 'all'
                ? 'No direct bookings match your current search and filter criteria.'
                : 'You have not created any standalone direct bookings yet. Click below to create your first booking.'}
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpenCreate}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm inline-flex items-center gap-1.5 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Create Standalone Booking</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((b) => {
            const isOwn = b.vehicleSource === 'own';
            const assignedVehicle = isOwn ? fleet.find((v) => v.id === b.ownVehicleId) : null;
            const assignedDriver = isOwn ? drivers.find((d) => d.id === b.ownDriverId) : null;

            return (
              <div
                key={b.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:border-amber-300 transition"
              >
                {/* Booking Header */}
                <div className="p-4 bg-slate-50/70 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-mono font-black text-xs px-2.5 py-1 rounded-lg bg-[#151521] text-amber-300">
                      {b.voucherNo}
                    </span>

                    {/* Sourcing Badge */}
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                        isOwn
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-indigo-50 text-indigo-800 border-indigo-300'
                      }`}
                    >
                      {isOwn ? <Car className="w-3 h-3 text-emerald-600" /> : <Building2 className="w-3 h-3 text-indigo-600" />}
                      <span>{isOwn ? 'Own Fleet' : 'Vendor Outsourced'}</span>
                    </span>

                    {/* Service Name */}
                    <span className="font-bold text-sm text-slate-900">
                      {b.tourPackageName || 'Standalone Vehicle Service'}
                    </span>
                  </div>

                  {/* Status & Price */}
                  <div className="flex items-center gap-3">
                    {/* Status Dropdown */}
                    <select
                      value={b.status}
                      onChange={(e) => handleQuickStatusChange(b, e.target.value as OperationalBookingStatus)}
                      className={`text-xs font-bold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                        b.status === 'scheduled'
                          ? 'bg-blue-50 text-blue-800 border-blue-300'
                          : b.status === 'active'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : b.status === 'completed'
                          ? 'bg-slate-100 text-slate-700 border-slate-300'
                          : 'bg-rose-50 text-rose-800 border-rose-300'
                      }`}
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="active">Active (On Trip)</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    {b.tourCost !== undefined && (
                      <span className="font-black text-sm text-slate-900 whitespace-nowrap">
                        ₹{b.tourCost.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Booking Body Grid */}
                <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Column 1: Client Information */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Client Details
                    </span>
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <User className="w-4 h-4 text-slate-500" />
                      <span>{b.client?.name || 'Walk-in / Direct Client'}</span>
                    </div>
                    {b.client?.phone && (
                      <div className="text-slate-600 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <a href={`tel:${b.client.phone}`} className="hover:text-amber-600 transition">
                          {b.client.phone}
                        </a>
                      </div>
                    )}
                    {b.client?.email && (
                      <div className="text-slate-600 flex items-center gap-1.5 truncate">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <a href={`mailto:${b.client.email}`} className="hover:text-amber-600 transition truncate">
                          {b.client.email}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Column 2: Schedule & Route */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Schedule & Route
                    </span>
                    <div className="text-slate-800 font-bold flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-500" />
                      <span>
                        {b.startDate} {b.endDate !== b.startDate ? `→ ${b.endDate}` : ''}
                      </span>
                      {b.pickupTime && (
                        <span className="text-[11px] text-slate-500 font-normal">
                          ({b.pickupTime})
                        </span>
                      )}
                    </div>
                    {(b.pickupLocation || b.dropLocation) && (
                      <div className="text-slate-700 flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span className="leading-tight">
                          {b.pickupLocation || 'Pickup Point'}
                          <span className="mx-1 text-slate-400">→</span>
                          {b.dropLocation || 'Drop-off Point'}
                        </span>
                      </div>
                    )}
                    {b.notes && (
                      <div className="text-slate-500 italic text-[11px] border-t border-slate-200/60 pt-1 mt-1 line-clamp-2">
                        &ldquo;{b.notes}&rdquo;
                      </div>
                    )}
                  </div>

                  {/* Column 3: Vehicle & Driver Allocation */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      {isOwn ? 'Fleet & Chauffeur Allocation' : 'Vendor Logistics'}
                    </span>

                    {isOwn ? (
                      <>
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <Car className="w-3.5 h-3.5 text-emerald-600" />
                          <span>
                            {assignedVehicle
                              ? `${assignedVehicle.brand} ${assignedVehicle.model} (${assignedVehicle.plateNumber})`
                              : b.vehicleDisplay || 'Unassigned Vehicle'}
                          </span>
                        </div>
                        <div className="text-slate-700 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-500" />
                          <span>
                            {assignedDriver ? `${assignedDriver.name}` : 'Unassigned Chauffeur'}
                          </span>
                          {assignedDriver?.phone && (
                            <span className="text-slate-400">({assignedDriver.phone})</span>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                          <span>{b.outsourced?.vendorCompanyName || 'External Vendor'}</span>
                        </div>
                        {b.outsourced?.vendorContactNumber && (
                          <div className="text-slate-600 flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            <span>{b.outsourced.vendorContactNumber}</span>
                          </div>
                        )}
                        {(b.outsourced?.driverName || b.outsourced?.vehicleDescription) && (
                          <div className="text-slate-600 text-[11px]">
                            {b.outsourced.vehicleDescription ? `${b.outsourced.vehicleDescription} · ` : ''}
                            {b.outsourced.driverName || ''}
                          </div>
                        )}
                      </>
                    )}

                    {b.assignedTo && (
                      <div className="text-[10px] text-slate-500 border-t border-slate-200/60 pt-1 mt-1 flex items-center gap-1">
                        <Shield className="w-3 h-3 text-amber-500" />
                        <span>Dispatcher: {b.assignedTo}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Booking Footer Actions */}
                <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                  {/* Google Calendar Status */}
                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>
                      {b.calendarEventIds && b.calendarEventIds.length > 0
                        ? `Synced to ${b.calendarEventIds.length} Google Calendar(s)`
                        : 'Not synced to Google Calendar yet'}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSyncBookingCalendar(b)}
                      disabled={syncingId === b.id}
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition flex items-center gap-1"
                    >
                      <RefreshCw className={`w-3 h-3 text-amber-500 ${syncingId === b.id ? 'animate-spin' : ''}`} />
                      <span>{syncingId === b.id ? 'Syncing…' : 'Sync Calendar'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenEdit(b)}
                      className="px-3 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold transition flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3 text-amber-700" />
                      <span>Edit & Reassign</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(b)}
                      className="p-1 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition"
                      title="Delete Direct Booking"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Direct Booking Modal (Create / Edit) */}
      <DirectBookingModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingBooking(null);
        }}
        fleet={fleet}
        drivers={drivers}
        settings={settings}
        existingBooking={editingBooking}
        onBookingCreated={(savedBooking) => {
          onSaveBooking?.(savedBooking);
          showNotice(`Direct booking ${savedBooking.voucherNo} saved and synced successfully!`);
          setModalOpen(false);
          setEditingBooking(null);
        }}
      />
    </div>
  );
}
