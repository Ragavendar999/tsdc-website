'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export default function ScrollMouseHint() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.04, 0.9, 1], [1, 0.88, 0.88, 0])

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none fixed bottom-6 left-1/2 z-[900] hidden -translate-x-1/2 items-center gap-3 rounded-full border border-[#dbe4f5] bg-white/85 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#4562b0] shadow-[0_18px_45px_rgba(17,24,39,0.12)] backdrop-blur md:flex"
      aria-hidden="true"
    >
      <span className="relative flex h-9 w-6 justify-center rounded-full border-2 border-[#4562b0] bg-white">
        <motion.span
          className="mt-2 h-1.5 w-1.5 rounded-full bg-[#fa8a43]"
          animate={{ y: [0, 12, 0], opacity: [1, 0.45, 1] }}
          transition={{ duration: 1.35, repeat: Infinity, ease: 'easeInOut' }}
        />
      </span>
      Scroll
    </motion.div>
  )
}
