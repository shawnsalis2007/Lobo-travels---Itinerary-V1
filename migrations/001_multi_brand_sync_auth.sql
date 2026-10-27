-- =========================================================================
-- LOBO TRAVELS - VERSIONED NON-DESTRUCTIVE DATABASE MIGRATION
-- MIGRATION: 001_multi_brand_sync_auth.sql
-- DESCRIPTION: Multi-brand white-label support, authentication, atomic reference
--              sequences, soft delete, activity logging, and fleet/driver persistence.
-- =========================================================================

-- 1. BRANDS TABLE
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
  max_users INT DEFAULT 10,
  status TEXT DEFAULT 'active',
  data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default Lobo Travels brand
INSERT INTO brands (id, name, slug, code, logo_url, brand_color_primary, brand_color_secondary, brand_color_accent, reference_prefix, max_users, status)
VALUES (
  'brand-lobo-travels',
  'Lobo Travels',
  'lobo-travels',
  'LOBO',
  '/logo.png',
  '#151521',
  '#26214F',
  '#f59e0b',
  'LT-2026-',
  50,
  'active'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  code = EXCLUDED.code,
  updated_at = NOW();

-- 2. USERS TABLE
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
CREATE INDEX IF NOT EXISTS idx_users_brand_email ON users(brand_id, email);

-- Seed / Upsert Default Super Admin User (vlobo99@outlook.com / venson7359)
INSERT INTO users (id, brand_id, email, password_hash, full_name, role, permissions, is_active, must_change_password, failed_login_attempts)
VALUES (
  'user-superadmin-01',
  'brand-lobo-travels',
  'vlobo99@outlook.com',
  '$2b$10$PzsHXOJkyKbIwJF2rgAO9eUiqz4vcj4YfWOdAIQoAljbbrxHk/K9C',
  'Venson Lobo (Super Admin)',
  'super_admin',
  '{"canCreateItinerary": true, "canEditItinerary": true, "canDeleteItinerary": true, "canManageFleet": true, "canManageDrivers": true, "canManageBookings": true, "canManageDestinations": true, "canManageHotels": true, "canViewReports": true, "canManageSettings": true, "canManageUsers": true}'::jsonb,
  true,
  false,
  0
)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  password_hash = EXCLUDED.password_hash,
  full_name = EXCLUDED.full_name,
  role = 'super_admin',
  is_active = true,
  failed_login_attempts = 0,
  locked_until = NULL,
  updated_at = NOW();

-- 3. SESSIONS TABLE
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  brand_id TEXT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);

-- 4. REFERENCE NUMBER ATOMIC COUNTERS TABLE
CREATE TABLE IF NOT EXISTS reference_counters (
  brand_id TEXT NOT NULL,
  year INT NOT NULL,
  current_sequence INT NOT NULL DEFAULT 250,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (brand_id, year)
);

-- Initialize Lobo Travels 2026 sequence starting from 280 (or higher than existing test refs)
INSERT INTO reference_counters (brand_id, year, current_sequence)
VALUES ('brand-lobo-travels', 2026, 280)
ON CONFLICT (brand_id, year) DO NOTHING;

-- 5. ITINERARIES TABLE (UPGRADED WITH MULTI-BRAND & AUDIT COLUMNS)
ALTER TABLE itineraries ADD COLUMN IF NOT EXISTS brand_id TEXT NOT NULL DEFAULT 'brand-lobo-travels';
ALTER TABLE itineraries ADD COLUMN IF NOT EXISTS sequence_number INT NOT NULL DEFAULT 1;
ALTER TABLE itineraries ADD COLUMN IF NOT EXISTS version INT NOT NULL DEFAULT 1;
ALTER TABLE itineraries ADD COLUMN IF NOT EXISTS is_protected BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE itineraries ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE itineraries ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;
ALTER TABLE itineraries ADD COLUMN IF NOT EXISTS created_by TEXT;
ALTER TABLE itineraries ADD COLUMN IF NOT EXISTS updated_by TEXT;

CREATE INDEX IF NOT EXISTS idx_itineraries_brand ON itineraries(brand_id);
CREATE INDEX IF NOT EXISTS idx_itineraries_seq ON itineraries(sequence_number DESC);
CREATE INDEX IF NOT EXISTS idx_itineraries_deleted ON itineraries(is_deleted);

-- Mark the five critical itineraries as protected
UPDATE itineraries 
SET is_protected = true 
WHERE reference_number IN ('LT-2026-0256', 'LT-2026-0255', 'LT-2026-0254', 'LT-2026-0007', 'LT-2026-0279');

