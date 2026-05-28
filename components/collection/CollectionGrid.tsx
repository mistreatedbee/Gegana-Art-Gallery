'use client'

import { useState, useMemo } from 'react'
import { ArtworkCard } from './ArtworkCard'
import { ArtworkModal } from './ArtworkModal'
import type { Artwork } from '@/types'

interface CollectionGridProps {
  artworks: Artwork[]
  searchParams: { category?: string; sort?: string; availability?: string }
  whatsappNumber?: string
}

export function CollectionGrid({ artworks, searchParams, whatsappNumber }: CollectionGridProps) {
  const [selected, setSelected] = useState<Artwork | null>(null)

  const filtered = useMemo(() => {
    let result = [...artworks]
    const cat = searchParams.category

    if (cat && cat !== 'All') {
      if (cat === 'Sold' || cat === 'Available' || cat === 'Reserved') {
        result = result.filter((a) => a.availability === cat)
      } else {
        result = result.filter((a) => a.category === cat)
      }
    }

    switch (searchParams.sort) {
      case 'oldest': result.sort((a, b) => a.year - b.year); break
      case 'available': result.sort((a) => (a.availability === 'Available' ? -1 : 1)); break
      case 'price_asc': result.sort((a, b) => (a.price || 0) - (b.price || 0)); break
      case 'price_desc': result.sort((a, b) => (b.price || 0) - (a.price || 0)); break
      default: result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    }

    return result
  }, [artworks, searchParams])

  if (filtered.length === 0) {
    return (
      <div className="py-32 text-center">
        <p className="text-ink/40 font-serif text-3xl italic mb-4">No artworks found</p>
        <p className="text-ink/40 font-sans text-sm">Try a different filter or check back soon.</p>
      </div>
    )
  }

  return (
    <>
      <p className="text-ink/40 font-sans text-xs tracking-widest uppercase mb-8">
        {filtered.length} {filtered.length === 1 ? 'work' : 'works'}
      </p>

      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
        {filtered.map((artwork, idx) => (
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
            onClick={setSelected}
            index={idx}
          />
        ))}
      </div>

      <ArtworkModal
        artwork={selected}
        onClose={() => setSelected(null)}
        whatsappNumber={whatsappNumber}
      />
    </>
  )
}
