import type { Metadata } from 'next'
import MasterclassSection from '@/app/components/masterclass/MasterclassSection'

export const metadata: Metadata = {
  title: 'TSDC Masterclasses | Live Creative Workshops and Bootcamps',
  description:
    'Explore TSDC masterclasses and bootcamps in graphic design, AI-powered creativity, branding, and practical portfolio-building with live guidance.',
  alternates: {
    canonical: '/masterclasses',
  },
}

export default function MasterclassesPage() {
  return (
    <main className="bg-[#fffdf7] pt-28">
      <section className="relative overflow-hidden px-4 pb-8 pt-10 md:px-8 md:pb-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,138,67,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(50,68,181,0.12),transparent_30%)]" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#3244b5]">TSDC Masterclasses</p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.06em] text-[#10163a] md:text-6xl">
            Live creative sessions and career-building bootcamps.
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base font-semibold leading-8 text-[#4d556f] md:text-lg">
            Join focused programs built to help students learn faster, create stronger portfolio work, and build practical confidence with real tools and mentor support.
          </p>
        </div>
      </section>

      <MasterclassSection
        title="Choose your next masterclass or bootcamp."
        subtitle="Explore live TSDC sessions including the logo design masterclass and the Summer Bootcamp for AI Powered Graphic Design Program."
      />
    </main>
  )
}
