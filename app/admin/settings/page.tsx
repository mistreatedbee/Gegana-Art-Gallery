import { createAdminDbClient } from '@/lib/db/server'
import { SettingsForm } from '@/components/admin/SettingsForm'

export default async function AdminSettingsPage() {
  let settings = null
  try {
    const admin = createAdminDbClient()
    const { data } = await admin.database.from('gallery_settings').select('*').eq('id', 1).single()
    settings = data
  } catch {
    // DB not connected
  }

  return (
    <div>
      <h1 className="text-bone font-serif text-3xl mb-8">Gallery Settings</h1>
      <SettingsForm settings={settings} />
    </div>
  )
}
