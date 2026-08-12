'use client'

import { Plus, Save, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { defaultCourseContent, type AllCourseContent, type CourseData } from '@/app/lib/courseContent'

const inputClass =
  'w-full rounded-xl border-[3px] border-[#10163a] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#10163a] outline-none transition focus:border-[#3244b5]'
const labelClass = 'mb-1.5 block text-xs font-black uppercase tracking-[0.1em] text-[#3244b5]'
const cardClass = 'rounded-2xl border-[3px] border-[#10163a] bg-white p-6 shadow-[5px_5px_0_#10163a]'
const smallBtn =
  'flex items-center gap-1.5 rounded-lg border-[3px] border-[#10163a] bg-white px-2.5 py-1.5 text-xs font-black text-[#10163a] shadow-[2px_2px_0_#10163a] transition hover:-translate-y-0.5'

const slugs: (keyof AllCourseContent)[] = ['graphic-design', 'uiux-design', 'digital-marketing', 'video-editing', 'motion-graphics']

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

export default function CourseContentTab() {
  const [content, setContent] = useState<AllCourseContent>(defaultCourseContent)
  const [activeSlug, setActiveSlug] = useState<keyof AllCourseContent>('graphic-design')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    fetch('/api/content/courseContent')
      .then((res) => res.json())
      .then((payload: { value?: AllCourseContent }) => {
        if (payload.value) setContent(payload.value)
      })
      .catch(() => setMessage({ type: 'error', text: 'Failed to load course content — showing defaults.' }))
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)
    try {
      const response = await fetch('/api/content/courseContent', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      })
      const payload = (await response.json()) as { value?: AllCourseContent; error?: string }
      if (!response.ok) throw new Error(payload.error || 'Failed to save')
      if (payload.value) setContent(payload.value)
      setMessage({ type: 'success', text: 'Course content saved.' })
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to save' })
    } finally {
      setSaving(false)
    }
  }

  const updateCourse = (patch: Partial<CourseData>) => setContent({ ...content, [activeSlug]: { ...content[activeSlug], ...patch } })

  if (loading) return <p className="text-sm font-semibold text-[#667085]">Loading course content...</p>

  const course = content[activeSlug]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black tracking-[-0.03em] text-[#10163a]">Course Content</h2>
          <p className="text-sm text-[#667085]">Edit the 5 individual course landing pages.</p>
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

      <div className="flex flex-wrap gap-2">
        {slugs.map((slug) => (
          <button
            key={slug}
            onClick={() => setActiveSlug(slug)}
            className={`rounded-lg border-[3px] border-[#10163a] px-3.5 py-2 text-xs font-black transition ${
              activeSlug === slug ? 'bg-[#3244b5] text-white shadow-[3px_3px_0_#10163a]' : 'bg-white text-[#10163a]'
            }`}
          >
            {content[slug].title}
          </button>
        ))}
      </div>

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Basic info</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {(['title', 'eyebrow', 'duration', 'mode', 'seats', 'fee', 'emi', 'careerRoles', 'project', 'popupInterest'] as const).map((key) => (
            <label key={key}>
              <span className={labelClass}>{key}</span>
              <input className={inputClass} value={course[key]} onChange={(e) => updateCourse({ [key]: e.target.value } as Partial<CourseData>)} />
            </label>
          ))}
          <label className="sm:col-span-2">
            <span className={labelClass}>Description</span>
            <textarea className={inputClass} rows={2} value={course.description} onChange={(e) => updateCourse({ description: e.target.value })} />
          </label>
          <label>
            <span className={labelClass}>Syllabus URL</span>
            <input className={inputClass} value={course.syllabusUrl} onChange={(e) => updateCourse({ syllabusUrl: e.target.value })} />
          </label>
          <label>
            <span className={labelClass}>Syllabus file name</span>
            <input className={inputClass} value={course.syllabusFileName} onChange={(e) => updateCourse({ syllabusFileName: e.target.value })} />
          </label>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <span className={labelClass}>Next batches</span>
            <ListEditor items={course.nextBatches} onChange={(nextBatches) => updateCourse({ nextBatches })} />
          </div>
          <div>
            <span className={labelClass}>Hero points</span>
            <ListEditor items={course.heroPoints} onChange={(heroPoints) => updateCourse({ heroPoints })} />
          </div>
          <div>
            <span className={labelClass}>Tools</span>
            <ListEditor items={course.tools} onChange={(tools) => updateCourse({ tools })} />
          </div>
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Outcomes</h3>
        <div className="space-y-2">
          {course.outcomes.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input className={inputClass} value={item.title} placeholder="Title" onChange={(e) => updateCourse({ outcomes: course.outcomes.map((o, idx) => (idx === i ? { ...o, title: e.target.value } : o)) })} />
              <input className={inputClass} value={item.text} placeholder="Text" onChange={(e) => updateCourse({ outcomes: course.outcomes.map((o, idx) => (idx === i ? { ...o, text: e.target.value } : o)) })} />
              <button onClick={() => updateCourse({ outcomes: course.outcomes.filter((_, idx) => idx !== i) })} className="shrink-0 text-[#b42318]">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button onClick={() => updateCourse({ outcomes: [...course.outcomes, { title: '', text: '' }] })} className={smallBtn}>
            <Plus size={13} /> Add outcome
          </button>
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Modules</h3>
        <div className="space-y-2">
          {course.modules.map((item, i) => (
            <div key={i} className="grid gap-2 sm:grid-cols-[0.5fr_1fr_2fr_auto]">
              <input className={inputClass} value={item.label} placeholder="Label" onChange={(e) => updateCourse({ modules: course.modules.map((m, idx) => (idx === i ? { ...m, label: e.target.value } : m)) })} />
              <input className={inputClass} value={item.title} placeholder="Title" onChange={(e) => updateCourse({ modules: course.modules.map((m, idx) => (idx === i ? { ...m, title: e.target.value } : m)) })} />
              <input className={inputClass} value={item.text} placeholder="Text" onChange={(e) => updateCourse({ modules: course.modules.map((m, idx) => (idx === i ? { ...m, text: e.target.value } : m)) })} />
              <button onClick={() => updateCourse({ modules: course.modules.filter((_, idx) => idx !== i) })} className="shrink-0 text-[#b42318]">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button onClick={() => updateCourse({ modules: [...course.modules, { label: '', title: '', text: '' }] })} className={smallBtn}>
            <Plus size={13} /> Add module
          </button>
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Testimonial</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <label>
            <span className={labelClass}>Author</span>
            <input className={inputClass} value={course.testimonial.author} onChange={(e) => updateCourse({ testimonial: { ...course.testimonial, author: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Role</span>
            <input className={inputClass} value={course.testimonial.role} onChange={(e) => updateCourse({ testimonial: { ...course.testimonial, role: e.target.value } })} />
          </label>
          <label className="sm:col-span-2">
            <span className={labelClass}>Quote</span>
            <textarea className={inputClass} rows={2} value={course.testimonial.quote} onChange={(e) => updateCourse({ testimonial: { ...course.testimonial, quote: e.target.value } })} />
          </label>
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">FAQs</h3>
        <div className="space-y-3">
          {course.faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border-[3px] border-[#10163a]/20 p-3">
              <input className={inputClass} value={faq.question} placeholder="Question" onChange={(e) => updateCourse({ faqs: course.faqs.map((f, idx) => (idx === i ? { ...f, question: e.target.value } : f)) })} />
              <textarea className={`${inputClass} mt-2`} rows={2} value={faq.answer} placeholder="Answer" onChange={(e) => updateCourse({ faqs: course.faqs.map((f, idx) => (idx === i ? { ...f, answer: e.target.value } : f)) })} />
              <button onClick={() => updateCourse({ faqs: course.faqs.filter((_, idx) => idx !== i) })} className="mt-2 flex items-center gap-1.5 text-xs font-black text-[#b42318] hover:underline">
                <Trash2 size={13} /> Remove FAQ
              </button>
            </div>
          ))}
          <button onClick={() => updateCourse({ faqs: [...course.faqs, { question: '', answer: '' }] })} className={smallBtn}>
            <Plus size={13} /> Add FAQ
          </button>
        </div>
      </div>
    </div>
  )
}
