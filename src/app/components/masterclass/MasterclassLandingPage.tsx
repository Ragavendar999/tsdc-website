'use client'

import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileCheck2,
  GraduationCap,
  Layers,
  Mail,
  MessageCircle,
  PlayCircle,
  Phone,
  Sparkles,
  UserRound,
  Users,
  Video,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  defaultMasterclassPageContent,
  defaultMasterclasses,
  fetchMasterclassPageContent,
  fetchMasterclasses,
  formatPrice,
  getMasterclassBackgroundClass,
  isMasterclassVisibleOnLiveSite,
  type Masterclass,
  type MasterclassPageContent,
} from '@/app/lib/masterclasses'
import { defaultSiteSettings, type SiteSettings } from '@/app/lib/siteSettings'

const whyAttendIcons = [Users, Sparkles, Layers, GraduationCap]

const registrationSteps = [
  { icon: UserRound, title: 'Register', description: 'Fill the registration form and reserve your seat.' },
  { icon: FileCheck2, title: 'Make Payment', description: 'Complete your payment securely to confirm.' },
  { icon: Mail, title: 'Check Email', description: 'You will receive a confirmation email with all details.' },
  { icon: Video, title: 'Join Masterclass', description: 'Join the live session on the scheduled date & time.' },
  { icon: GraduationCap, title: 'Get Certified', description: 'Complete the masterclass and earn your certificate.' },
]

