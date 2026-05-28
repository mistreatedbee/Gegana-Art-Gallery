'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import type { Collection } from '@/types'

interface CollectionsManagerProps {
  collections: Collection[]
  artworks: { id: string; title: string; artist: string; image_url: string }[]
}

export function CollectionsManager({ collections: initial, artworks }: CollectionsManagerProps) {
  const [collections, setCollections] = useState(initial)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ name: '', description: '', is_active: true })
  const [saving, setSaving] = useState(false)

  async function add() {
    if (!form.name) return
    setSaving(true)
    const res = await fetch('/api/collections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      const { data } = await res.json()
      setCollections((prev) => [...prev, data])
      setForm({ name: '', description: '', is_active: true })
      setAdding(false)
    }
    setSaving(false)
  }

  async function remove(id: string, name: string) {
    if (!confirm(`Delete collection "${name}"?`)) return
    const res = await fetch(`/api/collections/${id}`, { method: 'DELETE' })
    if (res.ok) setCollections((prev) => prev.filter((c) => c.id !== id))
  }

  const inputClass = "w-full bg-ink/40 border border-white/10 text-bone font-sans text-sm px-4 py-3 focus:outline-none focus:border-gold placeholder:text-bone/30"

  return (
    <div className="space-y-4">
      <button
        onClick={() => setAdding(!adding)}
        className="flex items-center gap-2 bg-gold text-ink px-6 py-3 font-sans text-sm tracking-widest uppercase hover:bg-gold/80 transition-colors"
      >
        <Plus size={16} /> New Collection
      </button>

      {adding && (
        <div className="bg-ink/40 border border-white/10 p-6 space-y-4">
          <h3 className="text-bone font-serif text-xl">New Collection</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-bone/50 font-sans text-xs tracking-widest uppercase mb-2">Collection Name</label>
              <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={inputClass} placeholder="e.g. Thandazani 2025" />
            </div>
            <div>
              <label className="block text-bone/50 font-sans text-xs tracking-widest uppercase mb-2">Description</label>
              <input value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className={inputClass} placeholder="Optional description" />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={add} disabled={saving} className="bg-gold text-ink px-6 py-3 font-sans text-sm tracking-widest uppercase hover:bg-gold/80 disabled:opacity-50">
              {saving ? 'Creating…' : 'Create Collection'}
            </button>
            <button onClick={() => setAdding(false)} className="border border-white/20 text-bone/60 px-6 py-3 font-sans text-sm tracking-widest uppercase">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {collections.map((col) => (
          <div key={col.id} className="bg-ink/40 border border-white/10 p-5 flex justify-between items-center">
            <div>
              <p className="text-bone font-sans font-medium">{col.name}</p>
              {col.description && <p className="text-bone/40 font-sans text-sm mt-1">{col.description}</p>}
              <p className="text-bone/30 font-sans text-xs mt-1">/{col.slug}</p>
            </div>
            <button
              onClick={() => remove(col.id, col.name)}
              className="text-bone/30 hover:text-red-400 transition-colors p-2"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {collections.length === 0 && !adding && (
          <div className="text-center py-16 text-bone/30 font-sans text-sm">No collections yet.</div>
        )}
      </div>

      {artworks.length > 0 && (
        <div className="bg-ink/40 border border-white/10 p-5 mt-6">
          <h3 className="text-bone font-serif text-lg mb-3">All Artworks ({artworks.length})</h3>
          <p className="text-bone/40 font-sans text-sm">
            Artworks are filterable by category on the public collection page. Collections provide named groupings for curation.
          </p>
        </div>
      )}
    </div>
  )
}
