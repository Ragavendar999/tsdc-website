'use client'

import { motion } from 'framer-motion'
import { Target, Eye } from 'lucide-react'

export default function MissionVisionSection() {
  return (
    <section className="bg-white dark:bg-zinc-900 py-20 px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-[#2F52A0] dark:text-[#FF8652] mb-4">
          Our Mission & Vision
        </h2>
        <p className="text-lg text-[#2B2B2B] dark:text-gray-300 max-w-2xl mx-auto">
          We're not just teaching skills — we're shaping creators, innovators, and leaders of tomorrow.
        </p>
      </div>

      <div className="container mx-auto max-w-6xl grid gap-12 md:grid-cols-2">
        
        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#FFF5F2] dark:bg-zinc-800 rounded-3xl p-8 border-l-4 border-[#2F52A0] dark:border-[#FF8652] shadow-md"
        >
          <div className="flex items-center gap-4 mb-4">
            <Target className="text-[#2F52A0] dark:text-[#FF8652]" size={32} />
            <h3 className="text-2xl font-semibold text-[#2F52A0] dark:text-[#FF8652]">Our Mission</h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            To equip aspiring creators with real-world creative, digital, and tech skills through immersive learning, live mentorship, and hands-on projects — building not just careers, but confidence and clarity.
          </p>
        </motion.div>

        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#FFF5F2] dark:bg-zinc-800 rounded-3xl p-8 border-l-4 border-[#F6416C] dark:border-[#FF8652] shadow-md"
        >
          <div className="flex items-center gap-4 mb-4">
            <Eye className="text-[#F6416C] dark:text-[#FF8652]" size={32} />
            <h3 className="text-2xl font-semibold text-[#F6416C] dark:text-[#FF8652]">Our Vision</h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            To become India’s leading hub for skill-driven transformation — where passion meets opportunity, and every learner becomes a confident creator of change.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
