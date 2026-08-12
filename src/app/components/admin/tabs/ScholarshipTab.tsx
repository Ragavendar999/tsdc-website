'use client'

import { Plus, Save, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { defaultScholarshipPage, type ScholarshipPageContent } from '@/app/lib/scholarshipPage'

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

export default function ScholarshipTab() {
  const [content, setContent] = useState<ScholarshipPageContent>(defaultScholarshipPage)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    fetch('/api/content/scholarshipPage')
      .then((res) => res.json())
      .then((payload: { value?: ScholarshipPageContent }) => {
        if (payload.value) setContent(payload.value)
      })
      .catch(() => setMessage({ type: 'error', text: 'Failed to load scholarship page — showing defaults.' }))
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)
    try {
      const response = await fetch('/api/content/scholarshipPage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      })
      const payload = (await response.json()) as { value?: ScholarshipPageContent; error?: string }
      if (!response.ok) throw new Error(payload.error || 'Failed to save')
      if (payload.value) setContent(payload.value)
      setMessage({ type: 'success', text: 'Scholarship page saved.' })
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to save' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-sm font-semibold text-[#667085]">Loading scholarship page...</p>

  const { hero, tiers, features, formCard, process, faqSection } = content

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black tracking-[-0.03em] text-[#10163a]">Scholarship Campaign</h2>
          <p className="text-sm text-[#667085]">
            Edit /graphic-design-scholarship. Registration fee, deadline, and demo slots directly control the live payment flow — double-check before saving.
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
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Registration &amp; deadline</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <label>
            <span className={labelClass}>Campaign title</span>
            <input className={inputClass} value={content.campaignTitle} onChange={(e) => setContent({ ...content, campaignTitle: e.target.value })} />
          </label>
          <label>
            <span className={labelClass}>Registration fee (₹)</span>
            <input type="number" className={inputClass} value={content.registrationFee} onChange={(e) => setContent({ ...content, registrationFee: Number(e.target.value) })} />
          </label>
          <label>
            <span className={labelClass}>Deadline (ISO datetime, e.g. 2026-05-09T23:59:00+05:30)</span>
            <input className={inputClass} value={content.deadline} onChange={(e) => setContent({ ...content, deadline: e.target.value })} />
          </label>
          <label>
            <span className={labelClass}>Deadline label (display text)</span>
            <input className={inputClass} value={content.deadlineLabel} onChange={(e) => setContent({ ...content, deadlineLabel: e.target.value })} />
          </label>
        </div>
        <div className="mt-3">
          <span className={labelClass}>Demo slots</span>
          <ListEditor items={content.demoSlots} onChange={(demoSlots) => setContent({ ...content, demoSlots })} />
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Hero</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <label>
            <span className={labelClass}>Badge</span>
            <input className={inputClass} value={hero.badge} onChange={(e) => setContent({ ...content, hero: { ...hero, badge: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Hero image</span>
            <input className={inputClass} value={hero.heroImage} onChange={(e) => setContent({ ...content, hero: { ...hero, heroImage: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Title line 1</span>
            <input className={inputClass} value={hero.titleLine1} onChange={(e) => setContent({ ...content, hero: { ...hero, titleLine1: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Title highlight</span>
            <input className={inputClass} value={hero.titleHighlight} onChange={(e) => setContent({ ...content, hero: { ...hero, titleHighlight: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Title line 3</span>
            <input className={inputClass} value={hero.titleLine3} onChange={(e) => setContent({ ...content, hero: { ...hero, titleLine3: e.target.value } })} />
          </label>
          <label className="sm:col-span-2">
            <span className={labelClass}>Description</span>
            <textarea className={inputClass} rows={2} value={hero.description} onChange={(e) => setContent({ ...content, hero: { ...hero, description: e.target.value } })} />
          </label>
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Scholarship tiers &amp; feature strip</h3>
        <div className="space-y-2">
          {tiers.map((tier, i) => (
            <div key={i} className="flex gap-2">
              <input className={inputClass} value={tier.pct} placeholder="e.g. 100%" onChange={(e) => setContent({ ...content, tiers: tiers.map((t, idx) => (idx === i ? { ...t, pct: e.target.value } : t)) })} />
              <input className={inputClass} value={tier.label} placeholder="Label" onChange={(e) => setContent({ ...content, tiers: tiers.map((t, idx) => (idx === i ? { ...t, label: e.target.value } : t)) })} />
              <button onClick={() => setContent({ ...content, tiers: tiers.filter((_, idx) => idx !== i) })} className="shrink-0 text-[#b42318]">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button onClick={() => setContent({ ...content, tiers: [...tiers, { pct: '', label: '', bg: 'bg-[#dbeafe] text-[#1e3a8a] border-[#93c5fd]' }] })} className={smallBtn}>
            <Plus size={13} /> Add tier
          </button>
        </div>
        <div className="mt-4 space-y-2">
          {features.map((feature, i) => (
            <div key={i} className="flex gap-2">
              <input className={`${inputClass} max-w-[4rem]`} value={feature.emoji} placeholder="Emoji" onChange={(e) => setContent({ ...content, features: features.map((f, idx) => (idx === i ? { ...f, emoji: e.target.value } : f)) })} />
              <input className={inputClass} value={feature.title} placeholder="Title" onChange={(e) => setContent({ ...content, features: features.map((f, idx) => (idx === i ? { ...f, title: e.target.value } : f)) })} />
              <input className={inputClass} value={feature.sub} placeholder="Subtext" onChange={(e) => setContent({ ...content, features: features.map((f, idx) => (idx === i ? { ...f, sub: e.target.value } : f)) })} />
              <button onClick={() => setContent({ ...content, features: features.filter((_, idx) => idx !== i) })} className="shrink-0 text-[#b42318]">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button onClick={() => setContent({ ...content, features: [...features, { emoji: '', title: '', sub: '' }] })} className={smallBtn}>
            <Plus size={13} /> Add feature
          </button>
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Form card copy</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <label>
            <span className={labelClass}>Fee label</span>
            <input className={inputClass} value={formCard.feeLabel} onChange={(e) => setContent({ ...content, formCard: { ...formCard, feeLabel: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Fee subtext</span>
            <input className={inputClass} value={formCard.feeSubtext} onChange={(e) => setContent({ ...content, formCard: { ...formCard, feeSubtext: e.target.value } })} />
          </label>
        </div>
        <div className="mt-3">
          <span className={labelClass}>Trust badges</span>
          <ListEditor items={formCard.trustBadges} onChange={(trustBadges) => setContent({ ...content, formCard: { ...formCard, trustBadges } })} />
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Process steps</h3>
        <div className="grid gap-3 sm:grid-cols-2 mb-3">
          <label>
            <span className={labelClass}>Eyebrow</span>
            <input className={inputClass} value={process.eyebrow} onChange={(e) => setContent({ ...content, process: { ...process, eyebrow: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Heading</span>
            <input className={inputClass} value={process.heading} onChange={(e) => setContent({ ...content, process: { ...process, heading: e.target.value } })} />
          </label>
        </div>
        <div className="space-y-2">
          {process.steps.map((step, i) => (
            <div key={i} className="flex gap-2">
              <input className={inputClass} value={step.title} placeholder="Title" onChange={(e) => setContent({ ...content, process: { ...process, steps: process.steps.map((s, idx) => (idx === i ? { ...s, title: e.target.value } : s)) } })} />
              <input className={inputClass} value={step.description} placeholder="Description" onChange={(e) => setContent({ ...content, process: { ...process, steps: process.steps.map((s, idx) => (idx === i ? { ...s, description: e.target.value } : s)) } })} />
              <button onClick={() => setContent({ ...content, process: { ...process, steps: process.steps.filter((_, idx) => idx !== i) } })} className="shrink-0 text-[#b42318]">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button onClick={() => setContent({ ...content, process: { ...process, steps: [...process.steps, { title: '', description: '' }] } })} className={smallBtn}>
            <Plus size={13} /> Add step
          </button>
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">FAQ</h3>
        <div className="grid gap-3 sm:grid-cols-2 mb-3">
          <label>
            <span className={labelClass}>Eyebrow</span>
            <input className={inputClass} value={faqSection.eyebrow} onChange={(e) => setContent({ ...content, faqSection: { ...faqSection, eyebrow: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Heading</span>
            <input className={inputClass} value={faqSection.heading} onChange={(e) => setContent({ ...content, faqSection: { ...faqSection, heading: e.target.value } })} />
          </label>
        </div>
        <div className="space-y-3">
          {faqSection.faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border-[3px] border-[#10163a]/20 p-3">
              <input className={inputClass} value={faq.question} placeholder="Question" onChange={(e) => setContent({ ...content, faqSection: { ...faqSection, faqs: faqSection.faqs.map((f, idx) => (idx === i ? { ...f, question: e.target.value } : f)) } })} />
              <textarea className={`${inputClass} mt-2`} rows={2} value={faq.answer} placeholder="Answer" onChange={(e) => setContent({ ...content, faqSection: { ...faqSection, faqs: faqSection.faqs.map((f, idx) => (idx === i ? { ...f, answer: e.target.value } : f)) } })} />
              <button onClick={() => setContent({ ...content, faqSection: { ...faqSection, faqs: faqSection.faqs.filter((_, idx) => idx !== i) } })} className="mt-2 flex items-center gap-1.5 text-xs font-black text-[#b42318] hover:underline">
                <Trash2 size={13} /> Remove FAQ
              </button>
            </div>
          ))}
          <button onClick={() => setContent({ ...content, faqSection: { ...faqSection, faqs: [...faqSection.faqs, { question: '', answer: '' }] } })} className={smallBtn}>
            <Plus size={13} /> Add FAQ
          </button>
        </div>
      </div>
    </div>
  )
}
