import type { Metadata } from 'next'
import { FloatingSocialCards } from '@/components/layout/FloatingSocialCards'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Gegana Gallery — Contemporary African Art',
    template: '%s | Gegana Gallery',
  },
  description:
    'Gegana Gallery — a premier destination for contemporary African art and collections. Curating extraordinary works by Thandazani Ndlovu and more, based in Johannesburg.',
  openGraph: {
    siteName: 'Gegana Gallery',
    locale: 'en_ZA',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-ink min-h-screen text-bone selection:bg-gold selection:text-ink">
        {children}
        <FloatingSocialCards />
      </body>
    </html>
  )
}
