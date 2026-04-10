'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import ScrollProgress from './ScrollProgress'
import SplashScreen from './SplashScreen'

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isMasterclassRoute = pathname.startsWith('/masterclasses/')

  return (
    <>
      <SplashScreen />
      {!isMasterclassRoute && (
        <>
          <ScrollProgress />
          <Navbar />
        </>
      )}
      <main className={isMasterclassRoute ? '' : 'pt-[5.5rem]'}>{children}</main>
      {!isMasterclassRoute && <Footer />}
    </>
  )
}
