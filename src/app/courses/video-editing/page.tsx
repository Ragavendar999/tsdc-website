import type { Metadata } from 'next'
import VideoEditingContent from './VideoEditingContent'
import { breadcrumbSchema, courseSchema, jsonLd } from '@/app/lib/seo'

export const metadata: Metadata = {
  title: 'Best Video Editing & Motion Graphics Course in Chennai | Premiere Pro & After Effects - TSDC',
  description:
    "Enroll in TSDC's Video Editing and Motion Graphics Course in Chennai. Learn Premiere Pro, After Effects, DaVinci Resolve, reel editing, color grading and real commercial projects.",
  keywords: [
    'Best Video Editing Course in Chennai',
    'Best Video Editing Institute in Chennai',
    'Best Video Editing Course',
    'Best Video Editing Institute',
    'Best Motion Graphics Course in Chennai',
    'Motion Graphics Institute in Chennai',
    'Video Editing Course Chennai',
    'Video Editing Training Chennai',
    'Video Editing Institute Chennai',
    'Video Editing Course Perumbakkam',
    'Video Editing Course Near OMR Chennai',
    'Adobe Premiere Pro Course Chennai',
    'After Effects Course Chennai',
    'DaVinci Resolve Course Chennai',
    'Motion Graphics Course Chennai',
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
    canonical: '/courses/video-editing',
  },
  openGraph: {
    title: 'Best Video Editing & Motion Graphics Course in Chennai | TSDC Creative Education Institute',
    description:
      'Master Premiere Pro, After Effects, DaVinci Resolve and motion graphics with real commercial projects at TSDC Chennai.',
    url: 'https://traijoedu.in/courses/video-editing',
    images: [{ url: '/og-banner.png', width: 1200, height: 630, alt: 'Best Video Editing and Motion Graphics Course Chennai - TSDC' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Video Editing & Motion Graphics Course Chennai | TSDC',
    description: 'Learn Premiere Pro, After Effects, DaVinci Resolve, reel editing and motion graphics at TSDC Chennai.',
    images: ['/og-banner.png'],
  },
}

export default function VideoEditingCoursePage() {
  const schemas = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Courses', path: '/courses' },
      { name: 'Video Editing', path: '/courses/video-editing' },
    ]),
    courseSchema({
      name: 'Video Editing and Motion Graphics Course in Chennai',
      description:
        "Enroll in TSDC's Video Editing and Motion Graphics Course in Chennai. Learn Premiere Pro, After Effects, DaVinci Resolve, reel editing, color grading and real commercial projects.",
      path: '/courses/video-editing',
      image: '/og-banner.png',
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
