import React from 'react';
import { motion } from 'framer-motion';
const exhibitions = [
{
  id: 1,
  title: 'Voices of the Soil',
  date: 'OCT 15 - NOV 30, 2026',
  location: 'Main Gallery, Johannesburg',
  description:
  'A group exhibition exploring our deep connection to the earth through contemporary sculpture and mixed media.',
  image:
  'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&q=80&w=800',
  status: 'Current'
},
{
  id: 2,
  title: 'Thandazani Ndlovu: Retrospective',
  date: 'DEC 05 - JAN 20, 2027',
  location: 'West Wing, Johannesburg',
  description:
  "An immersive journey through a decade of Ndlovu's groundbreaking work in abstract expressionism.",
  image:
  'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=800',
  status: 'Upcoming'
},
{
  id: 3,
  title: 'Urban Geometries',
  date: 'FEB 01 - MAR 15, 2027',
  location: 'Project Space',
  description:
  'Emerging artists interpreting the modern African metropolis through stark lines and bold colors.',
  image:
  'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?auto=format&fit=crop&q=80&w=800',
  status: 'Upcoming'
}];

export function Exhibitions() {
  return (
    <section id="exhibitions" className="bg-bone py-32 px-6 md:px-12">
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
            once: true,
            margin: '-100px'
          }}
          transition={{
            duration: 0.8
          }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          
          <div>
            <span className="text-ink/50 font-sans text-xs tracking-[0.3em] uppercase block mb-6">
              Programming
            </span>
            <h2 className="text-ink font-serif text-5xl md:text-7xl leading-tight">
              Exhibitions
            </h2>
          </div>
          <a
            href="#"
            className="border-b border-ink pb-1 font-sans text-sm tracking-widest uppercase hover:text-gold hover:border-gold transition-colors">
            
            View Past Exhibitions
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {exhibitions.map((exhibition, idx) =>
          <motion.div
            key={exhibition.id}
            initial={{
              opacity: 0,
              y: 30
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true,
              margin: '-50px'
            }}
            transition={{
              duration: 0.8,
              delay: idx * 0.2
            }}
            className="group cursor-pointer flex flex-col h-full">
            
              <div className="relative aspect-[4/3] overflow-hidden mb-8">
                <img
                src={exhibition.image}
                alt={exhibition.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-500" />
                <div className="absolute top-4 left-4 bg-bone px-4 py-1 text-ink font-sans text-xs tracking-widest uppercase">
                  {exhibition.status}
                </div>
              </div>

              <div className="flex-grow flex flex-col">
                <div className="text-gold font-sans text-xs tracking-widest uppercase mb-3">
                  {exhibition.date}
                </div>
                <h3 className="text-ink font-serif text-3xl mb-3 group-hover:text-gold transition-colors">
                  {exhibition.title}
                </h3>
                <div className="text-ink/50 font-sans text-sm mb-4">
                  {exhibition.location}
                </div>
                <p className="text-ink/70 font-sans font-light text-sm leading-relaxed mb-8 flex-grow">
                  {exhibition.description}
                </p>
                <div className="mt-auto">
                  <span className="inline-flex items-center text-ink font-sans text-xs tracking-widest uppercase border-b border-ink/20 pb-1 group-hover:border-ink transition-colors">
                    Book Viewing <span className="ml-2">→</span>
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}