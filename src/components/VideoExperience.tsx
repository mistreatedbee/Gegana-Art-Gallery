import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
export function VideoExperience() {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1518998053401-b4391cb169cd?auto=format&fit=crop&q=80&w=2000"
          alt="Gallery Walkthrough"
          className="w-full h-full object-cover" />
        
        <div className="absolute inset-0 bg-ink/40" />
      </div>

      {/* Play Button & Content */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9
        }}
        whileInView={{
          opacity: 1,
          scale: 1
        }}
        viewport={{
          once: true
        }}
        transition={{
          duration: 0.8
        }}
        className="relative z-10 flex flex-col items-center">
        
        <button className="group relative w-32 h-32 rounded-full flex items-center justify-center mb-8">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-white/5 rounded-full animate-ping opacity-20" />
          <Play
            size={40}
            className="text-bone ml-2 relative z-10"
            fill="currentColor" />
          
        </button>

        <h3 className="text-bone font-serif text-4xl md:text-5xl italic tracking-wide drop-shadow-lg">
          Step inside the gallery
        </h3>
      </motion.div>
    </section>);

}