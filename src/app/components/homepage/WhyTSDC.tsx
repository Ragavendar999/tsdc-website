'use client'

import { motion } from 'framer-motion'
import { BadgeIndianRupee, Briefcase, GraduationCap, Monitor, Sparkles, Users } from 'lucide-react'
import type { CSSProperties } from 'react'

const features = [
  {
    icon: Monitor,
    title: 'Practical Learning',
    description: 'Hands-on training with real-world projects that build your portfolio from day one.',
    accent: '#3244b5',
    tint: '#eef3ff',
  },
  {
    icon: Sparkles,
    title: 'Portfolio Focused',
    description: 'Build a portfolio that gets you noticed by recruiters and clients.',
    accent: '#fa8a43',
    tint: '#fff4eb',
  },
  {
    icon: Briefcase,
    title: 'Internship Opportunity',
    description: 'Gain real experience before you graduate through live client internships.',
    accent: '#db4b87',
    tint: '#fff1f7',
  },
  {
    icon: GraduationCap,
    title: 'Placement Assistance',
    description: 'Resume prep, mock interviews, and job placement support from day one.',
    accent: '#2da56a',
    tint: '#f0fdf4',
  },
  {
    icon: Users,
    title: 'Industry Mentors',
    description: 'Learn from working professionals with real industry experience.',
    accent: '#4a4a99',
    tint: '#f2f0ff',
  },
  {
    icon: BadgeIndianRupee,
    title: 'Affordable Fees',
    description: 'Quality education within your budget, with easy EMI options available.',
    accent: '#c45e1a',
    tint: '#fff8f0',
  },
]

export default function WhyTSDC() {
  return (
    <section className="site-section-bg section-alt-warm section-divider relative overflow-hidden px-4 py-16 sm:px-6 md:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-soft absolute -left-8 top-16 h-20 w-20 rounded-full bg-[#ffcb53] opacity-40" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="retro-pill mb-4 inline-flex px-4 py-2 text-xs font-black text-[#10163a]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#fa8a43] animate-pulse-soft" />
            Why Choose TSDC?
          </span>
          <h2 className="text-3xl font-black tracking-[-0.04em] text-[#081225] sm:text-4xl md:text-[2.8rem]">
            Everything You Need to
            <span className="mt-1 block text-[#3244b5]">Build a Creative Career</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#475467]">
            TSDC combines practical skills, real projects, and career support — all under one roof.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: index * 0.07, duration: 0.6 }}
                style={{ '--accent': feature.accent } as CSSProperties}
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="relative h-full overflow-hidden rounded-[1.75rem] p-5 shadow-sm"
                  style={{
                    border: `2px solid ${feature.accent}30`,
                    backgroundColor: feature.tint,
                  }}
                >
                  <div
                    className="absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-20"
                    style={{ backgroundColor: feature.accent }}
                  />

                  <div className="relative mb-4 flex items-center gap-3">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-[1rem] border-[3px] border-[#10163a] text-white shadow-[4px_4px_0_#10163a]"
                      style={{ backgroundColor: feature.accent }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="text-base font-black text-[#081225]">{feature.title}</h4>
                  </div>

                  <p className="relative text-sm leading-6 text-[#475467]">{feature.description}</p>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
