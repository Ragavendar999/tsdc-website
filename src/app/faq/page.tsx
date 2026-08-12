import type { Metadata } from 'next'
import ConversionLanding from '../components/conversion/ConversionLanding'
import { faqSchema, jsonLd } from '../lib/seo'
import { conversionPagesStore } from '@/lib/stores/conversion-pages-store'

export const metadata: Metadata = { title: 'Frequently Asked Questions | TSDC Chennai', description: 'Find answers about TSDC creative courses, beginner eligibility, projects, portfolio development and career preparation.', alternates: { canonical: '/faq/' } }

export const dynamic = 'force-dynamic'

export default async function FaqPage() {
  const content = await conversionPagesStore.get()
  const schema = faqSchema(content.faqs)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <ConversionLanding kind="faq" content={content} />
    </>
  )
}
