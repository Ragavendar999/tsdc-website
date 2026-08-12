'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, MessageCircle, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useContactPopup } from '@/app/components/common/ContactPopupProvider'
import { defaultNavigation, fetchNavigation, type NavigationContent } from '@/app/lib/navigation'
import { defaultSiteSettings, type SiteSettings } from '@/app/lib/siteSettings'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [coursesOpen, setCoursesOpen] = useState(false)
  const [nav, setNav] = useState<NavigationContent>(defaultNavigation)
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings)
  const closeCoursesTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { openPopup } = useContactPopup()
  const pathname = usePathname()

  useEffect(() => {
    fetchNavigation().then(setNav)
    fetch('/api/content/siteSettings')
      .then((res) => res.json())
      .then((payload: { value?: SiteSettings }) => {
        if (payload.value) setSettings(payload.value)
      })
      .catch(() => {})
  }, [])

  const openCourses = () => {
    if (closeCoursesTimer.current) clearTimeout(closeCoursesTimer.current)
    setCoursesOpen(true)
  }
  const closeCourses = () => {
    closeCoursesTimer.current = setTimeout(() => setCoursesOpen(false), 220)
  }
  const bookCounselling = () =>
    openPopup({
      title: 'Book free career counselling',
      subtitle: 'Tell us what you want to learn and we will help you choose the right course and next step.',
      interest: 'Free Career Counselling',
      source: 'navbar-counselling',
      ctaLabel: 'Book My Free Call',
    })

  return (
    <header className="tsdc-nav">
      <div className="tsdc-nav__inner">
        <Link href="/" aria-label="TSDC home" className="tsdc-nav__logo">
          <Image src="/logo.png" alt="TSDC - Traijo Skill Development Center" width={132} height={45} priority />
        </Link>
        <nav aria-label="Primary navigation" className="tsdc-nav__links">
          {nav.navbar.links.map((link) =>
            link.href === '/courses' ? (
              <div className="tsdc-nav__course" key={link.label} onMouseEnter={openCourses} onMouseLeave={closeCourses}>
                <Link className={pathname.startsWith('/courses') ? 'active' : ''} href={link.href}>
                  {link.label} <ChevronDown size={13} />
                </Link>
                {coursesOpen && (
                  <div className="tsdc-nav__menu">
                    {nav.navbar.courseDropdown.map((course) => (
                      <Link key={course.href} href={course.href}>
                        {course.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link className={pathname === link.href ? 'active' : ''} key={link.href} href={link.href}>
                {link.label}
              </Link>
            )
          )}
        </nav>
        <div className="tsdc-nav__actions">
          <a
            href={`https://wa.me/${settings.general.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp TSDC"
          >
            <MessageCircle size={18} />
          </a>
          <button onClick={bookCounselling}>{nav.navbar.counsellingButtonLabel}</button>
        </div>
        <button
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="tsdc-nav__toggle"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="tsdc-nav__mobile">
          <nav>
            {nav.navbar.links.map((link) => (
              <Link onClick={() => setOpen(false)} key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
            <div className="tsdc-nav__mobile-courses">
              {nav.navbar.courseDropdown.map((course) => (
                <Link onClick={() => setOpen(false)} key={course.href} href={course.href}>
                  {course.label}
                </Link>
              ))}
            </div>
            {nav.navbar.mobileExtraLinks.map((link) => (
              <Link onClick={() => setOpen(false)} key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            onClick={() => {
              setOpen(false)
              bookCounselling()
            }}
          >
            Book Free Counselling
          </button>
        </div>
      )}
    </header>
  )
}
