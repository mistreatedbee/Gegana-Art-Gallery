export interface Artwork {
  id: string
  title: string
  artist: string
  medium: string
  size?: string | null
  year: number
  category: string
  price?: number | null
  currency: string
  availability: 'Available' | 'Sold' | 'Reserved'
  description?: string | null
  image_url: string
  image_public_id?: string | null
  is_featured: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Collection {
  id: string
  name: string
  slug: string
  description?: string | null
  cover_url?: string | null
  sort_order: number
  is_active: boolean
  created_at: string
}

export interface Artist {
  id: string
  name: string
  slug: string
  bio?: string | null
  statement?: string | null
  photo_url?: string | null
  photo_public_id?: string | null
  instagram_url?: string | null
  tiktok_url?: string | null
  website_url?: string | null
  is_featured: boolean
  achievements: { year: number; title: string }[]
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Exhibition {
  id: string
  title: string
  description?: string | null
  location?: string | null
  start_date: string
  end_date: string
  image_url?: string | null
  status?: string | null
  is_active: boolean
  sort_order: number
  created_at: string
}

export interface Enquiry {
  id: string
  name: string
  email: string
  phone?: string | null
  message: string
  artwork_id?: string | null
  artwork_title?: string | null
  type: 'general' | 'artwork' | 'consultation'
  status: 'new' | 'contacted' | 'completed' | 'archived'
  notes?: string | null
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  role?: string | null
  photo_url?: string | null
  is_approved: boolean
  sort_order: number
  created_at: string
}

export interface SocialPost {
  id: string
  platform: 'instagram' | 'tiktok'
  account_handle: string
  external_id: string
  media_url: string
  caption?: string | null
  likes_count: number
  comments_count: number
  views_count: number
  permalink: string
  is_visible: boolean
  is_featured: boolean
  posted_at?: string | null
  fetched_at: string
}

export interface HomepageSettings {
  id: number
  hero_title: string
  hero_subtitle: string
  hero_tagline: string
  hero_image_url?: string | null
  hero_image_public_id?: string | null
  about_heading?: string | null
  about_body?: string | null
  stats_artworks: number
  stats_exhibitions: number
  stats_artists: number
  stats_years: number
  featured_artwork_ids: string[]
  updated_at: string
}

export interface GallerySettings {
  id: number
  gallery_name: string
  phone: string
  whatsapp_number: string
  email: string
  address?: string | null
  instagram_gallery_url?: string | null
  instagram_artist_url?: string | null
  tiktok_url?: string | null
  footer_tagline?: string | null
  updated_at: string
}

export interface InstagramToken {
  id: string
  account_handle: string
  access_token: string
  expires_at: string
  created_at: string
}
