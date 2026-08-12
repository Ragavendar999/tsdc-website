import type { Metadata } from 'next'
import ConversionLanding from '../components/conversion/ConversionLanding'
import { conversionPagesStore } from '@/lib/stores/conversion-pages-store'
export const metadata: Metadata = { title: 'Free Career Counselling | TSDC Chennai', description: 'Book free career counselling with TSDC Chennai to choose the right creative course, learning mode and next step.', alternates: { canonical: '/career-counselling/' } }
export const dynamic = 'force-dynamic'
export default async function CareerCounsellingPage() {
  const content = await conversionPagesStore.get()
  return <ConversionLanding kind="counselling" content={content} />
}
