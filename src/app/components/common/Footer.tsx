'use client'

import { Facebook, Instagram, Linkedin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useContactPopup } from '@/app/components/common/ContactPopupProvider'
import { legalLinks } from '@/app/lib/legalPages'

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/traijosdc_official/',
    icon: Instagram,
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/Traijosdc',
    icon: Facebook,
  },
  {
    name: 'LinkedIn',
    href: 'https://in.linkedin.com/company/traijoskilldevelopmentcenter',
    icon: Linkedin,
  },
]

export default function Footer() {
  const { openPopup } = useContactPopup()

  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/10 bg-[#081225] px-6 py-16 text-sm text-white/78 sm:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-8 top-10 h-24 w-24 rounded-full bg-[#4562b0]/18" />
        <div className="absolute right-12 top-16 h-20 w-20 rounded-[1.5rem] bg-[#fa8a43]/18" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-6 md:grid-cols-5">
        <div className="col-span-2 space-y-4">
          <Image src="/logo.png" alt="TSDC Logo" width={150} height={40} className="brightness-0 invert" />
          <p className="max-w-md text-sm leading-7 text-white/76">
            TSDC is a brighter path into creative careers, with practical training, real projects, portfolio building, and mentorship that helps students become more visible and employable.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black text-[#ffd54f]">
            <span className="h-2 w-2 rounded-full bg-[#fa8a43] animate-pulse-soft" />
            Built for students who want real outcomes
          </div>
          <div>
            <h5 className="mb-3 mt-5 uppercase tracking-[0.18em] text-white">Social</h5>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit TSDC on ${social.name}`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/10 text-white transition hover:-translate-y-1 hover:bg-[#4562b0]"
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div>
          <h5 className="mb-3 uppercase tracking-[0.18em] text-white">Courses</h5>
          <ul className="space-y-2.5">
            {['graphic-design', 'uiux-design', 'digital-marketing', 'video-editing'].map((slug) => (
              <li key={slug}>
                <Link href={`/courses/${slug}`} className="transition hover:text-[#ffd54f]">
                  {slug.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="mb-3 uppercase tracking-[0.18em] text-white">Legal</h5>
          <ul className="space-y-2.5">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-[#ffd54f]">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="mb-3 uppercase tracking-[0.18em] text-white">Contact</h5>
          <div className="space-y-2.5">
            <p>
              Email:{' '}
              <button
                type="button"
                onClick={() =>
                  openPopup({
                    title: 'Reach Our Support Team',
                    subtitle: 'Send us your question and we will reply using the same admissions flow.',
                    interest: 'Support Enquiry',
                    source: 'footer-email',
                    ctaLabel: 'Send Message',
                  })
                }
                className="hover:text-[#ffd54f]"
              >
                support@traijoedu.in
              </button>
            </p>
            <p>
              Phone:{' '}
              <button
                type="button"
                onClick={() =>
                  openPopup({
                    title: 'Talk to Our Team',
                    subtitle: 'Share your details and our team will contact you as soon as possible.',
                    interest: 'Phone Callback',
                    source: 'footer-phone',
                    ctaLabel: 'Request Callback',
                  })
                }
                className="hover:text-[#ffd54f]"
              >
                +91-73581-16929
              </button>
            </p>
            <p>Hours: Mon-Sat, 9AM - 6PM</p>
          </div>

          <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-white/8 p-4 text-white">
            <strong>Address:</strong>
            <p className="mt-2 leading-6">
              Villa 20, Block 52,
              <br />
              Bollineni Hillside Rd, Nookampalayam,
              <br />
              Perumbakkam, Chennai, Tamil Nadu 600131.
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Traijo Skill Development Center. All rights reserved.
      </div>
    </footer>
  )
}
