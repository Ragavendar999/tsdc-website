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
  const isMasterclassRoute = pathname.startsWith('/masterclasses/')
  const isScholarshipRoute = pathname.startsWith('/graphic-design-scholarship')
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
      {!isMasterclassRoute && !isScholarshipRoute && (
        <>
          <ScrollProgress />
          <Navbar />
        </>
      )}
      <main id="main-content" className={isMasterclassRoute || isScholarshipRoute ? '' : 'pt-[5.5rem]'}>
        {children}
      </main>
      {!isMasterclassRoute && !isScholarshipRoute && <WhatsAppFAB />}
      {!isMasterclassRoute && !isScholarshipRoute && <Footer />}
    </>
  )
}
