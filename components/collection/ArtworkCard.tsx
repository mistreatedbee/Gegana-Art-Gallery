'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Artwork } from '@/types'
import { formatPrice } from '@/lib/utils'

interface ArtworkCardProps {
  artwork: Artwork
  onClick: (artwork: Artwork) => void
  index: number
}

const availabilityColors = {
  Available: 'bg-emerald-900/60 text-emerald-300 border-emerald-700/50',
  Sold: 'bg-red-900/60 text-red-300 border-red-700/50',
  Reserved: 'bg-amber-900/60 text-amber-300 border-amber-700/50',
}

export function ArtworkCard({ artwork, onClick, index }: ArtworkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.07 }}
      onClick={() => onClick(artwork)}
      className="group cursor-pointer break-inside-avoid"
    >
      <div className="relative overflow-hidden aspect-[3/4] bg-sand/20 mb-4">
        <Image
          src={artwork.image_url}
          alt={artwork.title}
          fill
          priority={index === 0}
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-6">
          <span className="text-bone font-sans text-xs tracking-widest uppercase opacity-80">
            Click to view details
          </span>
        </div>
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-sans tracking-widest uppercase px-3 py-1 border backdrop-blur-sm ${availabilityColors[artwork.availability]}`}>
            {artwork.availability}
          </span>
        </div>
      </div>
      <div className="space-y-1">
        <span className="text-ink/50 font-sans text-xs tracking-widest uppercase block">
          {artwork.artist}
        </span>
        <h3 className="text-ink font-serif text-xl italic leading-tight">{artwork.title}</h3>
        <div className="flex justify-between items-center">
          <span className="text-ink/60 font-sans text-sm">
            {artwork.medium}, {artwork.year}
          </span>
          <span className="text-gold font-sans text-sm font-medium">
            {formatPrice(artwork.price, artwork.currency)}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
