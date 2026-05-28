import { NextRequest, NextResponse } from 'next/server'
import { createServerDbClient, createAdminDbClient } from '@/lib/db/server'
import { z } from 'zod'

const schema = z.object({
  quote: z.string().min(10),
  author: z.string().min(1),
  role: z.string().optional().nullable(),
  is_approved: z.boolean().default(false),
  sort_order: z.number().default(0),
})

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const all = searchParams.get('all') === 'true'

  const db = await createServerDbClient()

  if (all) {
    const { data: { user } } = await db.auth.getCurrentUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const admin = createAdminDbClient()
    const { data } = await admin.database.from('testimonials').select('*').order('sort_order', { ascending: true })
    return NextResponse.json({ data: data || [] })
  }

  const { data } = await db.database.from('testimonials').select('*').eq('is_approved', true).order('sort_order', { ascending: true })
  return NextResponse.json({ data: data || [] })
}

export async function POST(request: NextRequest) {
  const db = await createServerDbClient()
  const { data: { user } } = await db.auth.getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const admin = createAdminDbClient()
  const { data, error } = await admin.database.from('testimonials').insert(parsed.data).select().single()
  if (error) return NextResponse.json({ error: String(error) }, { status: 500 })
  return NextResponse.json({ data }, { status: 201 })
}
