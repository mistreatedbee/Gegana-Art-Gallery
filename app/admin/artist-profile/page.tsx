import { createAdminDbClient } from '@/lib/db/server'
import { ArtistProfileForm } from '@/components/admin/ArtistProfileForm'

export default async function AdminArtistProfilePage() {
  let artist = null
  try {
    const admin = createAdminDbClient()
    const { data } = await admin.database.from('artists').select('*').eq('is_featured', true).single()
    artist = data
  } catch {
    // DB not connected
  }

  return (
    <div>
      <h1 className="text-bone font-serif text-3xl mb-8">Featured Artist Profile</h1>
      <ArtistProfileForm artist={artist} />
    </div>
  )
}
