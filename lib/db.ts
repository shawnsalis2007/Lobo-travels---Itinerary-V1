import { 
  Destination, 
  Attraction, 
  Hotel, 
  AppSettings, 
  Itinerary, 
  FleetVehicle, 
  Driver, 
  OperationalBooking,
  Brand,
  User,
  ActivityLog,
  DEFAULT_PERMISSIONS
} from '@/types';
import { 
  DEFAULT_SETTINGS, 
  INITIAL_DESTINATIONS, 
  INITIAL_ATTRACTIONS, 
  INITIAL_HOTELS,
  INITIAL_ITINERARIES,
  INITIAL_FLEET,
  INITIAL_DRIVERS,
  INITIAL_OPERATIONAL_BOOKINGS
} from './mock-data';
import { getAttractionImage } from './catalog-data';
import fs from 'fs';
import path from 'path';

// ── DEFAULT BRAND & PROVIDER DETECTION ─────────────────────────────────────────
export const DEFAULT_BRAND_ID = 'brand-lobo-travels';

export const DEFAULT_BRAND: Brand = {
  id: DEFAULT_BRAND_ID,
  name: "Lobo's Travel Wizard",
  slug: 'lobos-travel-wizard',
  code: 'LOBO',
  logoUrl: '/logo.png',
  brandColorPrimary: '#151521',
  brandColorSecondary: '#26214F',
  brandColorAccent: '#f59e0b',
  brochureColors: {
    headerBg: '#151521',
    headerText: '#ffffff',
    accentPill: '#f59e0b'
  },
  contactInfo: {
    phones: ['+91 9811240072', '+91 9891240072'],
    email: 'info@lobostravelwizard.com',
    address: 'Shop No. 12, NDMC Market Near CNG Pump, Mandir Marg, New Delhi - 110001',
    website: 'lobostravelwizard.com'
  },
  referencePrefix: 'LT-2026-',
  maxUsers: 50,
  status: 'active',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z'
};

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

export interface StoredSession {
  id: string;
  userId: string;
  brandId: string;
  expiresAt: string;
  createdAt: string;
}

export interface StoredReferenceCounter {
  brandId: string;
  year: number;
  currentSequence: number;
}

interface LocalStoreData {
  destinations: Destination[];
  attractions: Attraction[];
  hotels: Hotel[];
  settings: AppSettings;
  itineraries?: Itinerary[];
  brands?: Brand[];
  users?: User[];
  sessions?: StoredSession[];
  referenceCounters?: StoredReferenceCounter[];
  fleet?: FleetVehicle[];
  drivers?: Driver[];
  bookings?: OperationalBooking[];
  activityLogs?: ActivityLog[];
}

const LOCAL_DATA_DIR = path.join(process.cwd(), '.data');
const LOCAL_DATA_FILE = path.join(LOCAL_DATA_DIR, 'lobo_persistent_store.json');
const PRE_MIGRATION_BACKUP_FILE = path.join(LOCAL_DATA_DIR, 'backup_pre_migration.json');

// Default initial master Super Admin account (pre-generated with bcrypt 10 rounds)
// Password: vlobo99@outlook.com -> venson7359
const SEED_USERS: User[] = [
  {
    id: 'user-superadmin-01',
    brandId: DEFAULT_BRAND_ID,
    email: 'vlobo99@outlook.com',
    passwordHash: '$2b$10$PzsHXOJkyKbIwJF2rgAO9eUiqz4vcj4YfWOdAIQoAljbbrxHk/K9C',
    fullName: 'Venson Lobo (Super Admin)',
    role: 'super_admin',
    permissions: { ...DEFAULT_PERMISSIONS, canManageUsers: true, canManageSettings: true, canDeleteItinerary: true },
    isActive: true,
    mustChangePassword: false,
    failedLoginAttempts: 0,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  }
];

