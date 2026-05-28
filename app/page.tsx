import { createServerDbClient } from '@/lib/db/server'
import { Navbar } from '@/components/layout/Navbar'
import { Hero } from '@/components/home/Hero'
import { FeaturedArtworks } from '@/components/home/FeaturedArtworks'
import { About } from '@/components/home/About'
import { FeaturedArtist } from '@/components/home/FeaturedArtist'
import { Exhibitions } from '@/components/home/Exhibitions'
import { Collection } from '@/components/home/Collection'
import { VideoExperience } from '@/components/home/VideoExperience'
import { Testimonials } from '@/components/home/Testimonials'
import { Services } from '@/components/home/Services'
import { SocialFeed } from '@/components/home/SocialFeed'
import { Contact } from '@/components/home/Contact'
import { Footer } from '@/components/layout/Footer'
import type { Artwork, Artist, Exhibition, Testimonial, SocialPost, HomepageSettings, GallerySettings } from '@/types'

export default async function HomePage() {
  let homepageSettings: HomepageSettings | null = null
  let gallerySettings: GallerySettings | null = null
  let featuredArtworks: Artwork[] = []
  let featuredArtist: Artist | null = null
  let exhibitions: Exhibition[] = []
  let testimonials: Testimonial[] = []
  let galleryPosts: SocialPost[] = []
  let artistPosts: SocialPost[] = []
  let tiktokPosts: SocialPost[] = []

  try {
    const db = await createServerDbClient()

    const [
      homepageRes,
      settingsRes,
      artistRes,
      exhibitionsRes,
      testimonialsRes,
      galleryPostsRes,
      artistPostsRes,
      tiktokPostsRes,
    ] = await Promise.all([
      db.database.from('homepage_settings').select('*').eq('id', 1).single(),
      db.database.from('gallery_settings').select('*').eq('id', 1).single(),
      db.database.from('artists').select('*').eq('is_featured', true).single(),
      db.database.from('exhibitions').select('*').eq('is_active', true).order('sort_order', { ascending: true }).limit(3),
      db.database.from('testimonials').select('*').eq('is_approved', true).order('sort_order', { ascending: true }),
      db.database.from('social_posts').select('*').eq('platform', 'instagram').eq('account_handle', 'gegallery85').eq('is_visible', true).order('posted_at', { ascending: false }).limit(8),
      db.database.from('social_posts').select('*').eq('platform', 'instagram').eq('account_handle', 'thandazanindlovuartist').eq('is_visible', true).order('posted_at', { ascending: false }).limit(8),
      db.database.from('social_posts').select('*').eq('platform', 'tiktok').eq('is_visible', true).order('posted_at', { ascending: false }).limit(4),
    ])

    homepageSettings = homepageRes.data
    gallerySettings = settingsRes.data
    featuredArtist = artistRes.data
    exhibitions = exhibitionsRes.data || []
    testimonials = testimonialsRes.data || []
    galleryPosts = galleryPostsRes.data || []
    artistPosts = artistPostsRes.data || []
    tiktokPosts = tiktokPostsRes.data || []

    // Fetch featured artworks by IDs from homepage settings
    const featuredIds: string[] = homepageSettings?.featured_artwork_ids || []
    if (featuredIds.length > 0) {
      const artworksRes = await db.database
        .from('artworks')
        .select('*')
        .in('id', featuredIds)
        .limit(6)
      featuredArtworks = artworksRes.data || []
    } else {
      const artworksRes = await db.database
        .from('artworks')
        .select('*')
        .eq('is_featured', true)
        .order('sort_order', { ascending: true })
        .limit(6)
      featuredArtworks = artworksRes.data || []
    }
  } catch {
    // Database not yet connected — components will render with fallback placeholder data
  }

  return (
    <div className="bg-ink min-h-screen text-bone selection:bg-gold selection:text-ink">
      <Navbar />
      <main>
        <Hero settings={homepageSettings} />
        <FeaturedArtworks artworks={featuredArtworks} />
        <About settings={homepageSettings} />
        <FeaturedArtist artist={featuredArtist} />
        <Exhibitions exhibitions={exhibitions} />
        <Collection artworks={featuredArtworks.slice(0, 8)} />
        <VideoExperience />
        <Testimonials testimonials={testimonials} />
        <Services />
        <SocialFeed
          galleryPosts={galleryPosts}
          artistPosts={artistPosts}
          tiktokPosts={tiktokPosts}
        />
        <Contact settings={gallerySettings} />
      </main>
      <Footer settings={gallerySettings} />
    </div>
  )
}
