'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MessageCircle,
  Phone,
  Sparkles,
  UserRound,
  Zap,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  defaultMasterclasses,
  fetchMasterclasses,
  formatPrice,
  getMasterclassBackgroundClass,
  isMasterclassVisibleOnLiveSite,
  type Masterclass,
} from '@/app/lib/masterclasses'

export default function MasterclassLandingPage({ slug }: { slug: string }) {
  const [masterclasses, setMasterclasses] = useState<Masterclass[]>(defaultMasterclasses)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    fetchMasterclasses().then(setMasterclasses)
    const onScroll = () => setScrolled(window.scrollY > 320)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const masterclass = masterclasses.find((item) => item.slug === slug)

  if (!masterclass || !isMasterclassVisibleOnLiveSite(masterclass)) {
    return (
      <main className="min-h-screen bg-[#0e1330] px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-[2.4rem] border-[3px] border-[#10163a] bg-[#fffdf7] p-8 text-center text-[#10163a] shadow-[9px_9px_0_rgba(0,0,0,0.5)]">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#3244b5]">Masterclass unavailable</p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.05em]">This masterclass is no longer live.</h1>
          <p className="mt-4 text-base font-semibold leading-8 text-[#4d556f]">
            This session has been unpublished. Browse other sessions below.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/masterclasses"
              className="inline-flex items-center justify-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#ff9736] px-6 py-3.5 text-sm font-black text-white shadow-[5px_5px_0_#10163a]"
            >
              View All Masterclasses
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-white px-6 py-3.5 text-sm font-black text-[#10163a] shadow-[5px_5px_0_#10163a]"
            >
              Back to TSDC
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const seatsLeft = masterclass.seatsTotal - masterclass.seatsTaken
  const seatProgress = Math.round((masterclass.seatsTaken / masterclass.seatsTotal) * 100)

  return (
    <main className="min-h-screen overflow-hidden bg-[#0b0f26] text-[#fffdf7]">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden px-4 pb-24 pt-6 sm:px-6 lg:px-8">
        {/* Background atmosphere */}
        <div className="pointer-events-none absolute inset-0">
          <div className={`absolute inset-x-0 top-0 h-[32rem] ${getMasterclassBackgroundClass(masterclass.backgroundStyle)} opacity-25`} />
          <div className="absolute inset-x-0 top-0 h-[32rem] bg-gradient-to-b from-transparent via-[#0b0f26]/70 to-[#0b0f26]" />
          {masterclass.backgroundImage && (
            <div className="absolute inset-x-0 top-0 h-[32rem] bg-cover bg-center opacity-8" style={{ backgroundImage: `url(${masterclass.backgroundImage})` }} />
          )}
          <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] [background-size:28px_28px]" />
          <div className="absolute -left-24 top-32 h-96 w-96 rounded-full bg-[#3244b5]/20 blur-3xl" />
          <div className="absolute -right-16 top-16 h-72 w-72 rounded-full bg-[#ff9736]/12 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          {/* Top nav */}
          <div className="mb-8 flex items-center justify-between">
            <Link href="/" aria-label="TSDC home" className="inline-flex items-center rounded-full border-[2px] border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-sm transition hover:bg-white/20">
              <Image src="/logo.png" alt="TSDC" width={80} height={26} priority />
            </Link>
            <a
              href={masterclass.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-[2px] border-white/20 bg-white/10 px-4 py-2 text-xs font-black text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              <MessageCircle size={13} />
              Ask on WhatsApp
            </a>
          </div>

          {/* Hero grid */}
          <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start lg:gap-10">

            {/* LEFT: headline + CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border-[2px] border-white/25 bg-white/10 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                  <Sparkles size={12} className="text-[#fa8a43]" />
                  {masterclass.badge}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border-[2px] border-[#ffcb53]/40 bg-[#ffcb53]/15 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#ffcb53]">
                  <Zap size={11} />
                  {masterclass.discountLabel}
                </span>
              </div>

              <h1 className="mt-5 text-[2.6rem] font-black leading-[1.02] tracking-[-0.07em] text-white min-[380px]:text-5xl sm:text-[3.5rem] lg:text-[4rem]">
                {masterclass.hook}
              </h1>

              <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-white/65 sm:text-lg">
                {masterclass.description}
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <div className="relative">
                  <motion.span
                    animate={{ scale: [1, 1.5], opacity: [0.45, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                    className="pointer-events-none absolute inset-0 rounded-[1rem] bg-[#ff9736]/60"
                  />
                  <Link
                    href={`/masterclasses/${masterclass.slug}/register`}
                    className="relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[1rem] border-[3px] border-[#10163a] bg-[#ff9736] px-7 py-4 text-sm font-black text-white shadow-[5px_5px_0_rgba(0,0,0,0.4)] transition hover:-translate-y-1"
                  >
                    <motion.span
                      animate={{ x: ['-120%', '220%'] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.2 }}
                      className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                    Secure Your Spot — {formatPrice(masterclass.price)}
                    <ArrowRight size={17} />
                  </Link>
                </div>
                <a
                  href="tel:+917358116929"
                  className="inline-flex items-center justify-center gap-2 rounded-[1rem] border-[2px] border-white/20 bg-white/8 px-7 py-4 text-sm font-black text-white backdrop-blur-sm transition hover:bg-white/16"
                >
                  <Phone size={15} />
                  Call to Register
                </a>
              </div>

              {/* Trust row */}
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                {['Instant WhatsApp confirmation', 'Mentor-led live session', 'Limited seats only'].map((t) => (
                  <span key={t} className="flex items-center gap-1.5 text-xs font-semibold text-white/50">
                    <CheckCircle2 size={12} className="text-[#7df7ab]" />
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* RIGHT: ticket card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:sticky lg:top-24"
            >
              <div className="overflow-hidden rounded-[2rem] border-[3px] border-[#10163a] bg-[#fffdf7] text-[#10163a] shadow-[8px_8px_0_rgba(0,0,0,0.5)]">
                {/* Ticket header */}
                <div className="bg-[#3244b5] px-5 py-4 text-white">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/55">Your seat</p>
                  <div className="mt-1 flex items-center justify-between gap-3">
                    <h2 className="text-lg font-black leading-snug tracking-[-0.03em]">{masterclass.category}</h2>
                    <div className="shrink-0 rounded-full border-[2px] border-white/30 bg-[#ff9736] px-3 py-1 text-sm font-black text-white">
                      {formatPrice(masterclass.price)}
                    </div>
                  </div>
                </div>

                {/* Perforated edge */}
                <div className="relative flex items-center px-4">
                  <div className="absolute -left-3 h-5 w-5 rounded-full bg-[#0b0f26]" />
                  <div className="absolute -right-3 h-5 w-5 rounded-full bg-[#0b0f26]" />
                  <div className="w-full border-t-[2.5px] border-dashed border-[#10163a]/20" />
                </div>

                {/* Ticket body */}
                <div className="p-5">
                  {/* Seat progress */}
                  <div className="rounded-[1.2rem] border-[2px] border-[#10163a]/12 bg-[#fef9f0] p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#667085]">Filling fast</p>
                      <span className="text-xs font-black text-[#fa8a43]">{seatsLeft} left</span>
                    </div>
                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#eef1ff]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${seatProgress}%` }}
                        transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-[#fa8a43] to-[#ff9736]"
                      />
                    </div>
                    <p className="mt-2 text-xs font-semibold text-[#667085]">{masterclass.seatsTaken} of {masterclass.seatsTotal} seats taken</p>
                  </div>

                  {/* Date + Time */}
                  <div className="mt-3 grid grid-cols-2 gap-2.5">
                    {[
                      { icon: CalendarDays, label: 'Date', value: masterclass.date, bg: 'bg-[#fff4e0]' },
                      { icon: Clock3, label: 'Time', value: masterclass.time, bg: 'bg-[#eef3ff]' },
                    ].map(({ icon: Icon, label, value, bg }) => (
                      <div key={label} className={`rounded-[1rem] border-[2px] border-[#10163a]/12 p-3 ${bg}`}>
                        <Icon size={14} className="text-[#fa8a43]" />
                        <p className="mt-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#667085]">{label}</p>
                        <p className="mt-0.5 text-sm font-black text-[#10163a]">{value}</p>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/masterclasses/${masterclass.slug}/register`}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#ff9736] px-5 py-3.5 text-sm font-black text-white shadow-[4px_4px_0_#10163a] transition hover:-translate-y-0.5"
                  >
                    Reserve My Seat
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU'LL UNLOCK ── */}
      <section className="bg-[#fffdf7] px-4 py-16 text-[#10163a] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#3244b5]">Session breakdown</p>
            <h2 className="mt-2 text-4xl font-black tracking-[-0.05em] text-[#10163a]">What you'll unlock</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Modules */}
            <div className="rounded-[2rem] border-[3px] border-[#10163a] bg-white p-6 shadow-[7px_7px_0_#10163a]">
              <div className="space-y-0">
                {masterclass.modules.map((module, i) => (
                  <div key={module.title} className={`flex items-start justify-between gap-4 py-4 ${i < masterclass.modules.length - 1 ? 'border-b-[2px] border-[#eef1ff]' : ''}`}>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eef3ff] text-[10px] font-black text-[#3244b5]">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <span className="text-sm font-bold leading-6 text-[#445066]">{module.title}</span>
                    </div>
                    <span className="shrink-0 rounded-full border-[2px] border-[#10163a] bg-[#eef3ff] px-3 py-1 text-[10px] font-black text-[#3244b5]">{module.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What's included */}
            <div className="rounded-[2rem] border-[3px] border-[#10163a] bg-white p-6 shadow-[7px_7px_0_#10163a]">
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#667085]">Included in this session</p>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {masterclass.includes.slice(0, 6).map((item, index) => (
                  <div
                    key={item.label}
                    className="rounded-[1rem] border-[2px] border-[#10163a]/10 px-4 py-3"
                    style={{ backgroundColor: index % 2 === 0 ? '#fff8f0' : '#eef3ff' }}
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#667085]">{item.label}</p>
                    <p className="mt-0.5 text-sm font-black text-[#10163a]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MENTOR ── */}
      <section className="bg-[#f0f4ff] px-4 py-16 text-[#10163a] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#3244b5]">Who's teaching</p>
            <h2 className="mt-2 text-4xl font-black tracking-[-0.05em] text-[#10163a]">Your mentor</h2>
          </div>

          <div className="overflow-hidden rounded-[2rem] border-[3px] border-[#10163a] bg-white shadow-[7px_7px_0_#10163a]">
            <div className="grid gap-0 md:grid-cols-[auto_1fr]">
              <div className="flex items-center justify-center bg-[#ff9736] p-8 md:min-h-full md:w-40">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-white/30 bg-white/20 text-white">
                  <UserRound size={36} />
                </div>
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-black tracking-[-0.04em] text-[#10163a]">{masterclass.instructor.name}</h3>
                <p className="mt-1 text-sm font-bold text-[#667085]">{masterclass.instructor.role}</p>
                <p className="mt-4 max-w-2xl text-base font-semibold leading-8 text-[#445466]">{masterclass.instructor.credibility}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section className="bg-[#fffdf7] px-4 py-16 text-[#10163a] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#3244b5]">Right for you?</p>
            <h2 className="mt-2 text-4xl font-black tracking-[-0.05em] text-[#10163a]">Who this is for</h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {masterclass.audience.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="flex items-start gap-3 rounded-[1.4rem] border-[3px] border-[#10163a] p-5 shadow-[4px_4px_0_#10163a]"
                style={{ backgroundColor: index % 2 === 0 ? '#eef3ff' : '#fff8f0' }}
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#3244b5]" />
                <p className="text-sm font-bold leading-6 text-[#2c3a5e]">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-[#0b0f26] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/40">Limited seats</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.05em]">Ready to learn?</h2>
          <p className="mt-4 text-base font-semibold leading-8 text-white/60">
            {seatsLeft} seats remaining. Secure yours before the batch fills up.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={`/masterclasses/${masterclass.slug}/register`}
              className="inline-flex items-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#ff9736] px-8 py-4 text-sm font-black text-white shadow-[5px_5px_0_rgba(0,0,0,0.4)] transition hover:-translate-y-1"
            >
              Book Your Seat — {formatPrice(masterclass.price)}
              <ArrowRight size={16} />
            </Link>
            <a
              href={masterclass.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[1rem] border-[2px] border-white/20 bg-white/8 px-8 py-4 text-sm font-black text-white backdrop-blur-sm transition hover:bg-white/16"
            >
              <MessageCircle size={15} />
              Ask on WhatsApp
            </a>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2">
            <Image src="/logo.png" alt="TSDC" width={72} height={24} className="opacity-40" />
          </div>
        </div>
      </section>

      {/* ── STICKY CTA ── */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 z-[1250] border-t-[2px] border-white/10 bg-[#0b0f26]/96 px-4 py-3 backdrop-blur-xl sm:px-6"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-2 w-2 rounded-full bg-[#fa8a43] animate-pulse" />
                <p className="text-xs font-black uppercase tracking-[0.16em] text-white/70">
                  {seatsLeft} seats left · {masterclass.category}
                </p>
              </div>
              <Link
                href={`/masterclasses/${masterclass.slug}/register`}
                className="inline-flex items-center justify-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#ff9736] px-6 py-3 text-sm font-black text-white shadow-[4px_4px_0_rgba(0,0,0,0.4)] transition hover:-translate-y-0.5"
              >
                Secure Your Spot — {formatPrice(masterclass.price)}
                <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