function readLocalStore(): LocalStoreData {
  try {
    if (!fs.existsSync(LOCAL_DATA_DIR)) {
      fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(LOCAL_DATA_FILE)) {
      const raw = fs.readFileSync(LOCAL_DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      // Strictly filter out any standalone kempty-falls destination entry
      const rawDests: Destination[] = Array.isArray(parsed.destinations) ? parsed.destinations : INITIAL_DESTINATIONS;
      const dests: Destination[] = rawDests.filter((d: Destination) => d.id !== 'kempty-falls' && (d.name || '').toLowerCase() !== 'kempty falls');
      const atts: Attraction[] = Array.isArray(parsed.attractions) ? (parsed.attractions as Attraction[]) : getSeededAttractions();
      const kemptyAttUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Kempty_Waterfalls.jpg/1280px-Kempty_Waterfalls.jpg';
      
      const mIdx = dests.findIndex((d: Destination) => d.id === 'mussoorie');
      if (mIdx >= 0 && (!dests[mIdx].gallery || dests[mIdx].gallery.length === 0)) {
        dests[mIdx].gallery = [kemptyAttUrl];
      }
      atts.forEach((a: Attraction) => {
        if (a.id === 'mussoorie-kempty-falls' || (a.name && (a.name.toLowerCase() === 'kempty falls' || a.name.toLowerCase() === 'kempty falls cascades'))) {
          a.destinationId = 'mussoorie';
          a.destinationName = 'Mussoorie';
          a.name = 'Kempty Falls';
          a.image = kemptyAttUrl;
        }
      });

      const rawUsers: User[] = Array.isArray(parsed.users) && parsed.users.length > 0 ? parsed.users : SEED_USERS;
      const sanitizedUsers = rawUsers.filter((u: User) => 
        !['superadmin@lobotravels.com', 'admin@lobotravels.com', 'staff@lobotravels.com', 'viewer@lobotravels.com'].includes((u.email || '').toLowerCase())
      );
      if (!sanitizedUsers.some((u: User) => (u.email || '').toLowerCase() === 'vlobo99@outlook.com')) {
        sanitizedUsers.unshift(SEED_USERS[0]);
      }

      return {
        destinations: dests,
        attractions: atts,
        hotels: Array.isArray(parsed.hotels) ? parsed.hotels : INITIAL_HOTELS,
        settings: parsed.settings ? { ...DEFAULT_SETTINGS, ...parsed.settings } : DEFAULT_SETTINGS,
        itineraries: Array.isArray(parsed.itineraries) ? parsed.itineraries : INITIAL_ITINERARIES,
        brands: Array.isArray(parsed.brands) && parsed.brands.length > 0 ? parsed.brands : [DEFAULT_BRAND],
        users: sanitizedUsers,
        sessions: Array.isArray(parsed.sessions) ? parsed.sessions : [],
        referenceCounters: Array.isArray(parsed.referenceCounters) ? parsed.referenceCounters : [{ brandId: DEFAULT_BRAND_ID, year: 2026, currentSequence: 280 }],
        fleet: Array.isArray(parsed.fleet) ? parsed.fleet : INITIAL_FLEET,
        drivers: Array.isArray(parsed.drivers) ? parsed.drivers : INITIAL_DRIVERS,
        bookings: Array.isArray(parsed.bookings) ? parsed.bookings : INITIAL_OPERATIONAL_BOOKINGS,
        activityLogs: Array.isArray(parsed.activityLogs) ? parsed.activityLogs : []
      };
    }
  } catch (err) {
    console.warn('[DB] Could not read local file store, initializing defaults:', err);
  }

  const initial: LocalStoreData = {
    destinations: INITIAL_DESTINATIONS,
    attractions: getSeededAttractions(),
    hotels: INITIAL_HOTELS,
    settings: DEFAULT_SETTINGS,
    itineraries: INITIAL_ITINERARIES,
    brands: [DEFAULT_BRAND],
    users: SEED_USERS,
    sessions: [],
    referenceCounters: [{ brandId: DEFAULT_BRAND_ID, year: 2026, currentSequence: 280 }],
    fleet: INITIAL_FLEET,
    drivers: INITIAL_DRIVERS,
    bookings: INITIAL_OPERATIONAL_BOOKINGS,
    activityLogs: []
  };

  try {
    if (!fs.existsSync(LOCAL_DATA_DIR)) {
      fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(initial, null, 2), 'utf-8');
  } catch (wErr) {
    console.warn('[DB] Could not write seed file store:', wErr);
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

// ── BACKUP BEFORE MIGRATION ───────────────────────────────────────────────────
let hasPerformedPreMigrationBackup = false;

export async function backupDatabasePreMigration(): Promise<void> {
  if (hasPerformedPreMigrationBackup) return;
  try {
    const { provider } = getActiveDbProvider();
    if (!fs.existsSync(LOCAL_DATA_DIR)) {
      fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
    }

    let backupData: any = null;

    if (provider === 'postgres') {
      const sql = await getPostgresClient();
      if (sql) {
        try {
          const [dests, atts, hotels, settings, itins] = await Promise.all([
            sql`SELECT data FROM destinations`.catch(() => []),
            sql`SELECT data FROM attractions`.catch(() => []),
            sql`SELECT data FROM hotels`.catch(() => []),
            sql`SELECT data FROM app_settings`.catch(() => []),
            sql`SELECT data FROM itineraries`.catch(() => [])
          ]);

          backupData = {
            timestamp: new Date().toISOString(),
            provider: 'postgres',
            destinations: dests.map((r: any) => typeof r.data === 'string' ? JSON.parse(r.data) : r.data),
            attractions: atts.map((r: any) => typeof r.data === 'string' ? JSON.parse(r.data) : r.data),
            hotels: hotels.map((r: any) => typeof r.data === 'string' ? JSON.parse(r.data) : r.data),
            settings: settings.map((r: any) => typeof r.data === 'string' ? JSON.parse(r.data) : r.data),
            itineraries: itins.map((r: any) => typeof r.data === 'string' ? JSON.parse(r.data) : r.data)
          };
        } catch (e) {
          console.warn('[DB Backup] Could not query existing postgres tables for backup:', e);
        }
      }
    }

    if (!backupData) {
      backupData = {
        timestamp: new Date().toISOString(),
        provider: 'local_file',
        ...readLocalStore()
      };
    }

    fs.writeFileSync(PRE_MIGRATION_BACKUP_FILE, JSON.stringify(backupData, null, 2), 'utf-8');
    const timestampedBackup = path.join(LOCAL_DATA_DIR, `backup_pre_migration_${Date.now()}.json`);
    fs.writeFileSync(timestampedBackup, JSON.stringify(backupData, null, 2), 'utf-8');
    console.log('[DB Backup] Pre-migration database snapshot saved successfully to:', PRE_MIGRATION_BACKUP_FILE);
    hasPerformedPreMigrationBackup = true;
  } catch (err) {
    console.warn('[DB Backup] Pre-migration backup warning:', err);
  }
}

export async function seedNeonDatabase(force: boolean = false) {
  await ensurePostgresTables(force);
  return getDbDatabaseStatus();
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
 * Safely parses and splits a multi-command SQL script into discrete statements.
 * Correctly accounts for single quotes, double quotes, line comments (--),
 * and block comments (/* * /) to prevent "cannot insert multiple commands into a prepared statement".
 */
export function splitSqlStatements(sqlScript: string): string[] {
  if (!sqlScript || !sqlScript.trim()) return [];

  const statements: string[] = [];
  let current = '';
  let inSingleQuote = false;
  let inDoubleQuote = false;
  let inLineComment = false;
  let inBlockComment = false;

  for (let i = 0; i < sqlScript.length; i++) {
    const char = sqlScript[i];
    const nextChar = sqlScript[i + 1] || '';

    if (inLineComment) {
      if (char === '\n') {
        inLineComment = false;
      }
      continue;
    }

    if (inBlockComment) {
      if (char === '*' && nextChar === '/') {
        inBlockComment = false;
        i++;
      }
      continue;
    }

    if (!inSingleQuote && !inDoubleQuote) {
      if (char === '-' && nextChar === '-') {
        inLineComment = true;
        i++;
        continue;
      }
      if (char === '/' && nextChar === '*') {
        inBlockComment = true;
        i++;
        continue;
      }
    }

    if (char === "'" && !inDoubleQuote) {
      if (inSingleQuote && nextChar === "'") {
        current += "''";
        i++;
        continue;
      }
      inSingleQuote = !inSingleQuote;
      current += char;
      continue;
    }

    if (char === '"' && !inSingleQuote) {
      inDoubleQuote = !inDoubleQuote;
      current += char;
      continue;
    }

    if (char === ';' && !inSingleQuote && !inDoubleQuote) {
      const trimmed = current.trim();
      if (trimmed.length > 0) {
        statements.push(trimmed);
      }
      current = '';
      continue;
    }

    current += char;
  }

  const trailing = current.trim();
  if (trailing.length > 0) {
    statements.push(trailing);
  }

  return statements.map(s => s.replace(/;+$/, '').trim()).filter(Boolean);
}

/**
 * Executes a multi-statement SQL script using Neon's sql client by splitting
 * queries by semicolon and executing each single command individually.
 */
export async function executeMultiStatementSql(sql: any, sqlScript: string): Promise<void> {
  if (!sql || !sqlScript) return;
  const statements = splitSqlStatements(sqlScript);
  for (const statement of statements) {
    if (!statement) continue;
    if (typeof sql.unsafe === 'function') {
      await sql.unsafe(statement);
    } else if (typeof sql.query === 'function') {
      await sql.query(statement);
    } else {
      await sql([statement] as any);
    }
  }
}

/**
 * Creates Postgres tables and applies versioned, non-destructive migrations.
 * Preserves all existing data, sets up multi-brand, authentication, atomic reference counters,
 * fleet, drivers, bookings, activity logs, and soft delete.
 */
export async function ensurePostgresTables(forceSeed: boolean = false) {
  if (isPostgresInitialized && !forceSeed) return;
  const sql = await getPostgresClient();
  if (!sql) return;

  try {
    // 0. Backup pre-migration snapshot before touching any schema
    await backupDatabasePreMigration();

    // 1. Brands Table
    await sql`
      CREATE TABLE IF NOT EXISTS brands (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        code TEXT UNIQUE NOT NULL,
        logo_url TEXT,
        brand_color_primary TEXT DEFAULT '#151521',
        brand_color_secondary TEXT DEFAULT '#26214F',
        brand_color_accent TEXT DEFAULT '#f59e0b',
        brochure_colors JSONB DEFAULT '{"headerBg": "#151521", "headerText": "#ffffff", "accentPill": "#f59e0b"}'::jsonb,
        contact_info JSONB DEFAULT '{"phones": ["+91 9811240072"], "email": "info@lobotravels.com", "address": "New Delhi, India"}'::jsonb,
        reference_prefix TEXT DEFAULT 'LT-2026-',
        max_users INT DEFAULT 50,
        status TEXT DEFAULT 'active',
        data JSONB DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    // Seed default Lobo's Travel Wizard brand
    await sql`
      INSERT INTO brands (id, name, slug, code, logo_url, brand_color_primary, brand_color_secondary, brand_color_accent, reference_prefix, max_users, status, data)
      VALUES (
        ${DEFAULT_BRAND.id},
        ${DEFAULT_BRAND.name},
        ${DEFAULT_BRAND.slug},
        ${DEFAULT_BRAND.code},
        ${DEFAULT_BRAND.logoUrl || '/logo.png'},
        ${DEFAULT_BRAND.brandColorPrimary},
        ${DEFAULT_BRAND.brandColorSecondary},
        ${DEFAULT_BRAND.brandColorAccent},
        ${DEFAULT_BRAND.referencePrefix},
        50,
        'active',
        ${JSON.stringify(DEFAULT_BRAND)}
      )
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        code = EXCLUDED.code,
        updated_at = NOW();
    `;

    // 2. Users Table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        brand_id TEXT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        full_name TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'staff',
        permissions JSONB DEFAULT '{}'::jsonb,
        failed_login_attempts INT DEFAULT 0,
        locked_until TIMESTAMPTZ,
        must_change_password BOOLEAN DEFAULT false,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;
    await sql`CREATE INDEX IF NOT EXISTS idx_users_brand_email ON users(brand_id, email);`;

    // 3. Sessions Table
    await sql`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        brand_id TEXT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;
    await sql`CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);`;

    // 4. Reference Number Atomic Counters Table
    await sql`
      CREATE TABLE IF NOT EXISTS reference_counters (
        brand_id TEXT NOT NULL,
        year INT NOT NULL,
        current_sequence INT NOT NULL DEFAULT 280,
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        PRIMARY KEY (brand_id, year)
      );
    `;

    // Initialize default reference counter
    await sql`
      INSERT INTO reference_counters (brand_id, year, current_sequence)
      VALUES (${DEFAULT_BRAND_ID}, 2026, 280)
      ON CONFLICT (brand_id, year) DO NOTHING;
    `;

    // 5. Destinations Table
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
    await sql`ALTER TABLE destinations ADD COLUMN IF NOT EXISTS brand_id TEXT NOT NULL DEFAULT 'brand-lobo-travels';`;
    await sql`ALTER TABLE destinations ADD COLUMN IF NOT EXISTS source TEXT NOT NULL DEFAULT 'lobo_preloaded';`;
    await sql`ALTER TABLE destinations ADD COLUMN IF NOT EXISTS original_destination_id TEXT;`;
    await sql`ALTER TABLE destinations ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN NOT NULL DEFAULT false;`;
    await sql`ALTER TABLE destinations ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;`;
    await sql`ALTER TABLE destinations ADD COLUMN IF NOT EXISTS created_by TEXT;`;
    await sql`ALTER TABLE destinations ADD COLUMN IF NOT EXISTS updated_by TEXT;`;
    await sql`CREATE INDEX IF NOT EXISTS idx_destinations_brand ON destinations(brand_id);`;

    // 6. Attractions Table
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
    await sql`ALTER TABLE attractions ADD COLUMN IF NOT EXISTS brand_id TEXT NOT NULL DEFAULT 'brand-lobo-travels';`;
    await sql`ALTER TABLE attractions ADD COLUMN IF NOT EXISTS source TEXT NOT NULL DEFAULT 'lobo_preloaded';`;
    await sql`ALTER TABLE attractions ADD COLUMN IF NOT EXISTS original_attraction_id TEXT;`;
    await sql`ALTER TABLE attractions ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN NOT NULL DEFAULT false;`;
    await sql`ALTER TABLE attractions ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;`;
    await sql`ALTER TABLE attractions ADD COLUMN IF NOT EXISTS created_by TEXT;`;
    await sql`ALTER TABLE attractions ADD COLUMN IF NOT EXISTS updated_by TEXT;`;
    await sql`CREATE INDEX IF NOT EXISTS idx_attractions_brand ON attractions(brand_id);`;

    // 7. Hotels Table
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
    await sql`ALTER TABLE hotels ADD COLUMN IF NOT EXISTS brand_id TEXT NOT NULL DEFAULT 'brand-lobo-travels';`;
    await sql`ALTER TABLE hotels ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN NOT NULL DEFAULT false;`;
    await sql`ALTER TABLE hotels ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;`;
    await sql`ALTER TABLE hotels ADD COLUMN IF NOT EXISTS created_by TEXT;`;
    await sql`ALTER TABLE hotels ADD COLUMN IF NOT EXISTS updated_by TEXT;`;
    await sql`CREATE INDEX IF NOT EXISTS idx_hotels_brand ON hotels(brand_id);`;

    // 8. App Settings Table
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
    await sql`ALTER TABLE app_settings ADD COLUMN IF NOT EXISTS brand_id TEXT NOT NULL DEFAULT 'brand-lobo-travels';`;

    // 9. Itineraries Table
    await sql`
      CREATE TABLE IF NOT EXISTS itineraries (
        id TEXT PRIMARY KEY,
        reference_number TEXT NOT NULL,
        tour_name TEXT NOT NULL,
        client_name TEXT,
        start_date TEXT,
        end_date TEXT,
        total_cost NUMERIC DEFAULT 0,
        data JSONB NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;
    await sql`ALTER TABLE itineraries ADD COLUMN IF NOT EXISTS brand_id TEXT NOT NULL DEFAULT 'brand-lobo-travels';`;
    await sql`ALTER TABLE itineraries ADD COLUMN IF NOT EXISTS sequence_number INT NOT NULL DEFAULT 1;`;
    await sql`ALTER TABLE itineraries ADD COLUMN IF NOT EXISTS version INT NOT NULL DEFAULT 1;`;
    await sql`ALTER TABLE itineraries ADD COLUMN IF NOT EXISTS is_protected BOOLEAN NOT NULL DEFAULT false;`;
    await sql`ALTER TABLE itineraries ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN NOT NULL DEFAULT false;`;
    await sql`ALTER TABLE itineraries ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;`;
    await sql`ALTER TABLE itineraries ADD COLUMN IF NOT EXISTS created_by TEXT;`;
    await sql`ALTER TABLE itineraries ADD COLUMN IF NOT EXISTS updated_by TEXT;`;
    await sql`CREATE INDEX IF NOT EXISTS idx_itineraries_ref ON itineraries (reference_number);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_itineraries_brand ON itineraries(brand_id);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_itineraries_seq ON itineraries(sequence_number DESC);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_itineraries_deleted ON itineraries(is_deleted);`;

    // Flag the 5 critical itineraries as protected in DB
    await sql`
      UPDATE itineraries 
      SET is_protected = true 
      WHERE reference_number IN ('LT-2026-0256', 'LT-2026-0255', 'LT-2026-0254', 'LT-2026-0007', 'LT-2026-0279');
    `;

    // 10. Fleet Table
    await sql`
      CREATE TABLE IF NOT EXISTS fleet (
        id TEXT PRIMARY KEY,
        brand_id TEXT NOT NULL DEFAULT 'brand-lobo-travels',
        model_name TEXT DEFAULT 'Toyota Innova Crysta',
        registration_number TEXT DEFAULT 'DL-FLEET',
        category TEXT DEFAULT 'MUV',
        capacity INT DEFAULT 7,
        fuel_type TEXT DEFAULT 'Diesel',
        is_active BOOLEAN DEFAULT true,
        is_deleted BOOLEAN DEFAULT false,
        deleted_at TIMESTAMPTZ,
        created_by TEXT,
        updated_by TEXT,
        data JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;
    await sql`ALTER TABLE fleet ALTER COLUMN model_name DROP NOT NULL`.catch(() => {});
    await sql`ALTER TABLE fleet ALTER COLUMN registration_number DROP NOT NULL`.catch(() => {});
    await sql`ALTER TABLE fleet ALTER COLUMN category DROP NOT NULL`.catch(() => {});
    await sql`ALTER TABLE fleet ALTER COLUMN capacity DROP NOT NULL`.catch(() => {});
    await sql`ALTER TABLE fleet ALTER COLUMN fuel_type DROP NOT NULL`.catch(() => {});
    await sql`UPDATE fleet SET model_name = 'Toyota Innova Crysta' WHERE model_name IS NULL`.catch(() => {});
    await sql`UPDATE fleet SET registration_number = 'DL 1ZA 4072' WHERE registration_number IS NULL`.catch(() => {});
    await sql`CREATE INDEX IF NOT EXISTS idx_fleet_brand ON fleet(brand_id);`;

    // 11. Drivers Table
    await sql`
      CREATE TABLE IF NOT EXISTS drivers (
        id TEXT PRIMARY KEY,
        brand_id TEXT NOT NULL DEFAULT 'brand-lobo-travels',
        name TEXT DEFAULT 'Driver',
        phone TEXT DEFAULT '',
        license_number TEXT DEFAULT '',
        is_active BOOLEAN DEFAULT true,
        is_deleted BOOLEAN DEFAULT false,
        deleted_at TIMESTAMPTZ,
        created_by TEXT,
        updated_by TEXT,
        data JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;
    await sql`ALTER TABLE drivers ALTER COLUMN license_number DROP NOT NULL`.catch(() => {});
    await sql`ALTER TABLE drivers ALTER COLUMN phone DROP NOT NULL`.catch(() => {});
    await sql`ALTER TABLE drivers ALTER COLUMN name DROP NOT NULL`.catch(() => {});
    await sql`CREATE INDEX IF NOT EXISTS idx_drivers_brand ON drivers(brand_id);`;

    // 12. Operational Bookings Table
    await sql`
      CREATE TABLE IF NOT EXISTS operational_bookings (
        id TEXT PRIMARY KEY,
        brand_id TEXT NOT NULL DEFAULT 'brand-lobo-travels',
        itinerary_id TEXT,
        status TEXT DEFAULT 'scheduled',
        is_deleted BOOLEAN DEFAULT false,
        deleted_at TIMESTAMPTZ,
        created_by TEXT,
        updated_by TEXT,
        data JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;
    await sql`CREATE INDEX IF NOT EXISTS idx_bookings_brand ON operational_bookings(brand_id);`;

    // 13. Activity Logs Table
    await sql`
      CREATE TABLE IF NOT EXISTS activity_logs (
        id TEXT PRIMARY KEY,
        brand_id TEXT NOT NULL,
        user_id TEXT,
        user_email TEXT,
        action TEXT NOT NULL,
        entity_type TEXT NOT NULL,
        entity_id TEXT,
        details JSONB DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;
    await sql`CREATE INDEX IF NOT EXISTS idx_activity_logs_brand ON activity_logs(brand_id, created_at DESC);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_activity_logs_action ON activity_logs(action);`;

    // Seed destinations if empty
    const destCountRes = await sql`SELECT count(*)::int as cnt FROM destinations`;
    if (destCountRes[0]?.cnt === 0 || forceSeed) {
      console.log('[Neon Postgres] Seeding destinations table with initial catalog...');
      for (const d of INITIAL_DESTINATIONS) {
        const destId = d.id.toLowerCase().trim();
        await sql`
          INSERT INTO destinations (id, name, state, country, short_description, detailed_description, recommended_duration, hero_image, gallery, brand_id, source, data, updated_at)
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
            ${DEFAULT_BRAND_ID},
            'lobo_preloaded',
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
          INSERT INTO attractions (id, destination_id, destination_name, name, short_description, detailed_description, duration, category, unesco, image, brand_id, source, data, updated_at)
          VALUES (
            ${attId},
            ${a.destinationId},
            ${a.destinationName || ''},
            ${a.name},
            ${a.shortDescription || ''},
            ${a.detailedDescription || ''},
            ${a.duration || ''},
            ${a.category || ''},
            ${a.unesco || false},
            ${a.image || ''},
            ${DEFAULT_BRAND_ID},
            'lobo_preloaded',
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
      console.log('[Neon Postgres] Seeding hotels table...');
      for (const h of INITIAL_HOTELS) {
        await sql`
          INSERT INTO hotels (id, name, city, state, address, star_category, rating, review_count, phone, email, website, description, room_categories, meal_plans, check_in_time, check_out_time, image, gallery, partnership_status, contracted_rate, brand_id, data, updated_at)
          VALUES (
            ${h.id},
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
            ${DEFAULT_BRAND_ID},
            ${JSON.stringify(h)},
            NOW()
          )
          ON CONFLICT (id) DO NOTHING;
        `;
      }
    }

    // Ensure all 7 seed fleet vehicles are present and explicitly have model_name
    console.log('[Neon Postgres] Ensuring 7 initial fleet vehicles are seeded...');
    for (const v of INITIAL_FLEET) {
      const modelName = v.modelName || (v.brand && v.model ? `${v.brand} ${v.model}` : '') || v.model || v.brand || 'Toyota Innova Crysta';
      const regNumber = v.registrationNumber || v.plateNumber || 'DL 1ZA ' + Math.floor(1000 + Math.random() * 9000);
      const category = v.category || v.type || 'MUV';
      const capacity = Number(v.capacity || v.seats || 7);
      const fuelType = v.fuelType || 'Diesel';
      const isActive = v.isActive !== false && v.status !== 'inactive';

      const fleetPayload: FleetVehicle = {
        ...v,
        brandId: DEFAULT_BRAND_ID,
        modelName,
        model: v.model || modelName,
        brand: v.brand || modelName.split(' ')[0] || 'Toyota',
        registrationNumber: regNumber,
        plateNumber: v.plateNumber || regNumber,
        category,
        type: v.type || category,
        capacity,
        seats: v.seats || capacity,
        fuelType,
        isActive,
        status: v.status || (isActive ? 'active' : 'inactive')
      };

      await sql`
        INSERT INTO fleet (id, brand_id, model_name, registration_number, category, capacity, fuel_type, is_active, data, created_at, updated_at)
        VALUES (
          ${v.id},
          ${DEFAULT_BRAND_ID},
          ${modelName},
          ${regNumber},
          ${category},
          ${capacity},
          ${fuelType},
          ${isActive},
          ${JSON.stringify(fleetPayload)},
          NOW(),
          NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
          model_name = EXCLUDED.model_name,
          registration_number = EXCLUDED.registration_number,
          category = EXCLUDED.category,
          capacity = EXCLUDED.capacity,
          fuel_type = EXCLUDED.fuel_type,
          is_active = EXCLUDED.is_active,
          data = EXCLUDED.data,
          updated_at = NOW()
      `;
    }

    // Seed drivers if empty
    const driverCountRes = await sql`SELECT count(*)::int as cnt FROM drivers`;
    if (driverCountRes[0]?.cnt === 0 || forceSeed) {
      console.log('[Neon Postgres] Seeding initial drivers...');
      for (const d of INITIAL_DRIVERS) {
        const dName = d.name || 'Professional Chauffeur';
        const dPhone = d.phone || '+91 9811240072';
        const dLicense = d.licenseNumber || 'DL-042026' + Math.floor(100000 + Math.random() * 900000);
        const dIsActive = d.isActive !== false && d.status !== 'inactive';

        const driverPayload: Driver = {
          ...d,
          brandId: DEFAULT_BRAND_ID,
          name: dName,
          phone: dPhone,
          licenseNumber: dLicense,
          isActive: dIsActive,
          status: d.status || (dIsActive ? 'active' : 'inactive')
        };

        await sql`
          INSERT INTO drivers (id, brand_id, name, phone, license_number, is_active, data, created_at, updated_at)
          VALUES (
            ${d.id},
            ${DEFAULT_BRAND_ID},
            ${dName},
            ${dPhone},
            ${dLicense},
            ${dIsActive},
            ${JSON.stringify(driverPayload)},
            NOW(),
            NOW()
          )
          ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            phone = EXCLUDED.phone,
            license_number = EXCLUDED.license_number,
            is_active = EXCLUDED.is_active,
            data = EXCLUDED.data,
            updated_at = NOW()
        `;
      }
    }

    // Seed bookings if empty
    const bookingCountRes = await sql`SELECT count(*)::int as cnt FROM operational_bookings`;
    if (bookingCountRes[0]?.cnt === 0 || forceSeed) {
      console.log('[Neon Postgres] Seeding initial operational bookings...');
      for (const b of INITIAL_OPERATIONAL_BOOKINGS) {
        const bStatus = b.status || 'scheduled';
        const bItineraryId = b.itineraryId || null;

        const bookingPayload: OperationalBooking = {
          ...b,
          brandId: DEFAULT_BRAND_ID,
          status: bStatus,
          itineraryId: bItineraryId || ''
        };

        await sql`
          INSERT INTO operational_bookings (id, brand_id, itinerary_id, status, data, created_at, updated_at)
          VALUES (
            ${b.id},
            ${DEFAULT_BRAND_ID},
            ${bItineraryId},
            ${bStatus},
            ${JSON.stringify(bookingPayload)},
            NOW(),
            NOW()
          )
          ON CONFLICT (id) DO UPDATE SET
            itinerary_id = EXCLUDED.itinerary_id,
            status = EXCLUDED.status,
            data = EXCLUDED.data,
            updated_at = NOW()
        `;
      }
    }

    // Seed initial app_settings if empty
    const settingsCountRes = await sql`SELECT count(*)::int as cnt FROM app_settings WHERE brand_id = ${DEFAULT_BRAND_ID}`;
    if (settingsCountRes[0]?.cnt === 0 || forceSeed) {
      console.log('[Neon Postgres] Seeding initial app settings...');
      await sql`
        INSERT INTO app_settings (brand_id, data, updated_at)
        VALUES (${DEFAULT_BRAND_ID}, ${JSON.stringify(DEFAULT_SETTINGS)}, NOW())
        ON CONFLICT (brand_id) DO UPDATE SET
          data = COALESCE(app_settings.data, EXCLUDED.data),
          updated_at = NOW()
      `;
    }

    // Seed master Super Admin user if empty
    const userCountRes = await sql`SELECT count(*)::int as cnt FROM users WHERE email = 'vlobo99@outlook.com'`;
    if (userCountRes[0]?.cnt === 0 || forceSeed) {
      console.log('[Neon Postgres] Seeding initial master Super Admin account...');
      for (const u of SEED_USERS) {
        await sql`
          INSERT INTO users (id, brand_id, email, password_hash, full_name, role, permissions, is_active, must_change_password, failed_login_attempts, created_at, updated_at)
          VALUES (
            ${u.id},
            ${u.brandId},
            ${u.email},
            ${u.passwordHash},
            ${u.fullName},
            ${u.role},
            ${JSON.stringify(u.permissions)},
            ${u.isActive},
            ${u.mustChangePassword},
            0,
            NOW(),
            NOW()
          )
          ON CONFLICT (email) DO UPDATE SET
            role = EXCLUDED.role,
            full_name = EXCLUDED.full_name,
            permissions = EXCLUDED.permissions
        `;
      }
    }

    // Always guarantee Super Admin vlobo99@outlook.com is present with updated credentials
    const superAdmin = SEED_USERS[0];
    await sql`
      INSERT INTO users (id, brand_id, email, password_hash, full_name, role, permissions, is_active, must_change_password, failed_login_attempts, created_at, updated_at)
      VALUES (
        'user-superadmin-01',
        ${DEFAULT_BRAND_ID},
        ${superAdmin.email},
        ${superAdmin.passwordHash},
        ${superAdmin.fullName},
        'super_admin',
        ${JSON.stringify(superAdmin.permissions)},
        true,
        false,
        0,
        NOW(),
        NOW()
      )
      ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        password_hash = EXCLUDED.password_hash,
        full_name = EXCLUDED.full_name,
        role = 'super_admin',
        permissions = EXCLUDED.permissions,
        is_active = true,
        failed_login_attempts = 0,
        locked_until = NULL,
        updated_at = NOW()
    `;

    // Purge legacy test seed accounts from setup so Super Admin has full exclusive control
    await sql`
      DELETE FROM users 
      WHERE email IN ('superadmin@lobotravels.com', 'admin@lobotravels.com', 'staff@lobotravels.com', 'viewer@lobotravels.com')
        AND email != 'vlobo99@outlook.com'
    `;

    // Cleanup Kempty Falls duplicate if needed
    await sql`DELETE FROM destinations WHERE lower(id) = 'kempty-falls' OR lower(name) = 'kempty falls'`;

    isPostgresInitialized = true;
    console.log('[Neon Postgres] Schema verification, multi-brand tables, and seeds ready.');
  } catch (err) {
    console.error('[Neon Postgres] Initialization error:', err);
    throw err;
  }
}

// ── ATOMIC REFERENCE NUMBER GENERATOR ─────────────────────────────────────────
export async function getNextReferenceNumberAtomic(brandId: string = DEFAULT_BRAND_ID, year: number = 2026): Promise<{ referenceNumber: string; sequenceNumber: number }> {
  const { provider } = getActiveDbProvider();
  const bId = brandId || DEFAULT_BRAND_ID;
  const currentYear = year || new Date().getFullYear();

  // Fetch brand prefix
  const brand = await getDbBrandById(bId);
  const prefix = brand?.referencePrefix || 'LT-2026-';

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        const rows = await sql`
          INSERT INTO reference_counters (brand_id, year, current_sequence)
          VALUES (${bId}, ${currentYear}, 280)
          ON CONFLICT (brand_id, year)
          DO UPDATE SET current_sequence = reference_counters.current_sequence + 1, updated_at = NOW()
          RETURNING current_sequence;
        `;
        const seq = rows[0]?.current_sequence || 280;
        const ref = `${prefix}${String(seq).padStart(4, '0')}`;
        return { referenceNumber: ref, sequenceNumber: seq };
      }
    } catch (err) {
      console.error('[Neon Postgres] getNextReferenceNumberAtomic error, falling back:', err);
    }
  }

  // Local file / memory fallback
  let seqNumber = 280;
  writeLocalStore(data => {
    if (!data.referenceCounters) data.referenceCounters = [];
    let counter = data.referenceCounters.find(c => c.brandId === bId && c.year === currentYear);
    if (!counter) {
      counter = { brandId: bId, year: currentYear, currentSequence: 280 };
      data.referenceCounters.push(counter);
    } else {
      counter.currentSequence += 1;
    }
    seqNumber = counter.currentSequence;
  });

  const ref = `${prefix}${String(seqNumber).padStart(4, '0')}`;
  return { referenceNumber: ref, sequenceNumber: seqNumber };
}

// ── CRUD OPERATIONS: BRANDS ───────────────────────────────────────────────────
export async function getDbBrands(): Promise<Brand[]> {
  const { provider } = getActiveDbProvider();
  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        const rows = await sql`SELECT * FROM brands ORDER BY name ASC`;
        if (rows && rows.length > 0) {
          return rows.map((r: any) => {
            const rawData = typeof r.data === 'string' ? JSON.parse(r.data) : (r.data || {});
            return {
              ...DEFAULT_BRAND,
              ...rawData,
              id: r.id,
              name: r.name,
              slug: r.slug,
              code: r.code,
              logoUrl: r.logo_url || rawData.logoUrl,
              brandColorPrimary: r.brand_color_primary || rawData.brandColorPrimary,
              brandColorSecondary: r.brand_color_secondary || rawData.brandColorSecondary,
              brandColorAccent: r.brand_color_accent || rawData.brandColorAccent,
              brochureColors: typeof r.brochure_colors === 'string' ? JSON.parse(r.brochure_colors) : (r.brochure_colors || rawData.brochureColors),
              contactInfo: typeof r.contact_info === 'string' ? JSON.parse(r.contact_info) : (r.contact_info || rawData.contactInfo),
              referencePrefix: r.reference_prefix || rawData.referencePrefix || 'LT-2026-',
              maxUsers: r.max_users || rawData.maxUsers || 10,
              status: r.status || rawData.status || 'active',
              createdAt: r.created_at ? new Date(r.created_at).toISOString() : rawData.createdAt,
              updatedAt: r.updated_at ? new Date(r.updated_at).toISOString() : rawData.updatedAt
            };
          });
        }
        return [DEFAULT_BRAND];
      }
    } catch (err) {
      console.error('[Neon Postgres] getDbBrands error:', err);
    }
  }

  const local = readLocalStore();
  return (local.brands && local.brands.length > 0) ? local.brands : [DEFAULT_BRAND];
}

export async function getDbBrandById(id: string): Promise<Brand | null> {
  if (!id) return null;
  const brands = await getDbBrands();
  return brands.find(b => b.id === id || b.code.toUpperCase() === id.toUpperCase() || b.slug.toLowerCase() === id.toLowerCase()) || null;
}

export async function getDbBrandByCodeOrSlug(codeOrSlug: string): Promise<Brand | null> {
  return getDbBrandById(codeOrSlug);
}

export async function saveDbBrand(brand: Brand, actorUserId?: string): Promise<Brand> {
  const { provider } = getActiveDbProvider();
  const id = brand.id || ('brand-' + brand.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''));
  const now = new Date().toISOString();
  const sanitized: Brand = {
    ...brand,
    id,
    slug: brand.slug || brand.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    code: (brand.code || brand.name.substring(0, 4)).toUpperCase(),
    createdAt: brand.createdAt || now,
    updatedAt: now
  };

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        await sql`
          INSERT INTO brands (id, name, slug, code, logo_url, brand_color_primary, brand_color_secondary, brand_color_accent, brochure_colors, contact_info, reference_prefix, max_users, status, data, created_at, updated_at)
          VALUES (
            ${sanitized.id},
            ${sanitized.name},
            ${sanitized.slug},
            ${sanitized.code},
            ${sanitized.logoUrl || ''},
            ${sanitized.brandColorPrimary},
            ${sanitized.brandColorSecondary},
            ${sanitized.brandColorAccent},
            ${JSON.stringify(sanitized.brochureColors || {})},
            ${JSON.stringify(sanitized.contactInfo || {})},
            ${sanitized.referencePrefix},
            ${sanitized.maxUsers || 10},
            ${sanitized.status || 'active'},
            ${JSON.stringify(sanitized)},
            ${sanitized.createdAt},
            NOW()
          )
          ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            slug = EXCLUDED.slug,
            code = EXCLUDED.code,
            logo_url = EXCLUDED.logo_url,
            brand_color_primary = EXCLUDED.brand_color_primary,
            brand_color_secondary = EXCLUDED.brand_color_secondary,
            brand_color_accent = EXCLUDED.brand_color_accent,
            brochure_colors = EXCLUDED.brochure_colors,
            contact_info = EXCLUDED.contact_info,
            reference_prefix = EXCLUDED.reference_prefix,
            max_users = EXCLUDED.max_users,
            status = EXCLUDED.status,
            data = EXCLUDED.data,
            updated_at = NOW();
        `;
      }
    } catch (err) {
      console.error('[Neon Postgres] saveDbBrand error:', err);
    }
  }

  writeLocalStore(data => {
    if (!data.brands) data.brands = [DEFAULT_BRAND];
    const idx = data.brands.findIndex(b => b.id === sanitized.id);
    if (idx >= 0) data.brands[idx] = sanitized;
    else data.brands.push(sanitized);
  });

  await logDbActivity({
    brandId: sanitized.id,
    userId: actorUserId,
    action: 'save_brand',
    entityType: 'brand',
    entityId: sanitized.id,
    details: { name: sanitized.name, code: sanitized.code }
  });

  return sanitized;
}

