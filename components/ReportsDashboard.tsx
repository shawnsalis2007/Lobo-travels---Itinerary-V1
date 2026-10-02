'use client';

import React, { useState, useMemo } from 'react';
import {
  BarChart3,
  TrendingUp,
  Car,
  User,
  Building2,
  Download,
  Calendar,
  IndianRupee
} from 'lucide-react';
import { OperationalBooking, FleetVehicle, Driver } from '@/types';

interface ReportsDashboardProps {
  bookings: OperationalBooking[];
  fleet: FleetVehicle[];
  drivers: Driver[];
}

type DatePreset = 'this_week' | 'this_month' | 'this_quarter' | 'custom';
type ReportTab = 'vehicle' | 'driver' | 'outsourced';

function getDateRange(start: Date, end: Date): string[] {
  const dates: string[] = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
}

function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);
}

function computeVehicleStats(vehicleId: string, vehicle: FleetVehicle, bookings: OperationalBooking[], rangeStart: Date, rangeEnd: Date) {
  const relevant = bookings.filter(b =>
    b.vehicleSource === 'own' &&
    b.ownVehicleId === vehicleId &&
    b.status !== 'cancelled' &&
    new Date(b.endDate) >= rangeStart &&
    new Date(b.startDate) <= rangeEnd
  );

  // Unique running days within range
  const runningDays = new Set<string>();
  for (const b of relevant) {
    const s = new Date(Math.max(new Date(b.startDate).getTime(), rangeStart.getTime()));
    const e = new Date(Math.min(new Date(b.endDate).getTime(), rangeEnd.getTime()));
    for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
      runningDays.add(d.toISOString().split('T')[0]);
    }
  }

  const vehicleActiveFrom = new Date(Math.max(new Date(vehicle.addedDate).getTime(), rangeStart.getTime()));
  const totalAvailableDays = Math.max(0, Math.round((rangeEnd.getTime() - vehicleActiveFrom.getTime()) / 86400000) + 1);
  const idleDays = Math.max(0, totalAvailableDays - runningDays.size);
  const revenue = relevant.reduce((sum, b) => sum + (b.tourCost || 0), 0);
  const profit = relevant.reduce((sum, b) => sum + (b.profit || 0), 0);
  const utilisation = totalAvailableDays > 0 ? Math.round((runningDays.size / totalAvailableDays) * 100) : 0;

  return { daysRunning: runningDays.size, daysIdle: idleDays, bookingsCount: relevant.length, revenue, profit, utilisation };
}

function computeDriverStats(driverId: string, driver: Driver, bookings: OperationalBooking[], fleet: FleetVehicle[], rangeStart: Date, rangeEnd: Date) {
  const relevant = bookings.filter(b =>
    b.vehicleSource === 'own' &&
    b.ownDriverId === driverId &&
    b.status !== 'cancelled' &&
    new Date(b.endDate) >= rangeStart &&
    new Date(b.startDate) <= rangeEnd
  );

  const activeDays = new Set<string>();
  for (const b of relevant) {
    const s = new Date(Math.max(new Date(b.startDate).getTime(), rangeStart.getTime()));
    const e = new Date(Math.min(new Date(b.endDate).getTime(), rangeEnd.getTime()));
    for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
      activeDays.add(d.toISOString().split('T')[0]);
    }
  }

  const vehicleIds = [...new Set(relevant.map(b => b.ownVehicleId).filter(Boolean))];
  const vehiclesUsed = vehicleIds.map(vid => {
    const v = fleet.find(f => f.id === vid);
    return v ? `${v.plateNumber} ${v.brand} ${v.model}` : vid;
  }).join(', ');

  const revenue = relevant.reduce((sum, b) => sum + (b.tourCost || 0), 0);
  const profit = relevant.reduce((sum, b) => sum + (b.profit || 0), 0);

  return { daysActive: activeDays.size, bookingsCount: relevant.length, revenue, profit, vehiclesUsed };
}

function getPresetDates(preset: DatePreset): { start: Date; end: Date } {
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);

  if (preset === 'this_week') {
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Monday
    start.setDate(diff);
  } else if (preset === 'this_month') {
    start.setDate(1);
    end.setMonth(end.getMonth() + 1);
    end.setDate(0);
  } else if (preset === 'this_quarter') {
    const q = Math.floor(now.getMonth() / 3);
    start.setMonth(q * 3, 1);
    end.setMonth((q + 1) * 3, 0);
  }
  return { start, end };
}

