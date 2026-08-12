import type { Metadata } from 'next'
import ConversionLanding from '../components/conversion/ConversionLanding'
import { conversionPagesStore } from '@/lib/stores/conversion-pages-store'
export const metadata: Metadata = { title: 'Admissions | TSDC Chennai', description: 'Start your admission journey for TSDC creative courses in Chennai. Explore the application, counselling, batch confirmation and secure payment process.', alternates: { canonical: '/admissions/' } }
export const dynamic = 'force-dynamic'
export default async function AdmissionsPage() {
  const content = await conversionPagesStore.get()
  return <ConversionLanding kind="admissions" content={content} />
}