export async function deleteDbBrand(id: string, actorUserId?: string): Promise<boolean> {
  if (id === DEFAULT_BRAND_ID) {
    throw new Error("Default Lobo's Travel Wizard brand cannot be deleted.");
  }
  const { provider } = getActiveDbProvider();
  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        await sql`DELETE FROM brands WHERE id = ${id}`;
      }
    } catch (err) {
      console.error('[Neon Postgres] deleteDbBrand error:', err);
    }
  }

  writeLocalStore(data => {
    if (data.brands) data.brands = data.brands.filter(b => b.id !== id);
  });

  await logDbActivity({
    brandId: id,
    userId: actorUserId,
    action: 'delete_brand',
    entityType: 'brand',
    entityId: id,
    details: { brandId: id }
  });

  return true;
}

/**
 * Preloads the 68 Lobo destinations and attractions into a new white-label brand catalog.
 * Neutralizes Lobo contact details in descriptions and marks records with source='lobo_preloaded'.
 */
export async function preloadBrandDestinations(brandId: string, copyLoboDestinations: boolean = true): Promise<{ destinationsCount: number; attractionsCount: number }> {
  if (!copyLoboDestinations || brandId === DEFAULT_BRAND_ID) {
    return { destinationsCount: 0, attractionsCount: 0 };
  }

  const { provider } = getActiveDbProvider();
  const loboDests = await getDbDestinations(DEFAULT_BRAND_ID);
  const loboAtts = await getDbAttractions(DEFAULT_BRAND_ID);

  let dCount = 0;
  let aCount = 0;

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        for (const d of loboDests) {
          const newId = `${brandId}-${d.id}`;
          // Neutralize contact numbers/mentions if any in description
          const sanitizedDesc = (d.detailedDescription || '').replace(/9811240072|lobo travels/gi, '');
          const newDest: Destination = {
            ...d,
            id: newId,
            brandId,
            source: 'lobo_preloaded',
            originalDestinationId: d.id,
            detailedDescription: sanitizedDesc
          };
          await sql`
            INSERT INTO destinations (id, name, state, country, short_description, detailed_description, recommended_duration, hero_image, gallery, brand_id, source, original_destination_id, data, updated_at)
            VALUES (
              ${newDest.id},
              ${newDest.name},
              ${newDest.state || ''},
              ${newDest.country || 'India'},
              ${newDest.shortDescription || ''},
              ${newDest.detailedDescription || ''},
              ${newDest.recommendedDuration || ''},
              ${newDest.heroImage || ''},
              ${JSON.stringify(newDest.gallery || [])},
              ${brandId},
              'lobo_preloaded',
              ${d.id},
              ${JSON.stringify(newDest)},
              NOW()
            )
            ON CONFLICT (id) DO NOTHING;
          `;
          dCount++;
        }

        for (const a of loboAtts) {
          const newAttId = `${brandId}-${a.id}`;
          const newDestId = `${brandId}-${a.destinationId}`;
          const newAtt: Attraction = {
            ...a,
            id: newAttId,
            destinationId: newDestId,
            brandId,
            source: 'lobo_preloaded',
            originalAttractionId: a.id
          };
          await sql`
            INSERT INTO attractions (id, destination_id, destination_name, name, short_description, detailed_description, duration, category, unesco, image, brand_id, source, original_attraction_id, data, updated_at)
            VALUES (
              ${newAtt.id},
              ${newAtt.destinationId},
              ${newAtt.destinationName || ''},
              ${newAtt.name},
              ${newAtt.shortDescription || ''},
              ${newAtt.detailedDescription || ''},
              ${newAtt.duration || ''},
              ${newAtt.category || ''},
              ${newAtt.unesco || false},
              ${newAtt.image || ''},
              ${brandId},
              'lobo_preloaded',
              ${a.id},
              ${JSON.stringify(newAtt)},
              NOW()
            )
            ON CONFLICT (id) DO NOTHING;
          `;
          aCount++;
        }
      }
    } catch (err) {
      console.error('[Neon Postgres] preloadBrandDestinations error:', err);
    }
  }

  // Also mirror to local store
  writeLocalStore(data => {
    if (!data.destinations) data.destinations = [];
    if (!data.attractions) data.attractions = [];
    for (const d of loboDests) {
      const newId = `${brandId}-${d.id}`;
      if (!data.destinations.some(item => item.id === newId)) {
        data.destinations.push({
          ...d,
          id: newId,
          brandId,
          source: 'lobo_preloaded',
          originalDestinationId: d.id
        });
        dCount++;
      }
    }
    for (const a of loboAtts) {
      const newAttId = `${brandId}-${a.id}`;
      if (!data.attractions.some(item => item.id === newAttId)) {
        data.attractions.push({
          ...a,
          id: newAttId,
          destinationId: `${brandId}-${a.destinationId}`,
          brandId,
          source: 'lobo_preloaded',
          originalAttractionId: a.id
        });
        aCount++;
      }
    }
  });

  return { destinationsCount: dCount, attractionsCount: aCount };
}

