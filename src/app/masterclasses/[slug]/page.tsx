import type { Metadata } from 'next'
import MasterclassLandingPage from '@/app/components/masterclass/MasterclassLandingPage'
import { isMasterclassVisibleOnLiveSite } from '@/app/lib/masterclasses'
import { breadcrumbSchema, eventSchema, jsonLd } from '@/app/lib/seo'
import { getStoredMasterclasses } from '@/lib/masterclasses-store'

export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const masterclasses = await getStoredMasterclasses()
  const masterclass = masterclasses.find((item) => item.slug === slug)

  if (!masterclass || !isMasterclassVisibleOnLiveSite(masterclass)) {
    return {
      title: 'TSDC Masterclass',
      description: 'Join a focused TSDC creative masterclass in Chennai with live learning, certificate, resources and practical portfolio guidance.',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return {
    title: `${masterclass.title} | TSDC Masterclasses`,
    description: masterclass.description,
    alternates: {
      canonical: `/masterclasses/${masterclass.slug}`,
    },
    openGraph: {
      title: `${masterclass.title} | TSDC`,
      description: masterclass.description,
      url: `https://traijoedu.in/masterclasses/${masterclass.slug}`,
      images: [{ url: '/og-banner.png', width: 1200, height: 630, alt: masterclass.title }],
    },
  }
}

export async function generateStaticParams() {
  const masterclasses = await getStoredMasterclasses()
  return masterclasses
    .filter((masterclass) => isMasterclassVisibleOnLiveSite(masterclass))
    .map((masterclass) => ({ slug: masterclass.slug }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const masterclasses = await getStoredMasterclasses()
  const masterclass = masterclasses.find((item) => item.slug === slug)

  const schemas = masterclass
    ? [
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Masterclasses', path: '/masterclasses' },
          { name: masterclass.title, path: `/masterclasses/${masterclass.slug}` },
        ]),
        eventSchema({
          name: masterclass.title,
          description: masterclass.description,
          path: `/masterclasses/${masterclass.slug}`,
          startDate: masterclass.eventDate,
        }),
      ]
    : []

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`masterclass-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
        />
      ))}
      <MasterclassLandingPage slug={slug} />
    </>
  )
}
