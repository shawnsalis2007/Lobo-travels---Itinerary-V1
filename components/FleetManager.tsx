'use client';

import React, { useState, useMemo } from 'react';
import {
  Truck,
  Plus,
  Search,
  Edit3,
  Trash2,
  X,
  AlertTriangle,
  User,
  Calendar,
  Car,
  Shield,
  ChevronDown,
} from 'lucide-react';
import { FleetVehicle, VehicleOption, Driver } from '@/types';

interface FleetManagerProps {
  vehicles: VehicleOption[];   // Vehicle Catalogue for brand/model dropdowns
  drivers: Driver[];            // For default driver dropdown
  fleet: FleetVehicle[];
  onSaveVehicle: (v: FleetVehicle) => void;
  onDeleteVehicle: (id: string) => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generateFleetId(): string {
  return 'fv-' + Math.random().toString(36).substring(2, 10);
}

/** Returns true if the given ISO date string is within `days` days from today */
function isExpiringSoon(dateStr?: string, days = 30): boolean {
  if (!dateStr) return false;
  const expiry = new Date(dateStr);
  const now = new Date();
  const diff = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= days;
}

function isExpired(dateStr?: string): boolean {
  if (!dateStr) return false;
  return new Date(dateStr) < new Date();
}

const BLANK_VEHICLE: Omit<FleetVehicle, 'id' | 'createdAt' | 'addedDate'> = {
  plateNumber: '',
  brand: '',
  model: '',
  seats: undefined,
  type: '',
  colour: '',
  year: undefined,
  photo: '',
  defaultDriverId: '',
  status: 'active',
  rcExpiry: '',
  insuranceExpiry: '',
  pucExpiry: '',
};

const STATUS_LABELS: Record<FleetVehicle['status'], string> = {
  active: 'Active',
  maintenance: 'In Maintenance',
  inactive: 'Inactive',
};

const STATUS_BADGE: Record<FleetVehicle['status'], string> = {
  active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  maintenance: 'bg-amber-100 text-amber-700 border-amber-200',
  inactive: 'bg-rose-100 text-rose-700 border-rose-200',
};

// ─── Sub-component: Document expiry pill ────────────────────────────────────

function DocWarning({ label, date }: { label: string; date?: string }) {
  if (!date) return null;
  const expired = isExpired(date);
  const soon = isExpiringSoon(date);
  if (!expired && !soon) return null;
  return (
    <span
      title={`${label}: ${date}`}
      className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold border ${
        expired
          ? 'bg-rose-100 text-rose-700 border-rose-200'
          : 'bg-amber-100 text-amber-700 border-amber-200'
      }`}
    >
      ⚠️ {label}
    </span>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function FleetManager({
  vehicles,
  drivers,
  fleet,
  onSaveVehicle,
  onDeleteVehicle,
}: FleetManagerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | FleetVehicle['status']>('all');

  // Form / modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<FleetVehicle | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Form field: selected brand (controls model dropdown)
  const selectedBrandOption = useMemo(
    () => vehicles.find((v) => v.brand === editingVehicle?.brand),
    [vehicles, editingVehicle?.brand]
  );

  // ── Stats ────────────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const total = fleet.length;
    const active = fleet.filter((v) => v.status === 'active').length;
    const maintenance = fleet.filter((v) => v.status === 'maintenance').length;
    const inactive = fleet.filter((v) => v.status === 'inactive').length;
    return { total, active, maintenance, inactive };
  }, [fleet]);

  // ── Filtered list ─────────────────────────────────────────────────────────
  const filteredFleet = useMemo(() => {
    return fleet.filter((v) => {
      const matchSearch =
        !searchTerm ||
        v.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.model.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'all' || v.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [fleet, searchTerm, statusFilter]);

  // ── Helpers ───────────────────────────────────────────────────────────────

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  }

  function openAdd() {
    const now = new Date().toISOString();
    setEditingVehicle({
      id: generateFleetId(),
      createdAt: now,
      addedDate: now.slice(0, 10),
      ...BLANK_VEHICLE,
    });
    setIsFormOpen(true);
  }

  function openEdit(v: FleetVehicle) {
    setEditingVehicle({ ...v });
    setIsFormOpen(true);
  }

  function handleSave() {
    if (!editingVehicle) return;
    if (!editingVehicle.plateNumber.trim()) {
      showToast('Plate Number is required.');
      return;
    }
    if (!editingVehicle.brand.trim()) {
      showToast('Please select a brand.');
      return;
    }
    onSaveVehicle(editingVehicle);
    setIsFormOpen(false);
    setEditingVehicle(null);
  }

  function handleDelete(v: FleetVehicle) {
    if (v.status !== 'inactive') {
      showToast('Cannot delete — set vehicle to Inactive first.');
      return;
    }
    if (confirm(`Permanently remove ${v.plateNumber} (${v.brand} ${v.model}) from fleet?`)) {
      onDeleteVehicle(v.id);
    }
  }

  function updateField<K extends keyof FleetVehicle>(key: K, val: FleetVehicle[K]) {
    if (!editingVehicle) return;
    setEditingVehicle({ ...editingVehicle, [key]: val });
  }

  function handleBrandChange(brand: string) {
    const opt = vehicles.find((v) => v.brand === brand);
    setEditingVehicle((prev) =>
      prev
        ? {
            ...prev,
            brand,
            model: opt?.models[0] ?? '',
            type: opt?.category ?? prev.type,
          }
        : prev
    );
  }

  const activeDrivers = drivers.filter((d) => d.status === 'active');

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
            <Truck className="w-5 h-5 text-amber-500" />
            Lobo Travels Fleet Management
          </h1>
          <p className="text-xs text-slate-500">
            Own vehicle registry — track status, documents, and driver assignments.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Vehicle
        </button>
      </div>

      {/* ── Summary Stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Vehicles', value: stats.total, cls: 'text-slate-800', bg: 'bg-white' },
          { label: 'Active', value: stats.active, cls: 'text-emerald-700', bg: 'bg-emerald-50' },
          { label: 'In Maintenance', value: stats.maintenance, cls: 'text-amber-700', bg: 'bg-amber-50' },
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
            placeholder="Search plate, brand or model…"
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
          <option value="all">All Statuses ({fleet.length})</option>
          <option value="active">Active</option>
          <option value="maintenance">In Maintenance</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* ── Fleet Table / Grid ── */}
      {filteredFleet.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-16 flex flex-col items-center gap-4 text-center">
          <Truck className="w-12 h-12 text-slate-300" />
          <div>
            <p className="text-sm font-bold text-slate-700">No vehicles found</p>
            <p className="text-xs text-slate-400 mt-1">
              {fleet.length === 0
                ? 'Your fleet is empty. Click "Add Vehicle" to register your first vehicle.'
                : 'No vehicles match the current filters.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Plate No.</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Vehicle</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Type</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Driver</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Docs</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredFleet.map((v) => {
                  const assignedDriver = drivers.find((d) => d.id === v.defaultDriverId);
                  const hasDocWarning =
                    isExpiringSoon(v.rcExpiry) ||
                    isExpiringSoon(v.insuranceExpiry) ||
                    isExpiringSoon(v.pucExpiry) ||
                    isExpired(v.rcExpiry) ||
                    isExpired(v.insuranceExpiry) ||
                    isExpired(v.pucExpiry);
                  return (
                    <tr key={v.id} className="hover:bg-slate-50 transition">
                      {/* Plate */}
                      <td className="px-4 py-3">
                        <span className="font-mono font-bold text-slate-900 tracking-wide">
                          {v.plateNumber}
                        </span>
                        {v.year && (
                          <span className="ml-1.5 text-[10px] text-slate-400">({v.year})</span>
                        )}
                      </td>
                      {/* Vehicle */}
                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-800">
                          {v.brand} {v.model}
                        </div>
                        {v.colour && (
                          <div className="text-[10px] text-slate-400">{v.colour}</div>
                        )}
                      </td>
                      {/* Type */}
                      <td className="px-4 py-3 text-slate-600">
                        {v.type || '—'}
                        {v.seats ? (
                          <span className="ml-1 text-[10px] text-slate-400">
                            ({v.seats} seats)
                          </span>
                        ) : null}
                      </td>
                      {/* Status */}
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${STATUS_BADGE[v.status]}`}
                        >
                          {STATUS_LABELS[v.status]}
                        </span>
                      </td>
                      {/* Driver */}
                      <td className="px-4 py-3 text-slate-600">
                        {assignedDriver ? (
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3 text-slate-400" />
                            {assignedDriver.name}
                          </span>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                      {/* Doc warnings */}
                      <td className="px-4 py-3">
                        {hasDocWarning ? (
                          <div className="flex flex-wrap gap-1">
                            <DocWarning label="RC" date={v.rcExpiry} />
                            <DocWarning label="Ins." date={v.insuranceExpiry} />
                            <DocWarning label="PUC" date={v.pucExpiry} />
                          </div>
                        ) : (
                          <span className="text-emerald-500 text-[10px] font-semibold">✓ OK</span>
                        )}
                      </td>
                      {/* Actions */}
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openEdit(v)}
                            className="p-1 rounded text-slate-500 hover:text-amber-600 hover:bg-slate-200 transition"
                            title="Edit Vehicle"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(v)}
                            className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                            title="Delete Vehicle"
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
      {isFormOpen && editingVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[92vh] overflow-y-auto text-xs">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-500" />
                {editingVehicle.plateNumber ? 'Edit Vehicle' : 'Register New Vehicle'}
              </h3>
              <button
                onClick={() => {
                  setIsFormOpen(false);
                  setEditingVehicle(null);
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Plate Number */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Plate Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={editingVehicle.plateNumber}
                  onChange={(e) => updateField('plateNumber', e.target.value.toUpperCase())}
                  placeholder="e.g. DL 01 AB 1234"
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono tracking-widest uppercase focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              {/* Brand */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Brand <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={editingVehicle.brand}
                    onChange={(e) => handleBrandChange(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400"
                  >
                    <option value="">Select Brand</option>
                    {vehicles.map((opt) => (
                      <option key={opt.brand} value={opt.brand}>
                        {opt.brand}
                      </option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Model</label>
                  {selectedBrandOption ? (
                    <select
                      value={editingVehicle.model}
                      onChange={(e) => updateField('model', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400"
                    >
                      {selectedBrandOption.models.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={editingVehicle.model}
                      onChange={(e) => updateField('model', e.target.value)}
                      placeholder="Model name"
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  )}
                </div>
              </div>

              {/* Type, Seats, Year */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Type</label>
                  <select
                    value={editingVehicle.type ?? ''}
                    onChange={(e) => updateField('type', e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400"
                  >
                    <option value="">Select</option>
                    {['Sedan', 'SUV', 'MUV', 'Van', 'Bus', 'Tempo Traveller', 'Luxury', 'Coach/Bus', 'Other'].map(
                      (t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Seats</label>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={editingVehicle.seats ?? ''}
                    onChange={(e) =>
                      updateField('seats', e.target.value ? parseInt(e.target.value) : undefined)
                    }
                    placeholder="e.g. 7"
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Year</label>
                  <input
                    type="number"
                    min={2000}
                    max={2030}
                    value={editingVehicle.year ?? ''}
                    onChange={(e) =>
                      updateField('year', e.target.value ? parseInt(e.target.value) : undefined)
                    }
                    placeholder="2024"
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              {/* Colour & Status */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Colour</label>
                  <input
                    type="text"
                    value={editingVehicle.colour ?? ''}
                    onChange={(e) => updateField('colour', e.target.value)}
                    placeholder="e.g. Pearl White"
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Status</label>
                  <select
                    value={editingVehicle.status}
                    onChange={(e) =>
                      updateField('status', e.target.value as FleetVehicle['status'])
                    }
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400"
                  >
                    <option value="active">Active</option>
                    <option value="maintenance">In Maintenance</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Default Driver */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Default Driver</label>
                <select
                  value={editingVehicle.defaultDriverId ?? ''}
                  onChange={(e) => updateField('defaultDriverId', e.target.value || '')}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400"
                >
                  <option value="">— Unassigned —</option>
                  {activeDrivers.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.phone})
                    </option>
                  ))}
                </select>
              </div>

              {/* Documents Section */}
              <div className="pt-2 border-t border-slate-100">
                <p className="font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-amber-500" />
                  Document Expiry Dates
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-500 mb-1">RC Expiry</label>
                    <input
                      type="date"
                      value={editingVehicle.rcExpiry ?? ''}
                      onChange={(e) => updateField('rcExpiry', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">Insurance Expiry</label>
                    <input
                      type="date"
                      value={editingVehicle.insuranceExpiry ?? ''}
                      onChange={(e) => updateField('insuranceExpiry', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">PUC Expiry</label>
                    <input
                      type="date"
                      value={editingVehicle.pucExpiry ?? ''}
                      onChange={(e) => updateField('pucExpiry', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* Photo URL */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Photo URL (optional)</label>
                <input
                  type="text"
                  value={editingVehicle.photo ?? ''}
                  onChange={(e) => updateField('photo', e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono text-[11px] focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setIsFormOpen(false);
                  setEditingVehicle(null);
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
                Save Vehicle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
