'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Exhibition } from '@/types'
import { localMedia } from '@/lib/localMedia'

const FALLBACK: Exhibition[] = [
  { id: '1', title: 'Voices of the Soil', start_date: '2026-10-15', end_date: '2026-11-30', location: 'Main Gallery, Johannesburg', description: 'A group exhibition exploring our deep connection to the earth through contemporary sculpture and mixed media.', image_url: localMedia.artworks.africanArt[2], status: 'Current', is_active: true, sort_order: 1, created_at: '' },
  { id: '2', title: 'Thandazani Ndlovu: Retrospective', start_date: '2026-12-05', end_date: '2027-01-20', location: 'West Wing, Johannesburg', description: "An immersive journey through a decade of Ndlovu's groundbreaking work in abstract expressionism.", image_url: localMedia.artworks.portraits[3], status: 'Upcoming', is_active: true, sort_order: 2, created_at: '' },
  { id: '3', title: 'Urban Geometries', start_date: '2027-02-01', end_date: '2027-03-15', location: 'Project Space', description: 'Emerging artists interpreting the modern African metropolis through stark lines and bold colors.', image_url: localMedia.artworks.abstract[0], status: 'Upcoming', is_active: true, sort_order: 3, created_at: '' },
]

function getStatus(ex: Exhibition): string {
  if (ex.status) return ex.status
  const now = new Date()
  const start = new Date(ex.start_date)
  const end = new Date(ex.end_date)
  if (now < start) return 'Upcoming'
  if (now > end) return 'Past'
  return 'Current'
}

interface ExhibitionsProps {
  exhibitions?: Exhibition[]
}

export function Exhibitions({ exhibitions }: ExhibitionsProps) {
  const items = exhibitions?.length ? exhibitions : FALLBACK

  return (
    <section id="exhibitions" className="bg-bone py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8"
        >
          <div>
            <span className="text-ink/50 font-sans text-xs tracking-[0.3em] uppercase block mb-6">Programming</span>
            <h2 className="text-ink font-serif text-5xl md:text-7xl leading-tight">Exhibitions</h2>
          </div>
          <Link
            href="/exhibitions"
            className="border-b border-ink pb-1 font-sans text-sm tracking-widest uppercase hover:text-gold hover:border-gold transition-colors"
          >
            View All Exhibitions
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((exhibition, idx) => (
            <motion.div
              key={exhibition.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="group cursor-pointer flex flex-col h-full"
            >
              <div className="relative aspect-[4/3] overflow-hidden mb-8">
                <Image
                  src={exhibition.image_url || localMedia.hero.background}
                  alt={exhibition.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-500" />
                <div className="absolute top-4 left-4 bg-bone px-4 py-1 text-ink font-sans text-xs tracking-widest uppercase">
                  {getStatus(exhibition)}
                </div>
              </div>

              <div className="flex-grow flex flex-col">
                <div className="text-gold font-sans text-xs tracking-widest uppercase mb-3">
                  {new Date(exhibition.start_date).toLocaleDateString('en-ZA', { month: 'short', day: 'numeric' }).toUpperCase()} –{' '}
                  {new Date(exhibition.end_date).toLocaleDateString('en-ZA', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}
                </div>
                <h3 className="text-ink font-serif text-3xl mb-3 group-hover:text-gold transition-colors">
                  {exhibition.title}
                </h3>
                <div className="text-ink/50 font-sans text-sm mb-4">{exhibition.location}</div>
                <p className="text-ink/70 font-sans font-light text-sm leading-relaxed mb-8 flex-grow">
                  {exhibition.description}
                </p>
                <div className="mt-auto">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center text-ink font-sans text-xs tracking-widest uppercase border-b border-ink/20 pb-1 group-hover:border-ink transition-colors"
                  >
                    Book Viewing <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
