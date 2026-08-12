'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { useEffect, useState, type ReactNode } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import ScrollProgress from './ScrollProgress'
import WhatsAppFAB from './WhatsAppFAB'

const SplashScreen = dynamic(() => import('./SplashScreen'), { ssr: false })

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isScholarshipRoute = pathname.startsWith('/graphic-design-scholarship')
  const isAdminRoute = pathname.startsWith('/admin')
  const hideChrome = isScholarshipRoute || isAdminRoute
  const [showSplash, setShowSplash] = useState(false)
  const isHomepage = pathname === '/'
  const shouldEnableSplash = process.env.NODE_ENV === 'production' && isHomepage

  useEffect(() => {
    if (typeof window === 'undefined' || !shouldEnableSplash) {
      setShowSplash(false)
      return
    }

    const schedule = window.requestIdleCallback
      ? window.requestIdleCallback(() => setShowSplash(true), { timeout: 1200 })
      : window.setTimeout(() => setShowSplash(true), 800)

    return () => {
      if (typeof schedule === 'number') {
        window.clearTimeout(schedule)
        return
      }

      window.cancelIdleCallback?.(schedule)
    }
  }, [shouldEnableSplash])

  return (
    <>
      {shouldEnableSplash && showSplash ? <SplashScreen /> : null}
      {!hideChrome && (
        <>
          <ScrollProgress />
          <Navbar />
        </>
      )}
      <main id="main-content">
        {children}
      </main>
      {!hideChrome && <WhatsAppFAB />}
      {!hideChrome && <Footer />}
    </>
  )
}
