'use client'

import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { defaultSiteSettings, type SiteSettings } from '@/app/lib/siteSettings'

export default function WhatsAppFAB() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings)

  useEffect(() => {
    fetch('/api/content/siteSettings')
      .then((res) => res.json())
      .then((payload: { value?: SiteSettings }) => {
        if (payload.value) setSettings(payload.value)
      })
      .catch(() => {})
  }, [])

  const { general } = settings
  const whatsappHref = `https://wa.me/${general.whatsappNumber}?text=${encodeURIComponent(general.whatsappMessage)}`

  return (
    <a href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Chat with TSDC admissions on WhatsApp" className="tsdc-whatsapp-fab">
      <span className="tsdc-whatsapp-fab__pulse" aria-hidden="true" />
      <span className="tsdc-whatsapp-fab__icon">
        <MessageCircle size={21} />
      </span>
      <span className="tsdc-whatsapp-fab__copy">
        <small>Questions? We&apos;re here</small>
        <strong>WhatsApp Admissions</strong>
      </span>
      <ArrowUpRight className="tsdc-whatsapp-fab__arrow" size={17} aria-hidden="true" />
    </a>
  )
}
