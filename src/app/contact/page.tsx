import type { Metadata } from 'next'
import React from 'react'
import ContactSection from '../components/contact/ContactSection'

export const metadata: Metadata = {
  title: 'Contact TSDC | Creative Education Institute in Chennai',
  description:
    'Contact TSDC (Traijo Skill Development Center) to enroll in Graphic Design, UI/UX Design, Digital Marketing, Video Editing or Motion Graphics courses in Chennai. Call, WhatsApp or fill our form - admissions open now.',
  keywords: [
    'Contact TSDC Chennai',
    'Creative Education Institute in Chennai',
    'Best Creative Education Institute in Chennai',
    'Enroll Design Course Chennai',
    'Enroll Graphic Design Course Chennai',
    'Enroll UI UX Design Course Chennai',
    'Enroll Digital Marketing Course Chennai',
    'Enroll Video Editing Course Chennai',
    'Enroll Motion Graphics Course Chennai',
    'TSDC Admission',
    'Design Course Enquiry Chennai',
    'TSDC WhatsApp',
    'Creative Course Admission Chennai',
    'Traijo Skill Development Center Contact',
    'TSDC Phone Number',
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact TSDC | Creative Education Institute in Chennai',
    description:
      "Get in touch with TSDC, Chennai's creative education institute. Enroll in Graphic Design, UI/UX, Digital Marketing, Video Editing or Motion Graphics today.",
    url: 'https://traijoedu.in/contact',
    images: [{ url: '/og-banner.png', width: 1200, height: 630, alt: 'Contact TSDC Chennai' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact TSDC | Creative Courses Chennai',
    description: 'Enroll in creative design, marketing, video editing and motion graphics courses in Chennai. Contact TSDC now.',
    images: ['/og-banner.png'],
  },
}

export default function ContactPage() {
  return (
    <div className="bg-transparent text-gray-900 transition-colors duration-300">
      <main className="pt-0">
        <ContactSection />
      </main>
    </div>
  )
}
