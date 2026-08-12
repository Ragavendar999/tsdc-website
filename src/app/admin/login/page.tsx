import type { Metadata } from 'next'
import AdminLoginPage from '@/app/components/masterclass/AdminLoginPage'

export const metadata: Metadata = {
  title: 'TSDC Admin Login',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLoginRoute() {
  return <AdminLoginPage />
}
