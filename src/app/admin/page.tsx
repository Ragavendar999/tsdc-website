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

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: { tab?: string }
}) {
  const session = await verifyAdminSession()

  if (!session?.email) {
    redirect('/admin/login')
  }

  const tab = searchParams?.tab
  const initialTab =
    tab === 'site-content' || tab === 'masterclasses' || tab === 'overview' || tab === 'courses' || tab === 'settings'
      ? (tab as 'overview' | 'site-content' | 'masterclasses' | 'courses' | 'settings')
      : 'overview'

  return <UnifiedAdminPage userEmail={session.email} initialTab={initialTab} />
}
