import { createAdminDbClient } from '@/lib/db/server'
import { CollectionsManager } from '@/components/admin/CollectionsManager'
import type { Collection } from '@/types'

export default async function AdminCollectionsPage() {
  let collections: Collection[] = []
  let artworks: { id: string; title: string; artist: string; image_url: string }[] = []
  try {
    const admin = createAdminDbClient()
    const [colRes, artRes] = await Promise.all([
      admin.database.from('collections').select('*').order('sort_order', { ascending: true }),
      admin.database.from('artworks').select('id, title, artist, image_url').order('title', { ascending: true }),
    ])
    collections = colRes.data || []
    artworks = artRes.data || []
  } catch {
    // DB not connected
  }

  return (
    <div>
      <h1 className="text-bone font-serif text-3xl mb-8">Collections</h1>
      <CollectionsManager collections={collections} artworks={artworks} />
    </div>
  )
}
