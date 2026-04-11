import type { Metadata } from 'next'
import UiUxDesignContent from './UiUxDesignContent'
import { breadcrumbSchema, courseSchema, jsonLd } from '@/app/lib/seo'

export const metadata: Metadata = {
  title: 'Best UI/UX Design Course in Chennai | UI UX Design Institute - TSDC',
  description:
    "Enroll in TSDC's UI/UX Design Course in Chennai. Learn Figma, UX research, wireframing, prototyping, product design, design systems and portfolio case studies with real projects.",
  keywords: [
    'Best UI UX Design Course in Chennai',
    'Best UI UX Design Institute in Chennai',
    'Best UI/UX Design Course',
    'Best UI/UX Design Institute',
    'UI UX Design Course Chennai',
    'UI/UX Design Training Chennai',
    'UI UX Design Institute Chennai',
    'UI UX Design Course Perumbakkam',
    'UI UX Design Course Near OMR Chennai',
    'UX Design Course Chennai',
    'Figma Course Chennai',
    'Figma Training Chennai',
    'Product Design Course Chennai',
    'User Experience Design Chennai',
    'User Interface Design Course Chennai',
    'UX Research Course Chennai',
    'Prototyping Course Chennai',
    'TSDC UI UX Design',
  ],
  alternates: {
    canonical: '/courses/uiux-design',
  },
  openGraph: {
    title: 'Best UI/UX Design Course in Chennai | TSDC Creative Education Institute',
    description:
      "Learn Figma, UX research, product design and prototyping with real projects at TSDC's UI/UX Design course in Chennai.",
    url: 'https://traijoedu.in/courses/uiux-design',
    images: [{ url: '/UIUXDesign.png', width: 1200, height: 630, alt: 'Best UI UX Design Course Chennai - TSDC' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best UI/UX Design Course Chennai | TSDC',
    description: 'Master Figma, UX research, prototyping and product design with real projects at TSDC Chennai.',
    images: ['/UIUXDesign.png'],
  },
}

export default function UiUxDesignCoursePage() {
  const schemas = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Courses', path: '/courses' },
      { name: 'UI/UX Design', path: '/courses/uiux-design' },
    ]),
    courseSchema({
      name: 'UI/UX Design Course in Chennai',
      description:
        "Enroll in TSDC's UI/UX Design Course in Chennai. Learn Figma, UX research, wireframing, prototyping, product design, design systems and portfolio case studies with real projects.",
      path: '/courses/uiux-design',
      image: '/UIUXDesign.png',
    }),
  ]

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`uiux-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
        />
      ))}
      <UiUxDesignContent />
    </>
  )
}
