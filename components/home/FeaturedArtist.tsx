'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Artist } from '@/types'
import { localMedia } from '@/lib/localMedia'

interface FeaturedArtistProps {
  artist?: Artist | null
}

export function FeaturedArtist({ artist }: FeaturedArtistProps) {
  const name = artist?.name || 'Thandazani Ndlovu'
  const bio = artist?.bio || "Ndlovu's work explores the intersection of traditional African mythology and modern urban existence. Through bold strokes and profound textures, he creates a visual language that speaks to identity, displacement, and spiritual grounding."
  const statement = artist?.statement || '"My canvas is a bridge between the ancestors we\'ve forgotten and the futures we are yet to build."'
  const photo = artist?.photo_url || localMedia.artist.portrait
  const instagramUrl = artist?.instagram_url || 'https://www.instagram.com/thandazanindlovuartist?igsh=MW41MTVxd3luZmw3Mw=='
  const tiktokUrl = artist?.tiktok_url || 'https://www.tiktok.com/@thandazanindlovuartist?_r=1&_t=ZS-96hoo6r6WJD'

  const nameParts = name.split(' ')
  const firstName = nameParts.slice(0, -1).join(' ') || name
  const lastName = nameParts[nameParts.length - 1] || ''

  return (
    <section id="artists" className="bg-ink text-bone py-32 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={photo}
                alt={name}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-earth/20 blur-3xl rounded-full -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 lg:pt-32"
          >
            <span className="text-gold font-sans text-xs tracking-[0.3em] uppercase block mb-6">
              Featured Artist
            </span>
            <h2 className="font-serif text-6xl md:text-8xl leading-[0.85] mb-8">
              {firstName} <br />
              <span className="italic text-bone/60">{lastName}</span>
            </h2>

            <p className="font-sans font-light text-bone/70 text-lg leading-relaxed mb-12">{bio}</p>

            {statement && (
              <blockquote className="border-l-2 border-gold pl-6 mb-12">
                <p className="font-serif italic text-2xl text-bone/90">{statement}</p>
              </blockquote>
            )}

            <div className="flex gap-6">
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-bone/30 text-bone px-8 py-3 font-sans text-xs tracking-widest uppercase hover:bg-bone hover:text-ink transition-colors"
                >
                  Instagram
                </a>
              )}
              {tiktokUrl && (
                <a
                  href={tiktokUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-bone/30 text-bone px-8 py-3 font-sans text-xs tracking-widest uppercase hover:bg-bone hover:text-ink transition-colors"
                >
                  TikTok
                </a>
              )}
            </div>
          </motion.div>
        </div>

        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          {localMedia.artist.signatureWorks.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="relative aspect-square overflow-hidden group"
            >
              <Image
                src={img}
                alt="Signature Artwork"
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
