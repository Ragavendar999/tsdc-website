import 'server-only'
import { createDocStore } from '@/lib/content-store'
import { defaultScholarshipPage, type ScholarshipPageContent } from '@/app/lib/scholarshipPage'

const isScholarshipPageContent = (value: unknown): value is ScholarshipPageContent =>
  typeof value === 'object' && value !== null && 'deadline' in value && 'demoSlots' in value && 'registrationFee' in value

export const scholarshipPageStore = createDocStore('scholarshipPage', defaultScholarshipPage, isScholarshipPageContent)
