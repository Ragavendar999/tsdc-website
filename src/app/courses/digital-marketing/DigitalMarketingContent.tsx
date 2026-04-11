'use client'

import { useEffect, useState } from 'react'
import { CourseLandingTemplate } from '@/app/components/courses/CourseLandingTemplate'
import { loadCourseContent, defaultCourseContent, COURSE_CONTENT_UPDATED_EVENT } from '@/app/lib/courseContent'

export default function DigitalMarketingContent() {
  const [course, setCourse] = useState(defaultCourseContent['digital-marketing'])
  useEffect(() => {
    const sync = () => setCourse(loadCourseContent()['digital-marketing'])
    sync()
    window.addEventListener(COURSE_CONTENT_UPDATED_EVENT, sync)
    return () => window.removeEventListener(COURSE_CONTENT_UPDATED_EVENT, sync)
  }, [])
  return <CourseLandingTemplate course={course} />
}
