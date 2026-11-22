'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  CalendarCheck,
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
import { useSyncStatus, syncFromCloudDatabase } from '@/lib/storage';

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
  const [desktopMoreOpen, setDesktopMoreOpen] = useState(false);
  const desktopMoreRef = useRef<HTMLDivElement>(null);
  const syncStatus = useSyncStatus();

  // Close desktop "More" pop-up modal when pressing Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDesktopMoreOpen(false);
      }
    };
    if (desktopMoreOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [desktopMoreOpen]);

  const effectiveBrand = viewingAsBrand || currentBrand;
  const brandName = effectiveBrand?.name || settings?.companyName || "LOBO'S TRAVEL WIZARD";
  const brandLogo = effectiveBrand?.logoUrl || settings?.logoUrl || '/logo.png';

  // Primary navigation items (visible directly in header up through Direct Itinerary)
  const primaryNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Compass },
    { id: 'itineraries', label: 'Itineraries', icon: FileText },
    { id: 'hotels', label: 'Hotels', icon: Building2 },
    { id: 'destinations', label: 'Destinations', icon: MapPin },
    { id: 'direct-bookings', label: 'Direct Itinerary', icon: CalendarCheck },
  ];

  // Secondary navigation items (moved into hamburger menu)
  const moreNavItems = [
    { id: 'reminders', label: 'Reminders', icon: CalendarClock },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'fleet', label: 'Fleet', icon: Truck },
    { id: 'drivers', label: 'Drivers', icon: UserCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Additional Super Admin and Brand Admin tabs
  if (currentUser?.role === 'super_admin') {
    moreNavItems.push({ id: 'brands', label: 'Brands', icon: Building2 });
    moreNavItems.push({ id: 'users', label: 'Users', icon: Users });
  } else if (currentUser?.role === 'brand_admin') {
    moreNavItems.push({ id: 'users', label: 'Users', icon: Users });
  }

  const allNavItems = [...primaryNavItems, ...moreNavItems];
  const isMoreActive = moreNavItems.some(item => item.id === activeTab);

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
    <header className="no-print sticky top-0 z-40 bg-[#151521] text-white border-b border-[#26214F]/80 shadow-md w-full overflow-x-hidden">
      
      {/* ── Super Admin Viewing-As Alert Banner ── */}
      {isViewingAs && viewingAsBrand && (
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-purple-100 text-xs px-3 sm:px-4 py-2 border-b border-purple-700/60 flex items-center justify-between animate-fadeIn gap-2">
          <div className="flex items-center gap-2 max-w-4xl min-w-0">
            <Eye className="w-4 h-4 text-purple-300 flex-shrink-0" />
            <span className="truncate">
              <strong>Viewing as {viewingAsBrand.name}</strong> ({viewingAsBrand.code}) — Scoped to this brand.
            </span>
          </div>
          <button
            onClick={onExitViewingAs}
            className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-white/10 hover:bg-white/20 text-white font-semibold transition active:scale-95 whitespace-nowrap text-[10px] sm:text-[11px] flex-shrink-0"
          >
            Exit View
          </button>
        </div>
      )}

      <div className="w-full max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-1.5 sm:gap-4 w-full min-w-0">
          
          {/* Logo & Company Title */}
          <div 
            onClick={() => {
              setActiveTab('dashboard');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 flex-1 sm:flex-initial"
          >
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-white/10 p-1 flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-white/30 transition-colors flex-shrink-0">
              <img 
                src={brandLogo} 
                alt={brandName} 
                className="h-full w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-white group-hover:text-amber-200 transition-colors truncate max-w-[125px] min-[380px]:max-w-[165px] min-[440px]:max-w-[220px] sm:max-w-none block">
                  {brandName.toUpperCase()}
                </span>
                <span className="hidden md:inline-block text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-[#26214F] text-amber-300 border border-amber-400/20 flex-shrink-0">
                  {effectiveBrand?.code || 'Tour Operations'}
                </span>
              </div>
              <p className="text-[11px] text-[#9899A1] hidden sm:block truncate max-w-[240px]">
                {settings?.tagline || ''}
              </p>
            </div>
          </div>

          {/* Cloud Sync Status Indicator & Manual Trigger */}
          <button
            onClick={() => syncFromCloudDatabase()}
            title="Click to instantly sync with PostgreSQL cloud database"
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#26214F]/50 hover:bg-[#26214F] border border-[#26214F] text-[11px] transition cursor-pointer active:scale-95"
          >
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
          </button>

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
          <nav className="hidden lg:flex items-center space-x-1">
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setDesktopMoreOpen(false);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
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

            {/* Hamburger / More Menu for items after Direct Itinerary */}
            <div className="relative" ref={desktopMoreRef}>
              <button
                type="button"
                onClick={() => setDesktopMoreOpen(prev => !prev)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  isMoreActive || desktopMoreOpen
                    ? 'bg-[#26214F] text-amber-300 shadow-sm border border-amber-400/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
                title="More Navigation Modules"
                aria-label="More Navigation Modules"
                aria-expanded={desktopMoreOpen}
              >
                <Menu className={`w-4 h-4 ${isMoreActive ? 'text-amber-300' : 'text-[#9899A1]'}`} />
                <span>More</span>
                {isMoreActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 ml-0.5" />
                )}
              </button>

              {desktopMoreOpen && (
                <div 
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
                  onClick={() => setDesktopMoreOpen(false)}
                >
                  <div 
                    className="bg-[#151521] border border-[#26214F] text-white rounded-2xl shadow-2xl w-full max-w-lg p-5 relative overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between border-b border-[#26214F]/80 pb-3 mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                          <Menu className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white">Operations & Extra Modules</h3>
                          <p className="text-[11px] text-slate-400">Select a management or reporting module to navigate</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setDesktopMoreOpen(false)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
                        aria-label="Close modal"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[65vh] overflow-y-auto pr-1">
                      {moreNavItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setActiveTab(item.id);
                              setDesktopMoreOpen(false);
                            }}
                            className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer group ${
                              isActive
                                ? 'bg-[#26214F] text-amber-300 border-amber-400/40 shadow-sm'
                                : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:text-white hover:border-white/15'
                            }`}
                          >
                            <div className={`p-2 rounded-lg transition-colors ${
                              isActive ? 'bg-amber-400/20 text-amber-300' : 'bg-white/5 text-slate-400 group-hover:text-amber-400 group-hover:bg-amber-400/10'
                            }`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-xs font-semibold">{item.label}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* User Account & Actions */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            
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
                  className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#26214F] hover:bg-[#26214F]/80 text-amber-300 border border-amber-400/20 transition flex-shrink-0"
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
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-sm transition active:scale-95 flex-shrink-0"
            >
              <PlusCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950" />
              <span className="hidden sm:inline">Create Itinerary</span>
              <span className="sm:hidden text-[11px]">New</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 flex-shrink-0 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-[#26214F] space-y-2 overflow-y-auto max-h-[75vh]">
            <div className="relative mb-3">
              <Search className="w-4 h-4 text-[#9899A1] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search reference no., client, tour..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs bg-[#26214F] text-white placeholder-[#9899A1] rounded-lg border border-[#26214F] focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
              {searchQuery && (
                <button 
                  onClick={() => onSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-[#9899A1] hover:text-white p-1"
                >
                  ×
                </button>
              )}
            </div>

            {/* Mobile Cloud Sync Status & Manual Trigger */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#26214F]/60 border border-[#26214F] text-xs mb-2">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${syncStatus.state === 'synced' ? 'bg-emerald-400 animate-pulse' : syncStatus.state === 'syncing' ? 'bg-blue-400 animate-ping' : 'bg-amber-400'}`} />
                <span className="text-slate-300 font-medium">
                  {syncStatus.state === 'synced' ? 'Cloud Synced' : syncStatus.state === 'syncing' ? 'Syncing...' : 'Local/Offline'}
                </span>
              </div>
              <button
                onClick={() => syncFromCloudDatabase()}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-amber-300 text-[11px] font-semibold active:scale-95 transition"
              >
                <RefreshCw className={`w-3 h-3 ${syncStatus.state === 'syncing' ? 'animate-spin text-blue-300' : 'text-amber-300'}`} />
                <span>Sync Now</span>
              </button>
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

            {!currentUser && onOpenLogin && (
              <button
                onClick={() => {
                  onOpenLogin();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-1.5 p-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold mb-2"
              >
                <LogIn className="w-3.5 h-3.5" /> Sign In
              </button>
            )}

            {allNavItems.map((item) => {
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
