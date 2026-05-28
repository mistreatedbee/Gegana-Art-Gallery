import { Suspense } from 'react'
import type { Metadata } from 'next'
import { createServerDbClient } from '@/lib/db/server'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FilterBar } from '@/components/collection/FilterBar'
import { CollectionGrid } from '@/components/collection/CollectionGrid'
import { fallbackCollectionArtworks } from '@/lib/localMedia'
import type { Artwork, GallerySettings } from '@/types'

export const metadata: Metadata = {
  title: 'Collection',
  description: 'Explore the full Gegana Gallery collection - contemporary African art by Thandazani Ndlovu and more. Filter by category, availability, and price.',
}

interface PageProps {
  searchParams: { category?: string; sort?: string; availability?: string }
}

export default async function CollectionPage({ searchParams }: PageProps) {
  let artworks: Artwork[] = []
  let gallerySettings: GallerySettings | null = null

  try {
    const db = await createServerDbClient()
    const [settingsRes, artworksRes] = await Promise.all([
      db.database.from('gallery_settings').select('*').eq('id', 1).single(),
      db.database.from('artworks').select('*').order('created_at', { ascending: false }),
    ])
    gallerySettings = settingsRes.data
    artworks = artworksRes.data || []
  } catch {
    // DB not connected yet - show local gallery assets.
  }

  if (artworks.length === 0) {
    artworks = fallbackCollectionArtworks
  }

  return (
    <div className="bg-bone min-h-screen text-ink selection:bg-gold selection:text-ink">
      <Navbar />

      <div className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-ink/50 font-sans text-xs tracking-[0.3em] uppercase block mb-4">
              Works
            </span>
            <h1 className="text-ink font-serif text-6xl md:text-8xl leading-[0.9] mb-6">
              The Collection
            </h1>
            <p className="text-ink/60 font-sans font-light text-lg max-w-xl">
              Contemporary African art curated with intention. Enquire about any work to begin a conversation.
            </p>
          </div>

          <Suspense>
            <FilterBar />
          </Suspense>

          <Suspense fallback={<div className="text-ink/40 font-sans text-sm py-20 text-center">Loading collection...</div>}>
            <CollectionGrid
              artworks={artworks}
              searchParams={searchParams}
              whatsappNumber={gallerySettings?.whatsapp_number}
            />
          </Suspense>
        </div>
      </div>

      <Footer settings={gallerySettings} />
    </div>
  )
}
