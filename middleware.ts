import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ADMIN_SESSION_COOKIE = 'tsdc-admin-session'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isAdminRoute = pathname.startsWith('/admin')
  const isLoginRoute = pathname === '/admin/login'

  if (!isAdminRoute) return NextResponse.next()
  if (isLoginRoute) return NextResponse.next()

  const hasSession = Boolean(req.cookies.get(ADMIN_SESSION_COOKIE)?.value)
  if (hasSession) return NextResponse.next()

  return NextResponse.redirect(new URL('/admin/login', req.url))
}

export const config = {
  matcher: ['/admin/:path*'],
}
