import { NextRequest, NextResponse } from 'next/server'
import { createServerDbClient, createAdminDbClient } from '@/lib/db/server'

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const db = await createServerDbClient()
  const { data: { user } } = await db.auth.getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const admin = createAdminDbClient()
  const { data, error } = await admin.database
    .from('enquiries')
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq('id', params.id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: String(error) }, { status: 500 })
  return NextResponse.json({ data })
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const db = await createServerDbClient()
  const { data: { user } } = await db.auth.getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const admin = createAdminDbClient()
  const { error } = await admin.database.from('enquiries').delete().eq('id', params.id)
  if (error) return NextResponse.json({ error: String(error) }, { status: 500 })
  return NextResponse.json({ success: true })
}
