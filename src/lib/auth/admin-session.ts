import { cookies } from 'next/headers'
import { getFirebaseAdminAuth } from '@/lib/firebase/admin'

export const ADMIN_SESSION_COOKIE = 'tsdc-admin-session'

const getAllowedAdminEmails = () =>
  (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)

export const isAllowedAdminEmail = (email?: string | null) => {
  if (!email) return false
  return getAllowedAdminEmails().includes(email.toLowerCase())
}

export const verifyAdminSession = async () => {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE)?.value

  if (!sessionCookie) return null

  try {
    const firebaseAdminAuth = getFirebaseAdminAuth()
    const decoded = await firebaseAdminAuth.verifySessionCookie(sessionCookie, true)
    if (!isAllowedAdminEmail(decoded.email)) return null
    return decoded
  } catch {
    return null
  }
}
