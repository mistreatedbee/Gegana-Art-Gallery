import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const categories = [
'All',
'Paintings',
'Abstract',
'African Art',
'Sculptures',
'Contemporary',
'Mixed Media'];

const collection = [
{
  id: 1,
  title: 'Golden Hour',
  category: 'Paintings',
  image:
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=600'
},
{
  id: 2,
  title: 'Form & Void',
  category: 'Sculptures',
  image:
  'https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?auto=format&fit=crop&q=80&w=600'
},
{
  id: 3,
  title: 'Ancestral Lines',
  category: 'African Art',
  image:
  'https://images.unsplash.com/photo-1544413660-299165566b1d?auto=format&fit=crop&q=80&w=600'
},
{
  id: 4,
  title: 'Urban Chaos',
  category: 'Abstract',
  image:
  'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&q=80&w=600'
},
{
  id: 5,
  title: 'Silent Observer',
  category: 'Contemporary',
  image:
  'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&q=80&w=600'
},
{
  id: 6,
  title: 'Texture Study I',
  category: 'Mixed Media',
  image:
  'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600'
},
{
  id: 7,
  title: 'Midnight Sun',
  category: 'Paintings',
  image:
  'https://images.unsplash.com/photo-1578301978693-85fa9c026f19?auto=format&fit=crop&q=80&w=600'
},
{
  id: 8,
  title: 'The Gathering',
  category: 'African Art',
  image:
  'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&q=80&w=600'
}];

export function Collection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filteredCollection =
  activeFilter === 'All' ?
  collection :
  collection.filter((item) => item.category === activeFilter);
  return (
    <section id="collection" className="bg-ink py-32 overflow-hidden">
      <div className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
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
          }}>
          
          <h2 className="text-bone font-serif text-5xl md:text-7xl mb-12">
            The Collection
          </h2>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            {categories.map((category) =>
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-full font-sans text-xs tracking-widest uppercase transition-all duration-300 border ${activeFilter === category ? 'bg-bone text-ink border-bone' : 'bg-transparent text-bone/60 border-bone/20 hover:border-bone/60'}`}>
              
                {category}
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Horizontal Scroll Gallery */}
      <div className="w-full overflow-x-auto hide-scrollbar snap-x snap-mandatory pl-6 md:pl-12 pb-12">
        <motion.div layout className="flex gap-8 w-max pr-6 md:pr-12">
          <AnimatePresence mode="popLayout">
            {filteredCollection.map((item) =>
            <motion.div
              layout
              initial={{
                opacity: 0,
                scale: 0.9
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              exit={{
                opacity: 0,
                scale: 0.9
              }}
              transition={{
                duration: 0.5
              }}
              key={item.id}
              className="relative w-[300px] md:w-[400px] aspect-[3/4] snap-center group cursor-pointer">
              
                <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <span className="text-gold font-sans text-xs tracking-widest uppercase mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-bone font-serif text-2xl">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>);

}