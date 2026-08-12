import GraphicDesignProgram from '@/app/components/courses/GraphicDesignProgram'
import { defaultCourseContent, type CourseData } from '@/app/lib/courseContent'

type GraphicDesignContentProps = {
  course?: CourseData
}

export default function GraphicDesignContent({ course = defaultCourseContent['graphic-design'] }: GraphicDesignContentProps) {
  return (
    <GraphicDesignProgram
      course={{ ...course, title: 'AI Powered Graphic Design Program', image: '/Graphic%20Design.png', imageAlt: 'AI Powered Graphic Design Program at TSDC Chennai' }}
    />
  )
}
