'use client'

import confetti from 'canvas-confetti'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Award,
  Briefcase,
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
        <div className="brand-dot-grid absolute inset-0 opacity-25" />
        <div className="animate-float-orb absolute left-[4%] top-24 h-36 w-36 rounded-[2.8rem] bg-[#edf3ff]" />
        <div className="animate-float-orb absolute right-[7%] top-24 h-28 w-28 rounded-full bg-[#fff2d6]" />
        <div className="animate-float-orb absolute bottom-28 left-[10%] h-20 w-20 rounded-full bg-[#ffe6e1]" />
        <div className="animate-float-orb absolute bottom-20 right-[14%] h-24 w-24 rounded-[1.75rem] bg-[#eef2ff]" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-7 px-5 py-5 sm:px-6 md:grid-cols-[1.02fr_0.98fr] md:gap-8 lg:py-6">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 md:space-y-5"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d7e1f3] bg-[#f7faff] px-4 py-2 text-xs font-bold text-[#4562b0] shadow-sm md:text-sm">
            <Sparkles size={14} className="text-[#fa8a43]" />
            Job-focused creative institute in Chennai
          </div>

          <div className="space-y-3">
            <h1 className="headline-balance max-w-[10.5ch] text-[2.9rem] font-black leading-[0.9] tracking-[-0.06em] text-[#081225] sm:text-[3.35rem] md:text-[4rem] lg:text-[4.55rem] xl:text-[4.85rem]">
              Learn creative
              <span className="block text-[#4562b0]">skills that get</span>
              <span className="block text-[#ea6865]">you hired.</span>
            </h1>

            <p className="max-w-2xl text-[0.98rem] leading-7 text-[#344054] md:text-[1rem] lg:text-[1.03rem]">
              TSDC helps students in Chennai become <strong>Graphic Designers, UI/UX Designers, Digital Marketers, and Video Editors</strong> with live projects, portfolio building, mentor feedback, internship-style exposure, and career guidance that feels real.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/courses"
                ref={buttonRef}
                onClick={handleConfetti}
                className="inline-flex items-center gap-2 rounded-full bg-[#4562b0] px-6 py-3.5 text-sm font-black text-white shadow-[0_22px_45px_rgba(69,98,176,0.28)] transition-all hover:bg-[#3c56a5] sm:px-7 md:text-base"
              >
                Explore Career Courses
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() =>
                openPopup({
                  title: 'Book Free Career Counselling',
                  subtitle: 'Tell us your interest and our team will guide you toward the best creative course for your goal.',
                  interest: 'Free Counselling',
                  source: 'homepage-hero-primary',
                  ctaLabel: 'Book My Free Counselling',
                })
              }
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#d7e1f3] bg-[#fff8f2] px-6 py-3.5 text-sm font-black text-[#fa8a43] shadow-sm transition-all hover:border-[#fa8a43]/30 sm:px-7 md:text-base"
            >
              Start Your Career Journey
            </motion.button>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {['Live client-style projects', 'Portfolio-first learning', '1:1 mentor feedback', 'Placement support'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.08 }}
                className="rounded-full border border-[#dce4f4] bg-white px-3 py-1.5 text-xs font-semibold text-[#1b2940] shadow-sm md:text-sm"
              >
                {item}
              </motion.div>
            ))}
          </div>

          <div className="hidden max-w-2xl grid-cols-2 gap-2.5 sm:grid sm:grid-cols-4">
            {impactStats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -4 }}
                className="rounded-[1.25rem] border border-[#dbe4f5] bg-white px-3 py-3 text-center shadow-[0_18px_36px_rgba(15,23,42,0.05)]"
              >
                <div className="mb-1 flex justify-center text-[#4562b0]">{stat.icon}</div>
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
            <div className="animate-tilt-card absolute -left-4 top-10 h-28 w-28 rounded-[2rem] bg-[#4562b0]/10" />
            <div className="animate-float-orb absolute -right-5 bottom-8 h-24 w-24 rounded-full bg-[#fa8a43]/18" />

            <div className="relative overflow-hidden rounded-[2rem] border border-[#dbe4f4] bg-white p-4 shadow-[0_32px_80px_rgba(15,23,42,0.1)]">
              <div className="mb-3 rounded-[1.45rem] bg-[#0d1d3c] p-5 text-white">
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#ffd54f]">Chennai Creative Career Hub</p>
                <h3 className="mt-2 text-2xl font-black leading-tight lg:text-[1.65rem]">
                  Build a portfolio that looks
                  <span className="block text-[#9fc0ff]">worth hiring.</span>
                </h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-white/82">
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
                    className="rounded-[1.3rem] border border-[#dce4f4] bg-[#f8fbff] p-3.5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-base font-black text-[#081225]">{track.title}</h4>
                        <p className="mt-1 text-sm leading-5 text-[#475467]">{track.line}</p>
                      </div>
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg"
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
                  <div key={item.label} className="rounded-[1.1rem] border border-[#dce4f4] bg-white px-2.5 py-2.5 text-center">
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
