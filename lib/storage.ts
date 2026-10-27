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
  DESTINATIONS: 'lobo_destinations_v9',
  ATTRACTIONS: 'lobo_attractions_v13',
  HOTELS: 'lobo_hotels_v1',
  ITINERARIES: 'lobo_itineraries_v3',
  NEXT_REF: 'lobo_next_ref_v1',
  FLEET: 'lobo_fleet_v1',
  DRIVERS: 'lobo_drivers_v1',
  BOOKINGS: 'lobo_bookings_v1',
  DELETED_DESTS: 'lobo_deleted_destinations_v1',
  DELETED_ATTS: 'lobo_deleted_attractions_v1',
};

export function getDeletedDestinations(): Set<string> {
  const list = getStorageItem<string[]>(STORAGE_KEYS.DELETED_DESTS, []);
  return new Set(Array.isArray(list) ? list.map(s => s.toLowerCase().trim()) : []);
}

export function recordDeletedDestination(id: string): void {
  const set = getDeletedDestinations();
  set.add(id.toLowerCase().trim());
  try {
    localStorage.setItem(STORAGE_KEYS.DELETED_DESTS, JSON.stringify(Array.from(set)));
  } catch (_) {}
}

export function unrecordDeletedDestination(id: string): void {
  const set = getDeletedDestinations();
  if (set.delete(id.toLowerCase().trim())) {
    try {
      localStorage.setItem(STORAGE_KEYS.DELETED_DESTS, JSON.stringify(Array.from(set)));
    } catch (_) {}
  }
}

export function getDeletedAttractions(): Set<string> {
  const list = getStorageItem<string[]>(STORAGE_KEYS.DELETED_ATTS, []);
  return new Set(Array.isArray(list) ? list.map(s => s.toLowerCase().trim()) : []);
}

export function recordDeletedAttraction(id: string): void {
  const set = getDeletedAttractions();
  set.add(id.toLowerCase().trim());
  try {
    localStorage.setItem(STORAGE_KEYS.DELETED_ATTS, JSON.stringify(Array.from(set)));
  } catch (_) {}
}

export function unrecordDeletedAttraction(id: string): void {
  const set = getDeletedAttractions();
  if (set.delete(id.toLowerCase().trim())) {
    try {
      localStorage.setItem(STORAGE_KEYS.DELETED_ATTS, JSON.stringify(Array.from(set)));
    } catch (_) {}
  }
}

