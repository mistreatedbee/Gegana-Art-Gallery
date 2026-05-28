'use client'

import { motion } from 'framer-motion'
import { Heart, MessageCircle, Play, ExternalLink } from 'lucide-react'
import type { SocialPost } from '@/types'
import { truncate } from '@/lib/utils'

interface SocialFeedProps {
  galleryPosts?: SocialPost[]
  artistPosts?: SocialPost[]
  tiktokPosts?: SocialPost[]
}

function PostCard({ post }: { post: SocialPost }) {
  return (
    <motion.a
      href={post.permalink}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative group overflow-hidden bg-sand block"
    >
      <div className="aspect-square relative">
        <img
          src={post.media_url}
          alt={post.caption || 'Instagram post'}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {post.platform === 'tiktok' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-bone/20 backdrop-blur-sm border border-bone/30 flex items-center justify-center">
              <Play size={20} className="text-bone ml-1" fill="currentColor" />
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-ink/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="flex items-center gap-4 text-bone mb-2">
            {post.likes_count > 0 && (
              <div className="flex items-center gap-1">
                <Heart size={14} fill="currentColor" />
                <span className="font-sans text-xs">{post.likes_count}</span>
              </div>
            )}
            {post.comments_count > 0 && (
              <div className="flex items-center gap-1">
                <MessageCircle size={14} fill="currentColor" />
                <span className="font-sans text-xs">{post.comments_count}</span>
              </div>
            )}
            {post.views_count > 0 && (
              <div className="flex items-center gap-1">
                <Play size={14} fill="currentColor" />
                <span className="font-sans text-xs">{post.views_count.toLocaleString()}</span>
              </div>
            )}
          </div>
          {post.caption && (
            <p className="text-bone/80 font-sans text-xs leading-relaxed line-clamp-2">
              {truncate(post.caption, 80)}
            </p>
          )}
        </div>
      </div>
    </motion.a>
  )
}

const PLACEHOLDER_GALLERY: SocialPost[] = [
  { id: '1', platform: 'instagram', account_handle: 'gegallery85', external_id: 'p1', media_url: 'https://images.unsplash.com/photo-1544413660-299165566b1d?auto=format&fit=crop&q=80&w=400', caption: 'Gallery opening this Friday — join us for an evening of art. 🎨', likes_count: 342, comments_count: 28, views_count: 0, permalink: 'https://www.instagram.com/gegallery85', is_visible: true, is_featured: true, fetched_at: '' },
  { id: '2', platform: 'instagram', account_handle: 'gegallery85', external_id: 'p2', media_url: 'https://images.unsplash.com/photo-1518998053401-b4391cb169cd?auto=format&fit=crop&q=80&w=400', caption: 'New acquisition just arrived.', likes_count: 289, comments_count: 15, views_count: 0, permalink: 'https://www.instagram.com/gegallery85', is_visible: true, is_featured: false, fetched_at: '' },
  { id: '3', platform: 'instagram', account_handle: 'gegallery85', external_id: 'p3', media_url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=400', caption: 'Behind the scenes at our latest installation.', likes_count: 412, comments_count: 33, views_count: 0, permalink: 'https://www.instagram.com/gegallery85', is_visible: true, is_featured: false, fetched_at: '' },
  { id: '4', platform: 'instagram', account_handle: 'gegallery85', external_id: 'p4', media_url: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&q=80&w=400', caption: 'Opening night was incredible.', likes_count: 521, comments_count: 41, views_count: 0, permalink: 'https://www.instagram.com/gegallery85', is_visible: true, is_featured: false, fetched_at: '' },
]

const PLACEHOLDER_ARTIST: SocialPost[] = [
  { id: '5', platform: 'instagram', account_handle: 'thandazanindlovuartist', external_id: 'a1', media_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400', caption: 'Studio session — working on the new series. 🖌️', likes_count: 567, comments_count: 44, views_count: 0, permalink: 'https://www.instagram.com/thandazanindlovuartist', is_visible: true, is_featured: true, fetched_at: '' },
  { id: '6', platform: 'instagram', account_handle: 'thandazanindlovuartist', external_id: 'a2', media_url: 'https://images.unsplash.com/photo-1578301978693-85fa9c026f19?auto=format&fit=crop&q=80&w=400', caption: '"Echoes of the Ancestors" — detail shot. Available at @gegallery85', likes_count: 892, comments_count: 71, views_count: 0, permalink: 'https://www.instagram.com/thandazanindlovuartist', is_visible: true, is_featured: false, fetched_at: '' },
  { id: '7', platform: 'instagram', account_handle: 'thandazanindlovuartist', external_id: 'a3', media_url: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&q=80&w=400', caption: 'Process always tells the story.', likes_count: 634, comments_count: 52, views_count: 0, permalink: 'https://www.instagram.com/thandazanindlovuartist', is_visible: true, is_featured: false, fetched_at: '' },
  { id: '8', platform: 'instagram', account_handle: 'thandazanindlovuartist', external_id: 'a4', media_url: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&q=80&w=400', caption: 'New canvas, new story.', likes_count: 445, comments_count: 38, views_count: 0, permalink: 'https://www.instagram.com/thandazanindlovuartist', is_visible: true, is_featured: false, fetched_at: '' },
]

const PLACEHOLDER_TIKTOK: SocialPost[] = [
  { id: '9', platform: 'tiktok', account_handle: 'thandazanindlovuartist', external_id: 't1', media_url: 'https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?auto=format&fit=crop&q=80&w=400', caption: 'Watch me create this piece from start to finish 🎨 #AfricanArt', likes_count: 1240, comments_count: 89, views_count: 45200, permalink: 'https://www.tiktok.com/@thandazanindlovuartist', is_visible: true, is_featured: true, fetched_at: '' },
  { id: '10', platform: 'tiktok', account_handle: 'thandazanindlovuartist', external_id: 't2', media_url: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&q=80&w=400', caption: 'The meaning behind my latest collection explained 🖌️', likes_count: 876, comments_count: 65, views_count: 32100, permalink: 'https://www.tiktok.com/@thandazanindlovuartist', is_visible: true, is_featured: false, fetched_at: '' },
  { id: '11', platform: 'tiktok', account_handle: 'thandazanindlovuartist', external_id: 't3', media_url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=400', caption: 'A tour of the new gallery space 🏛️', likes_count: 2100, comments_count: 134, views_count: 89000, permalink: 'https://www.tiktok.com/@thandazanindlovuartist', is_visible: true, is_featured: false, fetched_at: '' },
  { id: '12', platform: 'tiktok', account_handle: 'thandazanindlovuartist', external_id: 't4', media_url: 'https://images.unsplash.com/photo-1544413660-299165566b1d?auto=format&fit=crop&q=80&w=400', caption: 'Oil painting techniques I learned from my grandmother', likes_count: 3450, comments_count: 201, views_count: 120000, permalink: 'https://www.tiktok.com/@thandazanindlovuartist', is_visible: true, is_featured: false, fetched_at: '' },
]

export function SocialFeed({ galleryPosts, artistPosts, tiktokPosts }: SocialFeedProps) {
  const gallery = galleryPosts?.length ? galleryPosts : PLACEHOLDER_GALLERY
  const artist = artistPosts?.length ? artistPosts : PLACEHOLDER_ARTIST
  const tiktok = tiktokPosts?.length ? tiktokPosts : PLACEHOLDER_TIKTOK

  return (
    <section className="bg-bone py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-24">

        {/* Gallery Instagram */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
          >
            <div>
              <span className="text-ink/50 font-sans text-xs tracking-[0.3em] uppercase block mb-3">Social</span>
              <h2 className="text-ink font-serif text-4xl md:text-5xl">Gegana Gallery</h2>
              <p className="text-ink/50 font-sans text-sm mt-2">@gegallery85 on Instagram</p>
            </div>
            <a
              href="https://www.instagram.com/gegallery85"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-ink text-bone px-6 py-2 font-sans text-xs tracking-widest uppercase hover:bg-ink/80 transition-colors"
            >
              Follow <ExternalLink size={12} />
            </a>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-3">
            {gallery.slice(0, 4).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Artist Instagram */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
          >
            <div>
              <span className="text-ink/50 font-sans text-xs tracking-[0.3em] uppercase block mb-3">Artist Feed</span>
              <h2 className="text-ink font-serif text-4xl md:text-5xl">Thandazani Ndlovu</h2>
              <p className="text-ink/50 font-sans text-sm mt-2">@thandazanindlovuartist on Instagram</p>
            </div>
            <a
              href="https://www.instagram.com/thandazanindlovuartist"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-ink text-bone px-6 py-2 font-sans text-xs tracking-widest uppercase hover:bg-ink/80 transition-colors"
            >
              Follow <ExternalLink size={12} />
            </a>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-3">
            {artist.slice(0, 4).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* TikTok */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
          >
            <div>
              <span className="text-ink/50 font-sans text-xs tracking-[0.3em] uppercase block mb-3">TikTok</span>
              <h2 className="text-ink font-serif text-4xl md:text-5xl">Watch the Process</h2>
              <p className="text-ink/50 font-sans text-sm mt-2">@thandazanindlovuartist on TikTok</p>
            </div>
            <a
              href="https://www.tiktok.com/@thandazanindlovuartist"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-ink text-bone px-6 py-2 font-sans text-xs tracking-widest uppercase hover:bg-ink/80 transition-colors"
            >
              Follow <ExternalLink size={12} />
            </a>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-3">
            {tiktok.slice(0, 4).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
