import 'server-only'
import { createDocStore } from '@/lib/content-store'
import { defaultConversionPages, type ConversionPagesContent } from '@/app/lib/conversionPages'

const isConversionPagesContent = (value: unknown): value is ConversionPagesContent =>
  typeof value === 'object' && value !== null && 'admissions' in value && 'counselling' in value && 'faqs' in value

export const conversionPagesStore = createDocStore('conversionPages', defaultConversionPages, isConversionPagesContent)
