'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import type { Artwork } from '@/types'
import { formatPrice } from '@/lib/utils'

interface ArtworkModalProps {
  artwork: Artwork | null
  onClose: () => void
  whatsappNumber?: string
}

const availabilityStyles = {
  Available: 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50',
  Sold: 'bg-red-900/60 text-red-300 border border-red-700/50',
  Reserved: 'bg-amber-900/60 text-amber-300 border border-amber-700/50',
}

export function ArtworkModal({ artwork, onClose, whatsappNumber = '27660553939' }: ArtworkModalProps) {
  if (!artwork) return null

  const whatsappMessage = `Hello, I'm interested in "${artwork.title}" by ${artwork.artist}. Could you please provide more details?`

  return (
    <AnimatePresence>
      {artwork && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/90 backdrop-blur-sm z-[70]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] overflow-y-auto flex items-center justify-center p-4 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-bone max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 text-ink/60 hover:text-ink transition-colors p-2"
              >
                <X size={24} />
              </button>

              {/* Image */}
              <div className="aspect-[3/4] md:aspect-auto overflow-hidden">
                <img
                  src={artwork.image_url}
                  alt={artwork.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="mb-6">
                    <span className={`inline-block text-xs font-sans tracking-widest uppercase px-3 py-1 mb-4 ${availabilityStyles[artwork.availability]}`}>
                      {artwork.availability}
                    </span>
                    <p className="text-ink/50 font-sans text-xs tracking-widest uppercase mb-2">{artwork.artist}</p>
                    <h2 className="text-ink font-serif text-3xl italic leading-tight mb-2">{artwork.title}</h2>
                    <p className="text-gold font-sans text-sm tracking-widest uppercase">{artwork.category}</p>
                  </div>

                  <dl className="grid grid-cols-2 gap-4 mb-8 text-sm">
                    <div>
                      <dt className="text-ink/50 font-sans text-xs tracking-widest uppercase mb-1">Medium</dt>
                      <dd className="text-ink font-sans">{artwork.medium}</dd>
                    </div>
                    {artwork.size && (
                      <div>
                        <dt className="text-ink/50 font-sans text-xs tracking-widest uppercase mb-1">Size</dt>
                        <dd className="text-ink font-sans">{artwork.size}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-ink/50 font-sans text-xs tracking-widest uppercase mb-1">Year</dt>
                      <dd className="text-ink font-sans">{artwork.year}</dd>
                    </div>
                    <div>
                      <dt className="text-ink/50 font-sans text-xs tracking-widest uppercase mb-1">Price</dt>
                      <dd className="text-gold font-sans font-medium">
                        {formatPrice(artwork.price, artwork.currency)}
                      </dd>
                    </div>
                  </dl>

                  {artwork.description && (
                    <p className="text-ink/70 font-sans font-light text-sm leading-relaxed mb-8">
                      {artwork.description}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  {artwork.availability !== 'Sold' && (
                    <>
                      <a
                        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="block w-full bg-[#25D366] text-white text-center py-4 font-sans text-sm tracking-widest uppercase hover:bg-[#1ebe5d] transition-colors"
                      >
                        WhatsApp Enquiry
                      </a>
                      <a
                        href={`/#contact`}
                        onClick={onClose}
                        className="block w-full border border-ink text-ink text-center py-4 font-sans text-sm tracking-widest uppercase hover:bg-ink hover:text-bone transition-colors"
                      >
                        Send Enquiry
                      </a>
                    </>
                  )}
                  {artwork.availability === 'Sold' && (
                    <a
                      href="/#contact"
                      onClick={onClose}
                      className="block w-full border border-ink/30 text-ink/50 text-center py-4 font-sans text-sm tracking-widest uppercase"
                    >
                      Contact About Similar Works
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
