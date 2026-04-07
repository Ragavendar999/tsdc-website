import type { Metadata } from 'next'
import GraphicDesignContent from './GraphicDesignContent'

export const metadata: Metadata = {
  title: 'Graphic Design Course in Chennai | Photoshop, Illustrator & Branding Training',
  description:
    'Enroll in TSDC\'s Graphic Design Course in Chennai — master Adobe Photoshop, Illustrator & InDesign with real client projects, branding, packaging & a job-ready portfolio. ISO 9001:2015 certified creative education institute.',
  keywords: [
    'Graphic Design Course Chennai',
    'Graphic Design Training Chennai',
    'Graphic Design Institute Chennai',
    'Adobe Photoshop Course Chennai',
    'Adobe Illustrator Course Chennai',
    'Branding Course Chennai',
    'Logo Design Course Chennai',
    'Creative Design Course Chennai',
    'Best Graphic Design Course Chennai',
    'Graphic Design Certification Chennai',
    'Visual Design Course Chennai',
    'TSDC Graphic Design',
  ],
  alternates: {
    canonical: '/courses/graphic-design',
  },
  openGraph: {
    title: 'Graphic Design Course in Chennai | TSDC Creative Education Institute',
    description:
      'Join Chennai\'s top Graphic Design program — Adobe Photoshop, Illustrator, real brand projects & a portfolio that gets you hired. ISO-certified. Apply now.',
    url: 'https://traijoedu.in/courses/graphic-design',
    images: [{ url: '/graphic.png', width: 1200, height: 630, alt: 'Graphic Design Course Chennai – TSDC' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Graphic Design Course Chennai | TSDC',
    description: 'Master Photoshop, Illustrator & branding with real client projects. Best Graphic Design course in Chennai.',
    images: ['/graphic.png'],
  },
}

export default function GraphicDesignCoursePage() {
  return <GraphicDesignContent />
}
