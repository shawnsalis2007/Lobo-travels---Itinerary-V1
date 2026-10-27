'use client';

import React, { useState } from 'react';
import { 
  Compass, 
  PlusCircle, 
  Search, 
  Building2, 
  MapPin, 
  Settings, 
  FileText, 
  Menu, 
  X,
  CalendarClock,
  BarChart3,
  Truck,
  UserCheck,
  Users,
  LogOut,
  LogIn,
  Eye,
  Shield,
  RefreshCw,
  CloudCheck,
  CloudAlert,
  Cloud
} from 'lucide-react';
import { AppSettings, User, Brand, UserRole } from '@/types';
import { useSyncStatus } from '@/lib/storage';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  settings: AppSettings;
  onSearch: (query: string) => void;
  searchQuery: string;
  onNewItinerary: () => void;
  currentUser?: User | null;
  currentBrand?: Brand | null;
  isViewingAs?: boolean;
  viewingAsBrand?: Brand | null;
  onExitViewingAs?: () => void;
  onOpenLogin?: () => void;
  onLogout?: () => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  settings,
  onSearch,
  searchQuery,
  onNewItinerary,
  currentUser,
  currentBrand,
  isViewingAs,
  viewingAsBrand,
  onExitViewingAs,
  onOpenLogin,
  onLogout
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const syncStatus = useSyncStatus();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Compass },
    { id: 'itineraries', label: 'Itineraries', icon: FileText },
    { id: 'hotels', label: 'Hotels', icon: Building2 },
    { id: 'destinations', label: 'Destinations', icon: MapPin },
    { id: 'reminders', label: 'Reminders', icon: CalendarClock },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'fleet', label: 'Fleet', icon: Truck },
    { id: 'drivers', label: 'Drivers', icon: UserCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Additional Super Admin and Brand Admin tabs
  if (currentUser?.role === 'super_admin') {
    navItems.push({ id: 'brands', label: 'Brands', icon: Building2 });
    navItems.push({ id: 'users', label: 'Users', icon: Users });
  } else if (currentUser?.role === 'brand_admin') {
    navItems.push({ id: 'users', label: 'Users', icon: Users });
  }

  const getRoleBadge = (role?: UserRole | string) => {
    switch (role) {
      case 'super_admin':
        return <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">Super Admin</span>;
      case 'brand_admin':
        return <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">Brand Admin</span>;
      case 'operator':
      case 'staff':
        return <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">Operator</span>;
      case 'viewer':
        return <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-500/20 text-slate-300 border border-slate-500/30">Viewer</span>;
      default:
        return null;
    }
  };

  return (
    <header className="no-print sticky top-0 z-40 bg-[#151521] text-white border-b border-[#26214F]/80 shadow-md">
      
      {/* ── Super Admin Viewing-As Alert Banner ── */}
      {isViewingAs && viewingAsBrand && (
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-purple-100 text-xs px-4 py-2 border-b border-purple-700/60 flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2 max-w-4xl">
            <Eye className="w-4 h-4 text-purple-300 flex-shrink-0" />
            <span>
              <strong>Viewing as {viewingAsBrand.name}</strong> ({viewingAsBrand.code}) — All catalogs, itineraries, and settings are currently scoped to this brand.
            </span>
          </div>
          <button
            onClick={onExitViewingAs}
            className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-semibold transition active:scale-95 whitespace-nowrap text-[11px]"
          >
            Exit View / Switch to Lobo Travels
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Company Title */}
          <div 
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
          >
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-lg bg-white/10 p-1 flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-white/30 transition-colors">
              <img 
                src={settings?.logoUrl || '/logo.png'} 
                alt={settings?.companyName || 'Lobo Travels'} 
                className="h-full w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-white group-hover:text-amber-200 transition-colors">
                  {(settings?.companyName || 'LOBO TRAVELS').toUpperCase()}
                </span>
                <span className="hidden md:inline-block text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-[#26214F] text-amber-300 border border-amber-400/20">
                  {currentBrand?.code || 'Tour Operations'}
                </span>
              </div>
              <p className="text-[11px] text-[#9899A1] hidden sm:block truncate max-w-[240px]">
                {settings?.tagline || ''}
              </p>
            </div>
          </div>

          {/* Cloud Sync Status Indicator */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#26214F]/50 border border-[#26214F] text-[11px]">
            {syncStatus.state === 'synced' ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-emerald-400 font-medium">Cloud Synced</span>
              </>
            ) : syncStatus.state === 'syncing' ? (
              <>
                <RefreshCw className="w-3 h-3 text-blue-400 animate-spin" />
                <span className="text-blue-300">Syncing...</span>
              </>
            ) : syncStatus.state === 'offline' ? (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span className="text-amber-300 font-medium">Local/Offline</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                <span className="text-red-300">Sync Alert</span>
              </>
            )}
          </div>

          {/* Global Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs relative">
            <Search className="w-4 h-4 text-[#9899A1] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search Ref, client, tour..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#26214F]/60 text-white placeholder-[#9899A1] rounded-lg border border-[#26214F] focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400 transition"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#9899A1] hover:text-white"
              >
                ×
              </button>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    isActive
                      ? 'bg-[#26214F] text-amber-300 shadow-sm border border-amber-400/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-[#9899A1]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Account & Actions */}
          <div className="flex items-center gap-2">
            
            {/* User Pill or Login Button */}
            {currentUser ? (
              <div className="hidden sm:flex items-center gap-2 bg-[#26214F]/50 border border-[#26214F] rounded-lg px-2.5 py-1">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-purple-600 flex items-center justify-center font-bold text-[11px] text-white">
                  {(currentUser.fullName || currentUser.email || 'U').substring(0, 1).toUpperCase()}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-white truncate max-w-[100px]">{currentUser.fullName || currentUser.email || 'User'}</span>
                    {getRoleBadge(currentUser.role)}
                  </div>
                </div>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    title="Sign Out"
                    className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition ml-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ) : (
              onOpenLogin && (
                <button
                  onClick={onOpenLogin}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#26214F] hover:bg-[#26214F]/80 text-amber-300 border border-amber-400/20 transition"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              )
            )}

            <button
              onClick={() => {
                onNewItinerary();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-sm transition active:scale-95"
            >
              <PlusCircle className="w-4 h-4 text-slate-950" />
              <span className="hidden sm:inline">Create Itinerary</span>
              <span className="sm:hidden">New</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-3 border-t border-[#26214F] space-y-2 overflow-y-auto max-h-[75vh]">
            <div className="relative mb-3">
              <Search className="w-4 h-4 text-[#9899A1] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search reference no., client, tour..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#26214F] text-white placeholder-[#9899A1] rounded-lg border border-[#26214F] focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>
            
            {/* Mobile User Profile */}
            {currentUser && (
              <div className="p-2.5 rounded-lg bg-[#26214F]/60 flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center">
                    {(currentUser.fullName || currentUser.email || 'U').substring(0, 1).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">{currentUser.fullName || currentUser.email || 'User'}</p>
                    <p className="text-[10px] text-slate-400">{currentUser.email || ''}</p>
                  </div>
                </div>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="p-1.5 rounded text-rose-400 hover:bg-rose-950/40 text-xs font-medium flex items-center gap-1"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                  </button>
                )}
              </div>
            )}

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-lg ${
                    isActive ? 'bg-[#26214F] text-amber-300' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
