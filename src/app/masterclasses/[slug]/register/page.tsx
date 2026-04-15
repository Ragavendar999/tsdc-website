import type { Metadata } from 'next'
import MasterclassRegisterPage from '@/app/components/masterclass/MasterclassRegisterPage'
import { isMasterclassVisibleOnLiveSite } from '@/app/lib/masterclasses'
import { getStoredMasterclasses } from '@/lib/masterclasses-store'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Register for TSDC Masterclass',
  description: 'Register for a TSDC creative masterclass and secure your seat.',
}

export async function generateStaticParams() {
  const masterclasses = await getStoredMasterclasses()
  return masterclasses
    .filter((masterclass) => isMasterclassVisibleOnLiveSite(masterclass))
    .map((masterclass) => ({ slug: masterclass.slug }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <MasterclassRegisterPage slug={slug} />
}
