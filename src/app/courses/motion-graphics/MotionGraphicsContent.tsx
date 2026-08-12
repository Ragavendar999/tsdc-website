import { CourseLandingTemplate } from '@/app/components/courses/CourseLandingTemplate'
import { defaultCourseContent, type CourseData } from '@/app/lib/courseContent'

type MotionGraphicsContentProps = {
  course?: CourseData
}

export default function MotionGraphicsContent({ course = defaultCourseContent['motion-graphics'] }: MotionGraphicsContentProps) {
  return <CourseLandingTemplate course={{ ...course, image: '/Motion%20Graphics.png', imageAlt: 'Motion Graphics Course at TSDC Chennai' }} />
}
