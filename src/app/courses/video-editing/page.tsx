import type { Metadata } from 'next'
import VideoEditingContent from './VideoEditingContent'
import { defaultCourseContent } from '@/app/lib/courseContent'
import { breadcrumbSchema, courseSchema, faqSchema, jsonLd, reviewSchema } from '@/app/lib/seo'

export const metadata: Metadata = {
  title: 'Video Editing Course in Chennai',
  description:
    "Enroll in TSDC's Video Editing Course in Chennai. Learn Premiere Pro, DaVinci Resolve, reel editing, color grading, showreel building, and real commercial editing projects.",
  keywords: [
    'Best Video Editing Course in Chennai',
    'Best Video Editing Institute in Chennai',
    'Best Video Editing Course',
    'Best Video Editing Institute',
    'Video Editing Course Chennai',
    'Video Editing Training Chennai',
    'Video Editing Institute Chennai',
    'Video Editing Course Perumbakkam',
    'Video Editing Course Near OMR Chennai',
    'Adobe Premiere Pro Course Chennai',
    'DaVinci Resolve Course Chennai',
    'Color Grading Course Chennai',
    'Reel Editing Course Chennai',
    'YouTube Video Editing Course Chennai',
    'Video Production Course Chennai',
    'Cinematic Video Editing Chennai',
    'Film Editing Course Chennai',
    'TSDC Video Editing',
    'Video Editing Certificate Course Chennai',
  ],
  alternates: {
    canonical: '/courses/video-editing/',
  },
  openGraph: {
    title: 'Video Editing Course in Chennai',
    description:
      'Master Premiere Pro, DaVinci Resolve, reel editing, color grading, and showreel building with real commercial projects at TSDC Chennai.',
    url: 'https://traijoedu.in/courses/video-editing/',
    images: [{ url: '/og-banner.png', width: 1200, height: 630, alt: 'Best Video Editing Course Chennai - TSDC' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Video Editing Course in Chennai',
    description: 'Learn Premiere Pro, DaVinci Resolve, reel editing, and showreel-building workflows at TSDC Chennai.',
    images: ['/og-banner.png'],
  },
}

export default function VideoEditingCoursePage() {
  const course = defaultCourseContent['video-editing']
  const schemas = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Courses', path: '/courses' },
      { name: 'Video Editing', path: '/courses/video-editing' },
    ]),
    courseSchema({
      name: 'Video Editing Course in Chennai',
      description:
        "Enroll in TSDC's Video Editing Course in Chennai. Learn Premiere Pro, DaVinci Resolve, reel editing, color grading, showreel building, and real commercial editing projects.",
      path: '/courses/video-editing',
      image: '/og-banner.png',
    }),
    faqSchema(course.faqs),
    reviewSchema({
      itemName: 'Video Editing Course in Chennai',
      itemPath: '/courses/video-editing',
      review: course.testimonial,
    }),
  ]

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`video-editing-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
        />
      ))}
      <VideoEditingContent />
    </>
  )
}
