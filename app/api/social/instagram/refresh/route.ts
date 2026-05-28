import { NextRequest, NextResponse } from 'next/server'
import { createServerDbClient, createAdminDbClient } from '@/lib/db/server'
import { fetchInstagramPosts } from '@/lib/instagram'

export async function POST(request: NextRequest) {
  const db = await createServerDbClient()
  const { data: { user } } = await db.auth.getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { handle } = await request.json()
  if (!handle) return NextResponse.json({ error: 'handle required' }, { status: 400 })

  const admin = createAdminDbClient()

  // Get stored access token
  const { data: tokenRow } = await admin.database
    .from('instagram_tokens')
    .select('access_token')
    .eq('account_handle', handle)
    .single()

  let accessToken = tokenRow?.access_token

  if (!accessToken) {
    // Fall back to env vars
    const envToken =
      handle === 'gegallery85'
        ? process.env.INSTAGRAM_GALLERY_ACCESS_TOKEN
        : process.env.INSTAGRAM_ARTIST_ACCESS_TOKEN

    if (!envToken) {
      return NextResponse.json({ error: 'No access token found for this account', connected: false }, { status: 404 })
    }
    accessToken = envToken
  }

  const posts = await fetchInstagramPosts(accessToken, handle)

  if (posts.length === 0) {
    return NextResponse.json({ message: 'No posts fetched (API may be unavailable)', count: 0 })
  }

  // Upsert posts
  const upsertData = posts.map((p) => ({ ...p, fetched_at: new Date().toISOString() }))
  const { error } = await admin.database
    .from('social_posts')
    .upsert(upsertData, { onConflict: 'platform,external_id' })

  if (error) return NextResponse.json({ error: String(error) }, { status: 500 })
  return NextResponse.json({ message: `Refreshed ${posts.length} posts`, count: posts.length })
}
