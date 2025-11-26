'use client'

import { motion } from 'framer-motion'
import { Rocket, CheckCircle2, Star } from 'lucide-react'

const milestones = [
  {
    year: '2023',
    title: 'Founded TSDC',
    description: 'Traijo Skill Development Center was launched to bridge the gap between creativity and career.',
    icon: Rocket,
    color: '#2F52A0'
  },
  {
    year: '2024',
    title: '100+ Students Trained',
    description: 'Hands-on training, project-based curriculum, and real-world mentorship helped hundreds gain confidence.',
    icon: CheckCircle2,
    color: '#FF8652'
  },
  {
    year: '2025',
    title: 'Launched Student Ventures',
    description: 'Student startup incubator model implemented. Several real businesses emerged from course projects.',
    icon: Star,
    color: '#F6416C'
  }
]

export default function TimelineSection() {
  return (
    <section className="bg-white dark:bg-zinc-900 py-20 px-4 overflow-x-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-[#2F52A0] dark:text-[#FF8652] mb-4">
          Our Journey
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          A look at how far we’ve come — and where we’re headed.
        </p>
      </div>

      <div className="flex gap-10 md:gap-20 justify-start md:justify-center items-start max-w-7xl mx-auto px-4 md:px-0">
        {milestones.map((milestone, index) => {
          const Icon = milestone.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col items-center text-center max-w-xs relative"
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg mb-4"
                style={{ backgroundColor: milestone.color }}
              >
                <Icon className="text-white" size={24} />
              </div>

              {/* Vertical Line (Mobile fallback) */}
              <div className="block md:hidden w-1 h-16 bg-gray-300 dark:bg-gray-600 mb-4"></div>

              {/* Year */}
              <h3 className="text-lg font-bold text-[#2F52A0] dark:text-[#FF8652] mb-1">{milestone.year}</h3>

              {/* Title */}
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {milestone.title}
              </h4>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400">
                {milestone.description}
              </p>
            </motion.div>
          )
        })}
      </div>

      {/* Horizontal connector line */}
      <div className="hidden md:block border-t-4 border-dashed border-[#2F52A0] dark:border-[#FF8652] mt-16 w-full max-w-5xl mx-auto"></div>
    </section>
  )
}