// ── CRUD OPERATIONS: USERS ───────────────────────────────────────────────────
export async function getDbUsers(brandId?: string): Promise<User[]> {
  const { provider } = getActiveDbProvider();
  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        let rows;
        if (brandId) {
          rows = await sql`SELECT * FROM users WHERE brand_id = ${brandId} ORDER BY full_name ASC`;
        } else {
          rows = await sql`SELECT * FROM users ORDER BY full_name ASC`;
        }
        if (rows && rows.length > 0) {
          return rows.map((r: any) => ({
            id: r.id,
            brandId: r.brand_id,
            email: r.email,
            passwordHash: r.password_hash,
            fullName: r.full_name || r.name || r.email.split('@')[0],
            role: r.role,
            permissions: typeof r.permissions === 'string' ? JSON.parse(r.permissions) : (r.permissions || {}),
            failedLoginAttempts: r.failed_login_attempts || 0,
            lockedUntil: r.locked_until ? new Date(r.locked_until).toISOString() : undefined,
            mustChangePassword: r.must_change_password || false,
            isActive: r.is_active !== false,
            createdAt: r.created_at ? new Date(r.created_at).toISOString() : new Date().toISOString(),
            updatedAt: r.updated_at ? new Date(r.updated_at).toISOString() : new Date().toISOString()
          }));
        }
        return brandId ? SEED_USERS.filter(u => u.brandId === brandId) : SEED_USERS;
      }
    } catch (err) {
      console.error('[Neon Postgres] getDbUsers error:', err);
    }
  }

  const local = readLocalStore();
  let users = local.users || SEED_USERS;
  if (brandId) {
    users = users.filter(u => u.brandId === brandId);
  }
  return users;
}

export async function getDbUserById(id: string): Promise<User | null> {
  if (!id) return null;
  const users = await getDbUsers();
  return users.find(u => u.id === id) || null;
}

export async function getDbUserByEmail(email: string): Promise<User | null> {
  if (!email) return null;
  const cleanEmail = email.trim().toLowerCase();
  const users = await getDbUsers();
  return users.find(u => u.email.toLowerCase() === cleanEmail) || null;
}

export async function saveDbUser(user: Partial<User> & { id?: string; email: string; brandId: string }, actorUserId?: string): Promise<User> {
  const { provider } = getActiveDbProvider();
  const id = user.id || ('usr-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6));
  const now = new Date().toISOString();

  const sanitized: User = {
    id,
    brandId: user.brandId || DEFAULT_BRAND_ID,
    email: user.email.trim().toLowerCase(),
    passwordHash: user.passwordHash || '',
    fullName: user.fullName || user.email.split('@')[0],
    role: user.role || 'operator',
    permissions: user.permissions || DEFAULT_PERMISSIONS,
    failedLoginAttempts: user.failedLoginAttempts || 0,
    lockedUntil: user.lockedUntil,
    mustChangePassword: user.mustChangePassword || false,
    isActive: user.isActive !== false,
    createdAt: user.createdAt || now,
    updatedAt: now
  };

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        await sql`
          INSERT INTO users (id, brand_id, email, password_hash, full_name, role, permissions, failed_login_attempts, locked_until, must_change_password, is_active, created_at, updated_at)
          VALUES (
            ${sanitized.id},
            ${sanitized.brandId},
            ${sanitized.email},
            ${sanitized.passwordHash},
            ${sanitized.fullName},
            ${sanitized.role},
            ${JSON.stringify(sanitized.permissions)},
            ${sanitized.failedLoginAttempts},
            ${sanitized.lockedUntil ? new Date(sanitized.lockedUntil) : null},
            ${sanitized.mustChangePassword},
            ${sanitized.isActive},
            ${sanitized.createdAt},
            NOW()
          )
          ON CONFLICT (id) DO UPDATE SET
            brand_id = EXCLUDED.brand_id,
            email = EXCLUDED.email,
            password_hash = CASE WHEN EXCLUDED.password_hash != '' THEN EXCLUDED.password_hash ELSE users.password_hash END,
            full_name = EXCLUDED.full_name,
            role = EXCLUDED.role,
            permissions = EXCLUDED.permissions,
            failed_login_attempts = EXCLUDED.failed_login_attempts,
            locked_until = EXCLUDED.locked_until,
            must_change_password = EXCLUDED.must_change_password,
            is_active = EXCLUDED.is_active,
            updated_at = NOW();
        `;
      }
    } catch (err) {
      console.error('[Neon Postgres] saveDbUser error:', err);
    }
  }

  writeLocalStore(data => {
    if (!data.users) data.users = [...SEED_USERS];
    const idx = data.users.findIndex(u => u.id === sanitized.id || u.email.toLowerCase() === sanitized.email.toLowerCase());
    if (idx >= 0) {
      if (!sanitized.passwordHash && data.users[idx].passwordHash) {
        sanitized.passwordHash = data.users[idx].passwordHash;
      }
      data.users[idx] = sanitized;
    } else {
      data.users.push(sanitized);
    }
  });

  await logDbActivity({
    brandId: sanitized.brandId,
    userId: actorUserId,
    action: 'save_user',
    entityType: 'user',
    entityId: sanitized.id,
    details: { email: sanitized.email, role: sanitized.role }
  });

  return sanitized;
}

