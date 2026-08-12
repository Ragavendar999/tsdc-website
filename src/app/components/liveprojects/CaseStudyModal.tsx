'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, MessageCircle, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useContactPopup } from '@/app/components/common/ContactPopupProvider'
import type { LiveProject } from '@/app/lib/liveProjects'

type CaseStudyModalProps = {
  project: LiveProject
  onClose: () => void
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const { openPopup } = useContactPopup()
  const images = project.images

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') setActiveIndex((i) => (i + 1) % images.length)
      if (event.key === 'ArrowLeft') setActiveIndex((i) => (i - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [images.length, onClose])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          onClick={(event) => event.stopPropagation()}
          className="relative w-full max-w-3xl overflow-hidden rounded-[1.6rem] border-[3px] border-[#10163a] bg-white shadow-[8px_8px_0_#10163a]"
        >
          <button
            onClick={onClose}
            aria-label="Close case study"
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-[#10163a] bg-white text-[#10163a] shadow-[3px_3px_0_#10163a] transition hover:-translate-y-0.5"
          >
            <X size={16} />
          </button>

          <div className="relative aspect-[4/3] w-full bg-[#0e1330] sm:aspect-[16/9]">
            <Image src={images[activeIndex]} alt={`${project.title} screenshot ${activeIndex + 1}`} fill className="object-contain" />

            {images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveIndex((i) => (i - 1 + images.length) % images.length)}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-[#10163a] bg-white text-[#10163a] shadow-[3px_3px_0_#10163a] transition hover:-translate-y-[calc(50%+2px)]"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setActiveIndex((i) => (i + 1) % images.length)}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-[#10163a] bg-white text-[#10163a] shadow-[3px_3px_0_#10163a] transition hover:-translate-y-[calc(50%+2px)]"
                >
                  <ChevronRight size={16} />
                </button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto border-b-[3px] border-[#10163a] bg-[#f5f6fb] px-4 py-3">
              {images.map((image, index) => (
                <button
                  key={image + index}
                  onClick={() => setActiveIndex(index)}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-[3px] transition ${
                    index === activeIndex ? 'border-[#3244b5]' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={image} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 p-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#3244b5]">{project.category}</p>
              <h3 className="mt-1 text-lg font-black tracking-[-0.02em] text-[#10163a]">{project.title}</h3>
              <p className="mt-1 text-sm text-[#667085]">{project.description}</p>
            </div>
            <button
              onClick={() => {
                onClose()
                openPopup({
                  title: `Explore ${project.title}`,
                  subtitle: 'Want to build work like this? Talk to TSDC admissions about the relevant course.',
                  interest: project.category,
                  source: 'projects-case-study',
                  ctaLabel: 'Get Course Guidance',
                })
              }}
              className="flex shrink-0 items-center gap-2 rounded-xl border-[3px] border-[#10163a] bg-[#3244b5] px-4 py-2.5 text-sm font-black text-white shadow-[3px_3px_0_#10163a] transition hover:-translate-y-0.5"
            >
              <MessageCircle size={15} />
              Talk to Admissions
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
