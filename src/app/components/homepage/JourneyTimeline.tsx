'use client'

import { motion } from 'framer-motion'
import { BookOpenCheck, CheckCheck, ClipboardList, Rocket, UserPlus2 } from 'lucide-react'

const steps = [
  {
    icon: <BookOpenCheck className="h-5 w-5 text-[#fa8a43]" />,
    title: 'Choose Your Track',
    desc: 'Pick Graphic Design, UI/UX Design, Digital Marketing, or Video Editing based on your creative goal.',
    color: '#fa8a43',
  },
  {
    icon: <Rocket className="h-5 w-5 text-[#ea6865]" />,
    title: 'Learn Through Projects',
    desc: 'Instead of passive theory, students create posters, apps, campaigns, reels, and portfolio work from the start.',
    color: '#ea6865',
  },
  {
    icon: <UserPlus2 className="h-5 w-5 text-[#4562b0]" />,
    title: 'Get Mentor Corrections',
    desc: 'Weekly guidance helps students polish faster, improve quality, and feel more confident in their work.',
    color: '#4562b0',
  },
  {
    icon: <ClipboardList className="h-5 w-5 text-[#4a4a99]" />,
    title: 'Build a Hiring-Ready Portfolio',
    desc: 'Every step moves toward visible proof of skill, not just finishing a course and hoping for the best.',
    color: '#4a4a99',
  },
  {
    icon: <CheckCheck className="h-5 w-5 text-[#2da56a]" />,
    title: 'Move Into Real Work',
    desc: 'With stronger projects and guidance, students step into internships, freelance work, and placement opportunities.',
    color: '#2da56a',
  },
]

export default function JourneyTimeline() {
  return (
    <section className="site-section-bg relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-16 top-16 h-24 w-24 rounded-full bg-[#fff2da]" />
        <div className="absolute bottom-16 right-14 h-24 w-24 rounded-[1.5rem] bg-[#edf3ff]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <p className="mb-4 inline-flex rounded-full border border-[#dbe4f5] bg-[#f7faff] px-4 py-2 text-sm font-black text-[#4562b0]">
            Your TSDC career journey
          </p>
          <h2 className="text-4xl font-black tracking-[-0.04em] text-[#081225] md:text-5xl">
            From beginner energy to
            <span className="block text-[#4562b0]">portfolio-ready confidence.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#475467]">
            This is how students move through the institute experience and become more ready, more visible, and more employable.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-5">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="relative"
            >
              <div className="absolute left-1/2 top-7 hidden h-[2px] w-full -translate-y-1/2 bg-[#e8edf7] md:block" />
              <motion.div
                whileHover={{ y: -5 }}
                className="relative z-10 h-full rounded-[2rem] border border-[#dbe4f5] bg-white p-6 text-center shadow-[0_18px_45px_rgba(17,24,39,0.05)]"
              >
                <div
                  className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_18px_40px_rgba(17,24,39,0.08)]"
                  style={{ boxShadow: `0 0 0 8px ${step.color}18, 0 18px 40px rgba(17,24,39,0.08)` }}
                >
                  {step.icon}
                </div>
                <div className="text-xl font-black text-[#081225]">{step.title}</div>
                <p className="mt-3 text-sm leading-7 text-[#475467]">{step.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
