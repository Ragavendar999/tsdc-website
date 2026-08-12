'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { useContactPopup } from '@/app/components/common/ContactPopupProvider'
import { defaultNavigation, fetchNavigation, type NavigationContent } from '@/app/lib/navigation'
import { defaultSiteSettings, type SiteSettings } from '@/app/lib/siteSettings'

export default function Footer() {
  const { openPopup } = useContactPopup()
  const [nav, setNav] = useState<NavigationContent>(defaultNavigation)
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings)

  useEffect(() => {
    fetchNavigation().then(setNav)
    fetch('/api/content/siteSettings')
      .then((res) => res.json())
      .then((payload: { value?: SiteSettings }) => {
        if (payload.value) setSettings(payload.value)
      })
      .catch(() => {})
  }, [])

  const { footer } = nav
  const { general } = settings
  const whatsappHref = `https://wa.me/${general.whatsappNumber}`

  return (
    <footer className="tsdc-footer">
      <div className="tsdc-footer__top">
        <div className="tsdc-footer__container">
          <div>
            <p>{footer.ctaEyebrow}</p>
            <h2>{footer.ctaHeading}</h2>
          </div>
          <div className="tsdc-footer__top-actions">
            <button
              onClick={() =>
                openPopup({
                  title: 'Book free career counselling',
                  subtitle: 'Share your goal and our team will guide you to the right programme and next step.',
                  interest: 'Free Career Counselling',
                  source: 'footer-counselling',
                  ctaLabel: 'Book My Free Call',
                })
              }
            >
              {footer.ctaButtonLabel}
            </button>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              {footer.whatsappLinkLabel}
            </a>
          </div>
        </div>
      </div>
      <div className="tsdc-footer__container tsdc-footer__grid">
        <div className="tsdc-footer__brand">
          <Image src="/logo.png" alt="TSDC - Traijo Skill Development Center" width={150} height={50} />
          <p>{footer.brandTagline}</p>
          <div className="tsdc-footer__social">
            <a href={`https://www.instagram.com/${general.instagramHandle}/`} target="_blank" rel="noopener noreferrer" aria-label="TSDC on Instagram">
              <Instagram size={17} />
            </a>
            <a href={general.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="TSDC on Facebook">
              <Facebook size={17} />
            </a>
            <a href={general.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="TSDC on LinkedIn">
              <Linkedin size={17} />
            </a>
          </div>
        </div>
        <FooterColumn title="Courses" links={footer.courseLinks} />
        <FooterColumn title="TSDC" links={footer.tsdcLinks} />
        <FooterColumn title="Support" links={footer.supportLinks} />
        <div className="tsdc-footer__contact">
          <h3>Contact</h3>
          <a href={`tel:${general.adminPhone.replace(/\s/g, '')}`}>
            <Phone size={16} /> {general.adminPhone}
          </a>
          <a href={`mailto:${general.contactEmail}`}>
            <Mail size={16} /> {general.contactEmail}
          </a>
          <p>
            <MapPin size={16} /> {general.address}
          </p>
          <a className="tsdc-footer__whatsapp" href={whatsappHref} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={16} /> {footer.whatsappAdmissionsLabel}
          </a>
        </div>
      </div>
      <div className="tsdc-footer__bottom">
        <div className="tsdc-footer__container">
          <span>© {new Date().getFullYear()} Traijo Skill Development Center. All rights reserved.</span>
          <span>{footer.disclaimerText}</span>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="tsdc-footer__column">
      <h3>{title}</h3>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
