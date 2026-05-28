import { NextRequest, NextResponse } from 'next/server'
import { createServerDbClient, createAdminDbClient } from '@/lib/db/server'

export async function GET() {
  const db = await createServerDbClient()
  const { data } = await db.database.from('homepage_settings').select('*').eq('id', 1).single()
  return NextResponse.json({ data })
}

export async function PATCH(request: NextRequest) {
  const db = await createServerDbClient()
  const { data: { user } } = await db.auth.getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const admin = createAdminDbClient()
  const { data, error } = await admin.database
    .from('homepage_settings')
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq('id', 1)
    .select()
    .single()

  if (error) return NextResponse.json({ error: String(error) }, { status: 500 })
  return NextResponse.json({ data })
}
