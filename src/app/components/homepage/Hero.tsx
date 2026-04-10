'use client'

import confetti from 'canvas-confetti'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Award,
  Briefcase,
  CheckCircle2,
  Megaphone,
  MonitorSmartphone,
  Paintbrush,
  Sparkles,
  Star,
  Users,
  Video,
} from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'
import { useContactPopup } from '@/app/components/common/ContactPopupProvider'

const impactStats = [
  { icon: <Users size={16} />, value: '1500+', label: 'Students launched' },
  { icon: <Briefcase size={16} />, value: '95%', label: 'Career outcomes' },
  { icon: <Award size={16} />, value: 'ISO', label: 'Certified institute' },
  { icon: <Star size={16} />, value: '4.9/5', label: 'Student love' },
]

const heroTracks = [
  {
    title: 'Graphic Design',
    accent: '#fa8a43',
    line: 'Branding, posters, social creatives',
    icon: <Paintbrush size={23} />,
  },
  {
    title: 'UI/UX Design',
    accent: '#4562b0',
    line: 'Figma, product thinking, portfolio',
    icon: <MonitorSmartphone size={23} />,
  },
  {
    title: 'Digital Marketing',
    accent: '#ea6865',
    line: 'SEO, Meta Ads, Google Ads, growth',
    icon: <Megaphone size={23} />,
  },
  {
    title: 'Video Editing',
    accent: '#4a4a99',
    line: 'Premiere Pro, reels, ads, motion',
    icon: <Video size={23} />,
  },
]

