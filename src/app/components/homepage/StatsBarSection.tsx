'use client'

import { motion } from 'framer-motion'
import { BarChart3, Briefcase, GraduationCap, Users, Zap } from 'lucide-react'

const stats = [
  { value: '500+', label: 'Students Trained', icon: Users },
  { value: '100+', label: 'Live Projects', icon: Briefcase },
  { value: '50+', label: 'Expert Mentors', icon: GraduationCap },
  { value: '95%', label: 'Placement Assistance', icon: Zap },
  { value: '3+', label: 'Industry Tie-ups', icon: BarChart3 },
]

export default function StatsBarSection() {
  return (
    <section className="relative z-10 border-y-[3px] border-[#10163a] bg-white px-4 py-5 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-0 sm:grid-cols-3 md:grid-cols-5">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                className={`flex flex-col items-center gap-2 px-4 py-4 text-center ${
                  index < stats.length - 1
                    ? 'border-b border-[#e8edf7] md:border-b-0 md:border-r md:border-[#e8edf7]'
                    : ''
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border-[2px] border-[#10163a]/15 bg-[#f5f8ff]">
                  <Icon size={20} className="text-[#3244b5]" />
                </div>
                <div className="text-[1.6rem] font-black leading-none text-[#10163a]">{stat.value}</div>
                <div className="text-[11px] font-semibold leading-snug text-[#667085]">{stat.label}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
