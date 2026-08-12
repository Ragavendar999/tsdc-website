'use client'

import { Plus, Save, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { defaultContactPage, type ContactBenefitIcon, type ContactPageContent, type ContactWayIcon } from '@/app/lib/contactPage'

const inputClass =
  'w-full rounded-xl border-[3px] border-[#10163a] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#10163a] outline-none transition focus:border-[#3244b5]'
const labelClass = 'mb-1.5 block text-xs font-black uppercase tracking-[0.1em] text-[#3244b5]'
const cardClass = 'rounded-2xl border-[3px] border-[#10163a] bg-white p-6 shadow-[5px_5px_0_#10163a]'
const smallBtn =
  'flex items-center gap-1.5 rounded-lg border-[3px] border-[#10163a] bg-white px-2.5 py-1.5 text-xs font-black text-[#10163a] shadow-[2px_2px_0_#10163a] transition hover:-translate-y-0.5'

const wayIconOptions: ContactWayIcon[] = ['phone', 'chat', 'mail', 'map']
const benefitIconOptions: ContactBenefitIcon[] = ['education', 'calendar', 'team', 'help']

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

export default function ContactPageTab() {
  const [content, setContent] = useState<ContactPageContent>(defaultContactPage)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    fetch('/api/content/contactPage')
      .then((res) => res.json())
      .then((payload: { value?: ContactPageContent }) => {
        if (payload.value) setContent(payload.value)
      })
      .catch(() => setMessage({ type: 'error', text: 'Failed to load contact page — showing defaults.' }))
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)
    try {
      const response = await fetch('/api/content/contactPage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      })
      const payload = (await response.json()) as { value?: ContactPageContent; error?: string }
      if (!response.ok) throw new Error(payload.error || 'Failed to save')
      if (payload.value) setContent(payload.value)
      setMessage({ type: 'success', text: 'Contact page saved.' })
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to save' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-sm font-semibold text-[#667085]">Loading contact page...</p>

  const { hero, form, waysHeading, ways, map, benefits, faq, cta } = content

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black tracking-[-0.03em] text-[#10163a]">Contact Page</h2>
          <p className="text-sm text-[#667085]">
            Edit /contact. Phone, WhatsApp, email and address values come from the Site Settings tab — this tab edits copy and icon assignment only.
          </p>
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
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Hero &amp; form</h3>
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
          <label>
            <span className={labelClass}>Form heading</span>
            <input className={inputClass} value={form.heading} onChange={(e) => setContent({ ...content, form: { ...form, heading: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Form description</span>
            <input className={inputClass} value={form.description} onChange={(e) => setContent({ ...content, form: { ...form, description: e.target.value } })} />
          </label>
        </div>
        <div className="mt-3 space-y-2">
          <span className={labelClass}>Promise cards (title / copy)</span>
          {hero.promises.map((promise, i) => (
            <div key={i} className="flex gap-2">
              <input className={inputClass} value={promise.title} placeholder="Title" onChange={(e) => setContent({ ...content, hero: { ...hero, promises: hero.promises.map((p, idx) => (idx === i ? { ...p, title: e.target.value } : p)) } })} />
              <input className={inputClass} value={promise.copy} placeholder="Copy" onChange={(e) => setContent({ ...content, hero: { ...hero, promises: hero.promises.map((p, idx) => (idx === i ? { ...p, copy: e.target.value } : p)) } })} />
              <button onClick={() => setContent({ ...content, hero: { ...hero, promises: hero.promises.filter((_, idx) => idx !== i) } })} className="shrink-0 text-[#b42318]">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button onClick={() => setContent({ ...content, hero: { ...hero, promises: [...hero.promises, { title: '', copy: '' }] } })} className={smallBtn}>
            <Plus size={13} /> Add promise
          </button>
        </div>
      </div>

      <div className={cardClass}>
        <label className="mb-3 block max-w-sm">
          <span className={labelClass}>Ways heading</span>
          <input className={inputClass} value={waysHeading} onChange={(e) => setContent({ ...content, waysHeading: e.target.value })} />
        </label>
        <div className="space-y-2">
          {ways.map((way, i) => (
            <div key={i} className="flex gap-2">
              <input className={inputClass} value={way.title} placeholder="Title" onChange={(e) => setContent({ ...content, ways: ways.map((w, idx) => (idx === i ? { ...w, title: e.target.value } : w)) })} />
              <input className={inputClass} value={way.copy} placeholder="Copy" onChange={(e) => setContent({ ...content, ways: ways.map((w, idx) => (idx === i ? { ...w, copy: e.target.value } : w)) })} />
              <select className={inputClass} value={way.icon} onChange={(e) => setContent({ ...content, ways: ways.map((w, idx) => (idx === i ? { ...w, icon: e.target.value as ContactWayIcon } : w)) })}>
                {wayIconOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <button onClick={() => setContent({ ...content, ways: ways.filter((_, idx) => idx !== i) })} className="shrink-0 text-[#b42318]">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button onClick={() => setContent({ ...content, ways: [...ways, { title: '', copy: '', icon: 'phone' }] })} className={smallBtn}>
            <Plus size={13} /> Add way
          </button>
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Map</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <label>
            <span className={labelClass}>Heading</span>
            <input className={inputClass} value={map.heading} onChange={(e) => setContent({ ...content, map: { ...map, heading: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Address line</span>
            <input className={inputClass} value={map.addressLine} onChange={(e) => setContent({ ...content, map: { ...map, addressLine: e.target.value } })} />
          </label>
          <label className="sm:col-span-2">
            <span className={labelClass}>Google Maps embed URL</span>
            <input className={inputClass} value={map.embedUrl} onChange={(e) => setContent({ ...content, map: { ...map, embedUrl: e.target.value } })} />
          </label>
          <label className="sm:col-span-2">
            <span className={labelClass}>Directions URL</span>
            <input className={inputClass} value={map.directionsUrl} onChange={(e) => setContent({ ...content, map: { ...map, directionsUrl: e.target.value } })} />
          </label>
        </div>
      </div>

      <div className={cardClass}>
        <label className="mb-3 block max-w-sm">
          <span className={labelClass}>Benefits heading</span>
          <input className={inputClass} value={benefits.heading} onChange={(e) => setContent({ ...content, benefits: { ...benefits, heading: e.target.value } })} />
        </label>
        <div className="space-y-2">
          {benefits.items.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input className={inputClass} value={item.title} placeholder="Title" onChange={(e) => setContent({ ...content, benefits: { ...benefits, items: benefits.items.map((b, idx) => (idx === i ? { ...b, title: e.target.value } : b)) } })} />
              <input className={inputClass} value={item.description} placeholder="Description" onChange={(e) => setContent({ ...content, benefits: { ...benefits, items: benefits.items.map((b, idx) => (idx === i ? { ...b, description: e.target.value } : b)) } })} />
              <select className={inputClass} value={item.icon} onChange={(e) => setContent({ ...content, benefits: { ...benefits, items: benefits.items.map((b, idx) => (idx === i ? { ...b, icon: e.target.value as ContactBenefitIcon } : b)) } })}>
                {benefitIconOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <button onClick={() => setContent({ ...content, benefits: { ...benefits, items: benefits.items.filter((_, idx) => idx !== i) } })} className="shrink-0 text-[#b42318]">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button onClick={() => setContent({ ...content, benefits: { ...benefits, items: [...benefits.items, { title: '', description: '', icon: 'education' }] } })} className={smallBtn}>
            <Plus size={13} /> Add benefit
          </button>
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">FAQ</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <label>
            <span className={labelClass}>Eyebrow</span>
            <input className={inputClass} value={faq.eyebrow} onChange={(e) => setContent({ ...content, faq: { ...faq, eyebrow: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Heading</span>
            <input className={inputClass} value={faq.heading} onChange={(e) => setContent({ ...content, faq: { ...faq, heading: e.target.value } })} />
          </label>
          <label className="sm:col-span-2">
            <span className={labelClass}>Shared answer (shown for every question)</span>
            <textarea className={inputClass} rows={2} value={faq.genericAnswer} onChange={(e) => setContent({ ...content, faq: { ...faq, genericAnswer: e.target.value } })} />
          </label>
        </div>
        <div className="mt-3">
          <span className={labelClass}>Questions</span>
          <ListEditor items={faq.questions} onChange={(questions) => setContent({ ...content, faq: { ...faq, questions } })} />
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Final CTA</h3>
        <div className="grid gap-3 sm:grid-cols-2">
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
            <span className={labelClass}>Explore courses label</span>
            <input className={inputClass} value={cta.exploreLabel} onChange={(e) => setContent({ ...content, cta: { ...cta, exploreLabel: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Image</span>
            <input className={inputClass} value={cta.image} onChange={(e) => setContent({ ...content, cta: { ...cta, image: e.target.value } })} />
          </label>
        </div>
      </div>
    </div>
  )
}
