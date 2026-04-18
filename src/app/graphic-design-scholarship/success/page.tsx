import type { Metadata } from 'next'
import GraphicDesignScholarshipSuccessPage from '@/app/components/scholarship/GraphicDesignScholarshipSuccessPage'

export const metadata: Metadata = {
  title: 'Scholarship Registration Confirmed | TSDC',
  description: 'Your TSDC graphic design scholarship registration is confirmed.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ name?: string; slot?: string }>
}) {
  const params = await searchParams

  return (
    <GraphicDesignScholarshipSuccessPage
      name={params.name || 'Student'}
      slot={params.slot || 'your selected slot'}
    />
  )
}
