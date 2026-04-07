import type { Metadata } from 'next'
import DigitalMarketingContent from './DigitalMarketingContent'

export const metadata: Metadata = {
  title: 'Best Digital Marketing Course in Chennai | SEO, Google Ads & Meta Ads - TSDC',
  description:
    "Enroll in TSDC's Digital Marketing Course in Chennai. Learn SEO, Google Ads, Meta Ads, social media marketing, analytics, content strategy and live campaign execution.",
  keywords: [
    'Best Digital Marketing Course in Chennai',
    'Best Digital Marketing Institute in Chennai',
    'Best Digital Marketing Course',
    'Best Digital Marketing Institute',
    'Digital Marketing Course Chennai',
    'Digital Marketing Training Chennai',
    'Digital Marketing Institute Chennai',
    'Digital Marketing Course Perumbakkam',
    'Digital Marketing Course Near OMR Chennai',
    'SEO Course Chennai',
    'SEO Training Chennai',
    'Google Ads Course Chennai',
    'Meta Ads Training Chennai',
    'Facebook Ads Course Chennai',
    'Social Media Marketing Course Chennai',
    'Content Marketing Course Chennai',
    'Email Marketing Course Chennai',
    'Online Marketing Course Chennai',
    'Performance Marketing Course Chennai',
    'TSDC Digital Marketing',
  ],
  alternates: {
    canonical: '/courses/digital-marketing',
  },
  openGraph: {
    title: 'Best Digital Marketing Course in Chennai | TSDC Creative Education Institute',
    description:
      'Master SEO, Google Ads, Meta Ads and social media with live client campaigns at TSDC Chennai.',
    url: 'https://traijoedu.in/courses/digital-marketing',
    images: [{ url: '/Digital_marketing.png', width: 1200, height: 630, alt: 'Best Digital Marketing Course Chennai - TSDC' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Digital Marketing Course Chennai | TSDC',
    description: 'Learn SEO, Google Ads, Meta Ads, social media strategy and analytics with real campaigns at TSDC Chennai.',
    images: ['/Digital_marketing.png'],
  },
}

export default function DigitalMarketingCoursePage() {
  return <DigitalMarketingContent />
}
