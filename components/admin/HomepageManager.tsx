'use client'

import { useState } from 'react'
import { ImageUploader } from './ImageUploader'
import type { HomepageSettings } from '@/types'

interface HomepageManagerProps {
  settings?: HomepageSettings | null
  artworks: { id: string; title: string; artist: string; image_url: string }[]
}

export function HomepageManager({ settings, artworks }: HomepageManagerProps) {
  const [form, setForm] = useState({
    hero_title: settings?.hero_title || 'GEGANA',
    hero_subtitle: settings?.hero_subtitle || 'GALLERY',
    hero_tagline: settings?.hero_tagline || 'Curating African Art & Contemporary Expression',
    hero_image_url: settings?.hero_image_url || '',
    hero_image_public_id: settings?.hero_image_public_id || '',
    about_heading: settings?.about_heading || 'Elevating African Contemporary Art',
    about_body: settings?.about_body || '',
    stats_artworks: settings?.stats_artworks || 2400,
    stats_exhibitions: settings?.stats_exhibitions || 48,
    stats_artists: settings?.stats_artists || 65,
    stats_years: settings?.stats_years || 12,
    featured_artwork_ids: settings?.featured_artwork_ids || [],
  })
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  function set(field: string, value: string | number | string[]) {
    setForm((f) => ({ ...f, [field]: value }))
    setSuccess(false)
  }

  function toggleFeatured(id: string) {
    setForm((f) => ({
      ...f,
      featured_artwork_ids: f.featured_artwork_ids.includes(id)
        ? f.featured_artwork_ids.filter((x: string) => x !== id)
        : [...f.featured_artwork_ids, id].slice(0, 6),
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const res = await fetch('/api/homepage', {
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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="bg-ink/40 border border-white/10 p-6 space-y-5">
        <h2 className="text-bone font-serif text-xl">Hero Section</h2>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Hero Title" id="hero_title">
            <input id="hero_title" value={form.hero_title} onChange={(e) => set('hero_title', e.target.value)} className={inputClass} />
          </Field>
          <Field label="Hero Subtitle (italic)" id="hero_subtitle">
            <input id="hero_subtitle" value={form.hero_subtitle} onChange={(e) => set('hero_subtitle', e.target.value)} className={inputClass} />
          </Field>
        </div>
        <Field label="Tagline" id="hero_tagline">
          <input id="hero_tagline" value={form.hero_tagline} onChange={(e) => set('hero_tagline', e.target.value)} className={inputClass} />
        </Field>
        <div>
          <p className="text-bone/50 font-sans text-xs tracking-widest uppercase mb-3">Hero Background Image (optional)</p>
          <ImageUploader
            currentUrl={form.hero_image_url}
            onUpload={(url, publicId) => { set('hero_image_url', url); set('hero_image_public_id', publicId) }}
            folder="gegana-hero"
          />
        </div>
      </div>

      <div className="bg-ink/40 border border-white/10 p-6 space-y-5">
        <h2 className="text-bone font-serif text-xl">About Section</h2>
        <Field label="Heading" id="about_heading">
          <input id="about_heading" value={form.about_heading} onChange={(e) => set('about_heading', e.target.value)} className={inputClass} />
        </Field>
        <Field label="Body Text" id="about_body">
          <textarea id="about_body" rows={4} value={form.about_body} onChange={(e) => set('about_body', e.target.value)} className={`${inputClass} resize-none`} placeholder="Leave empty to use the default gallery description…" />
        </Field>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Artworks Sold', key: 'stats_artworks' },
            { label: 'Exhibitions', key: 'stats_exhibitions' },
            { label: 'Artists', key: 'stats_artists' },
            { label: 'Years', key: 'stats_years' },
          ].map(({ label, key }) => (
            <div key={key}>
              <label className="block text-bone/40 font-sans text-xs tracking-widest uppercase mb-2">{label}</label>
              <input
                type="number"
                value={form[key as keyof typeof form] as number}
                onChange={(e) => set(key, parseInt(e.target.value))}
                className={inputClass}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-ink/40 border border-white/10 p-6">
        <h2 className="text-bone font-serif text-xl mb-4">Featured Artworks (up to 6)</h2>
        <p className="text-bone/40 font-sans text-xs mb-4">{form.featured_artwork_ids.length}/6 selected</p>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 max-h-80 overflow-y-auto">
          {artworks.map((a) => {
            const selected = form.featured_artwork_ids.includes(a.id)
            return (
              <button
                type="button"
                key={a.id}
                onClick={() => toggleFeatured(a.id)}
                className={`relative overflow-hidden aspect-square border-2 transition-colors ${selected ? 'border-gold' : 'border-transparent hover:border-white/30'}`}
              >
                <img src={a.image_url} alt={a.title} className="w-full h-full object-cover" />
                {selected && (
                  <div className="absolute inset-0 bg-gold/30 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center text-ink font-bold text-xs">✓</div>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {success && <p className="text-emerald-400 font-sans text-sm">Homepage settings saved.</p>}

      <button type="submit" disabled={saving} className="bg-gold text-ink px-8 py-3 font-sans text-sm tracking-widest uppercase hover:bg-gold/80 disabled:opacity-50 transition-colors">
        {saving ? 'Saving…' : 'Save Homepage Settings'}
      </button>
    </form>
  )
}