export async function deleteDbUser(id: string, actorUserId?: string): Promise<boolean> {
  const { provider } = getActiveDbProvider();
  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        await sql`DELETE FROM users WHERE id = ${id}`;
      }
    } catch (err) {
      console.error('[Neon Postgres] deleteDbUser error:', err);
    }
  }

  writeLocalStore(data => {
    if (data.users) data.users = data.users.filter(u => u.id !== id);
  });

  await logDbActivity({
    brandId: DEFAULT_BRAND_ID,
    userId: actorUserId,
    action: 'delete_user',
    entityType: 'user',
    entityId: id,
    details: { userId: id }
  });

  return true;
}

export async function recordDbFailedLogin(userId: string): Promise<{ locked: boolean; lockedUntil?: string }> {
  const user = await getDbUserById(userId);
  if (!user) return { locked: false };

  const attempts = (user.failedLoginAttempts || 0) + 1;
  let lockedUntil: string | undefined = undefined;

  // Lock account for 15 minutes after 5 failed attempts
  if (attempts >= 5) {
    lockedUntil = new Date(Date.now() + 15 * 60 * 1000).toISOString();
  }

  await saveDbUser({
    ...user,
    failedLoginAttempts: attempts,
    lockedUntil
  });

  return { locked: !!lockedUntil, lockedUntil };
}

export async function resetDbFailedLogin(userId: string): Promise<void> {
  const user = await getDbUserById(userId);
  if (!user) return;
  await saveDbUser({
    ...user,
    failedLoginAttempts: 0,
    lockedUntil: undefined
  });
}

// ── CRUD OPERATIONS: SESSIONS ────────────────────────────────────────────────
export async function saveDbSession(token: string, userId: string, brandId: string, expiresAt: Date): Promise<void> {
  const { provider } = getActiveDbProvider();
  const sessionRecord: StoredSession = {
    id: token,
    userId,
    brandId,
    expiresAt: expiresAt.toISOString(),
    createdAt: new Date().toISOString()
  };

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        await sql`
          INSERT INTO sessions (id, user_id, brand_id, expires_at, created_at)
          VALUES (${sessionRecord.id}, ${sessionRecord.userId}, ${sessionRecord.brandId}, ${expiresAt}, NOW())
          ON CONFLICT (id) DO UPDATE SET
            expires_at = EXCLUDED.expires_at;
        `;
      }
    } catch (err) {
      console.error('[Neon Postgres] saveDbSession error:', err);
    }
  }

  writeLocalStore(data => {
    if (!data.sessions) data.sessions = [];
    const idx = data.sessions.findIndex(s => s.id === token);
    if (idx >= 0) data.sessions[idx] = sessionRecord;
    else data.sessions.push(sessionRecord);
  });
}

export async function getDbSession(token: string): Promise<StoredSession | null> {
  if (!token) return null;
  const { provider } = getActiveDbProvider();

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        const rows = await sql`
          SELECT id, user_id, brand_id, expires_at, created_at 
          FROM sessions 
          WHERE id = ${token} 
          LIMIT 1
        `;
        if (rows.length > 0) {
          const r = rows[0];
          return {
            id: r.id,
            userId: r.user_id,
            brandId: r.brand_id,
            expiresAt: new Date(r.expires_at).toISOString(),
            createdAt: new Date(r.created_at).toISOString()
          };
        }
      }
    } catch (err) {
      console.error('[Neon Postgres] getDbSession error:', err);
    }
  }

  const local = readLocalStore();
  return local.sessions?.find(s => s.id === token) || null;
}

export async function deleteDbSession(token: string): Promise<void> {
  if (!token) return;
  const { provider } = getActiveDbProvider();

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        await sql`DELETE FROM sessions WHERE id = ${token}`;
      }
    } catch (err) {
      console.error('[Neon Postgres] deleteDbSession error:', err);
    }
  }

  writeLocalStore(data => {
    if (data.sessions) data.sessions = data.sessions.filter(s => s.id !== token);
  });
}

// ── CRUD OPERATIONS: ACTIVITY LOGS ───────────────────────────────────────────
export async function logDbActivity(entry: Omit<ActivityLog, 'id' | 'createdAt'>): Promise<void> {
  const id = 'act-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
  const now = new Date().toISOString();
  const log: ActivityLog = {
    ...entry,
    id,
    createdAt: now
  };

  const { provider } = getActiveDbProvider();
  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        await sql`
          INSERT INTO activity_logs (id, brand_id, user_id, user_email, action, entity_type, entity_id, details, created_at)
          VALUES (
            ${log.id},
            ${log.brandId || DEFAULT_BRAND_ID},
            ${log.userId || null},
            ${log.userEmail || null},
            ${log.action},
            ${log.entityType},
            ${log.entityId || null},
            ${JSON.stringify(log.details || {})},
            NOW()
          );
        `;
      }
    } catch (err) {
      console.error('[Neon Postgres] logDbActivity error:', err);
    }
  }

  writeLocalStore(data => {
    if (!data.activityLogs) data.activityLogs = [];
    data.activityLogs.unshift(log);
    if (data.activityLogs.length > 500) data.activityLogs = data.activityLogs.slice(0, 500);
  });
}

export async function getDbActivityLogs(brandId?: string, limit: number = 100): Promise<ActivityLog[]> {
  const { provider } = getActiveDbProvider();
  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        let rows;
        if (brandId) {
          rows = await sql`SELECT * FROM activity_logs WHERE brand_id = ${brandId} ORDER BY created_at DESC LIMIT ${limit}`;
        } else {
          rows = await sql`SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT ${limit}`;
        }
        return rows.map((r: any) => ({
          id: r.id,
          brandId: r.brand_id,
          userId: r.user_id,
          userEmail: r.user_email,
          action: r.action,
          entityType: r.entity_type,
          entityId: r.entity_id,
          details: typeof r.details === 'string' ? JSON.parse(r.details) : (r.details || {}),
          createdAt: new Date(r.created_at).toISOString()
        }));
      }
    } catch (err) {
      console.error('[Neon Postgres] getDbActivityLogs error:', err);
    }
  }

  const local = readLocalStore();
  let logs = local.activityLogs || [];
  if (brandId) logs = logs.filter(l => l.brandId === brandId);
  return logs.slice(0, limit);
}

// ── CRUD OPERATIONS: DESTINATIONS ─────────────────────────────────────────────
export async function getDbDestinations(brandId?: string): Promise<Destination[]> {
  const { provider } = getActiveDbProvider();

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        let rows;
        if (brandId && brandId !== DEFAULT_BRAND_ID) {
          rows = await sql`
            SELECT data, is_deleted FROM destinations 
            WHERE (brand_id = ${brandId} OR source = 'lobo_preloaded')
              AND is_deleted = false
            ORDER BY name ASC
          `;
        } else {
          rows = await sql`
            SELECT data, is_deleted FROM destinations 
            WHERE (brand_id = ${DEFAULT_BRAND_ID} OR source = 'lobo_preloaded')
              AND is_deleted = false
            ORDER BY name ASC
          `;
        }
        if (rows) {
          const parsed = rows
            .map((r: any) => {
              try {
                return typeof r.data === 'string' ? JSON.parse(r.data) : r.data;
              } catch (_) {
                return null;
              }
            })
            .filter((item: any) => item && typeof item === 'object' && (item.id || item.name));
          return parsed;
        }
      }
    } catch (err) {
      console.error('[Neon Postgres] getDbDestinations error:', err);
    }
  }

  const local = readLocalStore();
  let dests = local.destinations || INITIAL_DESTINATIONS;
  if (brandId && brandId !== DEFAULT_BRAND_ID) {
    dests = dests.filter(d => !d.brandId || d.brandId === brandId || d.source === 'lobo_preloaded');
  }
  return dests;
}

export async function getDbDestinationById(id: string): Promise<Destination | null> {
  const dests = await getDbDestinations();
  return dests.find(d => d.id.toLowerCase() === id.toLowerCase()) || null;
}

export async function saveDbDestination(destination: Destination, actorUserId?: string): Promise<Destination> {
  const { provider } = getActiveDbProvider();
  const destId = destination.id.toLowerCase().trim();
  const brandId = destination.brandId || DEFAULT_BRAND_ID;

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        await sql`
          INSERT INTO destinations (id, name, state, country, short_description, detailed_description, recommended_duration, hero_image, gallery, brand_id, source, data, updated_at)
          VALUES (
            ${destId},
            ${destination.name},
            ${destination.state || ''},
            ${destination.country || 'India'},
            ${destination.shortDescription || ''},
            ${destination.detailedDescription || ''},
            ${destination.recommendedDuration || ''},
            ${destination.heroImage || ''},
            ${JSON.stringify(destination.gallery || [])},
            ${brandId},
            ${destination.source || 'custom'},
            ${JSON.stringify(destination)},
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
            brand_id = EXCLUDED.brand_id,
            data = EXCLUDED.data,
            updated_at = NOW();
        `;
      }
    } catch (err) {
      console.error('[Neon Postgres] saveDbDestination error:', err);
    }
  }

  writeLocalStore(data => {
    const idx = data.destinations.findIndex(d => d.id.toLowerCase() === destId);
    if (idx >= 0) data.destinations[idx] = destination;
    else data.destinations.unshift(destination);
  });

  await logDbActivity({
    brandId,
    userId: actorUserId,
    action: 'save_destination',
    entityType: 'destination',
    entityId: destId,
    details: { name: destination.name }
  });

  return destination;
}

export async function deleteDbDestination(id: string, actorUserId?: string): Promise<boolean> {
  const destId = id.toLowerCase().trim();
  const { provider } = getActiveDbProvider();

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        await sql`DELETE FROM destinations WHERE lower(id) = ${destId}`;
        await sql`DELETE FROM attractions WHERE lower(destination_id) = ${destId}`;
      }
    } catch (err) {
      console.error('[Neon Postgres] deleteDbDestination error:', err);
    }
  }

  writeLocalStore(data => {
    data.destinations = data.destinations.filter(d => d.id.toLowerCase() !== destId);
    data.attractions = data.attractions.filter(a => a.destinationId?.toLowerCase() !== destId);
  });

  await logDbActivity({
    brandId: DEFAULT_BRAND_ID,
    userId: actorUserId,
    action: 'delete_destination',
    entityType: 'destination',
    entityId: destId,
    details: { destinationId: destId }
  });

  return true;
}

// ── CRUD OPERATIONS: ATTRACTIONS ──────────────────────────────────────────────
export async function getDbAttractions(brandId?: string): Promise<Attraction[]> {
  const { provider } = getActiveDbProvider();

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        let rows;
        if (brandId && brandId !== DEFAULT_BRAND_ID) {
          rows = await sql`
            SELECT data FROM attractions 
            WHERE (brand_id = ${brandId} OR source = 'lobo_preloaded')
              AND is_deleted = false
            ORDER BY name ASC
          `;
        } else {
          rows = await sql`
            SELECT data FROM attractions 
            WHERE (brand_id = ${DEFAULT_BRAND_ID} OR source = 'lobo_preloaded')
              AND is_deleted = false
            ORDER BY name ASC
          `;
        }
        if (rows) {
          const parsed = rows
            .map((r: any) => {
              try {
                return typeof r.data === 'string' ? JSON.parse(r.data) : r.data;
              } catch (_) {
                return null;
              }
            })
            .filter((item: any) => item && typeof item === 'object' && (item.id || item.name));
          return parsed;
        }
      }
    } catch (err) {
      console.error('[Neon Postgres] getDbAttractions error:', err);
    }
  }

  const local = readLocalStore();
  let atts = local.attractions || getSeededAttractions();
  if (brandId && brandId !== DEFAULT_BRAND_ID) {
    atts = atts.filter(a => !a.brandId || a.brandId === brandId || a.source === 'lobo_preloaded');
  }
  return atts;
}

export async function getDbAttractionById(id: string): Promise<Attraction | null> {
  const atts = await getDbAttractions();
  return atts.find(a => a.id.toLowerCase() === id.toLowerCase()) || null;
}

