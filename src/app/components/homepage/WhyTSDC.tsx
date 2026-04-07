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
}

const features: Feature[] = [
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: 'Beginner-friendly by design',
    description: 'Students can start from zero and still build a polished portfolio with structure, clarity, and guided momentum.',
    support: 'No degree required',
    accent: '#fa8a43',
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: 'Job-ready practical training',
    description: 'The learning flow mirrors actual studio, startup, and agency work so students develop confidence employers can see.',
    support: 'Industry-style assignments',
    accent: '#4562b0',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Mentors who push quality',
    description: 'Students get direct feedback, practical corrections, and portfolio review support instead of being left to figure everything out alone.',
    support: '1:1 growth feedback',
    accent: '#ea6865',
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: 'A brand-new confidence level',
    description: 'The real outcome is not just course completion. It is better work, clearer thinking, and visible proof of creative ability.',
    support: 'Results you can show',
    accent: '#4a4a99',
  },
]

const numbers = [
  { value: '1500+', label: 'Students trained' },
  { value: '95%', label: 'Placement support outcomes' },
  { value: '4.9/5', label: 'Student satisfaction' },
  { value: '4', label: 'High-demand career tracks' },
]

export default function WhyTSDC() {
  return (
    <section className="site-section-bg relative overflow-hidden px-6 py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-soft absolute left-12 top-20 h-24 w-24 rounded-full bg-[#fff0da]" />
        <div className="animate-drift-side absolute bottom-14 right-10 h-28 w-28 rounded-[2rem] bg-[#eaf1ff]" />
        <div className="absolute left-[42%] top-36 h-16 w-16 rounded-[1.4rem] bg-[#ea6865]/12" />
        <div className="absolute bottom-32 left-[8%] h-20 w-20 rounded-full border-8 border-[#4562b0]/10" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#dbe4f5] bg-white px-4 py-2 text-sm font-black text-[#4562b0] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#fa8a43] animate-pulse-soft" />
              Why students choose TSDC in Chennai
            </span>

            <h2 className="headline-balance max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.05em] text-[#081225] md:text-6xl">
              The institute experience feels
              <span className="block text-[#4562b0]">brighter, bolder, and more career-focused.</span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#344054]">
              Students do not join TSDC for a plain classroom feeling. They join for practical work, real mentorship, stronger portfolios, internship-style learning, and a clearer path into creative jobs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-[2rem] border border-[#dbe4f5] bg-[#081225] p-8 text-white shadow-[0_30px_80px_rgba(8,18,37,0.16)]"
          >
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#ffd54f]">Why it converts better</p>
            <div className="mt-5 space-y-4">
              {[
                'Students can clearly imagine what they will become after the course.',
                'The offer is concrete: projects, portfolio, mentors, guidance, placement support.',
                'The brand now feels premium, bright, and serious about outcomes.',
              ].map((item) => (
                <div key={item} className="rounded-[1.4rem] bg-white/10 px-4 py-4 text-sm leading-7 text-white/88">
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {numbers.map((number) => (
            <motion.div
              key={number.label}
              whileHover={{ y: -5 }}
              className="rounded-[1.8rem] border border-[#dbe4f5] bg-white p-6 text-center shadow-[0_18px_45px_rgba(17,24,39,0.05)]"
            >
              <div className="text-3xl font-black text-[#081225] md:text-4xl">{number.value}</div>
              <div className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-[#667085]">{number.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                whileHover={{ y: -12, rotate: index % 2 === 0 ? -0.8 : 0.8 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="group relative h-full overflow-hidden rounded-[2rem] border border-[#dbe4f5] bg-white p-6 shadow-[0_18px_45px_rgba(17,24,39,0.05)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[0_28px_70px_rgba(69,98,176,0.16)]"
              >
                <div
                  className="absolute inset-x-0 top-0 h-2 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ backgroundColor: feature.accent }}
                />
                <div
                  className="absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-15"
                  style={{ backgroundColor: feature.accent }}
                />
                <div
                  className="absolute bottom-5 right-5 h-10 w-10 rotate-12 rounded-[1rem] opacity-20 transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110"
                  style={{ backgroundColor: feature.accent }}
                />

                <div className="relative mb-5 flex items-center justify-between">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.08 }}
                    transition={{ duration: 0.45 }}
                    className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg"
                    style={{ backgroundColor: feature.accent }}
                  >
                    <span>{feature.icon}</span>
                  </motion.div>
                  <span className="rounded-full bg-[#f6f8fd] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#667085] transition-transform duration-300 group-hover:translate-x-1">
                    0{index + 1}
                  </span>
                </div>

                <h4 className="relative mb-3 text-xl font-black text-[#081225] transition-colors group-hover:text-[var(--accent)]">{feature.title}</h4>
                <p className="relative text-sm leading-7 text-[#475467]">{feature.description}</p>

                <div className="relative mt-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-white transition-transform duration-300 group-hover:translate-x-1" style={{ backgroundColor: feature.accent }}>
                  <Sparkles className="h-3.5 w-3.5" />
                  {feature.support}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/courses"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#4562b0] px-8 py-4 font-black text-white shadow-[0_18px_40px_rgba(69,98,176,0.24)] transition-all hover:-translate-y-1 hover:bg-[#3d58aa]"
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
