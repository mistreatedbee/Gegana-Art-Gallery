import React from 'react';
import { motion } from 'framer-motion';
const artworks = [
{
  id: 1,
  image:
  'https://images.unsplash.com/photo-1578301978693-85fa9c026f19?auto=format&fit=crop&q=80&w=800',
  artist: 'Thandazani Ndlovu',
  title: 'Echoes of the Ancestors',
  medium: 'Oil on Canvas',
  year: '2025',
  aspect: 'aspect-[3/4]'
},
{
  id: 2,
  image:
  'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&q=80&w=800',
  artist: 'Amina Diallo',
  title: 'Urban Rhythm',
  medium: 'Mixed Media',
  year: '2024',
  aspect: 'aspect-square'
},
{
  id: 3,
  image:
  'https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?auto=format&fit=crop&q=80&w=800',
  artist: 'Kwame Osei',
  title: 'Silent Observer',
  medium: 'Bronze Sculpture',
  year: '2026',
  aspect: 'aspect-[4/5]'
},
{
  id: 4,
  image:
  'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&q=80&w=800',
  artist: 'Zanele Mutwa',
  title: 'Abstract Landscapes II',
  medium: 'Acrylic on Linen',
  year: '2025',
  aspect: 'aspect-[16/9]'
},
{
  id: 5,
  image:
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800',
  artist: 'Thandazani Ndlovu',
  title: 'Midnight Sun',
  medium: 'Oil on Canvas',
  year: '2024',
  aspect: 'aspect-[3/4]'
}];

export function FeaturedArtworks() {
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
            once: true,
            margin: '-100px'
          }}
          transition={{
            duration: 0.8
          }}
          className="mb-20 max-w-2xl">
          
          <span className="text-ink/50 font-sans text-xs tracking-[0.3em] uppercase block mb-6">
            Curated Selection
          </span>
          <h2 className="text-ink font-serif text-5xl md:text-7xl leading-tight mb-8">
            Featured Artworks
          </h2>
          <p className="text-ink/70 font-sans font-light text-lg">
            Discover our carefully curated selection of contemporary African
            art, featuring established masters and emerging voices shaping the
            future of expression.
          </p>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {artworks.map((artwork, idx) =>
          <motion.div
            key={artwork.id}
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
              duration: 0.8,
              delay: idx * 0.1
            }}
            className="break-inside-avoid group cursor-pointer">
            
              <div
              className={`relative overflow-hidden mb-6 ${artwork.aspect} bg-sand/30`}>
              
                <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              
              </div>
              <div className="space-y-2">
                <span className="text-ink/60 font-sans text-xs tracking-widest uppercase">
                  {artwork.artist}
                </span>
                <h3 className="text-ink font-serif text-2xl italic">
                  {artwork.title}
                </h3>
                <div className="flex justify-between items-center text-ink/50 font-sans text-sm">
                  <span>
                    {artwork.medium}, {artwork.year}
                  </span>
                  <span className="text-ink opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Details →
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}