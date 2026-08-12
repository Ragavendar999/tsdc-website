import 'server-only'
import { createDocStore } from '@/lib/content-store'
import { defaultSiteSettings, type SiteSettings } from '@/app/lib/siteSettings'

const isSiteSettings = (value: unknown): value is SiteSettings =>
  typeof value === 'object' &&
  value !== null &&
  'payment' in value &&
  'email' in value &&
  'general' in value

export const siteSettingsStore = createDocStore('siteSettings', defaultSiteSettings, isSiteSettings)
