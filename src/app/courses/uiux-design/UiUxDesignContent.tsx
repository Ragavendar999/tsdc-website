'use client'

import { useEffect, useState } from 'react'
import { CourseLandingTemplate } from '@/app/components/courses/CourseLandingTemplate'
import { loadCourseContent, defaultCourseContent, COURSE_CONTENT_UPDATED_EVENT } from '@/app/lib/courseContent'

export default function UiUxDesignContent() {
  const [course, setCourse] = useState(defaultCourseContent['uiux-design'])
  useEffect(() => {
    const sync = () => setCourse(loadCourseContent()['uiux-design'])
    sync()
    window.addEventListener(COURSE_CONTENT_UPDATED_EVENT, sync)
    return () => window.removeEventListener(COURSE_CONTENT_UPDATED_EVENT, sync)
  }, [])
  return <CourseLandingTemplate course={course} />
}
