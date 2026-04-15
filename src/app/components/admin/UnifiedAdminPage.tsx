'use client'

import {
  ArrowDown, ArrowRight, ArrowUp, BarChart3, Bell, BookOpen,
  CheckCircle2, ChevronDown, ChevronRight, CreditCard, Eye,
  Globe2, LayoutDashboard, LogOut, Mail, MonitorPlay,
  Paintbrush, Plus, RefreshCcw, Save, Settings, Trash2, X,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import BlogAdminPage from '@/app/components/blog/BlogAdminPage'
import MasterclassAdminPage from '@/app/components/masterclass/MasterclassAdminPage'
import { fetchMasterclasses, type Masterclass } from '@/app/lib/masterclasses'
import {
  defaultSiteContent, homepageSectionCatalog, loadSiteContent,
  persistSiteContent, type BatchEntry, type SiteContent, type SiteSectionConfig,
} from '@/app/lib/siteContent'
import {
  defaultCourseContent, loadCourseContent, persistCourseContent,
  type AllCourseContent, type CourseData,
} from '@/app/lib/courseContent'
import {
  defaultSiteSettings, loadSiteSettings, persistSiteSettings,
  type SiteSettings,
} from '@/app/lib/siteSettings'

/* ─── Types ──────────────────────────────────────────────── */
type AdminTab = 'overview' | 'site-content' | 'masterclasses' | 'blog' | 'courses' | 'settings'

const tabs: { id: AdminTab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview',      label: 'Overview',      icon: LayoutDashboard },
  { id: 'site-content',  label: 'Site Content',  icon: Globe2 },
  { id: 'masterclasses', label: 'Masterclasses', icon: MonitorPlay },
  { id: 'blog',          label: 'Blog',          icon: MonitorPlay },
  { id: 'courses',       label: 'Courses',       icon: BookOpen },
  { id: 'settings',      label: 'Settings',      icon: Settings },
]

/* ─── Small reusable atoms ───────────────────────────────── */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#667085]">{label}</p>
      {children}
    </div>
  )
}

const inputCls = 'w-full rounded-[0.85rem] border-[2.5px] border-[#10163a] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#10163a] outline-none transition focus:border-[#3244b5]'
const textareaCls = `${inputCls} resize-none`

function Toggle({ on, onToggle, label }: { on: boolean; onToggle: () => void; label: string }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-[1rem] bg-white px-4 py-3" style={{ border: '1.5px solid rgba(16,22,58,0.12)' }}>
      <span className="text-sm font-bold text-[#10163a]">{label}</span>
      <div
        onClick={onToggle}
        className={`relative h-6 w-11 rounded-full border-2 border-[#10163a] transition-colors ${on ? 'bg-[#16a34a]' : 'bg-[#e5e7eb]'}`}
      >
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </div>
    </label>
  )
}

