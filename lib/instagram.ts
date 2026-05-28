import type { SocialPost } from '@/types'

const GRAPH_API = 'https://graph.instagram.com'
const MEDIA_FIELDS = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count'

// Extract shortcode from any Instagram post URL
// Handles: /p/, /reel/, /tv/ formats
export function extractInstagramShortcode(url: string): string | null {
  const match = url.match(/instagram\.com\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)/)
  return match ? match[1] : null
}

// Try to fetch a thumbnail for an Instagram post URL
// Requires INSTAGRAM_APP_TOKEN env var in format APP_ID|CLIENT_TOKEN
// Returns null silently if token not set or request fails
export async function fetchInstagramOEmbedThumb(url: string): Promise<string | null> {
  const appToken = process.env.INSTAGRAM_APP_TOKEN
  if (!appToken) return null
  try {
    const apiUrl = `https://graph.facebook.com/v18.0/instagram_oembed?url=${encodeURIComponent(url)}&fields=thumbnail_url&access_token=${appToken}`
    const res = await fetch(apiUrl, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    const data = await res.json()
    return data.thumbnail_url || null
  } catch {
    return null
  }
}

export async function fetchInstagramPosts(
  accessToken: string,
  accountHandle: string,
  limit = 12
): Promise<Omit<SocialPost, 'id' | 'is_visible' | 'is_featured' | 'fetched_at'>[]> {
  try {
    const url = `${GRAPH_API}/me/media?fields=${MEDIA_FIELDS}&limit=${limit}&access_token=${accessToken}`
    const res = await fetch(url, { next: { revalidate: 0 } })
    if (!res.ok) throw new Error(`Instagram API error: ${res.status}`)
    const data = await res.json()
    if (!data.data) throw new Error('No data in Instagram response')

    return data.data
      .filter((p: Record<string, string>) => p.media_type === 'IMAGE' || p.media_type === 'CAROUSEL_ALBUM')
      .map((p: Record<string, string | number>) => ({
        platform: 'instagram' as const,
        account_handle: accountHandle,
        external_id: String(p.id),
        media_url: String(p.media_url || ''),
        caption: p.caption ? String(p.caption).slice(0, 300) : null,
        likes_count: Number(p.like_count) || 0,
        comments_count: Number(p.comments_count) || 0,
        views_count: 0,
        permalink: String(p.permalink),
        posted_at: p.timestamp ? String(p.timestamp) : null,
      }))
  } catch (err) {
    console.error('Instagram API fetch failed:', err)
    return []
  }
}

export async function refreshInstagramToken(accessToken: string): Promise<{ token: string; expiresIn: number } | null> {
  try {
    const url = `${GRAPH_API}/refresh_access_token?grant_type=ig_refresh_token&access_token=${accessToken}`
    const res = await fetch(url)
    if (!res.ok) return null
    const data = await res.json()
    return { token: data.access_token, expiresIn: data.expires_in }
  } catch {
    return null
  }
}
