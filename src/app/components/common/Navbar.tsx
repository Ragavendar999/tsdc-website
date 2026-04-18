'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  ChevronDown,
  Megaphone,
  Menu,
  MonitorSmartphone,
  MoveRight,
  Paintbrush,
  PhoneCall,
  Sparkles,
  Video,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useContactPopup } from '@/app/components/common/ContactPopupProvider'

type SubItem = {
  name: string
  href: string
  icon: React.ElementType
  accent: string
  tint: string
  desc: string
  badge?: string
}

type NavItem = {
  name: string
  href: string
  submenu?: SubItem[]
}

const navItems: NavItem[] = [
  { name: 'Home', href: '/' },
  {
    name: 'Courses',
    href: '/courses',
    submenu: [
      { name: 'Graphic Design', href: '/courses/graphic-design', icon: Paintbrush, accent: '#fa8a43', tint: '#fff4eb', desc: 'Branding, illustration, and social design' },
      { name: 'UI/UX Design', href: '/courses/uiux-design', icon: MonitorSmartphone, accent: '#4562b0', tint: '#eef4ff', desc: 'Figma, product thinking, and case studies' },
      { name: 'Digital Marketing', href: '/courses/digital-marketing', icon: Megaphone, accent: '#ea6865', tint: '#fff1f0', desc: 'SEO, ads, analytics, and growth' },
      { name: 'Video Editing', href: '/courses/video-editing', icon: Video, accent: '#4a4a99', tint: '#f2f0ff', desc: 'Reels, ads, motion, and showreels', badge: 'NEW' },
    ],
  },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const { openPopup } = useContactPopup()
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)

  const coursesItem = useMemo(() => navItems.find((item) => item.submenu), [])

  useEffect(() => {
    let lastScroll = window.scrollY

    const onScroll = () => {
      const current = window.scrollY
      setScrolled(current > 24)
      setHidden(current > 90 && current > lastScroll)
      lastScroll = current
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setDropdownOpen(false)
  }, [pathname])

  const openCounsellingPopup = (source: string) =>
    openPopup({
      title: 'Book Free Counselling',
      subtitle: 'Tell us where you are starting from and we will guide you to the right course, batch, and fee plan.',
      interest: 'Free Counselling',
      source,
      ctaLabel: 'Book My Session',
    })

  return (
    <motion.header
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: hidden ? -110 : 0, opacity: 1 }}
      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 right-0 top-0 z-[1200] px-3 pt-3 sm:px-4 sm:pt-4"
    >
      <div
        className={`relative mx-auto max-w-7xl overflow-visible rounded-[1.7rem] border-[3px] border-[#10163a] transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 shadow-[6px_6px_0_#10163a] backdrop-blur-xl'
            : 'bg-[#fffdf7] shadow-[6px_6px_0_#10163a]'
        }`}
      >
        <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] opacity-20 [background-image:radial-gradient(circle_at_1px_1px,rgba(50,68,181,0.16)_1px,transparent_0)] [background-size:24px_24px]" />

        <nav className="relative z-10 flex items-center justify-between gap-3 px-3 py-2.5 sm:px-4">
          <Link href="/" aria-label="TSDC home" onClick={() => setIsOpen(false)} className="shrink-0">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center rounded-[1rem] border-[3px] border-[#10163a] bg-white px-3 py-2 shadow-[3px_3px_0_#10163a]"
            >
              <Image src="/logo.png" alt="TSDC" width={72} height={26} priority />
            </motion.div>
          </Link>

          <ul className="hidden items-center gap-0.5 md:flex">
            {navItems.map((item) =>
              item.submenu ? (
                <li
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <Link
                    href={item.href}
                    aria-haspopup="menu"
                    aria-expanded={dropdownOpen}
                    onFocus={() => setDropdownOpen(true)}
                    className={`flex items-center gap-1.5 rounded-[0.9rem] px-3.5 py-2 text-xs font-black transition-all duration-200 ${
                      pathname.startsWith(item.href)
                        ? 'bg-[#10163a] text-white'
                        : 'text-[#10163a] hover:bg-[#10163a]/8'
                    }`}
                  >
                    {item.name}
                    <motion.span animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown size={13} />
                    </motion.span>
                  </Link>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-1/2 top-full z-50 mt-3 w-[30rem] -translate-x-1/2"
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                      >
                        <div className="overflow-hidden rounded-[1.8rem] border-[3px] border-[#10163a] bg-[#fffdf7] shadow-[8px_8px_0_#10163a]">
                          <div className="border-b-[3px] border-[#10163a] bg-[#10163a] px-5 py-3">
                            <p className="text-[10px] font-black uppercase tracking-[0.26em] text-white/60">Choose your creative path</p>
                          </div>

                          <div className="grid grid-cols-2 gap-2 p-3">
                            {item.submenu.map((sub, i) => {
                              const Icon = sub.icon
                              return (
                                <motion.div
                                  key={sub.href}
                                  initial={{ opacity: 0, y: 6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: i * 0.04 }}
                                >
                                  <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
                                    <Link
                                      href={sub.href}
                                      className="group relative flex items-start gap-3 overflow-hidden rounded-[1.2rem] border-[3px] border-[#10163a] p-3.5 shadow-[3px_3px_0_#10163a] transition-shadow hover:shadow-[5px_5px_0_#10163a]"
                                      style={{ backgroundColor: sub.tint }}
                                    >
                                      <motion.span
                                        initial={{ x: '-100%' }}
                                        whileHover={{ x: '220%' }}
                                        transition={{ duration: 0.5 }}
                                        className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                      />
                                      <motion.div
                                        whileHover={{ rotate: [0, -10, 8, -4, 0], scale: 1.12 }}
                                        transition={{ duration: 0.4 }}
                                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-[3px] border-[#10163a] text-white shadow-[3px_3px_0_#10163a]"
                                        style={{ backgroundColor: sub.accent }}
                                      >
                                        <Icon size={17} />
                                      </motion.div>
                                      <div className="min-w-0">
                                        <div className="flex items-center gap-1.5">
                                          <p className="text-xs font-black text-[#10163a]">{sub.name}</p>
                                          {sub.badge ? (
                                            <span className="rounded-full border-2 border-[#10163a] bg-[#db4b87] px-1.5 py-0.5 text-[8px] font-black text-white">
                                              {sub.badge}
                                            </span>
                                          ) : null}
                                        </div>
                                        <p className="mt-0.5 text-[10px] font-semibold text-[#667085]">{sub.desc}</p>
                                      </div>
                                    </Link>
                                  </motion.div>
                                </motion.div>
                              )
                            })}
                          </div>

                          <div className="flex items-center justify-between gap-3 border-t-[3px] border-[#10163a] px-4 py-3">
                            <Link href="/courses" className="flex items-center justify-between text-xs font-black text-[#3244b5] transition hover:text-[#10163a]">
                              View all courses
                              <ArrowRight size={13} />
                            </Link>
                            <button
                              type="button"
                              onClick={() => openCounsellingPopup('navbar-desktop-dropdown')}
                              className="rounded-[0.9rem] border-[3px] border-[#10163a] bg-[#ff9736] px-3 py-2 text-[11px] font-black text-white shadow-[3px_3px_0_#10163a]"
                            >
                              Need help choosing?
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-[0.9rem] px-3.5 py-2 text-xs font-black transition-all duration-200 ${
                      pathname === item.href ? 'bg-[#10163a] text-white' : 'text-[#10163a] hover:bg-[#10163a]/8'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              )
            )}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="tel:+917358116929"
              className="hidden items-center gap-2 rounded-[0.9rem] border-[3px] border-[#10163a] bg-white px-3 py-2 text-[10px] font-black text-[#10163a] shadow-[3px_3px_0_#10163a] transition hover:-translate-y-0.5 lg:flex"
            >
              <PhoneCall size={12} />
              Call Admissions
            </a>

            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => openCounsellingPopup('navbar-cta')}
              className="hidden items-center gap-2 rounded-[0.9rem] border-[3px] border-[#10163a] bg-[#ff9736] px-4 py-2 text-xs font-black text-white shadow-[3px_3px_0_#10163a] transition md:flex"
            >
              <Sparkles size={13} />
              Book Free Counselling
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              className="flex h-10 w-10 items-center justify-center rounded-[0.9rem] border-[3px] border-[#10163a] bg-white shadow-[3px_3px_0_#10163a] md:hidden"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.14 }}
                  >
                    <X size={18} className="text-[#10163a]" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.14 }}
                  >
                    <Menu size={18} className="text-[#10163a]" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>

        <AnimatePresence>
          {isOpen ? (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t-[3px] border-[#10163a]"
            >
              <div className="bg-[#0e1330] px-4 pb-5 pt-4">
                <div className="mb-4 rounded-[1.4rem] border-[2px] border-white/15 bg-white/8 p-4 text-white">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/45">Admissions help</p>
                  <p className="mt-2 text-lg font-black">Need help choosing your course?</p>
                  <p className="mt-2 text-sm leading-6 text-white/70">Call, WhatsApp, or send your details and we will help you pick the right next step.</p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <a
                      href="tel:+917358116929"
                      className="inline-flex items-center justify-center gap-2 rounded-[1rem] border-[2px] border-white/15 bg-white/10 px-4 py-3 text-sm font-black text-white"
                    >
                      <PhoneCall size={15} />
                      Call Now
                    </a>
                    <a
                      href="https://wa.me/917358116929"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-[1rem] border-[2px] border-white/15 bg-white/10 px-4 py-3 text-sm font-black text-white"
                    >
                      <Sparkles size={15} />
                      WhatsApp
                    </a>
                  </div>
                </div>

                <div className="mb-4 flex flex-col gap-1">
                  {navItems.filter((item) => !item.submenu).map((item, idx) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`block rounded-[1rem] px-4 py-3 text-sm font-black transition-all ${
                          pathname === item.href ? 'bg-white text-[#10163a]' : 'text-white/75 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mb-4">
                  <p className="mb-2.5 px-1 text-[10px] font-black uppercase tracking-[0.24em] text-white/40">Courses</p>
                  <div className="flex flex-col gap-2">
                    {coursesItem?.submenu?.map((sub, i) => {
                      const Icon = sub.icon
                      return (
                        <motion.div
                          key={sub.href}
                          initial={{ opacity: 0, x: -18 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.08 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <Link
                            href={sub.href}
                            onClick={() => setIsOpen(false)}
                            className="group relative flex items-center gap-3 overflow-hidden rounded-[1.3rem] border-[2.5px] border-white/10 p-3.5 transition-colors duration-200 hover:border-white/30"
                            style={{ backgroundColor: `${sub.accent}20` }}
                          >
                            <motion.span
                              initial={{ x: '-100%' }}
                              whileHover={{ x: '200%' }}
                              transition={{ duration: 0.5, ease: 'easeInOut' }}
                              className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                            />

                            <motion.div
                              whileHover={{ rotate: [0, -12, 10, -6, 0], scale: 1.1 }}
                              transition={{ duration: 0.45 }}
                              className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.85rem] border-2 border-white/25 text-white shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                              style={{ backgroundColor: sub.accent }}
                            >
                              <Icon size={16} />
                            </motion.div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <p className="text-sm font-black leading-tight text-white">{sub.name}</p>
                                {sub.badge ? (
                                  <span className="rounded-full bg-[#db4b87] px-1.5 py-0.5 text-[8px] font-black text-white">
                                    {sub.badge}
                                  </span>
                                ) : null}
                              </div>
                              <p className="mt-0.5 text-[11px] font-semibold text-white/50">{sub.desc}</p>
                            </div>

                            <motion.span
                              initial={{ opacity: 0, x: -6 }}
                              whileHover={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.18 }}
                              className="shrink-0 text-white/60"
                            >
                              <MoveRight size={15} />
                            </motion.span>
                          </Link>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 pt-1">
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    onClick={() => {
                      setIsOpen(false)
                      openCounsellingPopup('navbar-mobile-counselling')
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-[1.1rem] border-[3px] border-[#10163a] bg-[#ff9736] py-3.5 text-sm font-black text-white shadow-[4px_4px_0_rgba(0,0,0,0.4)]"
                  >
                    <Sparkles size={15} />
                    Book Free Counselling
                  </motion.button>
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.36 }}
                    onClick={() => {
                      setIsOpen(false)
                      openPopup({
                        title: 'Talk to Admissions',
                        subtitle: 'We will get back to you quickly with course details, fees, and next steps.',
                        interest: 'General Enquiry',
                        source: 'navbar-mobile-enquiry',
                        ctaLabel: 'Send Enquiry',
                      })
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-[1.1rem] border-[3px] border-white/20 bg-white/10 py-3 text-sm font-black text-white"
                  >
                    Send Enquiry
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