// In-memory cache for synchronous snapshots
let isInitialized = false;
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
      localStorage.removeItem('lobo_destinations_v5');
      localStorage.removeItem('lobo_destinations_v6');
      localStorage.removeItem('lobo_attractions_v2');
      localStorage.removeItem('lobo_attractions_v3');
      localStorage.removeItem('lobo_attractions_v7');
      localStorage.removeItem('lobo_attractions_v8');
      localStorage.removeItem('lobo_attractions_v9');
      localStorage.removeItem('lobo_attractions_v10');
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

    // Auto-merge newly loaded hotels catalog
    const storedHotels = getStorageItem<Hotel[]>(STORAGE_KEYS.HOTELS, []);
    const hotelMap = new Map<string, Hotel>();
    // 1. Initial canonical hotels present as baseline
    INITIAL_HOTELS.forEach(h => hotelMap.set(h.id.toLowerCase(), h));
    // 2. User edits and custom hotels take precedence
    if (Array.isArray(storedHotels)) {
      storedHotels.forEach(h => {
        hotelMap.set(h.id.toLowerCase(), h);
      });
    }
    hotelsCache = Array.from(hotelMap.values());
    try {
      localStorage.setItem(STORAGE_KEYS.HOTELS, JSON.stringify(hotelsCache));
    } catch (_) {}

    // Auto-merge newly loaded destinations catalog
    const storedDests = getStorageItem<Destination[]>(STORAGE_KEYS.DESTINATIONS, []);
    const deletedDests = getDeletedDestinations();
    const destMap = new Map<string, Destination>();

    // 1. Initial canonical destinations as baseline (excluding deleted and standalone kempty-falls)
    INITIAL_DESTINATIONS.forEach(d => {
      const lowerId = d.id.toLowerCase();
      if (!deletedDests.has(lowerId) && lowerId !== 'kempty-falls') {
        destMap.set(lowerId, d);
      }
    });

    // 2. User edits and custom destinations take precedence (excluding deleted and standalone kempty-falls)
    if (Array.isArray(storedDests)) {
      storedDests.forEach(d => {
        const lowerName = (d.name || '').toLowerCase();
        const lowerId = (d.id || '').toLowerCase();
        if ((lowerName.includes('dalhousie') && lowerName.includes('mcleodganj')) || lowerId === 'dalhousie-mcleodganj') {
          return; // Remove obsolete combined entry
        }
        if (deletedDests.has(lowerId) || lowerId === 'kempty-falls' || lowerName === 'kempty falls') {
          return; // Strictly exclude deleted or duplicate kempty-falls destination
        }
        destMap.set(lowerId, d);
      });
    }

    // Strictly ensure kempty-falls standalone destination is purged
    destMap.delete('kempty-falls');

    // Ensure Mussoorie gallery has the clean high-resolution photo
    const kemptyCleanUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Kempty_Waterfalls.jpg/1280px-Kempty_Waterfalls.jpg';
    const mussoorieD = destMap.get('mussoorie');
    if (mussoorieD && (!mussoorieD.gallery || mussoorieD.gallery.length === 0)) {
      mussoorieD.gallery = [kemptyCleanUrl];
    }
    destinationsCache = Array.from(destMap.values());
    try {
      localStorage.setItem(STORAGE_KEYS.DESTINATIONS, JSON.stringify(destinationsCache));
    } catch (_) {}

    // Auto-merge newly loaded attractions catalog
    const storedAtts = getStorageItem<Attraction[]>(STORAGE_KEYS.ATTRACTIONS, []);
    const deletedAtts = getDeletedAttractions();
    const attMap = new Map<string, Attraction>();

    // 1. Initial canonical attractions as baseline (excluding deleted)
    INITIAL_ATTRACTIONS.forEach(a => {
      const lowerId = a.id.toLowerCase();
      if (!deletedAtts.has(lowerId)) {
        const overrideImg = getAttractionImage(a.name, a.image) || getAttractionImage(a.id, a.image);
        attMap.set(lowerId, { ...a, image: overrideImg || a.image });
      }
    });

    // 2. User edits and custom attractions take precedence (excluding deleted)
    if (Array.isArray(storedAtts)) {
      storedAtts.forEach(a => {
        const lowerId = a.id.toLowerCase();
        if (!deletedAtts.has(lowerId)) {
          attMap.set(lowerId, a);
        }
      });
    }

    // 3. Re-apply canonical attraction overrides so image corrections (like Kempty Falls under Mussoorie) always take effect
    attMap.forEach((att, key) => {
      const overrideImg = getAttractionImage(att.name, att.image) || getAttractionImage(att.id, att.image);
      if (overrideImg && overrideImg !== att.image) {
        attMap.set(key, { ...att, image: overrideImg });
      }
    });

    // Ensure Kempty Falls is correctly mapped under Mussoorie
    const kemptyAtt = attMap.get('mussoorie-kempty-falls');
    if (kemptyAtt) {
      kemptyAtt.destinationId = 'mussoorie';
      kemptyAtt.destinationName = 'Mussoorie';
      kemptyAtt.name = 'Kempty Falls';
      kemptyAtt.image = kemptyCleanUrl;
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
    isInitialized = true;
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
      if (!isInitialized) refreshAllCaches();
      return Array.isArray(itinerariesCache) ? itinerariesCache : INITIAL_ITINERARIES;
    },
    () => INITIAL_ITINERARIES
  );
}

export function useHotels(): Hotel[] {
  return useSyncExternalStore(
    subscribeStorage,
    () => {
      if (!isInitialized) refreshAllCaches();
      return Array.isArray(hotelsCache) ? hotelsCache : INITIAL_HOTELS;
    },
    () => INITIAL_HOTELS
  );
}

export function useDestinations(): Destination[] {
  return useSyncExternalStore(
    subscribeStorage,
    () => {
      if (!isInitialized) refreshAllCaches();
      return Array.isArray(destinationsCache) ? destinationsCache : INITIAL_DESTINATIONS;
    },
    () => INITIAL_DESTINATIONS
  );
}

