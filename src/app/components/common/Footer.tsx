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
    <footer className="relative z-10 overflow-hidden border-t-[3px] border-[#10163a] bg-[#fff8ef] px-6 py-16 text-sm text-[#39415f] sm:px-8">
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-6 md:grid-cols-5">
        <div className="col-span-2 space-y-4">
          <Image src="/logo.png" alt="TSDC Logo" width={150} height={40} />
          <p className="max-w-md text-sm leading-7 text-[#39415f]">
            TSDC is a brighter path into creative careers, with practical training, real projects, portfolio building, and mentorship that helps students become more visible and employable.
          </p>
          <div className="retro-pill px-4 py-2 text-xs font-black text-[#10163a]">
            <span className="h-2 w-2 rounded-full bg-[#fa8a43] animate-pulse-soft" />
            Built for students who want real outcomes
          </div>
          <div>
            <h5 className="mb-3 mt-5 uppercase tracking-[0.18em] text-[#10163a]">Social</h5>
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
          <h5 className="mb-3 uppercase tracking-[0.18em] text-[#10163a]">Contact</h5>
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
                className="hover:text-[#3244b5]"
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
                className="hover:text-[#3244b5]"
              >
                +91-73581-16929
              </button>
            </p>
            <p>Hours: Mon-Sat, 9AM - 6PM</p>
          </div>

          <div className="mt-4 rounded-[1.5rem] border-[3px] border-[#10163a] bg-white p-4 text-[#10163a] shadow-[5px_5px_0_#10163a]">
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

      <div className="relative z-10 mt-12 border-t-[3px] border-[#10163a] pt-6 text-center text-xs text-[#5c617d]">
        © {new Date().getFullYear()} Traijo Skill Development Center. Design | Marketing | Innovation
      </div>
    </footer>
  )
}
