'use client'

import { ExternalLink, Eye, LogOut, Plus, Save, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  defaultMasterclasses,
  fetchMasterclasses,
  saveMasterclassesToApi,
  type Masterclass,
} from '@/app/lib/masterclasses'

const emptyMasterclass = (): Masterclass => ({
  ...defaultMasterclasses[0],
  id: `masterclass-${Date.now()}`,
  slug: `new-masterclass-${Date.now()}`,
  status: 'draft',
  replacementMasterclassId: '',
  autoActivatedAt: undefined,
  activatedFromMasterclassId: undefined,
  title: 'New Masterclass',
  backgroundStyle: 'midnight',
  backgroundImage: '',
  category: 'Creative Masterclass',
  hook: 'Add your masterclass hook here',
})

type MasterclassAdminPageProps = {
  userEmail: string
  embedded?: boolean
  onMasterclassesChange?: (items: Masterclass[]) => void
  onSignOut?: () => Promise<void> | void
}

const getTurnOffInputValue = (value?: string) => {
  if (!value) return ''
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return ''

  const pad = (part: number) => String(part).padStart(2, '0')
  return `${parsed.getFullYear()}-${pad(parsed.getMonth() + 1)}-${pad(parsed.getDate())}T${pad(parsed.getHours())}:${pad(parsed.getMinutes())}`
}

