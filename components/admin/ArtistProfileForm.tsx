'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { ImageUploader } from './ImageUploader'
import type { Artist } from '@/types'

interface ArtistProfileFormProps {
  artist?: Artist | null
}

export function ArtistProfileForm({ artist }: ArtistProfileFormProps) {
  const [form, setForm] = useState({
    id: artist?.id || '',
    name: artist?.name || 'Thandazani Ndlovu',
    bio: artist?.bio || '',
    statement: artist?.statement || '',
    photo_url: artist?.photo_url || '',
    photo_public_id: artist?.photo_public_id || '',
    instagram_url: artist?.instagram_url || 'https://www.instagram.com/thandazanindlovuartist',
    tiktok_url: artist?.tiktok_url || 'https://www.tiktok.com/@thandazanindlovuartist',
    website_url: artist?.website_url || '',
    achievements: artist?.achievements || [],
  })
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  function set(field: string, value: string | { year: number; title: string }[]) {
    setForm((f) => ({ ...f, [field]: value }))
    setSuccess(false)
  }

  function addAchievement() {
    set('achievements', [...form.achievements, { year: new Date().getFullYear(), title: '' }])
  }

  function updateAchievement(idx: number, field: 'year' | 'title', value: string | number) {
    const updated = form.achievements.map((a, i) => i === idx ? { ...a, [field]: value } : a)
    set('achievements', updated)
  }

  function removeAchievement(idx: number) {
    set('achievements', form.achievements.filter((_: unknown, i: number) => i !== idx))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const res = await fetch('/api/artist-profile', {
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
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl">
      <div>
        <p className="text-bone/50 font-sans text-xs tracking-widest uppercase mb-3">Artist Photo</p>
        <ImageUploader
          currentUrl={form.photo_url}
          onUpload={(url, publicId) => { set('photo_url', url); set('photo_public_id', publicId) }}
          folder="gegana-artists"
        />
      </div>

      <div className="lg:col-span-2 space-y-5">
        <div className="bg-ink/40 border border-white/10 p-6 space-y-5">
          <h2 className="text-bone font-serif text-xl">Profile</h2>
          <Field label="Artist Name" id="name">
            <input id="name" required value={form.name} onChange={(e) => set('name', e.target.value)} className={inputClass} />
          </Field>
          <Field label="Biography" id="bio">
            <textarea id="bio" rows={5} value={form.bio} onChange={(e) => set('bio', e.target.value)} className={`${inputClass} resize-none`} placeholder="Artist biography…" />
          </Field>
          <Field label="Artist Statement" id="statement">
            <textarea id="statement" rows={3} value={form.statement} onChange={(e) => set('statement', e.target.value)} className={`${inputClass} resize-none`} placeholder='"Quote or statement…"' />
          </Field>
        </div>

        <div className="bg-ink/40 border border-white/10 p-6 space-y-4">
          <h2 className="text-bone font-serif text-xl">Social Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Instagram" id="instagram_url">
              <input id="instagram_url" value={form.instagram_url} onChange={(e) => set('instagram_url', e.target.value)} className={inputClass} />
            </Field>
            <Field label="TikTok" id="tiktok_url">
              <input id="tiktok_url" value={form.tiktok_url} onChange={(e) => set('tiktok_url', e.target.value)} className={inputClass} />
            </Field>
            <Field label="Website" id="website_url">
              <input id="website_url" value={form.website_url} onChange={(e) => set('website_url', e.target.value)} className={inputClass} />
            </Field>
          </div>
        </div>

        <div className="bg-ink/40 border border-white/10 p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-bone font-serif text-xl">Achievements / Exhibitions</h2>
            <button type="button" onClick={addAchievement} className="flex items-center gap-2 text-gold font-sans text-xs tracking-widest uppercase hover:text-gold/70 transition-colors">
              <Plus size={14} /> Add
            </button>
          </div>
          {form.achievements.map((a: { year: number; title: string }, idx: number) => (
            <div key={idx} className="flex gap-3 items-center">
              <input
                type="number"
                value={a.year}
                onChange={(e) => updateAchievement(idx, 'year', parseInt(e.target.value))}
                className="w-24 bg-ink/40 border border-white/10 text-bone font-sans text-sm px-3 py-2 focus:outline-none focus:border-gold"
              />
              <input
                value={a.title}
                onChange={(e) => updateAchievement(idx, 'title', e.target.value)}
                placeholder="Exhibition or achievement title…"
                className="flex-1 bg-ink/40 border border-white/10 text-bone font-sans text-sm px-3 py-2 focus:outline-none focus:border-gold placeholder:text-bone/20"
              />
              <button type="button" onClick={() => removeAchievement(idx)} className="text-bone/30 hover:text-red-400 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {form.achievements.length === 0 && (
            <p className="text-bone/30 font-sans text-sm">No achievements yet. Click Add to add one.</p>
          )}
        </div>

        {success && <p className="text-emerald-400 font-sans text-sm">Artist profile saved.</p>}

        <button type="submit" disabled={saving} className="bg-gold text-ink px-8 py-3 font-sans text-sm tracking-widest uppercase hover:bg-gold/80 disabled:opacity-50 transition-colors">
          {saving ? 'Saving…' : 'Save Artist Profile'}
        </button>
      </div>
    </form>
  )
}
