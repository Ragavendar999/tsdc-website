'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, Sparkles, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useContactPopup } from '@/app/components/common/ContactPopupProvider'

const navItems = [
  { name: 'Home', href: '/' },
  {
    name: 'Courses',
    href: '/courses',
    submenu: [
      { name: 'Graphic Design', href: '/courses/graphic-design', icon: 'GD' },
      { name: 'UI/UX Design', href: '/courses/uiux-design', icon: 'UX' },
      { name: 'Digital Marketing', href: '/courses/digital-marketing', icon: 'DM' },
      { name: 'Video Editing', href: '/courses/video-editing', icon: 'VE', badge: 'NEW' },
    ],
  },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const { openPopup } = useContactPopup()
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrolling, setScrolling] = useState(false)

  useEffect(() => {
    let lastScroll = window.scrollY

    const onScroll = () => {
      const current = window.scrollY
      setScrolled(current > 16)
      setScrolling(current > 70 && current > lastScroll)
      lastScroll = current
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: scrolling ? -96 : 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="fixed left-0 top-0 z-[1200] w-full"
    >
      <div className="relative overflow-hidden border-b border-[#314c9b] bg-[#4562b0] transition-all duration-300">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.45)_1px,transparent_0)] [background-size:18px_18px]" />
        <div className="pointer-events-none absolute -left-10 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-[#ff8743]" />
        <div className="pointer-events-none absolute right-[18%] top-0 h-8 w-28 rounded-b-full bg-white/15" />
        <div className="pointer-events-none absolute right-8 top-1/2 h-11 w-11 -translate-y-1/2 rotate-12 rounded-[1rem] bg-[#ea6865]" />
        <nav className="relative z-10 mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-3 md:px-6">
          <motion.div whileHover={{ y: -1 }} className="hidden justify-self-start md:block">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-black text-[#111827]"
            >
              <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
              admissions open
            </Link>
          </motion.div>

          <ul className="hidden items-center gap-1 rounded-full border border-black/10 bg-white px-2 py-1.5 text-xs font-black text-[#111827] md:flex">
            <li>
              <Link
                href="/"
                aria-label="TSDC home"
                className="mr-1 flex h-9 w-16 items-center justify-center rounded-full bg-white px-2"
              >
                <Image src="/logo.png" alt="TSDC Logo" width={52} height={22} priority />
              </Link>
            </li>
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
                    className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 transition-all duration-200 ${
                      pathname.startsWith(item.href)
                        ? 'bg-[#4562b0] text-white'
                        : 'text-[#111827] hover:bg-[#eef4ff] hover:text-[#4562b0]'
                    }`}
                  >
                    {item.name}
                    <motion.span animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown size={14} />
                    </motion.span>
                  </Link>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-0 top-full z-50 mt-2 w-80"
                      >
                        <div className="overflow-hidden rounded-[1.35rem] border border-white/20 bg-[#4562b0] p-2">
                          <div className="px-3 pb-2 pt-1 text-[10px] font-black uppercase tracking-[0.22em] text-white/65">
                            Choose your course
                          </div>
                          {item.submenu.map((sub, i) => (
                            <motion.div
                              key={sub.href}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.04 }}
                            >
                              <Link
                                href={sub.href}
                                className="group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-white transition-all hover:bg-white hover:text-[#4562b0]"
                              >
                                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-xs font-bold text-[#4562b0]">
                                  {sub.icon}
                                </span>
                                <span className="flex-1 font-black">{sub.name}</span>
                                {sub.badge && (
                                  <span className="rounded-full bg-[#ea6865] px-2 py-0.5 text-[10px] font-bold text-white">
                                    {sub.badge}
                                  </span>
                                )}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`rounded-full px-3.5 py-2 transition-all duration-200 ${
                      pathname === item.href
                        ? 'bg-[#4562b0] text-white'
                        : 'text-[#111827] hover:bg-[#eef4ff] hover:text-[#4562b0]'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              )
            )}
          </ul>

          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => setIsOpen(!isOpen)}
            className="col-span-2 justify-self-end flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-black text-[#111827] md:hidden"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
            <span className="text-xs font-semibold">Menu</span>
          </motion.button>

          <motion.div whileHover={{ y: -1 }} className="hidden justify-self-end md:block">
            <button
              type="button"
              onClick={() =>
                openPopup({
                  title: 'Start Your Career With TSDC',
                  subtitle: 'Share your details and we will help you choose the right creative path.',
                  interest: 'Start Your Career',
                  source: 'navbar-right-career-pill',
                  ctaLabel: 'Start My Career Journey',
                })
              }
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-black text-[#111827]"
            >
              <Sparkles size={14} className="text-[#4562b0]" />
              start your career
            </button>
          </motion.div>
        </nav>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="col-span-3 overflow-hidden rounded-[1.6rem] border border-black/10 bg-white md:hidden"
            >
              <div className="space-y-2 px-5 py-5">
                {navItems.map((item, idx) =>
                  item.submenu ? (
                    <div key={item.name} className="rounded-[1.5rem] bg-[#f8fbff] p-2">
                      <motion.div
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="px-3 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#4562b0]"
                      >
                        {item.name}
                      </motion.div>
                      {item.submenu.map((sub, si) => (
                        <motion.div
                          key={sub.href}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (idx + si) * 0.05 }}
                        >
                          <Link
                            href={sub.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-black text-[#1b2940] transition-all hover:bg-white hover:text-[#4562b0]"
                          >
                            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-xs font-black text-[#4562b0]">
                              {sub.icon}
                            </span>
                            <span className="font-medium">{sub.name}</span>
                            {sub.badge && (
                              <span className="ml-auto rounded-full bg-[#ea6865] px-2 py-0.5 text-[10px] font-bold text-white">
                                {sub.badge}
                              </span>
                            )}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`block rounded-[1.4rem] px-4 py-3.5 text-sm font-black transition-all ${
                          pathname === item.href
                            ? 'bg-[#4562b0] text-white'
                            : 'text-[#1b2940] hover:bg-[#eef4ff] hover:text-[#4562b0]'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  )
                )}

                <div className="space-y-2 pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false)
                      openPopup({
                        title: 'Start Your Career With TSDC',
                        subtitle: 'Share your details and we will help you choose the right creative path.',
                        interest: 'Start Your Career',
                        source: 'navbar-mobile-start-career',
                        ctaLabel: 'Start My Career Journey',
                      })
                    }}
                    className="flex items-center justify-center gap-2 rounded-[1.4rem] bg-[#4562b0] py-3.5 text-sm font-black text-white"
                  >
                    <Sparkles size={14} />
                    Start Your Career
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false)
                      openPopup({
                        title: 'Talk to Our Admissions Team',
                        subtitle: 'We will get back to you quickly with course details and next steps.',
                        interest: 'General Enquiry',
                        source: 'navbar-mobile-chat',
                        ctaLabel: 'Send Enquiry',
                      })
                    }}
                    className="flex items-center justify-center gap-2 rounded-[1.4rem] bg-[#25D366] py-3.5 text-sm font-black text-white"
                  >
                    Chat on WhatsApp
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
