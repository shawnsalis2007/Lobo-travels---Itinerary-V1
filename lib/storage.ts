import { useSyncExternalStore } from 'react';
import { Itinerary, Hotel, Destination, Attraction, VehicleOption, AppSettings, FleetVehicle, Driver, OperationalBooking, OperationalBookingStatus } from '@/types';
import {
  DEFAULT_SETTINGS,
  INITIAL_VEHICLES,
  INITIAL_DESTINATIONS,
  INITIAL_ATTRACTIONS,
  INITIAL_HOTELS,
  INITIAL_ITINERARIES,
  INITIAL_FLEET,
  INITIAL_DRIVERS,
  INITIAL_OPERATIONAL_BOOKINGS
} from './mock-data';
import { getAttractionImage } from './catalog-data';

const STORAGE_KEYS = {
  SETTINGS: 'lobo_settings_v1',
  VEHICLES: 'lobo_vehicles_v1',
  DESTINATIONS: 'lobo_destinations_v5',
  ATTRACTIONS: 'lobo_attractions_v9',
  HOTELS: 'lobo_hotels_v1',
  ITINERARIES: 'lobo_itineraries_v3',
  NEXT_REF: 'lobo_next_ref_v1',
  FLEET: 'lobo_fleet_v1',
  DRIVERS: 'lobo_drivers_v1',
  BOOKINGS: 'lobo_bookings_v1',
};

// In-memory cache for synchronous snapshots
let itinerariesCache: Itinerary[] | null = null;
let hotelsCache: Hotel[] | null = null;
let destinationsCache: Destination[] | null = null;
let attractionsCache: Attraction[] | null = null;
let vehiclesCache: VehicleOption[] | null = null;
let settingsCache: AppSettings | null = null;
let fleetCache: FleetVehicle[] | null = null;
let driversCache: Driver[] | null = null;
let bookingsCache: OperationalBooking[] | null = null;

function getStorageItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    console.error(`Error reading ${key} from storage`, e);
    return fallback;
  }
}

// Sanitizes raw or partially initialized settings by deep-merging with DEFAULT_SETTINGS
export function sanitizeSettings(raw: Partial<AppSettings> | null | undefined): AppSettings {
  if (!raw || typeof raw !== 'object') {
    return { ...DEFAULT_SETTINGS, connectedCalendars: [] };
  }
  return {
    ...DEFAULT_SETTINGS,
    ...raw,
    companyName: raw.companyName || DEFAULT_SETTINGS.companyName,
    tagline: raw.tagline !== undefined ? raw.tagline : DEFAULT_SETTINGS.tagline,
    logoUrl: (raw.logoUrl && !raw.logoUrl.includes('github.com/VensonLobo')) ? raw.logoUrl : DEFAULT_SETTINGS.logoUrl,
    phones: Array.isArray(raw.phones) && raw.phones.length > 0 ? raw.phones : [...DEFAULT_SETTINGS.phones],
    email: raw.email || DEFAULT_SETTINGS.email,
    address: raw.address !== undefined ? raw.address : DEFAULT_SETTINGS.address,
    website: raw.website !== undefined ? raw.website : DEFAULT_SETTINGS.website,
    referencePrefix: raw.referencePrefix || DEFAULT_SETTINGS.referencePrefix,
    nextReferenceSequence: typeof raw.nextReferenceSequence === 'number' ? raw.nextReferenceSequence : DEFAULT_SETTINGS.nextReferenceSequence,
    voucherTerms: raw.voucherTerms !== undefined ? raw.voucherTerms : DEFAULT_SETTINGS.voucherTerms,
    defaultInclusions: Array.isArray(raw.defaultInclusions) && raw.defaultInclusions.length > 0 ? raw.defaultInclusions : [...DEFAULT_SETTINGS.defaultInclusions],
    defaultExclusions: Array.isArray(raw.defaultExclusions) && raw.defaultExclusions.length > 0 ? raw.defaultExclusions : [...DEFAULT_SETTINGS.defaultExclusions],
    brandColorPrimary: raw.brandColorPrimary || DEFAULT_SETTINGS.brandColorPrimary,
    brandColorSecondary: raw.brandColorSecondary || DEFAULT_SETTINGS.brandColorSecondary,
    brandColorAccent: raw.brandColorAccent || DEFAULT_SETTINGS.brandColorAccent,
    connectedCalendars: Array.isArray(raw.connectedCalendars) ? raw.connectedCalendars : []
  };
}

