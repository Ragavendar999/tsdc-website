import type { Metadata } from 'next'
import LegalPageTemplate from '@/app/components/common/LegalPageTemplate'
import { legalPages } from '@/app/lib/legalPages'

export const metadata: Metadata = {
  title: 'Cookie Consent | TSDC',
  description: 'Cookie consent information for Traijo Skill Development Center.',
}

export default function CookieConsentPage() {
  return <LegalPageTemplate page={legalPages['cookie-consent']} />
}
