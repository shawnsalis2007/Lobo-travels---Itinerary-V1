'use client';

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Plus, 
  Eye, 
  Edit2, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  Users, 
  Palette, 
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Layers
} from 'lucide-react';
import { Brand } from '@/types';

interface BrandsManagerProps {
  currentBrandId: string;
  onViewAsBrand: (brandId: string) => void;
}

export default function BrandsManager({ currentBrandId, onViewAsBrand }: BrandsManagerProps) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // New Brand Modal
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newBrand, setNewBrand] = useState({
    name: '',
    code: '',
    referencePrefix: '',
    logoUrl: '',
    brandColorPrimary: '#151521',
    brandColorSecondary: '#26214F',
    brandColorAccent: '#f59e0b',
    maxUsers: 10,
    preloadLoboDestinations: true
  });

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/brands', { cache: 'no-store' });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.brands) {
        setBrands(data.brands);
      } else {
        setError(data.error || 'Failed to fetch brands');
      }
    } catch (err: any) {
      setError(err?.message || 'Network error fetching brands');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleCreateBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrand.name) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/brands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBrand)
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to create brand');
        setSubmitting(false);
        return;
      }

      setIsCreateOpen(false);
      setNewBrand({
        name: '',
        code: '',
        referencePrefix: '',
        logoUrl: '',
        brandColorPrimary: '#151521',
        brandColorSecondary: '#26214F',
        brandColorAccent: '#f59e0b',
        maxUsers: 10,
        preloadLoboDestinations: true
      });
      fetchBrands();
    } catch (err: any) {
      setError(err?.message || 'Error creating brand');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteBrand = async (id: string, name: string) => {
    if (id === 'brand-lobo-travels') {
      alert('The primary Lobo Travels brand cannot be deleted.');
      return;
    }
    if (!confirm(`Are you sure you want to permanently delete brand "${name}"? All associated settings and itineraries will be removed.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/brands/${encodeURIComponent(id)}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        alert(data.error || 'Failed to delete brand');
        return;
      }
      fetchBrands();
    } catch (e: any) {
      alert(e?.message || 'Failed to delete brand');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Building2 className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-white">White-Label Brands Management</h1>
          </div>
          <p className="text-xs text-[#9899A1] mt-1">
            Super Admin portal: Provision and configure independent white-label travel brands with preloaded destination catalogs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchBrands}
            className="p-2 rounded-lg bg-[#26214F] hover:bg-[#26214F]/80 text-slate-300 hover:text-white border border-[#26214F] transition"
            title="Refresh brands"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs shadow transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Brand</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Brand Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((b) => {
          const isCurrent = currentBrandId === b.id;
          const isLobo = b.id === 'brand-lobo-travels';

          return (
            <div 
              key={b.id}
              className={`rounded-xl border transition-all duration-200 bg-[#151521] overflow-hidden flex flex-col justify-between ${
                isCurrent 
                  ? 'border-amber-400 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400/30' 
                  : 'border-[#26214F] hover:border-[#26214F]/80'
              }`}
            >
              {/* Card Header */}
              <div className="p-5 border-b border-[#26214F]/60">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-sm shadow overflow-hidden"
                      style={{ backgroundColor: b.brandColorPrimary || '#151521', border: `1px solid ${b.brandColorAccent || '#f59e0b'}` }}
                    >
                      {b.logoUrl ? (
                        <img src={b.logoUrl} alt={b.name} className="w-full h-full object-contain p-1" />
                      ) : (
                        b.code || b.name.substring(0, 2).toUpperCase()
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-base leading-tight flex items-center gap-1.5">
                        {b.name}
                        {isLobo && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            MASTER
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-[#9899A1] font-mono mt-0.5">Code: {b.code} • Prefix: {b.referencePrefix}</p>
                    </div>
                  </div>

                  <span className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full ${
                    b.status === 'active' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}>
                    {b.status}
                  </span>
                </div>

                {/* Details Pills */}
                <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] text-[#9899A1]">
                  <div className="p-2 rounded bg-[#26214F]/30 border border-[#26214F]/40 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-blue-400" />
                    <span>Max Seats: <strong className="text-white">{b.maxUsers}</strong></span>
                  </div>
                  <div className="p-2 rounded bg-[#26214F]/30 border border-[#26214F]/40 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-amber-400" />
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: b.brandColorPrimary }}></span>
                      <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: b.brandColorAccent }}></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 bg-[#151521]/60 flex items-center justify-between gap-2">
                <button
                  onClick={() => onViewAsBrand(b.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                    isCurrent
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30 cursor-default'
                      : 'bg-[#26214F] hover:bg-[#26214F]/80 text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isCurrent ? 'Currently Viewing' : 'View As Brand'}</span>
                </button>

                {!isLobo && (
                  <button
                    onClick={() => handleDeleteBrand(b.id, b.name)}
                    className="p-2 rounded-lg text-rose-400 hover:text-white hover:bg-rose-950/60 transition"
                    title="Delete Brand"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Brand Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-[#151521] border border-[#26214F] text-white rounded-2xl shadow-2xl p-6 overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-lg text-white">Create White-Label Brand</h3>
              </div>
              <button onClick={() => setIsCreateOpen(false)} className="text-[#9899A1] hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateBrand} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Brand Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Heritage Tours"
                  value={newBrand.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const code = name.replace(/[^A-Za-z]/g, '').substring(0, 4).toUpperCase();
                    setNewBrand({
                      ...newBrand,
                      name,
                      code: newBrand.code || code,
                      referencePrefix: newBrand.referencePrefix || (code ? `${code}-2026-` : '')
                    });
                  }}
                  className="w-full px-3 py-2 text-sm bg-[#26214F]/60 border border-[#26214F] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Brand Code (e.g. VKTR)</label>
                  <input
                    type="text"
                    required
                    placeholder="VKTR"
                    value={newBrand.code}
                    onChange={(e) => setNewBrand({ ...newBrand, code: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 text-sm bg-[#26214F]/60 border border-[#26214F] rounded-lg text-white font-mono focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Reference Prefix</label>
                  <input
                    type="text"
                    required
                    placeholder="VKTR-2026-"
                    value={newBrand.referencePrefix}
                    onChange={(e) => setNewBrand({ ...newBrand, referencePrefix: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-[#26214F]/60 border border-[#26214F] rounded-lg text-white font-mono focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Primary Color</label>
                  <input
                    type="color"
                    value={newBrand.brandColorPrimary}
                    onChange={(e) => setNewBrand({ ...newBrand, brandColorPrimary: e.target.value })}
                    className="w-full h-9 rounded bg-[#26214F] border border-[#26214F] cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Secondary Color</label>
                  <input
                    type="color"
                    value={newBrand.brandColorSecondary}
                    onChange={(e) => setNewBrand({ ...newBrand, brandColorSecondary: e.target.value })}
                    className="w-full h-9 rounded bg-[#26214F] border border-[#26214F] cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Accent Color</label>
                  <input
                    type="color"
                    value={newBrand.brandColorAccent}
                    onChange={(e) => setNewBrand({ ...newBrand, brandColorAccent: e.target.value })}
                    className="w-full h-9 rounded bg-[#26214F] border border-[#26214F] cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Logo URL (Optional)</label>
                <input
                  type="text"
                  placeholder="https://example.com/logo.png"
                  value={newBrand.logoUrl}
                  onChange={(e) => setNewBrand({ ...newBrand, logoUrl: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-[#26214F]/60 border border-[#26214F] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newBrand.preloadLoboDestinations}
                    onChange={(e) => setNewBrand({ ...newBrand, preloadLoboDestinations: e.target.checked })}
                    className="mt-0.5 rounded text-amber-500 focus:ring-amber-400 bg-[#26214F] border-[#26214F]"
                  />
                  <div>
                    <span className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Preload Lobo Destination Catalog
                    </span>
                    <p className="text-[11px] text-[#9899A1] mt-0.5">
                      Copies all 68 Lobo destinations and 302 attractions into this brand catalog with neutralized contact info. Lobo master remains 100% untouched.
                    </p>
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#26214F]">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
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
                  {submitting ? 'Creating Brand...' : 'Create Brand'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
