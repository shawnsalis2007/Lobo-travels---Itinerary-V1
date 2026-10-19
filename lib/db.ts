import { Destination, Attraction, Hotel, AppSettings } from '@/types';
import { 
  DEFAULT_SETTINGS, 
  INITIAL_DESTINATIONS, 
  INITIAL_ATTRACTIONS, 
  INITIAL_HOTELS 
} from './mock-data';
import { getAttractionImage } from './catalog-data';
import fs from 'fs';
import path from 'path';

// ── PROVIDER DETECTION ────────────────────────────────────────────────────────
export type DbProvider = 'postgres' | 'kv' | 'supabase' | 'local_file';

export function getActiveDbProvider(): { provider: DbProvider; label: string; isCloud: boolean } {
  const pgUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL;
  if (pgUrl) {
    const isVercelNeon = pgUrl.includes('neon.tech') || pgUrl.includes('vercel') || !!process.env.POSTGRES_URL;
    return {
      provider: 'postgres',
      label: isVercelNeon ? 'Vercel Postgres (Neon)' : 'PostgreSQL Database',
      isCloud: true
    };
  }

  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (kvUrl && kvToken) {
    return {
      provider: 'kv',
      label: 'Vercel KV / Upstash Redis',
      isCloud: true
    };
  }

  const sbUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (sbUrl && sbKey) {
    return {
      provider: 'supabase',
      label: 'Supabase Cloud Database',
      isCloud: true
    };
  }

  return {
    provider: 'local_file',
    label: 'Local Persistent Store (Ready for Vercel DB)',
    isCloud: false
  };
}

// ── INITIAL DATA PREPARATION ──────────────────────────────────────────────────
function getSeededAttractions(): Attraction[] {
  return INITIAL_ATTRACTIONS.map(a => {
    const overrideImg = getAttractionImage(a.name, a.image) || getAttractionImage(a.id, a.image);
    return { ...a, image: overrideImg || a.image };
  });
}

interface LocalStoreData {
  destinations: Destination[];
  attractions: Attraction[];
  hotels: Hotel[];
  settings: AppSettings;
}

const LOCAL_DATA_DIR = path.join(process.cwd(), '.data');
const LOCAL_DATA_FILE = path.join(LOCAL_DATA_DIR, 'lobo_persistent_store.json');

function readLocalStore(): LocalStoreData {
  try {
    if (!fs.existsSync(LOCAL_DATA_DIR)) {
      fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(LOCAL_DATA_FILE)) {
      const raw = fs.readFileSync(LOCAL_DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return {
          destinations: Array.isArray(parsed.destinations) ? parsed.destinations : INITIAL_DESTINATIONS,
          attractions: Array.isArray(parsed.attractions) ? parsed.attractions : getSeededAttractions(),
          hotels: Array.isArray(parsed.hotels) ? parsed.hotels : INITIAL_HOTELS,
          settings: parsed.settings ? { ...DEFAULT_SETTINGS, ...parsed.settings } : DEFAULT_SETTINGS
        };
      }
    }
  } catch (err) {
    console.warn('[DB] Could not read local file store, initializing defaults:', err);
  }

  const initial: LocalStoreData = {
    destinations: INITIAL_DESTINATIONS,
    attractions: getSeededAttractions(),
    hotels: INITIAL_HOTELS,
    settings: DEFAULT_SETTINGS
  };

  try {
    if (!fs.existsSync(LOCAL_DATA_DIR)) {
      fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(initial, null, 2), 'utf-8');
  } catch (wErr) {
    console.warn('[DB] Could not write seed file store (read-only filesystem):', wErr);
  }

  return initial;
}

