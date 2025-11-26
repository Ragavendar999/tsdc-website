'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Star, BriefcaseBusiness, Smile } from 'lucide-react'

const metrics = [
  {
    icon: <TrendingUp className="w-7 h-7 text-blue-600" />, 
    title: '92% Placement Rate',
    desc: 'Our learners land jobs within 3 months of completion.'
  },
  {
    icon: <BriefcaseBusiness className="w-7 h-7 text-purple-600" />,
    title: '800+ Internships Enabled',
    desc: 'Across startups, agencies, and product teams.'
  },
  {
    icon: <Star className="w-7 h-7 text-yellow-500" />,
    title: '4.9★ Average Rating',
    desc: 'Loved by hundreds of passionate creators.'
  },
  {
    icon: <Smile className="w-7 h-7 text-green-500" />,
    title: '10,000+ Lives Touched',
    desc: 'Across India — and we’re just getting started.'
  }
]

export default function SuccessMetrics() {
  return (
    <section className="relative bg-gradient-to-b from-white via-blue-50 to-purple-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 py-24 overflow-hidden">
      {/* ✨ Floating Animation Backgrounds */}
      <div className="absolute w-72 h-72 bg-blue-300/20 rounded-full blur-3xl top-0 left-0 animate-float1" />
      <div className="absolute w-72 h-72 bg-purple-300/20 rounded-full blur-3xl bottom-0 right-0 animate-float2" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-6"
        >
          Results That Speak Volumes
        </motion.h2>
        <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-14 text-lg">
          We don’t just promise impact — we deliver it.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="relative group p-6 bg-white/60 dark:bg-zinc-800/40 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 text-center hover:scale-[1.04] transition duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl" />
              <div className="relative z-10">
                <div className="flex justify-center items-center mb-4 animate-pulse-slow">
                  {metric.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {metric.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {metric.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }
        .animate-float1 {
          animation: float1 10s infinite ease-in-out;
        }
        .animate-float2 {
          animation: float2 12s infinite ease-in-out;
        }
        .animate-pulse-slow {
          animation: pulse 4s infinite;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.1); opacity: 1; }
        }
      `}</style>
    </section>
  )
}
