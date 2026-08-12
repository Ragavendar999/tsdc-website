import 'server-only'
import { createDocStore } from '@/lib/content-store'
import { defaultContactPage, type ContactPageContent } from '@/app/lib/contactPage'

const isContactPageContent = (value: unknown): value is ContactPageContent =>
  typeof value === 'object' && value !== null && 'hero' in value && 'ways' in value && 'faq' in value

export const contactPageStore = createDocStore('contactPage', defaultContactPage, isContactPageContent)
