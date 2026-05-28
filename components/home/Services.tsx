'use client'

import { motion } from 'framer-motion'
import { Palette, Compass, Home, Presentation, Users, Sparkles } from 'lucide-react'

const services = [
  { icon: Palette, title: 'Art Sales', desc: 'Acquire museum-quality contemporary works.' },
  { icon: Compass, title: 'Art Consultation', desc: 'Expert guidance on building meaningful collections.' },
  { icon: Users, title: 'Collector Advisory', desc: 'Strategic acquisition and portfolio management.' },
  { icon: Home, title: 'Interior Art Placement', desc: 'Curating art for luxury residential and commercial spaces.' },
  { icon: Presentation, title: 'Exhibition Curation', desc: 'Designing immersive and narrative-driven showcases.' },
  { icon: Sparkles, title: 'Artist Representation', desc: 'Nurturing and elevating visionary African talent.' },
]

export function Services() {
  return (
    <section className="bg-ink py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <span className="text-gold font-sans text-xs tracking-[0.3em] uppercase block mb-6">Expertise</span>
          <h2 className="text-bone font-serif text-5xl md:text-6xl">Gallery Services</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group p-10 border border-bone/10 bg-bone/5 hover:bg-bone/10 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <Icon size={32} className="text-gold mb-8" strokeWidth={1.5} />
                <h3 className="text-bone font-serif text-2xl mb-4">{service.title}</h3>
                <p className="text-bone/60 font-sans font-light text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
