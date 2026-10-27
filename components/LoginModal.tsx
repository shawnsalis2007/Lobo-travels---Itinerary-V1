'use client';

import React, { useState } from 'react';
import { Lock, Mail, Shield, AlertCircle, CheckCircle2, X, KeyRound, UserCheck, RefreshCw } from 'lucide-react';
import { User, Brand } from '@/types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User, brand: Brand) => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Forced password change state
  const [mustChangePassword, setMustChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null);
  const [authenticatedBrand, setAuthenticatedBrand] = useState<Brand | null>(null);

  if (!isOpen) return null;

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        setError(data.error || 'Authentication failed. Please check credentials.');
        setLoading(false);
        return;
      }

      const user = data.user as User;
      const brand = data.brand as Brand;

      if (user.mustChangePassword) {
        setAuthenticatedUser(user);
        setAuthenticatedBrand(brand);
        setMustChangePassword(true);
        setLoading(false);
        return;
      }

      onLoginSuccess(user, brand);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Network error during login.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 8) {
      setError('New password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setChangingPassword(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword })
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to update password.');
        setChangingPassword(false);
        return;
      }

      if (authenticatedUser && authenticatedBrand) {
        onLoginSuccess({ ...authenticatedUser, mustChangePassword: false }, authenticatedBrand);
      }
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to change password.');
    } finally {
      setChangingPassword(false);
    }
  };

  const fillQuickCredential = (quickEmail: string, quickPass: string) => {
    setEmail(quickEmail);
    setPassword(quickPass);
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#151521] border border-[#26214F] text-white rounded-2xl shadow-2xl p-6 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-3">
            {mustChangePassword ? (
              <KeyRound className="w-6 h-6 text-amber-400" />
            ) : (
              <Shield className="w-6 h-6 text-amber-400" />
            )}
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            {mustChangePassword ? 'Set New Password' : 'Staff & Operator Login'}
          </h2>
          <p className="text-xs text-[#9899A1] mt-1">
            {mustChangePassword 
              ? 'Your account requires you to set a secure new password.' 
              : 'Sign in to access your itineraries, operational fleet, and white-label tools.'}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-start gap-2 animate-shake">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Password Change Form */}
        {mustChangePassword ? (
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">New Password (min 8 chars)</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#9899A1] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new secure password"
                  required
                  className="w-full pl-9 pr-3 py-2 text-sm bg-[#26214F]/60 border border-[#26214F] rounded-lg text-white placeholder-[#9899A1] focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Confirm New Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#9899A1] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  required
                  className="w-full pl-9 pr-3 py-2 text-sm bg-[#26214F]/60 border border-[#26214F] rounded-lg text-white placeholder-[#9899A1] focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={changingPassword}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-semibold text-sm shadow hover:from-amber-400 hover:to-amber-500 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {changingPassword && <RefreshCw className="w-4 h-4 animate-spin" />}
              {changingPassword ? 'Saving Password...' : 'Save & Continue'}
            </button>
          </form>
        ) : (
          /* Normal Login Form */
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#9899A1] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. staff@lobotravels.com"
                  required
                  className="w-full pl-9 pr-3 py-2 text-sm bg-[#26214F]/60 border border-[#26214F] rounded-lg text-white placeholder-[#9899A1] focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-slate-300">Password</label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#9899A1] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-9 pr-3 py-2 text-sm bg-[#26214F]/60 border border-[#26214F] rounded-lg text-white placeholder-[#9899A1] focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-semibold text-sm shadow hover:from-amber-400 hover:to-amber-500 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <RefreshCw className="w-4 h-4 animate-spin" />}
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>

            {/* Quick Demo Credentials Preset Bar */}
            <div className="pt-4 mt-4 border-t border-[#26214F]/70">
              <p className="text-[11px] font-semibold text-[#9899A1] uppercase tracking-wider text-center mb-2">
                Quick Fill Test Role Accounts
              </p>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={() => fillQuickCredential('superadmin@lobotravels.com', 'Lobo@Super2026!')}
                  className="p-2 text-left rounded bg-[#26214F]/40 hover:bg-[#26214F] border border-purple-500/30 transition text-purple-300"
                >
                  <span className="font-bold block text-white">Super Admin</span>
                  superadmin@lobotravels.com
                </button>
                <button
                  type="button"
                  onClick={() => fillQuickCredential('admin@lobotravels.com', 'Lobo@Admin2026!')}
                  className="p-2 text-left rounded bg-[#26214F]/40 hover:bg-[#26214F] border border-blue-500/30 transition text-blue-300"
                >
                  <span className="font-bold block text-white">Brand Admin</span>
                  admin@lobotravels.com
                </button>
                <button
                  type="button"
                  onClick={() => fillQuickCredential('staff@lobotravels.com', 'Lobo@Staff2026!')}
                  className="p-2 text-left rounded bg-[#26214F]/40 hover:bg-[#26214F] border border-amber-500/30 transition text-amber-300"
                >
                  <span className="font-bold block text-white">Operator</span>
                  staff@lobotravels.com
                </button>
                <button
                  type="button"
                  onClick={() => fillQuickCredential('viewer@lobotravels.com', 'Lobo@Viewer2026!')}
                  className="p-2 text-left rounded bg-[#26214F]/40 hover:bg-[#26214F] border border-slate-600/30 transition text-slate-300"
                >
                  <span className="font-bold block text-white">Viewer</span>
                  viewer@lobotravels.com
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
