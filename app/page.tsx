'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Lock, RefreshCw } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Dashboard from '@/components/Dashboard';
import ItineraryBuilder from '@/components/ItineraryBuilder';
import ItineraryPreview from '@/components/ItineraryPreview';
import TravelVoucherView from '@/components/TravelVoucherView';
import HotelsManager from '@/components/HotelsManager';
import DestinationsManager from '@/components/DestinationsManager';
import SettingsManager from '@/components/SettingsManager';
import FleetManager from '@/components/FleetManager';
import DriversManager from '@/components/DriversManager';
import ReportsDashboard from '@/components/ReportsDashboard';
import RemindersScheduling from '@/components/RemindersScheduling';
import DirectBookingsManager from '@/components/DirectBookingsManager';
import BrandsManager from '@/components/BrandsManager';
import UsersManager from '@/components/UsersManager';
import LoginModal from '@/components/LoginModal';
import LoadingIndicator from '@/components/LoadingIndicator';
import { useLoading } from '@/context/LoadingContext';

import {
  Itinerary,
  Hotel,
  User,
  Brand
} from '@/types';

import {
  useItineraries,
  useHotels,
  useDestinations,
  useAttractions,
  useVehicles,
  useFleet,
  useDrivers,
  useSettings,
  saveItinerary,
  saveItineraryAsync,
  deleteItinerary,
  deleteItineraryAsync,
  duplicateItinerary,
  duplicateItineraryAsync,
  getNextReferenceNumber,
  saveHotel,
  saveHotelAsync,
  deleteHotel,
  deleteHotelAsync,
  saveDestination,
  saveDestinationAsync,
  deleteDestination,
  deleteDestinationAsync,
  saveAttraction,
  saveAttractionAsync,
  deleteAttraction,
  deleteAttractionAsync,
  saveFleetVehicle,
  saveFleetVehicleAsync,
  deleteFleetVehicle,
  deleteFleetVehicleAsync,
  saveDriver,
  saveDriverAsync,
  deleteDriver,
  deleteDriverAsync,
  saveSettings,
  saveSettingsAsync,
  resetAllToDefaults,
  getItineraryById,
  useOperationalBookings,
  saveOperationalBooking,
  saveOperationalBookingAsync,
  deleteOperationalBookingAsync,
  syncFromCloudDatabase
} from '@/lib/storage';

