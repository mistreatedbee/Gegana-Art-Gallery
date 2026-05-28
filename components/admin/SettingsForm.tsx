'use client'

import { useState } from 'react'
import type { GallerySettings } from '@/types'

interface SettingsFormProps {
  settings?: GallerySettings | null
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const [form, setForm] = useState({
    gallery_name: settings?.gallery_name || 'Gegana Gallery',
    phone: settings?.phone || '066 055 3939',
    whatsapp_number: settings?.whatsapp_number || '27660553939',
    email: settings?.email || 'hello@geganagallery.com',
    address: settings?.address || 'Johannesburg, South Africa',
    instagram_gallery_url: settings?.instagram_gallery_url || 'https://www.instagram.com/gegallery85',
    instagram_artist_url: settings?.instagram_artist_url || 'https://www.instagram.com/thandazanindlovuartist',
    tiktok_url: settings?.tiktok_url || 'https://www.tiktok.com/@thandazanindlovuartist',
    footer_tagline: settings?.footer_tagline || '',
  })
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
    setSuccess(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const res = await fetch('/api/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    if (res.ok) setSuccess(true)
  }

  const inputClass = "w-full bg-ink/40 border border-white/10 text-bone font-sans text-sm px-4 py-3 focus:outline-none focus:border-gold placeholder:text-bone/30"

  const Field = ({ label, id, children }: { label: string; id: string; children: React.ReactNode }) => (
    <div>
      <label htmlFor={id} className="block text-bone/50 font-sans text-xs tracking-widest uppercase mb-2">{label}</label>
      {children}
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="bg-ink/40 border border-white/10 p-6 space-y-5">
        <h2 className="text-bone font-serif text-xl mb-4">Gallery Info</h2>
        <Field label="Gallery Name" id="gallery_name">
          <input id="gallery_name" value={form.gallery_name} onChange={(e) => set('gallery_name', e.target.value)} className={inputClass} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Phone" id="phone">
            <input id="phone" value={form.phone} onChange={(e) => set('phone', e.target.value)} className={inputClass} />
          </Field>
          <Field label="WhatsApp Number (with country code)" id="whatsapp_number">
            <input id="whatsapp_number" value={form.whatsapp_number} onChange={(e) => set('whatsapp_number', e.target.value)} className={inputClass} placeholder="27660553939" />
          </Field>
        </div>
        <Field label="Email" id="email">
          <input type="email" id="email" value={form.email} onChange={(e) => set('email', e.target.value)} className={inputClass} />
        </Field>
        <Field label="Address" id="address">
          <input id="address" value={form.address} onChange={(e) => set('address', e.target.value)} className={inputClass} />
        </Field>
      </div>

      <div className="bg-ink/40 border border-white/10 p-6 space-y-5">
        <h2 className="text-bone font-serif text-xl mb-4">Social Links</h2>
        <Field label="Gallery Instagram URL" id="instagram_gallery_url">
          <input id="instagram_gallery_url" value={form.instagram_gallery_url} onChange={(e) => set('instagram_gallery_url', e.target.value)} className={inputClass} />
        </Field>
        <Field label="Artist Instagram URL" id="instagram_artist_url">
          <input id="instagram_artist_url" value={form.instagram_artist_url} onChange={(e) => set('instagram_artist_url', e.target.value)} className={inputClass} />
        </Field>
        <Field label="TikTok URL" id="tiktok_url">
          <input id="tiktok_url" value={form.tiktok_url} onChange={(e) => set('tiktok_url', e.target.value)} className={inputClass} />
        </Field>
      </div>

      <div className="bg-ink/40 border border-white/10 p-6 space-y-5">
        <h2 className="text-bone font-serif text-xl mb-4">Footer</h2>
        <Field label="Tagline" id="footer_tagline">
          <textarea id="footer_tagline" rows={2} value={form.footer_tagline} onChange={(e) => set('footer_tagline', e.target.value)} className={`${inputClass} resize-none`} />
        </Field>
      </div>

      {success && <p className="text-emerald-400 font-sans text-sm">Settings saved successfully.</p>}

      <button type="submit" disabled={saving} className="bg-gold text-ink px-8 py-3 font-sans text-sm tracking-widest uppercase hover:bg-gold/80 disabled:opacity-50 transition-colors">
        {saving ? 'Saving…' : 'Save Settings'}
      </button>
    </form>
  )
}
