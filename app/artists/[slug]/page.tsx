import type { Metadata } from 'next'
import { createServerDbClient } from '@/lib/db/server'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ArtworkCard } from '@/components/collection/ArtworkCard'
import type { Artist, Artwork, GallerySettings } from '@/types'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: params.slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    description: `Artworks and profile of ${params.slug.replace(/-/g, ' ')} at Gegana Gallery.`,
  }
}

export default async function ArtistPage({ params }: PageProps) {
  let artist: Artist | null = null
  let artworks: Artwork[] = []
  let gallerySettings: GallerySettings | null = null

  try {
    const db = await createServerDbClient()
    const [artistRes, artworksRes, settingsRes] = await Promise.all([
      db.database.from('artists').select('*').eq('slug', params.slug).single(),
      db.database.from('artworks').select('*').eq('artist', params.slug.replace(/-/g, ' ')).order('year', { ascending: false }),
      db.database.from('gallery_settings').select('*').eq('id', 1).single(),
    ])
    artist = artistRes.data
    artworks = artworksRes.data || []
    gallerySettings = settingsRes.data
  } catch {
    // DB not connected
  }

  if (!artist) notFound()

  const nameParts = artist.name.split(' ')
  const firstName = nameParts.slice(0, -1).join(' ')
  const lastName = nameParts[nameParts.length - 1]

  return (
    <div className="bg-bone min-h-screen text-ink">
      <Navbar />

      {/* Hero */}
      <div className="bg-ink pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-gold font-sans text-xs tracking-[0.3em] uppercase block mb-6">Artist</span>
            <h1 className="text-bone font-serif text-7xl md:text-9xl leading-[0.85]">
              {firstName} <br />
              <span className="italic text-bone/60">{lastName}</span>
            </h1>
            {artist.statement && (
              <blockquote className="border-l-2 border-gold pl-6 mt-8">
                <p className="font-serif italic text-xl text-bone/80">{artist.statement}</p>
              </blockquote>
            )}
            <div className="flex gap-4 mt-10">
              {artist.instagram_url && (
                <a href={artist.instagram_url} target="_blank" rel="noreferrer" className="border border-bone/30 text-bone px-6 py-3 font-sans text-xs tracking-widest uppercase hover:bg-bone hover:text-ink transition-colors">
                  Instagram
                </a>
              )}
              {artist.tiktok_url && (
                <a href={artist.tiktok_url} target="_blank" rel="noreferrer" className="border border-bone/30 text-bone px-6 py-3 font-sans text-xs tracking-widest uppercase hover:bg-bone hover:text-ink transition-colors">
                  TikTok
                </a>
              )}
            </div>
          </div>
          <div className="aspect-[3/4] overflow-hidden">
            {artist.photo_url && (
              <img src={artist.photo_url} alt={artist.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
            )}
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <p className="text-ink/70 font-sans font-light text-xl leading-relaxed">{artist.bio}</p>
          {artist.achievements?.length > 0 && (
            <div className="mt-16">
              <h2 className="text-ink font-serif text-3xl mb-8">Exhibitions & Achievements</h2>
              <ul className="space-y-4">
                {artist.achievements.map((a: { year: number; title: string }, idx: number) => (
                  <li key={idx} className="flex gap-6 border-b border-ink/10 pb-4">
                    <span className="text-gold font-sans text-sm font-medium w-12 flex-shrink-0">{a.year}</span>
                    <span className="text-ink/70 font-sans text-sm">{a.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Artworks */}
      {artworks.length > 0 && (
        <div className="bg-sand/30 py-20 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-ink font-serif text-5xl mb-12">Portfolio</h2>
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
              {artworks.map((artwork, idx) => (
                <ArtworkCard
                  key={artwork.id}
                  artwork={artwork}
                  onClick={(_artwork) => { /* lightbox not used on artist page */ }}
                  index={idx}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer settings={gallerySettings} />
    </div>
  )
}