export function useAttractions(): Attraction[] {
  return useSyncExternalStore(
    subscribeStorage,
    () => {
      if (!isInitialized) refreshAllCaches();
      return Array.isArray(attractionsCache) ? attractionsCache : INITIAL_ATTRACTIONS;
    },
    () => INITIAL_ATTRACTIONS
  );
}

export function useVehicles(): VehicleOption[] {
  return useSyncExternalStore(
    subscribeStorage,
    () => {
      if (!isInitialized) refreshAllCaches();
      return Array.isArray(vehiclesCache) ? vehiclesCache : INITIAL_VEHICLES;
    },
    () => INITIAL_VEHICLES
  );
}

export function useSettings(): AppSettings {
  return useSyncExternalStore(
    subscribeStorage,
    () => {
      if (!isInitialized) refreshAllCaches();
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
  if (typeof window !== 'undefined') {
    fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sanitized)
    }).catch(err => console.error('[Storage] Error persisting settings to cloud DB:', err));
  }
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
  unrecordDeletedDestination(destination.id);
  const current = getDestinations();
  const index = current.findIndex(d => d.id.toLowerCase() === destination.id.toLowerCase());
  let updated: Destination[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = destination;
  } else {
    updated = [destination, ...current];
  }
  setStorageItem(STORAGE_KEYS.DESTINATIONS, updated);
  if (typeof window !== 'undefined') {
    fetch('/api/destinations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'destination', data: destination })
    }).catch(err => console.error('[Storage] Error persisting destination to cloud DB:', err));
  }
}

export function deleteDestination(id: string): void {
  const current = getDestinations();
  const lowerId = id.toLowerCase().trim();

  // Record tombstone so refreshAllCaches does not resurrect deleted destination
  recordDeletedDestination(lowerId);

  // Remove from destinations
  const updatedDests = current.filter(d => d.id.toLowerCase() !== lowerId && d.name.toLowerCase() !== lowerId);
  setStorageItem(STORAGE_KEYS.DESTINATIONS, updatedDests);

  // Cascade delete any attractions belonging to this destination locally
  const currentAtts = getAttractions();
  const updatedAtts = currentAtts.filter(a => a.destinationId?.toLowerCase() !== lowerId && a.destinationName?.toLowerCase() !== lowerId);
  setStorageItem(STORAGE_KEYS.ATTRACTIONS, updatedAtts);

  if (typeof window !== 'undefined') {
    fetch(`/api/destinations?id=${encodeURIComponent(id)}&type=destination`, {
      method: 'DELETE'
    }).catch(err => console.error('[Storage] Error deleting destination in cloud DB:', err));
  }
}

// Attractions
export function getAttractions(): Attraction[] {
  return getStorageItem<Attraction[]>(STORAGE_KEYS.ATTRACTIONS, INITIAL_ATTRACTIONS);
}

export function saveAttraction(attraction: Attraction): void {
  unrecordDeletedAttraction(attraction.id);
  const current = getAttractions();
  const index = current.findIndex(a => a.id.toLowerCase() === attraction.id.toLowerCase());
  let updated: Attraction[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = attraction;
  } else {
    updated = [attraction, ...current];
  }
  setStorageItem(STORAGE_KEYS.ATTRACTIONS, updated);
  if (typeof window !== 'undefined') {
    fetch('/api/destinations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'attraction', data: attraction })
    }).catch(err => console.error('[Storage] Error persisting attraction to cloud DB:', err));
  }
}

export function deleteAttraction(id: string): void {
  const current = getAttractions();
  const lowerId = id.toLowerCase().trim();

  // Record tombstone so refreshAllCaches does not resurrect deleted attraction
  recordDeletedAttraction(lowerId);

  const updated = current.filter(a => a.id.toLowerCase() !== lowerId && a.name.toLowerCase() !== lowerId);
  setStorageItem(STORAGE_KEYS.ATTRACTIONS, updated);

  if (typeof window !== 'undefined') {
    fetch(`/api/destinations?id=${encodeURIComponent(id)}&type=attraction`, {
      method: 'DELETE'
    }).catch(err => console.error('[Storage] Error deleting attraction in cloud DB:', err));
  }
}

