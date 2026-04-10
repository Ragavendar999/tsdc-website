'use client'

import { ExternalLink, Eye, Plus, Save, Sparkles, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { defaultMasterclasses, MASTERCLASS_STORAGE_KEY, type Masterclass } from '@/app/lib/masterclasses'

const adminUsername = 'admin'
const adminPassword = 'TSDC@2026'

const emptyMasterclass = (): Masterclass => ({
  ...defaultMasterclasses[0],
  id: `masterclass-${Date.now()}`,
  slug: `new-masterclass-${Date.now()}`,
  status: 'draft',
  title: 'New Masterclass',
  backgroundStyle: 'midnight',
  backgroundImage: '',
  category: 'Creative Masterclass',
  hook: 'Add your masterclass hook here',
})

export default function MasterclassAdminPage() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [masterclasses, setMasterclasses] = useState<Masterclass[]>(defaultMasterclasses)
  const [activeId, setActiveId] = useState(defaultMasterclasses[0].id)
  const active = useMemo(
    () => masterclasses.find((masterclass) => masterclass.id === activeId) || masterclasses[0],
    [activeId, masterclasses]
  )

  useEffect(() => {
    setLoggedIn(window.localStorage.getItem('tsdc-admin-session') === 'active')
    const stored = window.localStorage.getItem(MASTERCLASS_STORAGE_KEY)
    if (stored) setMasterclasses(JSON.parse(stored))
  }, [])

  const saveMasterclasses = (items: Masterclass[]) => {
    setMasterclasses(items)
    window.localStorage.setItem(MASTERCLASS_STORAGE_KEY, JSON.stringify(items))
  }

  const updateActive = (patch: Partial<Masterclass>) => {
    saveMasterclasses(masterclasses.map((item) => (item.id === active.id ? { ...item, ...patch } : item)))
  }

  const updateJson = <T,>(key: keyof Masterclass, value: string) => {
    try {
      updateActive({ [key]: JSON.parse(value) } as Partial<Masterclass>)
    } catch {
      alert('Invalid JSON. Please check commas, quotes, and brackets.')
    }
  }

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    if (formData.get('username') === adminUsername && formData.get('password') === adminPassword) {
      window.localStorage.setItem('tsdc-admin-session', 'active')
      setLoggedIn(true)
      setLoginError('')
      return
    }
    setLoginError('Invalid credentials. Please try again.')
  }

  /* ── LOGIN SCREEN ── */
  if (!loggedIn) {
    return (
      <main className="flex min-h-screen items-stretch bg-[#0e1330]">
        {/* Left branding panel */}
        <div className="hidden flex-col justify-between p-10 lg:flex lg:w-[42%]">
          <div>
            <div className="inline-flex rounded-full border-[3px] border-white/20 bg-white px-3.5 py-2">
              <Image src="/logo.png" alt="TSDC Logo" width={96} height={32} />
            </div>
          </div>

          <div>
            <span className="inline-flex items-center gap-2 rounded-full border-[3px] border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white/70">
              <Sparkles size={12} className="text-[#ffcb53]" />
              Masterclass control centre
            </span>
            <h1 className="mt-5 text-5xl font-black leading-[0.92] tracking-[-0.06em] text-white">
              Create.
              <span className="block text-[#ff9736]">Publish.</span>
              <span className="block text-[#db4b87]">Fill seats.</span>
            </h1>
            <p className="mt-6 max-w-sm text-sm font-semibold leading-7 text-white/60">
              Manage live masterclasses, control seat availability, update content, and publish sessions — all from one place.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Live sessions', value: masterclasses.filter((m) => m.status === 'live').length.toString() },
              { label: 'Draft sessions', value: masterclasses.filter((m) => m.status === 'draft').length.toString() },
              { label: 'Total seats', value: masterclasses.reduce((sum, m) => sum + m.seatsTotal, 0).toString() },
            ].map((stat) => (
              <div key={stat.label} className="rounded-[1.4rem] border-[3px] border-white/15 bg-white/8 p-4">
                <p className="text-2xl font-black text-white">{stat.value}</p>
                <p className="mt-1 text-[10px] font-black uppercase tracking-[0.16em] text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right login panel */}
        <div className="flex flex-1 items-center justify-center bg-[#fffdf7] px-6 py-12">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <Image src="/logo.png" alt="TSDC Logo" width={100} height={32} />
            </div>

            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#3244b5]">Admin panel</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.05em] text-[#10163a]">Welcome back</h2>
            <p className="mt-1 text-sm text-[#667085]">Sign in to manage your masterclasses.</p>

            <form onSubmit={handleLogin} className="mt-8 space-y-4">
              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#3244b5]">Username</span>
                <input
                  name="username"
                  placeholder="Enter username"
                  autoComplete="username"
                  className="w-full rounded-2xl border-[3px] border-[#10163a] bg-white px-4 py-3.5 font-semibold text-[#10163a] outline-none shadow-[4px_4px_0_#10163a] transition focus:border-[#3244b5]"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#3244b5]">Password</span>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  autoComplete="current-password"
                  className="w-full rounded-2xl border-[3px] border-[#10163a] bg-white px-4 py-3.5 font-semibold text-[#10163a] outline-none shadow-[4px_4px_0_#10163a] transition focus:border-[#3244b5]"
                />
              </label>

              {loginError && (
                <p className="rounded-2xl border-[3px] border-[#b42318] bg-[#fff1f2] px-4 py-3 text-sm font-bold text-[#b42318] shadow-[4px_4px_0_#b42318]">
                  {loginError}
                </p>
              )}

              <button
                type="submit"
                className="w-full rounded-2xl border-[3px] border-[#10163a] bg-[#3244b5] px-5 py-4 font-black text-white shadow-[5px_5px_0_#10163a] transition hover:-translate-y-0.5"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 rounded-2xl border-[3px] border-[#10163a] bg-[#fff4eb] p-4 text-[#9a4a10] shadow-[4px_4px_0_#10163a]">
              <p className="text-xs font-black uppercase tracking-[0.14em]">Demo credentials</p>
              <p className="mt-1 text-sm font-bold">Username: <code className="font-mono">admin</code> · Password: <code className="font-mono">TSDC@2026</code></p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  /* ── ADMIN PANEL ── */
  return (
    <main className="min-h-screen bg-[#f0f3ff] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-[2rem] border-[3px] border-[#10163a] bg-[#0e1330] p-5 text-white shadow-[8px_8px_0_#10163a] md:p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full border-[3px] border-white/20 bg-white px-3 py-2">
              <Image src="/logo.png" alt="TSDC" width={80} height={26} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#fa8a43]">Admin Panel</p>
              <h1 className="text-2xl font-black tracking-[-0.04em]">Masterclass Manager</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <span className="rounded-full border-2 border-[#22c55e] bg-[#22c55e]/15 px-3 py-1 text-xs font-black text-[#22c55e]">
                {masterclasses.filter((m) => m.status === 'live').length} Live
              </span>
              <span className="rounded-full border-2 border-white/20 bg-white/10 px-3 py-1 text-xs font-black text-white/60">
                {masterclasses.filter((m) => m.status === 'draft').length} Draft
              </span>
            </div>
            <button
              onClick={() => {
                const next = emptyMasterclass()
                saveMasterclasses([next, ...masterclasses])
                setActiveId(next.id)
              }}
              className="inline-flex items-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#ff9736] px-4 py-2.5 text-sm font-black text-white shadow-[4px_4px_0_rgba(0,0,0,0.3)] transition hover:-translate-y-0.5"
            >
              <Plus size={15} />
              New Masterclass
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.3fr_0.7fr]">
          {/* ── Sidebar list ── */}
          <aside className="space-y-2.5">
            <p className="px-1 text-xs font-black uppercase tracking-[0.18em] text-[#667085]">All masterclasses</p>
            {masterclasses.map((masterclass) => (
              <div
                key={masterclass.id}
                className={`group relative overflow-hidden rounded-[1.6rem] border-[3px] transition-all ${
                  masterclass.id === active.id
                    ? 'border-[#3244b5] bg-[#eef1ff] shadow-[5px_5px_0_#3244b5]'
                    : 'border-[#10163a] bg-white shadow-[4px_4px_0_#10163a]'
                }`}
              >
                <button
                  onClick={() => setActiveId(masterclass.id)}
                  className="w-full p-4 text-left"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-black text-[#10163a] leading-snug">{masterclass.title}</p>
                    <span className={`shrink-0 rounded-full border-2 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.12em] ${
                      masterclass.status === 'live'
                        ? 'border-[#16a34a] bg-[#dcfce7] text-[#16a34a]'
                        : 'border-[#9ca3af] bg-[#f3f4f6] text-[#6b7280]'
                    }`}>
                      {masterclass.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-bold text-[#667085]">{masterclass.category}</p>
                  <div className="mt-2 flex items-center gap-2 text-[10px] font-bold text-[#9ca3af]">
                    <span>{masterclass.seatsTaken}/{masterclass.seatsTotal} seats</span>
                    <span>·</span>
                    <span>/{masterclass.slug}</span>
                  </div>
                </button>
                <div className="flex gap-1.5 border-t-[3px] border-dashed border-[#10163a]/15 px-4 py-2.5">
                  <Link
                    href={`/masterclasses/${masterclass.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#10163a]/20 bg-transparent px-3 py-1 text-[10px] font-black text-[#3244b5] transition hover:bg-[#eef1ff]"
                  >
                    <Eye size={11} />
                    Preview
                    <ExternalLink size={9} />
                  </Link>
                </div>
              </div>
            ))}
          </aside>

          {/* ── Edit panel ── */}
          {active && (
            <section className="rounded-[2rem] border-[3px] border-[#10163a] bg-white shadow-[8px_8px_0_#10163a]">
              {/* Edit header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b-[3px] border-[#10163a] p-5 md:p-6">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#667085]">Editing</p>
                  <h2 className="text-xl font-black text-[#10163a]">{active.title}</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => updateActive({ status: active.status === 'live' ? 'draft' : 'live' })}
                    className={`rounded-[1rem] border-[3px] border-[#10163a] px-4 py-2 text-sm font-black text-white shadow-[4px_4px_0_#10163a] transition hover:-translate-y-0.5 ${
                      active.status === 'live' ? 'bg-[#667085]' : 'bg-[#22c55e]'
                    }`}
                  >
                    {active.status === 'live' ? '⏸ Unpublish' : '▶ Publish'}
                  </button>
                  <button
                    onClick={() => {
                      const copy = { ...active, id: `masterclass-${Date.now()}`, slug: `${active.slug}-copy`, title: `${active.title} Copy`, status: 'draft' as const }
                      saveMasterclasses([copy, ...masterclasses])
                      setActiveId(copy.id)
                    }}
                    className="rounded-[1rem] border-[3px] border-[#10163a] bg-[#fa8a43] px-4 py-2 text-sm font-black text-white shadow-[4px_4px_0_#10163a] transition hover:-translate-y-0.5"
                  >
                    Duplicate
                  </button>
                  <button
                    onClick={() => {
                      if (!confirm('Delete this masterclass?')) return
                      const next = masterclasses.filter((item) => item.id !== active.id)
                      saveMasterclasses(next.length ? next : defaultMasterclasses)
                      setActiveId((next[0] || defaultMasterclasses[0]).id)
                    }}
                    className="inline-flex items-center gap-1.5 rounded-[1rem] border-[3px] border-[#10163a] bg-[#ea6865] px-4 py-2 text-sm font-black text-white shadow-[4px_4px_0_#10163a] transition hover:-translate-y-0.5"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>

              <div className="p-5 md:p-6 space-y-6">
                {/* ── Basic info ── */}
                <fieldset className="rounded-[1.6rem] border-[3px] border-[#10163a] p-5 shadow-[4px_4px_0_#10163a]">
                  <legend className="px-2 text-xs font-black uppercase tracking-[0.18em] text-[#3244b5]">Basic info</legend>
                  <div className="mt-3 grid gap-4 md:grid-cols-2">
                    {[
                      ['title', 'Title'],
                      ['slug', 'URL slug'],
                      ['badge', 'Badge text'],
                      ['category', 'Category'],
                      ['hook', 'Hero headline'],
                      ['backgroundImage', 'Background image URL'],
                    ].map(([key, label]) => (
                      <label key={key} className="block">
                        <span className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.14em] text-[#667085]">{label}</span>
                        <input
                          value={String(active[key as keyof Masterclass] ?? '')}
                          onChange={(event) => updateActive({ [key]: event.target.value } as Partial<Masterclass>)}
                          className="w-full rounded-2xl border-[3px] border-[#10163a] bg-[#f8f9ff] px-4 py-3 font-semibold text-[#10163a] outline-none shadow-[3px_3px_0_#10163a] transition focus:border-[#3244b5]"
                        />
                      </label>
                    ))}

                    <label className="block">
                      <span className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.14em] text-[#667085]">Background style</span>
                      <select
                        value={active.backgroundStyle || 'midnight'}
                        onChange={(event) => updateActive({ backgroundStyle: event.target.value as Masterclass['backgroundStyle'] })}
                        className="w-full rounded-2xl border-[3px] border-[#10163a] bg-[#f8f9ff] px-4 py-3 font-semibold text-[#10163a] outline-none shadow-[3px_3px_0_#10163a]"
                      >
                        <option value="midnight">Midnight black</option>
                        <option value="blueprint">Blueprint blue</option>
                        <option value="ember">Ember orange</option>
                        <option value="violet">Violet stage</option>
                      </select>
                    </label>

                    <label className="block md:col-span-2">
                      <span className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.14em] text-[#667085]">Description</span>
                      <textarea
                        value={active.description}
                        onChange={(event) => updateActive({ description: event.target.value })}
                        rows={3}
                        className="w-full rounded-2xl border-[3px] border-[#10163a] bg-[#f8f9ff] px-4 py-3 font-semibold text-[#10163a] outline-none shadow-[3px_3px_0_#10163a] transition focus:border-[#3244b5]"
                      />
                    </label>
                  </div>
                </fieldset>

                {/* ── Schedule & links ── */}
                <fieldset className="rounded-[1.6rem] border-[3px] border-[#10163a] p-5 shadow-[4px_4px_0_#10163a]">
                  <legend className="px-2 text-xs font-black uppercase tracking-[0.18em] text-[#fa8a43]">Schedule &amp; links</legend>
                  <div className="mt-3 grid gap-4 md:grid-cols-2">
                    {[
                      ['date', 'Date'],
                      ['time', 'Time'],
                      ['mode', 'Mode (Online / Offline)'],
                      ['discountLabel', 'Discount label'],
                      ['whatsappLink', 'WhatsApp link'],
                    ].map(([key, label]) => (
                      <label key={key} className="block">
                        <span className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.14em] text-[#667085]">{label}</span>
                        <input
                          value={String(active[key as keyof Masterclass] ?? '')}
                          onChange={(event) => updateActive({ [key]: event.target.value } as Partial<Masterclass>)}
                          className="w-full rounded-2xl border-[3px] border-[#10163a] bg-[#f8f9ff] px-4 py-3 font-semibold text-[#10163a] outline-none shadow-[3px_3px_0_#10163a] transition focus:border-[#3244b5]"
                        />
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* ── Pricing & seats ── */}
                <fieldset className="rounded-[1.6rem] border-[3px] border-[#10163a] p-5 shadow-[4px_4px_0_#10163a]">
                  <legend className="px-2 text-xs font-black uppercase tracking-[0.18em] text-[#db4b87]">Pricing &amp; seats</legend>
                  <div className="mt-3 grid gap-4 md:grid-cols-2">
                    {[
                      ['price', 'Price (₹)'],
                      ['originalPrice', 'Original price (₹)'],
                      ['seatsTotal', 'Total seats'],
                      ['seatsTaken', 'Seats taken'],
                    ].map(([key, label]) => (
                      <label key={key} className="block">
                        <span className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.14em] text-[#667085]">{label}</span>
                        <input
                          type="number"
                          value={Number(active[key as keyof Masterclass])}
                          onChange={(event) => updateActive({ [key]: Number(event.target.value) } as Partial<Masterclass>)}
                          className="w-full rounded-2xl border-[3px] border-[#10163a] bg-[#f8f9ff] px-4 py-3 font-semibold text-[#10163a] outline-none shadow-[3px_3px_0_#10163a] transition focus:border-[#3244b5]"
                        />
                      </label>
                    ))}
                  </div>

                  {/* Live seat preview */}
                  <div className="mt-4 rounded-[1.3rem] border-[3px] border-[#10163a] bg-[#fff8ed] p-4 shadow-[3px_3px_0_#10163a]">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#667085]">Seat fill preview</p>
                    <div className="mt-2 h-4 overflow-hidden rounded-full border-[3px] border-[#10163a] bg-[#eef1ff]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#fa8a43] to-[#ff9736] transition-all duration-500"
                        style={{ width: `${Math.round((active.seatsTaken / active.seatsTotal) * 100)}%` }}
                      />
                    </div>
                    <p className="mt-1.5 text-xs font-bold text-[#667085]">
                      {active.seatsTaken}/{active.seatsTotal} seats · {active.seatsTotal - active.seatsTaken} remaining
                    </p>
                  </div>
                </fieldset>

                {/* ── Content JSON ── */}
                <fieldset className="rounded-[1.6rem] border-[3px] border-[#10163a] p-5 shadow-[4px_4px_0_#10163a]">
                  <legend className="px-2 text-xs font-black uppercase tracking-[0.18em] text-[#3244b5]">Content (JSON)</legend>
                  <div className="mt-3 space-y-4">
                    {[
                      ['modules', active.modules],
                      ['includes', active.includes],
                      ['audience', active.audience],
                      ['faqs', active.faqs],
                      ['instructor', active.instructor],
                    ].map(([key, value]) => (
                      <label key={key as string} className="block">
                        <span className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.14em] text-[#667085]">
                          {key as string}
                        </span>
                        <textarea
                          defaultValue={JSON.stringify(value, null, 2)}
                          rows={key === 'modules' ? 8 : 5}
                          onBlur={(event) => updateJson(key as keyof Masterclass, event.target.value)}
                          className="w-full rounded-2xl border-[3px] border-[#10163a] bg-[#0e1330] px-4 py-3 font-mono text-sm text-[#a5b4fc] outline-none shadow-[3px_3px_0_#10163a] transition focus:border-[#3244b5]"
                        />
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* Save notice */}
                <div className="rounded-2xl border-[3px] border-[#10163a] bg-[#fff4eb] p-4 text-sm font-bold text-[#9a4a10] shadow-[4px_4px_0_#10163a]">
                  <Save className="mr-2 inline h-4 w-4" />
                  All changes save automatically to this browser. Connect Supabase, Firebase, or Vercel KV for production-wide persistence.
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  )
}
