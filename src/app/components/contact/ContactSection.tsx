'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  CalendarDays,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useContactPopup } from '@/app/components/common/ContactPopupProvider'
import { defaultSiteContent, loadSiteContent, SITE_CONTENT_UPDATED_EVENT } from '@/app/lib/siteContent'

export default function ContactSection() {
  const { openPopup } = useContactPopup()
  const [content, setContent] = useState(defaultSiteContent.contact)

  useEffect(() => {
    const syncContent = () => setContent(loadSiteContent().contact)

    syncContent()
    window.addEventListener('storage', syncContent)
    window.addEventListener(SITE_CONTENT_UPDATED_EVENT, syncContent)

    return () => {
      window.removeEventListener('storage', syncContent)
      window.removeEventListener(SITE_CONTENT_UPDATED_EVENT, syncContent)
    }
  }, [])

  const primaryPopupOptions = content.popupPrimary
  const counsellingPopupOptions = content.popupCounselling
  const quickActionIcons = [MessageCircle, CalendarDays, Sparkles]

  const quickActions = content.quickActions.map((item, index) => ({
    ...item,
    icon: quickActionIcons[index % quickActionIcons.length],
    action: () =>
      openPopup({
        title: item.popupTitle,
        subtitle: item.popupSubtitle,
        interest: item.interest,
        source: item.source,
        ctaLabel: item.ctaLabel,
      }),
  }))

  return (
    <section className="site-section-bg relative min-h-[88vh] overflow-hidden px-4 py-10 md:py-14">
      <div className="absolute left-8 top-16 h-24 w-24 rounded-[1.8rem] bg-[#ff9736] opacity-60" />
      <div className="absolute right-8 top-24 h-24 w-24 rounded-full bg-[#db4b87] opacity-50" />
      <div className="absolute bottom-16 left-[12%] hidden h-16 w-16 rotate-45 bg-[#3244b5] opacity-40 lg:block" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-[2.6rem] border-[3px] border-[#10163a] bg-white shadow-[10px_10px_0_#10163a]"
        >
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative overflow-hidden bg-[#fff8ed] px-6 py-8 text-[#10163a] md:px-8 md:py-10">
              <div className="absolute -left-8 top-10 h-24 w-24 rounded-[1.8rem] bg-[#3244b5] opacity-50" />
              <div className="absolute right-8 top-12 h-16 w-16 rounded-full bg-[#ffcb53] opacity-60" />

              <div className="relative z-10">
                <div className="retro-pill px-4 py-2 text-sm font-black text-[#10163a]">
                  <Sparkles size={14} className="text-[#ff9736]" />
                  {content.badge}
                </div>

                <h2 className="mt-5 max-w-2xl text-4xl font-black leading-[0.94] md:text-6xl">
                  {content.title}
                  <span className="block text-[#3244b5]">{content.highlight}</span>
                </h2>

                <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-[#445066] md:text-lg">
                  {content.description}
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {content.stats.map((item, index) => (
                    <div
                      key={item.label}
                      className="rounded-[1.4rem] px-4 py-5"
                      style={{ backgroundColor: ['#fff4e0', '#eef3ff', '#fff0f6'][index % 3], border: '1.5px solid rgba(16,22,58,0.08)' }}
                    >
                      <p className="text-2xl font-black text-[#10163a]">{item.value}</p>
                      <p className="mt-1 text-sm leading-6 text-[#445066]">{item.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    onClick={() => openPopup(primaryPopupOptions)}
                    className="inline-flex items-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#ff9736] px-7 py-3.5 text-sm font-black text-white shadow-[5px_5px_0_#10163a] transition hover:-translate-y-0.5"
                  >
                    Open Contact Form
                    <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={() => openPopup(counsellingPopupOptions)}
                    className="rounded-[1rem] border-[3px] border-[#10163a] bg-white px-7 py-3.5 text-sm font-black text-[#10163a] shadow-[5px_5px_0_#10163a] transition hover:-translate-y-0.5"
                  >
                    {content.popupCounselling.ctaLabel}
                  </button>
                </div>
              </div>
            </div>

            <div className="relative bg-[#fffdf7] px-6 py-8 md:px-8 md:py-10">
              <div className="grid gap-4">
                {quickActions.map((action) => {
                  const Icon = action.icon

                  return (
                    <button
                      key={action.title}
                      onClick={action.action}
                      className="group rounded-[1.8rem] border-[3px] border-[#10163a] bg-white p-5 text-left shadow-[6px_6px_0_#10163a] transition hover:-translate-y-1"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="rounded-[1rem] p-3 text-white"
                          style={{ backgroundColor: action.accent }}
                        >
                          <Icon size={18} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <h3 className="text-lg font-black text-[#10163a]">{action.title}</h3>
                            <ArrowRight
                              size={16}
                              className="text-[#94a3b8] transition group-hover:translate-x-1 group-hover:text-[#3244b5]"
                            />
                          </div>
                          <p className="mt-2 text-sm leading-7 text-[#475569]">{action.text}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-6 border-t-[3px] border-[#10163a] bg-white px-6 py-8 md:px-8 lg:grid-cols-[1.04fr_0.96fr]">
            <div className="space-y-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#3244b5]">
                  {content.supportEyebrow}
                </p>
                <h3 className="mt-2 text-3xl font-black text-[#10163a]">
                  {content.supportTitle}
                </h3>
                <p className="mt-3 max-w-2xl text-base leading-8 text-[#475569]">
                  {content.supportDescription}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {content.supportCards.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.5rem] p-5"
                    style={{ backgroundColor: item.color, border: '1.5px solid rgba(16,22,58,0.08)' }}
                  >
                    <h4 className="text-base font-black text-[#10163a]">{item.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-[#475569]">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5">
              <div className="relative h-[320px] overflow-hidden rounded-[2rem] bg-white" style={{ border: '1.5px solid rgba(16,22,58,0.1)', boxShadow: '0 4px 20px rgba(16,22,58,0.08)' }}>
                <iframe
                  src={content.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute inset-x-4 bottom-4 rounded-[1.5rem] bg-white p-4" style={{ border: '1.5px solid rgba(16,22,58,0.1)', boxShadow: '0 4px 16px rgba(16,22,58,0.1)' }}>
                  <div className="flex items-center gap-2 text-sm font-bold text-[#3244b5]">
                    <MapPin size={16} />
                    {content.mapTitle}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold text-[#334155]">
                    <a
                      href={`tel:${content.mapPhone.replace(/[^\d+]/g, '')}`}
                      className="inline-flex items-center gap-2 rounded-full border-[3px] border-[#10163a] bg-[#f8fbff] px-3 py-2 shadow-[3px_3px_0_#10163a] transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#10163a]"
                    >
                      <Phone size={15} />
                      {content.mapPhone}
                    </a>
                    <button
                      type="button"
                      onClick={() => openPopup(primaryPopupOptions)}
                      className="inline-flex items-center gap-2 rounded-full border-[3px] border-[#10163a] bg-[#fff7f1] px-3 py-2 text-[#fa8a43] shadow-[3px_3px_0_#10163a] transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#10163a]"
                    >
                      <Mail size={15} />
                      {content.mapButtonLabel}
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => openPopup(primaryPopupOptions)}
                className="rounded-[1.9rem] border-[3px] border-[#10163a] bg-[#3244b5] p-6 text-left text-white shadow-[7px_7px_0_#10163a] transition hover:-translate-y-1"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">{content.launchCardEyebrow}</p>
                <h4 className="mt-2 text-2xl font-black">{content.launchCardTitle}</h4>
                <p className="mt-3 text-sm leading-7 text-white/85">
                  {content.launchCardDescription}
                </p>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
