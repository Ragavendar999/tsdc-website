import type { Metadata } from 'next'
import Hero from './components/homepage/Hero'
import CoursesSection from './components/homepage/CoursesSection'
import WhyTSDC from './components/homepage/WhyTSDC'
import JourneyTimeline from './components/homepage/JourneyTimeline'
import MasterclassSection from './components/masterclass/MasterclassSection'

export const metadata: Metadata = {
  title: 'Best Creative Courses in Chennai for Graphic Design, UI UX, Marketing and Video Editing',
  description:
    'Launch your creative career with TSDC in Chennai. Explore Graphic Design, UI UX Design, Digital Marketing and Video Editing courses with live projects, portfolio building, mentorship and placement support.',
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