let isRefreshing = false;

function refreshAllCaches(): void {
  if (typeof window === 'undefined') return;
  if (isRefreshing) return;
  isRefreshing = true;

  try {
    try {
      localStorage.removeItem('lobo_destinations_v2');
      localStorage.removeItem('lobo_destinations_v3');
      localStorage.removeItem('lobo_destinations_v4');
      localStorage.removeItem('lobo_attractions_v2');
      localStorage.removeItem('lobo_attractions_v3');
      localStorage.removeItem('lobo_attractions_v7');
      localStorage.removeItem('lobo_attractions_v8');
    } catch (_) {}
    
    // Load itineraries v3 with fallback to v2 or INITIAL_ITINERARIES
    let loadedItins = getStorageItem<Itinerary[] | null>(STORAGE_KEYS.ITINERARIES, null);
    if (!loadedItins) {
      const v2 = getStorageItem<Itinerary[] | null>('lobo_itineraries_v2', null);
      if (v2 && Array.isArray(v2)) {
        // Sanitize v2 itineraries by clearing unmapped dummy day images
        loadedItins = v2.map(itin => ({
          ...itin,
          days: itin.days.map(d => ({
            ...d,
            images: []
          }))
        }));
      } else {
        loadedItins = INITIAL_ITINERARIES;
      }
      try {
        localStorage.setItem(STORAGE_KEYS.ITINERARIES, JSON.stringify(loadedItins));
      } catch (_) {}
    }
    itinerariesCache = loadedItins;
    hotelsCache = getStorageItem<Hotel[]>(STORAGE_KEYS.HOTELS, INITIAL_HOTELS);

    // Auto-merge newly loaded destinations catalog
    const storedDests = getStorageItem<Destination[]>(STORAGE_KEYS.DESTINATIONS, []);
    const destMap = new Map<string, Destination>();
    // 1. Initial canonical destinations always have authentic verified photos
    INITIAL_DESTINATIONS.forEach(d => destMap.set(d.id.toLowerCase(), d));
    // 2. Only preserve custom destinations added by the user (ignoring legacy combined dalhousie-mcleodganj)
    if (Array.isArray(storedDests)) {
      storedDests.forEach(d => {
        const lowerName = (d.name || '').toLowerCase();
        const lowerId = (d.id || '').toLowerCase();
        if ((lowerName.includes('dalhousie') && lowerName.includes('mcleodganj')) || lowerId === 'dalhousie-mcleodganj') {
          return; // Remove obsolete combined entry
        }
        if (!destMap.has(d.id.toLowerCase())) {
          destMap.set(d.id.toLowerCase(), d);
        }
      });
    }
    destinationsCache = Array.from(destMap.values());
    try {
      localStorage.setItem(STORAGE_KEYS.DESTINATIONS, JSON.stringify(destinationsCache));
    } catch (_) {}

    // Auto-merge newly loaded attractions catalog
    const storedAtts = getStorageItem<Attraction[]>(STORAGE_KEYS.ATTRACTIONS, []);
    const attMap = new Map<string, Attraction>();
    // 1. Initial canonical attractions always have authentic verified photos
    INITIAL_ATTRACTIONS.forEach(a => {
      const overrideImg = getAttractionImage(a.name, a.image) || getAttractionImage(a.id, a.image);
      attMap.set(a.id.toLowerCase(), { ...a, image: overrideImg });
    });
    // 2. Only preserve custom attractions added by the user, applying overrides if applicable
    if (Array.isArray(storedAtts)) {
      storedAtts.forEach(a => {
        if (!attMap.has(a.id.toLowerCase())) {
          const overrideImg = getAttractionImage(a.name, a.image) || getAttractionImage(a.id, a.image);
          attMap.set(a.id.toLowerCase(), { ...a, image: overrideImg });
        }
      });
    }
    attractionsCache = Array.from(attMap.values());
    try {
      localStorage.setItem(STORAGE_KEYS.ATTRACTIONS, JSON.stringify(attractionsCache));
    } catch (_) {}

    vehiclesCache = getStorageItem<VehicleOption[]>(STORAGE_KEYS.VEHICLES, INITIAL_VEHICLES);
    const rawSettings = getStorageItem<Partial<AppSettings>>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
    settingsCache = sanitizeSettings(rawSettings);
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settingsCache));
    } catch (_) {}
    fleetCache = getStorageItem<FleetVehicle[]>(STORAGE_KEYS.FLEET, INITIAL_FLEET);
    driversCache = getStorageItem<Driver[]>(STORAGE_KEYS.DRIVERS, INITIAL_DRIVERS);
    bookingsCache = getStorageItem<OperationalBooking[]>(STORAGE_KEYS.BOOKINGS, INITIAL_OPERATIONAL_BOOKINGS);
  } finally {
    isRefreshing = false;
  }
}

