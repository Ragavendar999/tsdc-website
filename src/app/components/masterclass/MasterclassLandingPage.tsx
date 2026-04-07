'use client'

import { motion } from 'framer-motion'
import {
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
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  defaultMasterclasses,
  formatPrice,
  getMasterclassBackgroundClass,
  MASTERCLASS_STORAGE_KEY,
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
    try {
      const stored = window.localStorage.getItem(MASTERCLASS_STORAGE_KEY)
      if (stored) setMasterclasses(JSON.parse(stored))
    } catch {
      setMasterclasses(defaultMasterclasses)
    }
  }, [])

  const masterclass = masterclasses.find((item) => item.slug === slug) || defaultMasterclasses[0]
  const seatsLeft = masterclass.seatsTotal - masterclass.seatsTaken
  const seatProgress = Math.round((masterclass.seatsTaken / masterclass.seatsTotal) * 100)

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <section className="relative min-h-screen overflow-hidden px-4 pb-24 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className={`absolute inset-0 ${getMasterclassBackgroundClass(masterclass.backgroundStyle)}`} />
          {masterclass.backgroundImage && (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-28 mix-blend-screen"
              style={{ backgroundImage: `url(${masterclass.backgroundImage})` }}
            />
          )}
          <div className="absolute inset-x-0 top-0 h-44 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),transparent)] opacity-70" />
          <div className="absolute left-0 top-0 h-48 w-full bg-[url('/logo.png')] bg-[length:360px_auto] bg-center bg-no-repeat opacity-[0.035] blur-sm" />
          <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.24)_1px,transparent_0)] [background-size:26px_26px]" />
        </div>

        <motion.button
          type="button"
          drag="y"
          dragConstraints={{ top: 0, bottom: 74 }}
          dragElastic={0.12}
          onDragEnd={(_, info) => {
            if (info.offset.y > 42) router.push('/')
          }}
          onClick={() => router.push('/')}
          whileTap={{ scale: 0.96 }}
          aria-label="Pull lever to go to homepage"
          className="fixed right-4 top-0 z-[1300] flex cursor-grab flex-col items-center active:cursor-grabbing sm:right-8"
        >
          <span className="h-10 w-1 rounded-b-full bg-white/55 shadow-[0_0_20px_rgba(255,255,255,0.45)]" />
          <span className="rounded-b-3xl border border-white/15 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-black shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
            Pull home
          </span>
        </motion.button>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-2">
          <header className="flex flex-col gap-2 rounded-[1.35rem] border border-white/12 bg-white/[0.06] p-2 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
            <Link href="/" aria-label="TSDC home" className="inline-flex w-max items-center rounded-full bg-white px-3.5 py-2">
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
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.07] px-3 py-1.5 text-xs font-black text-white/88 transition hover:-translate-y-0.5 hover:bg-white hover:text-black"
                  >
                    <Icon size={14} />
                    <span className="hidden sm:inline">{item.label}:</span>
                    {item.value}
                  </a>
                )
              })}
            </div>
          </header>

          <div className="grid min-h-[calc(100svh-7.25rem)] content-start gap-3 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[2rem] border border-white/12 bg-white/[0.07] p-5 shadow-[0_32px_100px_rgba(0,0,0,0.34)] backdrop-blur-2xl lg:col-span-7 lg:row-span-3 lg:p-7"
            >
              <div className="flex h-full flex-col justify-between gap-5">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-black sm:text-xs">
                      <Sparkles size={14} className="text-[#fa8a43]" />
                      {masterclass.badge}
                    </span>
                    <span className="inline-flex rounded-full border border-[#fa8a43]/45 bg-[#fa8a43]/16 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#ffd9c2] sm:text-xs">
                      {masterclass.discountLabel}
                    </span>
                  </div>

                  <p className="mt-5 text-xs font-black uppercase tracking-[0.28em] text-white/45">Exclusive TSDC session</p>
                  <h1 className="mt-3 max-w-4xl text-[2.35rem] font-black leading-[0.92] tracking-[-0.07em] text-white min-[380px]:text-[2.75rem] sm:text-[3.35rem] lg:text-[4rem] xl:text-[4.55rem]">
                  {masterclass.hook}
                  </h1>
                  <p className="mt-4 max-w-3xl text-base font-medium leading-7 text-white/72 sm:text-lg sm:leading-8">
                    {masterclass.description}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={`/masterclasses/${masterclass.slug}/register`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-black text-black shadow-[0_24px_70px_rgba(255,255,255,0.18)] transition hover:-translate-y-1"
                  >
                    Secure Your Spot - {formatPrice(masterclass.price)}
                    <ArrowRight size={17} />
                  </Link>
                  <a
                    href={masterclass.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/16 bg-white/[0.07] px-6 py-3.5 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-[#25d366]"
                  >
                    <MessageCircle size={17} />
                    Ask on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="relative lg:col-span-5"
            >
              <div className="absolute -inset-5 rounded-[3rem] bg-[#4562b0]/20 blur-3xl" />
              <div className="relative h-full overflow-hidden rounded-[2rem] border border-white/14 bg-white/[0.08] p-3 shadow-[0_40px_120px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
                <div className="h-full rounded-[1.65rem] bg-white p-4 text-black">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#4562b0]">Tonight's ticket</p>
                      <h2 className="mt-1 text-2xl font-black tracking-[-0.05em]">{masterclass.category}</h2>
                    </div>
                    <div className="rounded-full bg-black px-4 py-2 text-sm font-black text-white">{formatPrice(masterclass.price)}</div>
                  </div>

                  <div className="mt-4 rounded-[1.4rem] bg-black p-4 text-white">
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-white/45">Seat rush</p>
                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/12">
                      <div className="h-full rounded-full bg-[#fa8a43]" style={{ width: `${seatProgress}%` }} />
                    </div>
                    <p className="mt-2 text-xs font-bold text-white/64">
                      {masterclass.seatsTaken} seats booked. {seatsLeft} seats still open.
                    </p>
                  </div>
                </div>
              </div>
            </motion.aside>

            <div className="grid gap-3 sm:grid-cols-3 lg:col-span-5">
              {[
                [CalendarDays, masterclass.date],
                [Clock3, masterclass.time],
                [Ticket, `${seatsLeft} seats left`],
              ].map(([Icon, label]) => {
                const TypedIcon = Icon as typeof CalendarDays
                return (
                  <div key={label as string} className="rounded-[1.45rem] border border-white/12 bg-white/[0.07] p-4 backdrop-blur">
                    <TypedIcon size={17} className="mb-2 text-[#fa8a43]" />
                    <p className="text-sm font-black text-white">{label as string}</p>
                  </div>
                )
              })}
            </div>

            <div className="rounded-[2rem] border border-white/12 bg-white/[0.07] p-4 backdrop-blur-xl lg:col-span-5">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-white/45">Included</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {masterclass.includes.slice(0, 6).map((item) => (
                  <div key={item.label} className="rounded-[1rem] bg-white px-3 py-2.5 text-black">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#5b6475]">{item.label}</p>
                    <p className="text-sm font-black text-[#081225]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/12 bg-white/[0.07] p-4 backdrop-blur-xl lg:col-span-12">
              <div className="grid gap-3 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-[1.4rem] bg-[#fa8a43] p-4 text-black">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-black/55">Mentor</p>
                  <h2 className="mt-1 text-xl font-black">{masterclass.instructor.name}</h2>
                  <p className="text-xs font-bold text-black/65">{masterclass.instructor.role}</p>
                  <p className="mt-2 line-clamp-2 text-sm font-black leading-6">{masterclass.instructor.credibility}</p>
                </div>
                <div className="rounded-[1.4rem] bg-white p-4 text-black">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#4562b0]">Quick syllabus</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {masterclass.modules.slice(0, 4).map((module) => (
                      <div key={module.title} className="flex items-start justify-between gap-3 rounded-xl bg-[#f3f5ff] px-3 py-2 text-xs font-bold">
                        <span className="line-clamp-2">{module.title}</span>
                        <span className="shrink-0 rounded-full bg-black px-2 py-1 text-[10px] font-black text-white">{module.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <motion.div
        initial={{ y: 90, opacity: 0 }}
        animate={{ y: [0, -4, 0], opacity: 1 }}
        transition={{ y: { duration: 1.8, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }, opacity: { duration: 0.35 } }}
        className="fixed inset-x-0 bottom-0 z-[1250] border-t border-white/12 bg-black/78 px-4 py-3 backdrop-blur-xl sm:px-6"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center text-xs font-black uppercase tracking-[0.18em] text-white/62 sm:text-left">
            {seatsLeft} seats left for {masterclass.category}
          </p>
          <Link
            href={`/masterclasses/${masterclass.slug}/register`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-black shadow-[0_18px_50px_rgba(255,255,255,0.18)] transition hover:-translate-y-1"
          >
            Secure Your Spot - {formatPrice(masterclass.price)}
            <ArrowRight size={16} />
          </Link>
        </div>
      </motion.div>

      <section className="relative z-10 border-y border-white/10 bg-[#050505] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6">
            <h2 className="text-3xl font-black tracking-[-0.05em]">What you'll unlock</h2>
            <div className="mt-6 space-y-4">
              {masterclass.modules.map((module) => (
                <div key={module.title} className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                  <span className="font-bold leading-7 text-white/82">{module.title}</span>
                  <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-black text-black">{module.duration}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-[2rem] border border-white/10 bg-[#fa8a43] p-6 text-black">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
                  <UserRound />
                </div>
                <div>
                  <h2 className="text-2xl font-black">{masterclass.instructor.name}</h2>
                  <p className="text-sm font-bold text-black/65">{masterclass.instructor.role}</p>
                </div>
              </div>
              <p className="mt-5 text-base font-black leading-8">{masterclass.instructor.credibility}</p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white p-6 text-black">
              <h2 className="text-3xl font-black tracking-[-0.05em]">Who this is for</h2>
              <div className="mt-5 grid gap-3">
                {masterclass.audience.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-[#f4f6ff] p-4 text-sm font-black leading-6">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#4562b0]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative overflow-hidden bg-black px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(250,138,67,0.22),transparent_28%)]" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 rounded-[2.4rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur md:grid-cols-[1fr_auto] md:p-8">
          <div>
            <Image src="/logo.png" alt="TSDC Logo" width={132} height={42} className="brightness-0 invert" />
            <p className="mt-5 max-w-2xl text-sm font-semibold leading-7 text-white/62">
              This masterclass page is a private launch room for focused learners. Pull the lever at the top whenever you want to return to the main TSDC website.
            </p>
            <p className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-white/35">
              No common footer. No distractions. Just the session.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3">
            <Link
              href={`/masterclasses/${masterclass.slug}/register`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-black text-black"
            >
              Book Seat
              <ArrowRight size={16} />
            </Link>
            <a
              href="tel:+917358116929"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 px-6 py-3.5 text-sm font-black text-white"
            >
              <Phone size={16} />
              Call TSDC
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
