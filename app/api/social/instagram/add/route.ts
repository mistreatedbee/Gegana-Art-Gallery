import { NextRequest, NextResponse } from 'next/server'
import { createServerDbClient, createAdminDbClient } from '@/lib/db/server'
import { extractInstagramShortcode, fetchInstagramOEmbedThumb } from '@/lib/instagram'
import { z } from 'zod'

const schema = z.object({
  urls: z.array(z.string().url()).min(1).max(30),
  account_handle: z.enum(['gegallery85', 'thandazanindlovuartist']),
})

export async function POST(request: NextRequest) {
  const db = await createServerDbClient()
  const { data: { user } } = await db.auth.getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const { urls, account_handle } = parsed.data
  const results: { shortcode: string; success: boolean }[] = []

  const admin = createAdminDbClient()

  for (const url of urls) {
    const shortcode = extractInstagramShortcode(url)
    if (!shortcode) {
      results.push({ shortcode: url, success: false })
      continue
    }

    // Try to get thumbnail
    const thumbnail = await fetchInstagramOEmbedThumb(url)

    const postData = {
      platform: 'instagram' as const,
      account_handle,
      external_id: shortcode,
      // Use the official Instagram embed URL as fallback thumbnail
      media_url: thumbnail || `https://www.instagram.com/p/${shortcode}/media/?size=l`,
      caption: null,
      likes_count: 0,
      comments_count: 0,
      views_count: 0,
      permalink: url,
      is_visible: true,
      is_featured: false,
      fetched_at: new Date().toISOString(),
    }

    const { error } = await admin.database
      .from('social_posts')
      .upsert(postData, { onConflict: 'platform,external_id' })

    results.push({ shortcode, success: !error })
  }

  const successCount = results.filter((r) => r.success).length
  return NextResponse.json({ message: `Added ${successCount} of ${urls.length} posts`, results }, { status: 201 })
}
