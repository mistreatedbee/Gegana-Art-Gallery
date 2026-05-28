'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Edit2, Trash2, Star } from 'lucide-react'
import type { Artwork } from '@/types'
import { formatPrice } from '@/lib/utils'

const availabilityColors = {
  Available: 'text-emerald-400 bg-emerald-900/30',
  Sold: 'text-red-400 bg-red-900/30',
  Reserved: 'text-amber-400 bg-amber-900/30',
}

interface ArtworksTableProps {
  artworks: Artwork[]
}

export function ArtworksTable({ artworks: initial }: ArtworksTableProps) {
  const [artworks, setArtworks] = useState(initial)
  const [search, setSearch] = useState('')

  const filtered = artworks.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.artist.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase())
  )

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    const res = await fetch(`/api/artworks/${id}`, { method: 'DELETE' })
    if (res.ok) setArtworks((prev) => prev.filter((a) => a.id !== id))
  }

  async function toggleFeatured(id: string, current: boolean) {
    const res = await fetch(`/api/artworks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_featured: !current }),
    })
    if (res.ok) {
      setArtworks((prev) => prev.map((a) => a.id === id ? { ...a, is_featured: !current } : a))
    }
  }

  return (
    <div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search artworks…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-ink/40 border border-white/10 text-bone font-sans text-sm px-4 py-3 w-full max-w-sm focus:outline-none focus:border-gold placeholder:text-bone/30"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-bone/40 font-sans text-xs tracking-widest uppercase text-left">
              <th className="pb-3 pr-4 w-16">Image</th>
              <th className="pb-3 pr-4">Title / Artist</th>
              <th className="pb-3 pr-4">Category</th>
              <th className="pb-3 pr-4">Price</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3 pr-4">Featured</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((artwork) => (
              <tr key={artwork.id} className="hover:bg-white/2 transition-colors">
                <td className="py-4 pr-4">
                  <div className="w-12 h-16 overflow-hidden">
                    <img src={artwork.image_url} alt={artwork.title} className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="py-4 pr-4">
                  <p className="text-bone font-sans font-medium">{artwork.title}</p>
                  <p className="text-bone/40 text-xs mt-0.5">{artwork.artist}</p>
                  <p className="text-bone/30 text-xs">{artwork.medium}, {artwork.year}</p>
                </td>
                <td className="py-4 pr-4 text-bone/60 font-sans">{artwork.category}</td>
                <td className="py-4 pr-4 text-bone/60 font-sans">{formatPrice(artwork.price, artwork.currency)}</td>
                <td className="py-4 pr-4">
                  <span className={`px-2 py-1 text-xs font-sans tracking-widest uppercase rounded-sm ${availabilityColors[artwork.availability]}`}>
                    {artwork.availability}
                  </span>
                </td>
                <td className="py-4 pr-4">
                  <button
                    onClick={() => toggleFeatured(artwork.id, artwork.is_featured)}
                    className={`transition-colors ${artwork.is_featured ? 'text-gold' : 'text-bone/20 hover:text-bone/60'}`}
                  >
                    <Star size={16} fill={artwork.is_featured ? 'currentColor' : 'none'} />
                  </button>
                </td>
                <td className="py-4">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/artworks/${artwork.id}`}
                      className="text-bone/60 hover:text-gold transition-colors"
                    >
                      <Edit2 size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(artwork.id, artwork.title)}
                      className="text-bone/60 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-bone/30 font-sans text-sm">
            {search ? 'No artworks match your search.' : 'No artworks yet. Add your first artwork above.'}
          </div>
        )}
      </div>
    </div>
  )
}
