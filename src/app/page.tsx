import type { Metadata } from 'next'
import Hero from './components/homepage/Hero'
import CoursesSection from './components/homepage/CoursesSection'
import WhyTSDC from './components/homepage/WhyTSDC'
import JourneyTimeline from './components/homepage/JourneyTimeline'
import MasterclassSection from './components/masterclass/MasterclassSection'

export const metadata: Metadata = {
  title: 'Best Creative Education Institute in Chennai | Graphic Design, UI UX, Digital Marketing, Video Editing & Motion Graphics',
  description:
    'Launch your creative career with TSDC, a creative education institute in Chennai for Graphic Design, UI UX Design, Digital Marketing, Video Editing and Motion Graphics courses with live projects, portfolio building, mentorship and placement support.',
  keywords: [
    'Creative Education Institute in Chennai',
    'Best Creative Education Institute in Chennai',
    'Best Graphic Design Course in Chennai',
    'Best Graphic Design Institute in Chennai',
    'Best UI UX Design Course in Chennai',
    'Best UI UX Design Institute in Chennai',
    'Best Digital Marketing Course in Chennai',
    'Best Digital Marketing Institute in Chennai',
    'Best Video Editing Course in Chennai',
    'Best Video Editing Institute in Chennai',
    'Best Motion Graphics Course in Chennai',
    'Graphic Design Course Chennai',
    'UI UX Design Course Chennai',
    'Digital Marketing Course Chennai',
    'Video Editing Course Chennai',
    'Motion Graphics Course Chennai',
    'Design Institute Near OMR Chennai',
    'Creative Courses Perumbakkam Chennai',
    'TSDC Chennai',
  ],
}

export default function HomePage() {
  return (
    <div className="-mt-20">
      <Hero />
      <WhyTSDC />
      <MasterclassSection />
      <JourneyTimeline />
      <CoursesSection />
    </div>
  )
}
