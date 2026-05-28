import { NextRequest, NextResponse } from 'next/server'
import { createServerDbClient, createAdminDbClient } from '@/lib/db/server'
import { z } from 'zod'

const enquirySchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  message: z.string().min(10).max(2000),
  subject: z.string().optional(),
  artwork_id: z.string().uuid().optional().nullable(),
  artwork_title: z.string().optional().nullable(),
  type: z.enum(['general', 'artwork', 'consultation']).default('general'),
})

export async function POST(request: NextRequest) {
  const body = await request.json()
  const parsed = enquirySchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  try {
    // Public endpoint — use anon client (RLS allows public insert)
    const db = await createServerDbClient()
    const { data, error } = await db.database.from('enquiries').insert(parsed.data).select().single()
    if (error) throw error
    return NextResponse.json({ data }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const db = await createServerDbClient()
  const { data: { user } } = await db.auth.getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const sort = searchParams.get('sort') || 'newest'

  const admin = createAdminDbClient()
  let query = admin.database.from('enquiries').select('*')
  if (status) query = query.eq('status', status)
  query = query.order('created_at', { ascending: sort === 'oldest' })

  const { data, error } = await query
  if (error) return NextResponse.json({ error: String(error) }, { status: 500 })
  return NextResponse.json({ data: data || [] })
}