// Hotels
export function getHotels(): Hotel[] {
  return getStorageItem<Hotel[]>(STORAGE_KEYS.HOTELS, INITIAL_HOTELS);
}

export function saveHotel(hotel: Hotel): void {
  const current = getHotels();
  const index = current.findIndex(h => h.id.toLowerCase() === hotel.id.toLowerCase());
  let updated: Hotel[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = hotel;
  } else {
    updated = [hotel, ...current];
  }
  setStorageItem(STORAGE_KEYS.HOTELS, updated);
  if (typeof window !== 'undefined') {
    fetch('/api/hotels', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hotel)
    }).catch(err => console.error('[Storage] Error persisting hotel to cloud DB:', err));
  }
}

export function deleteHotel(id: string): void {
  const current = getHotels();
  setStorageItem(STORAGE_KEYS.HOTELS, current.filter(h => h.id.toLowerCase() !== id.toLowerCase()));
  if (typeof window !== 'undefined') {
    fetch(`/api/hotels?id=${encodeURIComponent(id)}`, {
      method: 'DELETE'
    }).catch(err => console.error('[Storage] Error deleting hotel in cloud DB:', err));
  }
}

export type SyncState = 'synced' | 'syncing' | 'offline' | 'error';

let currentSyncState: SyncState = 'synced';
let lastSyncTimestamp: string = '';
let syncStatusSnapshot: { state: SyncState; lastSync: string } = { state: currentSyncState, lastSync: lastSyncTimestamp };
const serverSyncStatusSnapshot: { state: SyncState; lastSync: string } = { state: 'synced', lastSync: '' };
let syncListeners: (() => void)[] = [];

export function getSyncStatus(): { state: SyncState; lastSync: string } {
  return syncStatusSnapshot;
}

export function useSyncStatus(): { state: SyncState; lastSync: string } {
  return useSyncExternalStore(
    (cb) => {
      syncListeners.push(cb);
      return () => {
        syncListeners = syncListeners.filter(l => l !== cb);
      };
    },
    () => syncStatusSnapshot,
    () => serverSyncStatusSnapshot
  );
}

function notifySyncStatus(state: SyncState) {
  currentSyncState = state;
  if (state === 'synced') {
    lastSyncTimestamp = new Date().toISOString();
  }
  syncStatusSnapshot = { state: currentSyncState, lastSync: lastSyncTimestamp };
  syncListeners.forEach(cb => {
    try { cb(); } catch (_) {}
  });
}

/**
 * Asynchronously synchronizes catalogs, itineraries, fleet, drivers, bookings, and settings
 * from the database API routes.
 * Updates local cache and localStorage, and dispatches storage update events.
 * Also checks if the local browser has unsynced itineraries (e.g. from local testing) and uploads them.
 */
