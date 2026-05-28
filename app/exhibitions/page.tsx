import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { createServerDbClient } from '@/lib/db/server'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { localMedia } from '@/lib/localMedia'
import type { Exhibition, GallerySettings } from '@/types'

export const metadata: Metadata = {
  title: 'Exhibitions',
  description: 'Current and upcoming exhibitions at Gegana Gallery — contemporary African art in Johannesburg.',
}

function getStatus(ex: Exhibition): string {
  const now = new Date()
  const start = new Date(ex.start_date)
  const end = new Date(ex.end_date)
  if (now < start) return 'Upcoming'
  if (now > end) return 'Past'
  return 'Current'
}

const statusColor = {
  Current: 'bg-emerald-900/60 text-emerald-300',
  Upcoming: 'bg-gold/20 text-gold',
  Past: 'bg-white/10 text-bone/40',
}

export default async function ExhibitionsPage() {
  let exhibitions: Exhibition[] = []
  let gallerySettings: GallerySettings | null = null

  try {
    const db = await createServerDbClient()
    const [exRes, settingsRes] = await Promise.all([
      db.database.from('exhibitions').select('*').eq('is_active', true).order('start_date', { ascending: false }),
      db.database.from('gallery_settings').select('*').eq('id', 1).single(),
    ])
    exhibitions = exRes.data || []
    gallerySettings = settingsRes.data
  } catch {
    // DB not connected — show empty state
  }

  const current = exhibitions.filter((e) => getStatus(e) === 'Current')
  const upcoming = exhibitions.filter((e) => getStatus(e) === 'Upcoming')
  const past = exhibitions.filter((e) => getStatus(e) === 'Past')

  function ExhibitionGroup({ title, items }: { title: string; items: Exhibition[] }) {
    if (items.length === 0) return null
    return (
      <div className="mb-20">
        <h2 className="text-bone font-serif text-4xl mb-10">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((ex) => {
            const status = getStatus(ex)
            return (
              <div key={ex.id} className="group cursor-pointer flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden mb-6">
                  <Image
                    src={ex.image_url || localMedia.hero.background}
                    alt={ex.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`text-xs font-sans tracking-widest uppercase px-3 py-1 ${statusColor[status as keyof typeof statusColor] || ''}`}>
                      {status}
                    </span>
                  </div>
                </div>
                <div className="flex-grow flex flex-col">
                  <div className="text-gold font-sans text-xs tracking-widest uppercase mb-2">
                    {new Date(ex.start_date).toLocaleDateString('en-ZA', { month: 'short', day: 'numeric' }).toUpperCase()} —{' '}
                    {new Date(ex.end_date).toLocaleDateString('en-ZA', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}
                  </div>
                  <h3 className="text-bone font-serif text-2xl mb-2 group-hover:text-gold transition-colors">{ex.title}</h3>
                  <p className="text-bone/40 font-sans text-sm mb-4">{ex.location}</p>
                  <p className="text-bone/60 font-sans font-light text-sm leading-relaxed flex-grow">{ex.description}</p>
                  {status !== 'Past' && (
                    <Link
                      href="/#contact"
                      className="inline-flex items-center text-bone/60 font-sans text-xs tracking-widest uppercase border-b border-bone/20 pb-1 hover:text-gold hover:border-gold transition-colors mt-6 self-start"
                    >
                      Book Viewing →
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-ink min-h-screen text-bone">
      <Navbar />
      <div className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="text-bone/40 font-sans text-xs tracking-[0.3em] uppercase block mb-4">Programming</span>
            <h1 className="text-bone font-serif text-7xl md:text-9xl leading-[0.9]">Exhibitions</h1>
          </div>

          {exhibitions.length === 0 ? (
            <p className="text-bone/40 font-sans text-lg">No exhibitions listed yet. Check back soon.</p>
          ) : (
            <>
              <ExhibitionGroup title="Current" items={current} />
              <ExhibitionGroup title="Upcoming" items={upcoming} />
              <ExhibitionGroup title="Past Exhibitions" items={past} />
            </>
          )}
        </div>
      </div>
      <Footer settings={gallerySettings} />
    </div>
  )
}
