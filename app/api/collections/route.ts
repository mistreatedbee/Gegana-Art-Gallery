import { NextRequest, NextResponse } from 'next/server'
import { createServerDbClient, createAdminDbClient } from '@/lib/db/server'
import { z } from 'zod'
import { slugify } from '@/lib/utils'

const schema = z.object({
  name: z.string().min(1),
  description: z.string().optional().nullable(),
  cover_url: z.string().optional().nullable(),
  sort_order: z.number().default(0),
  is_active: z.boolean().default(true),
})

export async function GET() {
  const db = await createServerDbClient()
  const { data } = await db.database.from('collections').select('*').eq('is_active', true).order('sort_order', { ascending: true })
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
  const { data, error } = await admin.database
    .from('collections')
    .insert({ ...parsed.data, slug: slugify(parsed.data.name) })
    .select()
    .single()

  if (error) return NextResponse.json({ error: String(error) }, { status: 500 })
  return NextResponse.json({ data }, { status: 201 })
}