export default function HeroSection() {
  const buttonRef = useRef<HTMLAnchorElement | null>(null)
  const { openPopup } = useContactPopup()

  const handleConfetti = () => {
    const rect = buttonRef.current?.getBoundingClientRect()
    const x = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5
    const y = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.5

    confetti({
      particleCount: 110,
      spread: 78,
      startVelocity: 28,
      colors: ['#4562b0', '#fa8a43', '#ea6865', '#ffd54f'],
      origin: { x, y },
      zIndex: 9999,
    })
  }

  return (
    <section className="site-section-bg relative overflow-hidden pt-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="brand-dot-grid absolute inset-0 opacity-15" />
          <div className="animate-float-orb absolute right-[5%] top-16 h-20 w-20 rounded-full border-[3px] border-[#10163a] bg-[#ffcb53] opacity-70 shadow-[5px_5px_0_#10163a]" />
        </div>

        <div className="relative z-10 mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-7 px-4 py-6 sm:px-6 md:grid-cols-[1.02fr_0.98fr] md:gap-8 lg:py-6">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 md:space-y-5"
        >
          <div className="retro-pill max-w-full px-3.5 py-2 text-xs font-bold text-[#10163a] sm:px-4 md:text-sm">
            <Sparkles size={14} className="text-[#ff9736]" />
            <span className="leading-snug">Best Creative Institute in Chennai</span>
          </div>

          <div className="space-y-3">
            <h1 className="headline-balance max-w-[11ch] text-[2.55rem] font-black leading-[0.92] tracking-[-0.06em] text-[#0f1634] min-[380px]:text-[2.9rem] sm:text-[3.35rem] md:text-[4rem] lg:text-[4.55rem] xl:text-[4.85rem]">
              Learn creative skills that
              <span className="block text-[#db4b87]">get you hired.</span>
            </h1>

            <p className="max-w-xl text-[0.98rem] leading-7 text-[#344054] md:text-[1rem]">
              TSDC is Chennai's hands-on creative career institute. Real projects, portfolio building, and mentor feedback — designed to get you job-ready fast.
            </p>
          </div>

          <div className="grid gap-3 sm:flex sm:flex-wrap sm:items-center">
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Link
                href="/courses"
                ref={buttonRef}
                onClick={handleConfetti}
                className="inline-flex w-full items-center justify-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#ff9736] px-5 py-3.5 text-center text-sm font-black text-white shadow-[6px_6px_0_#10163a] transition-all hover:-translate-y-1 sm:w-auto sm:px-7 md:text-base"
              >
                Explore Courses
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() =>
                openPopup({
                  title: 'Book Free Counselling',
                  subtitle: 'Share your details and our admissions team will guide you to the right creative course, batch, and next step.',
                  interest: 'Creative Courses Counselling',
                  source: 'hero-free-counselling',
                  ctaLabel: 'Get Free Counselling',
                })
              }
              className="inline-flex w-full items-center justify-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-white px-5 py-3.5 text-center text-sm font-black text-[#10163a] shadow-[6px_6px_0_#10163a] transition-all hover:-translate-y-1 sm:w-auto sm:px-7 md:text-base"
            >
              Free Counselling
            </motion.button>
          </div>

          <div className="flex flex-wrap gap-2">
            {['Live client projects', 'Portfolio-first', '1:1 mentorship', 'Placement support'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.08 }}
                className="flex items-center gap-1.5 rounded-full border-[3px] border-[#10163a] bg-white px-3 py-1.5 text-xs font-bold text-[#1b2940] shadow-[3px_3px_0_#10163a]"
              >
                <CheckCircle2 size={12} className="shrink-0 text-[#3244b5]" />
                {item}
              </motion.div>
            ))}
          </div>

          <div className="grid max-w-2xl grid-cols-2 gap-2.5 sm:grid-cols-4">
            {impactStats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -4 }}
                className="rounded-[1.25rem] border-[3px] border-[#10163a] bg-white px-3 py-3 text-center shadow-[5px_5px_0_#10163a]"
              >
                <div className="mb-1 flex justify-center text-[#3244b5]">{stat.icon}</div>
                <div className="text-lg font-black text-[#081225]">{stat.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#5b6475]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.12, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:block"
        >
          <div className="relative">

            <div className="relative overflow-hidden rounded-[2rem] border-[3px] border-[#10163a] bg-white p-4 shadow-[9px_9px_0_#10163a]">
              <div className="mb-3 rounded-[1.45rem] border-[3px] border-[#10163a] bg-[#fffaf1] p-5 text-[#0f1634]">
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#3244b5]">Chennai Creative Career Hub</p>
                <h3 className="mt-2 text-2xl font-black leading-tight lg:text-[1.65rem]">
                  Build a portfolio that looks
                  <span className="block text-[#db4b87]">worth hiring.</span>
                </h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-[#4d556f]">
                  Learn with structured projects, internship-style feedback, and practical briefs designed to make your work stand out to employers and clients.
                </p>
              </div>

              <div className="grid gap-2.5">
                {heroTracks.map((track, index) => (
                  <motion.div
                    key={track.title}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + index * 0.08 }}
                    whileHover={{ x: 6 }}
                    className="rounded-[1.3rem] border-[3px] border-[#10163a] bg-[#fffdf7] p-3.5 shadow-[4px_4px_0_#10163a]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-base font-black text-[#081225]">{track.title}</h4>
                        <p className="mt-1 text-sm leading-5 text-[#475467]">{track.line}</p>
                      </div>
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border-[3px] border-[#10163a] text-white shadow-[3px_3px_0_#10163a]"
                        style={{ backgroundColor: track.accent }}
                      >
                        {track.icon}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2.5">
                {[
                  { value: '100%', label: 'Real projects', color: '#4562b0' },
                  { value: '1:1', label: 'Mentor feedback', color: '#fa8a43' },
                  { value: 'Fast', label: 'Job momentum', color: '#ea6865' },
                ].map((item) => (
                  <div key={item.label} className="rounded-[1.1rem] border-[3px] border-[#10163a] bg-white px-2.5 py-2.5 text-center shadow-[4px_4px_0_#10163a]">
                    <div className="text-lg font-black" style={{ color: item.color }}>{item.value}</div>
                    <div className="mt-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#6b7280]">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        </div>
      </section>
  )
}
