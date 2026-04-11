/* ─────────────────────────────────────────────────────────────
   Site-wide admin settings
   Stored in localStorage so admin can configure without code changes.
   Client components read these; API routes accept overrides in body.
───────────────────────────────────────────────────────────── */

export const SITE_SETTINGS_KEY = 'tsdc-site-settings-v1'
export const SITE_SETTINGS_UPDATED_EVENT = 'tsdc-site-settings-updated'

export type MailTriggers = {
  masterclassPaid: boolean        // email when student pays
  masterclassAbandoned: boolean   // email when student drops at payment
  masterclassExpiry: boolean      // email when masterclass is 1-2 days away
  contactEnquiry: boolean         // email on contact form submit
  contactCoupon: boolean          // auto-coupon email to "joining immediately" students
}

export type SiteSettings = {
  payment: {
    mode: 'test' | 'live'         // display only — real keys live in .env.local
    keyIdDisplay: string          // read-only, injected at runtime from env
    currency: string
    brandName: string
    brandColor: string
  }
  email: {
    notificationRecipient: string // overrides CONTACT_TO_EMAIL
    senderDisplay: string         // "TSDC <onboarding@resend.dev>"
    triggers: MailTriggers
  }
  general: {
    siteName: string
    adminPhone: string
    whatsappNumber: string
    instagramHandle: string
  }
}

export const defaultSiteSettings: SiteSettings = {
  payment: {
    mode: 'live',
    keyIdDisplay: '',
    currency: 'INR',
    brandName: 'TSDC Masterclass',
    brandColor: '#3244b5',
  },
  email: {
    notificationRecipient: 'n.ragavendar@gmail.com',
    senderDisplay: 'TSDC <onboarding@resend.dev>',
    triggers: {
      masterclassPaid: true,
      masterclassAbandoned: true,
      masterclassExpiry: true,
      contactEnquiry: true,
      contactCoupon: true,
    },
  },
  general: {
    siteName: 'TSDC – Traijo Skill Development Center',
    adminPhone: '+91 73581 16929',
    whatsappNumber: '917358116929',
    instagramHandle: 'tsdcedu',
  },
}

function mergeSettings(stored: Partial<SiteSettings>): SiteSettings {
  return {
    payment: { ...defaultSiteSettings.payment, ...(stored.payment ?? {}) },
    email: {
      ...defaultSiteSettings.email,
      ...(stored.email ?? {}),
      triggers: { ...defaultSiteSettings.email.triggers, ...(stored.email?.triggers ?? {}) },
    },
    general: { ...defaultSiteSettings.general, ...(stored.general ?? {}) },
  }
}

export function loadSiteSettings(): SiteSettings {
  if (typeof window === 'undefined') return defaultSiteSettings
  try {
    const raw = localStorage.getItem(SITE_SETTINGS_KEY)
    if (!raw) return defaultSiteSettings
    return mergeSettings(JSON.parse(raw))
  } catch {
    return defaultSiteSettings
  }
}

export function persistSiteSettings(settings: SiteSettings): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(SITE_SETTINGS_KEY, JSON.stringify(settings))
  window.dispatchEvent(new CustomEvent(SITE_SETTINGS_UPDATED_EVENT))
}
