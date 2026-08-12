'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle2, MessageCircle, PhoneCall } from 'lucide-react'
import { useContactPopup } from '@/app/components/common/ContactPopupProvider'
import { defaultConversionPages, type ConversionPagesContent } from '@/app/lib/conversionPages'

type PageKind = 'admissions' | 'counselling' | 'faq'

type ConversionLandingProps = {
  kind: PageKind
  content?: ConversionPagesContent
}

export default function ConversionLanding({ kind, content = defaultConversionPages }: ConversionLandingProps) {
  const { openPopup } = useContactPopup()
  const admission = kind === 'admissions'
  const counselling = kind === 'counselling'
  const { title, description, actionLabel } = admission ? content.admissions : counselling ? content.counselling : { ...content.faqPage, actionLabel: '' }

  const open = () =>
    openPopup({
      title: admission ? 'Start your admission application' : 'Book free career counselling',
      subtitle: admission
        ? 'Share your details and our admissions team will guide you through the appropriate course and next steps.'
        : 'Share your goals and our team will help you choose the appropriate course and learning path.',
      interest: admission ? 'Admission Application' : 'Free Career Counselling',
      source: admission ? 'admissions-page' : 'career-counselling-page',
      ctaLabel: admission ? 'Start My Application' : 'Book My Free Call',
    })

  return (
    <div className="conversion-page">
      <section className="conversion-page__hero">
        <div className="new-container">
          <p className="new-eyebrow">TSDC · Chennai</p>
          <h1>{title}</h1>
          <p>{description}</p>
          {kind !== 'faq' && (
            <div className="new-actions">
              <button onClick={open} className="new-button new-button--primary">
                {actionLabel} <ArrowRight size={17} />
              </button>
              <a className="new-button new-button--ghost" href="https://wa.me/919566656909" target="_blank" rel="noopener noreferrer">
                <MessageCircle size={17} /> WhatsApp us
              </a>
            </div>
          )}
        </div>
      </section>

      {admission && (
        <section className="conversion-page__section">
          <div className="new-container">
            <p className="new-eyebrow">A simple six-step process</p>
            <div className="conversion-steps">
              {content.admissionSteps.map((step, i) => (
                <div key={step}>
                  <span>0{i + 1}</span>
                  <strong>{step}</strong>
                </div>
              ))}
            </div>
            <p className="conversion-page__note">{content.admissionNote}</p>
          </div>
        </section>
      )}

      {counselling && (
        <section className="conversion-page__section">
          <div className="new-container conversion-page__grid">
            <div>
              <p className="new-eyebrow">What we&apos;ll discuss</p>
              <h2>{content.counsellingHeading}</h2>
            </div>
            <ul>
              {content.counsellingPoints.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={18} /> {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="conversion-page__section conversion-page__section--soft">
        <div className="new-container">
          <p className="new-eyebrow">Frequently asked questions</p>
          <div className="conversion-faq">
            {content.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  {faq.question}
                  <span>+</span>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
          {kind === 'faq' && (
            <div className="new-actions">
              <button onClick={open} className="new-button new-button--primary">
                Book free counselling <ArrowRight size={17} />
              </button>
              <Link href="/courses" className="new-button new-button--ghost">
                Explore courses
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="conversion-page__contact">
        <div className="new-container">
          <PhoneCall size={18} />
          <span>{content.contactPrompt}</span>
          <a href="tel:+919566656909">Call admissions</a>
          <a href="https://wa.me/919566656909" target="_blank" rel="noopener noreferrer">
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