-- 6. DESTINATIONS TABLE (UPGRADED WITH MULTI-BRAND & SOURCE COLUMNS)
ALTER TABLE destinations ADD COLUMN IF NOT EXISTS brand_id TEXT NOT NULL DEFAULT 'brand-lobo-travels';
ALTER TABLE destinations ADD COLUMN IF NOT EXISTS source TEXT NOT NULL DEFAULT 'lobo_preloaded';
ALTER TABLE destinations ADD COLUMN IF NOT EXISTS original_destination_id TEXT;
ALTER TABLE destinations ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE destinations ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;
ALTER TABLE destinations ADD COLUMN IF NOT EXISTS created_by TEXT;
ALTER TABLE destinations ADD COLUMN IF NOT EXISTS updated_by TEXT;

CREATE INDEX IF NOT EXISTS idx_destinations_brand ON destinations(brand_id);
CREATE INDEX IF NOT EXISTS idx_destinations_deleted ON destinations(is_deleted);

-- 7. ATTRACTIONS TABLE (UPGRADED WITH MULTI-BRAND & SOURCE COLUMNS)
ALTER TABLE attractions ADD COLUMN IF NOT EXISTS brand_id TEXT NOT NULL DEFAULT 'brand-lobo-travels';
ALTER TABLE attractions ADD COLUMN IF NOT EXISTS source TEXT NOT NULL DEFAULT 'lobo_preloaded';
ALTER TABLE attractions ADD COLUMN IF NOT EXISTS original_attraction_id TEXT;
ALTER TABLE attractions ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE attractions ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;
ALTER TABLE attractions ADD COLUMN IF NOT EXISTS created_by TEXT;
ALTER TABLE attractions ADD COLUMN IF NOT EXISTS updated_by TEXT;

CREATE INDEX IF NOT EXISTS idx_attractions_brand ON attractions(brand_id);
CREATE INDEX IF NOT EXISTS idx_attractions_deleted ON attractions(is_deleted);

-- 8. HOTELS TABLE (UPGRADED WITH MULTI-BRAND COLUMNS)
ALTER TABLE hotels ADD COLUMN IF NOT EXISTS brand_id TEXT NOT NULL DEFAULT 'brand-lobo-travels';
ALTER TABLE hotels ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE hotels ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;
ALTER TABLE hotels ADD COLUMN IF NOT EXISTS created_by TEXT;
ALTER TABLE hotels ADD COLUMN IF NOT EXISTS updated_by TEXT;

CREATE INDEX IF NOT EXISTS idx_hotels_brand ON hotels(brand_id);
CREATE INDEX IF NOT EXISTS idx_hotels_deleted ON hotels(is_deleted);

-- 9. FLEET TABLE
CREATE TABLE IF NOT EXISTS fleet (
  id TEXT PRIMARY KEY,
  brand_id TEXT NOT NULL DEFAULT 'brand-lobo-travels',
  model_name TEXT NOT NULL,
  registration_number TEXT NOT NULL,
  category TEXT NOT NULL,
  capacity INT NOT NULL,
  fuel_type TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  is_deleted BOOLEAN DEFAULT false,
  deleted_at TIMESTAMPTZ,
  created_by TEXT,
  updated_by TEXT,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_fleet_brand ON fleet(brand_id);

-- 10. DRIVERS TABLE
CREATE TABLE IF NOT EXISTS drivers (
  id TEXT PRIMARY KEY,
  brand_id TEXT NOT NULL DEFAULT 'brand-lobo-travels',
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  license_number TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  is_deleted BOOLEAN DEFAULT false,
  deleted_at TIMESTAMPTZ,
  created_by TEXT,
  updated_by TEXT,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_drivers_brand ON drivers(brand_id);

-- 11. OPERATIONAL BOOKINGS (REMINDERS) TABLE
CREATE TABLE IF NOT EXISTS operational_bookings (
  id TEXT PRIMARY KEY,
  brand_id TEXT NOT NULL DEFAULT 'brand-lobo-travels',
  itinerary_id TEXT,
  status TEXT DEFAULT 'pending',
  is_deleted BOOLEAN DEFAULT false,
  deleted_at TIMESTAMPTZ,
  created_by TEXT,
  updated_by TEXT,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_bookings_brand ON operational_bookings(brand_id);

-- 12. APP SETTINGS (UPGRADED WITH MULTI-BRAND COLUMNS)
ALTER TABLE app_settings ADD COLUMN IF NOT EXISTS brand_id TEXT NOT NULL DEFAULT 'brand-lobo-travels';

-- 13. ACTIVITY LOGS AUDIT TRAIL TABLE
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
CREATE INDEX IF NOT EXISTS idx_activity_logs_brand ON activity_logs(brand_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_logs_action ON activity_logs(action);
