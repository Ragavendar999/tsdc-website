'use client'

import { ExternalLink, Eye, Plus, Save, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import {
  defaultMasterclassPageContent,
  defaultMasterclasses,
  fetchMasterclassPageContent,
  fetchMasterclasses,
  saveMasterclassPageContentToApi,
  saveMasterclassesToApi,
  type Masterclass,
  type MasterclassPageContent,
} from '@/app/lib/masterclasses'

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

const inputClass =
  'w-full rounded-xl border-[3px] border-[#10163a] bg-[#f8f9ff] px-3.5 py-2.5 text-sm font-semibold text-[#10163a] outline-none transition focus:border-[#3244b5]'
const labelClass = 'mb-1.5 block text-xs font-black uppercase tracking-[0.1em] text-[#667085]'

export default function MasterclassesTab() {
  const [masterclasses, setMasterclasses] = useState<Masterclass[]>([])
  const [activeId, setActiveId] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const [pageContent, setPageContent] = useState<MasterclassPageContent>(defaultMasterclassPageContent)
  const [pageContentLoading, setPageContentLoading] = useState(true)
  const [pageContentSaving, setPageContentSaving] = useState(false)
  const [pageContentMessage, setPageContentMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const active = useMemo(
    () => masterclasses.find((m) => m.id === activeId) || masterclasses[0],
    [activeId, masterclasses]
  )

  useEffect(() => {
    fetchMasterclasses()
      .then((items) => {
        setMasterclasses(items)
        setActiveId(items[0]?.id || '')
      })
      .finally(() => setLoading(false))
    fetchMasterclassPageContent()
      .then(setPageContent)
      .finally(() => setPageContentLoading(false))
  }, [])

  const updateActive = (patch: Partial<Masterclass>) => {
    setMasterclasses((prev) => prev.map((item) => (item.id === active?.id ? { ...item, ...patch } : item)))
  }

  const updateHeroStat = (index: number, patch: Partial<{ value: string; label: string }>) => {
    setPageContent((prev) => ({
      ...prev,
      heroStats: prev.heroStats.map((stat, i) => (i === index ? { ...stat, ...patch } : stat)),
    }))
  }

  const updateWhyAttend = (index: number, patch: Partial<{ title: string; description: string }>) => {
    setPageContent((prev) => ({
      ...prev,
      whyAttend: prev.whyAttend.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    }))
  }

  const updateTestimonial = (index: number, patch: Partial<{ name: string; role: string; quote: string }>) => {
    setPageContent((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    }))
  }

  const addTestimonial = () => {
    setPageContent((prev) => ({
      ...prev,
      testimonials: [...prev.testimonials, { name: '', role: '', quote: '' }],
    }))
  }

  const removeTestimonial = (index: number) => {
    setPageContent((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((_, i) => i !== index),
    }))
  }

  const handleSavePageContent = async () => {
    setPageContentSaving(true)
    setPageContentMessage(null)
    try {
      const saved = await saveMasterclassPageContentToApi(pageContent)
      setPageContent(saved)
      setPageContentMessage({ type: 'success', text: 'Masterclasses page content saved.' })
    } catch (error) {
      setPageContentMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to save' })
    } finally {
      setPageContentSaving(false)
    }
  }

  const updateJson = (key: keyof Masterclass, value: string) => {
    try {
      updateActive({ [key]: JSON.parse(value) } as Partial<Masterclass>)
    } catch {
      alert('Invalid JSON. Please check commas, quotes, and brackets.')
    }
  }

  const handleSaveAll = async () => {
    setSaving(true)
    setMessage(null)
    try {
      const saved = await saveMasterclassesToApi(masterclasses)
      setMasterclasses(saved)
      setMessage({ type: 'success', text: 'Masterclasses saved.' })
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to save' })
    } finally {
      setSaving(false)
    }
  }

  const handleAdd = () => {
    const next = emptyMasterclass()
    setMasterclasses((prev) => [next, ...prev])
    setActiveId(next.id)
  }

  const handleDuplicate = () => {
    if (!active) return
    const copy: Masterclass = {
      ...active,
      id: `masterclass-${Date.now()}`,
      slug: `${active.slug}-copy`,
      title: `${active.title} Copy`,
      status: 'draft',
    }
    setMasterclasses((prev) => [copy, ...prev])
    setActiveId(copy.id)
  }

  const handleDelete = () => {
    if (!active) return
    if (!confirm(`Remove "${active.title}"? This takes effect after you click Save all changes.`)) return
    const remaining = masterclasses.filter((m) => m.id !== active.id)
    setMasterclasses(remaining)
    setActiveId(remaining[0]?.id || '')
  }

  if (loading) return <p className="text-sm font-semibold text-[#667085]">Loading masterclasses...</p>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black tracking-[-0.03em] text-[#10163a]">Masterclasses</h2>
          <p className="text-sm text-[#667085]">Edit locally, then save all changes to publish to the live site.</p>
        </div>
        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl border-[3px] border-[#10163a] bg-[#3244b5] px-4 py-2.5 text-sm font-black text-white shadow-[3px_3px_0_#10163a] transition hover:-translate-y-0.5 disabled:opacity-60"
        >
          <Save size={15} />
          {saving ? 'Saving...' : 'Save all changes'}
        </button>
      </div>

      {message && (
        <p
          className={`rounded-xl border-[3px] px-4 py-2.5 text-sm font-bold shadow-[3px_3px_0] ${
            message.type === 'success'
              ? 'border-[#15803d] bg-[#f0fdf4] text-[#15803d] shadow-[#15803d]'
              : 'border-[#b42318] bg-[#fff1f2] text-[#b42318] shadow-[#b42318]'
          }`}
        >
          {message.text}
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-[0.32fr_0.68fr]">
        <aside className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#667085]">All masterclasses</p>
            <button onClick={handleAdd} className="flex items-center gap-1.5 rounded-lg border-[3px] border-[#10163a] bg-[#ff9736] px-2.5 py-1.5 text-xs font-black text-white shadow-[2px_2px_0_#10163a]">
              <Plus size={13} /> New
            </button>
          </div>
          {masterclasses.map((m) => (
            <div
              key={m.id}
              className={`overflow-hidden rounded-xl border-[3px] transition ${
                m.id === active?.id ? 'border-[#3244b5] bg-[#eef1ff] shadow-[4px_4px_0_#3244b5]' : 'border-[#10163a] bg-white shadow-[3px_3px_0_#10163a]'
              }`}
            >
              <button onClick={() => setActiveId(m.id)} className="w-full p-3 text-left">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-black leading-snug text-[#10163a]">{m.title}</p>
                  <span
                    className={`shrink-0 rounded-full border-2 px-2 py-0.5 text-[10px] font-black uppercase ${
                      m.status === 'live' ? 'border-[#16a34a] bg-[#dcfce7] text-[#16a34a]' : 'border-[#9ca3af] bg-[#f3f4f6] text-[#6b7280]'
                    }`}
                  >
                    {m.status}
                  </span>
                </div>
                <p className="mt-1 text-xs font-bold text-[#667085]">{m.category}</p>
              </button>
              <div className="flex gap-1.5 border-t-[3px] border-dashed border-[#10163a]/15 px-3 py-2">
                <Link href={`/masterclasses/${m.slug}`} target="_blank" className="inline-flex items-center gap-1.5 text-[10px] font-black text-[#3244b5] hover:underline">
                  <Eye size={11} /> Preview <ExternalLink size={9} />
                </Link>
              </div>
            </div>
          ))}
        </aside>

        {active && (
          <section className="rounded-2xl border-[3px] border-[#10163a] bg-white shadow-[6px_6px_0_#10163a]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-[3px] border-[#10163a] p-5">
              <h3 className="text-lg font-black text-[#10163a]">{active.title}</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => updateActive({ status: active.status === 'live' ? 'draft' : 'live' })}
                  className={`rounded-lg border-[3px] border-[#10163a] px-3.5 py-2 text-xs font-black text-white shadow-[3px_3px_0_#10163a] transition hover:-translate-y-0.5 ${
                    active.status === 'live' ? 'bg-[#667085]' : 'bg-[#22c55e]'
                  }`}
                >
                  {active.status === 'live' ? 'Unpublish' : 'Publish'}
                </button>
                <button onClick={handleDuplicate} className="rounded-lg border-[3px] border-[#10163a] bg-[#fa8a43] px-3.5 py-2 text-xs font-black text-white shadow-[3px_3px_0_#10163a] transition hover:-translate-y-0.5">
                  Duplicate
                </button>
                <button onClick={handleDelete} className="flex items-center gap-1.5 rounded-lg border-[3px] border-[#10163a] bg-[#ea6865] px-3.5 py-2 text-xs font-black text-white shadow-[3px_3px_0_#10163a] transition hover:-translate-y-0.5">
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>

            <div className="space-y-5 p-5">
              <fieldset className="rounded-xl border-[3px] border-[#10163a] p-4">
                <legend className="px-2 text-xs font-black uppercase tracking-[0.14em] text-[#3244b5]">Basic info</legend>
                <div className="mt-2 grid gap-3 md:grid-cols-2">
                  {(['title', 'slug', 'badge', 'category', 'hook', 'backgroundImage', 'cardImage'] as const).map((key) => (
                    <label key={key}>
                      <span className={labelClass}>{key}</span>
                      <input className={inputClass} value={String(active[key] ?? '')} onChange={(e) => updateActive({ [key]: e.target.value } as Partial<Masterclass>)} />
                    </label>
                  ))}
                  <label>
                    <span className={labelClass}>Level</span>
                    <select
                      className={inputClass}
                      value={active.level || 'Beginner'}
                      onChange={(e) => updateActive({ level: e.target.value as Masterclass['level'] })}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </label>
                  <label>
                    <span className={labelClass}>Background style</span>
                    <select
                      className={inputClass}
                      value={active.backgroundStyle || 'midnight'}
                      onChange={(e) => updateActive({ backgroundStyle: e.target.value as Masterclass['backgroundStyle'] })}
                    >
                      <option value="midnight">Midnight black</option>
                      <option value="blueprint">Blueprint blue</option>
                      <option value="ember">Ember orange</option>
                      <option value="violet">Violet stage</option>
                    </select>
                  </label>
                  <label className="md:col-span-2">
                    <span className={labelClass}>Description</span>
                    <textarea className={inputClass} rows={3} value={active.description} onChange={(e) => updateActive({ description: e.target.value })} />
                  </label>
                </div>
              </fieldset>

              <fieldset className="rounded-xl border-[3px] border-[#10163a] p-4">
                <legend className="px-2 text-xs font-black uppercase tracking-[0.14em] text-[#fa8a43]">Schedule &amp; links</legend>
                <div className="mt-2 grid gap-3 md:grid-cols-2">
                  {(['date', 'eventDate', 'time', 'mode', 'discountLabel', 'whatsappLink', 'turnOffAt', 'trailerVideoUrl'] as const).map((key) => (
                    <label key={key}>
                      <span className={labelClass}>{key}</span>
                      <input className={inputClass} value={String(active[key] ?? '')} onChange={(e) => updateActive({ [key]: e.target.value } as Partial<Masterclass>)} />
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="rounded-xl border-[3px] border-[#10163a] p-4">
                <legend className="px-2 text-xs font-black uppercase tracking-[0.14em] text-[#db4b87]">Pricing &amp; seats</legend>
                <div className="mt-2 grid gap-3 md:grid-cols-2">
                  {(['price', 'originalPrice', 'seatsTotal', 'seatsTaken'] as const).map((key) => (
                    <label key={key}>
                      <span className={labelClass}>{key}</span>
                      <input
                        type="number"
                        className={inputClass}
                        value={Number(active[key])}
                        onChange={(e) => updateActive({ [key]: Number(e.target.value) } as Partial<Masterclass>)}
                      />
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="rounded-xl border-[3px] border-[#10163a] p-4">
                <legend className="px-2 text-xs font-black uppercase tracking-[0.14em] text-[#3244b5]">Content (JSON)</legend>
                <div className="mt-2 space-y-3">
                  {(['outcomes', 'modules', 'includes', 'audience', 'faqs', 'instructor'] as const).map((key) => (
                    <label key={key} className="block">
                      <span className={labelClass}>{key}</span>
                      <textarea
                        defaultValue={JSON.stringify(active[key] ?? (key === 'instructor' ? {} : []), null, 2)}
                        rows={key === 'modules' || key === 'outcomes' ? 8 : 5}
                        onBlur={(e) => updateJson(key, e.target.value)}
                        className="w-full rounded-xl border-[3px] border-[#10163a] bg-[#0e1330] px-3.5 py-2.5 font-mono text-xs text-[#a5b4fc] outline-none transition focus:border-[#3244b5]"
                      />
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
          </section>
        )}
      </div>

      <div className="rounded-2xl border-[3px] border-[#10163a] bg-white shadow-[6px_6px_0_#10163a]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-[3px] border-[#10163a] p-5">
          <div>
            <h3 className="text-lg font-black text-[#10163a]">Masterclasses page content</h3>
            <p className="text-sm text-[#667085]">
              Hero stats, why-attend copy, and testimonials shown on the public /masterclasses listing page.
            </p>
          </div>
          <button
            onClick={handleSavePageContent}
            disabled={pageContentSaving}
            className="flex items-center gap-2 rounded-xl border-[3px] border-[#10163a] bg-[#3244b5] px-4 py-2.5 text-sm font-black text-white shadow-[3px_3px_0_#10163a] transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            <Save size={15} />
            {pageContentSaving ? 'Saving...' : 'Save page content'}
          </button>
        </div>

        {pageContentMessage && (
          <div className="px-5 pt-5">
            <p
              className={`rounded-xl border-[3px] px-4 py-2.5 text-sm font-bold shadow-[3px_3px_0] ${
                pageContentMessage.type === 'success'
                  ? 'border-[#15803d] bg-[#f0fdf4] text-[#15803d] shadow-[#15803d]'
                  : 'border-[#b42318] bg-[#fff1f2] text-[#b42318] shadow-[#b42318]'
              }`}
            >
              {pageContentMessage.text}
            </p>
          </div>
        )}

        {pageContentLoading ? (
          <p className="p-5 text-sm font-semibold text-[#667085]">Loading page content...</p>
        ) : (
          <div className="space-y-5 p-5">
            <fieldset className="rounded-xl border-[3px] border-[#10163a] p-4">
              <legend className="px-2 text-xs font-black uppercase tracking-[0.14em] text-[#3244b5]">
                Hero stats — leave value blank to hide a tile
              </legend>
              <div className="mt-2 grid gap-3 md:grid-cols-2">
                {pageContent.heroStats.map((stat, index) => (
                  <div key={index} className="grid grid-cols-2 gap-2">
                    <label>
                      <span className={labelClass}>Value</span>
                      <input
                        className={inputClass}
                        placeholder="e.g. 25+"
                        value={stat.value}
                        onChange={(e) => updateHeroStat(index, { value: e.target.value })}
                      />
                    </label>
                    <label>
                      <span className={labelClass}>Label</span>
                      <input className={inputClass} value={stat.label} onChange={(e) => updateHeroStat(index, { label: e.target.value })} />
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>

            <fieldset className="rounded-xl border-[3px] border-[#10163a] p-4">
              <legend className="px-2 text-xs font-black uppercase tracking-[0.14em] text-[#fa8a43]">Why attend</legend>
              <div className="mt-2 space-y-3">
                {pageContent.whyAttend.map((item, index) => (
                  <div key={index} className="grid gap-2 md:grid-cols-[0.35fr_0.65fr]">
                    <label>
                      <span className={labelClass}>Title</span>
                      <input className={inputClass} value={item.title} onChange={(e) => updateWhyAttend(index, { title: e.target.value })} />
                    </label>
                    <label>
                      <span className={labelClass}>Description</span>
                      <input
                        className={inputClass}
                        value={item.description}
                        onChange={(e) => updateWhyAttend(index, { description: e.target.value })}
                      />
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>

            <fieldset className="rounded-xl border-[3px] border-[#10163a] p-4">
              <div className="mb-2 flex items-center justify-between">
                <legend className="px-2 text-xs font-black uppercase tracking-[0.14em] text-[#db4b87]">
                  Testimonials — hidden on the site until at least one is added
                </legend>
                <button
                  onClick={addTestimonial}
                  className="flex items-center gap-1.5 rounded-lg border-[3px] border-[#10163a] bg-[#ff9736] px-2.5 py-1.5 text-xs font-black text-white shadow-[2px_2px_0_#10163a]"
                >
                  <Plus size={13} /> Add testimonial
                </button>
              </div>
              <div className="space-y-3">
                {pageContent.testimonials.length === 0 && (
                  <p className="text-sm font-semibold text-[#98a2b3]">No testimonials yet — add real student feedback here.</p>
                )}
                {pageContent.testimonials.map((testimonial, index) => (
                  <div key={index} className="rounded-xl border-[3px] border-[#10163a] p-3">
                    <div className="grid gap-2 md:grid-cols-2">
                      <label>
                        <span className={labelClass}>Name</span>
                        <input
                          className={inputClass}
                          value={testimonial.name}
                          onChange={(e) => updateTestimonial(index, { name: e.target.value })}
                        />
                      </label>
                      <label>
                        <span className={labelClass}>Role</span>
                        <input
                          className={inputClass}
                          placeholder="e.g. UI/UX Design Student"
                          value={testimonial.role}
                          onChange={(e) => updateTestimonial(index, { role: e.target.value })}
                        />
                      </label>
                    </div>
                    <label className="mt-2 block">
                      <span className={labelClass}>Quote</span>
                      <textarea
                        className={inputClass}
                        rows={2}
                        value={testimonial.quote}
                        onChange={(e) => updateTestimonial(index, { quote: e.target.value })}
                      />
                    </label>
                    <button
                      onClick={() => removeTestimonial(index)}
                      className="mt-2 flex items-center gap-1.5 rounded-lg border-[3px] border-[#10163a] bg-[#ea6865] px-2.5 py-1.5 text-xs font-black text-white shadow-[2px_2px_0_#10163a]"
                    >
                      <Trash2 size={13} /> Remove
                    </button>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        )}
      </div>
    </div>
  )
}
