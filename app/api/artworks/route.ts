import { NextRequest, NextResponse } from 'next/server'
import { createServerDbClient, createAdminDbClient } from '@/lib/db/server'
import { z } from 'zod'

const artworkSchema = z.object({
  title: z.string().min(1),
  artist: z.string().min(1),
  medium: z.string().min(1),
  size: z.string().optional().nullable(),
  year: z.number().int().min(1800).max(2100),
  category: z.string().min(1),
  price: z.number().positive().optional().nullable(),
  currency: z.string().default('ZAR'),
  availability: z.enum(['Available', 'Sold', 'Reserved']).default('Available'),
  description: z.string().optional().nullable(),
  image_url: z.string().url(),
  image_public_id: z.string().optional().nullable(),
  is_featured: z.boolean().default(false),
  sort_order: z.number().int().default(0),
})

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const availability = searchParams.get('availability')
  const featured = searchParams.get('featured')
  const sort = searchParams.get('sort') || 'newest'
  const limit = parseInt(searchParams.get('limit') || '50')
  const offset = parseInt(searchParams.get('offset') || '0')

  try {
    const db = await createServerDbClient()
    let query = db.database.from('artworks').select('*')

    if (category && category !== 'All') query = query.eq('category', category)
    if (availability === 'Available' || availability === 'Sold' || availability === 'Reserved') {
      query = query.eq('availability', availability)
    }
    if (featured === 'true') query = query.eq('is_featured', true)

    switch (sort) {
      case 'oldest': query = query.order('year', { ascending: true }); break
      case 'available': query = query.order('availability', { ascending: true }); break
      case 'price_asc': query = query.order('price', { ascending: true, nullsFirst: false }); break
      case 'price_desc': query = query.order('price', { ascending: false, nullsFirst: false }); break
      default: query = query.order('created_at', { ascending: false })
    }

    query = query.range(offset, offset + limit - 1)
    const { data, error } = await query

    if (error) throw error
    return NextResponse.json({ data: data || [] })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const db = await createServerDbClient()
  const { data: { user } } = await db.auth.getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const parsed = artworkSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  try {
    const admin = createAdminDbClient()
    const { data, error } = await admin.database.from('artworks').insert(parsed.data).select().single()
    if (error) throw error
    return NextResponse.json({ data }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
