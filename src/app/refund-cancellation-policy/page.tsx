import type { Metadata } from 'next'
import LegalPageTemplate from '@/app/components/common/LegalPageTemplate'
import { legalPages } from '@/app/lib/legalPages'

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | TSDC',
  description: 'Refund and cancellation policy for Traijo Skill Development Center.',
}

export default function RefundCancellationPolicyPage() {
  return <LegalPageTemplate page={legalPages['refund-cancellation-policy']} />
}
