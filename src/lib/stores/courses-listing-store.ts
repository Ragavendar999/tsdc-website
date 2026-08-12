import 'server-only'
import { createDocStore } from '@/lib/content-store'
import { defaultCoursesListing, type CoursesListingContent } from '@/app/lib/coursesListing'

const isCoursesListingContent = (value: unknown): value is CoursesListingContent =>
  typeof value === 'object' && value !== null && 'hero' in value && 'listing' in value

export const coursesListingStore = createDocStore('coursesListing', defaultCoursesListing, isCoursesListingContent)
