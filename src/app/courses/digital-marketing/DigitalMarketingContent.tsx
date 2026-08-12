import { CourseLandingTemplate } from '@/app/components/courses/CourseLandingTemplate'
import { defaultCourseContent, type CourseData } from '@/app/lib/courseContent'

type DigitalMarketingContentProps = {
  course?: CourseData
}

export default function DigitalMarketingContent({ course = defaultCourseContent['digital-marketing'] }: DigitalMarketingContentProps) {
  return <CourseLandingTemplate course={course} />
}
