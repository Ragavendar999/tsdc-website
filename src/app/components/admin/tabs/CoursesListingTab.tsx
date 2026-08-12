'use client'

import { Plus, Save, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { defaultCoursesListing, type CoursesListingContent } from '@/app/lib/coursesListing'

const inputClass =
  'w-full rounded-xl border-[3px] border-[#10163a] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#10163a] outline-none transition focus:border-[#3244b5]'
const labelClass = 'mb-1.5 block text-xs font-black uppercase tracking-[0.1em] text-[#3244b5]'
const cardClass = 'rounded-2xl border-[3px] border-[#10163a] bg-white p-6 shadow-[5px_5px_0_#10163a]'
const smallBtn =
  'flex items-center gap-1.5 rounded-lg border-[3px] border-[#10163a] bg-white px-2.5 py-1.5 text-xs font-black text-[#10163a] shadow-[2px_2px_0_#10163a] transition hover:-translate-y-0.5'

function ListEditor({ items, onChange }: { items: string[]; onChange: (items: string[]) => void }) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input className={inputClass} value={item} onChange={(e) => onChange(items.map((it, idx) => (idx === i ? e.target.value : it)))} />
          <button onClick={() => onChange(items.filter((_, idx) => idx !== i))} className="shrink-0 text-[#b42318]">
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <button onClick={() => onChange([...items, ''])} className={smallBtn}>
        <Plus size={13} /> Add
      </button>
    </div>
  )
}

