import type { Metadata } from 'next'
import GraphicDesignContent from './GraphicDesignContent'
import { breadcrumbSchema, courseSchema, jsonLd } from '@/app/lib/seo'

export const metadata: Metadata = {
  title: 'Best Graphic Design Course in Chennai | Best Graphic Design Institute - TSDC',
  description:
    "Enroll in TSDC's Graphic Design Course in Chennai. Learn Adobe Photoshop, Illustrator, InDesign, branding, logo design, packaging and portfolio projects at a job-focused creative education institute.",
  keywords: [
    'Best Graphic Design Course in Chennai',
    'Best Graphic Design Institute in Chennai',
    'Best Graphic Design Course',
    'Best Graphic Design Institute',
    'Graphic Design Course Chennai',
    'Graphic Design Training Chennai',
    'Graphic Design Institute Chennai',
    'Graphic Design Classes Chennai',
    'Graphic Design Course Perumbakkam',
    'Graphic Design Course Near OMR Chennai',
    'Adobe Photoshop Course Chennai',
    'Adobe Illustrator Course Chennai',
    'Adobe InDesign Course Chennai',
    'Branding Course Chennai',
    'Logo Design Course Chennai',
    'Creative Design Course Chennai',
    'Graphic Design Certification Chennai',
    'Visual Design Course Chennai',
    'TSDC Graphic Design',
  ],
  alternates: {
    canonical: '/courses/graphic-design',
  },
  openGraph: {
    title: 'Best Graphic Design Course in Chennai | TSDC Creative Education Institute',
    description:
      "Join TSDC's Graphic Design program in Chennai for Photoshop, Illustrator, branding, logo design, real projects and a job-ready portfolio.",
    url: 'https://traijoedu.in/courses/graphic-design',
    images: [{ url: '/graphic.png', width: 1200, height: 630, alt: 'Best Graphic Design Course Chennai - TSDC' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Graphic Design Course Chennai | TSDC',
    description: 'Master Photoshop, Illustrator, branding and logo design with real projects at TSDC Chennai.',
    images: ['/graphic.png'],
  },
}

export default function GraphicDesignCoursePage() {
  const schemas = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Courses', path: '/courses' },
      { name: 'Graphic Design', path: '/courses/graphic-design' },
    ]),
    courseSchema({
      name: 'Graphic Design Course in Chennai',
      description:
        "Enroll in TSDC's Graphic Design Course in Chennai. Learn Adobe Photoshop, Illustrator, InDesign, branding, logo design, packaging and portfolio projects at a job-focused creative education institute.",
      path: '/courses/graphic-design',
      image: '/graphic.png',
    }),
  ]

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`graphic-design-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
        />
      ))}
      <GraphicDesignContent />
    </>
  )
}
