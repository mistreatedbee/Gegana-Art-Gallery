'use client'

import { useState } from 'react'
import { Trash2, Check, X, Plus } from 'lucide-react'
import type { Testimonial } from '@/types'

interface TestimonialsManagerProps {
  testimonials: Testimonial[]
}

const empty = { quote: '', author: '', role: '', is_approved: false }

export function TestimonialsManager({ testimonials: initial }: TestimonialsManagerProps) {
  const [items, setItems] = useState(initial)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)

  async function toggle(id: string, is_approved: boolean) {
    const res = await fetch(`/api/testimonials/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_approved }),
    })
    if (res.ok) setItems((prev) => prev.map((t) => t.id === id ? { ...t, is_approved } : t))
  }

  async function remove(id: string) {
    if (!confirm('Delete this testimonial?')) return
    const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' })
    if (res.ok) setItems((prev) => prev.filter((t) => t.id !== id))
  }

  async function save() {
    if (!form.quote || !form.author) return
    setSaving(true)
    const res = await fetch('/api/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      const { data } = await res.json()
      setItems((prev) => [...prev, data])
      setForm(empty)
      setAdding(false)
    }
    setSaving(false)
  }

  const inputClass = "w-full bg-ink/40 border border-white/10 text-bone font-sans text-sm px-4 py-3 focus:outline-none focus:border-gold placeholder:text-bone/30"

  return (
    <div className="space-y-4">
      <button
        onClick={() => setAdding(!adding)}
        className="flex items-center gap-2 bg-gold text-ink px-6 py-3 font-sans text-sm tracking-widest uppercase hover:bg-gold/80 transition-colors"
      >
        <Plus size={16} /> Add Testimonial
      </button>

      {adding && (
        <div className="bg-ink/40 border border-white/10 p-6 space-y-4">
          <h3 className="text-bone font-serif text-xl">New Testimonial</h3>
          <textarea
            rows={3}
            placeholder="Quote…"
            value={form.quote}
            onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))}
            className={`${inputClass} resize-none`}
          />
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="Author name" value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} className={inputClass} />
            <input placeholder="Role / Title" value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} className={inputClass} />
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.is_approved} onChange={(e) => setForm((f) => ({ ...f, is_approved: e.target.checked }))} className="w-4 h-4 accent-gold" />
            <span className="text-bone/70 font-sans text-sm">Approve immediately</span>
          </label>
          <div className="flex gap-3">
            <button onClick={save} disabled={saving} className="bg-gold text-ink px-6 py-3 font-sans text-sm tracking-widest uppercase hover:bg-gold/80 disabled:opacity-50 transition-colors">
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button onClick={() => setAdding(false)} className="border border-white/20 text-bone/60 px-6 py-3 font-sans text-sm tracking-widest uppercase hover:bg-white/5">
              Cancel
            </button>
          </div>
        </div>
      )}

      {items.map((t) => (
        <div key={t.id} className="bg-ink/40 border border-white/10 p-5 flex gap-4">
          <div className="flex-1">
            <p className="text-bone/80 font-serif italic text-lg mb-2">&ldquo;{t.quote}&rdquo;</p>
            <p className="text-bone/60 font-sans text-sm">{t.author}{t.role && ` · ${t.role}`}</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => toggle(t.id, !t.is_approved)}
              className={`p-2 transition-colors ${t.is_approved ? 'text-emerald-400 bg-emerald-900/30' : 'text-bone/30 bg-white/5 hover:text-emerald-400'}`}
              title={t.is_approved ? 'Approved — click to unapprove' : 'Click to approve'}
            >
              {t.is_approved ? <Check size={16} /> : <X size={16} />}
            </button>
            <button onClick={() => remove(t.id)} className="p-2 text-bone/30 hover:text-red-400 transition-colors">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}

      {items.length === 0 && !adding && (
        <div className="text-center py-16 text-bone/30 font-sans text-sm">No testimonials yet.</div>
      )}
    </div>
  )
}