// Convert Itinerary Ref (e.g. LT-2026-0001) to Voucher Ref (LTV-2026-0001)
export function getVoucherReferenceNumber(itineraryRef: string): string {
  if (!itineraryRef) return 'LTV-2026-0001';
  if (itineraryRef.startsWith('LT-')) {
    return itineraryRef.replace(/^LT-/, 'LTV-');
  }
  if (itineraryRef.startsWith('LT')) {
    return itineraryRef.replace(/^LT/, 'LTV');
  }
  return `LTV-${itineraryRef}`;
}

function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    switch (key) {
      case STORAGE_KEYS.SETTINGS: settingsCache = sanitizeSettings(value as Partial<AppSettings>); break;
      case STORAGE_KEYS.VEHICLES: vehiclesCache = value as VehicleOption[]; break;
      case STORAGE_KEYS.DESTINATIONS: destinationsCache = value as Destination[]; break;
      case STORAGE_KEYS.ATTRACTIONS: attractionsCache = value as Attraction[]; break;
      case STORAGE_KEYS.HOTELS: hotelsCache = value as Hotel[]; break;
      case STORAGE_KEYS.ITINERARIES: itinerariesCache = value as Itinerary[]; break;
      case STORAGE_KEYS.FLEET: fleetCache = value as FleetVehicle[]; break;
      case STORAGE_KEYS.DRIVERS: driversCache = value as Driver[]; break;
      case STORAGE_KEYS.BOOKINGS: bookingsCache = value as OperationalBooking[]; break;
    }
    window.dispatchEvent(new Event('lobo_storage_updated'));
  } catch (e) {
    console.error(`Error saving ${key} to storage`, e);
  }
}

function subscribeStorage(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handleUpdate = () => {
    refreshAllCaches();
    callback();
  };

  window.addEventListener('lobo_storage_updated', handleUpdate);
  window.addEventListener('storage', handleUpdate);

  return () => {
    window.removeEventListener('lobo_storage_updated', handleUpdate);
    window.removeEventListener('storage', handleUpdate);
  };
}

// React useSyncExternalStore Hooks (Guarantees zero SSR hydration mismatches)
export function useItineraries(): Itinerary[] {
  return useSyncExternalStore(
    subscribeStorage,
    () => {
      if (!itinerariesCache) refreshAllCaches();
      return itinerariesCache || INITIAL_ITINERARIES;
    },
    () => INITIAL_ITINERARIES
  );
}

export function useHotels(): Hotel[] {
  return useSyncExternalStore(
    subscribeStorage,
    () => {
      if (!hotelsCache) refreshAllCaches();
      return hotelsCache || INITIAL_HOTELS;
    },
    () => INITIAL_HOTELS
  );
}

