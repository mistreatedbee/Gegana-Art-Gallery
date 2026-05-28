import { createAdminDbClient } from '@/lib/db/server'
import { TestimonialsManager } from '@/components/admin/TestimonialsManager'

export default async function AdminTestimonialsPage() {
  let testimonials = []
  try {
    const admin = createAdminDbClient()
    const { data } = await admin.database.from('testimonials').select('*').order('sort_order', { ascending: true })
    testimonials = data || []
  } catch {
    // DB not connected
  }

  return (
    <div>
      <h1 className="text-bone font-serif text-3xl mb-8">Testimonials</h1>
      <TestimonialsManager testimonials={testimonials} />
    </div>
  )
}
