import type { Metadata } from 'next'
import MasterclassSuccessPage from '@/app/components/masterclass/MasterclassSuccessPage'
import { defaultMasterclasses } from '@/app/lib/masterclasses'

export const metadata: Metadata = {
  title: 'TSDC Masterclass Registration Successful',
  description: 'Your TSDC masterclass registration is confirmed.',
}

export function generateStaticParams() {
  return defaultMasterclasses.map((masterclass) => ({ slug: masterclass.slug }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <MasterclassSuccessPage slug={slug} />
}
