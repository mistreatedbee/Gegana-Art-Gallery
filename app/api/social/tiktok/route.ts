import { NextRequest, NextResponse } from 'next/server'
import { createServerDbClient, createAdminDbClient } from '@/lib/db/server'
import { fetchTikTokOEmbed } from '@/lib/tiktok'
import { z } from 'zod'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '8')

  const db = await createServerDbClient()
  const { data } = await db.database
    .from('social_posts')
    .select('*')
    .eq('platform', 'tiktok')
    .eq('is_visible', true)
    .order('posted_at', { ascending: false })
    .limit(limit)

  return NextResponse.json({ data: data || [] })
}

const addTikTokSchema = z.object({ urls: z.array(z.string().url()).min(1).max(20) })

export async function POST(request: NextRequest) {
  const db = await createServerDbClient()
  const { data: { user } } = await db.auth.getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const parsed = addTikTokSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const results = await Promise.all(parsed.data.urls.map(fetchTikTokOEmbed))
  const valid = results.filter(Boolean)

  if (valid.length === 0) return NextResponse.json({ error: 'No valid TikTok posts found' }, { status: 422 })

  const admin = createAdminDbClient()
  const upsertData = valid.map((v) => ({
    platform: 'tiktok' as const,
    account_handle: 'thandazanindlovuartist',
    external_id: v!.external_id,
    media_url: v!.media_url,
    caption: v!.caption,
    likes_count: 0,
    comments_count: 0,
    views_count: 0,
    permalink: v!.permalink,
    is_visible: true,
    is_featured: false,
    fetched_at: new Date().toISOString(),
  }))

  const { error } = await admin.database
    .from('social_posts')
    .upsert(upsertData, { onConflict: 'platform,external_id' })

  if (error) return NextResponse.json({ error: String(error) }, { status: 500 })
  return NextResponse.json({ message: `Added ${valid.length} TikTok posts`, count: valid.length })
}
