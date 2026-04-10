import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import AdminLoginPage from '@/app/components/masterclass/AdminLoginPage'
import { verifyAdminSession } from '@/lib/auth/admin-session'

export const metadata: Metadata = {
  title: 'TSDC Admin Login',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function Page() {
  const session = await verifyAdminSession()

  if (session) {
    redirect('/admin/masterclasses')
  }

  return <AdminLoginPage />
}
