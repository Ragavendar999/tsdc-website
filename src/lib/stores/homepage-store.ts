import 'server-only'
import { createDocStore } from '@/lib/content-store'
import { defaultHomepageContent, type HomepageContentData } from '@/app/lib/homepage'

const isHomepageContent = (value: unknown): value is HomepageContentData =>
  typeof value === 'object' && value !== null && 'hero' in value && 'programsSection' in value

export const homepageStore = createDocStore('homepage', defaultHomepageContent, isHomepageContent)
