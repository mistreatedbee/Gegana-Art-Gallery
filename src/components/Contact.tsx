import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, MapPin, Phone, Mail } from 'lucide-react';
export function Contact() {
  return (
    <section id="contact" className="bg-ink py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Left: Info */}
        <motion.div
          initial={{
            opacity: 0,
            x: -30
          }}
          whileInView={{
            opacity: 1,
            x: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.8
          }}>
          
          <span className="text-gold font-sans text-xs tracking-[0.3em] uppercase block mb-6">
            Inquiries
          </span>
          <h2 className="text-bone font-serif text-5xl md:text-7xl mb-12">
            Get in Touch
          </h2>

          <div className="space-y-8 text-bone/80 font-sans font-light">
            <div className="flex items-start gap-4">
              <MapPin className="text-gold mt-1" size={20} />
              <div>
                <p className="text-bone font-medium tracking-widest uppercase text-sm mb-1">
                  Gallery Location
                </p>
                <p>Johannesburg, South Africa</p>
                <p className="text-sm opacity-60 mt-1">
                  Visits by appointment only
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="text-gold mt-1" size={20} />
              <div>
                <p className="text-bone font-medium tracking-widest uppercase text-sm mb-1">
                  Phone / WhatsApp
                </p>
                <p>066 055 3939</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="text-gold mt-1" size={20} />
              <div>
                <p className="text-bone font-medium tracking-widest uppercase text-sm mb-1">
                  Email
                </p>
                <p>hello@geganagallery.com</p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex gap-4">
            <a
              href="https://wa.me/27660553939"
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 px-8 py-3 font-sans text-xs tracking-widest uppercase hover:bg-[#25D366] hover:text-ink transition-colors">
              
              WhatsApp Us
            </a>
            <a
              href="https://www.instagram.com/gegallery85?igsh=MW45Y3E1YmkzbmJnNw=="
              target="_blank"
              rel="noreferrer"
              className="border border-bone/20 text-bone p-3 hover:bg-bone hover:text-ink transition-colors flex items-center justify-center">
              
              <Instagram size={18} />
            </a>
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div
          initial={{
            opacity: 0,
            x: 30
          }}
          whileInView={{
            opacity: 1,
            x: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.8,
            delay: 0.2
          }}>
          
          <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <input
                type="text"
                id="name"
                placeholder=" "
                className="block w-full bg-transparent border-b border-bone/20 py-4 text-bone font-sans focus:outline-none focus:border-gold peer" />
              
              <label
                htmlFor="name"
                className="absolute left-0 top-4 text-bone/50 font-sans text-sm tracking-widest uppercase transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-gold peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs">
                
                Your Name
              </label>
            </div>

            <div className="relative">
              <input
                type="email"
                id="email"
                placeholder=" "
                className="block w-full bg-transparent border-b border-bone/20 py-4 text-bone font-sans focus:outline-none focus:border-gold peer" />
              
              <label
                htmlFor="email"
                className="absolute left-0 top-4 text-bone/50 font-sans text-sm tracking-widest uppercase transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-gold peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs">
                
                Email Address
              </label>
            </div>

            <div className="relative">
              <input
                type="text"
                id="subject"
                placeholder=" "
                className="block w-full bg-transparent border-b border-bone/20 py-4 text-bone font-sans focus:outline-none focus:border-gold peer" />
              
              <label
                htmlFor="subject"
                className="absolute left-0 top-4 text-bone/50 font-sans text-sm tracking-widest uppercase transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-gold peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs">
                
                Subject
              </label>
            </div>

            <div className="relative">
              <textarea
                id="message"
                rows={4}
                placeholder=" "
                className="block w-full bg-transparent border-b border-bone/20 py-4 text-bone font-sans focus:outline-none focus:border-gold peer resize-none" />
              
              <label
                htmlFor="message"
                className="absolute left-0 top-4 text-bone/50 font-sans text-sm tracking-widest uppercase transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-gold peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs">
                
                Message
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-bone text-ink py-4 font-sans text-sm tracking-widest uppercase hover:bg-sand transition-colors">
              
              Send Inquiry
            </button>
          </form>
        </motion.div>
      </div>
    </section>);

}