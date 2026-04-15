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
  const [showSplash, setShowSplash] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

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
  }, [])

  return (
    <>
      {showSplash ? <SplashScreen /> : null}
      {!isMasterclassRoute && (
        <>
          <ScrollProgress />
          <Navbar />
        </>
      )}
      <main className={isMasterclassRoute ? '' : 'pt-[5.5rem]'}>{children}</main>
      {!isMasterclassRoute && <WhatsAppFAB />}
      {!isMasterclassRoute && <Footer />}
    </>
  )
}
