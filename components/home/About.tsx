'use client'

import { motion } from 'framer-motion'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import type { HomepageSettings } from '@/types'

interface AboutProps {
  settings?: HomepageSettings | null
}

export function About({ settings }: AboutProps) {
  const stats = [
    { value: settings?.stats_artworks ?? 2400, suffix: '+', label: 'Artworks Sold' },
    { value: settings?.stats_exhibitions ?? 48, suffix: '', label: 'Exhibitions Hosted' },
    { value: settings?.stats_artists ?? 65, suffix: '', label: 'Artists Represented' },
    { value: settings?.stats_years ?? 12, suffix: '', label: 'Years Experience' },
  ]

  return (
    <section id="about" className="bg-sand py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="relative h-[60vh] lg:h-[80vh] lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="w-full h-full overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1518998053401-b4391cb169cd?auto=format&fit=crop&q=80&w=1200"
                alt="Gallery Interior"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          <div className="py-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-ink/50 font-sans text-xs tracking-[0.3em] uppercase block mb-6">
                Our Story
              </span>
              <h2 className="text-ink font-serif text-5xl md:text-6xl leading-tight mb-12">
                {settings?.about_heading || (
                  <>
                    Elevating African <br />
                    <span className="italic text-gold">Contemporary Art</span>
                  </>
                )}
              </h2>

              <div className="space-y-8 text-ink/80 font-sans font-light text-lg leading-relaxed">
                {settings?.about_body ? (
                  <p>{settings.about_body}</p>
                ) : (
                  <>
                    <p>
                      Founded in 2018, Gegana Gallery has established itself as a premier destination
                      for contemporary African art in Johannesburg. We believe in the power of visual
                      storytelling to bridge cultures and challenge perspectives.
                    </p>
                    <p>
                      Our mission is to provide a global platform for both established masters and
                      emerging talents from the continent and its diaspora. We curate exhibitions that
                      are not just visually stunning, but intellectually provocative.
                    </p>
                    <p>
                      For collectors, we offer an unparalleled advisory experience, guiding both
                      seasoned connoisseurs and new enthusiasts in building meaningful, museum-quality
                      collections that stand the test of time.
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-32 pt-16 border-t border-ink/10 grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="text-ink font-serif text-5xl md:text-6xl mb-4">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="w-12 h-[1px] bg-gold mx-auto mb-4" />
              <div className="text-ink/60 font-sans text-xs tracking-widest uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
