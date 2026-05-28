'use client'

import { useState } from 'react'
import type { Enquiry } from '@/types'
import { Download, ChevronDown } from 'lucide-react'

const STATUS_COLORS = {
  new: 'text-emerald-400 bg-emerald-900/30',
  contacted: 'text-amber-400 bg-amber-900/30',
  completed: 'text-bone/40 bg-white/5',
  archived: 'text-bone/20 bg-white/5',
}

interface EnquiriesManagerProps {
  enquiries: Enquiry[]
}

export function EnquiriesManager({ enquiries: initial }: EnquiriesManagerProps) {
  const [enquiries, setEnquiries] = useState(initial)
  const [filterStatus, setFilterStatus] = useState('all')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [notes, setNotes] = useState<Record<string, string>>({})

  const filtered = filterStatus === 'all' ? enquiries : enquiries.filter((e) => e.status === filterStatus)

  async function updateStatus(id: string, status: string) {
    const res = await fetch(`/api/enquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    if (res.ok) {
      setEnquiries((prev) => prev.map((e) => e.id === id ? { ...e, status: status as Enquiry['status'] } : e))
    }
  }

  async function saveNotes(id: string) {
    await fetch(`/api/enquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes: notes[id] }),
    })
    setEnquiries((prev) => prev.map((e) => e.id === id ? { ...e, notes: notes[id] } : e))
  }

  function exportCSV() {
    const rows = [
      ['Name', 'Email', 'Phone', 'Subject', 'Message', 'Artwork', 'Status', 'Date'],
      ...filtered.map((e) => [
        e.name, e.email, e.phone || '', e.type, e.message.replace(/,/g, ';'),
        e.artwork_title || '', e.status, new Date(e.created_at).toLocaleDateString(),
      ]),
    ]
    const csv = rows.map((r) => r.map((v) => `"${v}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `enquiries-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-6 items-center justify-between">
        <div className="flex gap-2">
          {['all', 'new', 'contacted', 'completed', 'archived'].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 font-sans text-xs tracking-widest uppercase border transition-colors ${
                filterStatus === s ? 'bg-gold text-ink border-gold' : 'border-white/20 text-bone/60 hover:border-gold/60'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 border border-white/20 text-bone/60 px-4 py-2 font-sans text-xs tracking-widest uppercase hover:border-gold/60 transition-colors"
        >
          <Download size={14} />
          Export CSV
        </button>
      </div>

      <div className="space-y-3">
        {filtered.map((enquiry) => (
          <div key={enquiry.id} className="bg-ink/40 border border-white/10">
            <div
              className="p-5 cursor-pointer flex justify-between items-start gap-4"
              onClick={() => setExpanded(expanded === enquiry.id ? null : enquiry.id)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <p className="text-bone font-sans font-medium">{enquiry.name}</p>
                  <span className={`text-xs font-sans tracking-widest uppercase px-2 py-0.5 rounded-sm ${STATUS_COLORS[enquiry.status]}`}>
                    {enquiry.status}
                  </span>
                  {enquiry.artwork_title && (
                    <span className="text-gold font-sans text-xs">Re: {enquiry.artwork_title}</span>
                  )}
                </div>
                <p className="text-bone/40 font-sans text-xs">{enquiry.email} · {enquiry.phone} · {new Date(enquiry.created_at).toLocaleDateString()}</p>
                <p className="text-bone/60 font-sans text-sm mt-2 truncate">{enquiry.message}</p>
              </div>
              <ChevronDown size={16} className={`text-bone/40 flex-shrink-0 transition-transform ${expanded === enquiry.id ? 'rotate-180' : ''}`} />
            </div>

            {expanded === enquiry.id && (
              <div className="px-5 pb-5 border-t border-white/5 pt-4 space-y-4">
                <p className="text-bone/70 font-sans text-sm leading-relaxed">{enquiry.message}</p>

                <div className="flex flex-wrap gap-2">
                  {(['new', 'contacted', 'completed', 'archived'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(enquiry.id, s)}
                      className={`px-4 py-2 font-sans text-xs tracking-widest uppercase border transition-colors ${
                        enquiry.status === s ? 'bg-gold/20 border-gold text-gold' : 'border-white/20 text-bone/50 hover:border-gold/40'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                  <a
                    href={`mailto:${enquiry.email}`}
                    className="px-4 py-2 font-sans text-xs tracking-widest uppercase border border-white/20 text-bone/50 hover:border-gold/40 transition-colors"
                  >
                    Reply by Email
                  </a>
                  {enquiry.phone && (
                    <a
                      href={`https://wa.me/${enquiry.phone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 font-sans text-xs tracking-widest uppercase border border-[#25D366]/40 text-[#25D366]/70 hover:border-[#25D366] transition-colors"
                    >
                      WhatsApp
                    </a>
                  )}
                </div>

                <div>
                  <p className="text-bone/40 font-sans text-xs tracking-widest uppercase mb-2">Internal Notes</p>
                  <textarea
                    rows={2}
                    value={notes[enquiry.id] ?? enquiry.notes ?? ''}
                    onChange={(e) => setNotes((n) => ({ ...n, [enquiry.id]: e.target.value }))}
                    placeholder="Add notes…"
                    className="w-full bg-ink/40 border border-white/10 text-bone font-sans text-sm px-4 py-3 focus:outline-none focus:border-gold resize-none placeholder:text-bone/20"
                  />
                  <button
                    onClick={() => saveNotes(enquiry.id)}
                    className="mt-2 bg-white/10 text-bone/60 px-4 py-2 font-sans text-xs tracking-widest uppercase hover:bg-white/20 transition-colors"
                  >
                    Save Notes
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-bone/30 font-sans text-sm">No enquiries found.</div>
        )}
      </div>
    </div>
  )
}
