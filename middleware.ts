import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ADMIN_SESSION_COOKIE = 'tsdc-admin-session'

export function middleware(req: NextRequest) {
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin/masterclasses')
  if (!isAdminRoute) return NextResponse.next()

  const hasSession = Boolean(req.cookies.get(ADMIN_SESSION_COOKIE)?.value)
  if (hasSession) return NextResponse.next()

  return NextResponse.redirect(new URL('/admin/login', req.url))
}

export const config = {
  matcher: ['/admin/masterclasses/:path*'],
}
