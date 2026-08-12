import { CourseLandingTemplate } from '@/app/components/courses/CourseLandingTemplate'
import { defaultCourseContent, type CourseData } from '@/app/lib/courseContent'

type VideoEditingContentProps = {
  course?: CourseData
}

export default function VideoEditingContent({ course = defaultCourseContent['video-editing'] }: VideoEditingContentProps) {
  return <CourseLandingTemplate course={course} />
}
