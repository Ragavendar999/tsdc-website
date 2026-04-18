import type { Metadata } from 'next'
import GraphicDesignScholarshipPage from '@/app/components/scholarship/GraphicDesignScholarshipPage'
import { breadcrumbSchema, jsonLd, siteUrl } from '@/app/lib/seo'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does the Rs 99 cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It confirms the scholarship registration, demo class slot, and scholarship evaluation entry for this campaign.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this for beginners?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The scholarship campaign is designed for students and beginners who want to build a creative career in graphic design.',
      },
    },
  ],
}

const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Graphic Design Scholarship and Demo Class 2026',
  description: 'Pay Rs 99 to reserve your TSDC graphic design scholarship entry, demo class slot, and scholarship evaluation opportunity.',
  startDate: '2026-05-02T23:59:59+05:30',
  eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  location: {
    '@type': 'Place',
    name: 'TSDC - Traijo Skill Development Center',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Villa 20, Bollineni Iris, Block 52, Bollineni Hillside Rd',
      addressLocality: 'Perumbakkam',
      addressRegion: 'Tamil Nadu',
      postalCode: '600131',
      addressCountry: 'IN',
    },
  },
  offers: {
    '@type': 'Offer',
    price: '99',
    priceCurrency: 'INR',
    availability: 'https://schema.org/LimitedAvailability',
    url: `${siteUrl}/graphic-design-scholarship`,
  },
}

export const metadata: Metadata = {
  title: 'Graphic Design Scholarship 2026 | Demo Class Registration at Rs 99',
  description:
    'Register for the TSDC Graphic Design Scholarship 2026, book your demo class slot, and unlock up to 100% scholarship opportunities by paying just Rs 99.',
  alternates: {
    canonical: '/graphic-design-scholarship',
  },
}

export default function Page() {
  const schemas = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Graphic Design Scholarship', path: '/graphic-design-scholarship' },
    ]),
    eventSchema,
    faqSchema,
  ]

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`graphic-design-scholarship-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
        />
      ))}
      <GraphicDesignScholarshipPage />
    </>
  )
}