export default function Home() {
  const { withLoading } = useLoading();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // ── Authentication & Multi-Brand State ──
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentBrand, setCurrentBrand] = useState<Brand | null>(null);
  const [isViewingAs, setIsViewingAs] = useState(false);
  const [viewingAsBrand, setViewingAsBrand] = useState<Brand | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    // Check user session
    fetch('/api/auth/me')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!isMounted) return;
        if (data?.authenticated && data.user) {
          setCurrentUser(data.user);
          setCurrentBrand(data.brand);
          setIsViewingAs(!!data.isViewingAs);
          setViewingAsBrand(data.viewingAsBrand || null);
          setIsLoginModalOpen(false);
          // Initial sync from persistent cloud database API routes
          syncFromCloudDatabase().catch(() => {});
        } else {
          setCurrentUser(null);
          setIsLoginModalOpen(true);
        }
      })
      .catch(() => {
        if (!isMounted) return;
        setCurrentUser(null);
        setIsLoginModalOpen(true);
      })
      .finally(() => {
        if (isMounted) setIsAuthChecking(false);
      });

    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam && ['dashboard', 'itineraries', 'hotels', 'destinations', 'reminders', 'reports', 'fleet', 'drivers', 'settings', 'brands', 'users'].includes(tabParam)) {
      setActiveTab(tabParam);
    }

    return () => { isMounted = false; };
  }, []);

  // Enforce role-based tab access
  useEffect(() => {
    if (!currentUser) return;
    if (activeTab === 'brands' && currentUser.role !== 'super_admin') {
      setActiveTab('dashboard');
    }
    if (activeTab === 'users' && currentUser.role !== 'super_admin' && currentUser.role !== 'brand_admin') {
      setActiveTab('dashboard');
    }
    if (activeTab === 'builder' && currentUser.role === 'viewer') {
      setActiveTab('dashboard');
    }
  }, [activeTab, currentUser]);

  // Re-sync latest state from cloud PostgreSQL whenever user switches tabs
  useEffect(() => {
    if (currentUser) {
      syncFromCloudDatabase().catch(() => {});
    }
  }, [activeTab, currentUser]);

  const handleLoginSuccess = (user: User, brand: Brand) => {
    setCurrentUser(user);
    setCurrentBrand(brand);
    setIsLoginModalOpen(false);
    syncFromCloudDatabase().catch(() => {});
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (_) {}
    setCurrentUser(null);
    setCurrentBrand(null);
    setIsViewingAs(false);
    setViewingAsBrand(null);
    setIsLoginModalOpen(true);
  };

  const handleViewAsBrand = async (brandId: string) => {
    await withLoading(async () => {
      try {
        const res = await fetch('/api/brands/view-as', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ brandId })
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok && data.success) {
          setIsViewingAs(data.isViewingAs);
          setViewingAsBrand(data.brand);
          await syncFromCloudDatabase();
        }
      } catch (e) {
        alert('Failed to switch brand view');
      }
    }, 'Switching Brand Workspace', 'Synchronizing brand catalogs & settings...');
  };

  const handleExitViewingAs = async () => {
    await handleViewAsBrand('brand-lobo-travels');
  };

  // Synchronized stores with SSR snapshot hydration safety
  const itineraries = useItineraries();
  const hotels = useHotels();
  const destinations = useDestinations();
  const attractions = useAttractions();
  const vehicles = useVehicles();
  const fleet = useFleet();
  const drivers = useDrivers();
  const settings = useSettings();
  const operationalBookings = useOperationalBookings();

  // Guarded delete handlers that surface storage errors to the user and persist to Neon Postgres
  const handleDeleteFleetVehicle = async (id: string) => {
    await withLoading(async () => {
      try {
        const res = await deleteFleetVehicleAsync(id);
        if (!res.success) {
          alert(res.error || 'Failed to delete vehicle');
          return;
        }
        await syncFromCloudDatabase();
      } catch (e: any) {
        alert(e.message || e);
      }
    }, 'Deleting Fleet Vehicle', 'Updating vehicle records in cloud database...');
  };

  const handleDeleteDriver = async (id: string) => {
    await withLoading(async () => {
      try {
        const res = await deleteDriverAsync(id);
        if (!res.success) {
          alert(res.error || 'Failed to delete driver');
          return;
        }
        await syncFromCloudDatabase();
      } catch (e: any) {
        alert(e.message || e);
      }
    }, 'Deleting Driver', 'Updating driver records in cloud database...');
  };

  // Active Itinerary for Builder, Preview, or Voucher
  const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | null>(null);

  // Handlers
  const handleNewItinerary = () => {
    const nextRef = getNextReferenceNumber();
    const uniqueId = 'itn-' + Math.random().toString(36).substring(2, 9);
    const blankItinerary: Itinerary = {
      id: uniqueId,
      referenceNumber: nextRef,
      tourName: 'Golden Triangle Tour – Delhi, Agra & Jaipur',
      clientName: '',
      clientPhone: '',
      clientEmail: '',
      datesNotConfirmed: false,
      startDate: '2026-10-20',
      endDate: '2026-10-24',
      durationText: '4 Nights / 5 Days',
      nights: 4,
      daysCount: 5,
      adults: 2,
      children: 0,
      childrenDetails: [],
      totalPax: 2,
      paxSummary: '2 Adults',
      vehicleBrand: 'Kia',
      vehicleModel: 'Carens',
      vehicleCategory: 'MUV',
      vehicleDisplay: 'Kia Carens – Private Air-Conditioned Vehicle',
      showCostInItinerary: false,
      costDisplayType: 'total_only',
      currency: 'INR',
      currencySymbol: '₹',
      totalCost: 0,
      costBreakdown: {
        vehicle: 0,
        accommodation: 0,
        sightseeing: 0,
        guide: 0
      },
      advancePaid: 0,
      pendingAmount: 0,
      paymentStatus: 'Unpaid',
      inclusions: [...(settings?.defaultInclusions || [])],
      exclusions: [...(settings?.defaultExclusions || [])],
      specialNotes: 'Taj Mahal is closed every Friday. Monument entry permits, cameras, and personal expenses are paid directly.',
      coverImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
      flightBookings: {
        flightsBookedByUs: false,
        railwayBookedByUs: false,
        busBookedByUs: false,
        flights: []
      },
      status: 'Draft',
      createdAt: '2026-09-28T09:00:00.000Z',
      updatedAt: '2026-09-28T09:00:00.000Z',
      days: [
        {
          id: 'day-1',
          dayNumber: 1,
          title: 'Arrival in Delhi',
          destination: 'Delhi',
          attractionIds: [],
          attractionNames: [],
          description: 'Welcome to Delhi! Upon arrival, meet and greet with private chauffeur. Transfer to your hotel for check-in and leisure time to freshen up. The remainder of the day is at leisure to unwind or explore the local surroundings at your own pace.',
          isOvernightSameLocation: true,
          overnightLocation: 'Delhi',
          arrivalDetails: {
            enabled: true,
            point: 'Airport',
            flightOrTrainNumber: '',
            arrivalTime: '',
            includeHotelCheckIn: true,
            checkInTiming: 'before_sightseeing'
          },
          meals: {
            breakfast: false,
            lunch: false,
            dinner: false,
            note: ''
          },
          hotel: {
            name: 'The Lalit New Delhi',
            city: 'Delhi',
            roomCategory: 'Deluxe Room',
            mealPlan: 'Breakfast Included (CP)',
            starCategory: 5
          },
          images: []
        }
      ]
    };

    setSelectedItinerary(blankItinerary);
    setActiveTab('builder');
  };

  const handleViewItinerary = (id: string) => {
    const item = getItineraryById(id);
    if (item) {
      setSelectedItinerary(item);
      setActiveTab('preview');
    }
  };

  const handleEditItinerary = (id: string) => {
    const item = getItineraryById(id);
    if (item) {
      setSelectedItinerary(item);
      setActiveTab('builder');
    }
  };

  const handleDuplicate = async (id: string) => {
    await withLoading(async () => {
      try {
        const duplicated = await duplicateItineraryAsync(id);
        if (duplicated) {
          setSelectedItinerary(duplicated);
          await syncFromCloudDatabase();
          setActiveTab('preview');
        }
      } catch (err: any) {
        alert(`Failed to duplicate itinerary: ${err?.message || err}`);
      }
    }, 'Duplicating Itinerary', 'Creating a new copy in cloud database...');
  };

  const handleDelete = async (id: string) => {
    await withLoading(async () => {
      try {
        const res = await deleteItineraryAsync(id);
        if (!res.success) {
          alert(res.error || 'Failed to delete itinerary from database.');
          return;
        }
        if (selectedItinerary?.id === id) {
          setSelectedItinerary(null);
        }
        await syncFromCloudDatabase();
      } catch (err: any) {
        alert(`Error deleting itinerary: ${err?.message || err}`);
      }
    }, 'Deleting Itinerary', 'Removing record from cloud database...');
  };

  const handleConfirmBooking = async (id: string) => {
    await withLoading(async () => {
      const item = getItineraryById(id);
      if (item) {
        const updated = {
          ...item,
          status: 'Confirmed' as const,
          confirmedAt: new Date().toISOString()
        };
        const res = await saveItineraryAsync(updated);
        if (res.success && res.itinerary) {
          setSelectedItinerary(res.itinerary);
          await syncFromCloudDatabase();
        } else {
          alert(res.error || 'Failed to confirm booking in cloud database.');
        }
      }
    }, 'Confirming Booking', 'Updating status in cloud database...');
  };

  const handleGenerateVoucher = (id: string) => {
    const item = getItineraryById(id);
    if (item) {
      setSelectedItinerary(item);
      setActiveTab('voucher');
    }
  };

  const handleSaveDraft = async (itn: Itinerary) => {
    await withLoading(async () => {
      const res = await saveItineraryAsync(itn);
      if (res.success && res.itinerary) {
        setSelectedItinerary(res.itinerary);
        await syncFromCloudDatabase();
        alert(`Itinerary ${res.itinerary.referenceNumber} successfully saved to cloud database!`);
      } else {
        alert(`Error saving itinerary to cloud database: ${res.error || 'Unknown error'}`);
      }
    }, 'Saving Itinerary Draft', 'Persisting updates to cloud database...');
  };

  const handleGeneratePreview = async (itn: Itinerary) => {
    await withLoading(async () => {
      const toSave: Itinerary = {
        ...itn,
        status: itn.status === 'Draft' ? 'Generated' : itn.status
      };
      const res = await saveItineraryAsync(toSave);
      if (res.success && res.itinerary) {
        setSelectedItinerary(res.itinerary);
        await syncFromCloudDatabase();
        setActiveTab('preview');
      } else {
        alert(`Error saving itinerary to cloud database: ${res.error || 'Unknown error'}`);
      }
    }, 'Generating Proposal Preview', 'Compiling day schedules & pricing tiers...');
  };

  const handleAddNewHotelQuick = (data: Partial<Hotel>): Hotel => {
    const newHotel: Hotel = {
      id: 'ht-' + Math.random().toString(36).substring(2, 9),
      name: data.name || 'New Hotel',
      city: data.city || 'Delhi',
      state: data.state || 'India',
      address: data.address || `${data.name}, City Center`,
      starCategory: data.starCategory || 4,
      rating: data.rating || 4.5,
      reviewCount: data.reviewCount || 400,
      phone: data.phone || '+91 11 0000 0000',
      email: data.email || 'reservations@hotel.com',
      website: data.website || 'https://www.hotel.com',
      description: data.description || `Registered partner property: ${data.name}.`,
      roomCategories: data.roomCategories || ['Deluxe Room', 'Superior Room'],
      mealPlans: data.mealPlans || ['Breakfast Included (CP)', 'Breakfast & Dinner (MAP)'],
      checkInTime: '14:00',
      checkOutTime: '12:00',
      image: data.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      partnershipStatus: 'Preferred'
    };

    saveHotel(newHotel);
    return newHotel;
  };

  // Global search filtering
  const displayedItineraries = (itineraries || []).filter(item => {
    if (!item) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      (item.referenceNumber || '').toLowerCase().includes(q) ||
      (item.clientName || '').toLowerCase().includes(q) ||
      (item.tourName || '').toLowerCase().includes(q) ||
      (item.clientPhone || '').toLowerCase().includes(q) ||
      (item.status || '').toLowerCase().includes(q)
    );
  });

  const effectiveBrand = viewingAsBrand || currentBrand;
  const brandName = effectiveBrand?.name || settings?.companyName || "LOBO'S TRAVEL WIZARD";

  // 1. Loading screen while checking authentication session
  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-[#151521] flex items-center justify-center p-4">
        <LoadingIndicator
          size="lg"
          variant="dark"
          message="Verifying Session Credentials"
          subtext="Connecting to Lobo's Travel Wizard Tour Operations Portal..."
        />
      </div>
    );
  }

  // 2. Strict Authentication Protection: If not authenticated, require login immediately
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#151521] flex flex-col justify-between text-white selection:bg-amber-400 selection:text-slate-950">
        <header className="p-4 sm:p-6 border-b border-[#26214F] flex items-center justify-between max-w-7xl w-full mx-auto">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-white/10 p-1 flex items-center justify-center border border-white/10">
              <img src="/logo.png" alt="Lobo's Travel Wizard" className="h-full w-full object-contain" />
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight">LOBO'S TRAVEL WIZARD</span>
              <p className="text-[11px] text-[#9899A1]">Tour Operations & Multi-Brand Fleet Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
            <Lock className="w-3.5 h-3.5" />
            <span>Secure Operations Portal</span>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-4">
          <LoginModal
            isOpen={true}
            canClose={false}
            onClose={() => {}}
            onLoginSuccess={handleLoginSuccess}
          />
        </main>

        <footer className="p-4 text-center text-xs text-slate-500 border-t border-[#26214F]">
          © {new Date().getFullYear()} Lobo's Travel Wizard Tour Operations. Restricted access — authorized personnel only.
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#151521] flex flex-col font-sans selection:bg-amber-200">
      
      {/* Global Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        settings={settings}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
        onNewItinerary={handleNewItinerary}
        currentUser={currentUser}
        currentBrand={currentBrand}
        isViewingAs={isViewingAs}
        viewingAsBrand={viewingAsBrand}
        onExitViewingAs={handleExitViewingAs}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <Dashboard
            itineraries={displayedItineraries}
            destinations={destinations}
            attractions={attractions}
            hotels={hotels}
            vehicles={vehicles}
            settings={settings}
            onNewItinerary={handleNewItinerary}
            onViewItinerary={handleViewItinerary}
            onEditItinerary={handleEditItinerary}
            onDuplicateItinerary={handleDuplicate}
            onDeleteItinerary={handleDelete}
            onGenerateVoucher={handleGenerateVoucher}
            onExportPdf={(itn) => handleViewItinerary(itn.id)}
            onNavigateTab={setActiveTab}
          />
        )}

        {/* ALL ITINERARIES LIST TAB */}
        {activeTab === 'itineraries' && (
          <Dashboard
            itineraries={displayedItineraries}
            destinations={destinations}
            attractions={attractions}
            hotels={hotels}
            vehicles={vehicles}
            settings={settings}
            onNewItinerary={handleNewItinerary}
            onViewItinerary={handleViewItinerary}
            onEditItinerary={handleEditItinerary}
            onDuplicateItinerary={handleDuplicate}
            onDeleteItinerary={handleDelete}
            onGenerateVoucher={handleGenerateVoucher}
            onExportPdf={(itn) => handleViewItinerary(itn.id)}
            onNavigateTab={setActiveTab}
          />
        )}

        {/* BUILDER TAB */}
        {activeTab === 'builder' && (
          <ItineraryBuilder
            initialItinerary={selectedItinerary}
            destinations={destinations}
            attractions={attractions}
            hotels={hotels}
            vehicles={vehicles}
            settings={settings}
            onSaveDraft={handleSaveDraft}
            onGeneratePreview={handleGeneratePreview}
            onCancel={() => setActiveTab('dashboard')}
            onAddNewHotelQuick={handleAddNewHotelQuick}
          />
        )}

        {/* PREVIEW TAB */}
        {activeTab === 'preview' && selectedItinerary && (
          <ItineraryPreview
            key={selectedItinerary.id + '-' + (selectedItinerary.updatedAt || '')}
            itinerary={selectedItinerary}
            settings={settings}
            destinations={destinations}
            attractions={attractions}
            onEdit={() => setActiveTab('builder')}
            onSave={async (updated) => {
              await withLoading(async () => {
                const res = await saveItineraryAsync(updated);
                if (res.success && res.itinerary) {
                  setSelectedItinerary(res.itinerary);
                  await syncFromCloudDatabase();
                } else {
                  alert(`Error saving itinerary changes: ${res.error || 'Failed to save'}`);
                }
              }, 'Saving Itinerary Changes', 'Persisting day schedules to cloud database...');
            }}
            onDuplicate={handleDuplicate}
            onConfirmBooking={handleConfirmBooking}
            onGenerateVoucher={handleGenerateVoucher}
            onBack={() => setActiveTab('dashboard')}
          />
        )}

        {/* TRAVEL VOUCHER TAB */}
        {activeTab === 'voucher' && selectedItinerary && (
          <TravelVoucherView
            itinerary={selectedItinerary}
            settings={settings}
            onBack={() => setActiveTab('preview')}
          />
        )}

        {/* HOTELS MANAGER TAB */}
        {activeTab === 'hotels' && (
          <HotelsManager
            hotels={hotels}
            onSaveHotel={async (h) => {
              await withLoading(async () => {
                await saveHotelAsync(h);
                await syncFromCloudDatabase();
              }, 'Saving Hotel Partner', 'Updating hotel records in cloud database...');
            }}
            onDeleteHotel={async (id) => {
              await withLoading(async () => {
                await deleteHotelAsync(id);
                await syncFromCloudDatabase();
              }, 'Deleting Hotel Partner', 'Updating hotel records in cloud database...');
            }}
          />
        )}

        {/* DESTINATIONS & ATTRACTIONS TAB */}
        {activeTab === 'destinations' && (
          <DestinationsManager
            destinations={destinations}
            attractions={attractions}
            onSaveDestination={async (d) => {
              await withLoading(async () => {
                await saveDestinationAsync(d);
                await syncFromCloudDatabase();
              }, 'Saving Destination', 'Updating destination in cloud database...');
            }}
            onDeleteDestination={async (id) => {
              await withLoading(async () => {
                await deleteDestinationAsync(id);
                await syncFromCloudDatabase();
              }, 'Deleting Destination', 'Removing destination from cloud database...');
            }}
            onSaveAttraction={async (a) => {
              await withLoading(async () => {
                await saveAttractionAsync(a);
                await syncFromCloudDatabase();
              }, 'Saving Sightseeing Attraction', 'Updating attraction in cloud database...');
            }}
            onDeleteAttraction={async (id) => {
              await withLoading(async () => {
                await deleteAttractionAsync(id);
                await syncFromCloudDatabase();
              }, 'Deleting Attraction', 'Removing attraction from cloud database...');
            }}
          />
        )}

        {/* DIRECT BOOKINGS TAB */}
        {activeTab === 'direct-bookings' && (
          <DirectBookingsManager
            bookings={operationalBookings}
            fleet={fleet}
            drivers={drivers}
            settings={settings}
            onSaveBooking={async (b) => {
              await withLoading(async () => {
                await saveOperationalBookingAsync(b);
                await syncFromCloudDatabase();
              }, 'Saving Direct Booking', 'Updating booking in cloud database...');
            }}
            onDeleteBooking={async (id) => {
              await withLoading(async () => {
                await deleteOperationalBookingAsync(id);
                await syncFromCloudDatabase();
              }, 'Deleting Direct Booking', 'Removing booking from cloud database...');
            }}
          />
        )}

        {/* REMINDERS TAB */}
        {activeTab === 'reminders' && (
          <RemindersScheduling
            bookings={operationalBookings}
            fleet={fleet}
            drivers={drivers}
            settings={settings}
            onSaveBooking={async (b) => {
              await withLoading(async () => {
                await saveOperationalBookingAsync(b);
                await syncFromCloudDatabase();
              }, 'Saving Booking Details', 'Updating schedule and reminders in cloud database...');
            }}
            itineraries={itineraries}
            onViewVoucher={handleGenerateVoucher}
          />
        )}

        {/* REPORTS TAB */}
        {activeTab === 'reports' && (
          <ReportsDashboard
            bookings={operationalBookings}
            fleet={fleet}
            drivers={drivers}
          />
        )}

        {/* FLEET TAB */}
        {activeTab === 'fleet' && (
          <FleetManager
            vehicles={vehicles}
            drivers={drivers}
            fleet={fleet}
            settings={settings}
            onSaveVehicle={async (v) => {
              await withLoading(async () => {
                await saveFleetVehicleAsync(v);
                await syncFromCloudDatabase();
              }, 'Saving Fleet Vehicle', 'Updating vehicle in cloud database...');
            }}
            onDeleteVehicle={handleDeleteFleetVehicle}
            onSaveDriver={async (d) => {
              await withLoading(async () => {
                await saveDriverAsync(d);
                await syncFromCloudDatabase();
              }, 'Saving Driver Profile', 'Updating driver roster in cloud database...');
            }}
            onBookingCreated={async (b) => {
              await withLoading(async () => {
                await saveOperationalBookingAsync(b);
                await syncFromCloudDatabase();
              }, 'Creating Operational Booking', 'Saving booking to cloud database...');
            }}
            onNavigateTab={setActiveTab}
          />
        )}

        {/* DRIVERS TAB */}
        {activeTab === 'drivers' && (
          <DriversManager
            drivers={drivers}
            fleet={fleet}
            settings={settings}
            onSaveDriver={async (d) => {
              await withLoading(async () => {
                await saveDriverAsync(d);
                await syncFromCloudDatabase();
              }, 'Saving Driver Profile', 'Updating driver roster in cloud database...');
            }}
            onDeleteDriver={handleDeleteDriver}
            onSaveVehicle={async (v) => {
              await withLoading(async () => {
                await saveFleetVehicleAsync(v);
                await syncFromCloudDatabase();
              }, 'Saving Fleet Vehicle', 'Updating vehicle in cloud database...');
            }}
            onBookingCreated={async (b) => {
              await withLoading(async () => {
                await saveOperationalBookingAsync(b);
                await syncFromCloudDatabase();
              }, 'Creating Operational Booking', 'Saving booking to cloud database...');
            }}
            onNavigateTab={setActiveTab}
          />
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <SettingsManager
            settings={settings}
            itineraries={itineraries}
            bookings={operationalBookings}
            onSaveSettings={async (st) => {
              await withLoading(async () => {
                await saveSettingsAsync(st);
                await syncFromCloudDatabase();
              }, 'Saving System Settings', 'Applying branding & operations configuration...');
            }}
            onResetDefaults={() => {
              resetAllToDefaults();
            }}
          />
        )}

        {/* BRANDS TAB (Super Admin) */}
        {activeTab === 'brands' && (
          <BrandsManager
            currentBrandId={viewingAsBrand?.id || currentBrand?.id || 'brand-lobo-travels'}
            onViewAsBrand={handleViewAsBrand}
          />
        )}

        {/* USERS TAB (Super Admin / Brand Admin) */}
        {activeTab === 'users' && (
          <UsersManager
            currentUser={currentUser}
            currentBrandId={viewingAsBrand?.id || currentBrand?.id || 'brand-lobo-travels'}
          />
        )}

      </main>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Persistent Quiet App Footer */}
      <footer className="no-print bg-[#151521] text-slate-400 py-6 border-t border-[#26214F] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-wide">
              {brandName.toUpperCase()}
            </span>
            <span>·</span>
            <span>{settings?.tagline || ''}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span>Helpline: {effectiveBrand?.contactInfo?.phones?.[0] || settings?.phones?.[0] || '+91 9811240072'}</span>
            <span>·</span>
            <span>{effectiveBrand?.contactInfo?.email || settings?.email || 'info@lobostravelwizard.com'}</span>
            <span>·</span>
            <span>{effectiveBrand?.contactInfo?.address || settings?.address || ''}</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
