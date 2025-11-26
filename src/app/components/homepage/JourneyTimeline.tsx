'use client'

import { motion } from 'framer-motion'
import {
  BookOpenCheck,
  Rocket,
  UserPlus2,
  ClipboardList,
  CheckCheck,
} from 'lucide-react'

const steps = [
  {
    icon: <BookOpenCheck className="w-5 h-5 text-[#F4793E]" />,
    title: 'Enroll',
    desc: 'Choose your path — Graphic Design, UI/UX, or Digital Marketing. No degree needed.',
  },
  {
    icon: <Rocket className="w-5 h-5 text-[#E83E8C]" />,
    title: 'Learn by Doing',
    desc: 'Hands-on training. Real projects, not lectures.',
  },
  {
    icon: <UserPlus2 className="w-5 h-5 text-[#4B3A97]" />,
    title: 'Get Mentored',
    desc: 'Weekly 1-on-1 mentorship. Fix, improve, grow.',
  },
  {
    icon: <ClipboardList className="w-5 h-5 text-yellow-500" />,
    title: 'Internship & Portfolio',
    desc: 'Real internships. Real clients. A portfolio that gets hired.',
  },
  {
    icon: <CheckCheck className="w-5 h-5 text-green-500" />,
    title: 'Job Placement',
    desc: 'Your dream job is the destination. We walk with you until you land it.',
  },
]

export default function JourneyTimeline() {
  return (
    <section className="relative bg-gradient-to-b from-[#fff9f5] via-[#fff5f8] to-[#f9f7ff] dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 py-24 overflow-hidden">
      {/* Soft Brand Blur Backgrounds */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-[#F4793E] via-[#E83E8C] to-[#4B3A97] opacity-10 rounded-full blur-[160px] top-[-100px] left-[-100px] animate-pulse-slow" />
      <div className="absolute w-[400px] h-[400px] bg-gradient-to-bl from-[#E83E8C] via-[#4B3A97] to-[#F4793E] opacity-10 rounded-full blur-[160px] bottom-[-100px] right-[-100px] animate-pulse-slower" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 dark:text-white mb-4"
        >
          Your Journey Starts Here
        </motion.h2>
        <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 text-lg">
          From zero to job-ready — this is how transformation begins at TSDC.
        </p>

        <div className="relative grid md:grid-cols-5 gap-10">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              className="flex flex-col items-center text-center relative"
            >
              <div className="w-14 h-14 rounded-full bg-white dark:bg-zinc-900 shadow-2xl border-4 border-white dark:border-zinc-700 flex items-center justify-center z-10 ring-2 ring-[#E83E8C]">
                {step.icon}
              </div>
              <div className="mt-4 font-semibold text-gray-900 dark:text-white text-lg">
                {step.title}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 max-w-[160px]">
                {step.desc}
              </p>
              {idx !== steps.length - 1 && (
                <span className="hidden md:block absolute top-7 right-[-50%] w-full h-0.5 bg-gradient-to-r from-[#F4793E] via-[#E83E8C] to-[#4B3A97] opacity-30"></span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-pulse-slow {
          animation: pulse 10s infinite alternate ease-in-out;
        }

        .animate-pulse-slower {
          animation: pulse 16s infinite alternate ease-in-out;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          100% {
            transform: scale(1.1);
            opacity: 0.5;
          }
        }
      `}</style>
    </section>
  )
}
