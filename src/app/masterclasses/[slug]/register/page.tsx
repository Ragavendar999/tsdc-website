import type { Metadata } from 'next'
import MasterclassRegisterPage from '@/app/components/masterclass/MasterclassRegisterPage'
import { defaultMasterclasses, isMasterclassVisibleOnLiveSite } from '@/app/lib/masterclasses'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Register for TSDC Masterclass',
  description: 'Register for a TSDC creative masterclass and secure your seat.',
}

export function generateStaticParams() {
  return defaultMasterclasses
    .filter((masterclass) => isMasterclassVisibleOnLiveSite(masterclass))
    .map((masterclass) => ({ slug: masterclass.slug }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <MasterclassRegisterPage slug={slug} />
}
