import { NextRequest, NextResponse } from 'next/server'
import { createServerDbClient, createAdminDbClient } from '@/lib/db/server'
import { deleteImage } from '@/lib/cloudinary'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const db = await createServerDbClient()
  const { data, error } = await db.database.from('artworks').select('*').eq('id', params.id).single()
  if (error) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ data })
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const db = await createServerDbClient()
  const { data: { user } } = await db.auth.getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const admin = createAdminDbClient()
  const { data, error } = await admin.database
    .from('artworks')
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

  // Get artwork to delete Cloudinary image
  const { data: artwork } = await admin.database.from('artworks').select('image_public_id').eq('id', params.id).single()
  if (artwork?.image_public_id) {
    await deleteImage(artwork.image_public_id).catch((_err) => { /* best-effort */ })
  }

  const { error } = await admin.database.from('artworks').delete().eq('id', params.id)
  if (error) return NextResponse.json({ error: String(error) }, { status: 500 })
  return NextResponse.json({ success: true })
}