export default function MasterclassAdminPage({
  userEmail,
  embedded = false,
  onMasterclassesChange,
  onSignOut,
}: MasterclassAdminPageProps) {
  const router = useRouter()
  const [masterclasses, setMasterclasses] = useState<Masterclass[]>(defaultMasterclasses)
  const [activeId, setActiveId] = useState(defaultMasterclasses[0].id)
  const [saveError, setSaveError] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [savedAt, setSavedAt] = useState<Date | null>(null)
  const [hasUnsaved, setHasUnsaved] = useState(false)
  const hasLoadedRef = useRef(false)
  const active = useMemo(
    () => masterclasses.find((masterclass) => masterclass.id === activeId) || masterclasses[0],
    [activeId, masterclasses]
  )

  useEffect(() => {
    fetchMasterclasses()
      .then((initial) => {
        setMasterclasses(initial)
        setActiveId(initial[0]?.id || '')
        onMasterclassesChange?.(initial)
        hasLoadedRef.current = true
      })
      .catch((error) => {
        setSaveError(error instanceof Error ? error.message : 'Failed to load masterclasses from database.')
        hasLoadedRef.current = true
      })
  }, [onMasterclassesChange])

  const saveMasterclasses = (items: Masterclass[]) => {
    setMasterclasses(items)
    onMasterclassesChange?.(items)
    if (hasLoadedRef.current) setHasUnsaved(true)
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveError('')
    try {
      const saved = await saveMasterclassesToApi(masterclasses)
      onMasterclassesChange?.(saved)
      setHasUnsaved(false)
      setSavedAt(new Date())
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Unable to save masterclasses right now.')
    } finally {
      setIsSaving(false)
    }
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

  const handleDeleteActive = () => {
    if (!confirm(`Delete "${active.title}" from the entire site? This will remove its cards, links, and admin entry.`)) {
      return
    }

    const refreshed = masterclasses.filter((item) => item.id !== active.id)
    setMasterclasses(refreshed)
    setActiveId(refreshed[0]?.id || '')
    onMasterclassesChange?.(refreshed)
  }

  const handleSignOut = async () => {
    if (onSignOut) {
      await onSignOut()
      return
    }

    await fetch('/api/admin/session-logout', { method: 'POST' })
    router.replace('/admin/login')
    router.refresh()
  }

  const panelContent = (
    <div className="grid gap-6 lg:grid-cols-[0.3fr_0.7fr]">
      <aside className="space-y-2.5">
        <div className="flex items-center justify-between gap-3 px-1">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#667085]">All masterclasses</p>
          {embedded ? (
            <button
              onClick={() => {
                const next = emptyMasterclass()
                saveMasterclasses([next, ...masterclasses])
                setActiveId(next.id)
              }}
              className="inline-flex items-center gap-2 rounded-[0.9rem] border-[3px] border-[#10163a] bg-[#ff9736] px-3 py-2 text-xs font-black text-white shadow-[3px_3px_0_#10163a] transition hover:-translate-y-0.5"
            >
              <Plus size={13} />
              New
            </button>
          ) : null}
        </div>
        {masterclasses.map((masterclass) => (
          <div
            key={masterclass.id}
            className={`group relative overflow-hidden rounded-[1.6rem] border-[3px] transition-all ${
              masterclass.id === active.id
                ? 'border-[#3244b5] bg-[#eef1ff] shadow-[5px_5px_0_#3244b5]'
                : 'border-[#10163a] bg-white shadow-[4px_4px_0_#10163a]'
            }`}
          >
            <button onClick={() => setActiveId(masterclass.id)} className="w-full p-4 text-left">
              <div className="flex items-start justify-between gap-2">
                <p className="font-black leading-snug text-[#10163a]">{masterclass.title}</p>
                <span
                  className={`shrink-0 rounded-full border-2 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.12em] ${
                    masterclass.status === 'live'
                      ? 'border-[#16a34a] bg-[#dcfce7] text-[#16a34a]'
                      : 'border-[#9ca3af] bg-[#f3f4f6] text-[#6b7280]'
                  }`}
                >
                  {masterclass.status}
                </span>
              </div>
              <p className="mt-1 text-xs font-bold text-[#667085]">{masterclass.category}</p>
              <div className="mt-2 flex items-center gap-2 text-[10px] font-bold text-[#9ca3af]">
                <span>
                  {masterclass.seatsTaken}/{masterclass.seatsTotal} seats
                </span>
                <span>|</span>
                <span>/{masterclass.slug}</span>
                {masterclass.replacementMasterclassId ? (
                  <>
                    <span>|</span>
                    <span>auto replace on expiry</span>
                  </>
                ) : null}
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

      {active ? (
        <section className="rounded-[2rem] border-[3px] border-[#10163a] bg-white shadow-[8px_8px_0_#10163a]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-[3px] border-[#10163a] p-5 md:p-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#667085]">Editing</p>
              <h2 className="text-xl font-black text-[#10163a]">{active.title}</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className={`inline-flex items-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] px-4 py-2 text-sm font-black text-white shadow-[4px_4px_0_#10163a] transition hover:-translate-y-0.5 disabled:opacity-60 ${
                  hasUnsaved ? 'bg-[#3244b5]' : 'bg-[#22c55e]'
                }`}
              >
                <Save size={14} />
                {isSaving ? 'Saving…' : hasUnsaved ? 'Save changes' : savedAt ? 'Saved ✓' : 'Save'}
              </button>
              <button
                onClick={() => updateActive({ status: active.status === 'live' ? 'draft' : 'live' })}
                className={`rounded-[1rem] border-[3px] border-[#10163a] px-4 py-2 text-sm font-black text-white shadow-[4px_4px_0_#10163a] transition hover:-translate-y-0.5 ${
                  active.status === 'live' ? 'bg-[#667085]' : 'bg-[#22c55e]'
                }`}
              >
                {active.status === 'live' ? 'Unpublish' : 'Publish'}
              </button>
              <button
                onClick={() => {
                  const copy = {
                    ...active,
                    id: `masterclass-${Date.now()}`,
                    slug: `${active.slug}-copy`,
                    title: `${active.title} Copy`,
                    status: 'draft' as const,
                  }
                  saveMasterclasses([copy, ...masterclasses])
                  setActiveId(copy.id)
                }}
                className="rounded-[1rem] border-[3px] border-[#10163a] bg-[#fa8a43] px-4 py-2 text-sm font-black text-white shadow-[4px_4px_0_#10163a] transition hover:-translate-y-0.5"
              >
                Duplicate
              </button>
              <button
                type="button"
                onClick={handleDeleteActive}
                className="inline-flex items-center gap-1.5 rounded-[1rem] border-[3px] border-[#10163a] bg-[#ea6865] px-4 py-2 text-sm font-black text-white shadow-[4px_4px_0_#10163a] transition hover:-translate-y-0.5"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          </div>

          <div className="space-y-6 p-5 md:p-6">
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

            <fieldset className="rounded-[1.6rem] border-[3px] border-[#10163a] p-5 shadow-[4px_4px_0_#10163a]">
              <legend className="px-2 text-xs font-black uppercase tracking-[0.18em] text-[#fa8a43]">Schedule &amp; links</legend>
              <div className="mt-3 grid gap-4 md:grid-cols-2">
                {[
                  ['date', 'Date'],
                  ['eventDate', 'Event date (YYYY-MM-DD)'],
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

                <label className="block">
                  <span className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.14em] text-[#667085]">Turn off date &amp; time</span>
                  <input
                    type="datetime-local"
                    value={getTurnOffInputValue(active.turnOffAt)}
                    onChange={(event) =>
                      updateActive({
                        turnOffAt: event.target.value ? new Date(event.target.value).toISOString() : undefined,
                        autoTurnedOffAt: undefined,
                        expiryNotificationSentAt: undefined,
                      })
                    }
                    className="w-full rounded-2xl border-[3px] border-[#10163a] bg-[#f8f9ff] px-4 py-3 font-semibold text-[#10163a] outline-none shadow-[3px_3px_0_#10163a] transition focus:border-[#3244b5]"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.14em] text-[#667085]">Auto replacement masterclass</span>
                  <select
                    value={active.replacementMasterclassId || ''}
                    onChange={(event) =>
                      updateActive({
                        replacementMasterclassId: event.target.value || undefined,
                        autoActivatedAt: undefined,
                        activatedFromMasterclassId: undefined,
                      })
                    }
                    className="w-full rounded-2xl border-[3px] border-[#10163a] bg-[#f8f9ff] px-4 py-3 font-semibold text-[#10163a] outline-none shadow-[3px_3px_0_#10163a]"
                  >
                    <option value="">Do not auto replace</option>
                    {masterclasses
                      .filter((item) => item.id !== active.id)
                      .map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.title} ({item.status})
                        </option>
                      ))}
                  </select>
                </label>

                <div className="rounded-2xl border-[3px] border-[#10163a] bg-[#eef1ff] px-4 py-3 text-sm font-semibold text-[#3244b5] shadow-[3px_3px_0_#10163a] md:col-span-2">
                  {active.turnOffAt
                    ? `This masterclass will auto turn off at ${new Date(active.turnOffAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}.`
                    : 'No auto turn-off is scheduled for this masterclass yet.'}
                  {active.replacementMasterclassId
                    ? ` When that happens, the selected replacement will be published automatically if it is still in draft and not expired.`
                    : ' You can also choose a draft masterclass above to publish automatically after expiry.'}
                </div>
              </div>
            </fieldset>

            <fieldset className="rounded-[1.6rem] border-[3px] border-[#10163a] p-5 shadow-[4px_4px_0_#10163a]">
              <legend className="px-2 text-xs font-black uppercase tracking-[0.18em] text-[#db4b87]">Pricing &amp; seats</legend>
              <div className="mt-3 grid gap-4 md:grid-cols-2">
                {[
                  ['price', 'Price (INR)'],
                  ['originalPrice', 'Original price (INR)'],
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

              <div className="mt-4 rounded-[1.3rem] border-[3px] border-[#10163a] bg-[#fff8ed] p-4 shadow-[3px_3px_0_#10163a]">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#667085]">Seat fill preview</p>
                <div className="mt-2 h-4 overflow-hidden rounded-full border-[3px] border-[#10163a] bg-[#eef1ff]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#fa8a43] to-[#ff9736] transition-all duration-500"
                    style={{ width: `${Math.round((active.seatsTaken / active.seatsTotal) * 100)}%` }}
                  />
                </div>
                <p className="mt-1.5 text-xs font-bold text-[#667085]">
                  {active.seatsTaken}/{active.seatsTotal} seats | {active.seatsTotal - active.seatsTaken} remaining
                </p>
              </div>
            </fieldset>

            {/* ── Instructor ── */}
            <fieldset className="rounded-[1.6rem] border-[3px] border-[#10163a] p-5 shadow-[4px_4px_0_#10163a]">
              <legend className="px-2 text-xs font-black uppercase tracking-[0.18em] text-[#db4b87]">Instructor</legend>
              <div className="mt-3 grid gap-4 md:grid-cols-2">
                {([['name', 'Instructor name'], ['role', 'Role / title']] as const).map(([key, label]) => (
                  <label key={key} className="block">
                    <span className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.14em] text-[#667085]">{label}</span>
                    <input
                      value={active.instructor[key]}
                      onChange={(e) => updateActive({ instructor: { ...active.instructor, [key]: e.target.value } })}
                      className="w-full rounded-2xl border-[3px] border-[#10163a] bg-[#f8f9ff] px-4 py-3 font-semibold text-[#10163a] outline-none shadow-[3px_3px_0_#10163a] transition focus:border-[#3244b5]"
                    />
                  </label>
                ))}
                <label className="block md:col-span-2">
                  <span className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.14em] text-[#667085]">Credibility statement</span>
                  <textarea
                    value={active.instructor.credibility}
                    onChange={(e) => updateActive({ instructor: { ...active.instructor, credibility: e.target.value } })}
                    rows={3}
                    className="w-full rounded-2xl border-[3px] border-[#10163a] bg-[#f8f9ff] px-4 py-3 font-semibold text-[#10163a] outline-none shadow-[3px_3px_0_#10163a] transition focus:border-[#3244b5]"
                  />
                </label>
              </div>
            </fieldset>

            {/* ── Modules ── */}
            <fieldset className="rounded-[1.6rem] border-[3px] border-[#10163a] p-5 shadow-[4px_4px_0_#10163a]">
              <legend className="px-2 text-xs font-black uppercase tracking-[0.18em] text-[#3244b5]">Modules</legend>
              <div className="mt-3 space-y-2.5">
                {active.modules.map((mod, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eef3ff] text-[10px] font-black text-[#3244b5]">{i + 1}</span>
                    <input
                      value={mod.title}
                      onChange={(e) => updateActive({ modules: active.modules.map((m, j) => j === i ? { ...m, title: e.target.value } : m) })}
                      placeholder="Module title"
                      className="min-w-0 flex-1 rounded-2xl border-[3px] border-[#10163a] bg-[#f8f9ff] px-4 py-2.5 text-sm font-semibold text-[#10163a] outline-none shadow-[3px_3px_0_#10163a] transition focus:border-[#3244b5]"
                    />
                    <input
                      value={mod.duration}
                      onChange={(e) => updateActive({ modules: active.modules.map((m, j) => j === i ? { ...m, duration: e.target.value } : m) })}
                      placeholder="Duration"
                      className="w-28 shrink-0 rounded-2xl border-[3px] border-[#10163a] bg-[#f8f9ff] px-3 py-2.5 text-sm font-semibold text-[#10163a] outline-none shadow-[3px_3px_0_#10163a] transition focus:border-[#3244b5]"
                    />
                    <button
                      type="button"
                      onClick={() => updateActive({ modules: active.modules.filter((_, j) => j !== i) })}
                      className="shrink-0 rounded-full border-[3px] border-[#10163a] bg-[#ea6865] px-3 py-1.5 text-xs font-black text-white shadow-[3px_3px_0_#10163a] transition hover:-translate-y-0.5"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => updateActive({ modules: [...active.modules, { title: '', duration: '' }] })}
                  className="mt-1 inline-flex items-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#eef3ff] px-4 py-2 text-xs font-black text-[#3244b5] shadow-[3px_3px_0_#10163a] transition hover:-translate-y-0.5"
                >
                  <Plus size={12} /> Add module
                </button>
              </div>
            </fieldset>

            {/* ── Includes ── */}
            <fieldset className="rounded-[1.6rem] border-[3px] border-[#10163a] p-5 shadow-[4px_4px_0_#10163a]">
              <legend className="px-2 text-xs font-black uppercase tracking-[0.18em] text-[#fa8a43]">What's included</legend>
              <div className="mt-3 space-y-2.5">
                {active.includes.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      value={item.label}
                      onChange={(e) => updateActive({ includes: active.includes.map((m, j) => j === i ? { ...m, label: e.target.value } : m) })}
                      placeholder="Label (e.g. Certificate)"
                      className="w-36 shrink-0 rounded-2xl border-[3px] border-[#10163a] bg-[#f8f9ff] px-3 py-2.5 text-sm font-semibold text-[#10163a] outline-none shadow-[3px_3px_0_#10163a] transition focus:border-[#3244b5]"
                    />
                    <input
                      value={item.value}
                      onChange={(e) => updateActive({ includes: active.includes.map((m, j) => j === i ? { ...m, value: e.target.value } : m) })}
                      placeholder="Value (e.g. Included)"
                      className="min-w-0 flex-1 rounded-2xl border-[3px] border-[#10163a] bg-[#f8f9ff] px-3 py-2.5 text-sm font-semibold text-[#10163a] outline-none shadow-[3px_3px_0_#10163a] transition focus:border-[#3244b5]"
                    />
                    <button
                      type="button"
                      onClick={() => updateActive({ includes: active.includes.filter((_, j) => j !== i) })}
                      className="shrink-0 rounded-full border-[3px] border-[#10163a] bg-[#ea6865] px-3 py-1.5 text-xs font-black text-white shadow-[3px_3px_0_#10163a] transition hover:-translate-y-0.5"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => updateActive({ includes: [...active.includes, { label: '', value: '' }] })}
                  className="mt-1 inline-flex items-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#fff8ed] px-4 py-2 text-xs font-black text-[#fa8a43] shadow-[3px_3px_0_#10163a] transition hover:-translate-y-0.5"
                >
                  <Plus size={12} /> Add include
                </button>
              </div>
            </fieldset>

            {/* ── Audience ── */}
            <fieldset className="rounded-[1.6rem] border-[3px] border-[#10163a] p-5 shadow-[4px_4px_0_#10163a]">
              <legend className="px-2 text-xs font-black uppercase tracking-[0.18em] text-[#22c55e]">Who it's for (audience)</legend>
              <div className="mt-3 space-y-2.5">
                {active.audience.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      value={item}
                      onChange={(e) => updateActive({ audience: active.audience.map((a, j) => j === i ? e.target.value : a) })}
                      placeholder="Audience description"
                      className="min-w-0 flex-1 rounded-2xl border-[3px] border-[#10163a] bg-[#f8f9ff] px-4 py-2.5 text-sm font-semibold text-[#10163a] outline-none shadow-[3px_3px_0_#10163a] transition focus:border-[#3244b5]"
                    />
                    <button
                      type="button"
                      onClick={() => updateActive({ audience: active.audience.filter((_, j) => j !== i) })}
                      className="shrink-0 rounded-full border-[3px] border-[#10163a] bg-[#ea6865] px-3 py-1.5 text-xs font-black text-white shadow-[3px_3px_0_#10163a] transition hover:-translate-y-0.5"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => updateActive({ audience: [...active.audience, ''] })}
                  className="mt-1 inline-flex items-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#f0fdf4] px-4 py-2 text-xs font-black text-[#16a34a] shadow-[3px_3px_0_#10163a] transition hover:-translate-y-0.5"
                >
                  <Plus size={12} /> Add audience item
                </button>
              </div>
            </fieldset>

            {/* ── FAQs ── */}
            <fieldset className="rounded-[1.6rem] border-[3px] border-[#10163a] p-5 shadow-[4px_4px_0_#10163a]">
              <legend className="px-2 text-xs font-black uppercase tracking-[0.18em] text-[#667085]">FAQs</legend>
              <div className="mt-3 space-y-2.5">
                {active.faqs.map((faq, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f3f4f6] text-[10px] font-black text-[#667085]">Q</span>
                    <input
                      value={faq}
                      onChange={(e) => updateActive({ faqs: active.faqs.map((f, j) => j === i ? e.target.value : f) })}
                      placeholder="FAQ question"
                      className="min-w-0 flex-1 rounded-2xl border-[3px] border-[#10163a] bg-[#f8f9ff] px-4 py-2.5 text-sm font-semibold text-[#10163a] outline-none shadow-[3px_3px_0_#10163a] transition focus:border-[#3244b5]"
                    />
                    <button
                      type="button"
                      onClick={() => updateActive({ faqs: active.faqs.filter((_, j) => j !== i) })}
                      className="shrink-0 rounded-full border-[3px] border-[#10163a] bg-[#ea6865] px-3 py-1.5 text-xs font-black text-white shadow-[3px_3px_0_#10163a] transition hover:-translate-y-0.5"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => updateActive({ faqs: [...active.faqs, ''] })}
                  className="mt-1 inline-flex items-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#f9fafb] px-4 py-2 text-xs font-black text-[#667085] shadow-[3px_3px_0_#10163a] transition hover:-translate-y-0.5"
                >
                  <Plus size={12} /> Add FAQ
                </button>
              </div>
            </fieldset>

            <div className={`rounded-2xl border-[3px] border-[#10163a] p-4 text-sm font-bold shadow-[4px_4px_0_#10163a] ${hasUnsaved ? 'bg-[#eef3ff] text-[#1e3a8a]' : 'bg-[#fff4eb] text-[#9a4a10]'}`}>
              <Save className="mr-2 inline h-4 w-4" />
              {hasUnsaved
                ? 'You have unsaved changes. Click "Save changes" above to push them live.'
                : savedAt
                ? `Last saved at ${savedAt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}. All changes are live.`
                : 'Make edits above and hit "Save changes" when ready to push to the live site.'}
              <p className="mt-2 text-xs leading-6 opacity-70">
                Auto turn-off and replacement publishing run via cron. Notifications go to <code className="font-mono">n.ragavendar@gmail.com</code>.
              </p>
              {saveError ? <p className="mt-2 text-xs leading-6 text-[#b42318]">{saveError}</p> : null}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  )

  if (embedded) {
    return panelContent
  }

  return (
    <main className="min-h-screen bg-[#f0f3ff] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
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
          <div className="flex flex-wrap items-center justify-end gap-3">
            <span className="hidden rounded-full border-2 border-white/20 bg-white/10 px-3 py-1 text-xs font-black text-white/70 md:inline-flex">
              {userEmail}
            </span>
            <div className="flex gap-2">
              <span className="rounded-full border-2 border-[#22c55e] bg-[#22c55e]/15 px-3 py-1 text-xs font-black text-[#22c55e]">
                {masterclasses.filter((m) => m.status === 'live').length} Live
              </span>
              <span className="rounded-full border-2 border-white/20 bg-white/10 px-3 py-1 text-xs font-black text-white/60">
                {masterclasses.filter((m) => m.status === 'draft').length} Draft
              </span>
            </div>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-white px-4 py-2.5 text-sm font-black text-[#10163a] shadow-[4px_4px_0_rgba(0,0,0,0.3)] transition hover:-translate-y-0.5"
            >
              <LogOut size={15} />
              Sign Out
            </button>
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

        {panelContent}
      </div>
    </main>
  )
}
