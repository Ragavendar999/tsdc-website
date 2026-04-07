import type { Metadata } from 'next'
import AboutStoryPage from '../components/about/AboutStoryPage'

export const metadata: Metadata = {
  title: 'Creative Education Institute in Chennai | About TSDC Creative Courses',
  description:
    "TSDC is a practical creative education institute in Chennai. Learn Graphic Design, UI/UX, Digital Marketing, Video Editing and Motion Graphics with real projects, active industry mentors and career support.",
  keywords: [
    'TSDC Traijo Skill Development Center',
    'Creative Education Institute in Chennai',
    'Best Creative Education Institute in Chennai',
    'Best Graphic Design Institute in Chennai',
    'Best Graphic Design Course in Chennai',
    'Best UI UX Design Institute in Chennai',
    'Best UI UX Design Course in Chennai',
    'Best Digital Marketing Institute in Chennai',
    'Best Digital Marketing Course in Chennai',
    'Best Video Editing Institute in Chennai',
    'Best Video Editing Course in Chennai',
    'Best Motion Graphics Course in Chennai',
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
    'motion graphics course Chennai',
  ],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'TSDC Chennai | Creative Education Institute in Perumbakkam',
    description:
      'Read the story behind TSDC, a Chennai creative education institute built for practical Graphic Design, UI/UX, Digital Marketing, Video Editing and Motion Graphics training.',
    url: 'https://traijoedu.in/about',
    siteName: 'TSDC - Traijo Skill Development Center',
    images: [{ url: '/og-banner.png', width: 1200, height: 630, alt: 'About TSDC Chennai Creative Courses' }],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About TSDC Chennai | Creative Education Institute in Perumbakkam',
    description:
      'A practical creative education institute in Chennai for Graphic Design, UI/UX, Digital Marketing, Video Editing and Motion Graphics.',
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
        'TSDC is a practical creative education institute in Perumbakkam, Chennai for Graphic Design, UI/UX Design, Digital Marketing, Video Editing and Motion Graphics courses.',
    },
    {
      '@type': 'Course',
      name: 'Graphic Design Mastery Program',
      description: 'Best Graphic Design Course in Chennai with branding, posters, packaging, logo design, social media creatives and portfolio projects.',
      provider: { '@id': 'https://traijoedu.in/#organization' },
      url: 'https://traijoedu.in/courses/graphic-design',
    },
    {
      '@type': 'Course',
      name: 'UI/UX Design Mastery Program',
      description: 'Best UI UX Design Course in Chennai with Figma, user journeys, wireframes, product design, case studies and portfolio building.',
      provider: { '@id': 'https://traijoedu.in/#organization' },
      url: 'https://traijoedu.in/courses/uiux-design',
    },
    {
      '@type': 'Course',
      name: 'Digital Marketing Program',
      description: 'Best Digital Marketing Course in Chennai covering SEO, Meta Ads, Google Ads, analytics, content strategy and growth campaigns.',
      provider: { '@id': 'https://traijoedu.in/#organization' },
      url: 'https://traijoedu.in/courses/digital-marketing',
    },
    {
      '@type': 'Course',
      name: 'Video Editing Mastery Program',
      description: 'Best Video Editing and Motion Graphics Course in Chennai covering Premiere Pro, After Effects, reels, ads, YouTube content and portfolio-ready editing projects.',
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