export default function MasterclassLandingPage({ slug }: { slug: string }) {
  const [masterclasses, setMasterclasses] = useState<Masterclass[]>(defaultMasterclasses)
  const [pageContent, setPageContent] = useState<MasterclassPageContent>(defaultMasterclassPageContent)
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings)

  useEffect(() => {
    fetchMasterclasses().then(setMasterclasses)
    fetchMasterclassPageContent().then(setPageContent)
    fetch('/api/content/siteSettings')
      .then((res) => res.json())
      .then((payload: { value?: SiteSettings }) => {
        if (payload.value) setSettings(payload.value)
      })
      .catch(() => {})
  }, [])

  const masterclass = masterclasses.find((item) => item.slug === slug)

  if (!masterclass || !isMasterclassVisibleOnLiveSite(masterclass)) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#6036e9]">Masterclass unavailable</p>
        <h1 className="mt-4 text-3xl font-black tracking-[-0.03em] text-[#0b0e28]">This masterclass is no longer live.</h1>
        <p className="mt-3 text-sm font-medium text-[#58637b]">This session has been unpublished. Browse other sessions below.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/masterclasses" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6036e9] px-6 py-3 text-sm font-black text-white">
            View All Masterclasses <ArrowRight size={16} />
          </Link>
          <Link href="/" className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#dfe2ee] px-6 py-3 text-sm font-black text-[#0b0e28]">
            Back to TSDC
          </Link>
        </div>
      </div>
    )
  }

  const seatsLeft = Math.max(masterclass.seatsTotal - masterclass.seatsTaken, 0)
  const discountPercent =
    masterclass.originalPrice > masterclass.price
      ? Math.round(((masterclass.originalPrice - masterclass.price) / masterclass.originalPrice) * 100)
      : 0
  const outcomes = masterclass.outcomes?.length ? masterclass.outcomes : masterclass.modules.map((m) => ({ title: m.title, description: '' }))
  const photo = masterclass.backgroundImage || masterclass.cardImage

  const masterclassDetails = [
    { label: 'Start Date', value: masterclass.date },
    { label: 'Session Time', value: masterclass.time },
    { label: 'Level', value: masterclass.level || 'All levels' },
    { label: 'Mode', value: masterclass.mode },
    { label: 'Category', value: masterclass.category },
  ]

  return (
    <main className="bg-[#f7f8fc]">
      <section className="relative overflow-hidden bg-[#040824] text-white">
        <div className={`pointer-events-none absolute inset-0 opacity-20 ${getMasterclassBackgroundClass(masterclass.backgroundStyle)}`} />
        <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-8">
          <p className="mb-4 text-xs text-white/50">
            <Link href="/" className="hover:text-white">Home</Link> <span className="mx-1">›</span>
            <Link href="/masterclasses" className="hover:text-white">Masterclass</Link> <span className="mx-1">›</span>
            <span className="text-white/80">{masterclass.title}</span>
          </p>

          <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#6036e9] px-3 py-1 text-[10px] font-black uppercase tracking-wide">
                <span className="h-1.5 w-1.5 rounded-full bg-white" /> Live Masterclass
              </span>
              <h1 className="mt-4 text-3xl font-black leading-tight tracking-[-0.02em] sm:text-4xl">{masterclass.title}</h1>
              <p className="mt-1 text-lg font-bold text-[#8a7bff]">{masterclass.hook}</p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/65">{masterclass.description}</p>

              {photo && (
                <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 lg:hidden">
                  <Image src={photo} alt={masterclass.title} fill className="object-cover" />
                </div>
              )}

              {pageContent.whyAttend.length > 0 && (
                <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {pageContent.whyAttend.slice(0, 4).map((item, index) => {
                    const Icon = whyAttendIcons[index % whyAttendIcons.length]
                    return (
                      <div key={item.title}>
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-[#ffc43d]">
                          <Icon size={16} />
                        </span>
                        <p className="mt-2 text-xs font-bold leading-snug">{item.title}</p>
                      </div>
                    )
                  })}
                </div>
              )}

              <div className="mt-7 flex flex-wrap items-center gap-4 rounded-xl bg-white/5 px-4 py-3.5 text-xs font-semibold text-white/80">
                <span className="flex items-center gap-1.5">
                  <CalendarDays size={14} className="text-[#ffc43d]" /> {masterclass.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock3 size={14} className="text-[#ffc43d]" /> {masterclass.time}
                </span>
                {masterclass.level && (
                  <span className="flex items-center gap-1.5">
                    <GraduationCap size={14} className="text-[#ffc43d]" /> {masterclass.level}
                  </span>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#040824] bg-[#6036e9] text-[10px] font-black text-white">
                        {masterclass.instructor.name.charAt(0)}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-white/60">{masterclass.seatsTaken}+ students already enrolled</span>
                </div>
                <span className="rounded-full bg-[#ffc43d]/15 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-[#ffc43d]">
                  Limited Seats Only
                </span>
              </div>
            </div>

            <div className="lg:sticky lg:top-24">
              {photo && (
                <div className="relative mb-4 hidden aspect-square w-full overflow-hidden rounded-2xl border border-white/10 lg:block">
                  <Image src={photo} alt={masterclass.title} fill className="object-cover" />
                  {masterclass.trailerVideoUrl && (
                    <a
                      href={masterclass.trailerVideoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-2 text-xs font-black text-white backdrop-blur-sm"
                    >
                      <PlayCircle size={16} /> Watch Trailer
                    </a>
                  )}
                </div>
              )}

              <div className="overflow-hidden rounded-2xl border border-[#e7e9f2] bg-white text-[#0b0e28] shadow-[0_4px_18px_rgba(10,10,30,0.3)]">
                <div className="p-5">
                  <h2 className="text-base font-black">Join this Masterclass</h2>
                  <p className="text-xs text-[#58637b]">Reserve your seat now!</p>

                  <div className="mt-4 rounded-xl border border-[#eef0f7] bg-[#f7f8fc] p-4">
                    <p className="text-[11px] font-bold text-[#58637b]">Early Bird Price</p>
                    <div className="mt-1 flex items-center gap-2.5">
                      <span className="text-2xl font-black text-[#6036e9]">{formatPrice(masterclass.price)}</span>
                      {masterclass.originalPrice > masterclass.price && (
                        <span className="text-sm font-semibold text-[#98a2b3] line-through">{formatPrice(masterclass.originalPrice)}</span>
                      )}
                      {discountPercent > 0 && (
                        <span className="rounded-full bg-[#fde8e8] px-2 py-0.5 text-[10px] font-black text-[#e34948]">{discountPercent}% OFF</span>
                      )}
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {masterclass.includes.slice(0, 6).map((item) => (
                      <li key={item.label} className="flex items-center gap-2 text-xs font-semibold text-[#344054]">
                        <CheckCircle2 size={14} className="shrink-0 text-[#1baf7a]" /> {item.label}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/masterclasses/${masterclass.slug}/register`}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#6036e9] px-5 py-3.5 text-sm font-black text-white transition hover:bg-[#5228c9]"
                  >
                    Reserve My Seat <ArrowRight size={15} />
                  </Link>

                  <div className="mt-4 flex items-center justify-between text-xs font-bold text-[#58637b]">
                    <span>Seats Left</span>
                    <span className="text-[#0b0e28]">
                      {seatsLeft} / {masterclass.seatsTotal}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#eef0f7]">
                    <div className="h-full rounded-full bg-[#6036e9]" style={{ width: `${Math.round((masterclass.seatsTaken / masterclass.seatsTotal) * 100)}%` }} />
                  </div>
                </div>

                <div className="border-t border-[#eef0f7] p-5">
                  <p className="text-xs font-black text-[#0b0e28]">Need Help?</p>
                  <p className="mt-1 text-[11px] text-[#58637b]">Talk to our learning advisor</p>
                  <a href={`tel:${settings.general.adminPhone.replace(/\s+/g, '')}`} className="mt-2 flex items-center gap-2 text-xs font-bold text-[#0b0e28]">
                    <Phone size={14} className="text-[#6036e9]" /> {settings.general.adminPhone}
                  </a>
                  <a
                    href={`https://wa.me/${settings.general.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-[#1baf7a] px-4 py-2.5 text-xs font-black text-[#1baf7a]"
                  >
                    <MessageCircle size={14} /> WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <section className="rounded-2xl border border-[#e7e9f2] bg-white p-6 sm:p-7">
            <h2 className="text-lg font-black text-[#0b0e28]">What You Will Learn</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {outcomes.map((item) => (
                <div key={item.title} className="flex items-start gap-3 rounded-xl bg-[#f7f8fc] p-3.5">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f0f1fb] text-[#5a3fff]">
                    <Sparkles size={14} />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-[#0b0e28]">{item.title}</p>
                    {item.description && <p className="text-[11px] text-[#98a2b3]">{item.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#e7e9f2] bg-white p-6 sm:p-7">
            <h2 className="text-lg font-black text-[#0b0e28]">Your Instructor</h2>
            <div className="mt-4 flex items-start gap-4">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#f0f1fb] text-[#5a3fff]">
                <UserRound size={28} />
              </span>
              <div>
                <p className="text-base font-black text-[#0b0e28]">{masterclass.instructor.name}</p>
                <p className="text-xs font-bold text-[#5a3fff]">{masterclass.instructor.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#58637b]">{masterclass.instructor.credibility}</p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <section className="rounded-2xl border border-[#e7e9f2] bg-white p-6 sm:p-7">
            <h2 className="text-lg font-black text-[#0b0e28]">Masterclass Curriculum</h2>
            <div className="mt-4 divide-y divide-[#eef0f7]">
              {masterclass.modules.map((module, index) => (
                <div key={module.title} className="flex items-center justify-between gap-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#f0f1fb] text-[10px] font-black text-[#5a3fff]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="text-sm font-bold text-[#0b0e28]">{module.title}</p>
                  </div>
                  <span className="shrink-0 text-xs font-semibold text-[#98a2b3]">{module.duration}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="space-y-6">
            <section className="rounded-2xl border border-[#e7e9f2] bg-white p-6 sm:p-7">
              <h2 className="text-base font-black text-[#0b0e28]">Masterclass Details</h2>
              <div className="mt-4 space-y-2.5">
                {masterclassDetails.map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between border-b border-[#eef0f7] pb-2.5 text-xs last:border-0">
                    <span className="font-semibold text-[#58637b]">{label}</span>
                    <span className="font-bold text-[#0b0e28]">{value}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-[#e7e9f2] bg-white p-6 sm:p-7">
              <h2 className="text-base font-black text-[#0b0e28]">Who Should Attend?</h2>
              <div className="mt-3 space-y-2.5">
                {masterclass.audience.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-xs font-semibold text-[#344054]">
                    <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[#1baf7a]" /> {item}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <section className="mt-6 rounded-2xl border border-[#e7e9f2] bg-white p-6 sm:p-8">
          <h2 className="mb-6 text-center text-lg font-black text-[#0b0e28]">Simple Steps to Get Started</h2>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {registrationSteps.map((step) => {
              const Icon = step.icon
              return (
                <div key={step.title} className="text-center">
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0f1fb] text-[#5a3fff]">
                    <Icon size={18} />
                  </span>
                  <p className="mt-2.5 text-sm font-black text-[#0b0e28]">{step.title}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#58637b]">{step.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section className="mt-6 rounded-2xl bg-[#0b0e28] p-6 text-white sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Limited seats</p>
          <h2 className="mt-3 text-2xl font-black">Ready to Master {masterclass.category}?</h2>
          <p className="mt-2 max-w-xl text-sm text-white/60">{seatsLeft} seats remaining. Secure yours before the batch fills up.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/masterclasses/${masterclass.slug}/register`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ffc43d] px-6 py-3.5 text-sm font-black text-[#08102f]"
            >
              Reserve My Seat Now <ArrowRight size={15} />
            </Link>
            <a
              href={`https://wa.me/${settings.general.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-black text-white"
            >
              <Mail size={14} /> Talk to Advisor
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
