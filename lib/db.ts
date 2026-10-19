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
    const isNeon = pgUrl.includes('neon.tech') || pgUrl.includes('neon') || !!process.env.POSTGRES_URL;
    return {
      provider: 'postgres',
      label: isNeon ? 'Neon Postgres (Vercel)' : 'PostgreSQL Database',
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
    label: 'Local File Persistence (Neon Postgres Ready)',
    isCloud: false
  };
}

// ── INITIAL DATA PREPARATION ──────────────────────────────────────────────────
export function getSeededAttractions(): Attraction[] {
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

// ── NEON POSTGRES IMPLEMENTATION ──────────────────────────────────────────────
let isPostgresInitialized = false;

async function getPostgresClient() {
  const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL;
  if (!connectionString) return null;
  const { neon } = await import('@neondatabase/serverless');
  return neon(connectionString);
}

/**
 * Creates Postgres tables for destinations, attractions, hotels, and app_settings.
 * Seeds initial database data if tables are empty.
 */
export async function ensurePostgresTables(forceSeed: boolean = false) {
  if (isPostgresInitialized && !forceSeed) return;
  const sql = await getPostgresClient();
  if (!sql) return;

  try {
    // 1. Destinations Table
    await sql`
      CREATE TABLE IF NOT EXISTS destinations (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        state TEXT,
        country TEXT DEFAULT 'India',
        short_description TEXT,
        detailed_description TEXT,
        recommended_duration TEXT,
        hero_image TEXT,
        gallery JSONB DEFAULT '[]'::jsonb,
        data JSONB NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    // 2. Attractions Table
    await sql`
      CREATE TABLE IF NOT EXISTS attractions (
        id TEXT PRIMARY KEY,
        destination_id TEXT NOT NULL,
        destination_name TEXT,
        name TEXT NOT NULL,
        short_description TEXT,
        detailed_description TEXT,
        duration TEXT,
        category TEXT,
        unesco BOOLEAN DEFAULT false,
        image TEXT,
        data JSONB NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    // 3. Hotels Table
    await sql`
      CREATE TABLE IF NOT EXISTS hotels (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT,
        address TEXT,
        star_category INT DEFAULT 4,
        rating NUMERIC DEFAULT 4.5,
        review_count INT DEFAULT 100,
        phone TEXT,
        email TEXT,
        website TEXT,
        description TEXT,
        room_categories JSONB DEFAULT '[]'::jsonb,
        meal_plans JSONB DEFAULT '[]'::jsonb,
        check_in_time TEXT DEFAULT '14:00',
        check_out_time TEXT DEFAULT '12:00',
        image TEXT,
        gallery JSONB DEFAULT '[]'::jsonb,
        partnership_status TEXT DEFAULT 'Regular',
        contracted_rate TEXT,
        data JSONB NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    // 4. App Settings Table
    await sql`
      CREATE TABLE IF NOT EXISTS app_settings (
        id TEXT PRIMARY KEY DEFAULT 'default',
        company_name TEXT,
        tagline TEXT,
        email TEXT,
        data JSONB NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    // Seed destinations if empty
    const destCountRes = await sql`SELECT count(*)::int as cnt FROM destinations`;
    if (destCountRes[0]?.cnt === 0 || forceSeed) {
      console.log('[Neon Postgres] Seeding destinations table with initial catalog...');
      for (const d of INITIAL_DESTINATIONS) {
        const destId = d.id.toLowerCase().trim();
        await sql`
          INSERT INTO destinations (id, name, state, country, short_description, detailed_description, recommended_duration, hero_image, gallery, data, updated_at)
          VALUES (
            ${destId},
            ${d.name},
            ${d.state || ''},
            ${d.country || 'India'},
            ${d.shortDescription || ''},
            ${d.detailedDescription || ''},
            ${d.recommendedDuration || ''},
            ${d.heroImage || ''},
            ${JSON.stringify(d.gallery || [])},
            ${JSON.stringify(d)},
            NOW()
          )
          ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            state = EXCLUDED.state,
            country = EXCLUDED.country,
            short_description = EXCLUDED.short_description,
            detailed_description = EXCLUDED.detailed_description,
            recommended_duration = EXCLUDED.recommended_duration,
            hero_image = EXCLUDED.hero_image,
            gallery = EXCLUDED.gallery,
            data = EXCLUDED.data,
            updated_at = NOW();
        `;
      }
    }

    // Seed attractions if empty
    const attCountRes = await sql`SELECT count(*)::int as cnt FROM attractions`;
    if (attCountRes[0]?.cnt === 0 || forceSeed) {
      console.log('[Neon Postgres] Seeding attractions table with initial catalog...');
      for (const a of getSeededAttractions()) {
        const attId = a.id.toLowerCase().trim();
        await sql`
          INSERT INTO attractions (id, destination_id, destination_name, name, short_description, detailed_description, duration, category, unesco, image, data, updated_at)
          VALUES (
            ${attId},
            ${a.destinationId?.toLowerCase() || ''},
            ${a.destinationName || ''},
            ${a.name},
            ${a.shortDescription || ''},
            ${a.detailedDescription || ''},
            ${a.duration || ''},
            ${a.category || ''},
            ${!!a.unesco},
            ${a.image || ''},
            ${JSON.stringify(a)},
            NOW()
          )
          ON CONFLICT (id) DO UPDATE SET
            destination_id = EXCLUDED.destination_id,
            destination_name = EXCLUDED.destination_name,
            name = EXCLUDED.name,
            short_description = EXCLUDED.short_description,
            detailed_description = EXCLUDED.detailed_description,
            duration = EXCLUDED.duration,
            category = EXCLUDED.category,
            unesco = EXCLUDED.unesco,
            image = EXCLUDED.image,
            data = EXCLUDED.data,
            updated_at = NOW();
        `;
      }
    }

    // Seed hotels if empty
    const hotelCountRes = await sql`SELECT count(*)::int as cnt FROM hotels`;
    if (hotelCountRes[0]?.cnt === 0 || forceSeed) {
      console.log('[Neon Postgres] Seeding hotels table with initial catalog...');
      for (const h of INITIAL_HOTELS) {
        const hotelId = h.id.toLowerCase().trim();
        await sql`
          INSERT INTO hotels (id, name, city, state, address, star_category, rating, review_count, phone, email, website, description, room_categories, meal_plans, check_in_time, check_out_time, image, gallery, partnership_status, contracted_rate, data, updated_at)
          VALUES (
            ${hotelId},
            ${h.name},
            ${h.city},
            ${h.state || ''},
            ${h.address || ''},
            ${h.starCategory || 4},
            ${h.rating || 4.5},
            ${h.reviewCount || 100},
            ${h.phone || ''},
            ${h.email || ''},
            ${h.website || ''},
            ${h.description || ''},
            ${JSON.stringify(h.roomCategories || [])},
            ${JSON.stringify(h.mealPlans || [])},
            ${h.checkInTime || '14:00'},
            ${h.checkOutTime || '12:00'},
            ${h.image || ''},
            ${JSON.stringify(h.gallery || [])},
            ${h.partnershipStatus || 'Regular'},
            ${h.contractedRate || ''},
            ${JSON.stringify(h)},
            NOW()
          )
          ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            city = EXCLUDED.city,
            state = EXCLUDED.state,
            address = EXCLUDED.address,
            star_category = EXCLUDED.star_category,
            rating = EXCLUDED.rating,
            review_count = EXCLUDED.review_count,
            phone = EXCLUDED.phone,
            email = EXCLUDED.email,
            website = EXCLUDED.website,
            description = EXCLUDED.description,
            room_categories = EXCLUDED.room_categories,
            meal_plans = EXCLUDED.meal_plans,
            check_in_time = EXCLUDED.check_in_time,
            check_out_time = EXCLUDED.check_out_time,
            image = EXCLUDED.image,
            gallery = EXCLUDED.gallery,
            partnership_status = EXCLUDED.partnership_status,
            contracted_rate = EXCLUDED.contracted_rate,
            data = EXCLUDED.data,
            updated_at = NOW();
        `;
      }
    }

    // Seed app_settings if empty
    const settingsCountRes = await sql`SELECT count(*)::int as cnt FROM app_settings`;
    if (settingsCountRes[0]?.cnt === 0 || forceSeed) {
      console.log('[Neon Postgres] Seeding app_settings table with defaults...');
      await sql`
        INSERT INTO app_settings (id, company_name, tagline, email, data, updated_at)
        VALUES (
          'default',
          ${DEFAULT_SETTINGS.companyName},
          ${DEFAULT_SETTINGS.tagline || ''},
          ${DEFAULT_SETTINGS.email || ''},
          ${JSON.stringify(DEFAULT_SETTINGS)},
          NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
          company_name = EXCLUDED.company_name,
          tagline = EXCLUDED.tagline,
          email = EXCLUDED.email,
          data = EXCLUDED.data,
          updated_at = NOW();
      `;
    }

    isPostgresInitialized = true;
  } catch (err) {
    console.error('[Neon Postgres] Schema initialization error:', err);
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
        const rows = await sql`SELECT data FROM destinations ORDER BY name ASC`;
        if (rows.length > 0) {
          return rows.map((r: any) => typeof r.data === 'string' ? JSON.parse(r.data) : r.data);
        }
      }
    } catch (err) {
      console.error('[Neon Postgres] getDbDestinations error:', err);
    }
  } else if (provider === 'kv') {
    const stored = await kvGet<Destination[]>('lobo:destinations');
    if (stored && Array.isArray(stored) && stored.length > 0) {
      return stored;
    }
    await kvSet('lobo:destinations', INITIAL_DESTINATIONS);
    return INITIAL_DESTINATIONS;
  } else if (provider === 'supabase') {
    try {
      const sb = await getSupabaseClient();
      if (sb) {
        const { data, error } = await sb.from('destinations').select('data');
        if (!error && data && data.length > 0) {
          return data.map(d => typeof d.data === 'string' ? JSON.parse(d.data) : d.data);
        }
      }
    } catch (err) {
      console.error('[Supabase] getDbDestinations error:', err);
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
          INSERT INTO destinations (id, name, state, country, short_description, detailed_description, recommended_duration, hero_image, gallery, data, updated_at)
          VALUES (
            ${destId},
            ${sanitizedDest.name},
            ${sanitizedDest.state || ''},
            ${sanitizedDest.country || 'India'},
            ${sanitizedDest.shortDescription || ''},
            ${sanitizedDest.detailedDescription || ''},
            ${sanitizedDest.recommendedDuration || ''},
            ${sanitizedDest.heroImage || ''},
            ${JSON.stringify(sanitizedDest.gallery || [])},
            ${JSON.stringify(sanitizedDest)},
            NOW()
          )
          ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            state = EXCLUDED.state,
            country = EXCLUDED.country,
            short_description = EXCLUDED.short_description,
            detailed_description = EXCLUDED.detailed_description,
            recommended_duration = EXCLUDED.recommended_duration,
            hero_image = EXCLUDED.hero_image,
            gallery = EXCLUDED.gallery,
            data = EXCLUDED.data,
            updated_at = NOW();
        `;
        return sanitizedDest;
      }
    } catch (err) {
      console.error('[Neon Postgres] saveDbDestination error:', err);
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
        await sb.from('destinations').upsert({ id: destId, name: sanitizedDest.name, data: sanitizedDest, updated_at: new Date().toISOString() });
        return sanitizedDest;
      }
    } catch (err) {
      console.error('[Supabase] saveDbDestination error:', err);
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
        await sql`DELETE FROM destinations WHERE id = ${destId}`;
        return true;
      }
    } catch (err) {
      console.error('[Neon Postgres] deleteDbDestination error:', err);
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
        await sb.from('destinations').delete().eq('id', destId);
        return true;
      }
    } catch (err) {
      console.error('[Supabase] deleteDbDestination error:', err);
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
        const rows = await sql`SELECT data FROM attractions ORDER BY name ASC`;
        if (rows.length > 0) {
          return rows.map((r: any) => typeof r.data === 'string' ? JSON.parse(r.data) : r.data);
        }
      }
    } catch (err) {
      console.error('[Neon Postgres] getDbAttractions error:', err);
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
        const { data, error } = await sb.from('attractions').select('data');
        if (!error && data && data.length > 0) {
          return data.map(d => typeof d.data === 'string' ? JSON.parse(d.data) : d.data);
        }
      }
    } catch (err) {
      console.error('[Supabase] getDbAttractions error:', err);
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
          INSERT INTO attractions (id, destination_id, destination_name, name, short_description, detailed_description, duration, category, unesco, image, data, updated_at)
          VALUES (
            ${attId},
            ${sanitizedAtt.destinationId?.toLowerCase() || ''},
            ${sanitizedAtt.destinationName || ''},
            ${sanitizedAtt.name},
            ${sanitizedAtt.shortDescription || ''},
            ${sanitizedAtt.detailedDescription || ''},
            ${sanitizedAtt.duration || ''},
            ${sanitizedAtt.category || ''},
            ${!!sanitizedAtt.unesco},
            ${sanitizedAtt.image || ''},
            ${JSON.stringify(sanitizedAtt)},
            NOW()
          )
          ON CONFLICT (id) DO UPDATE SET
            destination_id = EXCLUDED.destination_id,
            destination_name = EXCLUDED.destination_name,
            name = EXCLUDED.name,
            short_description = EXCLUDED.short_description,
            detailed_description = EXCLUDED.detailed_description,
            duration = EXCLUDED.duration,
            category = EXCLUDED.category,
            unesco = EXCLUDED.unesco,
            image = EXCLUDED.image,
            data = EXCLUDED.data,
            updated_at = NOW();
        `;
        return sanitizedAtt;
      }
    } catch (err) {
      console.error('[Neon Postgres] saveDbAttraction error:', err);
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
        await sb.from('attractions').upsert({ id: attId, name: sanitizedAtt.name, data: sanitizedAtt, updated_at: new Date().toISOString() });
        return sanitizedAtt;
      }
    } catch (err) {
      console.error('[Supabase] saveDbAttraction error:', err);
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
        await sql`DELETE FROM attractions WHERE id = ${attId}`;
        return true;
      }
    } catch (err) {
      console.error('[Neon Postgres] deleteDbAttraction error:', err);
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
        await sb.from('attractions').delete().eq('id', attId);
        return true;
      }
    } catch (err) {
      console.error('[Supabase] deleteDbAttraction error:', err);
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
        const rows = await sql`SELECT data FROM hotels ORDER BY name ASC`;
        if (rows.length > 0) {
          return rows.map((r: any) => typeof r.data === 'string' ? JSON.parse(r.data) : r.data);
        }
      }
    } catch (err) {
      console.error('[Neon Postgres] getDbHotels error:', err);
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
        const { data, error } = await sb.from('hotels').select('data');
        if (!error && data && data.length > 0) {
          return data.map(d => typeof d.data === 'string' ? JSON.parse(d.data) : d.data);
        }
      }
    } catch (err) {
      console.error('[Supabase] getDbHotels error:', err);
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
          INSERT INTO hotels (id, name, city, state, address, star_category, rating, review_count, phone, email, website, description, room_categories, meal_plans, check_in_time, check_out_time, image, gallery, partnership_status, contracted_rate, data, updated_at)
          VALUES (
            ${hotelId},
            ${sanitizedHotel.name},
            ${sanitizedHotel.city},
            ${sanitizedHotel.state || ''},
            ${sanitizedHotel.address || ''},
            ${sanitizedHotel.starCategory || 4},
            ${sanitizedHotel.rating || 4.5},
            ${sanitizedHotel.reviewCount || 100},
            ${sanitizedHotel.phone || ''},
            ${sanitizedHotel.email || ''},
            ${sanitizedHotel.website || ''},
            ${sanitizedHotel.description || ''},
            ${JSON.stringify(sanitizedHotel.roomCategories || [])},
            ${JSON.stringify(sanitizedHotel.mealPlans || [])},
            ${sanitizedHotel.checkInTime || '14:00'},
            ${sanitizedHotel.checkOutTime || '12:00'},
            ${sanitizedHotel.image || ''},
            ${JSON.stringify(sanitizedHotel.gallery || [])},
            ${sanitizedHotel.partnershipStatus || 'Regular'},
            ${sanitizedHotel.contractedRate || ''},
            ${JSON.stringify(sanitizedHotel)},
            NOW()
          )
          ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            city = EXCLUDED.city,
            state = EXCLUDED.state,
            address = EXCLUDED.address,
            star_category = EXCLUDED.star_category,
            rating = EXCLUDED.rating,
            review_count = EXCLUDED.review_count,
            phone = EXCLUDED.phone,
            email = EXCLUDED.email,
            website = EXCLUDED.website,
            description = EXCLUDED.description,
            room_categories = EXCLUDED.room_categories,
            meal_plans = EXCLUDED.meal_plans,
            check_in_time = EXCLUDED.check_in_time,
            check_out_time = EXCLUDED.check_out_time,
            image = EXCLUDED.image,
            gallery = EXCLUDED.gallery,
            partnership_status = EXCLUDED.partnership_status,
            contracted_rate = EXCLUDED.contracted_rate,
            data = EXCLUDED.data,
            updated_at = NOW();
        `;
        return sanitizedHotel;
      }
    } catch (err) {
      console.error('[Neon Postgres] saveDbHotel error:', err);
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
        await sb.from('hotels').upsert({ id: hotelId, name: sanitizedHotel.name, data: sanitizedHotel, updated_at: new Date().toISOString() });
        return sanitizedHotel;
      }
    } catch (err) {
      console.error('[Supabase] saveDbHotel error:', err);
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
        await sql`DELETE FROM hotels WHERE id = ${hotelId}`;
        return true;
      }
    } catch (err) {
      console.error('[Neon Postgres] deleteDbHotel error:', err);
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
        await sb.from('hotels').delete().eq('id', hotelId);
        return true;
      }
    } catch (err) {
      console.error('[Supabase] deleteDbHotel error:', err);
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
        const rows = await sql`SELECT data FROM app_settings WHERE id = 'default' LIMIT 1`;
        if (rows.length > 0) {
          const raw = typeof rows[0].data === 'string' ? JSON.parse(rows[0].data) : rows[0].data;
          return { ...DEFAULT_SETTINGS, ...raw };
        }
      }
    } catch (err) {
      console.error('[Neon Postgres] getDbSettings error:', err);
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
        const { data, error } = await sb.from('app_settings').select('data').eq('id', 'default').single();
        if (!error && data?.data) {
          const raw = typeof data.data === 'string' ? JSON.parse(data.data) : data.data;
          return { ...DEFAULT_SETTINGS, ...raw };
        }
      }
    } catch (err) {
      console.error('[Supabase] getDbSettings error:', err);
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
          INSERT INTO app_settings (id, company_name, tagline, email, data, updated_at)
          VALUES (
            'default',
            ${merged.companyName},
            ${merged.tagline || ''},
            ${merged.email || ''},
            ${JSON.stringify(merged)},
            NOW()
          )
          ON CONFLICT (id) DO UPDATE SET
            company_name = EXCLUDED.company_name,
            tagline = EXCLUDED.tagline,
            email = EXCLUDED.email,
            data = EXCLUDED.data,
            updated_at = NOW();
        `;
        return merged;
      }
    } catch (err) {
      console.error('[Neon Postgres] saveDbSettings error:', err);
    }
  } else if (provider === 'kv') {
    await kvSet('lobo:settings', merged);
    return merged;
  } else if (provider === 'supabase') {
    try {
      const sb = await getSupabaseClient();
      if (sb) {
        await sb.from('app_settings').upsert({ id: 'default', company_name: merged.companyName, data: merged, updated_at: new Date().toISOString() });
        return merged;
      }
    } catch (err) {
      console.error('[Supabase] saveDbSettings error:', err);
    }
  }

  // Fallback: Local JSON Store
  writeLocalStore(data => {
    data.settings = merged;
  });

  return merged;
}

