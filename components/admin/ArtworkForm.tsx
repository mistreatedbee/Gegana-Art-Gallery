'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ImageUploader } from './ImageUploader'
import type { Artwork } from '@/types'

interface ArtworkFormProps {
  artwork?: Artwork | null
}

const CATEGORIES = ['Paintings', 'Abstract', 'African Art', 'Portraits', 'Contemporary', 'Mixed Media']

const emptyForm = {
  title: '', artist: 'Thandazani Ndlovu', medium: '', size: '', year: new Date().getFullYear(),
  category: 'Paintings', price: '', currency: 'ZAR', availability: 'Available' as const,
  description: '', image_url: '', image_public_id: '', is_featured: false,
}

export function ArtworkForm({ artwork }: ArtworkFormProps) {
  const router = useRouter()
  const [form, setForm] = useState({
    ...emptyForm,
    ...(artwork ? {
      title: artwork.title, artist: artwork.artist, medium: artwork.medium,
      size: artwork.size || '', year: artwork.year, category: artwork.category,
      price: artwork.price?.toString() || '', currency: artwork.currency,
      availability: artwork.availability, description: artwork.description || '',
      image_url: artwork.image_url, image_public_id: artwork.image_public_id || '',
      is_featured: artwork.is_featured,
    } : {}),
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function set(field: string, value: string | number | boolean) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.image_url) { setError('Please upload an artwork image.'); return }
    setSaving(true)
    setError('')

    const payload = {
      ...form,
      year: parseInt(String(form.year)),
      price: form.price ? parseFloat(form.price) : null,
    }

    const url = artwork ? `/api/artworks/${artwork.id}` : '/api/artworks'
    const method = artwork ? 'PATCH' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Save failed')
      router.push('/admin/artworks')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
      setSaving(false)
    }
  }

  const Field = ({ label, id, children }: { label: string; id: string; children: React.ReactNode }) => (
    <div>
      <label htmlFor={id} className="block text-bone/50 font-sans text-xs tracking-widest uppercase mb-2">{label}</label>
      {children}
    </div>
  )

  const inputClass = "w-full bg-ink/40 border border-white/10 text-bone font-sans text-sm px-4 py-3 focus:outline-none focus:border-gold placeholder:text-bone/30"
  const selectClass = "w-full bg-ink/40 border border-white/10 text-bone font-sans text-sm px-4 py-3 focus:outline-none focus:border-gold"

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Image */}
      <div className="lg:col-span-1">
        <p className="text-bone/50 font-sans text-xs tracking-widest uppercase mb-3">Artwork Image</p>
        <ImageUploader
          currentUrl={form.image_url}
          onUpload={(url, publicId) => { set('image_url', url); set('image_public_id', publicId) }}
          folder="gegana-artworks"
        />
      </div>

      {/* Fields */}
      <div className="lg:col-span-2 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Title *" id="title">
            <input id="title" required value={form.title} onChange={(e) => set('title', e.target.value)} className={inputClass} placeholder="Artwork title" />
          </Field>
          <Field label="Artist *" id="artist">
            <input id="artist" required value={form.artist} onChange={(e) => set('artist', e.target.value)} className={inputClass} placeholder="Artist name" />
          </Field>
          <Field label="Medium *" id="medium">
            <input id="medium" required value={form.medium} onChange={(e) => set('medium', e.target.value)} className={inputClass} placeholder="e.g. Oil on Canvas" />
          </Field>
          <Field label="Size" id="size">
            <input id="size" value={form.size} onChange={(e) => set('size', e.target.value)} className={inputClass} placeholder="e.g. 120 x 90 cm" />
          </Field>
          <Field label="Year *" id="year">
            <input id="year" type="number" required min={1800} max={2100} value={form.year} onChange={(e) => set('year', e.target.value)} className={inputClass} />
          </Field>
          <Field label="Category *" id="category">
            <select id="category" value={form.category} onChange={(e) => set('category', e.target.value)} className={selectClass}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Price (leave empty for POA)" id="price">
            <div className="flex">
              <select value={form.currency} onChange={(e) => set('currency', e.target.value)} className="bg-ink/40 border border-white/10 text-bone font-sans text-sm px-3 focus:outline-none border-r-0">
                <option value="ZAR">ZAR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
              <input type="number" id="price" min={0} step={500} value={form.price} onChange={(e) => set('price', e.target.value)} className={`${inputClass} flex-1`} placeholder="45000" />
            </div>
          </Field>
          <Field label="Availability *" id="availability">
            <select id="availability" value={form.availability} onChange={(e) => set('availability', e.target.value as 'Available' | 'Sold' | 'Reserved')} className={selectClass}>
              <option value="Available">Available</option>
              <option value="Reserved">Reserved</option>
              <option value="Sold">Sold</option>
            </select>
          </Field>
        </div>

        <Field label="Description" id="description">
          <textarea id="description" rows={4} value={form.description} onChange={(e) => set('description', e.target.value)} className={`${inputClass} resize-none`} placeholder="Describe the artwork…" />
        </Field>

        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={form.is_featured} onChange={(e) => set('is_featured', e.target.checked)} className="w-4 h-4 accent-gold" />
          <span className="text-bone/70 font-sans text-sm">Feature on homepage</span>
        </label>

        {error && <p className="text-red-400 font-sans text-sm">{error}</p>}

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-gold text-ink px-8 py-3 font-sans text-sm tracking-widest uppercase hover:bg-gold/80 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving…' : artwork ? 'Save Changes' : 'Add Artwork'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="border border-white/20 text-bone/60 px-8 py-3 font-sans text-sm tracking-widest uppercase hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}
