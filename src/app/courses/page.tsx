import type { Metadata } from 'next'
import CoursesPage from '../components/courses/CoursesPage'

export const metadata: Metadata = {
  title: 'All Courses | Graphic Design, UI/UX, Digital Marketing & Video Editing in Chennai',
  description:
    'Explore all creative courses at TSDC Chennai: Graphic Design, UI/UX Design, Digital Marketing and Video Editing with real projects, portfolio support and career guidance.',
  keywords: [
    'Creative Courses Chennai',
    'Design Courses Chennai',
    'Graphic Design Course Chennai',
    'UI UX Design Course Chennai',
    'Digital Marketing Course Chennai',
    'Video Editing Course Chennai',
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
      'Explore Graphic Design, UI/UX Design, Digital Marketing and Video Editing courses in Chennai with practical projects, portfolio support and counselling.',
    url: 'https://traijoedu.in/courses',
    images: [{ url: '/og-banner.png', width: 1200, height: 630, alt: 'TSDC Creative Courses Chennai' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Creative Courses | TSDC Chennai',
    description: 'Explore Graphic Design, UI/UX, Digital Marketing and Video Editing courses in Chennai.',
    images: ['/og-banner.png'],
  },
}

export default function Page() {
  return <CoursesPage />
}
