import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
export function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  return (
    <section
      id="home"
      className="relative min-h-screen bg-ink overflow-hidden flex items-center justify-center pt-20">
      
      {/* Background Parallax Artwork */}
      <motion.div
        style={{
          y: y1,
          opacity
        }}
        className="absolute inset-0 z-0 flex items-center justify-center opacity-40">
        
        <img
          src="https://images.unsplash.com/photo-1544413660-299165566b1d?auto=format&fit=crop&q=80&w=2000"
          alt="Abstract African Contemporary Art"
          className="w-full h-full object-cover object-center opacity-30" />
        
        <div className="absolute inset-0 bg-ink/60 mix-blend-multiply" />
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: 'easeInOut'
        }}
        className="absolute top-1/4 left-[10%] w-48 h-64 hidden lg:block z-10">
        
        <img
          src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600"
          alt="Artwork detail"
          className="w-full h-full object-cover shadow-2xl" />
        
      </motion.div>

      <motion.div
        style={{
          y: y2
        }}
        className="absolute bottom-1/4 right-[10%] w-64 h-80 hidden lg:block z-10">
        
        <img
          src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=600"
          alt="Artwork detail"
          className="w-full h-full object-cover shadow-2xl" />
        
      </motion.div>

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col items-center text-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 30
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1,
            delay: 0.2
          }}
          className="mb-6">
          
          <span className="text-bone/60 font-sans text-xs tracking-[0.3em] uppercase">
            Est. 2018 · Johannesburg
          </span>
        </motion.div>

        <motion.h1
          initial={{
            opacity: 0,
            y: 40
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1,
            delay: 0.4
          }}
          className="text-bone font-serif leading-[0.9] tracking-tight flex flex-col items-center">
          
          <span className="text-[clamp(4rem,10vw,11rem)] block">GEGANA</span>
          <span className="text-[clamp(4rem,10vw,11rem)] block italic pr-8 md:pr-24 text-sand">
            GALLERY
          </span>
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            duration: 1,
            delay: 0.8
          }}
          className="text-bone/80 font-sans font-light text-lg md:text-xl max-w-xl mt-8 mb-12">
          
          Curating African Art & Contemporary Expression
        </motion.p>

        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1,
            delay: 1
          }}
          className="flex flex-col sm:flex-row gap-6">
          
          <a
            href="#collection"
            className="bg-bone text-ink px-10 py-4 font-sans text-sm tracking-widest uppercase hover:bg-sand transition-colors">
            
            Explore Collection
          </a>
          <a
            href="#contact"
            className="border border-bone/30 text-bone px-10 py-4 font-sans text-sm tracking-widest uppercase hover:bg-bone/10 transition-colors">
            
            Contact Gallery
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        transition={{
          delay: 1.5,
          duration: 1
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20">
        
        <span className="text-bone/40 font-sans text-xs tracking-[0.2em] uppercase rotate-90 mb-8">
          Scroll
        </span>
        <div className="w-[1px] h-16 bg-bone/20 overflow-hidden">
          <motion.div
            animate={{
              y: ['-100%', '100%']
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: 'linear'
            }}
            className="w-full h-full bg-bone" />
          
        </div>
      </motion.div>
    </section>);

}