'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, X } from 'lucide-react'
import { localMedia } from '@/lib/localMedia'

export function VideoExperience() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center bg-ink">
      <div className="absolute inset-0 z-0 bg-ink">
        <video
          className="h-full w-full object-cover opacity-75"
          src={localMedia.video.walkthrough}
          poster={localMedia.video.poster}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/30 to-ink/55" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Play gallery walkthrough video"
          className="group relative w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center mb-8"
        >
          <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-white/5 rounded-full animate-ping opacity-20" />
          <Play size={40} className="text-bone ml-2 relative z-10" fill="currentColor" />
        </button>

        <p className="text-bone/60 font-sans text-xs tracking-[0.3em] uppercase mb-4">
          Gallery Walkthrough
        </p>
        <h3 className="text-bone font-serif text-4xl md:text-6xl italic tracking-wide drop-shadow-lg">
          Step inside the gallery
        </h3>
      </motion.div>

      {isOpen && (
        <div className="fixed inset-0 z-[90] bg-ink/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close gallery walkthrough video"
            className="absolute right-4 top-4 md:right-8 md:top-8 z-10 h-11 w-11 border border-bone/20 bg-bone/10 text-bone hover:bg-bone hover:text-ink transition-colors flex items-center justify-center"
          >
            <X size={22} />
          </button>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-6xl"
          >
            <video
              className="w-full max-h-[82vh] bg-black shadow-2xl"
              src={localMedia.video.walkthrough}
              poster={localMedia.video.poster}
              controls
              autoPlay
              playsInline
            />
          </motion.div>
        </div>
      )}
    </section>
  )
}
