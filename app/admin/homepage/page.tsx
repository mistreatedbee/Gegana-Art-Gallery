import { createAdminDbClient } from '@/lib/db/server'
import { HomepageManager } from '@/components/admin/HomepageManager'

export default async function AdminHomepagePage() {
  let settings = null
  let artworks: { id: string; title: string; artist: string; image_url: string }[] = []
  try {
    const admin = createAdminDbClient()
    const [settingsRes, artworksRes] = await Promise.all([
      admin.database.from('homepage_settings').select('*').eq('id', 1).single(),
      admin.database.from('artworks').select('id, title, artist, image_url').order('title', { ascending: true }),
    ])
    settings = settingsRes.data
    artworks = artworksRes.data || []
  } catch {
    // DB not connected
  }

  return (
    <div>
      <h1 className="text-bone font-serif text-3xl mb-8">Homepage Settings</h1>
      <HomepageManager settings={settings} artworks={artworks} />
    </div>
  )
}
