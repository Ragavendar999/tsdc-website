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
  searchParams?: Promise<{ tab?: string }>
}) {
  const session = await verifyAdminSession()

  if (!session?.email) {
    redirect('/admin/login')
  }

  const resolvedSearchParams = await searchParams
  const tab = resolvedSearchParams?.tab
  const initialTab =
    tab === 'site-content' || tab === 'masterclasses' || tab === 'overview' || tab === 'courses' || tab === 'settings' || tab === 'blog'
      ? (tab as 'overview' | 'site-content' | 'masterclasses' | 'courses' | 'settings' | 'blog')
      : 'overview'

  return <UnifiedAdminPage userEmail={session.email} initialTab={initialTab} />
}