export async function saveDbAttraction(attraction: Attraction, actorUserId?: string): Promise<Attraction> {
  const { provider } = getActiveDbProvider();
  const attId = attraction.id.toLowerCase().trim();
  const brandId = attraction.brandId || DEFAULT_BRAND_ID;

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        await sql`
          INSERT INTO attractions (id, destination_id, destination_name, name, short_description, detailed_description, duration, category, unesco, image, brand_id, source, data, updated_at)
          VALUES (
            ${attId},
            ${attraction.destinationId},
            ${attraction.destinationName || ''},
            ${attraction.name},
            ${attraction.shortDescription || ''},
            ${attraction.detailedDescription || ''},
            ${attraction.duration || ''},
            ${attraction.category || ''},
            ${attraction.unesco || false},
            ${attraction.image || ''},
            ${brandId},
            ${attraction.source || 'custom'},
            ${JSON.stringify(attraction)},
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
            brand_id = EXCLUDED.brand_id,
            data = EXCLUDED.data,
            updated_at = NOW();
        `;
      }
    } catch (err) {
      console.error('[Neon Postgres] saveDbAttraction error:', err);
    }
  }

  writeLocalStore(data => {
    const idx = data.attractions.findIndex(a => a.id.toLowerCase() === attId);
    if (idx >= 0) data.attractions[idx] = attraction;
    else data.attractions.unshift(attraction);
  });

  return attraction;
}

export async function deleteDbAttraction(id: string, actorUserId?: string): Promise<boolean> {
  const attId = id.toLowerCase().trim();
  const { provider } = getActiveDbProvider();

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        await sql`DELETE FROM attractions WHERE lower(id) = ${attId}`;
      }
    } catch (err) {
      console.error('[Neon Postgres] deleteDbAttraction error:', err);
    }
  }

  writeLocalStore(data => {
    data.attractions = data.attractions.filter(a => a.id.toLowerCase() !== attId);
  });

  return true;
}

// ── CRUD OPERATIONS: HOTELS ───────────────────────────────────────────────────
export async function getDbHotels(brandId?: string): Promise<Hotel[]> {
  const { provider } = getActiveDbProvider();

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        let rows;
        if (brandId && brandId !== DEFAULT_BRAND_ID) {
          rows = await sql`SELECT data FROM hotels WHERE brand_id = ${brandId} AND is_deleted = false ORDER BY name ASC`;
        } else {
          rows = await sql`SELECT data FROM hotels WHERE is_deleted = false ORDER BY name ASC`;
        }
        if (rows) {
          const parsed = rows
            .map((r: any) => {
              try {
                return typeof r.data === 'string' ? JSON.parse(r.data) : r.data;
              } catch (_) {
                return null;
              }
            })
            .filter((item: any) => item && typeof item === 'object' && (item.id || item.name));
          return parsed;
        }
      }
    } catch (err) {
      console.error('[Neon Postgres] getDbHotels error:', err);
    }
  }

  const local = readLocalStore();
  let hotels = local.hotels || INITIAL_HOTELS;
  if (brandId && brandId !== DEFAULT_BRAND_ID) {
    hotels = hotels.filter(h => !h.brandId || h.brandId === brandId);
  }
  return hotels;
}

export async function getDbHotelById(id: string): Promise<Hotel | null> {
  const hotels = await getDbHotels();
  return hotels.find(h => h.id.toLowerCase() === id.toLowerCase()) || null;
}

export async function saveDbHotel(hotel: Hotel, actorUserId?: string): Promise<Hotel> {
  const { provider } = getActiveDbProvider();
  const brandId = hotel.brandId || DEFAULT_BRAND_ID;

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        await sql`
          INSERT INTO hotels (id, name, city, state, address, star_category, rating, review_count, phone, email, website, description, room_categories, meal_plans, check_in_time, check_out_time, image, gallery, partnership_status, contracted_rate, brand_id, data, updated_at)
          VALUES (
            ${hotel.id},
            ${hotel.name},
            ${hotel.city},
            ${hotel.state || ''},
            ${hotel.address || ''},
            ${hotel.starCategory || 4},
            ${hotel.rating || 4.5},
            ${hotel.reviewCount || 100},
            ${hotel.phone || ''},
            ${hotel.email || ''},
            ${hotel.website || ''},
            ${hotel.description || ''},
            ${JSON.stringify(hotel.roomCategories || [])},
            ${JSON.stringify(hotel.mealPlans || [])},
            ${hotel.checkInTime || '14:00'},
            ${hotel.checkOutTime || '12:00'},
            ${hotel.image || ''},
            ${JSON.stringify(hotel.gallery || [])},
            ${hotel.partnershipStatus || 'Regular'},
            ${hotel.contractedRate || ''},
            ${brandId},
            ${JSON.stringify(hotel)},
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
            brand_id = EXCLUDED.brand_id,
            data = EXCLUDED.data,
            updated_at = NOW();
        `;
      }
    } catch (err) {
      console.error('[Neon Postgres] saveDbHotel error:', err);
    }
  }

  writeLocalStore(data => {
    const idx = data.hotels.findIndex(h => h.id.toLowerCase() === hotel.id.toLowerCase());
    if (idx >= 0) data.hotels[idx] = hotel;
    else data.hotels.unshift(hotel);
  });

  return hotel;
}

export async function deleteDbHotel(id: string, actorUserId?: string): Promise<boolean> {
  const { provider } = getActiveDbProvider();
  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        await sql`DELETE FROM hotels WHERE lower(id) = ${id.toLowerCase().trim()}`;
      }
    } catch (err) {
      console.error('[Neon Postgres] deleteDbHotel error:', err);
    }
  }

  writeLocalStore(data => {
    data.hotels = data.hotels.filter(h => h.id.toLowerCase() !== id.toLowerCase().trim());
  });

  return true;
}

// ── CRUD OPERATIONS: APP SETTINGS ─────────────────────────────────────────────
export async function getDbSettings(brandId?: string): Promise<AppSettings> {
  const { provider } = getActiveDbProvider();
  const bId = brandId || DEFAULT_BRAND_ID;

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        const rows = await sql`SELECT data FROM app_settings WHERE brand_id = ${bId} LIMIT 1`;
        if (rows && rows.length > 0) {
          const raw = typeof rows[0].data === 'string' ? JSON.parse(rows[0].data) : rows[0].data;
          return { ...DEFAULT_SETTINGS, ...raw };
        } else {
          await sql`
            INSERT INTO app_settings (brand_id, data, updated_at)
            VALUES (${bId}, ${JSON.stringify(DEFAULT_SETTINGS)}, NOW())
            ON CONFLICT (brand_id) DO NOTHING;
          `.catch(() => {});
          return DEFAULT_SETTINGS;
        }
      }
    } catch (err) {
      console.error('[Neon Postgres] getDbSettings error:', err);
    }
  }

  const local = readLocalStore();
  return { ...DEFAULT_SETTINGS, ...local.settings };
}

export async function saveDbSettings(settings: Partial<AppSettings>, brandId?: string): Promise<AppSettings> {
  const { provider } = getActiveDbProvider();
  const bId = brandId || DEFAULT_BRAND_ID;
  const current = await getDbSettings(bId);
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
          INSERT INTO app_settings (id, brand_id, company_name, tagline, email, data, updated_at)
          VALUES (
            ${bId},
            ${bId},
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
  }

  writeLocalStore(data => {
    data.settings = merged;
  });

  return merged;
}

// ── CRUD OPERATIONS: ITINERARIES (CENTRAL ORDERING, VERSIONING & SOFT-DELETE) ──
export async function getDbItineraries(brandId?: string, includeDeleted: boolean = false): Promise<Itinerary[]> {
  const { provider } = getActiveDbProvider();

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        let rows;
        if (brandId) {
          if (includeDeleted) {
            rows = await sql`SELECT data FROM itineraries WHERE brand_id = ${brandId} ORDER BY sequence_number DESC, updated_at DESC`;
          } else {
            rows = await sql`SELECT data FROM itineraries WHERE brand_id = ${brandId} AND is_deleted = false ORDER BY sequence_number DESC, updated_at DESC`;
          }
        } else {
          if (includeDeleted) {
            rows = await sql`SELECT data FROM itineraries ORDER BY sequence_number DESC, updated_at DESC`;
          } else {
            rows = await sql`SELECT data FROM itineraries WHERE is_deleted = false ORDER BY sequence_number DESC, updated_at DESC`;
          }
        }
        if (rows) {
          const parsed = rows
            .map((r: any) => {
              try {
                return typeof r.data === 'string' ? JSON.parse(r.data) : r.data;
              } catch (_) {
                return null;
              }
            })
            .filter((item: any) => item && typeof item === 'object' && (item.id || item.referenceNumber || item.tourName || item.name));
          return parsed;
        }
      }
    } catch (err) {
      console.error('[Neon Postgres] getDbItineraries error:', err);
    }
  }

  // Fallback: Local JSON Store
  const local = readLocalStore();
  let list = local.itineraries || INITIAL_ITINERARIES;
  if (brandId) {
    list = list.filter(i => !i.brandId || i.brandId === brandId);
  }
  if (!includeDeleted) {
    list = list.filter(i => !i.isDeleted);
  }
  return list.sort((a, b) => (b.sequenceNumber || 0) - (a.sequenceNumber || 0));
}

export async function getDbItineraryById(idOrRef: string): Promise<Itinerary | null> {
  if (!idOrRef) return null;
  const cleanId = idOrRef.trim();
  const lower = cleanId.toLowerCase();
  const refFromVoucher = lower.startsWith('ltv-') ? lower.replace(/^ltv-/i, 'lt-') : lower;

  const { provider } = getActiveDbProvider();

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        const rows = await sql`
          SELECT data FROM itineraries 
          WHERE lower(id) = ${lower} 
             OR lower(reference_number) = ${lower} 
             OR lower(reference_number) = ${refFromVoucher}
          LIMIT 1
        `;
        if (rows.length > 0) {
          const r = rows[0];
          return typeof r.data === 'string' ? JSON.parse(r.data) : r.data;
        }
      }
    } catch (err) {
      console.error('[Neon Postgres] getDbItineraryById error:', err);
    }
  }

  const all = await getDbItineraries(undefined, true);
  return all.find(itn => 
    itn.id?.toLowerCase() === lower ||
    itn.referenceNumber?.toLowerCase() === lower ||
    itn.referenceNumber?.toLowerCase() === refFromVoucher ||
    itn.id?.toLowerCase() === refFromVoucher
  ) || null;
}

export interface SaveItineraryResult {
  success: boolean;
  itinerary?: Itinerary;
  conflict?: boolean;
  currentItinerary?: Itinerary;
  error?: string;
}

export async function saveDbItinerary(
  itinerary: Itinerary, 
  options?: { expectedVersion?: number; userId?: string; userEmail?: string; brandId?: string }
): Promise<SaveItineraryResult> {
  const { provider } = getActiveDbProvider();
  const brandId = options?.brandId || itinerary.brandId || DEFAULT_BRAND_ID;

  // 1. Check existing record for version conflict and protection
  const existing = await getDbItineraryById(itinerary.id || itinerary.referenceNumber);
  if (existing) {
    // Conflict detection: if caller specified expectedVersion and database is ahead
    if (options?.expectedVersion !== undefined && (existing.version || 1) > options.expectedVersion) {
      return {
        success: false,
        conflict: true,
        currentItinerary: existing,
        error: `Edit conflict detected. This itinerary was updated by ${existing.updatedBy || 'another user'} to version ${existing.version}.`
      };
    }
  }

  // 2. Compute sequence number and reference number
  let sequenceNumber = itinerary.sequenceNumber || existing?.sequenceNumber;
  let referenceNumber = itinerary.referenceNumber || existing?.referenceNumber;

  if (!referenceNumber || !sequenceNumber) {
    const atomic = await getNextReferenceNumberAtomic(brandId);
    referenceNumber = referenceNumber || atomic.referenceNumber;
    sequenceNumber = sequenceNumber || atomic.sequenceNumber;
  }

  // Extract sequence number if not set
  if (!sequenceNumber && referenceNumber) {
    const match = referenceNumber.match(/(\d+)$/);
    if (match) sequenceNumber = parseInt(match[1], 10);
  }

  const now = new Date().toISOString();
  const nextVersion = (existing?.version || 0) + 1;
  const isProtected = existing?.isProtected !== undefined ? existing.isProtected : (itinerary.isProtected || false);
  const itnId = itinerary.id || ('itn-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6));

  const sanitized: Itinerary = {
    ...itinerary,
    id: itnId,
    brandId,
    referenceNumber,
    sequenceNumber: sequenceNumber || 1,
    version: nextVersion,
    isProtected,
    isDeleted: false,
    deletedAt: undefined,
    createdBy: itinerary.createdBy || existing?.createdBy || options?.userEmail || 'system',
    updatedBy: options?.userEmail || options?.userId || 'system',
    createdAt: itinerary.createdAt || existing?.createdAt || now,
    updatedAt: now
  };

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        await sql`
          INSERT INTO itineraries (
            id, brand_id, reference_number, tour_name, client_name, 
            start_date, end_date, total_cost, sequence_number, version, 
            is_protected, is_deleted, deleted_at, created_by, updated_by, 
            data, created_at, updated_at
          )
          VALUES (
            ${sanitized.id},
            ${sanitized.brandId},
            ${sanitized.referenceNumber},
            ${sanitized.tourName || 'Custom Tour'},
            ${sanitized.clientName || ''},
            ${sanitized.startDate || ''},
            ${sanitized.endDate || ''},
            ${sanitized.totalCost || 0},
            ${sanitized.sequenceNumber},
            ${sanitized.version},
            ${sanitized.isProtected},
            false,
            null,
            ${sanitized.createdBy || null},
            ${sanitized.updatedBy || null},
            ${JSON.stringify(sanitized)},
            ${sanitized.createdAt},
            NOW()
          )
          ON CONFLICT (id) DO UPDATE SET
            brand_id = EXCLUDED.brand_id,
            reference_number = EXCLUDED.reference_number,
            tour_name = EXCLUDED.tour_name,
            client_name = EXCLUDED.client_name,
            start_date = EXCLUDED.start_date,
            end_date = EXCLUDED.end_date,
            total_cost = EXCLUDED.total_cost,
            sequence_number = EXCLUDED.sequence_number,
            version = EXCLUDED.version,
            is_protected = EXCLUDED.is_protected,
            is_deleted = false,
            deleted_at = null,
            updated_by = EXCLUDED.updated_by,
            data = EXCLUDED.data,
            updated_at = NOW();
        `;
      }
    } catch (err: any) {
      console.error('[Neon Postgres] saveDbItinerary error:', err);
      return { success: false, error: err?.message || 'Database error while saving itinerary' };
    }
  }

  // Local fallback
  writeLocalStore(data => {
    if (!data.itineraries) data.itineraries = [];
    const idx = data.itineraries.findIndex(i => i.id === sanitized.id || i.referenceNumber === sanitized.referenceNumber);
    if (idx >= 0) data.itineraries[idx] = sanitized;
    else data.itineraries.unshift(sanitized);
  });

  // Log activity
  await logDbActivity({
    brandId,
    userId: options?.userId,
    userEmail: options?.userEmail,
    action: existing ? 'update_itinerary' : 'create_itinerary',
    entityType: 'itinerary',
    entityId: sanitized.id,
    details: { referenceNumber: sanitized.referenceNumber, version: sanitized.version }
  });

  return { success: true, itinerary: sanitized };
}

