import Hero from './components/homepage/Hero'
import CoursesSection from './components/homepage/CoursesSection'
import WhyTSDC from './components/homepage/WhyTSDC'
import JourneyTimeline from './components/homepage/JourneyTimeline'



export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyTSDC />
      <JourneyTimeline />
      <CoursesSection />
      {/* Add more components here like <InternshipFlow />, <ProjectsGallery />, etc. */}
    </>
  )
}