export function useDestinations(): Destination[] {
  return useSyncExternalStore(
    subscribeStorage,
    () => {
      if (!destinationsCache) refreshAllCaches();
      return destinationsCache || INITIAL_DESTINATIONS;
    },
    () => INITIAL_DESTINATIONS
  );
}

export function useAttractions(): Attraction[] {
  return useSyncExternalStore(
    subscribeStorage,
    () => {
      if (!attractionsCache) refreshAllCaches();
      return attractionsCache || INITIAL_ATTRACTIONS;
    },
    () => INITIAL_ATTRACTIONS
  );
}

export function useVehicles(): VehicleOption[] {
  return useSyncExternalStore(
    subscribeStorage,
    () => {
      if (!vehiclesCache) refreshAllCaches();
      return vehiclesCache || INITIAL_VEHICLES;
    },
    () => INITIAL_VEHICLES
  );
}

export function useSettings(): AppSettings {
  return useSyncExternalStore(
    subscribeStorage,
    () => {
      if (!settingsCache) refreshAllCaches();
      return settingsCache || DEFAULT_SETTINGS;
    },
    () => DEFAULT_SETTINGS
  );
}

// Standard synchronous getters (fallbacks)
export function getSettings(): AppSettings {
  if (settingsCache) return settingsCache;
  const rawSettings = getStorageItem<Partial<AppSettings>>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  settingsCache = sanitizeSettings(rawSettings);
  return settingsCache;
}

export function saveSettings(settings: AppSettings): void {
  const sanitized = sanitizeSettings(settings);
  setStorageItem(STORAGE_KEYS.SETTINGS, sanitized);
}

// Vehicles
export function getVehicles(): VehicleOption[] {
  return getStorageItem<VehicleOption[]>(STORAGE_KEYS.VEHICLES, INITIAL_VEHICLES);
}

export function saveVehicles(vehicles: VehicleOption[]): void {
  setStorageItem(STORAGE_KEYS.VEHICLES, vehicles);
}

// Destinations
export function getDestinations(): Destination[] {
  return getStorageItem<Destination[]>(STORAGE_KEYS.DESTINATIONS, INITIAL_DESTINATIONS);
}

export function saveDestination(destination: Destination): void {
  const current = getDestinations();
  const index = current.findIndex(d => d.id === destination.id);
  let updated: Destination[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = destination;
  } else {
    updated = [destination, ...current];
  }
  setStorageItem(STORAGE_KEYS.DESTINATIONS, updated);
}

export function deleteDestination(id: string): void {
  const current = getDestinations();
  setStorageItem(STORAGE_KEYS.DESTINATIONS, current.filter(d => d.id !== id));
}

// Attractions
export function getAttractions(): Attraction[] {
  return getStorageItem<Attraction[]>(STORAGE_KEYS.ATTRACTIONS, INITIAL_ATTRACTIONS);
}

export function saveAttraction(attraction: Attraction): void {
  const current = getAttractions();
  const index = current.findIndex(a => a.id === attraction.id);
  let updated: Attraction[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = attraction;
  } else {
    updated = [attraction, ...current];
  }
  setStorageItem(STORAGE_KEYS.ATTRACTIONS, updated);
}

export function deleteAttraction(id: string): void {
  const current = getAttractions();
  setStorageItem(STORAGE_KEYS.ATTRACTIONS, current.filter(a => a.id !== id));
}

// Hotels
export function getHotels(): Hotel[] {
  return getStorageItem<Hotel[]>(STORAGE_KEYS.HOTELS, INITIAL_HOTELS);
}

export function saveHotel(hotel: Hotel): void {
  const current = getHotels();
  const index = current.findIndex(h => h.id === hotel.id);
  let updated: Hotel[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = hotel;
  } else {
    updated = [hotel, ...current];
  }
  setStorageItem(STORAGE_KEYS.HOTELS, updated);
}

export function deleteHotel(id: string): void {
  const current = getHotels();
  setStorageItem(STORAGE_KEYS.HOTELS, current.filter(h => h.id !== id));
}

