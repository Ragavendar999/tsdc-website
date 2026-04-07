import type { Metadata } from 'next'
import LegalPageTemplate from '@/app/components/common/LegalPageTemplate'
import { legalPages } from '@/app/lib/legalPages'

export const metadata: Metadata = {
  title: 'Privacy Policy | TSDC',
  description: 'Privacy Policy for Traijo Skill Development Center.',
}

export default function PrivacyPolicyPage() {
  return <LegalPageTemplate page={legalPages['privacy-policy']} />
}
