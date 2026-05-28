import { createAdminDbClient } from '@/lib/db/server'
import Link from 'next/link'
import { ArtworksTable } from '@/components/admin/ArtworksTable'

export default async function AdminArtworksPage() {
  let artworks = []
  try {
    const admin = createAdminDbClient()
    const { data } = await admin.database
      .from('artworks')
      .select('*')
      .order('created_at', { ascending: false })
    artworks = data || []
  } catch {
    // DB not connected yet
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-bone font-serif text-3xl mb-1">Artworks</h1>
          <p className="text-bone/40 font-sans text-sm">{artworks.length} works in collection</p>
        </div>
        <Link
          href="/admin/artworks/new"
          className="bg-gold text-ink px-6 py-3 font-sans text-sm tracking-widest uppercase hover:bg-gold/80 transition-colors"
        >
          + Add Artwork
        </Link>
      </div>

      <ArtworksTable artworks={artworks} />
    </div>
  )
}
