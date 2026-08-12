'use client'

import {
  ArrowRight,
  CalendarDays,
  Clock3,
  GraduationCap,
  Mail,
  MessageCircle,
  Phone,
  Search,
  Sparkles,
  Users,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useContactPopup } from '@/app/components/common/ContactPopupProvider'
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

type Props = { compact?: boolean; title?: string; subtitle?: string }

const ALL = 'all'

function MasterclassCard({ item }: { item: Masterclass }) {
  const seatsLeft = Math.max(item.seatsTotal - item.seatsTaken, 0)
  const photo = item.cardImage || item.backgroundImage

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-[#e7e9f2] bg-white p-3 shadow-[0_1px_3px_rgba(10,10,30,0.06)] sm:flex-row">
      <div className={`relative h-44 w-full shrink-0 overflow-hidden rounded-xl sm:h-auto sm:w-48 ${photo ? '' : getMasterclassBackgroundClass(item.backgroundStyle)}`}>
        {photo ? (
          <Image src={photo} alt={item.title} fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Sparkles size={28} className="text-white/70" />
          </div>
        )}
        <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-[#e34948] px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-white" /> Live
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-black text-[#0b0e28]">{item.title}</h3>
            {item.level && (
              <span className="rounded-full bg-[#f0f1fb] px-2.5 py-0.5 text-[11px] font-bold text-[#5a3fff]">{item.level}</span>
            )}
          </div>
          <p className="mt-1 text-sm text-[#58637b]">{item.hook}</p>

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs font-semibold text-[#58637b]">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={14} className="text-[#5a3fff]" /> {item.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 size={14} className="text-[#5a3fff]" /> {item.time}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <GraduationCap size={14} className="text-[#5a3fff]" /> {item.instructor.name} · {item.instructor.role}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#eef0f7] pt-3">
          <div className="text-xs font-bold text-[#58637b]">
            Seats left <span className="text-[#0b0e28]">{seatsLeft} / {item.seatsTotal}</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href={`/masterclasses/${item.slug}`} className="text-xs font-bold text-[#5a3fff] hover:underline">
              View details
            </Link>
            <Link
              href={`/masterclasses/${item.slug}/register`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#6036e9] px-4 py-2.5 text-xs font-black text-white transition hover:bg-[#5228c9]"
            >
              Join Now <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function MasterclassSection({ compact = false, title, subtitle }: Props) {
  const [items, setItems] = useState<Masterclass[]>(defaultMasterclasses)
  const [pageContent, setPageContent] = useState<MasterclassPageContent>(defaultMasterclassPageContent)
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings)
  const [loaded, setLoaded] = useState(false)
  const { openPopup } = useContactPopup()

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(ALL)
  const [level, setLevel] = useState(ALL)
  const [type, setType] = useState(ALL)
  const [statusTab, setStatusTab] = useState<'upcoming' | 'past'>('upcoming')

  useEffect(() => {
    fetchMasterclasses()
      .then(setItems)
      .finally(() => setLoaded(true))
    fetchMasterclassPageContent().then(setPageContent)
    fetch('/api/content/siteSettings')
      .then((res) => res.json())
      .then((payload: { value?: SiteSettings }) => {
        if (payload.value) setSettings(payload.value)
      })
      .catch(() => {})
  }, [])

  const live = items.filter((item) => isMasterclassVisibleOnLiveSite(item))
  const upcoming = useMemo(
    () => [...live].sort((a, b) => (a.eventDate || '').localeCompare(b.eventDate || '')),
    [live]
  )
  const past = items.filter((item) => !isMasterclassVisibleOnLiveSite(item))

  const categories = useMemo(() => {
    const counts = new Map<string, number>()
    live.forEach((item) => counts.set(item.category, (counts.get(item.category) || 0) + 1))
    return Array.from(counts.entries())
  }, [live])

  const levels = useMemo(() => Array.from(new Set(live.map((item) => item.level).filter(Boolean))) as string[], [live])
  const types = useMemo(() => Array.from(new Set(live.map((item) => item.mode).filter(Boolean))), [live])

  const base = statusTab === 'upcoming' ? upcoming : past
  const filtered = base.filter((item) => {
    const q = search.trim().toLowerCase()
    const matchesSearch = !q || item.title.toLowerCase().includes(q) || item.hook.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
    const matchesCategory = category === ALL || item.category === category
    const matchesLevel = level === ALL || item.level === level
    const matchesType = type === ALL || item.mode === type
    return matchesSearch && matchesCategory && matchesLevel && matchesType
  })

  const resetFilters = () => {
    setSearch('')
    setCategory(ALL)
    setLevel(ALL)
    setType(ALL)
  }

  const suggestMasterclass = () =>
    openPopup({
      title: "Can't find what you're looking for?",
      subtitle: 'Tell us what you want to learn and we will bring the right expert-led masterclass for it.',
      interest: 'Masterclass Suggestion',
      source: 'masterclasses-suggest',
      ctaLabel: 'Suggest a Masterclass',
    })

  if (compact) {
    if (!loaded || live.length === 0) return null
    return (
      <section className="bg-white px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <header className="mb-8 text-center">
            <p className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.18em] text-[#5a3fff]">
              <Sparkles size={13} /> Live learning sessions
            </p>
            <h2 className="mx-auto mt-2 max-w-2xl text-3xl font-black tracking-[-0.03em] text-[#0b0e28]">
              {title || 'Experience TSDC before you choose a full program.'}
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-[#58637b]">
              {subtitle || 'Focused masterclasses and bootcamps with live demonstrations, practical learning and direct guidance.'}
            </p>
          </header>
          <div className="grid gap-4 md:grid-cols-2">
            {upcoming.map((item) => (
              <MasterclassCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="relative overflow-hidden bg-[#030a24] text-white">
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#8a7bff]">Masterclasses</p>
            <h1 className="text-4xl font-black leading-[1.08] tracking-[-0.03em] sm:text-5xl">
              Learn from Experts.
              <br />
              Stay <span className="text-[#ffc43d]">Ahead.</span>
            </h1>
            <p className="mt-4 max-w-md text-sm font-medium leading-6 text-white/70">
              Join our live masterclasses conducted by industry experts. Gain practical insights, real-world
              strategies, and career clarity.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {pageContent.heroStats
                .filter((stat) => stat.value.trim())
                .map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-black text-[#ffc43d]">{stat.value}</p>
                    <p className="mt-0.5 text-[11px] font-semibold text-white/60">{stat.label}</p>
                  </div>
                ))}
            </div>
          </div>

          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)] lg:block">
            <Image src="/TSDC Classroom.png" alt="TSDC masterclass session" fill className="object-cover" />
          </div>
        </div>

        <div className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2.5 lg:flex">
          <a
            href={`https://wa.me/${settings.general.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp TSDC"
            className="flex flex-col items-center gap-1 rounded-xl bg-[#25d366] px-3 py-2.5 text-white shadow-lg transition hover:-translate-y-0.5"
          >
            <MessageCircle size={17} />
            <span className="text-[9px] font-bold">WhatsApp</span>
          </a>
          <a
            href={`tel:${settings.general.adminPhone.replace(/\s+/g, '')}`}
            aria-label="Call TSDC"
            className="flex flex-col items-center gap-1 rounded-xl bg-[#5a3fff] px-3 py-2.5 text-white shadow-lg transition hover:-translate-y-0.5"
          >
            <Phone size={17} />
            <span className="text-[9px] font-bold">Call Us</span>
          </a>
          <button
            onClick={suggestMasterclass}
            aria-label="Enquire"
            className="flex flex-col items-center gap-1 rounded-xl bg-[#e34948] px-3 py-2.5 text-white shadow-lg transition hover:-translate-y-0.5"
          >
            <Mail size={17} />
            <span className="text-[9px] font-bold">Enquire</span>
          </button>
        </div>
      </section>

      <section className="bg-[#f7f8fc] px-4 py-12 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-black tracking-[-0.02em] text-[#0b0e28]">All Masterclasses</h2>
                <p className="text-sm text-[#58637b]">Practical knowledge. Expert guidance. Real-world impact.</p>
              </div>
              <div className="relative w-full max-w-xs">
                <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#98a2b3]" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search masterclasses..."
                  className="w-full rounded-xl border border-[#dfe2ee] bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-[#6036e9]"
                />
              </div>
            </div>

            <div className="mb-5 flex flex-wrap items-center gap-2.5">
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-lg border border-[#dfe2ee] bg-white px-3 py-2 text-xs font-semibold text-[#344054] outline-none">
                <option value={ALL}>All Categories</option>
                {categories.map(([name]) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <select value={level} onChange={(e) => setLevel(e.target.value)} className="rounded-lg border border-[#dfe2ee] bg-white px-3 py-2 text-xs font-semibold text-[#344054] outline-none">
                <option value={ALL}>All Levels</option>
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
              <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-lg border border-[#dfe2ee] bg-white px-3 py-2 text-xs font-semibold text-[#344054] outline-none">
                <option value={ALL}>All Types</option>
                {types.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
              {(search || category !== ALL || level !== ALL || type !== ALL) && (
                <button onClick={resetFilters} className="rounded-lg border border-[#dfe2ee] bg-white px-3 py-2 text-xs font-semibold text-[#58637b] hover:text-[#e34948]">
                  Reset
                </button>
              )}
            </div>

            <div className="mb-5 inline-flex rounded-xl border border-[#dfe2ee] bg-white p-1">
              <button
                onClick={() => setStatusTab('upcoming')}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
                  statusTab === 'upcoming' ? 'bg-[#6036e9] text-white' : 'text-[#58637b]'
                }`}
              >
                Upcoming ({upcoming.length})
              </button>
              <button
                onClick={() => setStatusTab('past')}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
                  statusTab === 'past' ? 'bg-[#6036e9] text-white' : 'text-[#58637b]'
                }`}
              >
                Past ({past.length})
              </button>
            </div>

            {!loaded ? (
              <p className="text-sm font-semibold text-[#98a2b3]">Loading masterclasses...</p>
            ) : filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#dfe2ee] bg-white p-10 text-center">
                <p className="text-sm font-semibold text-[#58637b]">
                  {base.length === 0 ? `No ${statusTab} masterclasses right now.` : 'No masterclasses match your filters.'}
                </p>
                {base.length > 0 && (
                  <button onClick={resetFilters} className="mt-3 text-xs font-bold text-[#6036e9] hover:underline">
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((item) => (
                  <MasterclassCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>

          <aside className="space-y-5">
            {pageContent.whyAttend.length > 0 && (
              <div className="rounded-2xl border border-[#e7e9f2] bg-white p-5">
                <h3 className="mb-3 text-sm font-black text-[#0b0e28]">Why Attend Masterclasses?</h3>
                <ul className="space-y-3.5">
                  {pageContent.whyAttend.map((item) => (
                    <li key={item.title} className="flex gap-2.5">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#f0f1fb] text-[#5a3fff]">
                        <Sparkles size={13} />
                      </span>
                      <div>
                        <p className="text-xs font-bold text-[#0b0e28]">{item.title}</p>
                        <p className="mt-0.5 text-[11px] leading-relaxed text-[#58637b]">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {upcoming.length > 0 && (
              <div className="rounded-2xl border border-[#e7e9f2] bg-white p-5">
                <h3 className="mb-3 text-sm font-black text-[#0b0e28]">Upcoming Masterclasses</h3>
                <ul className="space-y-3">
                  {upcoming.slice(0, 4).map((item) => (
                    <li key={item.id} className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg bg-[#f0f1fb] text-[#5a3fff]">
                        <CalendarDays size={16} />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-[#0b0e28]">{item.title}</p>
                        <p className="text-[11px] text-[#58637b]">
                          {item.instructor.name} · {item.date}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link href="#" onClick={(e) => e.preventDefault()} className="mt-4 block text-center text-xs font-bold text-[#6036e9] opacity-60">
                  View Calendar
                </Link>
              </div>
            )}

            {categories.length > 0 && (
              <div className="rounded-2xl border border-[#e7e9f2] bg-white p-5">
                <h3 className="mb-3 text-sm font-black text-[#0b0e28]">Categories</h3>
                <ul className="space-y-2">
                  {categories.map(([name, count]) => (
                    <li key={name} className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#344054]">{name}</span>
                      <span className="rounded-full bg-[#f0f1fb] px-2 py-0.5 font-bold text-[#5a3fff]">{count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {pageContent.testimonials.length > 0 && (
              <div className="rounded-2xl border border-[#e7e9f2] bg-white p-5">
                <h3 className="mb-3 text-sm font-black text-[#0b0e28]">What Students Say</h3>
                <div className="space-y-4">
                  {pageContent.testimonials.map((testimonial) => (
                    <div key={testimonial.name} className="border-t border-[#eef0f7] pt-3.5 first:border-0 first:pt-0">
                      <p className="text-xs italic leading-relaxed text-[#344054]">&ldquo;{testimonial.quote}&rdquo;</p>
                      <p className="mt-2 text-xs font-bold text-[#0b0e28]">{testimonial.name}</p>
                      <p className="text-[11px] text-[#58637b]">{testimonial.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 rounded-2xl bg-[#0b0e28] p-8 text-center text-white sm:flex-row sm:text-left">
          <div>
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 sm:mx-0">
              <Users size={20} className="text-[#ffc43d]" />
            </div>
            <h2 className="text-xl font-black">Can&apos;t Find What You&apos;re Looking For?</h2>
            <p className="mt-1.5 max-w-md text-sm text-white/70">
              Suggest the topic you want to learn and we&apos;ll bring the right expert for you!
            </p>
          </div>
          <button
            onClick={suggestMasterclass}
            className="shrink-0 rounded-xl bg-[#ffc43d] px-6 py-3 text-sm font-black text-[#08102f] transition hover:-translate-y-0.5"
          >
            Suggest a Masterclass
          </button>
        </div>
      </section>
    </>
  )
}
