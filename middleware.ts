import { NextResponse, type NextRequest } from 'next/server'

// Note: @insforge/sdk/ssr uses socket.io-client which is incompatible with Edge Runtime.
// Auth guard here uses cookie presence; actual session validation happens in server components and API routes.

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request })

  // Protect all /admin/* routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const accessToken = request.cookies.get('insforge_access_token')?.value
    if (!accessToken) {
      const loginUrl = new URL('/auth/login', request.url)
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Redirect logged-in users away from login page
  if (request.nextUrl.pathname === '/auth/login') {
    const accessToken = request.cookies.get('insforge_access_token')?.value
    if (accessToken) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*', '/auth/login'],
}
