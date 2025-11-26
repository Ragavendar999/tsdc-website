'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Lottie from 'lottie-react'
import animationData from '@/lotties/Online learning.json'
import { Typewriter } from 'react-simple-typewriter'
import confetti from 'canvas-confetti'
import { useRef } from 'react'

export default function HeroSection() {
  const buttonRef = useRef<HTMLAnchorElement | null>(null)

  const handleConfetti = () => {
    const rect = buttonRef.current?.getBoundingClientRect()
    const x = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5
    const y = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.5

    confetti({
      particleCount: 160,
      spread: 70,
      origin: { x, y },
      zIndex: 9999,
    })
  }

  return (
    <section className="relative bg-gradient-to-br from-[#fff7f3] via-[#fce8f3] to-[#f0f4fd] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] transition-all duration-1000 overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute -top-14 -left-14 w-44 h-44 bg-[#E83E8C]/20 rounded-full blur-2xl animate-blob1 z-0" />
      <div className="absolute -bottom-14 -right-14 w-44 h-44 bg-[#4B3A97]/20 rounded-full blur-2xl animate-blob2 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 md:py-12 grid md:grid-cols-2 items-center min-h-[60vh] gap-8">
        {/* Left: Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-5 md:pr-4"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl md:text-4xl font-extrabold leading-snug tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#F4793E] via-[#E83E8C] to-[#4B3A97]"
          >
            You’re Not Lost. <br className="hidden sm:block" />
            You Just Haven’t Started Yet.
          </motion.h1>

          <p className="text-base md:text-[17px] text-gray-800 dark:text-gray-300 leading-relaxed">
            Discover your potential with{' '}
            <span className="font-bold text-[#E83E8C]">
              <Typewriter
                words={['Graphic Design', 'UI/UX Design', 'Digital Marketing']}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={65}
                deleteSpeed={40}
                delaySpeed={1500}
              />
            </span>
            .<br />
            Learn by doing. Build what matters. Land a career you love — even if you’re starting from zero.
          </p>

          {/* CTA Button */}
          <div className="flex items-center space-x-4 pt-1">
            <Link
              href="/courses"
              ref={buttonRef}
              onClick={handleConfetti}
              className="relative inline-block bg-gradient-to-r from-[#F4793E] via-[#E83E8C] to-[#4B3A97] text-white text-sm md:text-base px-6 py-3 rounded-full shadow-xl hover:brightness-110 transition-all duration-300 hover:scale-105 sparkle-button"
            >
              Transform My Career
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="pt-4 flex flex-wrap gap-3 text-sm font-medium">
            {[
              '🎯 Only Real Industry Projects',
              '💼 Verified Internship Certificate',
              '🏁 Career Launchpad with Job Assurance',
            ].map((item, index) => (
              <div
                key={index}
                className="backdrop-blur-md bg-white/60 dark:bg-zinc-700/50 px-4 py-2 rounded-full shadow text-gray-800 dark:text-white"
              >
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Lottie Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center md:justify-end"
        >
          <Lottie
            animationData={animationData}
            loop
            className="w-full max-w-sm md:max-w-md lg:max-w-lg"
          />
        </motion.div>
      </div>

      {/* Animations and Button Sparkle */}
      <style>{`
        .sparkle-button::after {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: radial-gradient(circle at center, rgba(255,255,255,0.3), transparent);
          opacity: 0;
          border-radius: 9999px;
          animation: sparkle 1.5s infinite ease-in-out;
        }

        .sparkle-button:hover::after {
          opacity: 1;
        }

        @keyframes sparkle {
          0%, 100% { transform: scale(1); opacity: 0; }
          50% { transform: scale(1.2); opacity: 0.6; }
        }

        @keyframes blob1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -10px); }
        }

        @keyframes blob2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, 10px); }
        }

        .animate-blob1 {
          animation: blob1 6s infinite ease-in-out;
        }

        .animate-blob2 {
          animation: blob2 6s infinite ease-in-out;
        }
      `}</style>
    </section>
  )
}
