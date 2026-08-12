'use client'

import { Plus, Save, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { defaultHomepageContent, type HomepageContentData } from '@/app/lib/homepage'

const inputClass =
  'w-full rounded-xl border-[3px] border-[#10163a] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#10163a] outline-none transition focus:border-[#3244b5]'
const labelClass = 'mb-1.5 block text-xs font-black uppercase tracking-[0.1em] text-[#3244b5]'
const cardClass = 'rounded-2xl border-[3px] border-[#10163a] bg-white p-6 shadow-[5px_5px_0_#10163a]'
const smallBtn =
  'flex items-center gap-1.5 rounded-lg border-[3px] border-[#10163a] bg-white px-2.5 py-1.5 text-xs font-black text-[#10163a] shadow-[2px_2px_0_#10163a] transition hover:-translate-y-0.5'

function ListEditor({
  items,
  onChange,
  placeholder = 'Item',
}: {
  items: string[]
  onChange: (items: string[]) => void
  placeholder?: string
}) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            className={inputClass}
            value={item}
            placeholder={placeholder}
            onChange={(e) => onChange(items.map((it, idx) => (idx === i ? e.target.value : it)))}
          />
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

export default function HomepageTab() {
  const [content, setContent] = useState<HomepageContentData>(defaultHomepageContent)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    fetch('/api/content/homepage')
      .then((res) => res.json())
      .then((payload: { value?: HomepageContentData }) => {
        if (payload.value) setContent(payload.value)
      })
      .catch(() => setMessage({ type: 'error', text: 'Failed to load homepage content — showing defaults.' }))
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)
    try {
      const response = await fetch('/api/content/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      })
      const payload = (await response.json()) as { value?: HomepageContentData; error?: string }
      if (!response.ok) throw new Error(payload.error || 'Failed to save')
      if (payload.value) setContent(payload.value)
      setMessage({ type: 'success', text: 'Homepage saved.' })
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to save' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-sm font-semibold text-[#667085]">Loading homepage content...</p>

  const { hero, stats, programsSection, skills, whyLearn, methodology, studentProjects, finalCta, tools } = content

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black tracking-[-0.03em] text-[#10163a]">Homepage</h2>
          <p className="text-sm text-[#667085]">Edit the content shown on the / homepage.</p>
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
            <span className={labelClass}>Kicker</span>
            <input className={inputClass} value={hero.kicker} onChange={(e) => setContent({ ...content, hero: { ...hero, kicker: e.target.value } })} />
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
            <span className={labelClass}>Primary CTA label</span>
            <input className={inputClass} value={hero.primaryCtaLabel} onChange={(e) => setContent({ ...content, hero: { ...hero, primaryCtaLabel: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Secondary CTA label</span>
            <input className={inputClass} value={hero.secondaryCtaLabel} onChange={(e) => setContent({ ...content, hero: { ...hero, secondaryCtaLabel: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Hero background image</span>
            <input className={inputClass} value={hero.heroBgImage} onChange={(e) => setContent({ ...content, hero: { ...hero, heroBgImage: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Hero image</span>
            <input className={inputClass} value={hero.heroImage} onChange={(e) => setContent({ ...content, hero: { ...hero, heroImage: e.target.value } })} />
          </label>
          <div className="sm:col-span-2">
            <span className={labelClass}>Checklist</span>
            <ListEditor items={hero.checklist} onChange={(checklist) => setContent({ ...content, hero: { ...hero, checklist } })} />
          </div>
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Stats strip</h3>
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
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Programs section</h3>
        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <label>
            <span className={labelClass}>Eyebrow</span>
            <input className={inputClass} value={programsSection.eyebrow} onChange={(e) => setContent({ ...content, programsSection: { ...programsSection, eyebrow: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Heading</span>
            <input className={inputClass} value={programsSection.heading} onChange={(e) => setContent({ ...content, programsSection: { ...programsSection, heading: e.target.value } })} />
          </label>
          <label className="sm:col-span-2">
            <span className={labelClass}>Description</span>
            <input className={inputClass} value={programsSection.description} onChange={(e) => setContent({ ...content, programsSection: { ...programsSection, description: e.target.value } })} />
          </label>
        </div>
        <div className="space-y-4">
          {programsSection.programs.map((program, i) => (
            <div key={i} className="rounded-xl border-[3px] border-[#10163a]/20 p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {(['name', 'href', 'image', 'description', 'tools', 'accentClass'] as const).map((key) => (
                  <label key={key}>
                    <span className={labelClass}>{key}</span>
                    <input
                      className={inputClass}
                      value={program[key]}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          programsSection: {
                            ...programsSection,
                            programs: programsSection.programs.map((p, idx) => (idx === i ? { ...p, [key]: e.target.value } : p)),
                          },
                        })
                      }
                    />
                  </label>
                ))}
              </div>
              <button
                onClick={() =>
                  setContent({ ...content, programsSection: { ...programsSection, programs: programsSection.programs.filter((_, idx) => idx !== i) } })
                }
                className="mt-2 flex items-center gap-1.5 text-xs font-black text-[#b42318] hover:underline"
              >
                <Trash2 size={13} /> Remove program
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              setContent({
                ...content,
                programsSection: {
                  ...programsSection,
                  programs: [...programsSection.programs, { name: '', href: '', image: '', description: '', tools: '', accentClass: 'program-navy' }],
                },
              })
            }
            className={smallBtn}
          >
            <Plus size={13} /> Add program
          </button>
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Skills section</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <label>
            <span className={labelClass}>Image</span>
            <input className={inputClass} value={skills.image} onChange={(e) => setContent({ ...content, skills: { ...skills, image: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Heading bold part</span>
            <input className={inputClass} value={skills.headingBold} onChange={(e) => setContent({ ...content, skills: { ...skills, headingBold: e.target.value } })} />
          </label>
          <label className="sm:col-span-2">
            <span className={labelClass}>Heading rest</span>
            <input className={inputClass} value={skills.headingRest} onChange={(e) => setContent({ ...content, skills: { ...skills, headingRest: e.target.value } })} />
          </label>
          <label className="sm:col-span-2">
            <span className={labelClass}>Description</span>
            <textarea className={inputClass} rows={2} value={skills.description} onChange={(e) => setContent({ ...content, skills: { ...skills, description: e.target.value } })} />
          </label>
          <div className="sm:col-span-2">
            <span className={labelClass}>Checklist</span>
            <ListEditor items={skills.checklist} onChange={(checklist) => setContent({ ...content, skills: { ...skills, checklist } })} />
          </div>
        </div>
      </div>

      <div className={cardClass}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Why learn at TSDC</h3>
        </div>
        <label className="mb-3 block">
          <span className={labelClass}>Eyebrow</span>
          <input className={inputClass} value={whyLearn.eyebrow} onChange={(e) => setContent({ ...content, whyLearn: { ...whyLearn, eyebrow: e.target.value } })} />
        </label>
        <div className="space-y-3">
          {whyLearn.benefits.map((benefit, i) => (
            <div key={i} className="flex gap-2">
              <input
                className={inputClass}
                value={benefit.title}
                placeholder="Title"
                onChange={(e) =>
                  setContent({ ...content, whyLearn: { ...whyLearn, benefits: whyLearn.benefits.map((b, idx) => (idx === i ? { ...b, title: e.target.value } : b)) } })
                }
              />
              <input
                className={inputClass}
                value={benefit.description}
                placeholder="Description"
                onChange={(e) =>
                  setContent({ ...content, whyLearn: { ...whyLearn, benefits: whyLearn.benefits.map((b, idx) => (idx === i ? { ...b, description: e.target.value } : b)) } })
                }
              />
              <button onClick={() => setContent({ ...content, whyLearn: { ...whyLearn, benefits: whyLearn.benefits.filter((_, idx) => idx !== i) } })} className="shrink-0 text-[#b42318]">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button onClick={() => setContent({ ...content, whyLearn: { ...whyLearn, benefits: [...whyLearn.benefits, { title: '', description: '' }] } })} className={smallBtn}>
            <Plus size={13} /> Add benefit
          </button>
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Methodology &amp; student projects</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <label>
            <span className={labelClass}>Methodology eyebrow</span>
            <input className={inputClass} value={methodology.eyebrow} onChange={(e) => setContent({ ...content, methodology: { ...methodology, eyebrow: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Methodology CTA label</span>
            <input className={inputClass} value={methodology.ctaLabel} onChange={(e) => setContent({ ...content, methodology: { ...methodology, ctaLabel: e.target.value } })} />
          </label>
          <label className="sm:col-span-2">
            <span className={labelClass}>Methodology description</span>
            <input className={inputClass} value={methodology.description} onChange={(e) => setContent({ ...content, methodology: { ...methodology, description: e.target.value } })} />
          </label>
          <div className="sm:col-span-2">
            <span className={labelClass}>Steps</span>
            <ListEditor items={methodology.steps} onChange={(steps) => setContent({ ...content, methodology: { ...methodology, steps } })} />
          </div>
          <label>
            <span className={labelClass}>Student projects eyebrow</span>
            <input className={inputClass} value={studentProjects.eyebrow} onChange={(e) => setContent({ ...content, studentProjects: { ...studentProjects, eyebrow: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Student projects heading</span>
            <input className={inputClass} value={studentProjects.heading} onChange={(e) => setContent({ ...content, studentProjects: { ...studentProjects, heading: e.target.value } })} />
          </label>
        </div>
        <div className="mt-4 space-y-3">
          <span className={labelClass}>Showcase items (title / image)</span>
          {studentProjects.projects.map((project, i) => (
            <div key={i} className="flex gap-2">
              <input
                className={inputClass}
                value={project.title}
                placeholder="Title"
                onChange={(e) =>
                  setContent({ ...content, studentProjects: { ...studentProjects, projects: studentProjects.projects.map((p, idx) => (idx === i ? { ...p, title: e.target.value } : p)) } })
                }
              />
              <input
                className={inputClass}
                value={project.image}
                placeholder="Image path"
                onChange={(e) =>
                  setContent({ ...content, studentProjects: { ...studentProjects, projects: studentProjects.projects.map((p, idx) => (idx === i ? { ...p, image: e.target.value } : p)) } })
                }
              />
              <button
                onClick={() => setContent({ ...content, studentProjects: { ...studentProjects, projects: studentProjects.projects.filter((_, idx) => idx !== i) } })}
                className="shrink-0 text-[#b42318]"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button
            onClick={() => setContent({ ...content, studentProjects: { ...studentProjects, projects: [...studentProjects.projects, { title: '', image: '' }] } })}
            className={smallBtn}
          >
            <Plus size={13} /> Add showcase item
          </button>
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Final CTA &amp; tools strip</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <label>
            <span className={labelClass}>Masterclass heading (use \n for line break)</span>
            <input className={inputClass} value={finalCta.masterclassHeading} onChange={(e) => setContent({ ...content, finalCta: { ...finalCta, masterclassHeading: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Masterclass link label</span>
            <input className={inputClass} value={finalCta.masterclassLinkLabel} onChange={(e) => setContent({ ...content, finalCta: { ...finalCta, masterclassLinkLabel: e.target.value } })} />
          </label>
          <label className="sm:col-span-2">
            <span className={labelClass}>Masterclass description</span>
            <input className={inputClass} value={finalCta.masterclassDescription} onChange={(e) => setContent({ ...content, finalCta: { ...finalCta, masterclassDescription: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Counselling heading (use \n for line break)</span>
            <input className={inputClass} value={finalCta.counsellingHeading} onChange={(e) => setContent({ ...content, finalCta: { ...finalCta, counsellingHeading: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Counselling button label</span>
            <input className={inputClass} value={finalCta.counsellingButtonLabel} onChange={(e) => setContent({ ...content, finalCta: { ...finalCta, counsellingButtonLabel: e.target.value } })} />
          </label>
          <label className="sm:col-span-2">
            <span className={labelClass}>Counselling description</span>
            <input className={inputClass} value={finalCta.counsellingDescription} onChange={(e) => setContent({ ...content, finalCta: { ...finalCta, counsellingDescription: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>Visual image</span>
            <input className={inputClass} value={finalCta.visualImage} onChange={(e) => setContent({ ...content, finalCta: { ...finalCta, visualImage: e.target.value } })} />
          </label>
          <div>
            <span className={labelClass}>Visual checklist</span>
            <ListEditor items={finalCta.visualChecklist} onChange={(visualChecklist) => setContent({ ...content, finalCta: { ...finalCta, visualChecklist } })} />
          </div>
          <label>
            <span className={labelClass}>Tools strip heading</span>
            <input className={inputClass} value={tools.heading} onChange={(e) => setContent({ ...content, tools: { ...tools, heading: e.target.value } })} />
          </label>
          <div>
            <span className={labelClass}>Tool items</span>
            <ListEditor items={tools.items} onChange={(items) => setContent({ ...content, tools: { ...tools, items } })} />
          </div>
        </div>
      </div>
    </div>
  )
}
