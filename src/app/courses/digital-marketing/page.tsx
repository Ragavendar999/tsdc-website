import type { Metadata } from 'next'
import DigitalMarketingContent from './DigitalMarketingContent'

export const metadata: Metadata = {
  title: 'Digital Marketing Course in Chennai | SEO, Google Ads & Social Media Training',
  description:
    'Enroll in TSDC\'s Digital Marketing Course in Chennai — master SEO, Google Ads, Meta Ads, social media strategy & analytics with live client campaigns. Best digital marketing institute in Chennai with certified training.',
  keywords: [
    'Digital Marketing Course Chennai',
    'Digital Marketing Training Chennai',
    'Digital Marketing Institute Chennai',
    'SEO Course Chennai',
    'SEO Training Chennai',
    'Google Ads Course Chennai',
    'Meta Ads Training Chennai',
    'Facebook Ads Course Chennai',
    'Social Media Marketing Course Chennai',
    'Content Marketing Course Chennai',
    'Email Marketing Course Chennai',
    'Best Digital Marketing Course Chennai',
    'Online Marketing Course Chennai',
    'Performance Marketing Course Chennai',
    'TSDC Digital Marketing',
  ],
  alternates: {
    canonical: '/courses/digital-marketing',
  },
  openGraph: {
    title: 'Digital Marketing Course in Chennai | TSDC Creative Education Institute',
    description:
      'Master SEO, Google Ads, Meta Ads & social media with live client campaigns. Best digital marketing course in Chennai at TSDC.',
    url: 'https://traijoedu.in/courses/digital-marketing',
    images: [{ url: '/Digital_marketing.png', width: 1200, height: 630, alt: 'Digital Marketing Course Chennai – TSDC' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Marketing Course Chennai | TSDC',
    description: 'Learn SEO, Google Ads, Meta Ads & social media strategy with real campaigns. Best digital marketing course in Chennai.',
    images: ['/Digital_marketing.png'],
  },
}

export default function DigitalMarketingCoursePage() {
  return <DigitalMarketingContent />
}
