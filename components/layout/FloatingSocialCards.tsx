'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart } from 'lucide-react'
import type { SocialPost } from '@/types'

export function FloatingSocialCards() {
  const [posts, setPosts] = useState<SocialPost[]>([])
  const [dismissed, setDismissed] = useState<string[]>([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Show after 3 seconds
    const timer = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    fetch('/api/social/instagram?featured=true&limit=2')
      .then((r) => r.json())
      .then((d) => setPosts(d.data || []))
      .catch((_err) => { /* silently ignore */ })
  }, [])

  const shownPosts = posts.filter((p) => !dismissed.includes(p.id)).slice(0, 2)

  if (!visible || shownPosts.length === 0) return null

  return (
    <div className="fixed right-4 bottom-20 z-30 hidden xl:flex flex-col gap-4">
      <AnimatePresence>
        {shownPosts.map((post, idx) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.9 }}
            transition={{ duration: 0.4, delay: idx * 0.15 }}
            className="relative w-48 bg-ink border border-white/15 shadow-2xl group"
          >
            <button
              onClick={() => setDismissed((d) => [...d, post.id])}
              className="absolute -top-2 -right-2 w-5 h-5 bg-ink border border-white/20 flex items-center justify-center text-bone/40 hover:text-bone z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={10} />
            </button>

            <a href={post.permalink} target="_blank" rel="noreferrer" className="block">
              <div className="aspect-square overflow-hidden">
                <img
                  src={post.media_url}
                  alt={post.caption || 'Instagram post'}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-3">
                <p className="text-bone/40 font-sans text-[10px] tracking-widest uppercase mb-1">
                  @{post.account_handle}
                </p>
                {post.caption && (
                  <p className="text-bone/70 font-sans text-xs leading-relaxed line-clamp-2">
                    {post.caption}
                  </p>
                )}
                {post.likes_count > 0 && (
                  <div className="flex items-center gap-1 mt-2 text-bone/30">
                    <Heart size={10} fill="currentColor" />
                    <span className="font-sans text-[10px]">{post.likes_count}</span>
                  </div>
                )}
              </div>
            </a>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
