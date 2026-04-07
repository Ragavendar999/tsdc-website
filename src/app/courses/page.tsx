import type { Metadata } from 'next'
import CoursesPage from '../components/courses/CoursesPage'

export const metadata: Metadata = {
  title: 'Creative Courses in Chennai | Graphic Design, UI/UX, Digital Marketing, Video Editing & Motion Graphics',
  description:
    'Explore all creative courses at TSDC Chennai: Graphic Design, UI/UX Design, Digital Marketing, Video Editing and Motion Graphics with real projects, portfolio support and career guidance.',
  keywords: [
    'Creative Education Institute in Chennai',
    'Best Creative Education Institute in Chennai',
    'Creative Courses Chennai',
    'Design Courses Chennai',
    'Graphic Design Course Chennai',
    'Best Graphic Design Course in Chennai',
    'Best Graphic Design Institute in Chennai',
    'UI UX Design Course Chennai',
    'Best UI UX Design Course in Chennai',
    'Best UI UX Design Institute in Chennai',
    'Digital Marketing Course Chennai',
    'Best Digital Marketing Course in Chennai',
    'Best Digital Marketing Institute in Chennai',
    'Video Editing Course Chennai',
    'Best Video Editing Course in Chennai',
    'Best Video Editing Institute in Chennai',
    'Motion Graphics Course Chennai',
    'Best Motion Graphics Course in Chennai',
    'All Design Courses Chennai',
    'Creative Education Chennai',
    'TSDC Courses',
    'Best Design Courses Chennai',
    'Short Term Courses Chennai',
    'Skill Development Courses Chennai',
  ],
  alternates: {
    canonical: '/courses',
  },
  openGraph: {
    title: 'All Courses at TSDC | Creative Education Institute Chennai',
    description:
      'Explore Graphic Design, UI/UX Design, Digital Marketing, Video Editing and Motion Graphics courses in Chennai with practical projects, portfolio support and counselling.',
    url: 'https://traijoedu.in/courses',
    images: [{ url: '/og-banner.png', width: 1200, height: 630, alt: 'TSDC Creative Courses Chennai' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Creative Courses | TSDC Chennai',
    description: 'Explore Graphic Design, UI/UX, Digital Marketing, Video Editing and Motion Graphics courses in Chennai.',
    images: ['/og-banner.png'],
  },
}

export default function Page() {
  return <CoursesPage />
}
