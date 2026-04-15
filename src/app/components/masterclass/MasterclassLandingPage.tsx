'use client'

import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  MessageCircle,
  Phone,
  Sparkles,
  Ticket,
  UserRound,
  Zap,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  defaultMasterclasses,
  formatPrice,
  getMasterclassBackgroundClass,
  isMasterclassVisibleOnLiveSite,
  loadMasterclasses,
  type Masterclass,
} from '@/app/lib/masterclasses'

const contactDetails = [
  { label: 'Call', value: '+91 73581 16929', href: 'tel:+917358116929', icon: Phone },
  { label: 'WhatsApp', value: 'Ask anything', href: 'https://wa.me/917358116929', icon: MessageCircle },
  { label: 'Email', value: 'support@traijoedu.in', href: 'mailto:support@traijoedu.in', icon: Mail },
]

export default function MasterclassLandingPage({ slug }: { slug: string }) {
  const router = useRouter()
  const [masterclasses, setMasterclasses] = useState<Masterclass[]>(defaultMasterclasses)

  useEffect(() => {
    setMasterclasses(loadMasterclasses())
  }, [])

  const masterclass = masterclasses.find((item) => item.slug === slug)

  if (!masterclass || !isMasterclassVisibleOnLiveSite(masterclass)) {
    return (
      <main className="min-h-screen bg-[#0e1330] px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-[2.4rem] border-[3px] border-[#10163a] bg-[#fffdf7] p-8 text-center text-[#10163a] shadow-[9px_9px_0_rgba(0,0,0,0.5)]">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#3244b5]">Masterclass unavailable</p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.05em]">This masterclass is no longer live on the site.</h1>
          <p className="mt-4 text-base font-semibold leading-8 text-[#4d556f]">
            The session date is too close or has already passed, so the page has been automatically hidden from the live site. You can go back to the masterclasses page and pick another session.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/masterclasses"
              className="inline-flex items-center justify-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#3244b5] px-6 py-3.5 text-sm font-black text-white shadow-[5px_5px_0_#10163a]"
            >
              View Masterclasses
              <ArrowRight size={16} />
            </Link>
            <button
              type="button"
              onClick={() => router.push('/')}
              className="inline-flex items-center justify-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-white px-6 py-3.5 text-sm font-black text-[#10163a] shadow-[5px_5px_0_#10163a]"
            >
              <ArrowLeft size={16} />
              Back to Home
            </button>
          </div>
        </div>
      </main>
    )
  }

  const seatsLeft = masterclass.seatsTotal - masterclass.seatsTaken
  const seatProgress = Math.round((masterclass.seatsTaken / masterclass.seatsTotal) * 100)

  return (
    <main className="min-h-screen overflow-hidden bg-[#0e1330] text-[#fffdf7]">
      {/* ── Hero section with dark immersive background ── */}
      <section className="relative overflow-hidden px-4 pb-28 pt-6 sm:px-6 lg:px-8">
        {/* Atmospheric background layers */}
        <div className="pointer-events-none absolute inset-0">
          <div className={`absolute inset-x-0 top-0 h-[28rem] ${getMasterclassBackgroundClass(masterclass.backgroundStyle)} opacity-30`} />
          <div className="absolute inset-x-0 top-0 h-[28rem] bg-gradient-to-b from-transparent via-[#0e1330]/60 to-[#0e1330]" />
          {masterclass.backgroundImage && (
            <div
              className="absolute inset-x-0 top-0 h-[28rem] bg-cover bg-center opacity-10"
              style={{ backgroundImage: `url(${masterclass.backgroundImage})` }}
            />
          )}
          <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.25)_1px,transparent_0)] [background-size:28px_28px]" />
          {/* Glow orbs */}
          <div className="absolute -left-20 top-40 h-80 w-80 rounded-full bg-[#3244b5]/25 blur-3xl" />
          <div className="absolute -right-20 top-20 h-80 w-80 rounded-full bg-[#db4b87]/15 blur-3xl" />
        </div>

        {/* Back to site button */}
        <motion.button
          type="button"
          onClick={() => router.push('/')}
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.97 }}
          className="relative z-[1300] mb-5 inline-flex items-center gap-2 rounded-full border-[3px] border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-white/20"
        >
          <ArrowLeft size={13} />
          Back to TSDC
        </motion.button>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-4">
          {/* Header bar */}
          <header className="flex flex-col gap-3 rounded-[1.8rem] border-[3px] border-white/15 bg-white/8 p-3 backdrop-blur-md md:flex-row md:items-center md:justify-between">
            <Link href="/" aria-label="TSDC home" className="inline-flex w-max items-center rounded-full border-[3px] border-white/20 bg-white px-3.5 py-2 shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
              <Image src="/logo.png" alt="TSDC Logo" width={96} height={32} priority />
            </Link>

            <div className="flex flex-wrap gap-2">
              {contactDetails.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-2 rounded-full border-[3px] border-white/20 bg-white/10 px-3 py-1.5 text-xs font-black text-white backdrop-blur-sm transition hover:bg-white hover:text-[#10163a]"
                  >
                    <Icon size={14} />
                    <span className="hidden sm:inline">{item.label}:</span>
                    {item.value}
                  </a>
                )
              })}
            </div>
          </header>

          {/* Main 12-col grid */}
          <div className="grid gap-4 lg:grid-cols-12">
            {/* ── Left hero card ── */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[2.4rem] border-[3px] border-[#10163a] bg-[#fffdf7] p-5 shadow-[9px_9px_0_rgba(0,0,0,0.5)] lg:col-span-7 lg:p-7"
            >
              <div className="flex h-full flex-col justify-between gap-5">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full border-[3px] border-[#10163a] bg-white px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-black shadow-[4px_4px_0_#10163a] sm:text-xs">
                      <Sparkles size={14} className="text-[#fa8a43]" />
                      {masterclass.badge}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border-[3px] border-[#10163a] bg-[#ffcb53] px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#10163a] shadow-[4px_4px_0_#10163a] sm:text-xs">
                      <Zap size={12} />
                      {masterclass.discountLabel}
                    </span>
                  </div>

                  <p className="mt-5 text-xs font-black uppercase tracking-[0.28em] text-[#667085]">Exclusive TSDC session</p>
                  <h1 className="mt-3 max-w-4xl text-[2.35rem] font-black leading-[0.92] tracking-[-0.07em] text-[#10163a] min-[380px]:text-[2.75rem] sm:text-[3.35rem] lg:text-[4rem] xl:text-[4.55rem]">
                    {masterclass.hook}
                  </h1>
                  <p className="mt-4 max-w-3xl text-base font-medium leading-7 text-[#445066] sm:text-lg sm:leading-8">
                    {masterclass.description}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <motion.div
                    animate={{ scale: [1, 1.035, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative"
                  >
                    {/* Pulse glow ring */}
                    <motion.span
                      animate={{ scale: [1, 1.55], opacity: [0.55, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                      className="pointer-events-none absolute inset-0 rounded-[1rem] bg-[#ff9736]"
                    />
                    <Link
                      href={`/masterclasses/${masterclass.slug}/register`}
                      className="relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[1rem] border-[3px] border-[#10163a] bg-[#ff9736] px-6 py-3.5 text-sm font-black text-white shadow-[5px_5px_0_#10163a] transition hover:-translate-y-1"
                    >
                      {/* Shimmer sweep */}
                      <motion.span
                        animate={{ x: ['-120%', '220%'] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
                        className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                      />
                      Secure Your Spot — {formatPrice(masterclass.price)}
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <ArrowRight size={17} />
                      </motion.span>
                    </Link>
                  </motion.div>
                  <a
                    href={masterclass.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-white px-6 py-3.5 text-sm font-black text-[#10163a] shadow-[5px_5px_0_#10163a] transition hover:-translate-y-1 hover:bg-[#3244b5] hover:text-white"
                  >
                    <MessageCircle size={17} />
                    Ask on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>

            {/* ── Ticket sidebar ── */}
            <motion.aside
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <div className="relative h-full overflow-hidden rounded-[2.4rem] border-[3px] border-[#10163a] bg-[#fffdf7] shadow-[9px_9px_0_rgba(0,0,0,0.5)]">
                {/* Ticket top */}
                <div className="bg-[#3244b5] p-5 text-white">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/60">Your seat</p>
                  <div className="mt-1 flex items-start justify-between gap-3">
                    <h2 className="text-xl font-black tracking-[-0.04em] leading-tight">{masterclass.category}</h2>
                    <div className="shrink-0 rounded-full border-[3px] border-[#10163a] bg-[#ffcb53] px-3 py-1.5 text-sm font-black text-[#10163a] shadow-[3px_3px_0_#10163a]">
                      {formatPrice(masterclass.price)}
                    </div>
                  </div>
                </div>

                {/* Perforated divider */}
                <div className="relative flex items-center px-5">
                  <div className="absolute -left-3 h-6 w-6 rounded-full bg-[#0e1330]" />
                  <div className="absolute -right-3 h-6 w-6 rounded-full bg-[#0e1330]" />
                  <div className="w-full border-t-[3px] border-dashed border-[#10163a]/25" />
                </div>

                {/* Ticket body */}
                <div className="p-5">
                  {/* Seat rush */}
                  <div className="rounded-[1.4rem] border-[3px] border-[#10163a] bg-white p-4 shadow-[4px_4px_0_#10163a]">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#667085]">Filling fast</p>
                      <span className="text-xs font-black text-[#fa8a43]">{seatProgress}% booked</span>
                    </div>
                    <div className="mt-3 h-4 overflow-hidden rounded-full border-[3px] border-[#10163a] bg-[#eef1ff]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${seatProgress}%` }}
                        transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-[#fa8a43] to-[#ff9736]"
                      />
                    </div>
                    <p className="mt-2 text-xs font-bold text-[#445066]">
                      <span className="font-black text-[#10163a]">{seatsLeft} seats remaining</span> — {masterclass.seatsTaken} already taken
                    </p>
                  </div>

                  {/* Quick info */}
                  <div className="mt-3 grid grid-cols-2 gap-2.5">
                    {[
                      { icon: CalendarDays, label: 'Date', value: masterclass.date, bg: '#fff1dd' },
                      { icon: Clock3, label: 'Time', value: masterclass.time, bg: '#eef1ff' },
                    ].map(({ icon: Icon, label, value, bg }) => (
                      <div key={label} className="rounded-[1.2rem] border-[3px] border-[#10163a] p-3 shadow-[4px_4px_0_#10163a]" style={{ backgroundColor: bg }}>
                        <Icon size={15} className="mb-1.5 text-[#fa8a43]" />
                        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#667085]">{label}</p>
                        <p className="mt-0.5 text-sm font-black text-[#10163a]">{value}</p>
                      </div>
                    ))}
                    <div className="col-span-2 rounded-[1.2rem] border-[3px] border-[#10163a] bg-[#fff1f6] p-3 shadow-[4px_4px_0_#10163a]">
                      <Ticket size={15} className="mb-1.5 text-[#db4b87]" />
                      <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#667085]">Available seats</p>
                      <p className="mt-0.5 text-sm font-black text-[#10163a]">{seatsLeft} of {masterclass.seatsTotal} seats left</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* ── What's included ── */}
            <div className="rounded-[2rem] border-[3px] border-[#10163a] bg-[#fffdf7] p-5 shadow-[7px_7px_0_rgba(0,0,0,0.4)] lg:col-span-5">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#667085]">What's included</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {masterclass.includes.slice(0, 6).map((item, index) => (
                  <div
                    key={item.label}
                    className="rounded-[1rem] border-[3px] border-[#10163a] px-3 py-2.5 shadow-[3px_3px_0_#10163a]"
                    style={{ backgroundColor: index % 2 === 0 ? '#fff4e7' : '#eef1ff' }}
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#5b6475]">{item.label}</p>
                    <p className="text-sm font-black text-[#081225]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Mentor + syllabus ── */}
            <div className="rounded-[2rem] border-[3px] border-[#10163a] bg-[#fffdf7] p-4 shadow-[7px_7px_0_rgba(0,0,0,0.4)] lg:col-span-12">
              <div className="grid gap-3 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-[1.4rem] border-[3px] border-[#10163a] bg-[#ff9736] p-5 text-white shadow-[5px_5px_0_#10163a]">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/60">Your mentor</p>
                  <h2 className="mt-1.5 text-xl font-black">{masterclass.instructor.name}</h2>
                  <p className="text-xs font-bold text-white/70">{masterclass.instructor.role}</p>
                  <p className="mt-3 text-sm font-semibold leading-6 text-white/90">{masterclass.instructor.credibility}</p>
                </div>
                <div className="rounded-[1.4rem] border-[3px] border-[#10163a] bg-[#fff8ed] p-5 shadow-[5px_5px_0_#10163a]">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#3244b5]">Program snapshot</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {masterclass.includes.slice(0, 4).map((item) => (
                      <div key={item.label} className="rounded-xl border-[3px] border-[#10163a] bg-white px-3 py-3 text-xs font-bold shadow-[3px_3px_0_#10163a]">
                        <p className="text-[10px] uppercase tracking-[0.16em] text-[#667085]">{item.label}</p>
                        <p className="mt-1 text-sm font-black text-[#10163a]">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Full modules + instructor ── */}
      <section className="relative z-10 bg-[#fffdf7] px-4 py-14 text-[#10163a] sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
          <div className="rounded-[2rem] border-[3px] border-[#10163a] bg-white p-6 shadow-[8px_8px_0_#10163a]">
            <h2 className="text-3xl font-black tracking-[-0.05em] text-[#10163a]">What you'll unlock</h2>
            <div className="mt-6 space-y-4">
              {masterclass.modules.map((module) => (
                <div key={module.title} className="flex items-start justify-between gap-4 border-b-[3px] border-[#eef1ff] pb-4 last:border-0 last:pb-0">
                  <span className="font-bold leading-7 text-[#445066]">{module.title}</span>
                  <span className="shrink-0 rounded-full border-[3px] border-[#10163a] bg-[#3244b5] px-3 py-1 text-xs font-black text-white shadow-[3px_3px_0_#10163a]">{module.duration}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-[2rem] border-[3px] border-[#10163a] bg-[#ff9736] p-6 text-white shadow-[8px_8px_0_#10163a]">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-[#10163a] bg-white text-[#10163a] shadow-[4px_4px_0_#10163a]">
                  <UserRound size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black">{masterclass.instructor.name}</h2>
                  <p className="text-sm font-bold text-white/75">{masterclass.instructor.role}</p>
                </div>
              </div>
              <p className="mt-5 text-base font-semibold leading-8">{masterclass.instructor.credibility}</p>
            </div>

            <div className="rounded-[2rem] border-[3px] border-[#10163a] bg-white p-6 text-black shadow-[8px_8px_0_#10163a]">
              <h2 className="text-3xl font-black tracking-[-0.05em]">Who this is for</h2>
              <div className="mt-5 grid gap-3">
                {masterclass.audience.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border-[3px] border-[#10163a] p-4 text-sm font-bold leading-6 shadow-[4px_4px_0_#10163a]"
                    style={{ backgroundColor: index % 2 === 0 ? '#eef1ff' : '#fff4e7' }}
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#4562b0]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#0e1330] px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 rounded-[2.4rem] border-[3px] border-white/15 bg-white/8 p-6 backdrop-blur-sm md:grid-cols-[1fr_auto] md:p-8">
          <div>
            <div className="rounded-full border-[3px] border-white/20 bg-white p-2.5 w-max">
              <Image src="/logo.png" alt="TSDC Logo" width={120} height={38} />
            </div>
            <p className="mt-5 max-w-2xl text-sm font-semibold leading-7 text-white/70">
              TSDC masterclasses are live, limited-seat sessions designed to give you a real creative skill upgrade in just a few hours — with expert mentorship, practical output, and no filler.
            </p>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.22em] text-white/40">
              One session. Real skills. Real confidence.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3">
            <Link
              href={`/masterclasses/${masterclass.slug}/register`}
              className="inline-flex items-center justify-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#ff9736] px-6 py-3.5 text-sm font-black text-white shadow-[5px_5px_0_rgba(0,0,0,0.4)] transition hover:-translate-y-1"
            >
              Book Your Seat
              <ArrowRight size={16} />
            </Link>
            <a
              href="tel:+917358116929"
              className="inline-flex items-center justify-center gap-2 rounded-[1rem] border-[3px] border-white/20 bg-white/10 px-6 py-3.5 text-sm font-black text-white backdrop-blur-sm transition hover:bg-white hover:text-[#10163a]"
            >
              <Phone size={16} />
              Call TSDC
            </a>
          </div>
        </div>
      </footer>

      {/* ── Sticky CTA bar ── */}
      <motion.div
        initial={{ y: 90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 bottom-0 z-[1250] border-t-[3px] border-white/15 bg-[#0e1330]/95 px-4 py-3 backdrop-blur-xl sm:px-6"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-2.5 w-2.5 rounded-full bg-[#fa8a43] animate-pulse" />
            <p className="text-xs font-black uppercase tracking-[0.18em] text-white/80">
              {seatsLeft} seats left · {masterclass.category}
            </p>
          </div>
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            <motion.span
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
              className="pointer-events-none absolute inset-0 rounded-[1rem] bg-[#ff9736]"
            />
            <Link
              href={`/masterclasses/${masterclass.slug}/register`}
              className="relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[1rem] border-[3px] border-[#10163a] bg-[#ff9736] px-6 py-3 text-sm font-black text-white shadow-[4px_4px_0_rgba(0,0,0,0.4)] transition hover:-translate-y-1"
            >
              <motion.span
                animate={{ x: ['-120%', '220%'] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
                className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent"
              />
              Secure Your Spot — {formatPrice(masterclass.price)}
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowRight size={16} />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </main>
  )
}
