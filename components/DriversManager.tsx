'use client';

import React, { useState, useMemo } from 'react';
import {
  UserCheck,
  Plus,
  Search,
  Edit3,
  Trash2,
  X,
  AlertTriangle,
  Car,
  Phone,
} from 'lucide-react';
import { Driver, FleetVehicle } from '@/types';

interface DriversManagerProps {
  drivers: Driver[];
  fleet: FleetVehicle[];
  onSaveDriver: (d: Driver) => void;
  onDeleteDriver: (id: string) => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generateDriverId(): string {
  return 'dr-' + Math.random().toString(36).substring(2, 10);
}

const BLANK_DRIVER: Omit<Driver, 'id'> = {
  name: '',
  phone: '',
  licenseNumber: '',
  defaultVehicleId: '',
  status: 'active',
  createdAt: '',
};

const STATUS_BADGE: Record<Driver['status'], string> = {
  active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  inactive: 'bg-rose-100 text-rose-700 border-rose-200',
};

// ─── Main Component ──────────────────────────────────────────────────────────

export default function DriversManager({
  drivers,
  fleet,
  onSaveDriver,
  onDeleteDriver,
}: DriversManagerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Driver['status']>('all');

  // Form / modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // ── Stats ────────────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const total = drivers.length;
    const active = drivers.filter((d) => d.status === 'active').length;
    const inactive = drivers.filter((d) => d.status === 'inactive').length;
    return { total, active, inactive };
  }, [drivers]);

  // ── Filtered list ─────────────────────────────────────────────────────────
  const filteredDrivers = useMemo(() => {
    return drivers.filter((d) => {
      const matchSearch =
        !searchTerm ||
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.phone.includes(searchTerm) ||
        (d.licenseNumber ?? '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'all' || d.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [drivers, searchTerm, statusFilter]);

  // ── Helpers ───────────────────────────────────────────────────────────────

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  }

  function openAdd() {
    setEditingDriver({ id: generateDriverId(), ...BLANK_DRIVER });
    setIsFormOpen(true);
  }

  function openEdit(d: Driver) {
    setEditingDriver({ ...d });
    setIsFormOpen(true);
  }

  function handleSave() {
    if (!editingDriver) return;
    if (!editingDriver.name.trim()) {
      showToast('Driver name is required.');
      return;
    }
    if (!editingDriver.phone.trim()) {
      showToast('Phone number is required.');
      return;
    }
    const driverToSave: Driver = {
      ...editingDriver,
      createdAt: editingDriver.createdAt || new Date().toISOString(),
    };
    onSaveDriver(driverToSave);
    setIsFormOpen(false);
    setEditingDriver(null);
  }

  function handleDelete(d: Driver) {
    if (d.status !== 'inactive') {
      showToast('Cannot delete — set driver to Inactive first.');
      return;
    }
    if (confirm(`Permanently remove driver ${d.name} from directory?`)) {
      onDeleteDriver(d.id);
    }
  }

  function updateField<K extends keyof Driver>(key: K, val: Driver[K]) {
    if (!editingDriver) return;
    setEditingDriver({ ...editingDriver, [key]: val });
  }

  // Only active fleet vehicles in the dropdown
  const activeFleet = fleet.filter((v) => v.status === 'active');

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6 pb-20">

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-[100] bg-[#151521] text-amber-300 border border-amber-500/30 px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          {toast}
        </div>
      )}

      {/* ── Header ── */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-amber-500" />
            Drivers Directory
          </h1>
          <p className="text-xs text-slate-500">
            Manage chauffeurs and their vehicle assignments for Lobo Travels operations.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Driver
        </button>
      </div>

      {/* ── Summary Stats ── */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Drivers', value: stats.total, cls: 'text-slate-800', bg: 'bg-white' },
          { label: 'Active', value: stats.active, cls: 'text-emerald-700', bg: 'bg-emerald-50' },
          { label: 'Inactive', value: stats.inactive, cls: 'text-rose-700', bg: 'bg-rose-50' },
        ].map(({ label, value, cls, bg }) => (
          <div key={label} className={`${bg} rounded-xl border border-slate-200 p-4 shadow-xs`}>
            <div className={`text-2xl font-extrabold ${cls}`}>{value}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* ── Search & Filter ── */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search name, phone or license…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent focus:outline-none text-slate-900"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none"
        >
          <option value="all">All Statuses ({drivers.length})</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* ── Table ── */}
      {filteredDrivers.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-16 flex flex-col items-center gap-4 text-center">
          <UserCheck className="w-12 h-12 text-slate-300" />
          <div>
            <p className="text-sm font-bold text-slate-700">No drivers found</p>
            <p className="text-xs text-slate-400 mt-1">
              {drivers.length === 0
                ? 'Your driver directory is empty. Click "Add Driver" to get started.'
                : 'No drivers match the current filters.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {/* ── Mobile Card View (sm:hidden) ── */}
          <div className="sm:hidden divide-y divide-slate-100">
            {filteredDrivers.map((d) => {
              const assignedVehicle = fleet.find((v) => v.id === d.defaultVehicleId);
              return (
                <div key={d.id} className="p-3.5 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-semibold text-sm text-slate-900">{d.name}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${STATUS_BADGE[d.status]}`}>
                          {d.status}
                        </span>
                      </div>
                      <a
                        href={`tel:${d.phone}`}
                        className="inline-flex items-center gap-1.5 text-xs text-amber-700 font-mono font-medium hover:underline py-0.5"
                      >
                        <Phone className="w-3 h-3 text-amber-600" />
                        {d.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => openEdit(d)}
                        className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 active:scale-95 transition"
                        title="Edit Driver"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(d)}
                        className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 active:scale-95 transition"
                        title="Delete Driver"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-x-3 gap-y-1">
                    {assignedVehicle ? (
                      <span className="flex items-center gap-1 text-slate-700 font-medium">
                        <Car className="w-3 h-3 text-slate-400" />
                        <span className="font-mono">{assignedVehicle.plateNumber}</span> ({assignedVehicle.brand} {assignedVehicle.model})
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">No vehicle assigned</span>
                    )}
                    {d.licenseNumber && (
                      <span className="font-mono text-slate-500">Lic: {d.licenseNumber}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Desktop Table View (hidden sm:block) ── */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Phone</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">License No.</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Default Vehicle</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Status</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDrivers.map((d) => {
                  const assignedVehicle = fleet.find((v) => v.id === d.defaultVehicleId);
                  return (
                    <tr key={d.id} className="hover:bg-slate-50 transition">
                      {/* Name */}
                      <td className="px-4 py-3">
                        <span className="font-semibold text-slate-900">{d.name}</span>
                      </td>
                      {/* Phone */}
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1 text-slate-600 font-mono">
                          <Phone className="w-3 h-3 text-slate-400" />
                          {d.phone}
                        </span>
                      </td>
                      {/* License */}
                      <td className="px-4 py-3 text-slate-600 font-mono">
                        {d.licenseNumber || <span className="text-slate-300">—</span>}
                      </td>
                      {/* Vehicle */}
                      <td className="px-4 py-3">
                        {assignedVehicle ? (
                          <span className="flex items-center gap-1 text-slate-700">
                            <Car className="w-3 h-3 text-slate-400" />
                            <span className="font-mono font-semibold">
                              {assignedVehicle.plateNumber}
                            </span>
                            <span className="text-slate-400">
                              {assignedVehicle.brand} {assignedVehicle.model}
                            </span>
                          </span>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                      {/* Status */}
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${STATUS_BADGE[d.status]}`}
                        >
                          {d.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      {/* Actions */}
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openEdit(d)}
                            className="p-1 rounded text-slate-500 hover:text-amber-600 hover:bg-slate-200 transition"
                            title="Edit Driver"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(d)}
                            className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                            title="Delete Driver"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Add / Edit Modal ── */}
      {isFormOpen && editingDriver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-4 sm:p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-amber-500" />
                {editingDriver.name ? 'Edit Driver' : 'Register New Driver'}
              </h3>
              <button
                onClick={() => {
                  setIsFormOpen(false);
                  setEditingDriver(null);
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Name */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={editingDriver.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="e.g. Ravi Kumar"
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Phone <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  value={editingDriver.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              {/* License Number */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">License Number</label>
                <input
                  type="text"
                  value={editingDriver.licenseNumber ?? ''}
                  onChange={(e) => updateField('licenseNumber', e.target.value)}
                  placeholder="e.g. DL-0120110149646"
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              {/* Default Vehicle */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Default Vehicle</label>
                <select
                  value={editingDriver.defaultVehicleId ?? ''}
                  onChange={(e) => updateField('defaultVehicleId', e.target.value || '')}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400"
                >
                  <option value="">— Unassigned —</option>
                  {activeFleet.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.plateNumber} — {v.brand} {v.model}
                    </option>
                  ))}
                </select>
                {activeFleet.length === 0 && (
                  <p className="text-[10px] text-slate-400 mt-1">
                    No active fleet vehicles. Add vehicles in Fleet Manager first.
                  </p>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Status</label>
                <select
                  value={editingDriver.status}
                  onChange={(e) => updateField('status', e.target.value as Driver['status'])}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setIsFormOpen(false);
                  setEditingDriver(null);
                }}
                className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-1.5 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-sm transition"
              >
                Save Driver
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
