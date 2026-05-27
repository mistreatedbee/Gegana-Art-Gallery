import React from 'react';
import { motion } from 'framer-motion';
const testimonials = [
{
  quote:
  'Gegana Gallery has an unparalleled eye for emerging African talent. Their curation is both bold and deeply respectful of cultural narratives.',
  author: 'Elena Rostova',
  role: 'Private Collector'
},
{
  quote:
  "Working with their advisory team transformed my approach to collecting. They don't just sell art; they educate and build legacies.",
  author: 'Marcus Chen',
  role: 'Interior Architect'
},
{
  quote:
  'The Thandazani Ndlovu exhibition was a masterclass in spatial design and emotional resonance. Truly a museum-quality experience.',
  author: 'Sarah Jenkins',
  role: 'Art Critic'
}];

export function Testimonials() {
  return (
    <section className="bg-bone py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{
            opacity: 0,
            y: 24
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.8
          }}
          className="text-center mb-20">
          
          <span className="text-ink/50 font-sans text-xs tracking-[0.3em] uppercase block mb-6">
            Collector Perspectives
          </span>
          <h2 className="text-ink font-serif text-5xl md:text-6xl">
            Voices of Trust
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) =>
          <motion.div
            key={idx}
            initial={{
              opacity: 0,
              y: 30
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.8,
              delay: idx * 0.2
            }}
            className="bg-sand/30 border border-sand p-12 flex flex-col justify-between hover:bg-sand/50 transition-colors duration-500">
            
              <p className="text-ink/80 font-serif italic text-2xl leading-relaxed mb-12">
                "{item.quote}"
              </p>
              <div>
                <div className="text-ink font-sans text-sm font-medium tracking-widest uppercase mb-1">
                  {item.author}
                </div>
                <div className="text-ink/50 font-sans text-xs tracking-widest uppercase">
                  {item.role}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}