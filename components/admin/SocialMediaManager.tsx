'use client'

import { useState } from 'react'
import { RefreshCw, Eye, EyeOff, Star, Trash2, Plus } from 'lucide-react'
import type { SocialPost } from '@/types'

interface SocialMediaManagerProps {
  posts: SocialPost[]
  tokens: { account_handle: string; expires_at: string }[]
}

export function SocialMediaManager({ posts: initial, tokens }: SocialMediaManagerProps) {
  const [posts, setPosts] = useState(initial)
  const [platform, setPlatform] = useState<'all' | 'instagram' | 'tiktok'>('all')
  const [account, setAccount] = useState<string>('all')
  const [refreshing, setRefreshing] = useState<string | null>(null)
  const [tiktokUrls, setTiktokUrls] = useState('')
  const [addingTiktok, setAddingTiktok] = useState(false)
  const [addingTiktokLoading, setAddingTiktokLoading] = useState(false)

  const galleryToken = tokens.find((t) => t.account_handle === 'gegallery85')
  const artistToken = tokens.find((t) => t.account_handle === 'thandazanindlovuartist')

  const filtered = posts.filter((p) => {
    if (platform !== 'all' && p.platform !== platform) return false
    if (account !== 'all' && p.account_handle !== account) return false
    return true
  })

  async function refresh(handle: string) {
    setRefreshing(handle)
    const res = await fetch('/api/social/instagram/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ handle }),
    })
    const data = await res.json()
    if (res.ok) alert(`Refreshed ${data.count} posts from @${handle}`)
    else alert(data.error || 'Refresh failed')
    setRefreshing(null)
  }

  async function toggle(id: string, field: 'is_visible' | 'is_featured', current: boolean) {
    const res = await fetch(`/api/social/posts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: !current }),
    })
    if (res.ok) setPosts((prev) => prev.map((p) => p.id === id ? { ...p, [field]: !current } : p))
  }

  async function remove(id: string) {
    if (!confirm('Remove this post?')) return
    const res = await fetch(`/api/social/posts/${id}`, { method: 'DELETE' })
    if (res.ok) setPosts((prev) => prev.filter((p) => p.id !== id))
  }

  async function addTiktokPosts() {
    const urls = tiktokUrls.split('\n').map((u) => u.trim()).filter(Boolean)
    if (urls.length === 0) return
    setAddingTiktokLoading(true)
    const res = await fetch('/api/social/tiktok', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ urls }),
    })
    const data = await res.json()
    if (res.ok) {
      alert(`Added ${data.count} TikTok posts.`)
      setTiktokUrls('')
      setAddingTiktok(false)
      window.location.reload()
    } else {
      alert(data.error || 'Failed to add TikTok posts')
    }
    setAddingTiktokLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { handle: 'gegallery85', label: 'Gallery Instagram', token: galleryToken },
          { handle: 'thandazanindlovuartist', label: 'Artist Instagram', token: artistToken },
          { handle: null, label: 'TikTok', token: null },
        ].map(({ handle, label, token }) => (
          <div key={label} className="bg-ink/40 border border-white/10 p-4">
            <p className="text-bone/50 font-sans text-xs tracking-widest uppercase mb-2">{label}</p>
            {token ? (
              <div>
                <p className="text-emerald-400 font-sans text-sm mb-1">Connected</p>
                <p className="text-bone/30 font-sans text-xs">Expires: {new Date(token.expires_at).toLocaleDateString()}</p>
              </div>
            ) : handle ? (
              <div>
                <p className="text-amber-400 font-sans text-sm mb-1">Not connected</p>
                <p className="text-bone/30 font-sans text-xs">Add token via INSTAGRAM_*_ACCESS_TOKEN env var</p>
              </div>
            ) : (
              <div>
                <p className="text-bone/60 font-sans text-sm mb-1">Manual curation</p>
                <p className="text-bone/30 font-sans text-xs">Paste TikTok URLs below</p>
              </div>
            )}
            {handle && (
              <button
                onClick={() => refresh(handle)}
                disabled={refreshing === handle}
                className="flex items-center gap-2 mt-3 text-gold font-sans text-xs tracking-widest uppercase hover:text-gold/70 transition-colors disabled:opacity-50"
              >
                <RefreshCw size={12} className={refreshing === handle ? 'animate-spin' : ''} />
                {refreshing === handle ? 'Refreshing…' : 'Refresh Posts'}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add TikTok Posts */}
      <div className="bg-ink/40 border border-white/10 p-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-bone font-serif text-lg">Add TikTok Videos</h3>
          <button onClick={() => setAddingTiktok(!addingTiktok)} className="flex items-center gap-2 text-gold font-sans text-xs tracking-widest uppercase">
            <Plus size={14} /> Add URLs
          </button>
        </div>
        {addingTiktok && (
          <div className="space-y-3">
            <textarea
              rows={4}
              value={tiktokUrls}
              onChange={(e) => setTiktokUrls(e.target.value)}
              placeholder="Paste TikTok video URLs, one per line&#10;https://www.tiktok.com/@thandazanindlovuartist/video/..."
              className="w-full bg-ink/60 border border-white/10 text-bone font-sans text-sm px-4 py-3 focus:outline-none focus:border-gold resize-none placeholder:text-bone/20"
            />
            <div className="flex gap-3">
              <button
                onClick={addTiktokPosts}
                disabled={addingTiktokLoading}
                className="bg-gold text-ink px-6 py-2 font-sans text-xs tracking-widest uppercase hover:bg-gold/80 disabled:opacity-50"
              >
                {addingTiktokLoading ? 'Adding…' : 'Fetch & Add'}
              </button>
              <button onClick={() => setAddingTiktok(false)} className="border border-white/20 text-bone/50 px-6 py-2 font-sans text-xs tracking-widest uppercase">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {['all', 'instagram', 'tiktok'].map((p) => (
          <button
            key={p}
            onClick={() => setPlatform(p as 'all' | 'instagram' | 'tiktok')}
            className={`px-4 py-2 font-sans text-xs tracking-widest uppercase border transition-colors ${platform === p ? 'bg-gold text-ink border-gold' : 'border-white/20 text-bone/60 hover:border-gold/60'}`}
          >
            {p}
          </button>
        ))}
        <select
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          className="bg-ink/40 border border-white/20 text-bone font-sans text-xs px-3 py-2 focus:outline-none"
        >
          <option value="all">All accounts</option>
          <option value="gegallery85">@gegallery85</option>
          <option value="thandazanindlovuartist">@thandazanindlovuartist</option>
        </select>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filtered.map((post) => (
          <div key={post.id} className="group relative">
            <div className="aspect-square overflow-hidden bg-ink/40">
              <img src={post.media_url} alt={post.caption || ''} className="w-full h-full object-cover" />
              {!post.is_visible && (
                <div className="absolute inset-0 bg-ink/60 flex items-center justify-center">
                  <EyeOff size={20} className="text-bone/40" />
                </div>
              )}
            </div>
            <div className="absolute top-1 right-1 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => toggle(post.id, 'is_featured', post.is_featured)}
                className={`p-1.5 backdrop-blur-sm rounded-sm ${post.is_featured ? 'bg-gold text-ink' : 'bg-ink/70 text-bone/60 hover:text-gold'}`}
                title="Feature on homepage"
              >
                <Star size={12} fill={post.is_featured ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={() => toggle(post.id, 'is_visible', post.is_visible)}
                className={`p-1.5 backdrop-blur-sm rounded-sm ${post.is_visible ? 'bg-ink/70 text-emerald-400' : 'bg-ink/70 text-bone/30 hover:text-bone/60'}`}
                title={post.is_visible ? 'Visible — click to hide' : 'Hidden — click to show'}
              >
                {post.is_visible ? <Eye size={12} /> : <EyeOff size={12} />}
              </button>
              <button
                onClick={() => remove(post.id)}
                className="p-1.5 bg-ink/70 text-bone/30 hover:text-red-400 rounded-sm"
              >
                <Trash2 size={12} />
              </button>
            </div>
            <p className="text-bone/40 font-sans text-[10px] mt-1 truncate">@{post.account_handle}</p>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-bone/30 font-sans text-sm">
            No posts yet. Refresh from Instagram or add TikTok URLs above.
          </div>
        )}
      </div>
    </div>
  )
}
