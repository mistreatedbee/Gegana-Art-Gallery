import { createAdminDbClient } from '@/lib/db/server'
import Link from 'next/link'
import { ImageIcon, MessageSquare, Instagram, Quote } from 'lucide-react'

async function getStats() {
  try {
    const admin = createAdminDbClient()
    const [artworksRes, enquiriesRes, postsRes, testimonialsRes] = await Promise.all([
      admin.database.from('artworks').select('id, availability'),
      admin.database.from('enquiries').select('id, status'),
      admin.database.from('social_posts').select('id, is_visible'),
      admin.database.from('testimonials').select('id, is_approved'),
    ])
    return {
      totalArtworks: artworksRes.data?.length || 0,
      availableArtworks: artworksRes.data?.filter((a) => a.availability === 'Available').length || 0,
      newEnquiries: enquiriesRes.data?.filter((e) => e.status === 'new').length || 0,
      totalEnquiries: enquiriesRes.data?.length || 0,
      visiblePosts: postsRes.data?.filter((p) => p.is_visible).length || 0,
      pendingTestimonials: testimonialsRes.data?.filter((t) => !t.is_approved).length || 0,
    }
  } catch {
    return { totalArtworks: 0, availableArtworks: 0, newEnquiries: 0, totalEnquiries: 0, visiblePosts: 0, pendingTestimonials: 0 }
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const cards = [
    { label: 'Total Artworks', value: stats.totalArtworks, sub: `${stats.availableArtworks} available`, icon: ImageIcon, href: '/admin/artworks', color: 'text-gold' },
    { label: 'New Enquiries', value: stats.newEnquiries, sub: `${stats.totalEnquiries} total`, icon: MessageSquare, href: '/admin/enquiries', color: 'text-emerald-400' },
    { label: 'Social Posts', value: stats.visiblePosts, sub: 'visible on site', icon: Instagram, href: '/admin/social', color: 'text-iris' },
    { label: 'Pending Testimonials', value: stats.pendingTestimonials, sub: 'awaiting approval', icon: Quote, href: '/admin/testimonials', color: 'text-sand' },
  ]

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-bone font-serif text-4xl mb-2">Dashboard</h1>
        <p className="text-bone/40 font-sans text-sm">Welcome back. Here&apos;s an overview of the gallery.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
        {cards.map(({ label, value, sub, icon: Icon, href, color }) => (
          <Link
            key={label}
            href={href}
            className="bg-ink/40 border border-white/10 p-6 hover:border-white/20 transition-colors group"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-bone/40 font-sans text-xs tracking-widest uppercase mb-2">{label}</p>
                <p className="text-bone font-serif text-4xl">{value}</p>
              </div>
              <Icon size={24} className={`${color} opacity-70`} strokeWidth={1.5} />
            </div>
            <p className="text-bone/40 font-sans text-xs">{sub}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-ink/40 border border-white/10 p-6">
          <h2 className="text-bone font-serif text-xl mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { href: '/admin/artworks/new', label: '+ Add New Artwork' },
              { href: '/admin/social', label: '↻ Refresh Social Media' },
              { href: '/admin/enquiries?status=new', label: '✉ View New Enquiries' },
              { href: '/admin/homepage', label: '⊕ Update Homepage' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block text-bone/60 hover:text-gold font-sans text-sm tracking-wide transition-colors py-2 border-b border-white/5"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-ink/40 border border-white/10 p-6">
          <h2 className="text-bone font-serif text-xl mb-4">Getting Started</h2>
          <ol className="space-y-3 text-bone/60 font-sans text-sm">
            <li className="flex gap-3">
              <span className="text-gold font-mono">1.</span>
              <span>Add your Insforge environment variables to <code className="text-gold">.env.local</code></span>
            </li>
            <li className="flex gap-3">
              <span className="text-gold font-mono">2.</span>
              <span>Run the SQL schema from <code className="text-gold">supabase/schema.sql</code> in Insforge</span>
            </li>
            <li className="flex gap-3">
              <span className="text-gold font-mono">3.</span>
              <span>Upload real artwork images via the Artworks section</span>
            </li>
            <li className="flex gap-3">
              <span className="text-gold font-mono">4.</span>
              <span>Connect Instagram in Social Media settings when API keys are ready</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
