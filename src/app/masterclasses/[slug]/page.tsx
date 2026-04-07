import type { Metadata } from 'next'
import MasterclassLandingPage from '@/app/components/masterclass/MasterclassLandingPage'
import { defaultMasterclasses } from '@/app/lib/masterclasses'

export const metadata: Metadata = {
  title: 'TSDC Masterclass | Logo Design Masterclass Chennai',
  description:
    'Join a focused TSDC creative masterclass in Chennai with live learning, certificate, resources and practical portfolio guidance.',
}

export function generateStaticParams() {
  return defaultMasterclasses.map((masterclass) => ({ slug: masterclass.slug }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <MasterclassLandingPage slug={slug} />
}
