'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/db/client'
import {
  LayoutDashboard,
  ImageIcon,
  FolderOpen,
  Instagram,
  Home,
  User,
  MessageSquare,
  Quote,
  Settings,
  LogOut,
  ExternalLink,
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/artworks', label: 'Artworks', icon: ImageIcon },
  { href: '/admin/collections', label: 'Collections', icon: FolderOpen },
  { href: '/admin/social', label: 'Social Media', icon: Instagram },
  { href: '/admin/homepage', label: 'Homepage', icon: Home },
  { href: '/admin/artist-profile', label: 'Artist Profile', icon: User },
  { href: '/admin/enquiries', label: 'Enquiries', icon: MessageSquare },
  { href: '/admin/testimonials', label: 'Testimonials', icon: Quote },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const db = createClient()
    await db.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <aside className="w-64 bg-ink border-r border-white/10 flex flex-col min-h-screen fixed left-0 top-0 z-40">
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="text-bone font-serif text-xl tracking-widest uppercase">
          Gegana
        </Link>
        <p className="text-bone/40 font-sans text-xs tracking-widest uppercase mt-1">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const isActive = exact ? pathname === href : pathname.startsWith(href)
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-sm font-sans text-sm tracking-wide transition-colors ${
                    isActive
                      ? 'bg-gold/20 text-gold'
                      : 'text-bone/60 hover:text-bone hover:bg-white/5'
                  }`}
                >
                  <Icon size={18} strokeWidth={1.5} />
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-white/10 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 text-bone/40 hover:text-bone font-sans text-sm tracking-wide transition-colors"
        >
          <ExternalLink size={18} strokeWidth={1.5} />
          View Site
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-bone/40 hover:text-red-400 font-sans text-sm tracking-wide transition-colors w-full"
        >
          <LogOut size={18} strokeWidth={1.5} />
          Logout
        </button>
      </div>
    </aside>
  )
}