// Reference Number Generator
export function getNextReferenceNumber(): string {
  const settings = getSettings();
  const prefix = settings.referencePrefix || 'LT-2026-';
  const currentSeq = getStorageItem<number>(STORAGE_KEYS.NEXT_REF, settings.nextReferenceSequence || 3);
  const formatted = `${prefix}${String(currentSeq).padStart(4, '0')}`;
  setStorageItem(STORAGE_KEYS.NEXT_REF, currentSeq + 1);
  return formatted;
}

// Itineraries
export function getItineraries(): Itinerary[] {
  if (itinerariesCache && itinerariesCache.length > 0) return itinerariesCache;
  refreshAllCaches();
  if (itinerariesCache && itinerariesCache.length > 0) return itinerariesCache;
  return getStorageItem<Itinerary[]>(STORAGE_KEYS.ITINERARIES, INITIAL_ITINERARIES);
}

export function getItineraryById(id: string): Itinerary | undefined {
  const all = getItineraries();
  return all.find(item => item.id === id || item.referenceNumber.toLowerCase() === id.toLowerCase());
}

export function saveItinerary(itinerary: Itinerary): Itinerary {
  const current = getItineraries();
  const index = current.findIndex(item => item.id === itinerary.id);
  const now = new Date().toISOString();
  let updated: Itinerary[];

  const updatedRecord = {
    ...itinerary,
    updatedAt: now,
  };

  if (index >= 0) {
    updated = [...current];
    updated[index] = updatedRecord;
  } else {
    updatedRecord.createdAt = updatedRecord.createdAt || now;
    updated = [updatedRecord, ...current];
  }

  setStorageItem(STORAGE_KEYS.ITINERARIES, updated);
  return updatedRecord;
}

export function deleteItinerary(id: string): void {
  const current = getItineraries();
  setStorageItem(STORAGE_KEYS.ITINERARIES, current.filter(item => item.id !== id));
}

export function duplicateItinerary(sourceId: string): Itinerary | null {
  const source = getItineraryById(sourceId);
  if (!source) return null;

  const newRef = getNextReferenceNumber();
  const newId = 'itn-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
  const now = new Date().toISOString();

  const duplicated: Itinerary = {
    ...JSON.parse(JSON.stringify(source)),
    id: newId,
    referenceNumber: newRef,
    tourName: `${source.tourName} (Copy)`,
    status: 'Draft',
    advancePaid: 0,
    pendingAmount: source.totalCost,
    paymentStatus: 'Unpaid',
    confirmedAt: undefined,
    createdAt: now,
    updatedAt: now,
  };

  saveItinerary(duplicated);
  return duplicated;
}

export function resetAllToDefaults(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.SETTINGS);
  localStorage.removeItem(STORAGE_KEYS.VEHICLES);
  localStorage.removeItem(STORAGE_KEYS.DESTINATIONS);
  localStorage.removeItem(STORAGE_KEYS.ATTRACTIONS);
  localStorage.removeItem(STORAGE_KEYS.HOTELS);
  localStorage.removeItem(STORAGE_KEYS.ITINERARIES);
  localStorage.removeItem(STORAGE_KEYS.NEXT_REF);
  localStorage.removeItem(STORAGE_KEYS.FLEET);
  localStorage.removeItem(STORAGE_KEYS.DRIVERS);
  localStorage.removeItem(STORAGE_KEYS.BOOKINGS);
  refreshAllCaches();
  window.dispatchEvent(new Event('lobo_storage_updated'));
}

// ===================== ADD-ON MODULE: FLEET VEHICLES =====================

export function useFleet(): FleetVehicle[] {
  return useSyncExternalStore(
    subscribeStorage,
    () => {
      if (!fleetCache) refreshAllCaches();
      return fleetCache || INITIAL_FLEET;
    },
    () => INITIAL_FLEET
  );
}

export function getFleet(): FleetVehicle[] {
  return getStorageItem<FleetVehicle[]>(STORAGE_KEYS.FLEET, INITIAL_FLEET);
}