export async function syncFromCloudDatabase(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  notifySyncStatus('syncing');

  try {
    const [destRes, hotelsRes, settingsRes, itinRes, fleetRes, driversRes, bookingsRes] = await Promise.all([
      fetch('/api/destinations', { cache: 'no-store', credentials: 'include' }).then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('/api/hotels', { cache: 'no-store', credentials: 'include' }).then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('/api/settings', { cache: 'no-store', credentials: 'include' }).then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('/api/itineraries', { cache: 'no-store', credentials: 'include' }).then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('/api/fleet', { cache: 'no-store', credentials: 'include' }).then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('/api/drivers', { cache: 'no-store', credentials: 'include' }).then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('/api/bookings', { cache: 'no-store', credentials: 'include' }).then(r => r.ok ? r.json() : null).catch(() => null)
    ]);

    let hasUpdates = false;

    // 1. Sync Destinations & Attractions
    if (destRes?.success) {
      const deletedDests = getDeletedDestinations();
      const deletedAtts = getDeletedAttractions();
      const kemptyCleanUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Kempty_Waterfalls.jpg/1280px-Kempty_Waterfalls.jpg';

      if (Array.isArray(destRes.destinations) && destRes.destinations.length > 0) {
        const filteredDests = destRes.destinations
          .filter((d: Destination) => {
            const lowerId = (d.id || '').toLowerCase();
            const lowerName = (d.name || '').toLowerCase();
            return !deletedDests.has(lowerId) && lowerId !== 'kempty-falls' && lowerName !== 'kempty falls';
          })
          .map((d: Destination) => {
            if (d.id === 'mussoorie' && (!d.gallery || d.gallery.length === 0)) {
              return { ...d, gallery: [kemptyCleanUrl] };
            }
            return d;
          });

        destinationsCache = filteredDests;
        localStorage.setItem(STORAGE_KEYS.DESTINATIONS, JSON.stringify(filteredDests));
        hasUpdates = true;
      }
      if (Array.isArray(destRes.attractions) && destRes.attractions.length > 0) {
        const filteredAtts = destRes.attractions
          .filter((a: Attraction) => {
            const lowerId = (a.id || '').toLowerCase();
            return !deletedAtts.has(lowerId);
          })
          .map((a: Attraction) => {
            if (a.id === 'mussoorie-kempty-falls' || (a.name && (a.name.toLowerCase() === 'kempty falls' || a.name.toLowerCase() === 'kempty falls cascades'))) {
              return {
                ...a,
                destinationId: 'mussoorie',
                destinationName: 'Mussoorie',
                name: 'Kempty Falls',
                image: kemptyCleanUrl
              };
            }
            return a;
          });

        attractionsCache = filteredAtts;
        localStorage.setItem(STORAGE_KEYS.ATTRACTIONS, JSON.stringify(filteredAtts));
        hasUpdates = true;
      }
    }

    // 2. Sync Hotels
    if (hotelsRes?.success && Array.isArray(hotelsRes.hotels) && hotelsRes.hotels.length > 0) {
      hotelsCache = hotelsRes.hotels;
      localStorage.setItem(STORAGE_KEYS.HOTELS, JSON.stringify(hotelsRes.hotels));
      hasUpdates = true;
    }

    // 3. Sync Settings
    if (settingsRes?.success && settingsRes.settings) {
      settingsCache = sanitizeSettings(settingsRes.settings);
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settingsCache));
      hasUpdates = true;
    }

    // 4. Sync Itineraries & Auto-Migrate Local Browser Itineraries
    if (itinRes?.success && Array.isArray(itinRes.itineraries)) {
      const serverItins: Itinerary[] = itinRes.itineraries;
      const localItins = getStorageItem<Itinerary[]>(STORAGE_KEYS.ITINERARIES, []);

      // Check if local browser has custom itineraries not yet present on server
      const serverRefMap = new Set(serverItins.map(i => (i.referenceNumber || '').toLowerCase()));
      const missingOnServer = localItins.filter(i => {
        const ref = (i.referenceNumber || '').toLowerCase();
        // Ignore dummy seeds LT-2026-0001 and LT-2026-0002 if server has other real items
        if ((ref === 'lt-2026-0001' || ref === 'lt-2026-0002') && serverItins.length > 2) return false;
        return ref && !serverRefMap.has(ref);
      });

      if (missingOnServer.length > 0) {
        // Automatically sync missing local browser itineraries to the cloud database
        console.log(`[Storage] Auto-syncing ${missingOnServer.length} local browser itineraries to cloud database...`);
        fetch('/api/import/browser', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ itineraries: missingOnServer })
        }).catch(e => console.warn('[Storage] Auto-import of browser data error:', e));

        // Merge locally so user doesn't lose anything
        const merged = [...serverItins];
        for (const m of missingOnServer) {
          if (!merged.some(item => item.id === m.id || item.referenceNumber === m.referenceNumber)) {
            merged.push(m);
          }
        }
        itinerariesCache = merged;
        localStorage.setItem(STORAGE_KEYS.ITINERARIES, JSON.stringify(merged));
        hasUpdates = true;
      } else {
        itinerariesCache = serverItins;
        localStorage.setItem(STORAGE_KEYS.ITINERARIES, JSON.stringify(serverItins));
        hasUpdates = true;
      }
    }

    // 5. Sync Fleet
    if (fleetRes?.success && Array.isArray(fleetRes.fleet)) {
      fleetCache = fleetRes.fleet;
      localStorage.setItem(STORAGE_KEYS.FLEET, JSON.stringify(fleetRes.fleet));
      hasUpdates = true;
    }

    // 6. Sync Drivers
    if (driversRes?.success && Array.isArray(driversRes.drivers)) {
      driversCache = driversRes.drivers;
      localStorage.setItem(STORAGE_KEYS.DRIVERS, JSON.stringify(driversRes.drivers));
      hasUpdates = true;
    }

    // 7. Sync Bookings
    if (bookingsRes?.success && Array.isArray(bookingsRes.bookings)) {
      bookingsCache = bookingsRes.bookings;
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookingsRes.bookings));
      hasUpdates = true;
    }

    if (hasUpdates) {
      window.dispatchEvent(new Event('lobo_storage_updated'));
    }

    notifySyncStatus('synced');
    return true;
  } catch (err) {
    console.warn('[Storage] Cloud sync error:', err);
    notifySyncStatus('offline');
    return false;
  }
}

