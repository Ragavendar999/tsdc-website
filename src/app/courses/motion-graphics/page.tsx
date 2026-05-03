import type { Metadata } from 'next'
import MotionGraphicsContent from './MotionGraphicsContent'
import { defaultCourseContent } from '@/app/lib/courseContent'
import { breadcrumbSchema, courseSchema, faqSchema, jsonLd, reviewSchema } from '@/app/lib/seo'

export const metadata: Metadata = {
  title: 'Motion Graphics Course in Chennai',
  description:
    "Join TSDC's Motion Graphics Course in Chennai. Learn After Effects, animated typography, logo animation, social ad motion, explainer scenes, and portfolio-ready commercial motion workflows.",
  keywords: [
    'Motion Graphics Course in Chennai',
    'Best Motion Graphics Course in Chennai',
    'Motion Graphics Institute in Chennai',
    'Motion Graphics Course Chennai',
    'Motion Design Course Chennai',
    'After Effects Course Chennai',
    'Logo Animation Course Chennai',
    'Kinetic Typography Course Chennai',
    'Explainer Video Course Chennai',
    'Social Media Animation Course Chennai',
    'Motion Graphics Classes Chennai',
    'Motion Graphics Training Chennai',
    'Motion Graphics Course Perumbakkam',
    'Motion Graphics Course Near OMR Chennai',
    'TSDC Motion Graphics',
  ],
  alternates: {
    canonical: '/courses/motion-graphics/',
  },
  openGraph: {
    title: 'Motion Graphics Course in Chennai',
    description:
      "Learn After Effects, title animation, logo reveals, social ad motion, and portfolio-ready motion design at TSDC Chennai.",
    url: 'https://traijoedu.in/courses/motion-graphics/',
    images: [{ url: '/graphic.png', width: 1200, height: 630, alt: 'Best Motion Graphics Course Chennai - TSDC' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Motion Graphics Course in Chennai',
    description: 'Master After Effects, kinetic type, explainers, and ad motion systems with real projects at TSDC Chennai.',
    images: ['/graphic.png'],
  },
}

export default function MotionGraphicsCoursePage() {
  const course = defaultCourseContent['motion-graphics']
  const schemas = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Courses', path: '/courses' },
      { name: 'Motion Graphics', path: '/courses/motion-graphics' },
    ]),
    courseSchema({
      name: 'Motion Graphics Course in Chennai',
      description:
        "Join TSDC's Motion Graphics Course in Chennai. Learn After Effects, animated typography, logo animation, social ad motion, explainer scenes, and portfolio-ready commercial motion workflows.",
      path: '/courses/motion-graphics',
      image: '/graphic.png',
    }),
    faqSchema(course.faqs),
    reviewSchema({
      itemName: 'Motion Graphics Course in Chennai',
      itemPath: '/courses/motion-graphics',
      review: course.testimonial,
    }),
  ]

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`motion-graphics-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
        />
      ))}
      <MotionGraphicsContent />
    </>
  )
}
