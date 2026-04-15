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
import { FormEvent, useEffect, useState } from 'react'
import { useContactPopup } from '@/app/components/common/ContactPopupProvider'
import { defaultSiteContent, loadSiteContent, SITE_CONTENT_UPDATED_EVENT } from '@/app/lib/siteContent'

type ContactFormState = {
  name: string
  email: string
  mobile: string
  interest: string
  message: string
}

const initialFormState: ContactFormState = {
  name: '',
  email: '',
  mobile: '',
  interest: 'General Enquiry',
  message: '',
}

const inputClass =
  'w-full rounded-[1rem] border-[3px] border-[#10163a] bg-white px-4 py-3 text-sm font-semibold text-[#10163a] shadow-[4px_4px_0_#10163a] outline-none placeholder:text-[#667085]'

export default function ContactSection() {
  const { openPopup } = useContactPopup()
  const [content, setContent] = useState(defaultSiteContent.contact)
  const [formState, setFormState] = useState<ContactFormState>(initialFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formMessage, setFormMessage] = useState('')

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

  const updateForm = <K extends keyof ContactFormState>(key: K, value: ContactFormState[K]) => {
    setFormState((current) => ({ ...current, [key]: value }))
    setFormMessage('')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setFormMessage('')

    const payload = new FormData()
    payload.append('source', 'contact-page-inline-form')
    payload.append('interest', formState.interest)
    payload.append('name', formState.name)
    payload.append('email', formState.email)
    payload.append('mobile', formState.mobile)
    payload.append('occupation', 'Website Visitor')
    payload.append('joiningTimeline', 'Just enquiry')
    payload.append('appointmentDate', '')
    payload.append('appointmentTime', '')
    payload.append('message', formState.message)

    const response = await fetch('/api/contact', {
      method: 'POST',
      body: payload,
    })

    setIsSubmitting(false)

    if (response.ok) {
      setFormMessage('Thanks. Our admissions team will contact you shortly.')
      setFormState(initialFormState)
      return
    }

    setFormMessage('We could not submit your enquiry right now. Please call or WhatsApp us directly.')
  }

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

              <form onSubmit={handleSubmit} className="rounded-[2rem] border-[3px] border-[#10163a] bg-[#fff8ed] p-6 shadow-[7px_7px_0_#10163a]">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-[#3244b5]">Quick Enquiry Form</p>
                <h4 className="mt-2 text-2xl font-black text-[#10163a]">Fill in your details and we will get back to you.</h4>
                <p className="mt-2 text-sm leading-7 text-[#475569]">This form is rendered directly on the page for faster enquiries and better crawlability.</p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    name="name"
                    required
                    value={formState.name}
                    onChange={(event) => updateForm('name', event.target.value)}
                    className={inputClass}
                    placeholder="Your name"
                  />
                  <input
                    type="tel"
                    name="mobile"
                    required
                    pattern="[0-9]{10}"
                    value={formState.mobile}
                    onChange={(event) => updateForm('mobile', event.target.value.replace(/\D/g, '').slice(0, 10))}
                    className={inputClass}
                    placeholder="10-digit phone number"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={(event) => updateForm('email', event.target.value)}
                    className={inputClass}
                    placeholder="Email address"
                  />
                  <select
                    name="interest"
                    value={formState.interest}
                    onChange={(event) => updateForm('interest', event.target.value)}
                    className={inputClass}
                  >
                    <option>General Enquiry</option>
                    <option>Graphic Design</option>
                    <option>UI/UX Design</option>
                    <option>Digital Marketing</option>
                    <option>Video Editing</option>
                  </select>
                </div>

                <textarea
                  name="message"
                  rows={4}
                  value={formState.message}
                  onChange={(event) => updateForm('message', event.target.value)}
                  className={`${inputClass} mt-4`}
                  placeholder="Tell us what you want to learn, your current level, or the batch you want to join."
                />

                {formMessage ? (
                  <p className="mt-4 text-sm font-bold text-[#3244b5]">{formMessage}</p>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-5 inline-flex items-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#ff9736] px-7 py-3.5 text-sm font-black text-white shadow-[5px_5px_0_#10163a] transition hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {isSubmitting ? 'Sending...' : 'Submit Enquiry'}
                  <ArrowRight size={16} />
                </button>
              </form>
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
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=12.8817134,80.2026107"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border-[3px] border-[#10163a] bg-[#fff7f1] px-3 py-2 text-[#fa8a43] shadow-[3px_3px_0_#10163a] transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#10163a]"
                    >
                      <MapPin size={15} />
                      Get Directions
                    </a>
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
                <div className="mt-5 flex flex-wrap gap-3 text-sm font-black">
                  <a href="mailto:support@traijoedu.in" className="inline-flex items-center gap-2 rounded-full border-[3px] border-white/20 bg-white/10 px-4 py-2">
                    <Mail size={15} />
                    support@traijoedu.in
                  </a>
                  <a href="https://wa.me/917358116929" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border-[3px] border-white/20 bg-white/10 px-4 py-2">
                    <MessageCircle size={15} />
                    WhatsApp Admissions
                  </a>
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
