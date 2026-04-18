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
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useContactPopup } from '@/app/components/common/ContactPopupProvider'
import { defaultSiteContent, loadSiteContent, SITE_CONTENT_UPDATED_EVENT } from '@/app/lib/siteContent'

const impactStatIcons = [<Users key="users" size={16} />, <Briefcase key="briefcase" size={16} />, <Award key="award" size={16} />, <Star key="star" size={16} />]
const statAccents = [
  { bg: '#fff4e5', border: 'rgba(255,151,54,0.3)',  icon: '#ff9736' },
  { bg: '#eef3ff', border: 'rgba(50,68,181,0.25)',  icon: '#3244b5' },
  { bg: '#fdf4ff', border: 'rgba(219,75,135,0.25)', icon: '#db4b87' },
  { bg: '#fffbeb', border: 'rgba(255,203,83,0.45)',  icon: '#92400e' },
]
const heroTrackIcons = [
  <Paintbrush key="paintbrush" size={23} />,
  <MonitorSmartphone key="device" size={23} />,
  <Megaphone key="megaphone" size={23} />,
  <Video key="video" size={23} />,
]

export default function HeroSection() {
  const buttonRef = useRef<HTMLAnchorElement | null>(null)
  const { openPopup } = useContactPopup()
  const [content, setContent] = useState(defaultSiteContent.hero)

  useEffect(() => {
    const syncContent = () => setContent(loadSiteContent().hero)

    syncContent()
    window.addEventListener('storage', syncContent)
    window.addEventListener(SITE_CONTENT_UPDATED_EVENT, syncContent)

    return () => {
      window.removeEventListener('storage', syncContent)
      window.removeEventListener(SITE_CONTENT_UPDATED_EVENT, syncContent)
    }
  }, [])

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
        <Image
          src="/Graphic%20Designer%20Class%20Room.png"
          alt=""
          fill
          priority
          aria-hidden="true"
          className="object-cover object-center opacity-[0.32] scale-[1.02]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,253,247,0.68)_0%,rgba(255,250,241,0.58)_42%,rgba(255,248,238,0.74)_100%)]" />
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="brand-dot-grid absolute inset-0 opacity-15" />
        <div className="animate-float-orb absolute right-[5%] top-16 h-20 w-20 rounded-full bg-[#ffcb53] opacity-60" />
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
            <span className="leading-snug">{content.badge}</span>
          </div>

          <div className="space-y-3">
            <h1 className="headline-balance max-w-[11ch] text-[2.55rem] font-black leading-[0.92] tracking-[-0.06em] text-[#0f1634] min-[380px]:text-[2.9rem] sm:text-[3.35rem] md:text-[4rem] lg:text-[4.55rem] xl:text-[4.85rem]">
              {content.title}
              <span className="block text-[#db4b87]">{content.highlight}</span>
            </h1>

            <p className="max-w-xl text-[0.98rem] leading-7 text-[#344054] md:text-[1rem]">
              {content.description}
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
                {content.primaryCta}
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() =>
                openPopup({
                  title: content.secondaryCta,
                  subtitle: 'Share your details and our admissions team will guide you to the right creative course, batch, and next step.',
                  interest: 'Creative Courses Counselling',
                  source: 'hero-free-counselling',
                  ctaLabel: content.secondaryCta,
                })
              }
              className="inline-flex w-full items-center justify-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-white px-5 py-3.5 text-center text-sm font-black text-[#10163a] shadow-[6px_6px_0_#10163a] transition-all hover:-translate-y-1 sm:w-auto sm:px-7 md:text-base"
            >
              {content.secondaryCta}
            </motion.button>
          </div>

          <div className="flex flex-wrap gap-2">
            {content.checklist.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.08 }}
                className="flex items-center gap-1.5 rounded-full border border-[#3244b5]/25 bg-[#eef3ff] px-3 py-1.5 text-xs font-semibold text-[#2d3d8f]"
              >
                <CheckCircle2 size={12} className="shrink-0 text-[#3244b5]" />
                {item}
              </motion.div>
            ))}
          </div>

          <div className="grid max-w-2xl grid-cols-2 gap-2.5 sm:grid-cols-4">
            {content.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -4 }}
                className="rounded-[1.25rem] px-3 py-3 text-center"
                style={{ backgroundColor: statAccents[index % statAccents.length].bg, border: `1.5px solid ${statAccents[index % statAccents.length].border}` }}
              >
                <div className="mb-1 flex justify-center" style={{ color: statAccents[index % statAccents.length].icon }}>{impactStatIcons[index % impactStatIcons.length]}</div>
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
              <Link
                href="/graphic-design-scholarship"
                className="group mb-3 block rounded-[1.45rem] border border-[#3244b5]/12 bg-[#f0f4ff] p-5 text-[#0f1634] transition hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(50,68,181,0.14)]"
              >
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#3244b5]">
                  Graphic Design Scholarship
                </p>
                <h3 className="mt-2 text-2xl font-black leading-tight lg:text-[1.65rem]">
                  Apply for the
                  <span className="block text-[#db4b87]">TSDC scholarship.</span>
                </h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-[#4d556f]">
                  If you are serious about building a creative career, start with the scholarship route and unlock a lighter-fee entry into our Graphic Design program.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#3244b5] transition group-hover:gap-3">
                  Go to scholarship page
                  <ArrowRight size={16} />
                </div>
              </Link>

              <div className="grid gap-2.5">
                {content.tracks.map((track, index) => (
                  <motion.div
                    key={track.title}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + index * 0.08 }}
                    whileHover={{ x: 6 }}
                    className="rounded-[1.3rem] border border-[#10163a]/10 bg-white p-3.5"
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
                        {heroTrackIcons[index % heroTrackIcons.length]}
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
                  <div key={item.label} className="rounded-[1.1rem] bg-white px-2.5 py-2.5 text-center" style={{ border: '1.5px solid rgba(16,22,58,0.1)' }}>
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