export default function ReportsDashboard({ bookings, fleet, drivers }: ReportsDashboardProps) {
  const [datePreset, setDatePreset] = useState<DatePreset>('this_month');
  const [customStart, setCustomStart] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [customEnd, setCustomEnd] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [activeTab, setActiveTab] = useState<ReportTab>('vehicle');

  const { start: dateStart, end: dateEnd } = useMemo(() => {
    if (datePreset === 'custom') {
      return { start: new Date(customStart), end: new Date(customEnd) };
    }
    return getPresetDates(datePreset);
  }, [datePreset, customStart, customEnd]);

  // =============== VEHICLE-WISE ===============
  const vehicleData = useMemo(() => {
    return fleet.map(v => {
      const stats = computeVehicleStats(v.id, v, bookings, dateStart, dateEnd);
      return { vehicle: v, ...stats };
    }).sort((a, b) => b.utilisation - a.utilisation);
  }, [fleet, bookings, dateStart, dateEnd]);

  const vehicleTotals = useMemo(() => {
    return vehicleData.reduce((acc, curr) => ({
      daysRunning: acc.daysRunning + curr.daysRunning,
      daysIdle: acc.daysIdle + curr.daysIdle,
      bookingsCount: acc.bookingsCount + curr.bookingsCount,
      revenue: acc.revenue + curr.revenue,
      profit: acc.profit + curr.profit,
    }), { daysRunning: 0, daysIdle: 0, bookingsCount: 0, revenue: 0, profit: 0 });
  }, [vehicleData]);

  // =============== DRIVER-WISE ===============
  const driverData = useMemo(() => {
    return drivers.map(d => {
      const stats = computeDriverStats(d.id, d, bookings, fleet, dateStart, dateEnd);
      return { driver: d, ...stats };
    }).sort((a, b) => b.daysActive - a.daysActive);
  }, [drivers, bookings, fleet, dateStart, dateEnd]);

  const driverTotals = useMemo(() => {
    return driverData.reduce((acc, curr) => ({
      daysActive: acc.daysActive + curr.daysActive,
      bookingsCount: acc.bookingsCount + curr.bookingsCount,
      revenue: acc.revenue + curr.revenue,
      profit: acc.profit + curr.profit,
    }), { daysActive: 0, bookingsCount: 0, revenue: 0, profit: 0 });
  }, [driverData]);

  // =============== OUTSOURCED ===============
  const outsourcedData = useMemo(() => {
    const relevant = bookings.filter(b => 
      b.vehicleSource === 'outsourced' &&
      b.status !== 'cancelled' &&
      new Date(b.endDate) >= dateStart &&
      new Date(b.startDate) <= dateEnd
    );

    const vendorMap = new Map<string, { bookings: number, revenue: number, profit: number, contact: string, confirmed: number }>();
    
    let totalBookings = 0;
    let totalRevenue = 0;
    let totalProfit = 0;

    relevant.forEach(b => {
      const vName = b.outsourced?.vendorCompanyName || 'Unknown Vendor';
      const isConfirmed = b.outsourced?.bookingConfirmed ? 1 : 0;
      
      totalBookings++;
      totalRevenue += (b.tourCost || 0);
      totalProfit += (b.profit || 0);

      const existing = vendorMap.get(vName) || { bookings: 0, revenue: 0, profit: 0, contact: b.outsourced?.vendorContactNumber || '', confirmed: 0 };
      existing.bookings++;
      existing.revenue += (b.tourCost || 0);
      existing.profit += (b.profit || 0);
      existing.confirmed += isConfirmed;
      vendorMap.set(vName, existing);
    });

    const vendors = Array.from(vendorMap.entries()).map(([name, stats]) => ({
      vendor: name,
      ...stats,
      confirmedPct: Math.round((stats.confirmed / stats.bookings) * 100)
    })).sort((a, b) => b.bookings - a.bookings);

    return { vendors, totalBookings, totalRevenue, totalProfit };
  }, [bookings, dateStart, dateEnd]);

  // =============== EXPORTS ===============
  const handleExportCSV = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportVehicle = () => {
    let csv = 'Vehicle,Plate,Status,Days Running,Days Idle,Bookings,Revenue,Profit,Utilisation %\n';
    vehicleData.forEach(v => {
      csv += `"${v.vehicle.brand} ${v.vehicle.model}","${v.vehicle.plateNumber}","${v.vehicle.status}",${v.daysRunning},${v.daysIdle},${v.bookingsCount},${v.revenue},${v.profit},${v.utilisation}\n`;
    });
    handleExportCSV(`vehicle-report-${dateStart.toISOString().split('T')[0]}-to-${dateEnd.toISOString().split('T')[0]}`, csv);
  };

  const exportDriver = () => {
    let csv = 'Driver,Phone,Days Active,Bookings,Revenue,Profit,Vehicles Used\n';
    driverData.forEach(d => {
      csv += `"${d.driver.name}","${d.driver.phone}",${d.daysActive},${d.bookingsCount},${d.revenue},${d.profit},"${d.vehiclesUsed}"\n`;
    });
    handleExportCSV(`driver-report-${dateStart.toISOString().split('T')[0]}-to-${dateEnd.toISOString().split('T')[0]}`, csv);
  };

  const exportOutsourced = () => {
    let csv = 'Vendor Company,Contact,Bookings,Revenue,Profit,Confirmed %\n';
    outsourcedData.vendors.forEach(v => {
      csv += `"${v.vendor}","${v.contact}",${v.bookings},${v.revenue},${v.profit},${v.confirmedPct}\n`;
    });
    handleExportCSV(`outsourced-report-${dateStart.toISOString().split('T')[0]}-to-${dateEnd.toISOString().split('T')[0]}`, csv);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
            <BarChart3 className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Reports</h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {['this_week', 'this_month', 'this_quarter', 'custom'].map(p => (
            <button
              key={p}
              onClick={() => setDatePreset(p as DatePreset)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                datePreset === p ? 'bg-amber-500 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {p.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </button>
          ))}
          {datePreset === 'custom' && (
            <div className="flex items-center gap-2 ml-2">
              <input
                type="date"
                value={customStart}
                onChange={e => setCustomStart(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
              />
              <span className="text-slate-400">to</span>
              <input
                type="date"
                value={customEnd}
                onChange={e => setCustomEnd(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
          )}
        </div>
      </div>

      {/* TABS */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('vehicle')}
          className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-medium transition-colors ${
            activeTab === 'vehicle' ? 'bg-[#151521] text-white' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
          }`}
        >
          <Car className="w-4 h-4" />
          Vehicle-wise
        </button>
        <button
          onClick={() => setActiveTab('driver')}
          className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-medium transition-colors ${
            activeTab === 'driver' ? 'bg-[#151521] text-white' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
          }`}
        >
          <User className="w-4 h-4" />
          Driver-wise
        </button>
        <button
          onClick={() => setActiveTab('outsourced')}
          className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-medium transition-colors ${
            activeTab === 'outsourced' ? 'bg-[#151521] text-white' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
          }`}
        >
          <Building2 className="w-4 h-4" />
          Outsourced
        </button>
      </div>

      {/* CONTENT */}
      {activeTab === 'vehicle' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 flex justify-between items-center bg-[#151521] text-white">
            <h2 className="font-semibold flex items-center gap-2"><Car className="w-5 h-5 text-amber-400" /> Vehicle Utilisation Report</h2>
            <button onClick={exportVehicle} className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors">
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Vehicle</th>
                  <th className="px-4 py-3">Plate</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-center">Days Running</th>
                  <th className="px-4 py-3 text-center">Days Idle</th>
                  <th className="px-4 py-3 text-center">Bookings</th>
                  <th className="px-4 py-3 text-right">Revenue ₹</th>
                  <th className="px-4 py-3 text-right">Profit ₹</th>
                  <th className="px-4 py-3">Utilisation %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {vehicleData.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-slate-500">No vehicles found.</td>
                  </tr>
                ) : (
                  vehicleData.map((row, i) => (
                    <tr key={row.vehicle.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-4 py-3 font-medium text-slate-800">{row.vehicle.brand} {row.vehicle.model}</td>
                      <td className="px-4 py-3">{row.vehicle.plateNumber}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.vehicle.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                          {row.vehicle.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">{row.daysRunning}</td>
                      <td className="px-4 py-3 text-center">{row.daysIdle}</td>
                      <td className="px-4 py-3 text-center">{row.bookingsCount}</td>
                      <td className="px-4 py-3 text-right">₹{formatINR(row.revenue)}</td>
                      <td className="px-4 py-3 text-right text-emerald-600 font-medium">₹{formatINR(row.profit)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-200 rounded-full h-1.5">
                            <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${row.utilisation}%` }} />
                          </div>
                          <span className="text-xs font-medium">{row.utilisation}%</span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot className="bg-slate-100 font-semibold text-slate-800">
                <tr>
                  <td colSpan={3} className="px-4 py-3 text-right">Totals:</td>
                  <td className="px-4 py-3 text-center">{vehicleTotals.daysRunning}</td>
                  <td className="px-4 py-3 text-center">{vehicleTotals.daysIdle}</td>
                  <td className="px-4 py-3 text-center">{vehicleTotals.bookingsCount}</td>
                  <td className="px-4 py-3 text-right">₹{formatINR(vehicleTotals.revenue)}</td>
                  <td className="px-4 py-3 text-right text-emerald-600">₹{formatINR(vehicleTotals.profit)}</td>
                  <td className="px-4 py-3"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'driver' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 flex justify-between items-center bg-[#151521] text-white">
            <h2 className="font-semibold flex items-center gap-2"><User className="w-5 h-5 text-amber-400" /> Driver Performance Report</h2>
            <button onClick={exportDriver} className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors">
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Driver</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3 text-center">Days Active</th>
                  <th className="px-4 py-3 text-center">Bookings</th>
                  <th className="px-4 py-3 text-right">Revenue ₹</th>
                  <th className="px-4 py-3 text-right">Profit ₹</th>
                  <th className="px-4 py-3">Vehicles Used</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {driverData.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-slate-500">No drivers found.</td>
                  </tr>
                ) : (
                  driverData.map((row, i) => (
                    <tr key={row.driver.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-4 py-3 font-medium text-slate-800">{row.driver.name}</td>
                      <td className="px-4 py-3">{row.driver.phone}</td>
                      <td className="px-4 py-3 text-center">{row.daysActive}</td>
                      <td className="px-4 py-3 text-center">{row.bookingsCount}</td>
                      <td className="px-4 py-3 text-right">₹{formatINR(row.revenue)}</td>
                      <td className="px-4 py-3 text-right text-emerald-600 font-medium">₹{formatINR(row.profit)}</td>
                      <td className="px-4 py-3 text-xs max-w-xs truncate" title={row.vehiclesUsed}>{row.vehiclesUsed || '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot className="bg-slate-100 font-semibold text-slate-800">
                <tr>
                  <td colSpan={2} className="px-4 py-3 text-right">Totals:</td>
                  <td className="px-4 py-3 text-center">{driverTotals.daysActive}</td>
                  <td className="px-4 py-3 text-center">{driverTotals.bookingsCount}</td>
                  <td className="px-4 py-3 text-right">₹{formatINR(driverTotals.revenue)}</td>
                  <td className="px-4 py-3 text-right text-emerald-600">₹{formatINR(driverTotals.profit)}</td>
                  <td className="px-4 py-3"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'outsourced' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Total Outsourced Bookings</p>
                <p className="text-2xl font-bold text-slate-800">{outsourcedData.totalBookings}</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-600">
                <IndianRupee className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Total Revenue</p>
                <p className="text-2xl font-bold text-slate-800">₹{formatINR(outsourcedData.totalRevenue)}</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Total Profit</p>
                <p className="text-2xl font-bold text-slate-800">₹{formatINR(outsourcedData.totalProfit)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 flex justify-between items-center bg-[#151521] text-white">
              <h2 className="font-semibold flex items-center gap-2"><Building2 className="w-5 h-5 text-amber-400" /> Vendor Breakdown</h2>
              <button onClick={exportOutsourced} className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors">
                <Download className="w-4 h-4" /> Export CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3">Vendor Company</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3 text-center">Bookings</th>
                    <th className="px-4 py-3 text-right">Revenue ₹</th>
                    <th className="px-4 py-3 text-right">Profit ₹</th>
                    <th className="px-4 py-3 text-center">Confirmed %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {outsourcedData.vendors.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-slate-500">No outsourced bookings found.</td>
                    </tr>
                  ) : (
                    outsourcedData.vendors.map((v, i) => (
                      <tr key={v.vendor} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="px-4 py-3 font-medium text-slate-800">{v.vendor}</td>
                        <td className="px-4 py-3">{v.contact || '-'}</td>
                        <td className="px-4 py-3 text-center">{v.bookings}</td>
                        <td className="px-4 py-3 text-right">₹{formatINR(v.revenue)}</td>
                        <td className="px-4 py-3 text-right text-emerald-600 font-medium">₹{formatINR(v.profit)}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${v.confirmedPct === 100 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                            {v.confirmedPct}%
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