export async function deleteDbItinerary(
  idOrRef: string, 
  options?: { hardDelete?: boolean; isSuperAdmin?: boolean; userId?: string; userEmail?: string }
): Promise<{ success: boolean; isProtected?: boolean; error?: string }> {
  const existing = await getDbItineraryById(idOrRef);
  if (!existing) {
    return { success: false, error: 'Itinerary not found' };
  }

  // Protected check: Critical itineraries and flagged ones cannot be deleted unless Super Admin
  if (existing.isProtected && !options?.isSuperAdmin) {
    return {
      success: false,
      isProtected: true,
      error: `Itinerary ${existing.referenceNumber} is protected against deletion. Only a Super Admin can unprotect and remove it.`
    };
  }

  const { provider } = getActiveDbProvider();
  const clean = existing.id.toLowerCase();
  const now = new Date().toISOString();

  if (options?.hardDelete && options?.isSuperAdmin) {
    // Hard delete
    if (provider === 'postgres') {
      try {
        await ensurePostgresTables();
        const sql = await getPostgresClient();
        if (sql) {
          await sql`DELETE FROM itineraries WHERE lower(id) = ${clean}`;
        }
      } catch (err) {
        console.error('[Neon Postgres] hard deleteDbItinerary error:', err);
      }
    }

    writeLocalStore(data => {
      if (data.itineraries) {
        data.itineraries = data.itineraries.filter(i => i.id.toLowerCase() !== clean);
      }
    });

    await logDbActivity({
      brandId: existing.brandId || DEFAULT_BRAND_ID,
      userId: options?.userId,
      userEmail: options?.userEmail,
      action: 'hard_delete_itinerary',
      entityType: 'itinerary',
      entityId: existing.id,
      details: { referenceNumber: existing.referenceNumber }
    });

    return { success: true };
  }

  // Default: Soft Delete (Recycle Bin)
  const softDeleted: Itinerary = {
    ...existing,
    isDeleted: true,
    deletedAt: now,
    updatedBy: options?.userEmail || options?.userId || 'system',
    updatedAt: now
  };

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        await sql`
          UPDATE itineraries 
          SET is_deleted = true, 
              deleted_at = NOW(), 
              updated_by = ${options?.userEmail || null},
              data = ${JSON.stringify(softDeleted)},
              updated_at = NOW()
          WHERE lower(id) = ${clean};
        `;
      }
    } catch (err) {
      console.error('[Neon Postgres] soft deleteDbItinerary error:', err);
    }
  }

  writeLocalStore(data => {
    if (data.itineraries) {
      const idx = data.itineraries.findIndex(i => i.id.toLowerCase() === clean);
      if (idx >= 0) data.itineraries[idx] = softDeleted;
    }
  });

  await logDbActivity({
    brandId: existing.brandId || DEFAULT_BRAND_ID,
    userId: options?.userId,
    userEmail: options?.userEmail,
    action: 'soft_delete_itinerary',
    entityType: 'itinerary',
    entityId: existing.id,
    details: { referenceNumber: existing.referenceNumber }
  });

  return { success: true };
}

export async function restoreDbItinerary(idOrRef: string, actorUserId?: string, userEmail?: string): Promise<{ success: boolean; itinerary?: Itinerary; error?: string }> {
  const existing = await getDbItineraryById(idOrRef);
  if (!existing) return { success: false, error: 'Itinerary not found' };

  const now = new Date().toISOString();
  const restored: Itinerary = {
    ...existing,
    isDeleted: false,
    deletedAt: undefined,
    updatedBy: userEmail || actorUserId || 'system',
    updatedAt: now
  };

  const { provider } = getActiveDbProvider();
  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        await sql`
          UPDATE itineraries 
          SET is_deleted = false, 
              deleted_at = null, 
              updated_by = ${userEmail || null},
              data = ${JSON.stringify(restored)},
              updated_at = NOW()
          WHERE lower(id) = ${existing.id.toLowerCase()};
        `;
      }
    } catch (err) {
      console.error('[Neon Postgres] restoreDbItinerary error:', err);
    }
  }

  writeLocalStore(data => {
    if (data.itineraries) {
      const idx = data.itineraries.findIndex(i => i.id === existing.id);
      if (idx >= 0) data.itineraries[idx] = restored;
    }
  });

  await logDbActivity({
    brandId: existing.brandId || DEFAULT_BRAND_ID,
    userId: actorUserId,
    userEmail,
    action: 'restore_itinerary',
    entityType: 'itinerary',
    entityId: existing.id,
    details: { referenceNumber: existing.referenceNumber }
  });

  return { success: true, itinerary: restored };
}

export async function toggleProtectDbItinerary(
  idOrRef: string, 
  isProtected: boolean, 
  isSuperAdmin: boolean, 
  actorUserId?: string,
  userEmail?: string
): Promise<{ success: boolean; error?: string }> {
  if (!isSuperAdmin) {
    return { success: false, error: 'Only a Super Admin can change protection flags on itineraries.' };
  }

  const existing = await getDbItineraryById(idOrRef);
  if (!existing) return { success: false, error: 'Itinerary not found' };

  const updated = { ...existing, isProtected, updatedAt: new Date().toISOString() };
  const { provider } = getActiveDbProvider();

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        await sql`
          UPDATE itineraries 
          SET is_protected = ${isProtected}, 
              data = ${JSON.stringify(updated)},
              updated_at = NOW()
          WHERE lower(id) = ${existing.id.toLowerCase()};
        `;
      }
    } catch (err) {
      console.error('[Neon Postgres] toggleProtectDbItinerary error:', err);
    }
  }

  writeLocalStore(data => {
    if (data.itineraries) {
      const idx = data.itineraries.findIndex(i => i.id === existing.id);
      if (idx >= 0) data.itineraries[idx] = updated;
    }
  });

  await logDbActivity({
    brandId: existing.brandId || DEFAULT_BRAND_ID,
    userId: actorUserId,
    userEmail,
    action: isProtected ? 'protect_itinerary' : 'unprotect_itinerary',
    entityType: 'itinerary',
    entityId: existing.id,
    details: { referenceNumber: existing.referenceNumber, isProtected }
  });

  return { success: true };
}

// ── CRUD OPERATIONS: FLEET ────────────────────────────────────────────────────
export async function getDbFleet(brandId?: string): Promise<FleetVehicle[]> {
  const { provider } = getActiveDbProvider();
  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        let rows;
        if (brandId && brandId !== DEFAULT_BRAND_ID) {
          rows = await sql`SELECT data FROM fleet WHERE brand_id = ${brandId} AND is_deleted = false ORDER BY model_name ASC`;
        } else {
          rows = await sql`SELECT data FROM fleet WHERE is_deleted = false ORDER BY model_name ASC`;
        }
        if (rows) {
          const parsed = rows
            .map((r: any) => {
              try {
                return typeof r.data === 'string' ? JSON.parse(r.data) : r.data;
              } catch (_) {
                return null;
              }
            })
            .filter((item: any) => item && typeof item === 'object' && (item.id || item.modelName || item.plateNumber || item.registrationNumber || item.model));
          return parsed;
        }
      }
    } catch (err) {
      console.error('[Neon Postgres] getDbFleet error:', err);
    }
  }

  const local = readLocalStore();
  let fleet = local.fleet || INITIAL_FLEET;
  if (brandId && brandId !== DEFAULT_BRAND_ID) {
    fleet = fleet.filter(f => !f.brandId || f.brandId === brandId);
  }
  return fleet.filter(f => !f.isDeleted);
}

export async function saveDbFleetVehicle(vehicle: FleetVehicle, actorUserId?: string): Promise<FleetVehicle> {
  const { provider } = getActiveDbProvider();
  const brandId = vehicle.brandId || DEFAULT_BRAND_ID;
  const id = vehicle.id || ('veh-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6));

  const modelName = vehicle.modelName || (vehicle.brand && vehicle.model ? `${vehicle.brand} ${vehicle.model}` : '') || vehicle.model || vehicle.brand || (vehicle as any).name || 'Toyota Innova Crysta';
  const registrationNumber = vehicle.registrationNumber || vehicle.plateNumber || 'DL 1ZA ' + Math.floor(1000 + Math.random() * 9000);
  const category = vehicle.category || vehicle.type || 'MUV';
  const capacity = Number(vehicle.capacity || vehicle.seats || 7);
  const fuelType = vehicle.fuelType || 'Diesel';
  const isActive = vehicle.isActive !== false && vehicle.status !== 'inactive';

  const sanitized: FleetVehicle = {
    ...vehicle,
    id,
    brandId,
    modelName,
    model: vehicle.model || modelName,
    brand: vehicle.brand || modelName.split(' ')[0] || 'Toyota',
    registrationNumber,
    plateNumber: vehicle.plateNumber || registrationNumber,
    category,
    type: vehicle.type || category,
    capacity,
    seats: vehicle.seats || capacity,
    fuelType,
    isActive,
    status: vehicle.status || (isActive ? 'active' : 'inactive')
  };

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        await sql`
          INSERT INTO fleet (id, brand_id, model_name, registration_number, category, capacity, fuel_type, is_active, data, updated_at)
          VALUES (
            ${sanitized.id},
            ${brandId},
            ${modelName},
            ${registrationNumber},
            ${category},
            ${capacity},
            ${fuelType},
            ${isActive},
            ${JSON.stringify(sanitized)},
            NOW()
          )
          ON CONFLICT (id) DO UPDATE SET
            brand_id = EXCLUDED.brand_id,
            model_name = EXCLUDED.model_name,
            registration_number = EXCLUDED.registration_number,
            category = EXCLUDED.category,
            capacity = EXCLUDED.capacity,
            fuel_type = EXCLUDED.fuel_type,
            is_active = EXCLUDED.is_active,
            data = EXCLUDED.data,
            updated_at = NOW()
        `;
      }
    } catch (err) {
      console.error('[Neon Postgres] saveDbFleetVehicle error:', err);
    }
  }

  writeLocalStore(data => {
    if (!data.fleet) data.fleet = [];
    const idx = data.fleet.findIndex(v => v.id === sanitized.id);
    if (idx >= 0) data.fleet[idx] = sanitized;
    else data.fleet.unshift(sanitized);
  });

  return sanitized;
}

export async function deleteDbFleetVehicle(id: string, actorUserId?: string): Promise<boolean> {
  const { provider } = getActiveDbProvider();
  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        await sql`DELETE FROM fleet WHERE id = ${id}`;
      }
    } catch (err) {
      console.error('[Neon Postgres] deleteDbFleetVehicle error:', err);
    }
  }

  writeLocalStore(data => {
    if (data.fleet) data.fleet = data.fleet.filter(v => v.id !== id);
  });

  return true;
}

