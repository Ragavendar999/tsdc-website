'use client'

import { motion } from 'framer-motion'
import {
  BookOpen,
  Briefcase,
  GraduationCap,
  Laptop,
  Rocket,
  Target,
  Trophy,
} from 'lucide-react'

const steps = [
  {
    icon: BookOpen,
    title: 'Join Course',
    desc: 'Choose your passion',
    color: '#3244b5',
    bg: '#eef3ff',
  },
  {
    icon: GraduationCap,
    title: 'Learn Skills',
    desc: 'Industry expert training',
    color: '#fa8a43',
    bg: '#fff4eb',
  },
  {
    icon: Laptop,
    title: 'Live Projects',
    desc: 'Work on real client projects',
    color: '#3244b5',
    bg: '#eef3ff',
  },
  {
    icon: Trophy,
    title: 'Build Portfolio',
    desc: 'Create stunning portfolio',
    color: '#10163a',
    bg: '#f0f2f8',
  },
  {
    icon: Briefcase,
    title: 'Internship',
    desc: 'Gain real work experience',
    color: '#fa8a43',
    bg: '#fff4eb',
  },
  {
    icon: Target,
    title: 'Placement Support',
    desc: 'We help you get hired',
    color: '#db4b87',
    bg: '#fff1f7',
  },
  {
    icon: Rocket,
    title: 'Career Launch',
    desc: 'Start your dream career',
    color: '#3244b5',
    bg: '#eef3ff',
  },
]

export default function JourneyTimeline() {
  return (
    <section className="site-section-bg section-alt-clean section-divider relative overflow-hidden py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-12 top-12 h-20 w-20 rounded-full bg-[#fff2da] opacity-70" />
        <div className="absolute bottom-12 right-12 h-20 w-20 rounded-[1.5rem] bg-[#edf3ff] opacity-70" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="retro-pill mb-4 inline-flex px-4 py-2 text-xs font-black text-[#10163a]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#fa8a43] animate-pulse-soft" />
            The TSDC Pathway
          </span>
          <h2 className="text-3xl font-black tracking-[-0.04em] text-[#081225] sm:text-4xl md:text-[2.8rem]">
            Your Step-by-Step Journey
            <span className="mt-1 block text-[#4562b0]">to a Creative Career</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#475467]">
            Every step is designed to move you closer to a real job in the creative industry.
          </p>
        </motion.div>

        {/* Desktop: horizontal arrow steps */}
        <div className="hidden overflow-x-auto lg:block">
          <div className="flex min-w-max items-start gap-0 pb-4 pt-3">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.title} className="flex items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="flex w-32 flex-col items-center gap-3 text-center xl:w-36"
                  >
                    <motion.div
                      whileHover={{ y: -6, scale: 1.08 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-[#10163a] shadow-[4px_4px_0_#10163a]"
                      style={{ backgroundColor: step.color }}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </motion.div>
                    <div>
                      <p className="text-sm font-black text-[#081225]">{step.title}</p>
                      <p className="mt-1 text-[11px] leading-snug text-[#667085]">{step.desc}</p>
                    </div>
                  </motion.div>

                  {index < steps.length - 1 && (
                    <div className="mx-1 flex shrink-0 items-center pb-8">
                      <div className="h-[2px] w-6 bg-[#d0d8f0]" />
                      <div
                        className="h-0 w-0"
                        style={{
                          borderTop: '5px solid transparent',
                          borderBottom: '5px solid transparent',
                          borderLeft: '7px solid #d0d8f0',
                        }}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile/Tablet: vertical steps */}
        <div className="flex flex-col gap-4 lg:hidden">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="flex items-center gap-4 rounded-[1.5rem] border-[3px] border-[#10163a] bg-white p-4 shadow-[4px_4px_0_#10163a]"
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[3px] border-[#10163a] shadow-[3px_3px_0_#10163a]"
                  style={{ backgroundColor: step.color }}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-black text-[#081225]">
                    {index + 1}. {step.title}
                  </p>
                  <p className="mt-0.5 text-xs text-[#667085]">{step.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
