'use client'

import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [scrollTop, setScrollTop] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const winScroll = document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (winScroll / height) * 100
      setScrollTop(scrolled)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed left-0 top-0 z-[999] h-1 w-full bg-transparent">
      <div
        className="h-full rounded-r-full bg-[#4562b0] shadow-[0_0_18px_rgba(69,98,176,0.45)] transition-all duration-200"
        style={{ width: `${scrollTop}%` }}
      />
    </div>
  )
}