function writeLocalStore(updater: (data: LocalStoreData) => void): LocalStoreData {
  const current = readLocalStore();
  updater(current);
  try {
    if (!fs.existsSync(LOCAL_DATA_DIR)) {
      fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(current, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[DB] Could not persist to local file store:', err);
  }
  return current;
}

// ── VERCEL POSTGRES / NEON IMPLEMENTATION ─────────────────────────────────────
let isPostgresInitialized = false;

async function getPostgresClient() {
  const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL;
  if (!connectionString) return null;
  const { neon } = await import('@neondatabase/serverless');
  return neon(connectionString);
}

async function ensurePostgresTables() {
  if (isPostgresInitialized) return;
  const sql = await getPostgresClient();
  if (!sql) return;

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS lobo_destinations (
        id TEXT PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS lobo_attractions (
        id TEXT PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS lobo_hotels (
        id TEXT PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS lobo_settings (
        id TEXT PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    // Seed if empty
    const destCountRes = await sql`SELECT count(*)::int as cnt FROM lobo_destinations`;
    if (destCountRes[0]?.cnt === 0) {
      console.log('[DB] Seeding Vercel Postgres with initial destinations...');
      for (const d of INITIAL_DESTINATIONS) {
        await sql`INSERT INTO lobo_destinations (id, data, updated_at) VALUES (${d.id.toLowerCase()}, ${JSON.stringify(d)}, NOW()) ON CONFLICT (id) DO NOTHING`;
      }
    }

    const attCountRes = await sql`SELECT count(*)::int as cnt FROM lobo_attractions`;
    if (attCountRes[0]?.cnt === 0) {
      console.log('[DB] Seeding Vercel Postgres with initial attractions...');
      for (const a of getSeededAttractions()) {
        await sql`INSERT INTO lobo_attractions (id, data, updated_at) VALUES (${a.id.toLowerCase()}, ${JSON.stringify(a)}, NOW()) ON CONFLICT (id) DO NOTHING`;
      }
    }

    const hotelCountRes = await sql`SELECT count(*)::int as cnt FROM lobo_hotels`;
    if (hotelCountRes[0]?.cnt === 0) {
      console.log('[DB] Seeding Vercel Postgres with initial hotels...');
      for (const h of INITIAL_HOTELS) {
        await sql`INSERT INTO lobo_hotels (id, data, updated_at) VALUES (${h.id.toLowerCase()}, ${JSON.stringify(h)}, NOW()) ON CONFLICT (id) DO NOTHING`;
      }
    }

    const settingsCountRes = await sql`SELECT count(*)::int as cnt FROM lobo_settings`;
    if (settingsCountRes[0]?.cnt === 0) {
      console.log('[DB] Seeding Vercel Postgres with default settings...');
      await sql`INSERT INTO lobo_settings (id, data, updated_at) VALUES ('settings', ${JSON.stringify(DEFAULT_SETTINGS)}, NOW()) ON CONFLICT (id) DO NOTHING`;
    }

    isPostgresInitialized = true;
  } catch (err) {
    console.error('[DB] Postgres init error:', err);
  }
}

// ── VERCEL KV / UPSTASH REST IMPLEMENTATION ──────────────────────────────────
async function kvGet<T>(key: string): Promise<T | null> {
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!kvUrl || !kvToken) return null;

  try {
    const res = await fetch(`${kvUrl}/get/${key}`, {
      headers: { Authorization: `Bearer ${kvToken}` },
      cache: 'no-store'
    });
    if (!res.ok) return null;
    const body = await res.json();
    if (!body || body.result === null || body.result === undefined) return null;
    return typeof body.result === 'string' ? JSON.parse(body.result) : body.result;
  } catch (e) {
    console.error(`[DB KV] Error getting ${key}:`, e);
    return null;
  }
}

async function kvSet<T>(key: string, value: T): Promise<boolean> {
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!kvUrl || !kvToken) return false;

  try {
    const res = await fetch(`${kvUrl}/set/${key}`, {
      method: 'POST',
      headers: { 
        Authorization: `Bearer ${kvToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(typeof value === 'string' ? value : JSON.stringify(value)),
      cache: 'no-store'
    });
    return res.ok;
  } catch (e) {
    console.error(`[DB KV] Error setting ${key}:`, e);
    return false;
  }
}

// ── SUPABASE IMPLEMENTATION ───────────────────────────────────────────────────
async function getSupabaseClient() {
  const sbUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!sbUrl || !sbKey) return null;
  const { createClient } = await import('@supabase/supabase-js');
  return createClient(sbUrl, sbKey);
}

// ── CRUD OPERATIONS: DESTINATIONS ─────────────────────────────────────────────
export async function getDbDestinations(): Promise<Destination[]> {
  const { provider } = getActiveDbProvider();

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        const rows = await sql`SELECT data FROM lobo_destinations ORDER BY (data->>'name') ASC`;
        if (rows.length > 0) {
          return rows.map((r: any) => typeof r.data === 'string' ? JSON.parse(r.data) : r.data);
        }
      }
    } catch (err) {
      console.error('[DB] Postgres getDbDestinations error:', err);
    }
  } else if (provider === 'kv') {
    const stored = await kvGet<Destination[]>('lobo:destinations');
    if (stored && Array.isArray(stored) && stored.length > 0) {
      return stored;
    }
    // Seed KV
    await kvSet('lobo:destinations', INITIAL_DESTINATIONS);
    return INITIAL_DESTINATIONS;
  } else if (provider === 'supabase') {
    try {
      const sb = await getSupabaseClient();
      if (sb) {
        const { data, error } = await sb.from('lobo_destinations').select('data');
        if (!error && data && data.length > 0) {
          return data.map(d => typeof d.data === 'string' ? JSON.parse(d.data) : d.data);
        }
      }
    } catch (err) {
      console.error('[DB] Supabase getDbDestinations error:', err);
    }
  }

  // Fallback: Local JSON Store
  const local = readLocalStore();
  return local.destinations;
}

export async function saveDbDestination(dest: Destination): Promise<Destination> {
  const { provider } = getActiveDbProvider();
  const destId = dest.id.toLowerCase().trim();
  const sanitizedDest: Destination = { ...dest, id: destId };

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        await sql`
          INSERT INTO lobo_destinations (id, data, updated_at)
          VALUES (${destId}, ${JSON.stringify(sanitizedDest)}, NOW())
          ON CONFLICT (id) DO UPDATE SET data = ${JSON.stringify(sanitizedDest)}, updated_at = NOW();
        `;
        return sanitizedDest;
      }
    } catch (err) {
      console.error('[DB] Postgres saveDbDestination error:', err);
    }
  } else if (provider === 'kv') {
    const list = await getDbDestinations();
    const idx = list.findIndex(d => d.id.toLowerCase() === destId);
    let updated: Destination[];
    if (idx >= 0) {
      updated = [...list];
      updated[idx] = sanitizedDest;
    } else {
      updated = [sanitizedDest, ...list];
    }
    await kvSet('lobo:destinations', updated);
    return sanitizedDest;
  } else if (provider === 'supabase') {
    try {
      const sb = await getSupabaseClient();
      if (sb) {
        await sb.from('lobo_destinations').upsert({ id: destId, data: sanitizedDest, updated_at: new Date().toISOString() });
        return sanitizedDest;
      }
    } catch (err) {
      console.error('[DB] Supabase saveDbDestination error:', err);
    }
  }

  // Fallback: Local JSON Store
  writeLocalStore(data => {
    const idx = data.destinations.findIndex(d => d.id.toLowerCase() === destId);
    if (idx >= 0) {
      data.destinations[idx] = sanitizedDest;
    } else {
      data.destinations.unshift(sanitizedDest);
    }
  });

  return sanitizedDest;
}

export async function deleteDbDestination(id: string): Promise<boolean> {
  const { provider } = getActiveDbProvider();
  const destId = id.toLowerCase().trim();

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        await sql`DELETE FROM lobo_destinations WHERE id = ${destId}`;
        return true;
      }
    } catch (err) {
      console.error('[DB] Postgres deleteDbDestination error:', err);
    }
  } else if (provider === 'kv') {
    const list = await getDbDestinations();
    const updated = list.filter(d => d.id.toLowerCase() !== destId);
    await kvSet('lobo:destinations', updated);
    return true;
  } else if (provider === 'supabase') {
    try {
      const sb = await getSupabaseClient();
      if (sb) {
        await sb.from('lobo_destinations').delete().eq('id', destId);
        return true;
      }
    } catch (err) {
      console.error('[DB] Supabase deleteDbDestination error:', err);
    }
  }

  // Fallback: Local JSON Store
  writeLocalStore(data => {
    data.destinations = data.destinations.filter(d => d.id.toLowerCase() !== destId);
  });

  return true;
}

// ── CRUD OPERATIONS: ATTRACTIONS ─────────────────────────────────────────────
export async function getDbAttractions(): Promise<Attraction[]> {
  const { provider } = getActiveDbProvider();

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        const rows = await sql`SELECT data FROM lobo_attractions ORDER BY (data->>'name') ASC`;
        if (rows.length > 0) {
          return rows.map((r: any) => typeof r.data === 'string' ? JSON.parse(r.data) : r.data);
        }
      }
    } catch (err) {
      console.error('[DB] Postgres getDbAttractions error:', err);
    }
  } else if (provider === 'kv') {
    const stored = await kvGet<Attraction[]>('lobo:attractions');
    if (stored && Array.isArray(stored) && stored.length > 0) {
      return stored;
    }
    const seed = getSeededAttractions();
    await kvSet('lobo:attractions', seed);
    return seed;
  } else if (provider === 'supabase') {
    try {
      const sb = await getSupabaseClient();
      if (sb) {
        const { data, error } = await sb.from('lobo_attractions').select('data');
        if (!error && data && data.length > 0) {
          return data.map(d => typeof d.data === 'string' ? JSON.parse(d.data) : d.data);
        }
      }
    } catch (err) {
      console.error('[DB] Supabase getDbAttractions error:', err);
    }
  }

  // Fallback: Local JSON Store
  const local = readLocalStore();
  return local.attractions;
}

export async function saveDbAttraction(att: Attraction): Promise<Attraction> {
  const { provider } = getActiveDbProvider();
  const attId = att.id.toLowerCase().trim();
  const sanitizedAtt: Attraction = { ...att, id: attId };

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        await sql`
          INSERT INTO lobo_attractions (id, data, updated_at)
          VALUES (${attId}, ${JSON.stringify(sanitizedAtt)}, NOW())
          ON CONFLICT (id) DO UPDATE SET data = ${JSON.stringify(sanitizedAtt)}, updated_at = NOW();
        `;
        return sanitizedAtt;
      }
    } catch (err) {
      console.error('[DB] Postgres saveDbAttraction error:', err);
    }
  } else if (provider === 'kv') {
    const list = await getDbAttractions();
    const idx = list.findIndex(a => a.id.toLowerCase() === attId);
    let updated: Attraction[];
    if (idx >= 0) {
      updated = [...list];
      updated[idx] = sanitizedAtt;
    } else {
      updated = [sanitizedAtt, ...list];
    }
    await kvSet('lobo:attractions', updated);
    return sanitizedAtt;
  } else if (provider === 'supabase') {
    try {
      const sb = await getSupabaseClient();
      if (sb) {
        await sb.from('lobo_attractions').upsert({ id: attId, data: sanitizedAtt, updated_at: new Date().toISOString() });
        return sanitizedAtt;
      }
    } catch (err) {
      console.error('[DB] Supabase saveDbAttraction error:', err);
    }
  }

  // Fallback: Local JSON Store
  writeLocalStore(data => {
    const idx = data.attractions.findIndex(a => a.id.toLowerCase() === attId);
    if (idx >= 0) {
      data.attractions[idx] = sanitizedAtt;
    } else {
      data.attractions.unshift(sanitizedAtt);
    }
  });

  return sanitizedAtt;
}

export async function deleteDbAttraction(id: string): Promise<boolean> {
  const { provider } = getActiveDbProvider();
  const attId = id.toLowerCase().trim();

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        await sql`DELETE FROM lobo_attractions WHERE id = ${attId}`;
        return true;
      }
    } catch (err) {
      console.error('[DB] Postgres deleteDbAttraction error:', err);
    }
  } else if (provider === 'kv') {
    const list = await getDbAttractions();
    const updated = list.filter(a => a.id.toLowerCase() !== attId);
    await kvSet('lobo:attractions', updated);
    return true;
  } else if (provider === 'supabase') {
    try {
      const sb = await getSupabaseClient();
      if (sb) {
        await sb.from('lobo_attractions').delete().eq('id', attId);
        return true;
      }
    } catch (err) {
      console.error('[DB] Supabase deleteDbAttraction error:', err);
    }
  }

  // Fallback: Local JSON Store
  writeLocalStore(data => {
    data.attractions = data.attractions.filter(a => a.id.toLowerCase() !== attId);
  });

  return true;
}

// ── CRUD OPERATIONS: HOTELS ───────────────────────────────────────────────────
export async function getDbHotels(): Promise<Hotel[]> {
  const { provider } = getActiveDbProvider();

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        const rows = await sql`SELECT data FROM lobo_hotels ORDER BY (data->>'name') ASC`;
        if (rows.length > 0) {
          return rows.map((r: any) => typeof r.data === 'string' ? JSON.parse(r.data) : r.data);
        }
      }
    } catch (err) {
      console.error('[DB] Postgres getDbHotels error:', err);
    }
  } else if (provider === 'kv') {
    const stored = await kvGet<Hotel[]>('lobo:hotels');
    if (stored && Array.isArray(stored) && stored.length > 0) {
      return stored;
    }
    await kvSet('lobo:hotels', INITIAL_HOTELS);
    return INITIAL_HOTELS;
  } else if (provider === 'supabase') {
    try {
      const sb = await getSupabaseClient();
      if (sb) {
        const { data, error } = await sb.from('lobo_hotels').select('data');
        if (!error && data && data.length > 0) {
          return data.map(d => typeof d.data === 'string' ? JSON.parse(d.data) : d.data);
        }
      }
    } catch (err) {
      console.error('[DB] Supabase getDbHotels error:', err);
    }
  }

  // Fallback: Local JSON Store
  const local = readLocalStore();
  return local.hotels;
}

export async function saveDbHotel(hotel: Hotel): Promise<Hotel> {
  const { provider } = getActiveDbProvider();
  const hotelId = hotel.id.toLowerCase().trim();
  const sanitizedHotel: Hotel = { ...hotel, id: hotelId };

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        await sql`
          INSERT INTO lobo_hotels (id, data, updated_at)
          VALUES (${hotelId}, ${JSON.stringify(sanitizedHotel)}, NOW())
          ON CONFLICT (id) DO UPDATE SET data = ${JSON.stringify(sanitizedHotel)}, updated_at = NOW();
        `;
        return sanitizedHotel;
      }
    } catch (err) {
      console.error('[DB] Postgres saveDbHotel error:', err);
    }
  } else if (provider === 'kv') {
    const list = await getDbHotels();
    const idx = list.findIndex(h => h.id.toLowerCase() === hotelId);
    let updated: Hotel[];
    if (idx >= 0) {
      updated = [...list];
      updated[idx] = sanitizedHotel;
    } else {
      updated = [sanitizedHotel, ...list];
    }
    await kvSet('lobo:hotels', updated);
    return sanitizedHotel;
  } else if (provider === 'supabase') {
    try {
      const sb = await getSupabaseClient();
      if (sb) {
        await sb.from('lobo_hotels').upsert({ id: hotelId, data: sanitizedHotel, updated_at: new Date().toISOString() });
        return sanitizedHotel;
      }
    } catch (err) {
      console.error('[DB] Supabase saveDbHotel error:', err);
    }
  }

  // Fallback: Local JSON Store
  writeLocalStore(data => {
    const idx = data.hotels.findIndex(h => h.id.toLowerCase() === hotelId);
    if (idx >= 0) {
      data.hotels[idx] = sanitizedHotel;
    } else {
      data.hotels.unshift(sanitizedHotel);
    }
  });

  return sanitizedHotel;
}

export async function deleteDbHotel(id: string): Promise<boolean> {
  const { provider } = getActiveDbProvider();
  const hotelId = id.toLowerCase().trim();

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        await sql`DELETE FROM lobo_hotels WHERE id = ${hotelId}`;
        return true;
      }
    } catch (err) {
      console.error('[DB] Postgres deleteDbHotel error:', err);
    }
  } else if (provider === 'kv') {
    const list = await getDbHotels();
    const updated = list.filter(h => h.id.toLowerCase() !== hotelId);
    await kvSet('lobo:hotels', updated);
    return true;
  } else if (provider === 'supabase') {
    try {
      const sb = await getSupabaseClient();
      if (sb) {
        await sb.from('lobo_hotels').delete().eq('id', hotelId);
        return true;
      }
    } catch (err) {
      console.error('[DB] Supabase deleteDbHotel error:', err);
    }
  }

  // Fallback: Local JSON Store
  writeLocalStore(data => {
    data.hotels = data.hotels.filter(h => h.id.toLowerCase() !== hotelId);
  });

  return true;
}

// ── CRUD OPERATIONS: SETTINGS ─────────────────────────────────────────────────
export async function getDbSettings(): Promise<AppSettings> {
  const { provider } = getActiveDbProvider();

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        const rows = await sql`SELECT data FROM lobo_settings WHERE id = 'settings' LIMIT 1`;
        if (rows.length > 0) {
          const raw = typeof rows[0].data === 'string' ? JSON.parse(rows[0].data) : rows[0].data;
          return { ...DEFAULT_SETTINGS, ...raw };
        }
      }
    } catch (err) {
      console.error('[DB] Postgres getDbSettings error:', err);
    }
  } else if (provider === 'kv') {
    const stored = await kvGet<AppSettings>('lobo:settings');
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...stored };
    }
    await kvSet('lobo:settings', DEFAULT_SETTINGS);
    return DEFAULT_SETTINGS;
  } else if (provider === 'supabase') {
    try {
      const sb = await getSupabaseClient();
      if (sb) {
        const { data, error } = await sb.from('lobo_settings').select('data').eq('id', 'settings').single();
        if (!error && data?.data) {
          const raw = typeof data.data === 'string' ? JSON.parse(data.data) : data.data;
          return { ...DEFAULT_SETTINGS, ...raw };
        }
      }
    } catch (err) {
      console.error('[DB] Supabase getDbSettings error:', err);
    }
  }

  // Fallback: Local JSON Store
  const local = readLocalStore();
  return { ...DEFAULT_SETTINGS, ...local.settings };
}

export async function saveDbSettings(settings: Partial<AppSettings>): Promise<AppSettings> {
  const { provider } = getActiveDbProvider();
  const current = await getDbSettings();
  const merged: AppSettings = {
    ...current,
    ...settings,
    companyName: settings.companyName || current.companyName,
    tagline: settings.tagline !== undefined ? settings.tagline : current.tagline,
    logoUrl: settings.logoUrl || current.logoUrl,
    phones: Array.isArray(settings.phones) && settings.phones.length > 0 ? settings.phones : current.phones,
    email: settings.email || current.email,
    address: settings.address !== undefined ? settings.address : current.address,
    website: settings.website !== undefined ? settings.website : current.website,
    referencePrefix: settings.referencePrefix || current.referencePrefix,
    nextReferenceSequence: typeof settings.nextReferenceSequence === 'number' ? settings.nextReferenceSequence : current.nextReferenceSequence,
    voucherTerms: settings.voucherTerms !== undefined ? settings.voucherTerms : current.voucherTerms,
    defaultInclusions: Array.isArray(settings.defaultInclusions) && settings.defaultInclusions.length > 0 ? settings.defaultInclusions : current.defaultInclusions,
    defaultExclusions: Array.isArray(settings.defaultExclusions) && settings.defaultExclusions.length > 0 ? settings.defaultExclusions : current.defaultExclusions,
    brandColorPrimary: settings.brandColorPrimary || current.brandColorPrimary,
    brandColorSecondary: settings.brandColorSecondary || current.brandColorSecondary,
    brandColorAccent: settings.brandColorAccent || current.brandColorAccent,
    connectedCalendars: Array.isArray(settings.connectedCalendars) ? settings.connectedCalendars : current.connectedCalendars || []
  };

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        await sql`
          INSERT INTO lobo_settings (id, data, updated_at)
          VALUES ('settings', ${JSON.stringify(merged)}, NOW())
          ON CONFLICT (id) DO UPDATE SET data = ${JSON.stringify(merged)}, updated_at = NOW();
        `;
        return merged;
      }
    } catch (err) {
      console.error('[DB] Postgres saveDbSettings error:', err);
    }
  } else if (provider === 'kv') {
    await kvSet('lobo:settings', merged);
    return merged;
  } else if (provider === 'supabase') {
    try {
      const sb = await getSupabaseClient();
      if (sb) {
        await sb.from('lobo_settings').upsert({ id: 'settings', data: merged, updated_at: new Date().toISOString() });
        return merged;
      }
    } catch (err) {
      console.error('[DB] Supabase saveDbSettings error:', err);
    }
  }

  // Fallback: Local JSON Store
  writeLocalStore(data => {
    data.settings = merged;
  });

  return merged;
}
