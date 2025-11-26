'use client'

import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Sparkles, Users } from 'lucide-react'
import Lottie from 'lottie-react'
import growthAnimation from '@/lotties/growth.json'

const features = [
  {
    icon: <GraduationCap className="w-7 h-7 text-[#F4793E]" />,
    title: 'No Degree? No Problem.',
    description: 'Build your future on real skills — not just certificates.',
  },
  {
    icon: <Briefcase className="w-7 h-7 text-[#E83E8C]" />,
    title: 'Assured Job Path',
    description: 'Guaranteed outcomes with real-world projects & mentors.',
  },
  {
    icon: <Users className="w-7 h-7 text-[#4B3A97]" />,
    title: '1:1 Mentorship',
    description: 'Get personal guidance from working professionals.',
  },
  {
    icon: <Sparkles className="w-7 h-7 text-yellow-500" />,
    title: 'Confidence Through Experience',
    description: 'Create. Deliver. Grow. Just like in the real world.',
  },
]

export default function WhyTSDC() {
  return (
    <section className="relative bg-white dark:bg-zinc-950 min-h-[90vh] flex items-center overflow-hidden pt-24 md:pt-0">
      {/* Background Blobs */}
      <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#F4793E]/20 rounded-full blur-3xl animate-blob1" />
      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#4B3A97]/20 rounded-full blur-3xl animate-blob2" />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto w-full px-4 md:px-6 lg:px-8 grid md:grid-cols-2 items-center gap-10">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-snug">
            You’re more than a learner —<br />
            <span className="bg-gradient-to-r from-[#F4793E] via-[#E83E8C] to-[#4B3A97] text-transparent bg-clip-text">
              You’re building your future.
            </span>
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-base md:text-lg">
            You don’t need another course — you need a breakthrough. At TSDC, we give you work, not worksheets. Mentors, not modules.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-4 bg-white/60 dark:bg-zinc-900/40 rounded-xl shadow backdrop-blur-md border border-gray-200 dark:border-gray-800 hover:scale-[1.02] transition"
              >
                <div>{feature.icon}</div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Lottie
            animationData={growthAnimation}
            loop
            className="w-full max-w-[400px] md:max-w-[440px] mx-auto"
          />
        </motion.div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes blob1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -10px) scale(1.05); }
        }

        @keyframes blob2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 10px) scale(1.05); }
        }

        .animate-blob1 {
          animation: blob1 8s infinite ease-in-out;
        }

        .animate-blob2 {
          animation: blob2 10s infinite ease-in-out;
        }
      `}</style>
    </section>
  )
}
