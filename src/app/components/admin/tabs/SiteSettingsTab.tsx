'use client'

import { Save } from 'lucide-react'
import { useEffect, useState } from 'react'
import { defaultSiteSettings, type SiteSettings } from '@/app/lib/siteSettings'

const inputClass =
  'w-full rounded-xl border-[3px] border-[#10163a] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#10163a] outline-none transition focus:border-[#3244b5]'
const labelClass = 'mb-1.5 block text-xs font-black uppercase tracking-[0.1em] text-[#3244b5]'
const cardClass = 'rounded-2xl border-[3px] border-[#10163a] bg-white p-6 shadow-[5px_5px_0_#10163a]'

const triggerLabels: Record<keyof SiteSettings['email']['triggers'], string> = {
  masterclassPaid: 'Masterclass payment confirmed',
  masterclassAbandoned: 'Masterclass payment abandoned',
  masterclassExpiry: 'Masterclass expiry reminder',
  contactEnquiry: 'Contact form enquiry',
  contactCoupon: 'Auto-coupon for immediate joiners',
}

export default function SiteSettingsTab() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    fetch('/api/content/siteSettings')
      .then((res) => res.json())
      .then((payload: { value?: SiteSettings }) => {
        if (payload.value) setSettings(payload.value)
      })
      .catch(() => setMessage({ type: 'error', text: 'Failed to load settings — showing defaults.' }))
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)
    try {
      const response = await fetch('/api/content/siteSettings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      const payload = (await response.json()) as { value?: SiteSettings; error?: string }
      if (!response.ok) throw new Error(payload.error || 'Failed to save settings')
      if (payload.value) setSettings(payload.value)
      setMessage({ type: 'success', text: 'Settings saved.' })
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to save settings' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="text-sm font-semibold text-[#667085]">Loading settings...</p>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black tracking-[-0.03em] text-[#10163a]">Site Settings</h2>
          <p className="text-sm text-[#667085]">Shared contact info, payment display, and email notification triggers.</p>
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
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">General &amp; contact info</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className={labelClass}>Site name</span>
            <input
              className={inputClass}
              value={settings.general.siteName}
              onChange={(e) => setSettings({ ...settings, general: { ...settings.general, siteName: e.target.value } })}
            />
          </label>
          <label>
            <span className={labelClass}>Admin phone (display)</span>
            <input
              className={inputClass}
              value={settings.general.adminPhone}
              onChange={(e) => setSettings({ ...settings, general: { ...settings.general, adminPhone: e.target.value } })}
            />
          </label>
          <label>
            <span className={labelClass}>WhatsApp number (digits only)</span>
            <input
              className={inputClass}
              value={settings.general.whatsappNumber}
              onChange={(e) => setSettings({ ...settings, general: { ...settings.general, whatsappNumber: e.target.value } })}
            />
          </label>
          <label>
            <span className={labelClass}>WhatsApp prefilled message</span>
            <input
              className={inputClass}
              value={settings.general.whatsappMessage}
              onChange={(e) => setSettings({ ...settings, general: { ...settings.general, whatsappMessage: e.target.value } })}
            />
          </label>
          <label>
            <span className={labelClass}>Contact email</span>
            <input
              className={inputClass}
              value={settings.general.contactEmail}
              onChange={(e) => setSettings({ ...settings, general: { ...settings.general, contactEmail: e.target.value } })}
            />
          </label>
          <label>
            <span className={labelClass}>Instagram handle</span>
            <input
              className={inputClass}
              value={settings.general.instagramHandle}
              onChange={(e) => setSettings({ ...settings, general: { ...settings.general, instagramHandle: e.target.value } })}
            />
          </label>
          <label>
            <span className={labelClass}>Facebook URL</span>
            <input
              className={inputClass}
              value={settings.general.facebookUrl}
              onChange={(e) => setSettings({ ...settings, general: { ...settings.general, facebookUrl: e.target.value } })}
            />
          </label>
          <label>
            <span className={labelClass}>LinkedIn URL</span>
            <input
              className={inputClass}
              value={settings.general.linkedinUrl}
              onChange={(e) => setSettings({ ...settings, general: { ...settings.general, linkedinUrl: e.target.value } })}
            />
          </label>
          <label className="sm:col-span-2">
            <span className={labelClass}>Address</span>
            <input
              className={inputClass}
              value={settings.general.address}
              onChange={(e) => setSettings({ ...settings, general: { ...settings.general, address: e.target.value } })}
            />
          </label>
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Payment display</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className={labelClass}>Mode</span>
            <select
              className={inputClass}
              value={settings.payment.mode}
              onChange={(e) =>
                setSettings({ ...settings, payment: { ...settings.payment, mode: e.target.value as 'test' | 'live' } })
              }
            >
              <option value="test">Test</option>
              <option value="live">Live</option>
            </select>
          </label>
          <label>
            <span className={labelClass}>Currency</span>
            <input
              className={inputClass}
              value={settings.payment.currency}
              onChange={(e) => setSettings({ ...settings, payment: { ...settings.payment, currency: e.target.value } })}
            />
          </label>
          <label>
            <span className={labelClass}>Brand name (Razorpay checkout)</span>
            <input
              className={inputClass}
              value={settings.payment.brandName}
              onChange={(e) => setSettings({ ...settings, payment: { ...settings.payment, brandName: e.target.value } })}
            />
          </label>
          <label>
            <span className={labelClass}>Brand color</span>
            <input
              className={inputClass}
              value={settings.payment.brandColor}
              onChange={(e) => setSettings({ ...settings, payment: { ...settings.payment, brandColor: e.target.value } })}
            />
          </label>
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.1em] text-[#10163a]">Email notifications</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className={labelClass}>Notification recipient</span>
            <input
              className={inputClass}
              value={settings.email.notificationRecipient}
              onChange={(e) => setSettings({ ...settings, email: { ...settings.email, notificationRecipient: e.target.value } })}
            />
          </label>
          <label>
            <span className={labelClass}>Sender display</span>
            <input
              className={inputClass}
              value={settings.email.senderDisplay}
              onChange={(e) => setSettings({ ...settings, email: { ...settings.email, senderDisplay: e.target.value } })}
            />
          </label>
        </div>
        <div className="mt-4 space-y-2.5">
          {(Object.keys(triggerLabels) as (keyof SiteSettings['email']['triggers'])[]).map((key) => (
            <label key={key} className="flex items-center gap-2.5 text-sm font-semibold text-[#10163a]">
              <input
                type="checkbox"
                checked={settings.email.triggers[key]}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    email: { ...settings.email, triggers: { ...settings.email.triggers, [key]: e.target.checked } },
                  })
                }
                className="h-4 w-4 accent-[#3244b5]"
              />
              {triggerLabels[key]}
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
