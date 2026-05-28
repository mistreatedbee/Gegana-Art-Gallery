import { createAdminDbClient } from '@/lib/db/server'
import { EnquiriesManager } from '@/components/admin/EnquiriesManager'

export default async function AdminEnquiriesPage() {
  let enquiries = []
  try {
    const admin = createAdminDbClient()
    const { data } = await admin.database
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false })
    enquiries = data || []
  } catch {
    // DB not connected
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-bone font-serif text-3xl mb-1">Enquiries</h1>
        <p className="text-bone/40 font-sans text-sm">{enquiries.filter((e: { status: string }) => e.status === 'new').length} new enquiries</p>
      </div>
      <EnquiriesManager enquiries={enquiries} />
    </div>
  )
}
