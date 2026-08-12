import { CourseLandingTemplate } from '@/app/components/courses/CourseLandingTemplate'
import { defaultCourseContent, type CourseData } from '@/app/lib/courseContent'

type UiUxDesignContentProps = {
  course?: CourseData
}

export default function UiUxDesignContent({ course = defaultCourseContent['uiux-design'] }: UiUxDesignContentProps) {
  return <CourseLandingTemplate course={{ ...course, image: '/UIUX%20Design.png', imageAlt: 'UI UX Design Program at TSDC Chennai' }} />
}
