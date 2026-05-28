'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Artwork } from '@/types'
import { localMedia } from '@/lib/localMedia'

const CATEGORIES = ['All', 'Paintings', 'Abstract', 'African Art', 'Portraits', 'Contemporary', 'Mixed Media']

interface CollectionProps {
  artworks?: Artwork[]
}

export function Collection({ artworks }: CollectionProps) {
  const [activeFilter, setActiveFilter] = useState('All')

  const items = artworks?.length
    ? artworks
    : [
        { id: '1', title: 'Golden Hour', category: 'Portraits', image_url: localMedia.artworks.portraits[1] },
        { id: '2', title: 'Ancestral Lines', category: 'African Art', image_url: localMedia.artworks.africanArt[1] },
        { id: '3', title: 'Urban Chaos', category: 'Abstract', image_url: localMedia.artworks.abstract[0] },
        { id: '4', title: 'Silent Observer', category: 'Portraits', image_url: localMedia.artworks.portraits[2] },
        { id: '5', title: 'Texture Study I', category: 'Mixed Media', image_url: localMedia.artworks.mixedMedia[1] },
        { id: '6', title: 'Midnight Sun', category: 'Mixed Media', image_url: localMedia.artworks.mixedMedia[2] },
        { id: '7', title: 'The Gathering', category: 'African Art', image_url: localMedia.artworks.africanArt[2] },
        { id: '8', title: 'Form & Void', category: 'Mixed Media', image_url: localMedia.artworks.mixedMedia[3] },
      ]

  const filtered =
    activeFilter === 'All' ? items : items.filter((a) => (a as Artwork).category === activeFilter || (a as { category: string }).category === activeFilter)

  return (
    <section id="collection" className="bg-ink py-32 overflow-hidden">
      <div className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
            <h2 className="text-bone font-serif text-5xl md:text-7xl">The Collection</h2>
            <Link
              href="/collection"
              className="border-b border-bone/30 pb-1 font-sans text-sm tracking-widest uppercase text-bone/60 hover:text-gold hover:border-gold transition-colors whitespace-nowrap"
            >
              View All →
            </Link>
          </div>

          <div className="flex flex-wrap gap-4">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 rounded-full font-sans text-xs tracking-widest uppercase transition-all duration-300 border ${
                  activeFilter === category
                    ? 'bg-bone text-ink border-bone'
                    : 'bg-transparent text-bone/60 border-bone/20 hover:border-bone/60'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="w-full overflow-x-auto hide-scrollbar snap-x snap-mandatory pl-6 md:pl-12 pb-12">
        <motion.div layout className="flex gap-8 w-max pr-6 md:pr-12">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                key={item.id}
                className="relative w-[300px] md:w-[400px] aspect-[3/4] snap-center group cursor-pointer"
              >
                <Link
                  href={`/collection?category=${encodeURIComponent((item as { category?: string }).category || 'All')}`}
                  className="relative block h-full w-full"
                >
                  <Image
                    src={(item as { image_url: string }).image_url}
                    alt={(item as { title: string }).title}
                    fill
                    sizes="(min-width: 768px) 400px, 300px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <span className="text-gold font-sans text-xs tracking-widest uppercase mb-2">
                      {(item as { category?: string }).category}
                    </span>
                    <h3 className="text-bone font-serif text-2xl">{(item as { title: string }).title}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
