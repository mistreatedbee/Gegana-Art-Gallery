import { NextRequest, NextResponse } from 'next/server'
import { createServerDbClient, createAdminDbClient } from '@/lib/db/server'

export async function GET() {
  const db = await createServerDbClient()
  const { data } = await db.database.from('artists').select('*').eq('is_featured', true).single()
  return NextResponse.json({ data })
}

export async function PATCH(request: NextRequest) {
  const db = await createServerDbClient()
  const { data: { user } } = await db.auth.getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { id, ...rest } = body
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  const admin = createAdminDbClient()
  const { data, error } = await admin.database
    .from('artists')
    .update({ ...rest, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: String(error) }, { status: 500 })
  return NextResponse.json({ data })
}
