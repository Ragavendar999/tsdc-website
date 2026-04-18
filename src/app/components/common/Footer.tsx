'use client'

import { Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, PhoneCall } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useContactPopup } from '@/app/components/common/ContactPopupProvider'
import { legalLinks } from '@/app/lib/legalPages'
import { defaultSiteContent, loadSiteContent, SITE_CONTENT_UPDATED_EVENT } from '@/app/lib/siteContent'

const socialIcons = {
  Instagram,
  Facebook,
  LinkedIn: Linkedin,
}

export default function Footer() {
  const { openPopup } = useContactPopup()
  const [content, setContent] = useState(defaultSiteContent.footer)

  useEffect(() => {
    const syncContent = () => setContent(loadSiteContent().footer)

    syncContent()
    window.addEventListener('storage', syncContent)
    window.addEventListener(SITE_CONTENT_UPDATED_EVENT, syncContent)

    return () => {
      window.removeEventListener('storage', syncContent)
      window.removeEventListener(SITE_CONTENT_UPDATED_EVENT, syncContent)
    }
  }, [])

  return (
    <footer className="relative z-10 overflow-hidden border-t-[3px] border-[#10163a] bg-[#fff8ef] px-6 py-16 text-sm text-[#39415f] sm:px-8">
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,rgba(50,68,181,0.14)_1px,transparent_0)] [background-size:22px_22px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8 grid gap-5 rounded-[2rem] border-[3px] border-[#10163a] bg-white p-6 shadow-[7px_7px_0_#10163a] lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#3244b5]">Need help before you decide?</p>
            <h2 className="mt-2 text-3xl font-black text-[#10163a]">Talk to admissions and get a clear next step.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#475569]">
              Ask about courses, fees, batch timings, or which program suits your goals. We will guide you without the hard sell.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href={`tel:${content.contactPhone.replace(/[^\d+]/g, '')}`}
              className="inline-flex items-center justify-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#fff8ed] px-4 py-3 text-sm font-black text-[#10163a] shadow-[4px_4px_0_#10163a]"
            >
              <PhoneCall size={16} />
              Call Admissions
            </a>
            <a
              href="https://wa.me/917358116929"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#eef3ff] px-4 py-3 text-sm font-black text-[#10163a] shadow-[4px_4px_0_#10163a]"
            >
              <MessageCircle size={16} />
              WhatsApp Us
            </a>
            <a
              href={`mailto:${content.contactEmail}`}
              className="inline-flex items-center justify-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#fff1f6] px-4 py-3 text-sm font-black text-[#10163a] shadow-[4px_4px_0_#10163a]"
            >
              <Mail size={16} />
              Email Support
            </a>
            <button
              type="button"
              onClick={() =>
                openPopup({
                  title: 'Talk to TSDC Admissions',
                  subtitle: 'Share your details and we will help you choose the right course, batch, and next step.',
                  interest: 'General Enquiry',
                  source: 'footer-final-cta',
                  ctaLabel: 'Send My Enquiry',
                })
              }
              className="inline-flex items-center justify-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#ff9736] px-4 py-3 text-sm font-black text-white shadow-[4px_4px_0_#10163a]"
            >
              <MessageCircle size={16} />
              Open Enquiry Form
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-6 md:grid-cols-[1.2fr_0.7fr_0.7fr_1fr]">
          <div className="space-y-4">
            <Image src="/logo.png" alt="TSDC Logo" width={150} height={40} />
            <p className="max-w-md text-sm leading-7 text-[#39415f]">{content.description}</p>
            <div className="retro-pill px-4 py-2 text-xs font-black text-[#10163a]">
              <span className="h-2 w-2 rounded-full bg-[#fa8a43] animate-pulse-soft" />
              {content.pillText}
            </div>
            <div>
              <h5 className="mb-3 mt-5 uppercase tracking-[0.18em] text-[#10163a]">Social</h5>
              <div className="flex flex-wrap gap-3">
                {content.socialLinks.map((social) => {
                  const Icon = socialIcons[social.name as keyof typeof socialIcons] || Instagram
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit TSDC on ${social.name}`}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-[1rem] border-[3px] border-[#10163a] bg-white text-[#10163a] shadow-[4px_4px_0_#10163a] transition hover:-translate-y-1 hover:bg-[#3244b5] hover:text-white"
                    >
                      <Icon size={18} />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          <div>
            <h5 className="mb-3 uppercase tracking-[0.18em] text-[#10163a]">Courses</h5>
            <ul className="space-y-2.5">
              {[
                { slug: 'graphic-design', label: 'Graphic Design' },
                { slug: 'uiux-design', label: 'UI/UX Design' },
                { slug: 'digital-marketing', label: 'Digital Marketing' },
                { slug: 'video-editing', label: 'Video Editing' },
              ].map(({ slug, label }) => (
                <li key={slug}>
                  <Link href={`/courses/${slug}`} className="transition hover:text-[#3244b5]">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="mb-3 uppercase tracking-[0.18em] text-[#10163a]">Legal</h5>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-[#3244b5]">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="mb-3 uppercase tracking-[0.18em] text-[#10163a]">Visit Or Contact</h5>
            <div className="space-y-3">
              <a href={`mailto:${content.contactEmail}`} className="flex items-start gap-3 rounded-[1.2rem] bg-white px-4 py-3 shadow-[3px_3px_0_#10163a]" style={{ border: '2px solid rgba(16,22,58,0.12)' }}>
                <Mail size={16} className="mt-0.5 shrink-0 text-[#3244b5]" />
                <span>{content.contactEmail}</span>
              </a>
              <a href={`tel:${content.contactPhone.replace(/[^\d+]/g, '')}`} className="flex items-start gap-3 rounded-[1.2rem] bg-white px-4 py-3 shadow-[3px_3px_0_#10163a]" style={{ border: '2px solid rgba(16,22,58,0.12)' }}>
                <PhoneCall size={16} className="mt-0.5 shrink-0 text-[#ff9736]" />
                <span>{content.contactPhone}</span>
              </a>
              <div className="rounded-[1.5rem] bg-[#f0f4ff] p-4 text-[#10163a]" style={{ border: '1.5px solid rgba(50,68,181,0.15)' }}>
                <div className="flex items-center gap-2 font-black">
                  <MapPin size={16} className="text-[#3244b5]" />
                  Chennai Campus
                </div>
                <p className="mt-2 leading-6">
                  {content.addressLines.map((line, index) => (
                    <span key={`${line}-${index}`}>
                      {line}
                      {index < content.addressLines.length - 1 ? <br /> : null}
                    </span>
                  ))}
                </p>
                <p className="mt-3 text-xs font-semibold text-[#475569]">Hours: {content.contactHours}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-12 border-t-[3px] border-[#10163a] pt-6 text-center text-xs text-[#5c617d]">
          &copy; {new Date().getFullYear()} Traijo Skill Development Center. {content.copyrightLine}
        </div>
      </div>
    </footer>
  )
}
