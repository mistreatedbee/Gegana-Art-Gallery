import { redirect } from 'next/navigation'
import { createServerDbClient } from '@/lib/db/server'
import { AdminSidebar } from '@/components/layout/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Server-side auth verification (defense in depth beyond middleware)
  try {
    const db = await createServerDbClient()
    const { data: { user } } = await db.auth.getCurrentUser()
    if (!user) redirect('/auth/login')
  } catch {
    redirect('/auth/login')
  }

  return (
    <div className="bg-charcoal min-h-screen text-bone">
      <AdminSidebar />
      <main className="ml-64 min-h-screen p-8">
        {children}
      </main>
    </div>
  )
}
