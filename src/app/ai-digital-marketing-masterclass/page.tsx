import type { Metadata } from 'next'
import DigitalMarketingCampaign from '@/app/components/campaigns/DigitalMarketingCampaign'

export const dynamic = 'force-dynamic'
const live = process.env.TSDC_DM_CAMPAIGN_LIVE === 'true' && process.env.VERCEL_ENV === 'production'
export const metadata: Metadata = {
  title: 'AI Marketing Masterclass | 4 December 2026, 7 AM IST',
  description: 'Stop just posting. Start thinking like a marketer. Explore strategy, content and AI at the TSDC masterclass on 4 December 2026 at 7 AM IST. Request registration details.',
  alternates: { canonical: '/ai-digital-marketing-masterclass/' },
  robots: { index: live, follow: live, googleBot: { index: live, follow: live } },
  openGraph: {
    title: 'Stop just posting. Start thinking like a marketer.',
    description: 'AI-Powered Digital Marketing Masterclass · 4 December 2026 · 7 AM IST.',
    url: 'https://traijoedu.in/ai-digital-marketing-masterclass/', type: 'website',
    images: [{ url: '/og-banner.png', width: 1200, height: 630, alt: 'Traijo Skill Development Center' }],
  },
  twitter: { card: 'summary_large_image', title: 'AI Marketing Masterclass | TSDC', description: '4 December 2026, 7 AM IST. Request session details.', images: ['/og-banner.png'] },
}
export default function Page() {
  return <DigitalMarketingCampaign variant="masterclass" live={live} started={Date.now() >= Date.parse('2026-12-04T07:00:00+05:30')} />
}
