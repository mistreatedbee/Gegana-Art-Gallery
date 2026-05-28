'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Instagram, MapPin, Phone, Mail } from 'lucide-react'
import type { GallerySettings } from '@/types'

interface ContactProps {
  settings?: GallerySettings | null
}

export function Contact({ settings }: ContactProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const phone = settings?.phone || '066 055 3939'
  const whatsapp = settings?.whatsapp_number || '27660553939'
  const email = settings?.email || 'hello@geganagallery.com'
  const address = settings?.address || 'Johannesburg, South Africa'
  const instagramUrl = settings?.instagram_gallery_url || 'https://www.instagram.com/gegallery85'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type: 'general' }),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="bg-ink py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold font-sans text-xs tracking-[0.3em] uppercase block mb-6">Inquiries</span>
          <h2 className="text-bone font-serif text-5xl md:text-7xl mb-12">Get in Touch</h2>

          <div className="space-y-8 text-bone/80 font-sans font-light">
            <div className="flex items-start gap-4">
              <MapPin className="text-gold mt-1" size={20} />
              <div>
                <p className="text-bone font-medium tracking-widest uppercase text-sm mb-1">Gallery Location</p>
                <p>{address}</p>
                <p className="text-sm opacity-60 mt-1">Visits by appointment only</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="text-gold mt-1" size={20} />
              <div>
                <p className="text-bone font-medium tracking-widest uppercase text-sm mb-1">Phone / WhatsApp</p>
                <p>{phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="text-gold mt-1" size={20} />
              <div>
                <p className="text-bone font-medium tracking-widest uppercase text-sm mb-1">Email</p>
                <p>{email}</p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex gap-4">
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 px-8 py-3 font-sans text-xs tracking-widest uppercase hover:bg-[#25D366] hover:text-ink transition-colors"
            >
              WhatsApp Us
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="border border-bone/20 text-bone p-3 hover:bg-bone hover:text-ink transition-colors flex items-center justify-center"
            >
              <Instagram size={18} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {status === 'success' ? (
            <div className="flex flex-col items-start justify-center h-full py-12">
              <div className="w-16 h-16 border border-gold flex items-center justify-center mb-8">
                <span className="text-gold text-2xl">✓</span>
              </div>
              <h3 className="text-bone font-serif text-3xl mb-4">Thank You</h3>
              <p className="text-bone/60 font-sans font-light">
                Your message has been received. We&apos;ll be in touch shortly.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-8 border-b border-bone/30 text-bone/60 font-sans text-sm tracking-widest uppercase hover:text-gold hover:border-gold transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="space-y-12" onSubmit={handleSubmit}>
              {(['name', 'email', 'subject'] as const).map((field) => (
                <div key={field} className="relative">
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    id={field}
                    placeholder=" "
                    required={field !== 'subject'}
                    value={form[field]}
                    onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                    className="block w-full bg-transparent border-b border-bone/20 py-4 text-bone font-sans focus:outline-none focus:border-gold peer"
                  />
                  <label
                    htmlFor={field}
                    className="absolute left-0 top-4 text-bone/50 font-sans text-sm tracking-widest uppercase transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-gold peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs"
                  >
                    {field === 'name' ? 'Your Name' : field === 'email' ? 'Email Address' : 'Subject'}
                  </label>
                </div>
              ))}

              <div className="relative">
                <textarea
                  id="message"
                  rows={4}
                  placeholder=" "
                  required
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="block w-full bg-transparent border-b border-bone/20 py-4 text-bone font-sans focus:outline-none focus:border-gold peer resize-none"
                />
                <label
                  htmlFor="message"
                  className="absolute left-0 top-4 text-bone/50 font-sans text-sm tracking-widest uppercase transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-gold peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs"
                >
                  Message
                </label>
              </div>

              {status === 'error' && (
                <p className="text-red-400 font-sans text-sm">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-bone text-ink py-4 font-sans text-sm tracking-widest uppercase hover:bg-sand transition-colors disabled:opacity-50"
              >
                {status === 'sending' ? 'Sending…' : 'Send Inquiry'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
