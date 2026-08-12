import 'server-only'
import { createDocStore } from '@/lib/content-store'
import { defaultAboutPage, type AboutPageContent } from '@/app/lib/aboutPage'

const isAboutPageContent = (value: unknown): value is AboutPageContent =>
  typeof value === 'object' && value !== null && 'hero' in value && 'journey' in value && 'people' in value

export const aboutPageStore = createDocStore('aboutPage', defaultAboutPage, isAboutPageContent)
