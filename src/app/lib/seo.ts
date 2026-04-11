type BreadcrumbItem = {
  name: string
  path: string
}

export const siteUrl = 'https://traijoedu.in'

export const jsonLd = (value: object) => JSON.stringify(value).replace(/</g, '\\u003c')

export const breadcrumbSchema = (items: BreadcrumbItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${siteUrl}${item.path}`,
  })),
})

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['EducationalOrganization', 'LocalBusiness'],
  '@id': `${siteUrl}/#organization`,
  name: 'TSDC - Traijo Skill Development Center',
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: `${siteUrl}/og-banner.png`,
  telephone: '+91-73581-16929',
  email: 'support@traijoedu.in',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Villa 20, Block 52, Bollineni Hillside Rd, Nookampalayam',
    addressLocality: 'Perumbakkam',
    addressRegion: 'Tamil Nadu',
    postalCode: '600131',
    addressCountry: 'IN',
  },
  areaServed: ['Perumbakkam', 'Sholinganallur', 'Medavakkam', 'Tambaram', 'Velachery', 'OMR', 'Chennai'],
  sameAs: [
    'https://www.instagram.com/traijosdc_official/',
    'https://www.facebook.com/Traijosdc',
    'https://in.linkedin.com/company/traijoskilldevelopmentcenter',
  ],
}

export const courseSchema = ({
  name,
  description,
  path,
  image,
}: {
  name: string
  description: string
  path: string
  image: string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name,
  description,
  url: `${siteUrl}${path}`,
  image: `${siteUrl}${image}`,
  provider: {
    '@id': `${siteUrl}/#organization`,
  },
})

export const itemListSchema = ({
  name,
  items,
}: {
  name: string
  items: { title: string; path: string }[]
}) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name,
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.title,
    url: `${siteUrl}${item.path}`,
  })),
})

export const eventSchema = ({
  name,
  description,
  path,
  startDate,
}: {
  name: string
  description: string
  path: string
  startDate?: string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Event',
  name,
  description,
  url: `${siteUrl}${path}`,
  eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  organizer: {
    '@id': `${siteUrl}/#organization`,
  },
  ...(startDate ? { startDate } : {}),
})
