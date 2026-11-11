import type { Metadata } from 'next'
import DigitalMarketingCampaign from '@/app/components/campaigns/DigitalMarketingCampaign'

export const dynamic = 'force-dynamic'
const live = process.env.TSDC_DM_CAMPAIGN_LIVE === 'true' && process.env.VERCEL_ENV === 'production'
export const metadata: Metadata = {
  title: 'AI-Powered Digital Marketing Program | 14 December 2026',
  description: 'Learn strategy, AI-assisted content, SEO, advertising and analytics with TSDC. New batch starts 14 December 2026. Request the syllabus, fees and class schedule.',
  alternates: { canonical: '/ai-digital-marketing/' },
  robots: { index: live, follow: live, googleBot: { index: live, follow: live } },
  openGraph: {
    title: 'Learn the strategy. Use the AI. Build the campaign.',
    description: 'AI-Powered Digital Marketing at TSDC. New batch: 14 December 2026.',
    url: 'https://traijoedu.in/ai-digital-marketing/', type: 'website',
    images: [{ url: '/og-banner.png', width: 1200, height: 630, alt: 'Traijo Skill Development Center' }],
  },
  twitter: { card: 'summary_large_image', title: 'AI-Powered Digital Marketing | TSDC', description: 'New batch starts 14 December 2026. Request course details.', images: ['/og-banner.png'] },
}
export default function Page() {
  return <DigitalMarketingCampaign variant="program" live={live} started={Date.now() >= Date.parse('2026-12-14T00:00:00+05:30')} />
}
