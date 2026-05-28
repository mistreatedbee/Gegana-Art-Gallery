'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Artwork } from '@/types'
import { fallbackArtworks } from '@/lib/localMedia'

interface FeaturedArtworksProps {
  artworks?: Artwork[]
}

export function FeaturedArtworks({ artworks }: FeaturedArtworksProps) {
  const items = artworks?.length
    ? artworks.map((a) => ({
        id: a.id,
        image: a.image_url,
        artist: a.artist,
        title: a.title,
        medium: a.medium,
        year: a.year,
        aspect: 'aspect-[3/4]',
        price: a.price,
        currency: a.currency,
        availability: a.availability,
      }))
    : fallbackArtworks

  return (
    <section className="bg-bone py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-20 max-w-2xl"
        >
          <span className="text-ink/50 font-sans text-xs tracking-[0.3em] uppercase block mb-6">
            Curated Selection
          </span>
          <h2 className="text-ink font-serif text-5xl md:text-7xl leading-tight mb-8">
            Featured Artworks
          </h2>
          <p className="text-ink/70 font-sans font-light text-lg">
            Discover our carefully curated selection of contemporary African art, featuring established masters and emerging voices shaping the future of expression.
          </p>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {items.map((artwork, idx) => (
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="break-inside-avoid group cursor-pointer"
            >
              <Link href={`/collection?highlight=${artwork.id}`}>
                <div className={`relative overflow-hidden mb-6 ${artwork.aspect} bg-sand/30`}>
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-ink/60 font-sans text-xs tracking-widest uppercase">
                    {artwork.artist}
                  </span>
                  <h3 className="text-ink font-serif text-2xl italic">{artwork.title}</h3>
                  <div className="flex justify-between items-center text-ink/50 font-sans text-sm">
                    <span>
                      {artwork.medium}, {artwork.year}
                    </span>
                    <span className="text-ink opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <Link
            href="/collection"
            className="inline-block border border-ink/30 text-ink px-12 py-4 font-sans text-sm tracking-widest uppercase hover:bg-ink hover:text-bone transition-colors duration-300"
          >
            View Full Collection
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
