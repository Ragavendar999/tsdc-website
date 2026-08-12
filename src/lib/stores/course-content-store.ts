import 'server-only'
import { createDocStore } from '@/lib/content-store'
import { defaultCourseContent, type AllCourseContent } from '@/app/lib/courseContent'

const isAllCourseContent = (value: unknown): value is AllCourseContent =>
  typeof value === 'object' &&
  value !== null &&
  'graphic-design' in value &&
  'uiux-design' in value &&
  'digital-marketing' in value &&
  'video-editing' in value &&
  'motion-graphics' in value

export const courseContentStore = createDocStore('courseContent', defaultCourseContent, isAllCourseContent)
