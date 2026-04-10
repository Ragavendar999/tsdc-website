import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE, isAllowedAdminEmail } from '@/lib/auth/admin-session'
import { getFirebaseAdminAuth } from '@/lib/firebase/admin'

const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 5

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const idToken = typeof body?.idToken === 'string' ? body.idToken : ''

    if (!idToken) {
      return NextResponse.json({ error: 'Missing Firebase token' }, { status: 400 })
    }

    const firebaseAdminAuth = getFirebaseAdminAuth()
    const decoded = await firebaseAdminAuth.verifyIdToken(idToken)

    if (!isAllowedAdminEmail(decoded.email)) {
      return NextResponse.json({ error: 'Unauthorized admin account' }, { status: 403 })
    }

    const sessionCookie = await firebaseAdminAuth.createSessionCookie(idToken, {
      expiresIn: SESSION_DURATION_MS,
    })

    const cookieStore = await cookies()
    cookieStore.set(ADMIN_SESSION_COOKIE, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_DURATION_MS / 1000,
    })

    return NextResponse.json({ success: true, email: decoded.email })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
