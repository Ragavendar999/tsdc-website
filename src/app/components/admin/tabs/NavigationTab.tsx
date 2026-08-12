'use client'

import { Plus, Save, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { defaultNavigation, type NavigationContent, type NavLink } from '@/app/lib/navigation'

const inputClass =
  'w-full rounded-xl border-[3px] border-[#10163a] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#10163a] outline-none transition focus:border-[#3244b5]'
const labelClass = 'mb-1.5 block text-xs font-black uppercase tracking-[0.1em] text-[#3244b5]'
const cardClass = 'rounded-2xl border-[3px] border-[#10163a] bg-white p-6 shadow-[5px_5px_0_#10163a]'
const smallBtn =
  'flex items-center gap-1.5 rounded-lg border-[3px] border-[#10163a] bg-white px-2.5 py-1.5 text-xs font-black text-[#10163a] shadow-[2px_2px_0_#10163a] transition hover:-translate-y-0.5'

function LinkListEditor({ links, onChange }: { links: NavLink[]; onChange: (links: NavLink[]) => void }) {
  return (
    <div className="space-y-2">
      {links.map((link, i) => (
        <div key={i} className="flex gap-2">
          <input className={inputClass} value={link.label} placeholder="Label" onChange={(e) => onChange(links.map((l, idx) => (idx === i ? { ...l, label: e.target.value } : l)))} />
          <input className={inputClass} value={link.href} placeholder="Href" onChange={(e) => onChange(links.map((l, idx) => (idx === i ? { ...l, href: e.target.value } : l)))} />
          <button onClick={() => onChange(links.filter((_, idx) => idx !== i))} className="shrink-0 text-[#b42318]">
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <button onClick={() => onChange([...links, { label: '', href: '' }])} className={smallBtn}>
        <Plus size={13} /> Add link
      </button>
    </div>
  )
}

export default function NavigationTab() {
  const [content, setContent] = useState<NavigationContent>(defaultNavigation)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    fetch('/api/content/navigation')
      .then((res) => res.json())
      .then((payload: { value?: NavigationContent }) => {
        if (payload.value) setContent(payload.value)
      })
      .catch(() => setMessage({ type: 'error', text: 'Failed to load navigation — showing defaults.' }))
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)
    try {
      const response = await fetch('/api/content/navigation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      })
      const payload = (await response.json()) as { value?: NavigationContent; error?: string }
      if (!response.ok) throw new Error(payload.error || 'Failed to save')
      if (payload.value) setContent(payload.value)
      setMessage({ type: 'success', text: 'Navigation saved.' })
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to save' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-sm font-semibold text-[#667085]">Loading navigation...</p>

  const { navbar, footer } = content

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black tracking-[-0.03em] text-[#10163a]">Navigation</h2>
          <p className="text-sm text-[#667085]">
            Navbar and footer links. Shared contact info (phone/WhatsApp/email/social) is edited on the Site Settings tab.
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
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Navbar</h3>
        <label className="mb-3 block max-w-xs">
          <span className={labelClass}>Counselling button label</span>
          <input className={inputClass} value={navbar.counsellingButtonLabel} onChange={(e) => setContent({ ...content, navbar: { ...navbar, counsellingButtonLabel: e.target.value } })} />
        </label>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <span className={labelClass}>Main links</span>
            <LinkListEditor links={navbar.links} onChange={(links) => setContent({ ...content, navbar: { ...navbar, links } })} />
          </div>
          <div>
            <span className={labelClass}>Course dropdown</span>
            <LinkListEditor links={navbar.courseDropdown} onChange={(courseDropdown) => setContent({ ...content, navbar: { ...navbar, courseDropdown } })} />
          </div>
          <div>
            <span className={labelClass}>Mobile extra links</span>
            <LinkListEditor links={navbar.mobileExtraLinks} onChange={(mobileExtraLinks) => setContent({ ...content, navbar: { ...navbar, mobileExtraLinks } })} />
          </div>
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Footer</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <label>
            <span className={labelClass}>CTA eyebrow</span>
            <input className={inputClass} value={footer.ctaEyebrow} onChange={(e) => setContent({ ...content, footer: { ...footer, ctaEyebrow: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>CTA button label</span>
            <input className={inputClass} value={footer.ctaButtonLabel} onChange={(e) => setContent({ ...content, footer: { ...footer, ctaButtonLabel: e.target.value } })} />
          </label>
          <label className="sm:col-span-2">
            <span className={labelClass}>CTA heading</span>
            <input className={inputClass} value={footer.ctaHeading} onChange={(e) => setContent({ ...content, footer: { ...footer, ctaHeading: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>WhatsApp link label</span>
            <input className={inputClass} value={footer.whatsappLinkLabel} onChange={(e) => setContent({ ...content, footer: { ...footer, whatsappLinkLabel: e.target.value } })} />
          </label>
          <label>
            <span className={labelClass}>WhatsApp admissions label</span>
            <input className={inputClass} value={footer.whatsappAdmissionsLabel} onChange={(e) => setContent({ ...content, footer: { ...footer, whatsappAdmissionsLabel: e.target.value } })} />
          </label>
          <label className="sm:col-span-2">
            <span className={labelClass}>Brand tagline</span>
            <input className={inputClass} value={footer.brandTagline} onChange={(e) => setContent({ ...content, footer: { ...footer, brandTagline: e.target.value } })} />
          </label>
          <label className="sm:col-span-2">
            <span className={labelClass}>Bottom disclaimer</span>
            <input className={inputClass} value={footer.disclaimerText} onChange={(e) => setContent({ ...content, footer: { ...footer, disclaimerText: e.target.value } })} />
          </label>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <span className={labelClass}>Course links</span>
            <LinkListEditor links={footer.courseLinks} onChange={(courseLinks) => setContent({ ...content, footer: { ...footer, courseLinks } })} />
          </div>
          <div>
            <span className={labelClass}>TSDC links</span>
            <LinkListEditor links={footer.tsdcLinks} onChange={(tsdcLinks) => setContent({ ...content, footer: { ...footer, tsdcLinks } })} />
          </div>
          <div>
            <span className={labelClass}>Support links</span>
            <LinkListEditor links={footer.supportLinks} onChange={(supportLinks) => setContent({ ...content, footer: { ...footer, supportLinks } })} />
          </div>
        </div>
      </div>
    </div>
  )
}
