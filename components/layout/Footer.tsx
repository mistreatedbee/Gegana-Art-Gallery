'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { GallerySettings } from '@/types'

interface FooterProps {
  settings?: GallerySettings | null
}

export function Footer({ settings }: FooterProps) {
  const instagram = settings?.instagram_gallery_url || 'https://www.instagram.com/gegallery85'
  const artistInstagram = settings?.instagram_artist_url || 'https://www.instagram.com/thandazanindlovuartist'
  const tagline = settings?.footer_tagline || 'Curating African Art & Contemporary Expression. A premier destination for museum-quality collections.'

  return (
    <footer className="bg-ink border-t border-white/10 pt-20 pb-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-1">
            <h2 className="text-bone font-serif text-3xl tracking-widest uppercase mb-6">
              Gegana
            </h2>
            <p className="text-bone/50 font-sans font-light text-sm leading-relaxed">
              {tagline}
            </p>
          </div>

          <div>
            <h4 className="text-bone font-sans text-xs tracking-widest uppercase mb-6">Navigation</h4>
            <ul className="space-y-4">
              {[
                { label: 'Home', href: '/' },
                { label: 'Collection', href: '/collection' },
                { label: 'Artists', href: '/#artists' },
                { label: 'Exhibitions', href: '/#exhibitions' },
                { label: 'About', href: '/#about' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-bone/60 hover:text-bone font-sans text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-bone font-sans text-xs tracking-widest uppercase mb-6">Services</h4>
            <ul className="space-y-4">
              {['Art Advisory', 'Private Sales', 'Exhibition Curation', 'Terms of Service', 'Privacy Policy'].map(
                (link) => (
                  <li key={link}>
                    <a href="#" className="text-bone/60 hover:text-bone font-sans text-sm transition-colors">
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-bone font-sans text-xs tracking-widest uppercase mb-6">Newsletter</h4>
            <p className="text-bone/50 font-sans font-light text-sm mb-4">
              Subscribe to receive updates on new acquisitions and upcoming exhibitions.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-transparent border-b border-bone/20 py-2 text-bone font-sans text-sm focus:outline-none focus:border-gold placeholder:text-bone/30"
              />
              <button
                type="submit"
                className="absolute right-0 top-2 text-bone/50 hover:text-gold transition-colors"
              >
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-bone/40 font-sans text-xs tracking-widest uppercase">
          <p>© {new Date().getFullYear()} Gegana Gallery. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href={instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-bone transition-colors"
            >
              Gallery Instagram
            </a>
            <a
              href={artistInstagram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-bone transition-colors"
            >
              Artist Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
