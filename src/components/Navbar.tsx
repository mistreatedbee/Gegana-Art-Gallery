import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Menu, X } from 'lucide-react';
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [
  'Home',
  'Collection',
  'Artists',
  'Exhibitions',
  'About',
  'Contact'];

  return (
    <>
      <motion.nav
        initial={{
          y: -100
        }}
        animate={{
          y: 0
        }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1]
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-ink/80 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6'}`}>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <a
            href="#"
            className="text-bone font-serif text-2xl tracking-widest uppercase">
            
            Gegana
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex space-x-8">
              {navLinks.map((link) =>
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-bone/80 hover:text-bone text-sm font-sans tracking-widest uppercase transition-colors">
                
                  {link}
                </a>
              )}
            </div>
            <div className="flex items-center space-x-6 pl-8 border-l border-white/20">
              <a
                href="https://www.instagram.com/gegallery85?igsh=MW45Y3E1YmkzbmJnNw=="
                target="_blank"
                rel="noreferrer"
                className="text-bone/80 hover:text-bone transition-colors">
                
                <Instagram size={18} />
              </a>
              <button className="border border-gold text-gold hover:bg-gold hover:text-ink px-6 py-2 text-sm font-sans tracking-widest uppercase transition-all duration-300">
                Book Consultation
              </button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-bone p-2"
            onClick={() => setMobileMenuOpen(true)}>
            
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen &&
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          className="fixed inset-0 z-[60] bg-ink flex flex-col justify-center items-center">
          
            <button
            className="absolute top-6 right-6 text-bone p-4"
            onClick={() => setMobileMenuOpen(false)}>
            
              <X size={32} />
            </button>
            <div className="flex flex-col items-center space-y-8">
              {navLinks.map((link, i) =>
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: i * 0.1
              }}
              className="text-bone font-serif text-4xl tracking-wider">
              
                  {link}
                </motion.a>
            )}
              <motion.button
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: navLinks.length * 0.1
              }}
              className="mt-8 border border-gold text-gold px-8 py-3 text-sm font-sans tracking-widest uppercase">
              
                Book Consultation
              </motion.button>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </>);

}