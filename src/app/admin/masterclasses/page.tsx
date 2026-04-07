import type { Metadata } from 'next'
import MasterclassAdminPage from '@/app/components/masterclass/MasterclassAdminPage'

export const metadata: Metadata = {
  title: 'TSDC Admin | Masterclasses',
  robots: {
    index: false,
    follow: false,
  },
}

export default function Page() {
  return <MasterclassAdminPage />
}