function SectionCard({ title, accent, children }: { title: string; accent?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[1.8rem] bg-white" style={{ border: '1.5px solid rgba(16,22,58,0.1)', boxShadow: '0 2px 16px rgba(16,22,58,0.06)' }}>
      <div className="rounded-t-[1.6rem] px-6 py-4" style={{ backgroundColor: accent ?? '#eef3ff', borderBottom: '1.5px solid rgba(16,22,58,0.08)' }}>
        <p className="text-sm font-black text-[#10163a]">{title}</p>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

function SavedBadge({ time }: { time: string }) {
  if (!time) return null
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#16a34a] bg-[#f0fdf4] px-3 py-1 text-[11px] font-black text-[#16a34a]">
      <CheckCircle2 size={11} /> Saved at {time}
    </span>
  )
}

/* ─── Main component ─────────────────────────────────────── */
export default function UnifiedAdminPage({
  userEmail,
  initialTab = 'overview',
}: {
  userEmail: string
  initialTab?: AdminTab
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [activeTab, setActiveTab]         = useState<AdminTab>(initialTab)
  const [siteContent, setSiteContent]     = useState<SiteContent>(defaultSiteContent)
  const [courseContent, setCourseContent] = useState<AllCourseContent>(defaultCourseContent)
  const [settings, setSettings]           = useState<SiteSettings>(defaultSiteSettings)
  const [masterclasses, setMasterclasses] = useState<Masterclass[]>([])
  const [lastSavedAt, setLastSavedAt]     = useState('')
  const [activeCourse, setActiveCourse]   = useState<keyof AllCourseContent>('graphic-design')

  useEffect(() => {
    setSiteContent(loadSiteContent())
    setCourseContent(loadCourseContent())
    setSettings(loadSiteSettings())
    fetchMasterclasses().then(setMasterclasses)
  }, [])

  useEffect(() => { setActiveTab(initialTab) }, [initialTab])

  /* ─── Navigation ─────────────────────────────────────────── */
  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab)
    const p = new URLSearchParams(searchParams.toString())
    p.set('tab', tab)
    router.replace(`${pathname}?${p.toString()}`, { scroll: false })
  }

  const stamp = () =>
    setLastSavedAt(new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' }))

  /* ─── Site content helpers ───────────────────────────────── */
  const saveSiteContent = (next: SiteContent) => { setSiteContent(next); persistSiteContent(next); stamp() }
  const updateSiteContent = <K extends keyof SiteContent>(section: K, patch: Partial<SiteContent[K]>) => {
    const current = siteContent[section]
    saveSiteContent({ ...siteContent, [section]: Array.isArray(current) ? patch : { ...current, ...patch } } as SiteContent)
  }

  const homepageSections = siteContent.homepage.sections
  const missingHomepageSections = homepageSectionCatalog.filter(
    (c) => !homepageSections.some((s) => s.id === c.id)
  )

  const replaceHomepageSections = (sections: SiteSectionConfig[]) =>
    saveSiteContent({ ...siteContent, homepage: { ...siteContent.homepage, sections } })

  const moveSection = (id: string, dir: -1 | 1) => {
    const idx = homepageSections.findIndex((s) => s.id === id)
    const next = [...homepageSections]
    const [item] = next.splice(idx, 1)
    next.splice(idx + dir, 0, item)
    replaceHomepageSections(next)
  }

  /* ─── Course content helpers ─────────────────────────────── */
  const saveCourseContent = (next: AllCourseContent) => { setCourseContent(next); persistCourseContent(next); stamp() }
  const updateCourse = (id: keyof AllCourseContent, patch: Partial<CourseData>) =>
    saveCourseContent({ ...courseContent, [id]: { ...courseContent[id], ...patch } })

  /* ─── Settings helpers ───────────────────────────────────── */
  const saveSettings = (next: SiteSettings) => { setSettings(next); persistSiteSettings(next); stamp() }
  const updateSettings = <K extends keyof SiteSettings>(section: K, patch: Partial<SiteSettings[K]>) =>
    saveSettings({ ...settings, [section]: { ...settings[section], ...patch } } as SiteSettings)

  /* ─── Sign out ───────────────────────────────────────────── */
  const handleSignOut = async () => {
    await fetch('/api/admin/session-logout', { method: 'POST' })
    router.push('/admin/login')
  }

  /* ─── Overview stats ─────────────────────────────────────── */
  const overviewStats = useMemo(() => [
    { label: 'Live masterclasses',      value: String(masterclasses.filter((m) => m.status === 'live').length),  accent: '#16a34a', note: `${masterclasses.length} total` },
    { label: 'Draft masterclasses',     value: String(masterclasses.filter((m) => m.status === 'draft').length), accent: '#fa8a43', note: 'Not visible to public' },
    { label: 'Homepage sections',       value: String(homepageSections.filter((s) => s.enabled).length),         accent: '#3244b5', note: `${homepageSections.length} configured` },
    { label: 'Mail triggers active',    value: String(Object.values(settings.email.triggers).filter(Boolean).length), accent: '#db4b87', note: 'of 5 triggers' },
  ], [masterclasses, homepageSections, settings])

  const quickLinks = [
    { label: 'Homepage',         href: '/',                    note: 'Public' },
    { label: 'Courses',          href: '/courses',             note: 'Public' },
    { label: 'Masterclasses',    href: '/masterclasses',       note: 'Public' },
    { label: 'Blog',             href: '/blog',                note: 'Public' },
    { label: 'Contact',          href: '/contact',             note: 'Public' },
    { label: 'About',            href: '/about',               note: 'Public' },
    { label: 'Graphic Design',   href: '/courses/graphic-design',   note: 'Course' },
    { label: 'UI/UX Design',     href: '/courses/uiux-design',      note: 'Course' },
    { label: 'Digital Marketing',href: '/courses/digital-marketing', note: 'Course' },
    { label: 'Video Editing',    href: '/courses/video-editing',    note: 'Course' },
  ]

  /* ════════════════════════════════════════════════════════════
     RENDER
  ════════════════════════════════════════════════════════════ */
  return (
    <main className="min-h-screen bg-[#eef2ff] px-3 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-7xl space-y-5">

        {/* ── Header ── */}
        <section className="overflow-hidden rounded-[2rem] border-[3px] border-[#10163a] bg-[#0e1330] text-white shadow-[8px_8px_0_#10163a]">
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-5">
            <div className="flex items-center gap-4">
              <div className="overflow-hidden rounded-[0.9rem] border-2 border-white/20 bg-white px-3 py-2">
                <Image src="/logo.png" alt="TSDC" width={80} height={28} />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.28em] text-[#ffcb53]">Unified Admin Panel</p>
                <p className="text-sm font-black text-white">TSDC Website Control Centre</p>
                <p className="text-[11px] text-white/50">{userEmail}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <SavedBadge time={lastSavedAt} />
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-1.5 rounded-[0.8rem] border-2 border-white/20 bg-white/10 px-3 py-2 text-xs font-black text-white hover:bg-white/20"
              >
                <Eye size={13} /> View Site
              </Link>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 rounded-[0.8rem] border-2 border-white/20 bg-white/10 px-3 py-2 text-xs font-black text-white hover:bg-red-500/30"
              >
                <LogOut size={13} /> Sign out
              </button>
            </div>
          </div>

          {/* Tab bar */}
          <div className="flex gap-0 overflow-x-auto border-t-[3px] border-white/10 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex shrink-0 items-center gap-2 border-b-[3px] px-4 py-3.5 text-xs font-black transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#ffcb53] text-white'
                      : 'border-transparent text-white/45 hover:text-white/70'
                  }`}
                >
                  <Icon size={13} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            TAB: OVERVIEW
        ══════════════════════════════════════════════ */}
        {activeTab === 'overview' && (
          <div className="space-y-5">
            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {overviewStats.map((s) => (
                <div key={s.label} className="rounded-[1.5rem] bg-white p-5" style={{ border: `2px solid ${s.accent}30`, boxShadow: `0 2px 12px ${s.accent}18` }}>
                  <p className="text-3xl font-black" style={{ color: s.accent }}>{s.value}</p>
                  <p className="mt-1 text-sm font-black text-[#10163a]">{s.label}</p>
                  <p className="mt-0.5 text-[11px] text-[#667085]">{s.note}</p>
                </div>
              ))}
            </div>

            {/* Quick links */}
            <SectionCard title="Quick page preview links" accent="#fff1dd">
              <div className="grid gap-2 sm:grid-cols-3">
                {quickLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    className="flex items-center justify-between rounded-[1rem] border-[2.5px] border-[#10163a] px-4 py-3 text-sm font-bold text-[#10163a] shadow-[3px_3px_0_#10163a] transition hover:-translate-y-0.5 hover:bg-[#eef1ff]"
                  >
                    <span>{l.label}</span>
                    <span className="flex items-center gap-1 text-[11px] text-[#667085]">
                      <span className="rounded-full bg-[#eef1ff] px-1.5 py-0.5 text-[#3244b5]">{l.note}</span>
                      <ArrowRight size={12} />
                    </span>
                  </Link>
                ))}
              </div>
            </SectionCard>

            {/* Tab shortcuts */}
            <SectionCard title="Jump to section" accent="#eef1ff">
              <div className="flex flex-wrap gap-3">
                {tabs.filter((t) => t.id !== 'overview').map((t) => {
                  const Icon = t.icon
                  return (
                    <button
                      key={t.id}
                      onClick={() => handleTabChange(t.id)}
                      className="inline-flex items-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#0e1330] px-5 py-2.5 text-sm font-black text-white shadow-[4px_4px_0_#10163a] transition hover:-translate-y-0.5"
                    >
                      <Icon size={14} />
                      {t.label}
                    </button>
                  )
                })}
              </div>
            </SectionCard>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            TAB: SITE CONTENT
        ══════════════════════════════════════════════ */}
        {activeTab === 'site-content' && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-black text-[#10163a]">Site Content Editor</h2>
              <button
                onClick={() => { if (confirm('Reset to default content?')) saveSiteContent(defaultSiteContent) }}
                className="inline-flex items-center gap-2 rounded-[1rem] border-[2.5px] border-[#10163a] bg-white px-4 py-2 text-xs font-black text-[#10163a] shadow-[3px_3px_0_#10163a] hover:-translate-y-0.5"
              >
                <RefreshCcw size={13} /> Reset defaults
              </button>
            </div>

            {/* Homepage section order */}
            <SectionCard title="Homepage section order & visibility">
              <div className="space-y-2">
                {homepageSections.map((section, idx) => (
                  <div key={section.id} className="flex items-center gap-3 rounded-[1rem] border-[2.5px] border-[#10163a] bg-[#fffdf7] px-4 py-3 shadow-[3px_3px_0_#10163a]">
                    <span className="w-5 text-center text-xs font-black text-[#667085]">{idx + 1}</span>
                    <span className="flex-1 text-sm font-black text-[#10163a]">{section.label}</span>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-[#667085]">
                      <input type="checkbox" checked={section.enabled} onChange={(e) => replaceHomepageSections(homepageSections.map((s) => s.id === section.id ? { ...s, enabled: e.target.checked } : s))} className="accent-[#3244b5]" />
                      Visible
                    </label>
                    <button onClick={() => moveSection(section.id, -1)} disabled={idx === 0} className="rounded-lg border-2 border-[#10163a] p-1 disabled:opacity-30"><ArrowUp size={13} /></button>
                    <button onClick={() => moveSection(section.id, 1)} disabled={idx === homepageSections.length - 1} className="rounded-lg border-2 border-[#10163a] p-1 disabled:opacity-30"><ArrowDown size={13} /></button>
                    <button onClick={() => replaceHomepageSections(homepageSections.filter((s) => s.id !== section.id))} className="rounded-lg border-2 border-[#b42318] p-1 text-[#b42318]"><Trash2 size={13} /></button>
                  </div>
                ))}
                {missingHomepageSections.map((s) => (
                  <button key={s.id} onClick={() => replaceHomepageSections([...homepageSections, s])} className="flex w-full items-center gap-2 rounded-[1rem] border-[2.5px] border-dashed border-[#10163a]/30 px-4 py-3 text-sm font-bold text-[#667085] hover:border-[#10163a]">
                    <Plus size={14} /> Add "{s.label}"
                  </button>
                ))}
              </div>
            </SectionCard>

            {/* Hero */}
            <SectionCard title="Hero section" accent="#fff1dd">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Badge text"><input className={inputCls} value={siteContent.hero.badge} onChange={(e) => updateSiteContent('hero', { badge: e.target.value })} /></Field>
                <Field label="Primary CTA label"><input className={inputCls} value={siteContent.hero.primaryCta} onChange={(e) => updateSiteContent('hero', { primaryCta: e.target.value })} /></Field>
                <Field label="Title"><input className={inputCls} value={siteContent.hero.title} onChange={(e) => updateSiteContent('hero', { title: e.target.value })} /></Field>
                <Field label="Highlight word"><input className={inputCls} value={siteContent.hero.highlight} onChange={(e) => updateSiteContent('hero', { highlight: e.target.value })} /></Field>
                <Field label="Description"><textarea rows={3} className={textareaCls} value={siteContent.hero.description} onChange={(e) => updateSiteContent('hero', { description: e.target.value })} /></Field>
                <Field label="Secondary CTA label"><input className={inputCls} value={siteContent.hero.secondaryCta} onChange={(e) => updateSiteContent('hero', { secondaryCta: e.target.value })} /></Field>
                <Field label="Checklist (one per line)">
                  <textarea rows={4} className={textareaCls} value={siteContent.hero.checklist.join('\n')} onChange={(e) => updateSiteContent('hero', { checklist: e.target.value.split('\n') })} />
                </Field>
                <Field label="Stats (JSON)">
                  <textarea rows={4} className={`${textareaCls} font-mono text-xs`} defaultValue={JSON.stringify(siteContent.hero.stats, null, 2)} onBlur={(e) => { try { updateSiteContent('hero', { stats: JSON.parse(e.target.value) }) } catch { alert('Invalid JSON') } }} />
                </Field>
              </div>
            </SectionCard>

            {/* Why TSDC */}
            <SectionCard title="Why TSDC section" accent="#f0fdf4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Badge"><input className={inputCls} value={siteContent.whyTsdc.badge} onChange={(e) => updateSiteContent('whyTsdc', { badge: e.target.value })} /></Field>
                <Field label="Title"><input className={inputCls} value={siteContent.whyTsdc.title} onChange={(e) => updateSiteContent('whyTsdc', { title: e.target.value })} /></Field>
                <Field label="Highlight"><input className={inputCls} value={siteContent.whyTsdc.highlight} onChange={(e) => updateSiteContent('whyTsdc', { highlight: e.target.value })} /></Field>
                <Field label="Description"><textarea rows={3} className={textareaCls} value={siteContent.whyTsdc.description} onChange={(e) => updateSiteContent('whyTsdc', { description: e.target.value })} /></Field>
                <Field label="Outcomes title"><input className={inputCls} value={siteContent.whyTsdc.outcomesTitle} onChange={(e) => updateSiteContent('whyTsdc', { outcomesTitle: e.target.value })} /></Field>
                <Field label="Outcomes (one per line)">
                  <textarea rows={4} className={textareaCls} value={siteContent.whyTsdc.outcomes.join('\n')} onChange={(e) => updateSiteContent('whyTsdc', { outcomes: e.target.value.split('\n') })} />
                </Field>
              </div>
            </SectionCard>

            {/* Footer */}
            <SectionCard title="Footer" accent="#fff1f6">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Description"><textarea rows={3} className={textareaCls} value={siteContent.footer.description} onChange={(e) => updateSiteContent('footer', { description: e.target.value })} /></Field>
                <Field label="Pill text"><input className={inputCls} value={siteContent.footer.pillText} onChange={(e) => updateSiteContent('footer', { pillText: e.target.value })} /></Field>
                <Field label="Contact email"><input className={inputCls} value={siteContent.footer.contactEmail} onChange={(e) => updateSiteContent('footer', { contactEmail: e.target.value })} /></Field>
                <Field label="Contact phone"><input className={inputCls} value={siteContent.footer.contactPhone} onChange={(e) => updateSiteContent('footer', { contactPhone: e.target.value })} /></Field>
                <Field label="Hours"><input className={inputCls} value={siteContent.footer.contactHours} onChange={(e) => updateSiteContent('footer', { contactHours: e.target.value })} /></Field>
                <Field label="Copyright line"><input className={inputCls} value={siteContent.footer.copyrightLine} onChange={(e) => updateSiteContent('footer', { copyrightLine: e.target.value })} /></Field>
                <Field label="Address (one line per row)">
                  <textarea rows={3} className={textareaCls} value={siteContent.footer.addressLines.join('\n')} onChange={(e) => updateSiteContent('footer', { addressLines: e.target.value.split('\n') })} />
                </Field>
              </div>
            </SectionCard>

            {/* Contact */}
            <SectionCard title="Contact page" accent="#eef1ff">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Badge"><input className={inputCls} value={siteContent.contact.badge} onChange={(e) => updateSiteContent('contact', { badge: e.target.value })} /></Field>
                <Field label="Title"><input className={inputCls} value={siteContent.contact.title} onChange={(e) => updateSiteContent('contact', { title: e.target.value })} /></Field>
                <Field label="Highlight"><input className={inputCls} value={siteContent.contact.highlight} onChange={(e) => updateSiteContent('contact', { highlight: e.target.value })} /></Field>
                <Field label="Description"><textarea rows={3} className={textareaCls} value={siteContent.contact.description} onChange={(e) => updateSiteContent('contact', { description: e.target.value })} /></Field>
                <Field label="Support title"><input className={inputCls} value={siteContent.contact.supportTitle} onChange={(e) => updateSiteContent('contact', { supportTitle: e.target.value })} /></Field>
                <Field label="Support description"><textarea rows={3} className={textareaCls} value={siteContent.contact.supportDescription} onChange={(e) => updateSiteContent('contact', { supportDescription: e.target.value })} /></Field>
                <Field label="Map phone"><input className={inputCls} value={siteContent.contact.mapPhone} onChange={(e) => updateSiteContent('contact', { mapPhone: e.target.value })} /></Field>
                <Field label="Map title"><input className={inputCls} value={siteContent.contact.mapTitle} onChange={(e) => updateSiteContent('contact', { mapTitle: e.target.value })} /></Field>
              </div>
            </SectionCard>

            {/* Batch Schedule */}
            <SectionCard title="Batch Schedule section" accent="#fff1dd">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Badge"><input className={inputCls} value={siteContent.batchSchedule.badge} onChange={(e) => updateSiteContent('batchSchedule', { badge: e.target.value })} /></Field>
                <Field label="Title"><input className={inputCls} value={siteContent.batchSchedule.title} onChange={(e) => updateSiteContent('batchSchedule', { title: e.target.value })} /></Field>
                <Field label="Highlight"><input className={inputCls} value={siteContent.batchSchedule.highlight} onChange={(e) => updateSiteContent('batchSchedule', { highlight: e.target.value })} /></Field>
                <Field label="Description"><textarea rows={3} className={textareaCls} value={siteContent.batchSchedule.description} onChange={(e) => updateSiteContent('batchSchedule', { description: e.target.value })} /></Field>
                <Field label="Bottom note (urgency text)"><textarea rows={2} className={textareaCls} value={siteContent.batchSchedule.noteText} onChange={(e) => updateSiteContent('batchSchedule', { noteText: e.target.value })} /></Field>
              </div>

              <div className="mt-5 space-y-4">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#667085]">Individual batches</p>
                {siteContent.batchSchedule.batches.map((batch, i) => (
                  <div key={batch.course} className="rounded-[1.2rem] border-[2.5px] border-[#10163a] p-4" style={{ backgroundColor: `${batch.accent}10` }}>
                    <div className="mb-3 flex items-center gap-2">
                      <span className="text-lg">{batch.icon}</span>
                      <p className="font-black text-[#10163a]">{batch.course}</p>
                      <select
                        className="ml-auto rounded-lg border-2 border-[#10163a] bg-white px-2 py-1 text-xs font-black text-[#10163a]"
                        value={batch.status}
                        onChange={(e) => {
                          const updated = [...siteContent.batchSchedule.batches]
                          updated[i] = { ...updated[i], status: e.target.value as BatchEntry['status'] }
                          updateSiteContent('batchSchedule', { batches: updated })
                        }}
                      >
                        <option value="open">Enrolling Now</option>
                        <option value="filling">Filling Fast</option>
                        <option value="starting-soon">Starting Soon</option>
                        <option value="full">Batch Full</option>
                      </select>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <Field label="Start date">
                        <input className={inputCls} value={batch.startDate} onChange={(e) => {
                          const updated = [...siteContent.batchSchedule.batches]
                          updated[i] = { ...updated[i], startDate: e.target.value }
                          updateSiteContent('batchSchedule', { batches: updated })
                        }} />
                      </Field>
                      <Field label="Fee">
                        <input className={inputCls} value={batch.fee} onChange={(e) => {
                          const updated = [...siteContent.batchSchedule.batches]
                          updated[i] = { ...updated[i], fee: e.target.value }
                          updateSiteContent('batchSchedule', { batches: updated })
                        }} />
                      </Field>
                      <Field label="EMI line">
                        <input className={inputCls} value={batch.emi} onChange={(e) => {
                          const updated = [...siteContent.batchSchedule.batches]
                          updated[i] = { ...updated[i], emi: e.target.value }
                          updateSiteContent('batchSchedule', { batches: updated })
                        }} />
                      </Field>
                      <Field label="Seats taken">
                        <input type="number" min={0} className={inputCls} value={batch.seatsTaken} onChange={(e) => {
                          const updated = [...siteContent.batchSchedule.batches]
                          updated[i] = { ...updated[i], seatsTaken: Number(e.target.value) }
                          updateSiteContent('batchSchedule', { batches: updated })
                        }} />
                      </Field>
                      <Field label="Total seats">
                        <input type="number" min={1} className={inputCls} value={batch.seatsTotal} onChange={(e) => {
                          const updated = [...siteContent.batchSchedule.batches]
                          updated[i] = { ...updated[i], seatsTotal: Number(e.target.value) }
                          updateSiteContent('batchSchedule', { batches: updated })
                        }} />
                      </Field>
                      <Field label="Mode">
                        <input className={inputCls} value={batch.mode} onChange={(e) => {
                          const updated = [...siteContent.batchSchedule.batches]
                          updated[i] = { ...updated[i], mode: e.target.value }
                          updateSiteContent('batchSchedule', { batches: updated })
                        }} />
                      </Field>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            TAB: MASTERCLASSES
        ══════════════════════════════════════════════ */}
        {activeTab === 'masterclasses' && (
          <MasterclassAdminPage
            userEmail={userEmail}
            embedded
            onMasterclassesChange={setMasterclasses}
            onSignOut={handleSignOut}
          />
        )}

        {activeTab === 'blog' && <BlogAdminPage />}

        {/* ══════════════════════════════════════════════
            TAB: COURSES
        ══════════════════════════════════════════════ */}
        {activeTab === 'courses' && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-black text-[#10163a]">Course Pages Editor</h2>
              <div className="flex gap-2">
                {(['graphic-design', 'uiux-design', 'digital-marketing', 'video-editing'] as const).map((id) => {
                  const labels: Record<string, string> = { 'graphic-design': 'Graphic Design', 'uiux-design': 'UI/UX', 'digital-marketing': 'Digital Mktg', 'video-editing': 'Video Editing' }
                  return (
                    <button
                      key={id}
                      onClick={() => setActiveCourse(id)}
                      className={`rounded-[0.9rem] border-[2.5px] border-[#10163a] px-3 py-2 text-xs font-black transition ${activeCourse === id ? 'bg-[#0e1330] text-white shadow-[3px_3px_0_#10163a]' : 'bg-white text-[#10163a]'}`}
                    >
                      {labels[id]}
                    </button>
                  )
                })}
              </div>
            </div>

            {(['graphic-design', 'uiux-design', 'digital-marketing', 'video-editing'] as const).map((id) => {
              if (id !== activeCourse) return null
              const c = courseContent[id]
              return (
                <div key={id} className="space-y-5">
                  <SectionCard title="Course hero & overview" accent="#fff1dd">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Title"><input className={inputCls} value={c.title} onChange={(e) => updateCourse(id, { title: e.target.value })} /></Field>
                      <Field label="Eyebrow"><input className={inputCls} value={c.eyebrow} onChange={(e) => updateCourse(id, { eyebrow: e.target.value })} /></Field>
                      <Field label="Description"><textarea rows={3} className={textareaCls} value={c.description} onChange={(e) => updateCourse(id, { description: e.target.value })} /></Field>
                      <div className="grid gap-3">
                        <Field label="Duration"><input className={inputCls} value={c.duration} onChange={(e) => updateCourse(id, { duration: e.target.value })} /></Field>
                        <Field label="Mode"><input className={inputCls} value={c.mode} onChange={(e) => updateCourse(id, { mode: e.target.value })} /></Field>
                        <Field label="Seats"><input className={inputCls} value={c.seats} onChange={(e) => updateCourse(id, { seats: e.target.value })} /></Field>
                      </div>
                      <Field label="Hero points (one per line)">
                        <textarea rows={3} className={textareaCls} value={c.heroPoints.join('\n')} onChange={(e) => updateCourse(id, { heroPoints: e.target.value.split('\n') })} />
                      </Field>
                      <Field label="Tools (comma separated)">
                        <input className={inputCls} value={c.tools.join(', ')} onChange={(e) => updateCourse(id, { tools: e.target.value.split(',').map((t) => t.trim()) })} />
                      </Field>
                      <Field label="Career roles">
                        <input className={inputCls} value={c.careerRoles} onChange={(e) => updateCourse(id, { careerRoles: e.target.value })} />
                      </Field>
                      <Field label="Syllabus URL">
                        <input className={inputCls} value={c.syllabusUrl} onChange={(e) => updateCourse(id, { syllabusUrl: e.target.value })} />
                      </Field>
                      <Field label="Popup interest label">
                        <input className={inputCls} value={c.popupInterest} onChange={(e) => updateCourse(id, { popupInterest: e.target.value })} />
                      </Field>
                    </div>
                  </SectionCard>

                  <SectionCard title="Capstone project description" accent="#eef1ff">
                    <Field label="Project description">
                      <textarea rows={4} className={textareaCls} value={c.project} onChange={(e) => updateCourse(id, { project: e.target.value })} />
                    </Field>
                  </SectionCard>

                  <SectionCard title="Outcomes (JSON)" accent="#f0fdf4">
                    <Field label="Array of {title, text}">
                      <textarea rows={8} className={`${textareaCls} font-mono text-xs`} defaultValue={JSON.stringify(c.outcomes, null, 2)} onBlur={(e) => { try { updateCourse(id, { outcomes: JSON.parse(e.target.value) }) } catch { alert('Invalid JSON') } }} />
                    </Field>
                  </SectionCard>

                  <SectionCard title="Curriculum modules (JSON)" accent="#fff1f6">
                    <Field label="Array of {label, title, text}">
                      <textarea rows={10} className={`${textareaCls} font-mono text-xs`} defaultValue={JSON.stringify(c.modules, null, 2)} onBlur={(e) => { try { updateCourse(id, { modules: JSON.parse(e.target.value) }) } catch { alert('Invalid JSON') } }} />
                    </Field>
                  </SectionCard>

                  <SectionCard title="Student testimonial" accent="#fff1dd">
                    <div className="grid gap-4 sm:grid-cols-3">
                      <Field label="Quote"><textarea rows={3} className={textareaCls} value={c.testimonial.quote} onChange={(e) => updateCourse(id, { testimonial: { ...c.testimonial, quote: e.target.value } })} /></Field>
                      <Field label="Author name"><input className={inputCls} value={c.testimonial.author} onChange={(e) => updateCourse(id, { testimonial: { ...c.testimonial, author: e.target.value } })} /></Field>
                      <Field label="Author role"><input className={inputCls} value={c.testimonial.role} onChange={(e) => updateCourse(id, { testimonial: { ...c.testimonial, role: e.target.value } })} /></Field>
                    </div>
                  </SectionCard>

                  <div className="flex justify-end">
                    <Link href={`/courses/${id}`} target="_blank" className="inline-flex items-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#3244b5] px-5 py-2.5 text-sm font-black text-white shadow-[4px_4px_0_#10163a] hover:-translate-y-0.5">
                      <Eye size={14} /> Preview course page
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* ══════════════════════════════════════════════
            TAB: SETTINGS
        ══════════════════════════════════════════════ */}
        {activeTab === 'settings' && (
          <div className="space-y-5">
            <h2 className="text-xl font-black text-[#10163a]">Settings</h2>

            {/* Payment Gateway */}
            <SectionCard title="Payment Gateway — Razorpay" accent="#fff1dd">
              <div className="mb-4 rounded-[1rem] border-[2.5px] border-[#fa8a43]/40 bg-[#fff7ed] px-4 py-3 text-sm text-[#92400e]">
                <strong>Note:</strong> Razorpay API keys are stored in <code className="font-mono">.env.local</code>. The settings below control display preferences and client behaviour.
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Payment mode">
                  <div className="flex gap-2">
                    {(['test', 'live'] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => updateSettings('payment', { mode })}
                        className={`flex-1 rounded-[0.85rem] border-[2.5px] border-[#10163a] py-2.5 text-sm font-black transition ${settings.payment.mode === mode ? 'bg-[#0e1330] text-white shadow-[3px_3px_0_#10163a]' : 'bg-white text-[#10163a]'}`}
                      >
                        {mode === 'test' ? '🧪 Test' : '✅ Live'}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Currency">
                  <input className={inputCls} value={settings.payment.currency} onChange={(e) => updateSettings('payment', { currency: e.target.value })} />
                </Field>
                <Field label="Brand name in Razorpay modal">
                  <input className={inputCls} value={settings.payment.brandName} onChange={(e) => updateSettings('payment', { brandName: e.target.value })} />
                </Field>
                <Field label="Brand color in modal">
                  <div className="flex gap-2">
                    <input type="color" className="h-10 w-14 cursor-pointer rounded-lg border-[2.5px] border-[#10163a]" value={settings.payment.brandColor} onChange={(e) => updateSettings('payment', { brandColor: e.target.value })} />
                    <input className={`${inputCls} flex-1`} value={settings.payment.brandColor} onChange={(e) => updateSettings('payment', { brandColor: e.target.value })} />
                  </div>
                </Field>
              </div>

              {/* Env var reference */}
              <div className="mt-5 rounded-[1rem] border-[2.5px] border-[#10163a]/20 bg-[#f9fafb] p-4">
                <p className="mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#667085]">.env.local keys required</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {['NEXT_PUBLIC_RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET'].map((key) => (
                    <div key={key} className="flex items-center gap-2 rounded-lg border border-[#10163a]/10 bg-white px-3 py-2">
                      <span className="h-2 w-2 rounded-full bg-[#16a34a]" />
                      <code className="font-mono text-xs text-[#10163a]">{key}</code>
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>

            {/* Email Settings */}
            <SectionCard title="Email & Notifications — Resend" accent="#eef1ff">
              <div className="mb-4 rounded-[1rem] border-[2.5px] border-[#3244b5]/30 bg-[#eef1ff] px-4 py-3 text-sm text-[#3244b5]">
                <strong>Note:</strong> <code className="font-mono">RESEND_API_KEY</code> must be set in <code className="font-mono">.env.local</code>. The recipient email below can override <code className="font-mono">CONTACT_TO_EMAIL</code> when set.
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Admin notification email">
                  <input className={inputCls} type="email" value={settings.email.notificationRecipient} onChange={(e) => updateSettings('email', { notificationRecipient: e.target.value })} />
                </Field>
                <Field label="Sender display name">
                  <input className={inputCls} value={settings.email.senderDisplay} onChange={(e) => updateSettings('email', { senderDisplay: e.target.value })} />
                </Field>
              </div>

              {/* Env var reference */}
              <div className="mt-4 rounded-[1rem] border-[2.5px] border-[#10163a]/20 bg-[#f9fafb] p-4">
                <p className="mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#667085]">.env.local keys required</p>
                <div className="grid gap-2 sm:grid-cols-3">
                  {['RESEND_API_KEY', 'CONTACT_TO_EMAIL', 'CONTACT_FROM_EMAIL'].map((key) => (
                    <div key={key} className="flex items-center gap-2 rounded-lg border border-[#10163a]/10 bg-white px-3 py-2">
                      <span className="h-2 w-2 rounded-full bg-[#16a34a]" />
                      <code className="font-mono text-xs text-[#10163a]">{key}</code>
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>

            {/* Mail Triggers */}
            <SectionCard title="Mail trigger toggles" accent="#f0fdf4">
              <p className="mb-4 text-sm text-[#475467]">Enable or disable individual email notifications. Disabled triggers will not fire even when the event occurs.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Toggle
                  label="✅ Masterclass payment confirmed"
                  on={settings.email.triggers.masterclassPaid}
                  onToggle={() => updateSettings('email', { triggers: { ...settings.email.triggers, masterclassPaid: !settings.email.triggers.masterclassPaid } })}
                />
                <Toggle
                  label="⚠️ Masterclass payment abandoned"
                  on={settings.email.triggers.masterclassAbandoned}
                  onToggle={() => updateSettings('email', { triggers: { ...settings.email.triggers, masterclassAbandoned: !settings.email.triggers.masterclassAbandoned } })}
                />
                <Toggle
                  label="🔔 Masterclass expiry reminder"
                  on={settings.email.triggers.masterclassExpiry}
                  onToggle={() => updateSettings('email', { triggers: { ...settings.email.triggers, masterclassExpiry: !settings.email.triggers.masterclassExpiry } })}
                />
                <Toggle
                  label="📩 Contact form enquiry received"
                  on={settings.email.triggers.contactEnquiry}
                  onToggle={() => updateSettings('email', { triggers: { ...settings.email.triggers, contactEnquiry: !settings.email.triggers.contactEnquiry } })}
                />
                <Toggle
                  label="🎟️ Auto-coupon to joining-immediately leads"
                  on={settings.email.triggers.contactCoupon}
                  onToggle={() => updateSettings('email', { triggers: { ...settings.email.triggers, contactCoupon: !settings.email.triggers.contactCoupon } })}
                />
              </div>
            </SectionCard>

            {/* General */}
            <SectionCard title="General site settings" accent="#fff1f6">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Site name"><input className={inputCls} value={settings.general.siteName} onChange={(e) => updateSettings('general', { siteName: e.target.value })} /></Field>
                <Field label="Admin phone"><input className={inputCls} value={settings.general.adminPhone} onChange={(e) => updateSettings('general', { adminPhone: e.target.value })} /></Field>
                <Field label="WhatsApp number (digits only)"><input className={inputCls} value={settings.general.whatsappNumber} onChange={(e) => updateSettings('general', { whatsappNumber: e.target.value })} /></Field>
                <Field label="Instagram handle"><input className={inputCls} value={settings.general.instagramHandle} onChange={(e) => updateSettings('general', { instagramHandle: e.target.value })} /></Field>
              </div>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => { if (confirm('Reset all settings to defaults?')) saveSettings(defaultSiteSettings) }}
                  className="inline-flex items-center gap-2 rounded-[1rem] border-[2.5px] border-[#10163a] bg-white px-4 py-2 text-xs font-black text-[#10163a] shadow-[3px_3px_0_#10163a] hover:-translate-y-0.5"
                >
                  <RefreshCcw size={13} /> Reset settings
                </button>
              </div>
            </SectionCard>

            {/* Firebase info */}
            <SectionCard title="Firebase — Auth & Session" accent="#fff8ed">
              <div className="grid gap-2 sm:grid-cols-2">
                {['NEXT_PUBLIC_FIREBASE_API_KEY', 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', 'NEXT_PUBLIC_FIREBASE_PROJECT_ID', 'NEXT_PUBLIC_FIREBASE_APP_ID', 'FIREBASE_PROJECT_ID', 'FIREBASE_CLIENT_EMAIL', 'FIREBASE_PRIVATE_KEY', 'ADMIN_EMAILS'].map((key) => (
                  <div key={key} className="flex items-center gap-2 rounded-lg border border-[#10163a]/10 bg-white px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-[#16a34a]" />
                    <code className="font-mono text-xs text-[#10163a]">{key}</code>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-[#667085]">Signed in as <strong>{userEmail}</strong> · Session cookie expires in 5 days.</p>
            </SectionCard>
          </div>
        )}

      </div>
    </main>
  )
}
