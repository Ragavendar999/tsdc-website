'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { name: 'Home', href: '/' },
  {
    name: 'Courses',
    href: '/courses', // ✅ Clicking will navigate
    submenu: [
      { name: 'Graphic Design', href: '/courses/graphic-design' },
      { name: 'UI/UX Design', href: '/courses/uiux-design' },
      { name: 'Digital Marketing', href: '/courses/digital-marketing' }
    ],
  },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [scrolling, setScrolling] = useState(false)

  useEffect(() => {
    let lastScroll = window.scrollY
    const onScroll = () => {
      const current = window.scrollY
      setScrolling(current > 70 && current > lastScroll)
      lastScroll = current
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: scrolling ? -80 : 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 w-full z-50 bg-transparent"
    >
      <div className="relative after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:bg-gradient-to-r after:from-[#F4793E] via-[#E83E8C] to-[#4B3A97] backdrop-blur-xl bg-white/60 dark:bg-zinc-900/60 shadow-md transition-all">
        <nav className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between py-3 md:py-4">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Link href="/">
  <Image
    src="/logo.png"
    alt="TSDC Logo"
    width={160}
    height={60}
    priority
  />
</Link>

          </motion.div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center space-x-8 font-medium text-sm">
            {navItems.map((item) =>
              item.submenu ? (
                <li
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 transition ${
                      pathname.startsWith(item.href)
                        ? 'text-[#E83E8C] font-semibold'
                        : 'text-gray-700 dark:text-gray-300'
                    } hover:text-[#E83E8C]`}
                  >
                    {item.name}
                    <ChevronDown size={16} />
                  </Link>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 mt-2 bg-white dark:bg-zinc-900 border dark:border-gray-800 rounded-xl shadow-xl p-2 w-60 z-50"
                      >
                        {item.submenu.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-[#fef3f8] dark:hover:bg-gray-800 hover:text-[#E83E8C] rounded transition"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative group transition ${
                      pathname === item.href ? 'text-[#E83E8C] font-semibold' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {item.name}
                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-[#F4793E] via-[#E83E8C] to-[#4B3A97] transition-all duration-300"></span>
                  </Link>
                </li>
              )
            )}
            <li>
              <Link
                href="tel:+917358116929"
                className="bg-gradient-to-r from-[#F4793E] via-[#E83E8C] to-[#4B3A97] text-white px-5 py-2 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200"
              >
                Start Your Career
              </Link>
            </li>
          </ul>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-200">
            {isOpen ? <X size={26} /> : <Menu size={26} />}
            <span className="font-medium">Launchpad</span>
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-gray-700 shadow-lg"
            >
              <ul className="flex flex-col px-6 py-4 space-y-4 text-sm font-medium">
                {navItems.map((item) =>
                  item.submenu ? (
                    <details key={item.name}>
                      <summary className="cursor-pointer text-gray-700 dark:text-gray-200 hover:text-[#E83E8C]">
                        <Link href={item.href}>{item.name}</Link>
                      </summary>
                      <ul className="ml-4 mt-2 space-y-2">
                        {item.submenu.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              onClick={() => setIsOpen(false)}
                              className="block text-gray-600 dark:text-gray-300 hover:text-[#E83E8C]"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`block ${pathname === item.href ? 'text-[#E83E8C] font-semibold' : 'text-gray-700 dark:text-gray-200'}`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  )
                )}
                <li>
                  <Link
                    href="/apply"
                    onClick={() => setIsOpen(false)}
                    className="block text-center px-4 py-2 rounded-md text-white bg-gradient-to-r from-[#F4793E] via-[#E83E8C] to-[#4B3A97]"
                  >
                    Start Your Career
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://wa.me/917358116929"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white bg-gradient-to-r from-[#25D366] to-[#128C7E] shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.003 2.003A9.942 9.942 0 0 0 2.06 12c0 1.75.455 3.398 1.253 4.84L2 22l5.281-1.304a9.92 9.92 0 0 0 4.722 1.207h.001A9.944 9.944 0 0 0 22 12.001c0-5.522-4.477-9.998-9.997-9.998zm5.613 14.314c-.236.663-1.368 1.287-1.882 1.368-.48.075-1.063.106-1.713-.109-.393-.124-.895-.29-1.539-.57-2.715-1.173-4.49-3.897-4.627-4.08-.135-.181-1.104-1.47-1.104-2.805 0-1.336.701-1.996.949-2.268.248-.271.547-.34.729-.34.182 0 .365.002.524.01.168.007.392-.063.61.465.236.557.803 1.921.875 2.06.072.139.12.304.024.488-.096.183-.144.296-.284.456-.14.16-.296.357-.42.48-.14.138-.285.29-.123.569.163.28.727 1.202 1.56 1.948 1.073.982 1.979 1.29 2.265 1.432.287.142.454.118.623-.07.17-.188.719-.833.911-1.118.192-.285.384-.236.65-.142.267.094 1.683.795 1.97.939.288.144.48.213.548.33.068.116.068.664-.168 1.326z" />
                    </svg>
                    Chat on WhatsApp
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