// ── CRUD OPERATIONS: DRIVERS ──────────────────────────────────────────────────
export async function getDbDrivers(brandId?: string): Promise<Driver[]> {
  const { provider } = getActiveDbProvider();
  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        let rows;
        if (brandId && brandId !== DEFAULT_BRAND_ID) {
          rows = await sql`SELECT data FROM drivers WHERE brand_id = ${brandId} AND is_deleted = false ORDER BY name ASC`;
        } else {
          rows = await sql`SELECT data FROM drivers WHERE is_deleted = false ORDER BY name ASC`;
        }
        if (rows) {
          const parsed = rows
            .map((r: any) => {
              try {
                return typeof r.data === 'string' ? JSON.parse(r.data) : r.data;
              } catch (_) {
                return null;
              }
            })
            .filter((item: any) => item && typeof item === 'object' && (item.id || item.name || item.phone));
          return parsed;
        }
      }
    } catch (err) {
      console.error('[Neon Postgres] getDbDrivers error:', err);
    }
  }

  const local = readLocalStore();
  let drivers = local.drivers || INITIAL_DRIVERS;
  if (brandId && brandId !== DEFAULT_BRAND_ID) {
    drivers = drivers.filter(d => !d.brandId || d.brandId === brandId);
  }
  return drivers.filter(d => !d.isDeleted);
}

export async function saveDbDriver(driver: Driver, actorUserId?: string): Promise<Driver> {
  const { provider } = getActiveDbProvider();
  const brandId = driver.brandId || DEFAULT_BRAND_ID;
  const id = driver.id || ('drv-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6));

  const name = driver.name || 'Professional Chauffeur';
  const phone = driver.phone || '+91 9811240072';
  const licenseNumber = driver.licenseNumber || 'DL-042026' + Math.floor(100000 + Math.random() * 900000);
  const isActive = driver.isActive !== false && driver.status !== 'inactive';

  const sanitized: Driver = {
    ...driver,
    id,
    brandId,
    name,
    phone,
    licenseNumber,
    isActive,
    status: driver.status || (isActive ? 'active' : 'inactive')
  };

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        await sql`
          INSERT INTO drivers (id, brand_id, name, phone, license_number, is_active, data, updated_at)
          VALUES (
            ${sanitized.id},
            ${brandId},
            ${name},
            ${phone},
            ${licenseNumber},
            ${isActive},
            ${JSON.stringify(sanitized)},
            NOW()
          )
          ON CONFLICT (id) DO UPDATE SET
            brand_id = EXCLUDED.brand_id,
            name = EXCLUDED.name,
            phone = EXCLUDED.phone,
            license_number = EXCLUDED.license_number,
            is_active = EXCLUDED.is_active,
            data = EXCLUDED.data,
            updated_at = NOW()
        `;
      }
    } catch (err) {
      console.error('[Neon Postgres] saveDbDriver error:', err);
    }
  }

  writeLocalStore(data => {
    if (!data.drivers) data.drivers = [];
    const idx = data.drivers.findIndex(d => d.id === sanitized.id);
    if (idx >= 0) data.drivers[idx] = sanitized;
    else data.drivers.unshift(sanitized);
  });

  return sanitized;
}

export async function deleteDbDriver(id: string, actorUserId?: string): Promise<boolean> {
  const { provider } = getActiveDbProvider();
  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        await sql`DELETE FROM drivers WHERE id = ${id}`;
      }
    } catch (err) {
      console.error('[Neon Postgres] deleteDbDriver error:', err);
    }
  }

  writeLocalStore(data => {
    if (data.drivers) data.drivers = data.drivers.filter(d => d.id !== id);
  });

  return true;
}

// ── CRUD OPERATIONS: OPERATIONAL BOOKINGS ─────────────────────────────────────
export async function getDbBookings(brandId?: string): Promise<OperationalBooking[]> {
  const { provider } = getActiveDbProvider();
  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        let rows;
        if (brandId && brandId !== DEFAULT_BRAND_ID) {
          rows = await sql`SELECT data FROM operational_bookings WHERE brand_id = ${brandId} AND is_deleted = false ORDER BY updated_at DESC`;
        } else {
          rows = await sql`SELECT data FROM operational_bookings WHERE is_deleted = false ORDER BY updated_at DESC`;
        }
        if (rows) {
          const parsed = rows
            .map((r: any) => {
              try {
                return typeof r.data === 'string' ? JSON.parse(r.data) : r.data;
              } catch (_) {
                return null;
              }
            })
            .filter((item: any) => item && typeof item === 'object' && (item.id || item.voucherNo || item.itineraryRef || item.tourPackageName));
          return parsed;
        }
      }
    } catch (err) {
      console.error('[Neon Postgres] getDbBookings error:', err);
    }
  }

  const local = readLocalStore();
  let bookings = local.bookings || INITIAL_OPERATIONAL_BOOKINGS;
  if (brandId && brandId !== DEFAULT_BRAND_ID) {
    bookings = bookings.filter(b => !b.brandId || b.brandId === brandId);
  }
  return bookings.filter(b => !b.isDeleted);
}

export async function saveDbBooking(booking: OperationalBooking, actorUserId?: string): Promise<OperationalBooking> {
  const { provider } = getActiveDbProvider();
  const brandId = booking.brandId || DEFAULT_BRAND_ID;
  const id = booking.id || ('bk-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6));
  const sanitized: OperationalBooking = {
    ...booking,
    id,
    brandId,
    updatedAt: new Date().toISOString()
  };

  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        await sql`
          INSERT INTO operational_bookings (id, brand_id, itinerary_id, status, data, updated_at)
          VALUES (
            ${sanitized.id},
            ${brandId},
            ${sanitized.itineraryId || null},
            ${sanitized.status || 'active'},
            ${JSON.stringify(sanitized)},
            NOW()
          )
          ON CONFLICT (id) DO UPDATE SET
            brand_id = EXCLUDED.brand_id,
            itinerary_id = EXCLUDED.itinerary_id,
            status = EXCLUDED.status,
            data = EXCLUDED.data,
            updated_at = NOW();
        `;
      }
    } catch (err) {
      console.error('[Neon Postgres] saveDbBooking error:', err);
    }
  }

  writeLocalStore(data => {
    if (!data.bookings) data.bookings = [];
    const idx = data.bookings.findIndex(b => b.id === sanitized.id);
    if (idx >= 0) data.bookings[idx] = sanitized;
    else data.bookings.unshift(sanitized);
  });

  return sanitized;
}

export async function deleteDbBooking(id: string, actorUserId?: string): Promise<boolean> {
  const { provider } = getActiveDbProvider();
  if (provider === 'postgres') {
    try {
      await ensurePostgresTables();
      const sql = await getPostgresClient();
      if (sql) {
        await sql`DELETE FROM operational_bookings WHERE id = ${id}`;
      }
    } catch (err) {
      console.error('[Neon Postgres] deleteDbBooking error:', err);
    }
  }

  writeLocalStore(data => {
    if (data.bookings) data.bookings = data.bookings.filter(b => b.id !== id);
  });

  return true;
}

// ── IMPORT & EXPORT UTILITIES ─────────────────────────────────────────────────
export interface ImportPayload {
  itineraries?: Itinerary[];
  destinations?: Destination[];
  hotels?: Hotel[];
  fleet?: FleetVehicle[];
  drivers?: Driver[];
  bookings?: OperationalBooking[];
  settings?: AppSettings;
}

export async function importBrowserDataToDb(
  payload: ImportPayload,
  brandId: string = DEFAULT_BRAND_ID,
  actorUserId?: string,
  userEmail?: string
): Promise<{ importedItineraries: number; importedFleet: number; importedDrivers: number; importedBookings: number; errors: string[] }> {
  let importedItineraries = 0;
  let importedFleet = 0;
  let importedDrivers = 0;
  let importedBookings = 0;
  const errors: string[] = [];

  const PROTECTED_REFS = new Set(['LT-2026-0256', 'LT-2026-0255', 'LT-2026-0254', 'LT-2026-0007', 'LT-2026-0279']);

  if (Array.isArray(payload.itineraries)) {
    for (const itn of payload.itineraries) {
      try {
        const isProt = PROTECTED_REFS.has((itn.referenceNumber || '').trim().toUpperCase()) || itn.isProtected === true;
        const res = await saveDbItinerary({
          ...itn,
          brandId,
          isProtected: isProt
        }, { userId: actorUserId, userEmail, brandId });
        if (res.success) importedItineraries++;
        else if (res.error) errors.push(`Itinerary ${itn.referenceNumber}: ${res.error}`);
      } catch (err: any) {
        errors.push(`Itinerary ${itn.referenceNumber}: ${err?.message || err}`);
      }
    }
  }

  if (Array.isArray(payload.fleet)) {
    for (const v of payload.fleet) {
      try {
        await saveDbFleetVehicle({ ...v, brandId }, actorUserId);
        importedFleet++;
      } catch (err: any) {
        errors.push(`Fleet ${v.registrationNumber}: ${err?.message || err}`);
      }
    }
  }

  if (Array.isArray(payload.drivers)) {
    for (const d of payload.drivers) {
      try {
        await saveDbDriver({ ...d, brandId }, actorUserId);
        importedDrivers++;
      } catch (err: any) {
        errors.push(`Driver ${d.name}: ${err?.message || err}`);
      }
    }
  }

  if (Array.isArray(payload.bookings)) {
    for (const b of payload.bookings) {
      try {
        await saveDbBooking({ ...b, brandId }, actorUserId);
        importedBookings++;
      } catch (err: any) {
        errors.push(`Booking ${b.id}: ${err?.message || err}`);
      }
    }
  }

  if (payload.settings) {
    try {
      await saveDbSettings(payload.settings, brandId);
    } catch (err: any) {
      errors.push(`Settings: ${err?.message || err}`);
    }
  }

  await logDbActivity({
    brandId,
    userId: actorUserId,
    userEmail,
    action: 'import_data',
    entityType: 'system',
    details: { importedItineraries, importedFleet, importedDrivers, importedBookings, errorCount: errors.length }
  });

  return { importedItineraries, importedFleet, importedDrivers, importedBookings, errors };
}

export async function exportDatabaseBackup(brandId?: string): Promise<any> {
  const [itineraries, destinations, attractions, hotels, fleet, drivers, bookings, settings, brands] = await Promise.all([
    getDbItineraries(brandId, true),
    getDbDestinations(brandId),
    getDbAttractions(brandId),
    getDbHotels(brandId),
    getDbFleet(brandId),
    getDbDrivers(brandId),
    getDbBookings(brandId),
    getDbSettings(brandId),
    getDbBrands()
  ]);

  return {
    version: '2.0',
    exportedAt: new Date().toISOString(),
    brandId: brandId || 'all',
    data: {
      itineraries,
      destinations,
      attractions,
      hotels,
      fleet,
      drivers,
      bookings,
      settings,
      brands
    }
  };
}

// ── DATABASE STATUS INSPECTION ────────────────────────────────────────────────
export async function getDbDatabaseStatus() {
  const dbInfo = getActiveDbProvider();
  if (dbInfo.provider === 'postgres') {
    const sql = await getPostgresClient();
    if (sql) {
      try {
        const [dRes, aRes, hRes, sRes, iRes, bRes, uRes, fRes] = await Promise.all([
          sql`SELECT count(*)::int as cnt FROM destinations`,
          sql`SELECT count(*)::int as cnt FROM attractions`,
          sql`SELECT count(*)::int as cnt FROM hotels`,
          sql`SELECT count(*)::int as cnt FROM app_settings`,
          sql`SELECT count(*)::int as cnt FROM itineraries WHERE is_deleted = false`.catch(() => [{ cnt: 0 }]),
          sql`SELECT count(*)::int as cnt FROM brands`.catch(() => [{ cnt: 1 }]),
          sql`SELECT count(*)::int as cnt FROM users`.catch(() => [{ cnt: 1 }]),
          sql`SELECT count(*)::int as cnt FROM fleet`.catch(() => [{ cnt: 0 }])
        ]);

        return {
          success: true,
          provider: dbInfo.label,
          destinationsCount: dRes[0]?.cnt || 0,
          attractionsCount: aRes[0]?.cnt || 0,
          hotelsCount: hRes[0]?.cnt || 0,
          itinerariesCount: iRes[0]?.cnt || 0,
          brandsCount: bRes[0]?.cnt || 1,
          usersCount: uRes[0]?.cnt || 1,
          fleetCount: fRes[0]?.cnt || 0,
          settingsConfigured: (sRes[0]?.cnt || 0) > 0
        };
      } catch (e) {
        console.warn('[DB Status] Postgres status query error:', e);
      }
    }
  }

  const [d, a, h, s, i, b, u, f] = await Promise.all([
    getDbDestinations(),
    getDbAttractions(),
    getDbHotels(),
    getDbSettings(),
    getDbItineraries(),
    getDbBrands(),
    getDbUsers(),
    getDbFleet()
  ]);

  return {
    success: true,
    provider: dbInfo.label,
    destinationsCount: d.length,
    attractionsCount: a.length,
    hotelsCount: h.length,
    itinerariesCount: i.length,
    brandsCount: b.length,
    usersCount: u.length,
    fleetCount: f.length,
    settingsConfigured: !!s.companyName
  };
}
