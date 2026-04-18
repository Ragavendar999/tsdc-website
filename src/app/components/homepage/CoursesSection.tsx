'use client'

import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  CalendarClock,
  FileCheck2,
  Megaphone,
  MonitorSmartphone,
  Paintbrush,
  Video,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useContactPopup } from '@/app/components/common/ContactPopupProvider'
import { defaultSiteContent, loadSiteContent, SITE_CONTENT_UPDATED_EVENT } from '@/app/lib/siteContent'

const courseIcons = [Paintbrush, MonitorSmartphone, Megaphone, Video]

export default function CoursesSection() {
  const { openPopup } = useContactPopup()
  const [content, setContent] = useState(defaultSiteContent.coursesSection)

  useEffect(() => {
    const syncContent = () => setContent(loadSiteContent().coursesSection)

    syncContent()
    window.addEventListener('storage', syncContent)
    window.addEventListener(SITE_CONTENT_UPDATED_EVENT, syncContent)

    return () => {
      window.removeEventListener('storage', syncContent)
      window.removeEventListener(SITE_CONTENT_UPDATED_EVENT, syncContent)
    }
  }, [])

  return (
    <section className="site-section-bg section-alt-clean section-divider relative overflow-hidden px-4 py-20 sm:px-6">
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="retro-pill mb-4 px-4 py-2 text-sm font-black text-[#10163a]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#fa8a43] animate-pulse-soft" />
            {content.badge}
          </span>
          <h2 className="text-3xl font-black tracking-[-0.04em] text-[#081225] sm:text-4xl md:text-[3.5rem]">
            {content.title}
            <span className="block text-[#4562b0]">{content.highlight}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#475467]">
            {content.description}
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {content.courses.map((course, idx) => {
            const Icon = courseIcons[idx % courseIcons.length]

            return (
              <motion.div
                key={`${course.title}-${idx}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: idx * 0.08, duration: 0.6 }}
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group h-full overflow-hidden rounded-[2.1rem] border-[3px] border-[#10163a] bg-white shadow-[8px_8px_0_#10163a]"
                >
                  <div className="p-5 sm:p-6" style={{ backgroundColor: course.bg }}>
                    <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-14 w-14 items-center justify-center rounded-2xl border-[3px] border-[#10163a] text-white shadow-[4px_4px_0_#10163a]"
                          style={{ backgroundColor: course.accent }}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-[#081225] sm:text-2xl">{course.title}</h3>
                          <p className="text-sm font-bold" style={{ color: course.accent }}>{course.role}</p>
                        </div>
                      </div>
                      <div className="w-max rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#667085]" style={{ border: '1.5px solid rgba(16,22,58,0.12)' }}>
                        <CalendarClock size={12} className="mr-1 inline" />
                        {course.duration}
                      </div>
                    </div>

                    <p className="text-base font-bold leading-7 text-[#1b2940]">{course.tagline}</p>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="mb-4 flex flex-wrap gap-2">
                      {course.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full px-3 py-1.5 text-xs font-semibold text-[#374151]"
                          style={{ backgroundColor: `${course.accent}18`, border: `1.5px solid ${course.accent}35` }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="mb-4 flex items-start gap-2 text-sm leading-7 text-[#475467]">
                      <FileCheck2 size={15} className="mt-1 text-[#4562b0]" />
                      <span>{course.careerPath}</span>
                    </div>

                    <p className="mb-6 text-sm font-bold leading-7" style={{ color: course.accent }}>
                      {course.bonus}
                    </p>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      {/* Primary: View Course (learn before committing) */}
                      <Link
                        href={course.link}
                        className="group/link flex flex-1 items-center justify-center gap-1.5 rounded-[1rem] border-[3px] border-[#10163a] py-3 text-sm font-black text-white shadow-[4px_4px_0_#10163a] transition-all hover:-translate-y-1"
                        style={{ backgroundColor: course.accent }}
                      >
                        View Course
                        <ArrowUpRight size={14} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </Link>
                      {/* Secondary: Enquire */}
                      <motion.button
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() =>
                          openPopup({
                            title: `Enquire About ${course.title}`,
                            subtitle: 'Share your details and our team will guide you on fees, batches, and the right next step.',
                            interest: course.title,
                            source: `homepage-course-card-${course.title.toLowerCase().replace(/\s+/g, '-')}`,
                            ctaLabel: 'Get Course Guidance',
                          })
                        }
                        className="rounded-[1rem] border-[3px] border-[#10163a] bg-white px-4 py-3 text-sm font-black text-[#1b2940] shadow-[4px_4px_0_#10163a] transition-all hover:-translate-y-1"
                      >
                        Enquire
                      </motion.button>
                    </div>
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
