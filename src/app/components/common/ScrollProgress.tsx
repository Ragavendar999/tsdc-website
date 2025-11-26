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
    <div className="fixed top-0 left-0 w-full z-[999]">
      <div
        className="h-[4px] bg-gradient-to-r from-[#F4793E] via-[#E83E8C] to-[#4B3A97] transition-all duration-200"
        style={{ width: `${scrollTop}%` }}
      />
    </div>
  )
}
