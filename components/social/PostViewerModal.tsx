'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, MessageCircle, Play, ExternalLink, Calendar } from 'lucide-react'
import type { SocialPost } from '@/types'

interface PostViewerModalProps {
  post: SocialPost | null
  onClose: () => void
}

function getEmbedUrl(post: SocialPost): string {
  if (post.platform === 'instagram') {
    return `https://www.instagram.com/p/${post.external_id}/embed/captioned/`
  }
  // TikTok
  return `https://www.tiktok.com/embed/v2/${post.external_id}`
}

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return ''
  }
}

export function PostViewerModal({ post, onClose }: PostViewerModalProps) {
  if (!post) return null

  const embedUrl = getEmbedUrl(post)
  const isInstagram = post.platform === 'instagram'
  const isTikTok = post.platform === 'tiktok'

  return (
    <AnimatePresence>
      {post && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/95 backdrop-blur-md z-[80]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row gap-0 overflow-hidden">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 z-10 w-9 h-9 bg-ink/80 border border-white/20 text-bone/60 hover:text-bone flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>

              {/* Embed panel */}
              <div className="flex-shrink-0 flex items-center justify-center bg-ink/60 border border-white/10 overflow-hidden"
                style={isInstagram ? { width: '100%', maxWidth: 400, minHeight: 500 } : { width: '100%', maxWidth: 340, minHeight: 600 }}
              >
                <iframe
                  src={embedUrl}
                  width={isInstagram ? 400 : 325}
                  height={isInstagram ? 560 : 700}
                  frameBorder="0"
                  scrolling={isInstagram ? 'no' : undefined}
                  allowTransparency={isInstagram ? true : undefined}
                  allow={isTikTok ? 'encrypted-media; autoplay' : undefined}
                  className="w-full"
                  style={{ maxHeight: '80vh' }}
                  title={`${post.platform} post by @${post.account_handle}`}
                />
              </div>

              {/* Info panel */}
              <div className="flex-1 bg-ink border border-white/10 border-l-0 p-6 md:p-8 flex flex-col justify-between min-w-[280px] max-w-xs overflow-y-auto">
                <div>
                  {/* Account */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold ${isInstagram ? 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400' : 'bg-[#010101]'}`}>
                      {isInstagram ? '📷' : '♪'}
                    </div>
                    <div>
                      <p className="text-bone font-sans font-medium text-sm">@{post.account_handle}</p>
                      <p className="text-bone/40 font-sans text-xs capitalize">{post.platform}</p>
                    </div>
                  </div>

                  {/* Caption */}
                  {post.caption && (
                    <p className="text-bone/80 font-sans font-light text-sm leading-relaxed mb-6">
                      {post.caption}
                    </p>
                  )}

                  {/* Stats */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    {post.likes_count > 0 && (
                      <div className="flex items-center gap-2 text-bone/60">
                        <Heart size={14} className="text-pink-400" fill="currentColor" />
                        <span className="font-sans text-sm">{post.likes_count.toLocaleString()} likes</span>
                      </div>
                    )}
                    {post.comments_count > 0 && (
                      <div className="flex items-center gap-2 text-bone/60">
                        <MessageCircle size={14} className="text-blue-400" />
                        <span className="font-sans text-sm">{post.comments_count.toLocaleString()} comments</span>
                      </div>
                    )}
                    {post.views_count > 0 && (
                      <div className="flex items-center gap-2 text-bone/60">
                        <Play size={14} className="text-emerald-400" fill="currentColor" />
                        <span className="font-sans text-sm">{post.views_count.toLocaleString()} views</span>
                      </div>
                    )}
                  </div>

                  {/* Date */}
                  {post.posted_at && (
                    <div className="flex items-center gap-2 text-bone/30 mb-6">
                      <Calendar size={12} />
                      <span className="font-sans text-xs">{formatDate(post.posted_at)}</span>
                    </div>
                  )}
                </div>

                {/* Open original */}
                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 border border-bone/20 text-bone/60 hover:text-bone hover:border-bone/60 px-4 py-3 font-sans text-xs tracking-widest uppercase transition-colors"
                >
                  <ExternalLink size={14} />
                  Open on {isInstagram ? 'Instagram' : 'TikTok'}
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