export function saveFleetVehicle(vehicle: FleetVehicle): void {
  const current = getFleet();
  const index = current.findIndex(v => v.id === vehicle.id);
  let updated: FleetVehicle[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = vehicle;
  } else {
    updated = [vehicle, ...current];
  }
  setStorageItem(STORAGE_KEYS.FLEET, updated);
}

export function deleteFleetVehicle(id: string): void {
  const bookings = getOperationalBookings();
  const referenced = bookings.some(b => b.ownVehicleId === id && b.status !== 'cancelled');
  if (referenced) {
    throw new Error('Cannot delete vehicle: it is referenced by one or more active bookings. Cancel the bookings first.');
  }
  const current = getFleet();
  setStorageItem(STORAGE_KEYS.FLEET, current.filter(v => v.id !== id));
}

// ===================== ADD-ON MODULE: DRIVERS =====================

export function useDrivers(): Driver[] {
  return useSyncExternalStore(
    subscribeStorage,
    () => {
      if (!driversCache) refreshAllCaches();
      return driversCache || INITIAL_DRIVERS;
    },
    () => INITIAL_DRIVERS
  );
}

export function getDrivers(): Driver[] {
  return getStorageItem<Driver[]>(STORAGE_KEYS.DRIVERS, INITIAL_DRIVERS);
}

export function saveDriver(driver: Driver): void {
  const current = getDrivers();
  const index = current.findIndex(d => d.id === driver.id);
  let updated: Driver[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = driver;
  } else {
    updated = [driver, ...current];
  }
  setStorageItem(STORAGE_KEYS.DRIVERS, updated);
}

export function deleteDriver(id: string): void {
  const bookings = getOperationalBookings();
  const referenced = bookings.some(b => b.ownDriverId === id && b.status !== 'cancelled');
  if (referenced) {
    throw new Error('Cannot delete driver: they are referenced by one or more active bookings. Cancel the bookings first.');
  }
  const current = getDrivers();
  setStorageItem(STORAGE_KEYS.DRIVERS, current.filter(d => d.id !== id));
}

// ===================== ADD-ON MODULE: OPERATIONAL BOOKINGS =====================

export function useOperationalBookings(): OperationalBooking[] {
  return useSyncExternalStore(
    subscribeStorage,
    () => {
      if (!bookingsCache) refreshAllCaches();
      return bookingsCache || INITIAL_OPERATIONAL_BOOKINGS;
    },
    () => INITIAL_OPERATIONAL_BOOKINGS
  );
}

export function getOperationalBookings(): OperationalBooking[] {
  if (bookingsCache && bookingsCache.length > 0) return bookingsCache;
  refreshAllCaches();
  if (bookingsCache && bookingsCache.length > 0) return bookingsCache;
  return getStorageItem<OperationalBooking[]>(STORAGE_KEYS.BOOKINGS, INITIAL_OPERATIONAL_BOOKINGS);
}

export function getOperationalBookingByVoucherNo(voucherNo: string): OperationalBooking | undefined {
  return getOperationalBookings().find(b => b.voucherNo === voucherNo);
}

export function saveOperationalBooking(booking: OperationalBooking): void {
  const current = getOperationalBookings();
  const index = current.findIndex(b => b.id === booking.id);
  const now = new Date().toISOString();
  const updatedRecord: OperationalBooking = { ...booking, updatedAt: now };
  let updated: OperationalBooking[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = updatedRecord;
  } else {
    updatedRecord.createdAt = updatedRecord.createdAt || now;
    updated = [updatedRecord, ...current];
  }
  setStorageItem(STORAGE_KEYS.BOOKINGS, updated);
}

export function deleteOperationalBooking(id: string): void {
  const current = getOperationalBookings();
  setStorageItem(STORAGE_KEYS.BOOKINGS, current.filter(b => b.id !== id));
}

// ===================== HELPERS =====================

export function computeBookingStatus(booking: OperationalBooking): OperationalBookingStatus {
  if (booking.status === 'cancelled') return 'cancelled';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(booking.startDate);
  const end = new Date(booking.endDate);
  if (today < start) return 'scheduled';
  if (today > end) return 'completed';
  return 'active';
}