// Background Cloud Sync & Periodic 12-Second Polling
if (typeof window !== 'undefined') {
  setTimeout(() => {
    syncFromCloudDatabase().catch(() => {});
  }, 100);

  // Poll every 12 seconds for cross-device updates
  setInterval(() => {
    syncFromCloudDatabase().catch(() => {});
  }, 12000);
}

// Reference Number Generator
export function getNextReferenceNumber(): string {
  const settings = getSettings();
  const prefix = settings.referencePrefix || 'LT-2026-';
  const defaultSeq = Math.max(280, settings.nextReferenceSequence || 280);
  let currentSeq = getStorageItem<number>(STORAGE_KEYS.NEXT_REF, defaultSeq);
  if (typeof currentSeq !== 'number' || currentSeq < 280) {
    currentSeq = 280;
  }
  const formatted = `${prefix}${String(currentSeq).padStart(4, '0')}`;
  setStorageItem(STORAGE_KEYS.NEXT_REF, currentSeq + 1);

  // Also query atomic cloud counter in background
  if (typeof window !== 'undefined') {
    fetch('/api/reference-number')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.sequenceNumber && data.sequenceNumber > currentSeq) {
          setStorageItem(STORAGE_KEYS.NEXT_REF, data.sequenceNumber + 1);
        }
      })
      .catch(() => {});
  }

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

export async function saveItineraryAsync(
  itinerary: Itinerary,
  expectedVersion?: number
): Promise<{ success: boolean; itinerary?: Itinerary; conflict?: boolean; currentItinerary?: Itinerary; error?: string }> {
  try {
    notifySyncStatus('syncing');
    const res = await fetch('/api/itineraries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: itinerary, expectedVersion })
    });

    const data = await res.json().catch(() => ({}));

    if (res.status === 409 || data.conflict) {
      notifySyncStatus('error');
      return {
        success: false,
        conflict: true,
        currentItinerary: data.currentItinerary,
        error: data.error || 'Conflict detected: this itinerary was modified on another device.'
      };
    }

    if (!res.ok || !data.success) {
      notifySyncStatus('error');
      return { success: false, error: data.error || 'Failed to save itinerary to database' };
    }

    const savedRecord = data.itinerary as Itinerary;
    const current = getItineraries();
    const index = current.findIndex(item => item.id === savedRecord.id);
    let updated: Itinerary[];
    if (index >= 0) {
      updated = [...current];
      updated[index] = savedRecord;
    } else {
      updated = [savedRecord, ...current];
    }
    setStorageItem(STORAGE_KEYS.ITINERARIES, updated);
    notifySyncStatus('synced');
    return { success: true, itinerary: savedRecord };
  } catch (err: any) {
    console.warn('[Storage] saveItineraryAsync fallback to local:', err);
    notifySyncStatus('offline');
    const fallback = saveItinerary(itinerary);
    return { success: true, itinerary: fallback };
  }
}

export function saveItinerary(itinerary: Itinerary): Itinerary {
  const current = getItineraries();
  const index = current.findIndex(item => item.id === itinerary.id);
  const now = new Date().toISOString();
  let updated: Itinerary[];

  const updatedRecord: Itinerary = {
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

  if (typeof window !== 'undefined') {
    fetch('/api/itineraries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: updatedRecord, expectedVersion: itinerary.version })
    })
    .then(r => r.ok ? r.json() : null)
    .then(data => {
      if (data?.itinerary) {
        const cur = getItineraries();
        const idx = cur.findIndex(i => i.id === data.itinerary.id);
        if (idx >= 0) {
          cur[idx] = data.itinerary;
          setStorageItem(STORAGE_KEYS.ITINERARIES, cur);
        }
      }
    })
    .catch(e => console.warn('[Storage] Sync save to /api/itineraries failed:', e));
  }

  return updatedRecord;
}

