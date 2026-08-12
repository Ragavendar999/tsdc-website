'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Image as ImageIcon, X, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

type Media = { type: 'video'; src: string } | { type: 'image'; src: string; alt: string }

const projects: Array<{
  label: string
  category: string
  accent: string
  tint: string
  video?: string | null
  thumbnail?: string
}> = [
  { label: 'Logo & Branding', category: 'Graphic Design', accent: '#fa8a43', tint: '#fff4eb', thumbnail: '/Logo Design Samples.png' },
  { label: 'Mobile App Design', category: 'UI/UX Design', accent: '#3244b5', tint: '#eef3ff' },
  { label: 'Social Media Design', category: 'Graphic Design', accent: '#db4b87', tint: '#fff1f7' },
  { label: 'Packaging Design', category: 'Graphic Design', accent: '#2da56a', tint: '#f0fdf4' },
  { label: 'Dashboard Design', category: 'UI/UX Design', accent: '#4a4a99', tint: '#f2f0ff' },
  { label: 'SpiceRoute — Product Reel', category: 'Motion Graphics', accent: '#c0392b', tint: '#fff5f5', video: '/Spiceroute.mp4' },
]

function MediaModal({ media, onClose }: { media: Media; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
        className="relative w-full max-w-3xl overflow-hidden rounded-[1.5rem] border-[3px] border-[#10163a] bg-black shadow-[8px_8px_0_#10163a]"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border-[2px] border-[#10163a] bg-white text-[#10163a] shadow-[2px_2px_0_#10163a] transition-all hover:-translate-y-0.5"
          aria-label="Close"
        >
          <X size={16} strokeWidth={3} />
        </button>

        {media.type === 'video' ? (
          <video src={media.src} controls autoPlay className="aspect-video w-full" />
        ) : (
          <div className="relative w-full">
            <Image src={media.src} alt={media.alt} width={1200} height={800} className="h-auto w-full" />
          </div>
        )}
      </motion.div>
    </motion.div>,
    document.body
  )
}

export default function StudentWorkSection() {
  const [activeMedia, setActiveMedia] = useState<Media | null>(null)

  function openMedia(project: typeof projects[number]) {
    if (project.video) {
      setActiveMedia({ type: 'video', src: project.video })
    } else if (project.thumbnail) {
      setActiveMedia({ type: 'image', src: project.thumbnail, alt: project.label })
    }
  }

  return (
    <section className="site-section-bg section-divider relative overflow-hidden px-4 py-16 sm:px-6">
      <AnimatePresence>
        {activeMedia && <MediaModal media={activeMedia} onClose={() => setActiveMedia(null)} />}
      </AnimatePresence>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="retro-pill mb-3 inline-flex px-4 py-2 text-xs font-black text-[#10163a]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#fa8a43] animate-pulse-soft" />
              Student Work
            </span>
            <h2 className="text-3xl font-black tracking-[-0.04em] text-[#081225] sm:text-4xl md:text-[2.8rem]">
              Real Projects.{' '}
              <span className="text-[#db4b87]">Real Results.</span>
            </h2>
            <p className="mt-3 max-w-md text-base leading-7 text-[#475467]">
              Work that speaks louder than words.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/live-projects"
              className="group inline-flex items-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-white px-5 py-3 text-sm font-black text-[#10163a] shadow-[4px_4px_0_#10163a] transition-all hover:-translate-y-1"
            >
              View More Projects
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {projects.map((project, index) => {
            const hasMedia = !!(project.video || project.thumbnail)
            return (
              <motion.div
                key={project.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: index * 0.07 }}
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  onClick={() => hasMedia && openMedia(project)}
                  className={`group overflow-hidden rounded-[1.5rem] border-[3px] border-[#10163a] bg-white shadow-[5px_5px_0_#10163a] transition-all ${hasMedia ? 'cursor-pointer' : ''}`}
                >
                  <div
                    className="relative flex aspect-square items-center justify-center overflow-hidden"
                    style={{ backgroundColor: project.tint }}
                  >
                    {project.video ? (
                      <div className="flex flex-col items-center gap-2 text-center">
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-[#10163a] shadow-[3px_3px_0_#10163a] transition-transform group-hover:scale-110"
                          style={{ backgroundColor: project.accent }}
                        >
                          <Play size={20} className="translate-x-0.5 text-white" fill="white" />
                        </div>
                        <span className="text-[10px] font-bold text-[#667085]">Watch Reel</span>
                      </div>
                    ) : project.thumbnail ? (
                      <Image
                        src={project.thumbnail}
                        alt={project.label}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-center opacity-50">
                        <ImageIcon size={28} style={{ color: project.accent }} />
                        <span className="text-[10px] font-bold text-[#667085]">Image Coming Soon</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t-[3px] border-[#10163a] px-3 py-2.5">
                    <p className="text-[11px] font-black uppercase tracking-[0.1em] text-[#10163a]">
                      {project.label}
                    </p>
                    <p className="mt-0.5 text-[10px] font-semibold" style={{ color: project.accent }}>
                      {project.category}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
