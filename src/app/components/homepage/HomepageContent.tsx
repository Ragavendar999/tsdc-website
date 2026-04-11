'use client'

import { useEffect, useMemo, useState } from 'react'
import { defaultSiteContent, loadSiteContent, SITE_CONTENT_UPDATED_EVENT } from '@/app/lib/siteContent'
import CoursesSection from './CoursesSection'
import Hero from './Hero'
import JourneyTimeline from './JourneyTimeline'
import WhyTSDC from './WhyTSDC'
import BatchScheduleSection from './BatchScheduleSection'
import MasterclassSection from '../masterclass/MasterclassSection'

const sectionMap = {
  hero: <Hero />,
  'why-tsdc': <WhyTSDC />,
  masterclasses: <MasterclassSection />,
  courses: <CoursesSection />,
  'batch-schedule': <BatchScheduleSection />,
  journey: <JourneyTimeline />,
}

export default function HomepageContent() {
  const [content, setContent] = useState(defaultSiteContent)

  useEffect(() => {
    const syncContent = () => setContent(loadSiteContent())

    syncContent()
    window.addEventListener('storage', syncContent)
    window.addEventListener(SITE_CONTENT_UPDATED_EVENT, syncContent)

    return () => {
      window.removeEventListener('storage', syncContent)
      window.removeEventListener(SITE_CONTENT_UPDATED_EVENT, syncContent)
    }
  }, [])

  const sections = useMemo(
    () => content.homepage.sections.filter((section) => section.enabled && section.id in sectionMap),
    [content.homepage.sections]
  )

  return (
    <div className="-mt-20">
      {sections.map((section) => (
        <div key={section.id}>{sectionMap[section.id as keyof typeof sectionMap]}</div>
      ))}
    </div>
  )
}
