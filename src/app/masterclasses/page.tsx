import type { Metadata } from 'next'
import MasterclassSection from '@/app/components/masterclass/MasterclassSection'
import { isMasterclassVisibleOnLiveSite } from '../lib/masterclasses'
import { breadcrumbSchema, itemListSchema, jsonLd } from '../lib/seo'
import { getStoredMasterclasses } from '@/lib/masterclasses-store'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'TSDC Masterclasses',
  description:
    'Explore TSDC masterclasses and bootcamps in graphic design, AI-powered creativity, branding, and practical portfolio-building with live guidance.',
  alternates: {
    canonical: '/masterclasses/',
  },
}

export default async function MasterclassesPage() {
  const masterclasses = await getStoredMasterclasses()
  const publicMasterclasses = masterclasses.filter((masterclass) =>
    isMasterclassVisibleOnLiveSite(masterclass)
  )

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Masterclasses', path: '/masterclasses' },
    ]),
    itemListSchema({
      name: 'TSDC Masterclasses',
      items: publicMasterclasses.map((masterclass) => ({
        title: masterclass.title,
        path: `/masterclasses/${masterclass.slug}`,
      })),
    }),
  ]

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`masterclass-list-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
        />
      ))}
      <main>
        <MasterclassSection />
      </main>
    </>
  )
}
