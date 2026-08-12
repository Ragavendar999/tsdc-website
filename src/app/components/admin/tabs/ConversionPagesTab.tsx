'use client'

import { Plus, Save, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { defaultConversionPages, type ConversionPagesContent } from '@/app/lib/conversionPages'

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

export default function ConversionPagesTab() {
  const [content, setContent] = useState<ConversionPagesContent>(defaultConversionPages)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    fetch('/api/content/conversionPages')
      .then((res) => res.json())
      .then((payload: { value?: ConversionPagesContent }) => {
        if (payload.value) setContent(payload.value)
      })
      .catch(() => setMessage({ type: 'error', text: 'Failed to load — showing defaults.' }))
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)
    try {
      const response = await fetch('/api/content/conversionPages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      })
      const payload = (await response.json()) as { value?: ConversionPagesContent; error?: string }
      if (!response.ok) throw new Error(payload.error || 'Failed to save')
      if (payload.value) setContent(payload.value)
      setMessage({ type: 'success', text: 'Saved.' })
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to save' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-sm font-semibold text-[#667085]">Loading...</p>

  const { admissions, counselling, faqPage, faqs } = content

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black tracking-[-0.03em] text-[#10163a]">Admissions / Counselling / FAQ</h2>
          <p className="text-sm text-[#667085]">Edit /admissions, /career-counselling, and /faq.</p>
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
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Admissions page</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className={labelClass}>Title</span>
            <input className={inputClass} value={admissions.title} onChange={(e) => setContent({ ...content, admissions: { ...admissions, title: e.target.value } })} />
          </label>
          <label className="sm:col-span-2">
            <span className={labelClass}>Description</span>
            <textarea className={inputClass} rows={2} value={admissions.description} onChange={(e) => setContent({ ...content, admissions: { ...admissions, description: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Action button label</span>
            <input className={inputClass} value={admissions.actionLabel} onChange={(e) => setContent({ ...content, admissions: { ...admissions, actionLabel: e.target.value } })} />
          </label>
        </div>
        <div className="mt-3">
          <span className={labelClass}>Admission steps</span>
          <ListEditor items={content.admissionSteps} onChange={(admissionSteps) => setContent({ ...content, admissionSteps })} />
        </div>
        <label className="mt-3 block">
          <span className={labelClass}>Note</span>
          <input className={inputClass} value={content.admissionNote} onChange={(e) => setContent({ ...content, admissionNote: e.target.value })} />
        </label>
      </div>

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Counselling page</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className={labelClass}>Title</span>
            <input className={inputClass} value={counselling.title} onChange={(e) => setContent({ ...content, counselling: { ...counselling, title: e.target.value } })} />
          </label>
          <label className="sm:col-span-2">
            <span className={labelClass}>Description</span>
            <textarea className={inputClass} rows={2} value={counselling.description} onChange={(e) => setContent({ ...content, counselling: { ...counselling, description: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Action button label</span>
            <input className={inputClass} value={counselling.actionLabel} onChange={(e) => setContent({ ...content, counselling: { ...counselling, actionLabel: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>&quot;What we&apos;ll discuss&quot; heading</span>
            <input className={inputClass} value={content.counsellingHeading} onChange={(e) => setContent({ ...content, counsellingHeading: e.target.value })} />
          </label>
        </div>
        <div className="mt-3">
          <span className={labelClass}>Discussion points</span>
          <ListEditor items={content.counsellingPoints} onChange={(counsellingPoints) => setContent({ ...content, counsellingPoints })} />
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">FAQ page &amp; shared FAQs</h3>
        <div className="grid gap-3 sm:grid-cols-2 mb-3">
          <label>
            <span className={labelClass}>FAQ page title</span>
            <input className={inputClass} value={faqPage.title} onChange={(e) => setContent({ ...content, faqPage: { ...faqPage, title: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>FAQ page description</span>
            <input className={inputClass} value={faqPage.description} onChange={(e) => setContent({ ...content, faqPage: { ...faqPage, description: e.target.value } })} />
          </label>
        </div>
        <p className="mb-2 text-xs text-[#667085]">These FAQs appear on Admissions, Counselling, and FAQ pages.</p>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border-[3px] border-[#10163a]/20 p-3">
              <input className={inputClass} value={faq.question} placeholder="Question" onChange={(e) => setContent({ ...content, faqs: faqs.map((f, idx) => (idx === i ? { ...f, question: e.target.value } : f)) })} />
              <textarea className={`${inputClass} mt-2`} rows={2} value={faq.answer} placeholder="Answer" onChange={(e) => setContent({ ...content, faqs: faqs.map((f, idx) => (idx === i ? { ...f, answer: e.target.value } : f)) })} />
              <button onClick={() => setContent({ ...content, faqs: faqs.filter((_, idx) => idx !== i) })} className="mt-2 flex items-center gap-1.5 text-xs font-black text-[#b42318] hover:underline">
                <Trash2 size={13} /> Remove FAQ
              </button>
            </div>
          ))}
          <button onClick={() => setContent({ ...content, faqs: [...faqs, { question: '', answer: '' }] })} className={smallBtn}>
            <Plus size={13} /> Add FAQ
          </button>
        </div>
      </div>

      <div className={cardClass}>
        <label className="block max-w-sm">
          <span className={labelClass}>Bottom contact prompt</span>
          <input className={inputClass} value={content.contactPrompt} onChange={(e) => setContent({ ...content, contactPrompt: e.target.value })} />
        </label>
      </div>
    </div>
  )
}
