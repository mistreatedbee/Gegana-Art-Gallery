'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/db/client'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const db = createClient()
      const { error } = await db.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      })

      if (error) {
        setError('Invalid email or password.')
        setLoading(false)
        return
      }

      router.push('/admin')
      router.refresh()
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-bone font-serif text-4xl tracking-widest uppercase mb-2">Gegana</h1>
          <p className="text-bone/40 font-sans text-xs tracking-widest uppercase">Admin Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative">
            <input
              type="email"
              id="email"
              placeholder=" "
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="block w-full bg-transparent border-b border-bone/20 py-4 text-bone font-sans focus:outline-none focus:border-gold peer"
            />
            <label
              htmlFor="email"
              className="absolute left-0 top-4 text-bone/50 font-sans text-sm tracking-widest uppercase transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-gold peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs"
            >
              Email
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              id="password"
              placeholder=" "
              required
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              className="block w-full bg-transparent border-b border-bone/20 py-4 text-bone font-sans focus:outline-none focus:border-gold peer"
            />
            <label
              htmlFor="password"
              className="absolute left-0 top-4 text-bone/50 font-sans text-sm tracking-widest uppercase transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-gold peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs"
            >
              Password
            </label>
          </div>

          {error && <p className="text-red-400 font-sans text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-bone text-ink py-4 font-sans text-sm tracking-widest uppercase hover:bg-sand transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="text-bone/20 font-sans text-xs text-center mt-8">
          Admin access only. Contact the gallery owner for credentials.
        </p>
      </div>
    </div>
  )
}
