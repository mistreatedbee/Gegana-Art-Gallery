import { createBrowserClient } from '@insforge/sdk/ssr'

export function createClient() {
  return createBrowserClient()
  // reads NEXT_PUBLIC_INSFORGE_URL and NEXT_PUBLIC_INSFORGE_ANON_KEY automatically
}
