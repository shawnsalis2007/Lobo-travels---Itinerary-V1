'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Shield, 
  KeyRound, 
  Unlock, 
  Lock, 
  CheckCircle, 
  AlertCircle, 
  Trash2, 
  RefreshCw,
  Mail,
  Check
} from 'lucide-react';
import { User, UserRole, UserPermissions, DEFAULT_PERMISSIONS } from '@/types';

interface UsersManagerProps {
  currentUser: User | null;
  currentBrandId: string;
}

export default function UsersManager({ currentUser, currentBrandId }: UsersManagerProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Add User Modal
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newUser, setNewUser] = useState<{
    email: string;
    fullName: string;
    password: string;
    role: UserRole;
    permissions: UserPermissions;
  }>({
    email: '',
    fullName: '',
    password: 'Lobo@2026!',
    role: 'operator',
    permissions: DEFAULT_PERMISSIONS
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users?brandId=${encodeURIComponent(currentBrandId)}`, { cache: 'no-store' });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.users) {
        setUsers(data.users);
      } else {
        setError(data.error || 'Failed to fetch users');
      }
    } catch (err: any) {
      setError(err?.message || 'Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentBrandId]);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.email || !newUser.fullName) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newUser,
          brandId: currentBrandId
        })
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to create user');
        setSubmitting(false);
        return;
      }

      setSuccessMsg(`User ${newUser.email} created successfully with temporary password ${newUser.password}`);
      setIsAddOpen(false);
      setNewUser({
        email: '',
        fullName: '',
        password: 'Lobo@2026!',
        role: 'operator',
        permissions: DEFAULT_PERMISSIONS
      });
      fetchUsers();
    } catch (err: any) {
      setError(err?.message || 'Error creating user');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetPassword = async (userId: string, email: string) => {
    const tempPass = prompt(`Enter new temporary password for ${email}:`, 'Lobo@Change2026!');
    if (!tempPass) return;

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, newPassword: tempPass })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        alert(data.error || 'Failed to reset password');
        return;
      }
      alert(`Password reset successfully for ${email}. Temporary password: ${tempPass}`);
      fetchUsers();
    } catch (e: any) {
      alert(e?.message || 'Error resetting password');
    }
  };

  const handleToggleLock = async (u: User) => {
    const isLocked = u.lockedUntil && new Date(u.lockedUntil).getTime() > Date.now();
    try {
      const res = await fetch(`/api/users/${encodeURIComponent(u.id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unlock: isLocked })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        alert(data.error || 'Failed to update lock status');
        return;
      }
      fetchUsers();
    } catch (e: any) {
      alert(e?.message || 'Failed to update lock status');
    }
  };

  const handleToggleActive = async (u: User) => {
    try {
      const res = await fetch(`/api/users/${encodeURIComponent(u.id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !u.isActive })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        alert(data.error || 'Failed to toggle active status');
        return;
      }
      fetchUsers();
    } catch (e: any) {
      alert(e?.message || 'Failed to toggle active status');
    }
  };

  const handleDeleteUser = async (id: string, email: string) => {
    if (!confirm(`Are you sure you want to delete user ${email}?`)) return;
    try {
      const res = await fetch(`/api/users/${encodeURIComponent(id)}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        alert(data.error || 'Failed to delete user');
        return;
      }
      fetchUsers();
    } catch (e: any) {
      alert(e?.message || 'Failed to delete user');
    }
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'super_admin':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">Super Admin</span>;
      case 'brand_admin':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">Brand Admin</span>;
      case 'operator':
      case 'staff':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">Operator</span>;
      case 'viewer':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-500/20 text-slate-300 border border-slate-500/30">Viewer</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Users className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-white">Users & Team Permissions</h1>
          </div>
          <p className="text-xs text-[#9899A1] mt-1">
            Manage user seats, role assignments (Super Admin, Brand Admin, Operator, Viewer), and granular permissions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchUsers}
            className="p-2 rounded-lg bg-[#26214F] hover:bg-[#26214F]/80 text-slate-300 hover:text-white border border-[#26214F] transition"
            title="Refresh users"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs shadow transition active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-200 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="text-emerald-400 hover:text-white">✕</button>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-[#151521] border border-[#26214F] rounded-xl overflow-hidden shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#26214F]/60 text-slate-400 font-semibold uppercase text-[10px] tracking-wider border-b border-[#26214F]">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Created</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#26214F]/40">
              {users.map((u) => {
                const isLocked = u.lockedUntil && new Date(u.lockedUntil).getTime() > Date.now();

                return (
                  <tr key={u.id} className="hover:bg-white/[0.02] transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-purple-600 flex items-center justify-center font-bold text-white text-xs">
                          {u.fullName.substring(0, 1).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-white leading-tight">{u.fullName}</p>
                          <p className="text-[11px] text-[#9899A1] font-mono">{u.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      {getRoleBadge(u.role)}
                    </td>

                    <td className="py-3.5 px-4">
                      {isLocked ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1 w-max">
                          <Lock className="w-3 h-3" /> Locked (5 attempts)
                        </span>
                      ) : u.isActive ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-700 text-slate-300">
                          Deactivated
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-[#9899A1]">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {isLocked && (
                          <button
                            onClick={() => handleToggleLock(u)}
                            className="p-1.5 rounded bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition"
                            title="Unlock account"
                          >
                            <Unlock className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          onClick={() => handleResetPassword(u.id, u.email)}
                          className="p-1.5 rounded bg-[#26214F] text-slate-300 hover:text-white transition"
                          title="Reset password"
                        >
                          <KeyRound className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleToggleActive(u)}
                          className={`px-2 py-1 rounded text-[11px] font-medium transition ${
                            u.isActive 
                              ? 'bg-[#26214F] text-slate-400 hover:text-white' 
                              : 'bg-emerald-500/20 text-emerald-300'
                          }`}
                        >
                          {u.isActive ? 'Deactivate' : 'Activate'}
                        </button>

                        {currentUser?.role === 'super_admin' && currentUser?.id !== u.id && (
                          <button
                            onClick={() => handleDeleteUser(u.id, u.email)}
                            className="p-1.5 rounded text-rose-400 hover:bg-rose-950/60 transition"
                            title="Delete user"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-[#151521] border border-[#26214F] text-white rounded-2xl shadow-2xl p-6 overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-lg text-white">Add Team Member</h3>
              </div>
              <button onClick={() => setIsAddOpen(false)} className="text-[#9899A1] hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={newUser.fullName}
                  onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-[#26214F]/60 border border-[#26214F] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. rahul@lobotravels.com"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-[#26214F]/60 border border-[#26214F] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Role *</label>
                <select
                  value={newUser.role}
                  onChange={(e) => {
                    const r = e.target.value as UserRole;
                    let p: UserPermissions = { ...DEFAULT_PERMISSIONS };
                    if (r === 'viewer') {
                      p = { canCreateItinerary: false, canEditItinerary: false, canDeleteItinerary: false, canManageFleet: false, canManageDrivers: false, canManageBookings: false, canManageDestinations: false, canManageHotels: false, canViewReports: true };
                    } else if (r === 'super_admin' || r === 'brand_admin') {
                      p = { canCreateItinerary: true, canEditItinerary: true, canDeleteItinerary: true, canManageFleet: true, canManageDrivers: true, canManageBookings: true, canManageDestinations: true, canManageHotels: true, canViewReports: true, canManageSettings: true, canManageUsers: true };
                    }
                    setNewUser({ ...newUser, role: r, permissions: p });
                  }}
                  className="w-full px-3 py-2 text-sm bg-[#26214F]/60 border border-[#26214F] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                >
                  <option value="operator">Operator (Create & Edit Itineraries, Fleet, Bookings)</option>
                  <option value="viewer">Viewer (Read-Only Itineraries & Reports)</option>
                  <option value="brand_admin">Brand Admin (Manage Users & Brand Settings)</option>
                  {currentUser?.role === 'super_admin' && (
                    <option value="super_admin">Super Admin (System-Wide Control)</option>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Initial Temporary Password</label>
                <input
                  type="text"
                  required
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-[#26214F]/60 border border-[#26214F] rounded-lg text-white font-mono focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
                <p className="text-[11px] text-[#9899A1] mt-1">User will be prompted to set their own password upon first login.</p>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-medium text-slate-300 mb-2">Granular Permissions</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { key: 'canCreateItinerary', label: 'Create Itineraries' },
                    { key: 'canEditItinerary', label: 'Edit Itineraries' },
                    { key: 'canDeleteItinerary', label: 'Delete Itineraries' },
                    { key: 'canManageFleet', label: 'Manage Fleet Vehicles' },
                    { key: 'canManageDrivers', label: 'Manage Drivers' },
                    { key: 'canManageBookings', label: 'Manage Reminders / Bookings' },
                    { key: 'canManageDestinations', label: 'Manage Destinations' },
                    { key: 'canManageHotels', label: 'Manage Hotels' },
                    { key: 'canViewReports', label: 'View Reports' },
                    { key: 'canManageSettings', label: 'Edit Settings' },
                  ].map((perm) => (
                    <label key={perm.key} className="flex items-center gap-2 p-1.5 rounded bg-[#26214F]/40 hover:bg-[#26214F] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!(newUser.permissions as any)[perm.key]}
                        onChange={(e) => {
                          setNewUser({
                            ...newUser,
                            permissions: {
                              ...newUser.permissions,
                              [perm.key]: e.target.checked
                            }
                          });
                        }}
                        className="rounded text-amber-500 focus:ring-amber-400 bg-[#151521] border-[#26214F]"
                      />
                      <span>{perm.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#26214F]">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow hover:from-amber-400 hover:to-amber-500 transition disabled:opacity-50 flex items-center gap-2"
                >
                  {submitting && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  {submitting ? 'Adding Member...' : 'Add Team Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
