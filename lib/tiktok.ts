export interface TikTokOEmbedData {
  external_id: string
  media_url: string
  caption: string | null
  permalink: string
  embed_html: string | null
  author_name: string
}

export async function fetchTikTokOEmbed(url: string): Promise<TikTokOEmbedData | null> {
  try {
    const oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`
    const res = await fetch(oembedUrl, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    const data = await res.json()
    const videoId = url.split('/video/')[1]?.split('?')[0] || url

    return {
      external_id: videoId,
      media_url: data.thumbnail_url || '',
      caption: data.title || null,
      permalink: url,
      embed_html: data.html || null,
      author_name: data.author_name || '',
    }
  } catch (err) {
    console.error('TikTok oEmbed fetch failed:', err)
    return null
  }
}
