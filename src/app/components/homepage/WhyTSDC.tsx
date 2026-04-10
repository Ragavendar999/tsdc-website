'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Briefcase, GraduationCap, Sparkles, Users } from 'lucide-react'
import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'

type Feature = {
  icon: ReactNode
  title: string
  description: string
  support: string
  accent: string
  tint: string
}

const features: Feature[] = [
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: 'Beginner-friendly by design',
    description: 'Students can start from zero and still build a polished portfolio with structure, clarity, and guided momentum.',
    support: 'No degree required',
    accent: '#ff9736',
    tint: '#fff1dd',
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: 'Job-ready practical training',
    description: 'The learning flow mirrors actual studio, startup, and agency work so students develop confidence employers can see.',
    support: 'Industry-style assignments',
    accent: '#3244b5',
    tint: '#eef1ff',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Mentors who push quality',
    description: 'Students get direct feedback, practical corrections, and portfolio review support instead of being left to figure everything out alone.',
    support: '1:1 growth feedback',
    accent: '#ef6b63',
    tint: '#fff1ee',
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: 'A confidence upgrade',
    description: 'The real outcome is not just course completion. It is better work, clearer thinking, and visible proof of creative ability.',
    support: 'Results you can show',
    accent: '#db4b87',
    tint: '#fff1f7',
  },
]

export default function WhyTSDC() {
  return (
    <section className="site-section-bg section-alt-warm section-divider relative overflow-hidden px-4 py-14 sm:px-6 md:py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-soft absolute -left-6 top-20 h-20 w-20 rounded-full border-[3px] border-[#10163a] bg-[#ffcb53] opacity-60 shadow-[5px_5px_0_#10163a]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="retro-pill mb-4 px-4 py-2 text-xs font-black text-[#10163a] md:text-sm">
              <span className="h-2 w-2 rounded-full bg-[#fa8a43] animate-pulse-soft" />
              Why students choose TSDC in Chennai
            </span>

            <h2 className="headline-balance max-w-4xl text-3xl font-black leading-[0.98] tracking-[-0.05em] text-[#081225] sm:text-4xl lg:text-5xl">
              The institute experience feels
              <span className="block text-[#3244b5]">clearer, brighter, and more career-focused.</span>
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-[#344054]">
              Students do not join TSDC for a plain classroom feeling. They join for practical work, real mentorship, stronger portfolios, internship-style learning, and a clearer path into creative jobs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-[1.9rem] border-[3px] border-[#10163a] bg-[#3244b5] p-5 text-white shadow-[8px_8px_0_#10163a] md:p-6"
          >
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#ffcb53]">What you walk away with</p>
            <div className="mt-4 space-y-3">
              {[
                { text: 'A portfolio of real work you can show employers and clients — not just a certificate.', bg: '#fff1dd' },
                { text: 'Hands-on skills from live projects, industry briefs, and mentor-reviewed feedback.', bg: '#ffffff' },
                { text: 'A clear next step: placement support, freelance confidence, and a career direction that sticks.', bg: '#fff1f7' },
              ].map((item) => (
                <div
                  key={item.text}
                  className="rounded-[1.15rem] border-[3px] border-[#10163a] px-4 py-3 text-sm leading-6 shadow-[4px_4px_0_#10163a]"
                  style={{ backgroundColor: item.bg, color: '#10163a' }}
                >
                  {item.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              style={{ '--accent': feature.accent } as CSSProperties}
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="group relative h-full overflow-hidden rounded-[1.7rem] border-[3px] border-[#10163a] p-5 shadow-[6px_6px_0_#10163a]"
                style={{ backgroundColor: feature.tint }}
              >
                <div
                  className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-25"
                  style={{ backgroundColor: feature.accent }}
                />

                <div className="relative mb-4 flex items-center justify-between">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.08 }}
                    transition={{ duration: 0.45 }}
                    className="flex h-12 w-12 items-center justify-center rounded-[1rem] border-[3px] border-[#10163a] text-white shadow-[4px_4px_0_#10163a]"
                    style={{ backgroundColor: feature.accent }}
                  >
                    <span>{feature.icon}</span>
                  </motion.div>
                  <span className="rounded-full border-[3px] border-[#10163a] bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#667085] shadow-[3px_3px_0_#10163a]">
                    0{index + 1}
                  </span>
                </div>

                <h4 className="relative mb-2 text-lg font-black text-[#081225]">{feature.title}</h4>
                <p className="relative text-sm leading-6 text-[#475467]">{feature.description}</p>

                <div
                  className="relative mt-4 inline-flex items-center gap-2 rounded-full border-[3px] border-[#10163a] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-white shadow-[3px_3px_0_#10163a]"
                  style={{ backgroundColor: feature.accent }}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  {feature.support}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/courses"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-[1rem] border-[3px] border-[#10163a] bg-[#3244b5] px-8 py-4 font-black text-white shadow-[6px_6px_0_#10163a] transition-all hover:-translate-y-1"
          >
            <span className="absolute inset-y-0 -left-14 w-12 rotate-12 bg-white/30 blur-sm transition-transform duration-700 group-hover:translate-x-72" />
            <span className="relative">View All Job-Ready Courses</span>
            <ArrowRight size={16} className="relative transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
