import { createAdminDbClient } from '@/lib/db/server'
import { ArtworkForm } from '@/components/admin/ArtworkForm'
import type { Artwork } from '@/types'

export default async function ArtworkEditPage({ params }: { params: { id: string } }) {
  let artwork: Artwork | null = null

  if (params.id !== 'new') {
    try {
      const admin = createAdminDbClient()
      const { data } = await admin.database.from('artworks').select('*').eq('id', params.id).single()
      artwork = data
    } catch {
      // not found
    }
  }

  return (
    <div>
      <h1 className="text-bone font-serif text-3xl mb-8">
        {params.id === 'new' ? 'Add New Artwork' : 'Edit Artwork'}
      </h1>
      <ArtworkForm artwork={artwork} />
    </div>
  )
}
