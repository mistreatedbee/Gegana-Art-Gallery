import { NextRequest, NextResponse } from 'next/server'
import { createServerDbClient } from '@/lib/db/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const handle = searchParams.get('handle')
  const limit = parseInt(searchParams.get('limit') || '12')
  const featured = searchParams.get('featured') === 'true'

  try {
    const db = await createServerDbClient()
    let query = db.database
      .from('social_posts')
      .select('*')
      .eq('platform', 'instagram')
      .eq('is_visible', true)
      .order('posted_at', { ascending: false })
      .limit(limit)

    if (handle) query = query.eq('account_handle', handle)
    if (featured) query = query.eq('is_featured', true)

    const { data, error } = await query
    if (error) throw error
    return NextResponse.json({ data: data || [] })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
