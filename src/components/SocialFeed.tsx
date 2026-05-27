import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle } from 'lucide-react';
const feedImages = [
'https://images.unsplash.com/photo-1544413660-299165566b1d?auto=format&fit=crop&q=80&w=400',
'https://images.unsplash.com/photo-1518998053401-b4391cb169cd?auto=format&fit=crop&q=80&w=400',
'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=400',
'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400',
'https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?auto=format&fit=crop&q=80&w=400',
'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&q=80&w=400',
'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&q=80&w=400',
'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&q=80&w=400'];

export function SocialFeed() {
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
          className="text-center mb-16">
          
          <h2 className="text-ink font-serif text-4xl md:text-5xl mb-8">
            Follow the Gallery
          </h2>
          <div className="flex justify-center gap-4">
            <a
              href="https://www.instagram.com/gegallery85?igsh=MW45Y3E1YmkzbmJnNw=="
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-ink text-bone px-6 py-2 rounded-full font-sans text-xs tracking-widest uppercase hover:bg-ink/80 transition-colors">
              
              @gegallery85
            </a>
            <a
              href="https://www.instagram.com/thandazanindlovuartist?igsh=MW41MTVxd3luZmw3Mw=="
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-ink/20 text-ink px-6 py-2 rounded-full font-sans text-xs tracking-widest uppercase hover:border-ink transition-colors">
              
              @thandazanindlovuartist
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-4">
          {feedImages.map((img, idx) =>
          <motion.a
            href="https://www.instagram.com/gegallery85?igsh=MW45Y3E1YmkzbmJnNw=="
            target="_blank"
            rel="noreferrer"
            key={idx}
            initial={{
              opacity: 0,
              scale: 0.95
            }}
            whileInView={{
              opacity: 1,
              scale: 1
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.5,
              delay: idx * 0.05
            }}
            className="relative aspect-square group overflow-hidden bg-sand">
            
              <img
              src={img}
              alt="Instagram post"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            
              <div className="absolute inset-0 bg-ink/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-bone">
                <div className="flex items-center gap-2">
                  <Heart size={20} fill="currentColor" />
                  <span className="font-sans text-sm">
                    {(Math.random() * 500 + 100).toFixed(0)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle size={20} fill="currentColor" />
                  <span className="font-sans text-sm">
                    {(Math.random() * 50 + 5).toFixed(0)}
                  </span>
                </div>
              </div>
            </motion.a>
          )}
        </div>
      </div>
    </section>);

}