export async function deleteItineraryAsync(
  id: string,
  hardDelete: boolean = false
): Promise<{ success: boolean; isProtected?: boolean; error?: string }> {
  try {
    const res = await fetch(`/api/itineraries?id=${encodeURIComponent(id)}&hardDelete=${hardDelete}`, {
      method: 'DELETE'
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.success) {
      return { success: false, isProtected: data.isProtected, error: data.error || 'Failed to delete itinerary' };
    }

    const current = getItineraries();
    setStorageItem(STORAGE_KEYS.ITINERARIES, current.filter(item => item.id !== id));
    return { success: true };
  } catch (e: any) {
    deleteItinerary(id);
    return { success: true };
  }
}

export function deleteItinerary(id: string): void {
  const current = getItineraries();
  setStorageItem(STORAGE_KEYS.ITINERARIES, current.filter(item => item.id !== id));

  if (typeof window !== 'undefined') {
    fetch(`/api/itineraries?id=${encodeURIComponent(id)}`, {
      method: 'DELETE'
    }).catch(e => console.warn('[Storage] Sync delete to /api/itineraries failed:', e));
  }
}

export async function restoreItinerary(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/itineraries/${encodeURIComponent(id)}/restore`, { method: 'POST' });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success && data.itinerary) {
      const current = getItineraries();
      const idx = current.findIndex(i => i.id === id);
      if (idx >= 0) current[idx] = data.itinerary;
      else current.unshift(data.itinerary);
      setStorageItem(STORAGE_KEYS.ITINERARIES, current);
      return true;
    }
  } catch (e) {
    console.error('Error restoring itinerary:', e);
  }
  return false;
}

export async function toggleProtectItinerary(id: string, isProtected: boolean): Promise<boolean> {
  try {
    const res = await fetch(`/api/itineraries/${encodeURIComponent(id)}/protect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isProtected })
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      const current = getItineraries();
      const idx = current.findIndex(i => i.id === id);
      if (idx >= 0) {
        current[idx] = { ...current[idx], isProtected };
        setStorageItem(STORAGE_KEYS.ITINERARIES, current);
      }
      return true;
    }
  } catch (e) {
    console.error('Error toggling protect:', e);
  }
  return false;
}

export async function importBrowserDataNow(): Promise<{ success: boolean; stats?: any; error?: string }> {
  if (typeof window === 'undefined') return { success: false, error: 'Browser environment only' };
  try {
    const payload = {
      itineraries: getItineraries(),
      fleet: getFleet(),
      drivers: getDrivers(),
      bookings: getOperationalBookings(),
      settings: getSettings()
    };

    const res = await fetch('/api/import/browser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      await syncFromCloudDatabase();
      return { success: true, stats: data.stats };
    }
    return { success: false, error: data.error || 'Failed to import browser data' };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Network error during import' };
  }
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
  isInitialized = false;
  refreshAllCaches();
  window.dispatchEvent(new Event('lobo_storage_updated'));
}

// ===================== ADD-ON MODULE: FLEET VEHICLES =====================

export function useFleet(): FleetVehicle[] {
  return useSyncExternalStore(
    subscribeStorage,
    () => {
      if (!isInitialized) refreshAllCaches();
      return Array.isArray(fleetCache) ? fleetCache : INITIAL_FLEET;
    },
    () => INITIAL_FLEET
  );
}

export function getFleet(): FleetVehicle[] {
  return getStorageItem<FleetVehicle[]>(STORAGE_KEYS.FLEET, INITIAL_FLEET);
}

