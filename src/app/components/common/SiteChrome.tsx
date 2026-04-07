'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import ScrollMouseHint from './ScrollMouseHint'
import ScrollProgress from './ScrollProgress'

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isMasterclassRoute = pathname.startsWith('/masterclasses/')

  return (
    <>
      {!isMasterclassRoute && (
        <>
          <ScrollProgress />
          <Navbar />
          <ScrollMouseHint />
        </>
      )}
      <main className={isMasterclassRoute ? '' : 'pt-20'}>{children}</main>
      {!isMasterclassRoute && <Footer />}
    </>
  )
}
