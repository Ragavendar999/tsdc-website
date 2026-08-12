'use client'

import { Plus, Save, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { defaultAboutPage, type AboutPageContent } from '@/app/lib/aboutPage'

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

export default function AboutPageTab() {
  const [content, setContent] = useState<AboutPageContent>(defaultAboutPage)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    fetch('/api/content/aboutPage')
      .then((res) => res.json())
      .then((payload: { value?: AboutPageContent }) => {
        if (payload.value) setContent(payload.value)
      })
      .catch(() => setMessage({ type: 'error', text: 'Failed to load about page — showing defaults.' }))
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)
    try {
      const response = await fetch('/api/content/aboutPage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      })
      const payload = (await response.json()) as { value?: AboutPageContent; error?: string }
      if (!response.ok) throw new Error(payload.error || 'Failed to save')
      if (payload.value) setContent(payload.value)
      setMessage({ type: 'success', text: 'About page saved.' })
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to save' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-sm font-semibold text-[#667085]">Loading about page...</p>

  const { hero, stats, journey, values, people, reviews, cta } = content

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black tracking-[-0.03em] text-[#10163a]">About Page</h2>
          <p className="text-sm text-[#667085]">Edit the content shown on /about.</p>
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
        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className={labelClass}>Eyebrow</span>
            <input className={inputClass} value={hero.eyebrow} onChange={(e) => setContent({ ...content, hero: { ...hero, eyebrow: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>CTA label</span>
            <input className={inputClass} value={hero.ctaLabel} onChange={(e) => setContent({ ...content, hero: { ...hero, ctaLabel: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Title line 1</span>
            <input className={inputClass} value={hero.titleLine1} onChange={(e) => setContent({ ...content, hero: { ...hero, titleLine1: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Title highlight</span>
            <input className={inputClass} value={hero.titleHighlight} onChange={(e) => setContent({ ...content, hero: { ...hero, titleHighlight: e.target.value } })} />
          </label>
          <label className="sm:col-span-2">
            <span className={labelClass}>Description</span>
            <textarea className={inputClass} rows={2} value={hero.description} onChange={(e) => setContent({ ...content, hero: { ...hero, description: e.target.value } })} />
          </label>
          <label className="sm:col-span-2">
            <span className={labelClass}>Hero image</span>
            <input className={inputClass} value={hero.heroImage} onChange={(e) => setContent({ ...content, hero: { ...hero, heroImage: e.target.value } })} />
          </label>
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Stats</h3>
        <div className="space-y-2">
          {stats.map((stat, i) => (
            <div key={i} className="flex gap-2">
              <input className={inputClass} value={stat.value} placeholder="Value" onChange={(e) => setContent({ ...content, stats: stats.map((s, idx) => (idx === i ? { ...s, value: e.target.value } : s)) })} />
              <input className={inputClass} value={stat.label} placeholder="Label" onChange={(e) => setContent({ ...content, stats: stats.map((s, idx) => (idx === i ? { ...s, label: e.target.value } : s)) })} />
              <button onClick={() => setContent({ ...content, stats: stats.filter((_, idx) => idx !== i) })} className="shrink-0 text-[#b42318]">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button onClick={() => setContent({ ...content, stats: [...stats, { value: '', label: '' }] })} className={smallBtn}>
            <Plus size={13} /> Add stat
          </button>
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Journey</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <label>
            <span className={labelClass}>Eyebrow</span>
            <input className={inputClass} value={journey.eyebrow} onChange={(e) => setContent({ ...content, journey: { ...journey, eyebrow: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Heading line 1</span>
            <input className={inputClass} value={journey.headingLine1} onChange={(e) => setContent({ ...content, journey: { ...journey, headingLine1: e.target.value } })} />
          </label>
          <label className="sm:col-span-2">
            <span className={labelClass}>Heading highlight</span>
            <input className={inputClass} value={journey.headingHighlight} onChange={(e) => setContent({ ...content, journey: { ...journey, headingHighlight: e.target.value } })} />
          </label>
          <label className="sm:col-span-2">
            <span className={labelClass}>Description</span>
            <textarea className={inputClass} rows={2} value={journey.description} onChange={(e) => setContent({ ...content, journey: { ...journey, description: e.target.value } })} />
          </label>
          <div className="sm:col-span-2">
            <span className={labelClass}>Checklist</span>
            <ListEditor items={journey.checklist} onChange={(checklist) => setContent({ ...content, journey: { ...journey, checklist } })} />
          </div>
        </div>
        <div className="mt-4 space-y-3">
          <span className={labelClass}>Timeline (title / description / year)</span>
          {journey.timeline.map((item, i) => (
            <div key={i} className="grid gap-2 sm:grid-cols-[1fr_2fr_0.5fr_auto]">
              <input className={inputClass} value={item.title} placeholder="Title" onChange={(e) => setContent({ ...content, journey: { ...journey, timeline: journey.timeline.map((t, idx) => (idx === i ? { ...t, title: e.target.value } : t)) } })} />
              <input className={inputClass} value={item.description} placeholder="Description" onChange={(e) => setContent({ ...content, journey: { ...journey, timeline: journey.timeline.map((t, idx) => (idx === i ? { ...t, description: e.target.value } : t)) } })} />
              <input className={inputClass} value={item.year} placeholder="Year" onChange={(e) => setContent({ ...content, journey: { ...journey, timeline: journey.timeline.map((t, idx) => (idx === i ? { ...t, year: e.target.value } : t)) } })} />
              <button onClick={() => setContent({ ...content, journey: { ...journey, timeline: journey.timeline.filter((_, idx) => idx !== i) } })} className="shrink-0 text-[#b42318]">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button onClick={() => setContent({ ...content, journey: { ...journey, timeline: [...journey.timeline, { title: '', description: '', year: '' }] } })} className={smallBtn}>
            <Plus size={13} /> Add milestone
          </button>
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Values</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <label>
            <span className={labelClass}>Eyebrow</span>
            <input className={inputClass} value={values.eyebrow} onChange={(e) => setContent({ ...content, values: { ...values, eyebrow: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Heading</span>
            <input className={inputClass} value={values.heading} onChange={(e) => setContent({ ...content, values: { ...values, heading: e.target.value } })} />
          </label>
        </div>
        <div className="mt-3 space-y-2">
          {values.items.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input className={inputClass} value={item.title} placeholder="Title" onChange={(e) => setContent({ ...content, values: { ...values, items: values.items.map((v, idx) => (idx === i ? { ...v, title: e.target.value } : v)) } })} />
              <input className={inputClass} value={item.description} placeholder="Description" onChange={(e) => setContent({ ...content, values: { ...values, items: values.items.map((v, idx) => (idx === i ? { ...v, description: e.target.value } : v)) } })} />
              <button onClick={() => setContent({ ...content, values: { ...values, items: values.items.filter((_, idx) => idx !== i) } })} className="shrink-0 text-[#b42318]">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button onClick={() => setContent({ ...content, values: { ...values, items: [...values.items, { title: '', description: '' }] } })} className={smallBtn}>
            <Plus size={13} /> Add value
          </button>
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">People / team</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <label>
            <span className={labelClass}>Eyebrow</span>
            <input className={inputClass} value={people.eyebrow} onChange={(e) => setContent({ ...content, people: { ...people, eyebrow: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Heading</span>
            <input className={inputClass} value={people.heading} onChange={(e) => setContent({ ...content, people: { ...people, heading: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Aside image</span>
            <input className={inputClass} value={people.asideImage} onChange={(e) => setContent({ ...content, people: { ...people, asideImage: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Aside CTA label</span>
            <input className={inputClass} value={people.asideCtaLabel} onChange={(e) => setContent({ ...content, people: { ...people, asideCtaLabel: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Aside heading (use \n for line break)</span>
            <input className={inputClass} value={people.asideHeading} onChange={(e) => setContent({ ...content, people: { ...people, asideHeading: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Aside description</span>
            <input className={inputClass} value={people.asideDescription} onChange={(e) => setContent({ ...content, people: { ...people, asideDescription: e.target.value } })} />
          </label>
        </div>
        <div className="mt-4 space-y-2">
          <span className={labelClass}>Team members (name / role / image)</span>
          {people.team.map((member, i) => (
            <div key={i} className="grid gap-2 sm:grid-cols-[1fr_1fr_1.5fr_auto]">
              <input className={inputClass} value={member.name} placeholder="Name" onChange={(e) => setContent({ ...content, people: { ...people, team: people.team.map((m, idx) => (idx === i ? { ...m, name: e.target.value } : m)) } })} />
              <input className={inputClass} value={member.role} placeholder="Role" onChange={(e) => setContent({ ...content, people: { ...people, team: people.team.map((m, idx) => (idx === i ? { ...m, role: e.target.value } : m)) } })} />
              <input className={inputClass} value={member.image} placeholder="Image path" onChange={(e) => setContent({ ...content, people: { ...people, team: people.team.map((m, idx) => (idx === i ? { ...m, image: e.target.value } : m)) } })} />
              <button onClick={() => setContent({ ...content, people: { ...people, team: people.team.filter((_, idx) => idx !== i) } })} className="shrink-0 text-[#b42318]">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button onClick={() => setContent({ ...content, people: { ...people, team: [...people.team, { name: '', role: '', image: '' }] } })} className={smallBtn}>
            <Plus size={13} /> Add team member
          </button>
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Reviews</h3>
        <label className="mb-3 block">
          <span className={labelClass}>Eyebrow</span>
          <input className={inputClass} value={reviews.eyebrow} onChange={(e) => setContent({ ...content, reviews: { ...reviews, eyebrow: e.target.value } })} />
        </label>
        <div className="space-y-3">
          {reviews.items.map((review, i) => (
            <div key={i} className="rounded-xl border-[3px] border-[#10163a]/20 p-3">
              <div className="grid gap-2 sm:grid-cols-2">
                <input className={inputClass} value={review.name} placeholder="Name" onChange={(e) => setContent({ ...content, reviews: { ...reviews, items: reviews.items.map((r, idx) => (idx === i ? { ...r, name: e.target.value } : r)) } })} />
                <input className={inputClass} value={review.role} placeholder="Role" onChange={(e) => setContent({ ...content, reviews: { ...reviews, items: reviews.items.map((r, idx) => (idx === i ? { ...r, role: e.target.value } : r)) } })} />
              </div>
              <textarea className={`${inputClass} mt-2`} rows={2} value={review.quote} placeholder="Quote" onChange={(e) => setContent({ ...content, reviews: { ...reviews, items: reviews.items.map((r, idx) => (idx === i ? { ...r, quote: e.target.value } : r)) } })} />
              <button onClick={() => setContent({ ...content, reviews: { ...reviews, items: reviews.items.filter((_, idx) => idx !== i) } })} className="mt-2 flex items-center gap-1.5 text-xs font-black text-[#b42318] hover:underline">
                <Trash2 size={13} /> Remove review
              </button>
            </div>
          ))}
          <button onClick={() => setContent({ ...content, reviews: { ...reviews, items: [...reviews.items, { name: '', role: '', quote: '' }] } })} className={smallBtn}>
            <Plus size={13} /> Add review
          </button>
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Final CTA</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className={labelClass}>Heading</span>
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
            <span className={labelClass}>Explore courses link label</span>
            <input className={inputClass} value={cta.exploreCoursesLabel} onChange={(e) => setContent({ ...content, cta: { ...cta, exploreCoursesLabel: e.target.value } })} />
          </label>
        </div>
      </div>
    </div>
  )
}
