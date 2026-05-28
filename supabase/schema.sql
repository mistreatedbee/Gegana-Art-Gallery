-- Gegana Gallery — Supabase Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- ARTWORKS
-- ============================================================
CREATE TABLE IF NOT EXISTS artworks (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT NOT NULL,
  artist          TEXT NOT NULL,
  medium          TEXT NOT NULL,
  size            TEXT,
  year            INTEGER NOT NULL,
  category        TEXT NOT NULL,
  price           NUMERIC(10,2),
  currency        TEXT DEFAULT 'ZAR',
  availability    TEXT NOT NULL DEFAULT 'Available'
                    CHECK (availability IN ('Available','Sold','Reserved')),
  description     TEXT,
  image_url       TEXT NOT NULL,
  image_public_id TEXT,
  is_featured     BOOLEAN DEFAULT false,
  sort_order      INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS artworks_category_idx ON artworks(category);
CREATE INDEX IF NOT EXISTS artworks_availability_idx ON artworks(availability);
CREATE INDEX IF NOT EXISTS artworks_featured_idx ON artworks(is_featured);

-- ============================================================
-- COLLECTIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS collections (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL UNIQUE,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT,
  cover_url   TEXT,
  sort_order  INTEGER DEFAULT 0,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS collection_artworks (
  collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
  artwork_id    UUID REFERENCES artworks(id) ON DELETE CASCADE,
  sort_order    INTEGER DEFAULT 0,
  PRIMARY KEY (collection_id, artwork_id)
);

-- ============================================================
-- ARTISTS
-- ============================================================
CREATE TABLE IF NOT EXISTS artists (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name             TEXT NOT NULL,
  slug             TEXT NOT NULL UNIQUE,
  bio              TEXT,
  statement        TEXT,
  photo_url        TEXT,
  photo_public_id  TEXT,
  instagram_url    TEXT,
  tiktok_url       TEXT,
  website_url      TEXT,
  is_featured      BOOLEAN DEFAULT false,
  achievements     JSONB DEFAULT '[]',
  sort_order       INTEGER DEFAULT 0,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- EXHIBITIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS exhibitions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  description TEXT,
  location    TEXT,
  start_date  DATE NOT NULL,
  end_date    DATE NOT NULL,
  image_url   TEXT,
  is_active   BOOLEAN DEFAULT true,
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ENQUIRIES
-- ============================================================
CREATE TABLE IF NOT EXISTS enquiries (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT,
  message       TEXT NOT NULL,
  artwork_id    UUID REFERENCES artworks(id) ON DELETE SET NULL,
  artwork_title TEXT,
  type          TEXT DEFAULT 'general' CHECK (type IN ('general','artwork','consultation')),
  status        TEXT DEFAULT 'new' CHECK (status IN ('new','contacted','completed','archived')),
  notes         TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS enquiries_status_idx ON enquiries(status);
CREATE INDEX IF NOT EXISTS enquiries_created_idx ON enquiries(created_at DESC);

-- ============================================================
-- TESTIMONIALS
-- ============================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote       TEXT NOT NULL,
  author      TEXT NOT NULL,
  role        TEXT,
  photo_url   TEXT,
  is_approved BOOLEAN DEFAULT false,
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SOCIAL POSTS
-- ============================================================
CREATE TABLE IF NOT EXISTS social_posts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform        TEXT NOT NULL CHECK (platform IN ('instagram','tiktok')),
  account_handle  TEXT NOT NULL,
  external_id     TEXT NOT NULL,
  media_url       TEXT NOT NULL,
  caption         TEXT,
  likes_count     INTEGER DEFAULT 0,
  comments_count  INTEGER DEFAULT 0,
  views_count     INTEGER DEFAULT 0,
  permalink       TEXT NOT NULL,
  is_visible      BOOLEAN DEFAULT true,
  is_featured     BOOLEAN DEFAULT false,
  posted_at       TIMESTAMPTZ,
  fetched_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(platform, external_id)
);

CREATE INDEX IF NOT EXISTS social_platform_idx ON social_posts(platform, account_handle);
CREATE INDEX IF NOT EXISTS social_visible_idx ON social_posts(is_visible, is_featured);

-- ============================================================
-- INSTAGRAM TOKENS
-- ============================================================
CREATE TABLE IF NOT EXISTS instagram_tokens (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_handle  TEXT NOT NULL UNIQUE,
  access_token    TEXT NOT NULL,
  expires_at      TIMESTAMPTZ NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- HOMEPAGE SETTINGS (singleton)
-- ============================================================
CREATE TABLE IF NOT EXISTS homepage_settings (
  id                    INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  hero_title            TEXT DEFAULT 'GEGANA',
  hero_subtitle         TEXT DEFAULT 'GALLERY',
  hero_tagline          TEXT DEFAULT 'Curating African Art & Contemporary Expression',
  hero_image_url        TEXT,
  hero_image_public_id  TEXT,
  about_heading         TEXT DEFAULT 'Elevating African Contemporary Art',
  about_body            TEXT DEFAULT 'Founded in 2018, Gegana Gallery has established itself as a premier destination for contemporary African art in Johannesburg.',
  stats_artworks        INTEGER DEFAULT 2400,
  stats_exhibitions     INTEGER DEFAULT 48,
  stats_artists         INTEGER DEFAULT 65,
  stats_years           INTEGER DEFAULT 12,
  featured_artwork_ids  JSONB DEFAULT '[]',
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO homepage_settings DEFAULT VALUES ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- GALLERY SETTINGS (singleton)
-- ============================================================
CREATE TABLE IF NOT EXISTS gallery_settings (
  id                      INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  gallery_name            TEXT DEFAULT 'Gegana Gallery',
  phone                   TEXT DEFAULT '066 055 3939',
  whatsapp_number         TEXT DEFAULT '27660553939',
  email                   TEXT DEFAULT 'hello@geganagallery.com',
  address                 TEXT DEFAULT 'Johannesburg, South Africa',
  instagram_gallery_url   TEXT DEFAULT 'https://www.instagram.com/gegallery85',
  instagram_artist_url    TEXT DEFAULT 'https://www.instagram.com/thandazanindlovuartist',
  tiktok_url              TEXT DEFAULT 'https://www.tiktok.com/@thandazanindlovuartist',
  footer_tagline          TEXT DEFAULT 'Curating African Art & Contemporary Expression. A premier destination for museum-quality collections.',
  updated_at              TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO gallery_settings DEFAULT VALUES ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE exhibitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE instagram_tokens ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read artworks" ON artworks FOR SELECT USING (true);
CREATE POLICY "Public read collections" ON collections FOR SELECT USING (is_active = true);
CREATE POLICY "Public read collection_artworks" ON collection_artworks FOR SELECT USING (true);
CREATE POLICY "Public read artists" ON artists FOR SELECT USING (true);
CREATE POLICY "Public read exhibitions" ON exhibitions FOR SELECT USING (is_active = true);
CREATE POLICY "Public read approved testimonials" ON testimonials FOR SELECT USING (is_approved = true);
CREATE POLICY "Public read visible social posts" ON social_posts FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read homepage settings" ON homepage_settings FOR SELECT USING (true);
CREATE POLICY "Public read gallery settings" ON gallery_settings FOR SELECT USING (true);

-- Public can submit enquiries
CREATE POLICY "Public insert enquiries" ON enquiries FOR INSERT WITH CHECK (true);

-- Authenticated admin: full access
CREATE POLICY "Admin all artworks" ON artworks FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all collections" ON collections FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all collection_artworks" ON collection_artworks FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all artists" ON artists FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all exhibitions" ON exhibitions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all enquiries" ON enquiries FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all social posts" ON social_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all homepage settings" ON homepage_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all gallery settings" ON gallery_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all instagram tokens" ON instagram_tokens FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- SEED DATA (placeholder artworks using Unsplash)
-- ============================================================
INSERT INTO artists (name, slug, bio, statement, photo_url, instagram_url, tiktok_url, is_featured, achievements)
VALUES (
  'Thandazani Ndlovu',
  'thandazani-ndlovu',
  'Ndlovu''s work explores the intersection of traditional African mythology and modern urban existence. Through bold strokes and profound textures, he creates a visual language that speaks to identity, displacement, and spiritual grounding.',
  '"My canvas is a bridge between the ancestors we''ve forgotten and the futures we are yet to build."',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=1200',
  'https://www.instagram.com/thandazanindlovuartist',
  'https://www.tiktok.com/@thandazanindlovuartist',
  true,
  '[{"year": 2024, "title": "Solo Exhibition, Johannesburg Art Gallery"}, {"year": 2023, "title": "Group Show, Cape Town Contemporary"}]'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO artworks (title, artist, medium, size, year, category, price, availability, description, image_url, is_featured, sort_order)
VALUES
  ('Echoes of the Ancestors', 'Thandazani Ndlovu', 'Oil on Canvas', '120 x 90 cm', 2025, 'Paintings', 45000, 'Available', 'A deeply spiritual work exploring ancestral memory through layered oil paint and earthy tones.', 'https://images.unsplash.com/photo-1578301978693-85fa9c026f19?auto=format&fit=crop&q=80&w=800', true, 1),
  ('Urban Rhythm', 'Thandazani Ndlovu', 'Mixed Media', '100 x 100 cm', 2024, 'Mixed Media', 38000, 'Available', 'An exploration of city life through overlapping textures and urban materials.', 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&q=80&w=800', true, 2),
  ('Silent Observer', 'Thandazani Ndlovu', 'Bronze Sculpture', '45 x 20 x 20 cm', 2026, 'Contemporary', NULL, 'Available', 'A minimalist bronze figure that speaks to quiet contemplation in a noisy world.', 'https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?auto=format&fit=crop&q=80&w=800', true, 3),
  ('Abstract Landscapes II', 'Thandazani Ndlovu', 'Acrylic on Linen', '150 x 80 cm', 2025, 'Abstract', 52000, 'Reserved', 'Bold abstract forms inspired by the South African landscape.', 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&q=80&w=800', true, 4),
  ('Midnight Sun', 'Thandazani Ndlovu', 'Oil on Canvas', '90 x 90 cm', 2024, 'Paintings', 42000, 'Sold', 'A meditation on duality — light and darkness in perpetual conversation.', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800', false, 5),
  ('Golden Hour', 'Thandazani Ndlovu', 'Oil on Canvas', '80 x 60 cm', 2025, 'Paintings', 35000, 'Available', 'Capturing the magical light of an African sunset in bold, gestural strokes.', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=600', false, 6),
  ('Ancestral Lines', 'Thandazani Ndlovu', 'Pen and Ink', '60 x 80 cm', 2024, 'African Art', 28000, 'Available', 'Intricate line work drawing on traditional African geometric patterns.', 'https://images.unsplash.com/photo-1544413660-299165566b1d?auto=format&fit=crop&q=80&w=600', false, 7),
  ('Urban Chaos', 'Thandazani Ndlovu', 'Mixed Media', '120 x 120 cm', 2025, 'Abstract', 58000, 'Available', 'The energy and disorder of urban African life rendered in abstract form.', 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&q=80&w=600', false, 8),
  ('The Gathering', 'Thandazani Ndlovu', 'Acrylic on Canvas', '200 x 150 cm', 2023, 'African Art', 75000, 'Sold', 'A monumental work depicting community, resilience, and shared identity.', 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&q=80&w=600', false, 9)
ON CONFLICT DO NOTHING;

INSERT INTO testimonials (quote, author, role, is_approved, sort_order)
VALUES
  ('Gegana Gallery has an unparalleled eye for emerging African talent. Their curation is both bold and deeply respectful of cultural narratives.', 'Elena Rostova', 'Private Collector', true, 1),
  ('Working with their advisory team transformed my approach to collecting. They don''t just sell art; they educate and build legacies.', 'Marcus Chen', 'Interior Architect', true, 2),
  ('The Thandazani Ndlovu exhibition was a masterclass in spatial design and emotional resonance. Truly a museum-quality experience.', 'Sarah Jenkins', 'Art Critic', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO exhibitions (title, description, location, start_date, end_date, image_url, is_active, sort_order)
VALUES
  ('Voices of the Soil', 'A group exhibition exploring our deep connection to the earth through contemporary sculpture and mixed media.', 'Main Gallery, Johannesburg', '2026-10-15', '2026-11-30', 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&q=80&w=800', true, 1),
  ('Thandazani Ndlovu: Retrospective', 'An immersive journey through a decade of Ndlovu''s groundbreaking work in abstract expressionism.', 'West Wing, Johannesburg', '2026-12-05', '2027-01-20', 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=800', true, 2),
  ('Urban Geometries', 'Emerging artists interpreting the modern African metropolis through stark lines and bold colors.', 'Project Space', '2027-02-01', '2027-03-15', 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?auto=format&fit=crop&q=80&w=800', true, 3)
ON CONFLICT DO NOTHING;

-- Seed placeholder social posts
INSERT INTO social_posts (platform, account_handle, external_id, media_url, caption, likes_count, comments_count, permalink, is_visible, is_featured)
VALUES
  ('instagram', 'gegallery85', 'placeholder_1', 'https://images.unsplash.com/photo-1544413660-299165566b1d?auto=format&fit=crop&q=80&w=400', 'Gallery opening this Friday — join us for an evening of art and conversation. 🎨', 342, 28, 'https://www.instagram.com/gegallery85', true, true),
  ('instagram', 'gegallery85', 'placeholder_2', 'https://images.unsplash.com/photo-1518998053401-b4391cb169cd?auto=format&fit=crop&q=80&w=400', 'New acquisition just arrived. Contact us to enquire.', 289, 15, 'https://www.instagram.com/gegallery85', true, false),
  ('instagram', 'gegallery85', 'placeholder_3', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=400', 'Behind the scenes at our latest installation.', 412, 33, 'https://www.instagram.com/gegallery85', true, false),
  ('instagram', 'thandazanindlovuartist', 'placeholder_4', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400', 'Studio session — working on the new series. 🖌️', 567, 44, 'https://www.instagram.com/thandazanindlovuartist', true, true),
  ('instagram', 'thandazanindlovuartist', 'placeholder_5', 'https://images.unsplash.com/photo-1578301978693-85fa9c026f19?auto=format&fit=crop&q=80&w=400', '"Echoes of the Ancestors" — detail shot. Available at @gegallery85', 892, 71, 'https://www.instagram.com/thandazanindlovuartist', true, false),
  ('instagram', 'thandazanindlovuartist', 'placeholder_6', 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&q=80&w=400', 'Process always tells the story. New work in progress.', 634, 52, 'https://www.instagram.com/thandazanindlovuartist', true, false),
  ('tiktok', 'thandazanindlovuartist', 'placeholder_tiktok_1', 'https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?auto=format&fit=crop&q=80&w=400', 'Watch me create this piece from start to finish 🎨 #AfricanArt #ContemporaryArt', 1240, 89, 'https://www.tiktok.com/@thandazanindlovuartist', true, true),
  ('tiktok', 'thandazanindlovuartist', 'placeholder_tiktok_2', 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&q=80&w=400', 'The meaning behind my latest collection explained 🖌️', 876, 65, 'https://www.tiktok.com/@thandazanindlovuartist', true, false)
ON CONFLICT (platform, external_id) DO NOTHING;
