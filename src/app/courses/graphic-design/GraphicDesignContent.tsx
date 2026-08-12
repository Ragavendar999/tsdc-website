import { CourseLandingTemplate } from '@/app/components/courses/CourseLandingTemplate'
import { defaultCourseContent, type CourseData } from '@/app/lib/courseContent'

type GraphicDesignContentProps = {
  course?: CourseData
}

export default function GraphicDesignContent({ course = defaultCourseContent['graphic-design'] }: GraphicDesignContentProps) {
  return (
    <CourseLandingTemplate
      course={{ ...course, title: 'AI Powered Graphic Design Program', image: '/Graphic%20Design.png', imageAlt: 'AI Powered Graphic Design Program at TSDC Chennai' }}
    />
  )
}