export function saveFleetVehicle(vehicle: FleetVehicle): void {
  const modelName = vehicle.modelName || (vehicle.brand && vehicle.model ? `${vehicle.brand} ${vehicle.model}` : '') || vehicle.model || vehicle.brand || 'Toyota Innova Crysta';
  const regNumber = vehicle.registrationNumber || vehicle.plateNumber || 'DL 1ZA 4072';
  const capacity = Number(vehicle.capacity || vehicle.seats || 7);
  const category = vehicle.category || vehicle.type || 'MUV';
  const fuelType = vehicle.fuelType || 'Diesel';
  const sanitizedVehicle: FleetVehicle = {
    ...vehicle,
    modelName,
    registrationNumber: regNumber,
    plateNumber: vehicle.plateNumber || regNumber,
    capacity,
    seats: vehicle.seats || capacity,
    category,
    type: vehicle.type || category,
    fuelType,
    isActive: vehicle.isActive !== false && vehicle.status !== 'inactive'
  };

  const current = getFleet();
  const index = current.findIndex(v => v.id === sanitizedVehicle.id);
  let updated: FleetVehicle[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = sanitizedVehicle;
  } else {
    updated = [sanitizedVehicle, ...current];
  }
  setStorageItem(STORAGE_KEYS.FLEET, updated);

  if (typeof window !== 'undefined') {
    fetch('/api/fleet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(sanitizedVehicle)
    }).catch(e => console.warn('[Storage] Sync save to /api/fleet failed:', e));
  }
}

export function deleteFleetVehicle(id: string): void {
  const bookings = getOperationalBookings();
  const referenced = bookings.some(b => b.ownVehicleId === id && b.status !== 'cancelled');
  if (referenced) {
    throw new Error('Cannot delete vehicle: it is referenced by one or more active bookings. Cancel the bookings first.');
  }
  const current = getFleet();
  setStorageItem(STORAGE_KEYS.FLEET, current.filter(v => v.id !== id));

  if (typeof window !== 'undefined') {
    fetch(`/api/fleet?id=${encodeURIComponent(id)}`, {
      method: 'DELETE'
    }).catch(e => console.warn('[Storage] Sync delete to /api/fleet failed:', e));
  }
}

// ===================== ADD-ON MODULE: DRIVERS =====================

export function useDrivers(): Driver[] {
  return useSyncExternalStore(
    subscribeStorage,
    () => {
      if (!isInitialized) refreshAllCaches();
      return Array.isArray(driversCache) ? driversCache : INITIAL_DRIVERS;
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

  if (typeof window !== 'undefined') {
    fetch('/api/drivers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(driver)
    }).catch(e => console.warn('[Storage] Sync save to /api/drivers failed:', e));
  }
}

export function deleteDriver(id: string): void {
  const bookings = getOperationalBookings();
  const referenced = bookings.some(b => b.ownDriverId === id && b.status !== 'cancelled');
  if (referenced) {
    throw new Error('Cannot delete driver: they are referenced by one or more active bookings. Cancel the bookings first.');
  }
  const current = getDrivers();
  setStorageItem(STORAGE_KEYS.DRIVERS, current.filter(d => d.id !== id));

  if (typeof window !== 'undefined') {
    fetch(`/api/drivers?id=${encodeURIComponent(id)}`, {
      method: 'DELETE'
    }).catch(e => console.warn('[Storage] Sync delete to /api/drivers failed:', e));
  }
}

// ===================== ADD-ON MODULE: OPERATIONAL BOOKINGS =====================

export function useOperationalBookings(): OperationalBooking[] {
  return useSyncExternalStore(
    subscribeStorage,
    () => {
      if (!isInitialized) refreshAllCaches();
      return Array.isArray(bookingsCache) ? bookingsCache : INITIAL_OPERATIONAL_BOOKINGS;
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

  if (typeof window !== 'undefined') {
    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedRecord)
    }).catch(e => console.warn('[Storage] Sync save to /api/bookings failed:', e));
  }
}

export function deleteOperationalBooking(id: string): void {
  const current = getOperationalBookings();
  setStorageItem(STORAGE_KEYS.BOOKINGS, current.filter(b => b.id !== id));

  if (typeof window !== 'undefined') {
    fetch(`/api/bookings?id=${encodeURIComponent(id)}`, {
      method: 'DELETE'
    }).catch(e => console.warn('[Storage] Sync delete to /api/bookings failed:', e));
  }
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
