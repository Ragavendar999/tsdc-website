import type { Metadata } from 'next'
import MasterclassSuccessPage from '@/app/components/masterclass/MasterclassSuccessPage'
import { isMasterclassVisibleOnLiveSite } from '@/app/lib/masterclasses'
import { getStoredMasterclasses } from '@/lib/masterclasses-store'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'TSDC Masterclass Registration Successful',
  description: 'Your TSDC masterclass registration is confirmed.',
}

export async function generateStaticParams() {
  const masterclasses = await getStoredMasterclasses()
  return masterclasses
    .filter((masterclass) => isMasterclassVisibleOnLiveSite(masterclass))
    .map((masterclass) => ({ slug: masterclass.slug }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <MasterclassSuccessPage slug={slug} />
}
