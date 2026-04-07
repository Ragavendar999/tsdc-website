import type { Metadata } from 'next'
import LegalPageTemplate from '@/app/components/common/LegalPageTemplate'
import { legalPages } from '@/app/lib/legalPages'

export const metadata: Metadata = {
  title: 'Terms & Conditions | TSDC',
  description: 'Terms and conditions for Traijo Skill Development Center.',
}

export default function TermsConditionsPage() {
  return <LegalPageTemplate page={legalPages['terms-conditions']} />
}
