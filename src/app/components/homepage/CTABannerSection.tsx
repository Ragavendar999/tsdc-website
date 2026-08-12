'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useContactPopup } from '@/app/components/common/ContactPopupProvider'

const highlights = [
  'Future-Ready Skills',
  'Real Opportunities',
  'Better Tomorrow',
]

export default function CTABannerSection() {
  const { openPopup } = useContactPopup()

  return (
    <section className="relative overflow-hidden border-t-[3px] border-[#10163a] bg-[#10163a] px-4 py-16 sm:px-6">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#3244b5]/30 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#db4b87]/20 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'radial-gradient(circle, #fff 1.5px, transparent 1.5px)',
            backgroundSize: '22px 22px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-black leading-tight tracking-[-0.04em] text-white sm:text-4xl md:text-[3rem]">
              Your Career Doesn&apos;t Start After Graduation.
              <span className="mt-1 block text-[#ff9736]">It Starts Today.</span>
            </h2>

            <div className="mt-6 flex flex-wrap gap-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white/80"
                >
                  <CheckCircle2 size={12} className="text-[#ff9736]" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right CTA */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-start gap-4 rounded-[2rem] border-[3px] border-white/20 bg-white/8 p-6 backdrop-blur-sm lg:items-start"
          >
            <div className="flex items-center gap-2 rounded-full border border-[#ff9736]/40 bg-[#ff9736]/15 px-3.5 py-2">
              <Sparkles size={13} className="text-[#ff9736]" />
              <span className="text-xs font-black text-[#ff9736]">ADMISSIONS OPEN</span>
            </div>

            <div>
              <h3 className="text-xl font-black text-white">
                Apply Now & Secure Your Seat
              </h3>
              <p className="mt-1 text-sm text-white/60">
                Limited seats available per batch. Don&apos;t miss out.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <motion.button
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() =>
                  openPopup({
                    title: 'Apply to TSDC',
                    subtitle: 'Share your details and our admissions team will reach out with the next steps.',
                    interest: 'General Admission',
                    source: 'cta-banner-apply',
                    ctaLabel: 'Submit Application',
                  })
                }
                className="inline-flex items-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#ff9736] px-6 py-3.5 text-sm font-black text-white shadow-[5px_5px_0_rgba(0,0,0,0.4)] transition hover:-translate-y-1"
              >
                Apply Now
                <ArrowRight size={16} />
              </motion.button>

              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-[1rem] border-[3px] border-white/25 bg-white/10 px-6 py-3.5 text-sm font-black text-white transition hover:-translate-y-1"
              >
                View Courses
              </Link>
            </div>

            <p className="text-[11px] font-semibold text-white/40">
              Limited Seats Only!
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
