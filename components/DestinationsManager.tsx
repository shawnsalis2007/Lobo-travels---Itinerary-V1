'use client';

import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  Clock, 
  Sparkles, 
  X,
  Compass,
  Check
} from 'lucide-react';
import { Destination, Attraction } from '@/types';
import { SafeImage } from './SafeImage';

interface DestinationsManagerProps {
  destinations: Destination[];
  attractions: Attraction[];
  onSaveDestination: (dest: Destination) => void;
  onDeleteDestination: (id: string) => void;
  onSaveAttraction: (att: Attraction) => void;
  onDeleteAttraction: (id: string) => void;
}

export default function DestinationsManager({
  destinations,
  attractions,
  onSaveDestination,
  onDeleteDestination,
  onSaveAttraction,
  onDeleteAttraction
}: DestinationsManagerProps) {
  const [selectedDestinationId, setSelectedDestinationId] = useState<string>(
    destinations[0]?.id || 'delhi'
  );
  const [countryFilter, setCountryFilter] = useState('all');
  const [stateFilter, setStateFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isAddDestModalOpen, setIsAddDestModalOpen] = useState(false);
  const [newDestData, setNewDestData] = useState<Partial<Destination>>({
    name: '',
    state: 'Uttarakhand',
    country: 'India',
    shortDescription: '',
    detailedDescription: '',
    recommendedDuration: '2 Days',
    heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    gallery: []
  });

  const [isEditDestModalOpen, setIsEditDestModalOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState<Partial<Destination> | null>(null);

  const [isAddAttractionModalOpen, setIsAddAttractionModalOpen] = useState(false);
  const [editingAttraction, setEditingAttraction] = useState<Partial<Attraction> | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    if (destinations.length > 0 && !destinations.some(d => d.id === selectedDestinationId)) {
      setSelectedDestinationId(destinations[0].id);
    }
  }, [destinations, selectedDestinationId]);

  const handleDeleteDestination = (dest: Destination) => {
    if (confirm(`Delete destination "${dest.name}" and all its sights/attractions? This action cannot be undone.`)) {
      try {
        const remaining = destinations.filter(d => d.id !== dest.id);
        if (selectedDestinationId === dest.id) {
          setSelectedDestinationId(remaining[0]?.id || '');
        }
        onDeleteDestination(dest.id);
        showToast(`Deleted "${dest.name}" successfully`);
      } catch (err: any) {
        alert(`Could not delete destination: ${err?.message || 'Unknown error'}`);
      }
    }
  };

  const handleOpenEditDestination = (dest: Destination) => {
    setEditingDestination({ ...dest });
    setIsEditDestModalOpen(true);
  };

  const handleSaveEditedDestination = () => {
    if (!editingDestination || !editingDestination.id || !editingDestination.name?.trim()) return;
    const updatedDest: Destination = {
      id: editingDestination.id,
      name: editingDestination.name.trim(),
      state: editingDestination.state || 'North India',
      country: editingDestination.country || 'India',
      shortDescription: editingDestination.shortDescription || 'Premier Indian travel destination.',
      detailedDescription: editingDestination.detailedDescription || editingDestination.shortDescription || '',
      recommendedDuration: editingDestination.recommendedDuration || '2 Days',
      heroImage: editingDestination.heroImage || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      gallery: editingDestination.gallery || []
    };
    onSaveDestination(updatedDest);
    setIsEditDestModalOpen(false);
    setEditingDestination(null);
    showToast(`Updated "${updatedDest.name}" and synced to Neon Postgres`);
  };

  const activeDestination = destinations.find(d => d.id === selectedDestinationId) || destinations[0];
  const activeAttractions = attractions.filter(
    a => (a.destinationId && a.destinationId.toLowerCase() === activeDestination?.id?.toLowerCase()) ||
         (a.destinationName && a.destinationName.toLowerCase() === (activeDestination?.name || '').toLowerCase())
  );

  const uniqueCountries = Array.from(new Set(destinations.map(d => d.country || 'India'))).sort((a, b) => {
    if (a === 'India') return -1;
    if (b === 'India') return 1;
    return a.localeCompare(b);
  });

  const availableStates = countryFilter === 'all'
    ? destinations.map(d => d.state)
    : destinations.filter(d => (d.country || 'India').toLowerCase() === countryFilter.toLowerCase()).map(d => d.state);
  const uniqueStates = Array.from(new Set(availableStates)).sort();

  const filteredDestinations = destinations.filter(d => {
    const destCountry = d.country || 'India';
    const matchesCountry = countryFilter === 'all' || destCountry.toLowerCase() === countryFilter.toLowerCase();
    const matchesState = stateFilter === 'all' || d.state.toLowerCase() === stateFilter.toLowerCase();
    const matchesSearch = !searchQuery || 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destCountry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.state.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCountry && matchesState && matchesSearch;
  });

  const handleSaveNewDestination = () => {
    if (!newDestData.name?.trim()) return;
    const dest: Destination = {
      id: newDestData.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: newDestData.name.trim(),
      state: newDestData.state || 'North India',
      country: newDestData.country || 'India',
      shortDescription: newDestData.shortDescription || 'Premier Indian travel destination.',
      detailedDescription: newDestData.detailedDescription || newDestData.shortDescription || '',
      recommendedDuration: newDestData.recommendedDuration || '2 Days',
      heroImage: newDestData.heroImage || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      gallery: []
    };
    onSaveDestination(dest);
    setSelectedDestinationId(dest.id);
    setIsAddDestModalOpen(false);
    showToast(`Created new destination "${dest.name}" and synced to Neon Postgres`);
    setNewDestData({
      name: '',
      state: 'Rajasthan',
      shortDescription: '',
      detailedDescription: '',
      recommendedDuration: '2 Days',
      heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      gallery: []
    });
  };

  const handleOpenAddAttraction = () => {
    if (!activeDestination) return;
    setEditingAttraction({
      destinationId: activeDestination.id,
      destinationName: activeDestination.name,
      name: '',
      shortDescription: '',
      detailedDescription: '',
      duration: '1.5–2 Hours',
      category: 'Historical Monument',
      unesco: false,
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80'
    });
    setIsAddAttractionModalOpen(true);
  };

  const handleEditAttraction = (att: Attraction) => {
    setEditingAttraction({ ...att });
    setIsAddAttractionModalOpen(true);
  };

  const handleSaveAttraction = () => {
    if (!editingAttraction || !editingAttraction.name?.trim() || !activeDestination) return;
    const attId = editingAttraction.id || `${activeDestination.id}-${editingAttraction.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    const att: Attraction = {
      id: attId,
      destinationId: editingAttraction.destinationId || activeDestination.id,
      destinationName: editingAttraction.destinationName || activeDestination.name,
      name: editingAttraction.name.trim(),
      shortDescription: editingAttraction.shortDescription || 'Key sightseeing attraction.',
      detailedDescription: editingAttraction.detailedDescription || editingAttraction.shortDescription || '',
      duration: editingAttraction.duration || '1.5–2 Hours',
      category: editingAttraction.category || 'Historical Monument',
      unesco: !!editingAttraction.unesco,
      image: editingAttraction.image || 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80'
    };
    onSaveAttraction(att);
    setIsAddAttractionModalOpen(false);
    setEditingAttraction(null);
    showToast(`Saved attraction "${att.name}" to Neon Postgres`);
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Top Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Compass className="w-5 h-5 text-purple-600" />
            Destinations & Attractions Database
          </h1>
          <p className="text-xs text-slate-500">
            Comprehensive domestic (North India, Uttarakhand, Goa, Kerala) & international tourism database.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Neon Postgres: Active
          </span>

          <button
            onClick={() => setIsAddDestModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Destination</span>
          </button>
        </div>
      </div>

      {/* Persistence Feedback Toast */}
      {toastMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-semibold flex items-center justify-between shadow-xs animate-in fade-in slide-in-from-top-1">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button type="button" onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-slate-600 font-bold px-1">
            ×
          </button>
        </div>
      )}

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Destinations List */}
        <div className="lg:col-span-4 space-y-3">
          
          {/* Filter Bar */}
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2 text-xs">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search destination, country or state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-900 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <select
                value={countryFilter}
                onChange={(e) => {
                  setCountryFilter(e.target.value);
                  setStateFilter('all');
                }}
                className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-semibold"
              >
                <option value="all">All Countries ({uniqueCountries.length})</option>
                {uniqueCountries.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
              >
                <option value="all">All States ({uniqueStates.length})</option>
                {uniqueStates.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Destinations Scroll List */}
          <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-xs space-y-1 max-h-[260px] sm:max-h-[340px] lg:max-h-[600px] overflow-y-auto">
            {filteredDestinations.map((dest) => {
              const isSelected = dest.id === selectedDestinationId;
              const count = attractions.filter(a => a.destinationName.toLowerCase() === dest.name.toLowerCase()).length;
              return (
                <div
                  key={dest.id}
                  onClick={() => {
                    setSelectedDestinationId(dest.id);
                    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                      document.getElementById('active-destination-view')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`p-3 rounded-xl cursor-pointer transition flex items-center justify-between text-xs ${
                    isSelected
                      ? 'bg-[#151521] text-white shadow-xs'
                      : 'hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-200 flex-shrink-0">
                      <SafeImage src={dest.heroImage} alt={dest.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold truncate">{dest.name}</div>
                      <div className={`text-[10px] truncate ${isSelected ? 'text-amber-300' : 'text-slate-400'}`}>
                        {dest.country ? `${dest.country} · ` : ''}{dest.state} · {dest.recommendedDuration}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isSelected ? 'bg-[#26214F] text-amber-200' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {count} sights
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteDestination(dest);
                      }}
                      className={`p-1 rounded-md opacity-60 hover:opacity-100 transition ${
                        isSelected ? 'hover:bg-rose-900/60 text-rose-300' : 'hover:bg-rose-100 text-slate-400 hover:text-rose-600'
                      }`}
                      title={`Delete ${dest.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: Destination Details & Attractions */}
        <div id="active-destination-view" className="lg:col-span-8 space-y-6">
          {activeDestination && (
            <>
              {/* Destination Hero Banner */}
              <div className="relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 min-h-[220px] sm:h-56 bg-slate-900 text-white flex flex-col justify-end p-4 sm:p-6 pt-16 sm:pt-6">
                <SafeImage src={activeDestination.heroImage} alt={activeDestination.name} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                
                {/* Hero Overlay Top Actions */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEditDestination(activeDestination)}
                    className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 text-xs font-semibold transition shadow-xs"
                    title="Edit destination details & hero photo"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-amber-300" />
                    <span className="hidden sm:inline">Edit Destination</span>
                    <span className="sm:hidden">Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteDestination(activeDestination)}
                    className="p-1.5 rounded-lg bg-rose-600/50 hover:bg-rose-600/80 backdrop-blur-md text-rose-100 border border-rose-400/30 text-xs font-semibold transition shadow-xs"
                    title="Delete Destination"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="relative z-10">
                  <div className="inline-block px-2.5 py-0.5 rounded bg-amber-400 text-slate-950 font-bold text-[10px] uppercase mb-1">
                    {activeDestination.country || 'India'} · {activeDestination.state}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black">{activeDestination.name}</h2>
                  <p className="text-xs text-slate-200 max-w-xl line-clamp-2">
                    {activeDestination.detailedDescription || activeDestination.shortDescription}
                  </p>
                </div>
              </div>

              {/* Attractions Section */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      Key Sights & Monuments in {activeDestination.name} ({activeAttractions.length})
                    </h3>
                    <p className="text-xs text-slate-500">
                      These attractions automatically load in the Day Builder when {activeDestination.name} is chosen.
                    </p>
                  </div>

                  <button
                    onClick={handleOpenAddAttraction}
                    className="self-start sm:self-auto flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Attraction</span>
                  </button>
                </div>

                {activeAttractions.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400">
                    No attractions added for {activeDestination.name} yet. Click &quot;Add Attraction&quot; to record monuments.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeAttractions.map((att) => (
                      <div
                        key={att.id}
                        className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xs transition flex gap-3 text-xs"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-200 flex-shrink-0">
                          <SafeImage src={att.image} alt={att.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="font-bold text-slate-900 truncate">{att.name}</h4>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                title="Edit Info & Image"
                                onClick={() => handleEditAttraction(att)}
                                className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                title="Delete"
                                onClick={() => {
                                  if (confirm(`Delete ${att.name}?`)) {
                                    onDeleteAttraction(att.id);
                                    showToast(`Deleted sight "${att.name}"`);
                                  }
                                }}
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-2">
                            {att.shortDescription}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-0.5">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {att.duration}
                            </span>
                            {att.unesco && (
                              <span className="text-indigo-600 font-bold">· UNESCO World Heritage</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

      </div>

      {/* Add Destination Modal */}
      {isAddDestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-4 sm:p-6 shadow-2xl border border-slate-200 space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Add New Destination</h3>
              <button onClick={() => setIsAddDestModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Destination Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Khajuraho, Jodhpur, Katra, Hanoi, Ella"
                  value={newDestData.name || ''}
                  onChange={(e) => setNewDestData({ ...newDestData, name: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Country *</label>
                  <input
                    type="text"
                    placeholder="e.g. India, Vietnam, Sri Lanka"
                    value={newDestData.country || ''}
                    onChange={(e) => setNewDestData({ ...newDestData, country: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">State / Province</label>
                  <input
                    type="text"
                    placeholder="e.g. Uttarakhand, Central Vietnam"
                    value={newDestData.state || ''}
                    onChange={(e) => setNewDestData({ ...newDestData, state: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Recommended Duration</label>
                <input
                  type="text"
                  placeholder="e.g. 2–3 Days"
                  value={newDestData.recommendedDuration || ''}
                  onChange={(e) => setNewDestData({ ...newDestData, recommendedDuration: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Hero Image URL</label>
                <input
                  type="text"
                  value={newDestData.heroImage || ''}
                  onChange={(e) => setNewDestData({ ...newDestData, heroImage: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={newDestData.shortDescription || ''}
                  onChange={(e) => setNewDestData({ ...newDestData, shortDescription: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsAddDestModalOpen(false)}
                className="px-3.5 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveNewDestination}
                className="px-4 py-1.5 font-bold text-white bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg"
              >
                Save Destination
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Attraction Modal */}
      {isAddAttractionModalOpen && activeDestination && editingAttraction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">
                {editingAttraction.id ? `Edit: ${editingAttraction.name}` : `Add Attraction in ${activeDestination.name}`}
              </h3>
              <button 
                onClick={() => {
                  setIsAddAttractionModalOpen(false);
                  setEditingAttraction(null);
                }} 
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Attraction / Activity Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Amber Fort & Palace, Taj Mahal, Solang Valley"
                  value={editingAttraction.name || ''}
                  onChange={(e) => setEditingAttraction({ ...editingAttraction, name: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 1.5–2 Hours"
                    value={editingAttraction.duration || ''}
                    onChange={(e) => setEditingAttraction({ ...editingAttraction, duration: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Hilltop Fort, Wildlife, Shrine"
                    value={editingAttraction.category || ''}
                    onChange={(e) => setEditingAttraction({ ...editingAttraction, category: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="inline-flex items-center gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={!!editingAttraction.unesco}
                    onChange={(e) => setEditingAttraction({ ...editingAttraction, unesco: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600"
                  />
                  <span className="font-semibold text-indigo-900">
                    UNESCO World Heritage Monument
                  </span>
                </label>
              </div>

              {/* Photo Image URL & Live Preview */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Attraction Image URL</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={editingAttraction.image || ''}
                  onChange={(e) => setEditingAttraction({ ...editingAttraction, image: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono text-[11px]"
                />
                {editingAttraction.image && (
                  <div className="mt-2 flex items-center gap-3 p-2 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="w-14 h-14 rounded bg-slate-200 overflow-hidden flex-shrink-0">
                      <SafeImage src={editingAttraction.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[11px] text-slate-500">Live Image Preview</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Short Description (Used in cards & highlights)</label>
                <textarea
                  rows={2}
                  placeholder="Brief summary sentence..."
                  value={editingAttraction.shortDescription || ''}
                  onChange={(e) => setEditingAttraction({ ...editingAttraction, shortDescription: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Detailed Description (Used in day narrative)</label>
                <textarea
                  rows={2}
                  placeholder="Detailed architectural and historical narrative..."
                  value={editingAttraction.detailedDescription || ''}
                  onChange={(e) => setEditingAttraction({ ...editingAttraction, detailedDescription: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg leading-relaxed"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100">
              {editingAttraction?.id ? (
                <button
                  type="button"
                  onClick={() => {
                    const idToDelete = editingAttraction.id!;
                    const nameToDelete = editingAttraction.name || 'this sight';
                    if (confirm(`Are you sure you want to delete sight "${nameToDelete}"?`)) {
                      onDeleteAttraction(idToDelete);
                      setIsAddAttractionModalOpen(false);
                      setEditingAttraction(null);
                      showToast(`Deleted sight "${nameToDelete}"`);
                    }
                  }}
                  className="px-3 py-1.5 text-rose-600 hover:bg-rose-50 rounded-lg font-medium flex items-center gap-1.5 transition text-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Sight</span>
                </button>
              ) : <div />}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddAttractionModalOpen(false);
                    setEditingAttraction(null);
                  }}
                  className="px-3.5 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveAttraction}
                  className="px-4 py-1.5 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
                >
                  Save to Neon Postgres
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Destination Modal */}
      {isEditDestModalOpen && editingDestination && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-amber-600" />
                <span>Edit Destination: {editingDestination.name}</span>
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsEditDestModalOpen(false);
                  setEditingDestination(null);
                }}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Destination Name</label>
                <input
                  type="text"
                  value={editingDestination.name || ''}
                  onChange={(e) => setEditingDestination({ ...editingDestination, name: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">State / Province</label>
                  <input
                    type="text"
                    value={editingDestination.state || ''}
                    onChange={(e) => setEditingDestination({ ...editingDestination, state: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Country</label>
                  <input
                    type="text"
                    value={editingDestination.country || 'India'}
                    onChange={(e) => setEditingDestination({ ...editingDestination, country: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Recommended Duration</label>
                <input
                  type="text"
                  placeholder="e.g. 2–3 Days"
                  value={editingDestination.recommendedDuration || ''}
                  onChange={(e) => setEditingDestination({ ...editingDestination, recommendedDuration: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Hero Cover Image URL</label>
                <input
                  type="text"
                  value={editingDestination.heroImage || ''}
                  onChange={(e) => setEditingDestination({ ...editingDestination, heroImage: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono text-[11px]"
                />
                {editingDestination.heroImage && (
                  <div className="mt-2 h-28 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                    <SafeImage src={editingDestination.heroImage} alt="Cover Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={editingDestination.shortDescription || ''}
                  onChange={(e) => setEditingDestination({ ...editingDestination, shortDescription: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  value={editingDestination.detailedDescription || ''}
                  onChange={(e) => setEditingDestination({ ...editingDestination, detailedDescription: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100">
              {editingDestination?.id ? (
                <button
                  type="button"
                  onClick={() => {
                    const target = destinations.find(d => d.id === editingDestination.id) || (editingDestination as Destination);
                    setIsEditDestModalOpen(false);
                    setEditingDestination(null);
                    handleDeleteDestination(target);
                  }}
                  className="px-3 py-1.5 text-rose-600 hover:bg-rose-50 rounded-lg font-medium flex items-center gap-1.5 transition text-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Destination</span>
                </button>
              ) : <div />}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditDestModalOpen(false);
                    setEditingDestination(null);
                  }}
                  className="px-3.5 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveEditedDestination}
                  className="px-4 py-1.5 font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-sm transition"
                >
                  Save to Neon Postgres
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
