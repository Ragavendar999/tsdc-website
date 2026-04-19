'use client'

import type { ReactNode } from 'react'

type StickyRailLayoutProps = {
  children: ReactNode
  sidebar: ReactNode
  className?: string
  contentClassName?: string
  sidebarClassName?: string
  desktopGridClassName?: string
  desktopSidebarWidthClassName?: string
  desktopSidebarTopClassName?: string
  desktopSidebarRightClassName?: string
  desktopSidebarZIndexClassName?: string
}

const joinClasses = (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' ')

export default function StickyRailLayout({
  children,
  sidebar,
  className,
  contentClassName,
  sidebarClassName,
  desktopGridClassName,
  desktopSidebarWidthClassName,
  desktopSidebarTopClassName,
  desktopSidebarRightClassName,
  desktopSidebarZIndexClassName,
}: StickyRailLayoutProps) {
  const sidebarWidth = desktopSidebarWidthClassName || 'lg:w-[360px]'

  return (
    <>
      <div
        className={joinClasses(
          'grid gap-6 lg:items-start lg:gap-10',
          desktopGridClassName || 'lg:grid-cols-[minmax(0,1fr)_360px]',
          className
        )}
      >
        <div className={joinClasses('space-y-6 lg:min-w-0', contentClassName)}>{children}</div>
        <div className={joinClasses('hidden lg:block', sidebarWidth)} aria-hidden="true" />
      </div>

      <div
        className={joinClasses(
          'mt-6 lg:fixed',
          sidebarWidth,
          desktopSidebarTopClassName || 'lg:top-24',
          desktopSidebarRightClassName || 'lg:right-[max(1.5rem,calc((100vw-72rem)/2))]',
          desktopSidebarZIndexClassName || 'lg:z-30',
          sidebarClassName
        )}
      >
        {sidebar}
      </div>
    </>
  )
}
