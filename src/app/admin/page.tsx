import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import UnifiedAdminPage from '@/app/components/admin/UnifiedAdminPage'
import { verifyAdminSession } from '@/lib/auth/admin-session'

export const metadata: Metadata = {
  title: 'TSDC Admin',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminPage() {
  const session = await verifyAdminSession()

  if (!session?.email) {
    redirect('/admin/login')
  }

  return <UnifiedAdminPage userEmail={session.email} />
}
