'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CalendarDays, CheckCircle2, CircleHelp, GraduationCap, Mail, MapPin, MessageCircle, Phone, Send, UsersRound } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { useContactPopup } from '@/app/components/common/ContactPopupProvider'
import { defaultContactPage, type ContactBenefitIcon, type ContactPageContent, type ContactWayIcon } from '@/app/lib/contactPage'
import { defaultSiteSettings, type SiteSettings } from '@/app/lib/siteSettings'

const wayIcons: Record<ContactWayIcon, typeof Phone> = { phone: Phone, chat: MessageCircle, mail: Mail, map: MapPin }
const benefitIcons: Record<ContactBenefitIcon, typeof GraduationCap> = { education: GraduationCap, calendar: CalendarDays, team: UsersRound, help: CircleHelp }

type ContactSectionProps = {
  content?: ContactPageContent
  settings?: SiteSettings
}

export default function ContactSection({ content = defaultContactPage, settings = defaultSiteSettings }: ContactSectionProps) {
  const { openPopup } = useContactPopup()
  const [form, setForm] = useState({ name: '', email: '', mobile: '', reason: '', course: '', message: '' })
  const [message, setMessage] = useState('')
  const { hero, form: formCopy, waysHeading, ways, map, benefits, faq, cta } = content
  const { general } = settings

  const wayValue = (icon: ContactWayIcon) => {
    if (icon === 'phone' || icon === 'chat') return general.adminPhone
    if (icon === 'mail') return general.contactEmail
    return general.address
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setMessage('')
    const d = new FormData()
    Object.entries(form).forEach(([key, value]) => d.append(key, value))
    d.append('interest', form.course || form.reason || 'General Enquiry')
    d.append('source', 'contact-page')
    d.append('occupation', '')
    d.append('joiningTimeline', '')
    d.append('appointmentDate', '')
    d.append('appointmentTime', '')
    const r = await fetch('/api/contact', { method: 'POST', body: d })
    setMessage(r.ok ? 'Thank you — our admissions team will contact you shortly.' : 'Unable to send right now. Please call or WhatsApp us directly.')
    if (r.ok) setForm({ name: '', email: '', mobile: '', reason: '', course: '', message: '' })
  }

  const counsel = () =>
    openPopup({
      title: 'Book Free Career Counselling',
      subtitle: 'Tell us your goal and receive clear guidance on the right course, fees and next steps.',
      interest: 'Free Career Counselling',
      source: 'contact-page',
      ctaLabel: 'Book My Free Call',
    })

  return (
    <div className="contact-ref">
      <section className="contact-ref__hero">
        <div className="contact-ref__wrap contact-ref__hero-grid">
          <div className="contact-ref__copy">
            <p>{hero.eyebrow}</p>
            <h1>
              {hero.titleLine1}
              <br />
              <b>{hero.titleHighlight}</b>
            </h1>
            <span>{hero.description}</span>
            <div className="contact-ref__promises">
              {hero.promises.map((promise) => (
                <article key={promise.title}>
                  <CheckCircle2 />
                  <strong>{promise.title}</strong>
                  <small>{promise.copy}</small>
                </article>
              ))}
            </div>
          </div>
          <form onSubmit={submit} className="contact-ref__form">
            <h2>{formCopy.heading}</h2>
            <p>{formCopy.description}</p>
            <div className="contact-ref__form-grid">
              <input required placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input required type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input
                required
                inputMode="numeric"
                placeholder="Phone Number"
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })}
              />
              <select required value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })}>
                <option value="">Your Interest</option>
                <option>Course Admission</option>
                <option>Career Counselling</option>
                <option>Partnerships</option>
              </select>
            </div>
            <select required value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })}>
              <option value="">Course Interested In</option>
              <option>Graphic Design</option>
              <option>UI/UX Design</option>
              <option>Digital Marketing</option>
              <option>Video Editing</option>
              <option>Motion Graphics</option>
            </select>
            <textarea placeholder="Your Message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            {message && <small className="contact-ref__message">{message}</small>}
            <label>
              <input required type="checkbox" /> I agree to the <Link href="/privacy-policy">privacy policy</Link> and terms.
            </label>
            <button>
              Send Message <Send size={15} />
            </button>
          </form>
        </div>
      </section>

      <section className="contact-ref__wrap contact-ref__ways">
        <h2>{waysHeading}</h2>
        <div>
          {ways.map((way) => {
            const Icon = wayIcons[way.icon]
            return (
              <article key={way.title}>
                <Icon />
                <strong>{way.title}</strong>
                <b>{wayValue(way.icon)}</b>
                <span>{way.copy}</span>
              </article>
            )
          })}
        </div>
      </section>

      <section className="contact-ref__wrap contact-ref__details">
        <div className="contact-ref__map">
          <h2>{map.heading}</h2>
          <iframe src={map.embedUrl} loading="lazy" title="TSDC location" />
          <article>
            <strong>
              {map.addressName.split('\n').map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </strong>
            <span>{map.addressLine}</span>
            <a href={map.directionsUrl} target="_blank" rel="noopener noreferrer">
              Get Directions <ArrowRight size={14} />
            </a>
          </article>
        </div>
        <div className="contact-ref__benefits">
          <h2>{benefits.heading}</h2>
          {benefits.items.map((item) => {
            const Icon = benefitIcons[item.icon]
            return (
              <article key={item.title}>
                <Icon />
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.description}</span>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="contact-ref__wrap contact-ref__faq">
        <header>
          <p>{faq.eyebrow}</p>
          <h2>{faq.heading}</h2>
        </header>
        {faq.questions.map((q) => (
          <details key={q}>
            <summary>
              {q}
              <ArrowRight size={16} />
            </summary>
            <p>{faq.genericAnswer}</p>
          </details>
        ))}
      </section>

      <section className="contact-ref__wrap contact-ref__cta">
        <Image src={cta.image} alt="TSDC student" fill className="object-cover" />
        <div>
          <h2>{cta.heading}</h2>
          <p>{cta.description}</p>
        </div>
        <button onClick={counsel}>{cta.buttonLabel}</button>
        <Link href="/courses">
          {cta.exploreLabel} <ArrowRight size={15} />
        </Link>
      </section>
    </div>
  )
}
