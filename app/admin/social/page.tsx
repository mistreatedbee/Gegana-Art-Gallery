import { createAdminDbClient } from '@/lib/db/server'
import { SocialMediaManager } from '@/components/admin/SocialMediaManager'

export default async function AdminSocialPage() {
  let posts = []
  let tokens: { account_handle: string; expires_at: string }[] = []

  try {
    const admin = createAdminDbClient()
    const [postsRes, tokensRes] = await Promise.all([
      admin.database.from('social_posts').select('*').order('fetched_at', { ascending: false }),
      admin.database.from('instagram_tokens').select('account_handle, expires_at'),
    ])
    posts = postsRes.data || []
    tokens = tokensRes.data || []
  } catch {
    // DB not connected
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-bone font-serif text-3xl mb-1">Social Media</h1>
        <p className="text-bone/40 font-sans text-sm">Manage Instagram and TikTok posts shown on the website.</p>
      </div>
      <SocialMediaManager posts={posts} tokens={tokens} />
    </div>
  )
}
