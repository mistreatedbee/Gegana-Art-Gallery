import { createServerClient } from '@insforge/sdk/ssr'
import { createAdminClient } from '@insforge/sdk'
import { cookies } from 'next/headers'

export async function createServerDbClient() {
  return createServerClient({ cookies: await cookies() })
}

export function createAdminDbClient() {
  return createAdminClient({
    baseUrl: process.env.NEXT_PUBLIC_INSFORGE_URL!,
    apiKey: process.env.INSFORGE_API_KEY!,
  })
}