// ── UTILITY: VERIFY AND SEED DATABASE ─────────────────────────────────────────
export async function seedNeonDatabase(force: boolean = false): Promise<{
  success: boolean;
  provider: string;
  destinationsCount: number;
  attractionsCount: number;
  hotelsCount: number;
  settingsConfigured: boolean;
}> {
  const dbInfo = getActiveDbProvider();

  if (dbInfo.provider === 'postgres') {
    await ensurePostgresTables(force);
    const sql = await getPostgresClient();
    if (sql) {
      const [dRes, aRes, hRes, sRes] = await Promise.all([
        sql`SELECT count(*)::int as cnt FROM destinations`,
        sql`SELECT count(*)::int as cnt FROM attractions`,
        sql`SELECT count(*)::int as cnt FROM hotels`,
        sql`SELECT count(*)::int as cnt FROM app_settings`
      ]);
      return {
        success: true,
        provider: dbInfo.label,
        destinationsCount: dRes[0]?.cnt || 0,
        attractionsCount: aRes[0]?.cnt || 0,
        hotelsCount: hRes[0]?.cnt || 0,
        settingsConfigured: (sRes[0]?.cnt || 0) > 0
      };
    }
  }

  const [d, a, h, s] = await Promise.all([
    getDbDestinations(),
    getDbAttractions(),
    getDbHotels(),
    getDbSettings()
  ]);

  return {
    success: true,
    provider: dbInfo.label,
    destinationsCount: d.length,
    attractionsCount: a.length,
    hotelsCount: h.length,
    settingsConfigured: !!s.companyName
  };
}
