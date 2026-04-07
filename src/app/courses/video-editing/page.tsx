import type { Metadata } from 'next'
import VideoEditingContent from './VideoEditingContent'

export const metadata: Metadata = {
  title: 'Video Editing Course in Chennai | Premiere Pro, After Effects & DaVinci Resolve Training',
  description:
    'Enroll in TSDC\'s Video Editing Course in Chennai — master Adobe Premiere Pro, After Effects & DaVinci Resolve with cinematic color grading, motion graphics & real commercial projects. Best video editing institute in Chennai.',
  keywords: [
    'Video Editing Course Chennai',
    'Video Editing Training Chennai',
    'Video Editing Institute Chennai',
    'Adobe Premiere Pro Course Chennai',
    'After Effects Course Chennai',
    'DaVinci Resolve Course Chennai',
    'Motion Graphics Course Chennai',
    'Color Grading Course Chennai',
    'Reel Editing Course Chennai',
    'YouTube Video Editing Course Chennai',
    'Video Production Course Chennai',
    'Best Video Editing Course Chennai',
    'Cinematic Video Editing Chennai',
    'Film Editing Course Chennai',
    'TSDC Video Editing',
    'Video Editing Certificate Course Chennai',
  ],
  alternates: {
    canonical: '/courses/video-editing',
  },
  openGraph: {
    title: 'Video Editing Course in Chennai | TSDC Creative Education Institute',
    description:
      'Master Premiere Pro, After Effects & DaVinci Resolve with real commercial projects. Best video editing course in Chennai at TSDC.',
    url: 'https://traijoedu.in/courses/video-editing',
    images: [{ url: '/og-banner.png', width: 1200, height: 630, alt: 'Video Editing Course Chennai – TSDC' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Video Editing Course Chennai | TSDC',
    description: 'Learn Premiere Pro, After Effects & DaVinci Resolve with cinematic color grading & real projects. Best video editing course in Chennai.',
    images: ['/og-banner.png'],
  },
}

export default function VideoEditingCoursePage() {
  return <VideoEditingContent />
}
