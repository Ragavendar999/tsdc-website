import type { Metadata } from 'next'
import AboutStoryPage from '../components/about/AboutStoryPage'

export const metadata: Metadata = {
  title: 'TSDC Chennai | Graphic Design, UI UX & Digital Marketing Courses',
  description:
    "TSDC is Chennai's practical creative skills institute in Perumbakkam. Learn Graphic Design, UI/UX, Digital Marketing and Video Editing with real projects, active industry mentors and career support.",
  keywords: [
    'TSDC Traijo Skill Development Center',
    'graphic design course in Chennai',
    'UI UX design course Chennai',
    'digital marketing course Perumbakkam',
    'video editing course Chennai',
    'design institute in Chennai',
    'best creative course in Chennai',
    'design school near Perumbakkam',
    'UI UX course south Chennai',
    'freelance design skills Chennai',
    'creative career courses Tamil Nadu',
    'practical UI UX course with placement Chennai',
    'graphic design course for beginners Chennai',
    'digital marketing training south Chennai',
    'design institute near OMR Chennai',
  ],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'TSDC Chennai | Practical Creative Skills Institute in Perumbakkam',
    description:
      'Read the story behind TSDC, a Chennai creative institute built for practical Graphic Design, UI/UX, Digital Marketing and Video Editing training.',
    url: 'https://traijoedu.in/about',
    siteName: 'TSDC - Traijo Skill Development Center',
    images: [{ url: '/og-banner.png', width: 1200, height: 630, alt: 'About TSDC Chennai Creative Courses' }],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About TSDC Chennai | Creative Courses in Perumbakkam',
    description:
      'A practical creative skills institute in Chennai for Graphic Design, UI/UX, Digital Marketing and Video Editing.',
    images: ['/og-banner.png'],
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'EducationalOrganization'],
      '@id': 'https://traijoedu.in/#organization',
      name: 'TSDC - Traijo Skill Development Center',
      url: 'https://traijoedu.in',
      logo: 'https://traijoedu.in/logo.png',
      image: 'https://traijoedu.in/og-banner.png',
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
      description:
        'TSDC is a practical creative skills institute in Perumbakkam, Chennai for Graphic Design, UI/UX Design, Digital Marketing and Video Editing courses.',
    },
    {
      '@type': 'Course',
      name: 'Graphic Design Mastery Program',
      description: 'Practical graphic design course in Chennai with branding, posters, packaging, social media creatives and portfolio projects.',
      provider: { '@id': 'https://traijoedu.in/#organization' },
      url: 'https://traijoedu.in/courses/graphic-design',
    },
    {
      '@type': 'Course',
      name: 'UI/UX Design Mastery Program',
      description: 'Practical UI UX design course in Chennai with Figma, user journeys, wireframes, case studies and portfolio building.',
      provider: { '@id': 'https://traijoedu.in/#organization' },
      url: 'https://traijoedu.in/courses/uiux-design',
    },
    {
      '@type': 'Course',
      name: 'Digital Marketing Program',
      description: 'Digital marketing course in Perumbakkam and south Chennai covering SEO, Meta Ads, Google Ads, analytics and growth campaigns.',
      provider: { '@id': 'https://traijoedu.in/#organization' },
      url: 'https://traijoedu.in/courses/digital-marketing',
    },
    {
      '@type': 'Course',
      name: 'Video Editing Mastery Program',
      description: 'Video editing course in Chennai covering Premiere Pro, reels, ads, YouTube content and portfolio-ready editing projects.',
      provider: { '@id': 'https://traijoedu.in/#organization' },
      url: 'https://traijoedu.in/courses/video-editing',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What courses does TSDC offer in Chennai?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'TSDC offers Graphic Design, UI/UX Design, Digital Marketing, Video Editing, and Motion Graphics programs in Chennai.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where is TSDC located?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'TSDC is located in Perumbakkam, Chennai, accessible from Medavakkam, Sholinganallur, Tambaram, Velachery, and OMR.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is TSDC good for beginners?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. TSDC programs are designed for beginners and move from fundamentals into practical, industry-relevant projects.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does TSDC provide placement assistance?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. TSDC provides portfolio reviews, mentoring, interview preparation and placement support for creative career paths.',
          },
        },
        {
          '@type': 'Question',
          name: 'How is TSDC different from other design institutes in Chennai?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'TSDC is built around real project output, active industry mentors, practical portfolio building and career-focused creative training.',
          },
        },
      ],
    },
  ],
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema).replace(/</g, '\\u003c'),
        }}
      />
      <AboutStoryPage />
    </>
  )
}
