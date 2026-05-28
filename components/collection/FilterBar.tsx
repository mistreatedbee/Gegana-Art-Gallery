'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { ChevronDown } from 'lucide-react'

const CATEGORIES = [
  'All',
  'Paintings',
  'Abstract',
  'African Art',
  'Portraits',
  'Contemporary',
  'Mixed Media',
  'Sold Works',
  'Available Works',
]

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'available', label: 'Available First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
]

export function FilterBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') || 'All'
  const activeSort = searchParams.get('sort') || 'newest'

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value === 'All' || value === 'newest') {
        params.delete(key)
      } else {
        params.set(key, value)
      }
      router.push(`/collection?${params.toString()}`, { scroll: false })
    },
    [router, searchParams]
  )

  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                if (cat === 'Sold Works') updateParam('category', 'Sold')
                else if (cat === 'Available Works') updateParam('category', 'Available')
                else updateParam('category', cat)
              }}
              className={`px-5 py-2 rounded-full font-sans text-xs tracking-widest uppercase transition-all duration-300 border ${
                activeCategory === (cat === 'Sold Works' ? 'Sold' : cat === 'Available Works' ? 'Available' : cat)
                  ? 'bg-ink text-bone border-ink'
                  : 'bg-transparent text-ink/60 border-ink/20 hover:border-ink/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative flex-shrink-0">
          <select
            value={activeSort}
            onChange={(e) => updateParam('sort', e.target.value)}
            className="appearance-none bg-transparent border border-ink/20 text-ink font-sans text-sm tracking-widest uppercase px-5 py-2 pr-10 focus:outline-none focus:border-ink cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/50 pointer-events-none" />
        </div>
      </div>
    </div>
  )
}