function StatListEditor({ items, onChange }: { items: { value: string; label: string }[]; onChange: (items: { value: string; label: string }[]) => void }) {
  return (
    <div className="space-y-2">
      {items.map((stat, i) => (
        <div key={i} className="flex gap-2">
          <input className={inputClass} value={stat.value} placeholder="Value" onChange={(e) => onChange(items.map((s, idx) => (idx === i ? { ...s, value: e.target.value } : s)))} />
          <input className={inputClass} value={stat.label} placeholder="Label" onChange={(e) => onChange(items.map((s, idx) => (idx === i ? { ...s, label: e.target.value } : s)))} />
          <button onClick={() => onChange(items.filter((_, idx) => idx !== i))} className="shrink-0 text-[#b42318]">
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <button onClick={() => onChange([...items, { value: '', label: '' }])} className={smallBtn}>
        <Plus size={13} /> Add
      </button>
    </div>
  )
}

export default function CoursesListingTab() {
  const [content, setContent] = useState<CoursesListingContent>(defaultCoursesListing)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    fetch('/api/content/coursesListing')
      .then((res) => res.json())
      .then((payload: { value?: CoursesListingContent }) => {
        if (payload.value) setContent(payload.value)
      })
      .catch(() => setMessage({ type: 'error', text: 'Failed to load courses listing — showing defaults.' }))
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)
    try {
      const response = await fetch('/api/content/coursesListing', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      })
      const payload = (await response.json()) as { value?: CoursesListingContent; error?: string }
      if (!response.ok) throw new Error(payload.error || 'Failed to save')
      if (payload.value) setContent(payload.value)
      setMessage({ type: 'success', text: 'Courses listing saved.' })
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to save' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-sm font-semibold text-[#667085]">Loading courses listing...</p>

  const { hero, listing, guide, benefits, stats, cta } = content

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black tracking-[-0.03em] text-[#10163a]">Courses Listing</h2>
          <p className="text-sm text-[#667085]">Edit the /courses grid page. (Individual course pages are a separate tab.)</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl border-[3px] border-[#10163a] bg-[#3244b5] px-4 py-2.5 text-sm font-black text-white shadow-[3px_3px_0_#10163a] transition hover:-translate-y-0.5 disabled:opacity-60"
        >
          <Save size={15} />
          {saving ? 'Saving...' : 'Save changes'}
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

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Hero</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <label>
            <span className={labelClass}>Eyebrow</span>
            <input className={inputClass} value={hero.eyebrow} onChange={(e) => setContent({ ...content, hero: { ...hero, eyebrow: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Title line 1</span>
            <input className={inputClass} value={hero.titleLine1} onChange={(e) => setContent({ ...content, hero: { ...hero, titleLine1: e.target.value } })} />
          </label>
          <label className="sm:col-span-2">
            <span className={labelClass}>Title highlight</span>
            <input className={inputClass} value={hero.titleHighlight} onChange={(e) => setContent({ ...content, hero: { ...hero, titleHighlight: e.target.value } })} />
          </label>
          <label className="sm:col-span-2">
            <span className={labelClass}>Description</span>
            <textarea className={inputClass} rows={2} value={hero.description} onChange={(e) => setContent({ ...content, hero: { ...hero, description: e.target.value } })} />
          </label>
          <div className="sm:col-span-2">
            <span className={labelClass}>Hero points</span>
            <ListEditor items={hero.points} onChange={(points) => setContent({ ...content, hero: { ...hero, points } })} />
          </div>
        </div>
      </div>

      <div className={cardClass}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Course cards</h3>
        </div>
        <div className="space-y-4">
          {listing.courses.map((course, i) => (
            <div key={i} className="rounded-xl border-[3px] border-[#10163a]/20 p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {(['title', 'href', 'image', 'accent', 'duration', 'classes', 'projects', 'tools'] as const).map((key) => (
                  <label key={key}>
                    <span className={labelClass}>{key}</span>
                    <input
                      className={inputClass}
                      value={course[key]}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          listing: { ...listing, courses: listing.courses.map((c, idx) => (idx === i ? { ...c, [key]: e.target.value } : c)) },
                        })
                      }
                    />
                  </label>
                ))}
                <label className="sm:col-span-2">
                  <span className={labelClass}>Copy</span>
                  <textarea
                    className={inputClass}
                    rows={2}
                    value={course.copy}
                    onChange={(e) =>
                      setContent({ ...content, listing: { ...listing, courses: listing.courses.map((c, idx) => (idx === i ? { ...c, copy: e.target.value } : c)) } })
                    }
                  />
                </label>
              </div>
              <button
                onClick={() => setContent({ ...content, listing: { ...listing, courses: listing.courses.filter((_, idx) => idx !== i) } })}
                className="mt-2 flex items-center gap-1.5 text-xs font-black text-[#b42318] hover:underline"
              >
                <Trash2 size={13} /> Remove course card
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              setContent({
                ...content,
                listing: {
                  ...listing,
                  courses: [...listing.courses, { title: '', href: '', image: '', accent: '#3244b5', duration: '', classes: '', projects: '', tools: '', copy: '' }],
                },
              })
            }
            className={smallBtn}
          >
            <Plus size={13} /> Add course card
          </button>
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Guidance banner</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <label>
            <span className={labelClass}>Heading</span>
            <input className={inputClass} value={guide.heading} onChange={(e) => setContent({ ...content, guide: { ...guide, heading: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Primary button</span>
            <input className={inputClass} value={guide.primaryButtonLabel} onChange={(e) => setContent({ ...content, guide: { ...guide, primaryButtonLabel: e.target.value } })} />
          </label>
          <label className="sm:col-span-2">
            <span className={labelClass}>Description</span>
            <input className={inputClass} value={guide.description} onChange={(e) => setContent({ ...content, guide: { ...guide, description: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Secondary button</span>
            <input className={inputClass} value={guide.secondaryButtonLabel} onChange={(e) => setContent({ ...content, guide: { ...guide, secondaryButtonLabel: e.target.value } })} />
          </label>
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Benefits</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <label>
            <span className={labelClass}>Eyebrow</span>
            <input className={inputClass} value={benefits.eyebrow} onChange={(e) => setContent({ ...content, benefits: { ...benefits, eyebrow: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Heading</span>
            <input className={inputClass} value={benefits.heading} onChange={(e) => setContent({ ...content, benefits: { ...benefits, heading: e.target.value } })} />
          </label>
        </div>
        <div className="mt-3 space-y-2">
          {benefits.items.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input className={inputClass} value={item.title} placeholder="Title" onChange={(e) => setContent({ ...content, benefits: { ...benefits, items: benefits.items.map((b, idx) => (idx === i ? { ...b, title: e.target.value } : b)) } })} />
              <input className={inputClass} value={item.description} placeholder="Description" onChange={(e) => setContent({ ...content, benefits: { ...benefits, items: benefits.items.map((b, idx) => (idx === i ? { ...b, description: e.target.value } : b)) } })} />
              <button onClick={() => setContent({ ...content, benefits: { ...benefits, items: benefits.items.filter((_, idx) => idx !== i) } })} className="shrink-0 text-[#b42318]">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button onClick={() => setContent({ ...content, benefits: { ...benefits, items: [...benefits.items, { title: '', description: '' }] } })} className={smallBtn}>
            <Plus size={13} /> Add benefit
          </button>
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Stats strip</h3>
        <StatListEditor items={stats} onChange={(s) => setContent({ ...content, stats: s })} />
      </div>

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Final CTA</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <label>
            <span className={labelClass}>Heading (use \n for line break)</span>
            <input className={inputClass} value={cta.heading} onChange={(e) => setContent({ ...content, cta: { ...cta, heading: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Button label</span>
            <input className={inputClass} value={cta.buttonLabel} onChange={(e) => setContent({ ...content, cta: { ...cta, buttonLabel: e.target.value } })} />
          </label>
          <label className="sm:col-span-2">
            <span className={labelClass}>Description</span>
            <input className={inputClass} value={cta.description} onChange={(e) => setContent({ ...content, cta: { ...cta, description: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Explore link label</span>
            <input className={inputClass} value={cta.exploreLinkLabel} onChange={(e) => setContent({ ...content, cta: { ...cta, exploreLinkLabel: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Explore link href</span>
            <input className={inputClass} value={cta.exploreLinkHref} onChange={(e) => setContent({ ...content, cta: { ...cta, exploreLinkHref: e.target.value } })} />
          </label>
        </div>
        <div className="mt-3">
          <span className={labelClass}>Metrics</span>
          <StatListEditor items={cta.metrics} onChange={(metrics) => setContent({ ...content, cta: { ...cta, metrics } })} />
        </div>
      </div>
    </div>
  )
}
