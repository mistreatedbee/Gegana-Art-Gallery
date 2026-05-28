import { NextRequest, NextResponse } from 'next/server'
import { createServerDbClient } from '@/lib/db/server'
import { getSignedUploadParams } from '@/lib/cloudinary'

export async function POST(request: NextRequest) {
  const db = await createServerDbClient()
  const { data: { user } } = await db.auth.getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { folder } = await request.json().catch(() => ({ folder: 'gegana-gallery' }))
  const params = getSignedUploadParams(folder || 'gegana-gallery')
  return NextResponse.json(params)
}
