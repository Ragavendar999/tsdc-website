'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  Megaphone,
  MonitorSmartphone,
  Paintbrush,
  Video,
  WandSparkles,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useContactPopup } from '@/app/components/common/ContactPopupProvider'
import { defaultSiteContent, loadSiteContent, SITE_CONTENT_UPDATED_EVENT } from '@/app/lib/siteContent'

const courseIcons = [Paintbrush, MonitorSmartphone, Megaphone, Video, WandSparkles]

// Feature bullet points per course (display only the first 3 courses prominently)
const courseBullets: Record<string, string[]> = {
  'Graphic Design': ['Logo & Branding', 'Social Media Design', 'Print & Digital Design', 'Typography & More'],
  'UI/UX Design': ['UI Design', 'UX Research', 'Wireframing', 'Prototyping', 'Figma Mastery'],
  'Digital Marketing': ['Social Media Marketing', 'Google Ads', 'Meta Ads', 'SEO & Analytics', 'Lead Generation'],
  'Video Editing': ['Premiere Pro', 'Reels & Shorts', 'Colour Grading', 'Audio Mixing'],
  'Motion Graphics': ['After Effects', 'Kinetic Typography', 'Explainer Videos', '2D Animation'],
}

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

  // Show first 3 courses prominently, rest as smaller cards
  const primaryCourses = content.courses.slice(0, 3)
  const secondaryCourses = content.courses.slice(3)

  return (
    <section className="site-section-bg section-divider relative overflow-hidden px-4 py-16 sm:px-6 md:py-20">
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="retro-pill mb-4 inline-flex px-4 py-2 text-xs font-black text-[#10163a]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#fa8a43] animate-pulse-soft" />
              Our Courses
            </span>
            <h2 className="max-w-lg text-3xl font-black tracking-[-0.04em] text-[#081225] sm:text-4xl md:text-[2.8rem]">
              Career-focused Courses for a{' '}
              <span className="text-[#db4b87]">Better Tomorrow.</span>
            </h2>
            <p className="mt-4 max-w-md text-base leading-7 text-[#475467]">
              Industry-relevant skills with practical training and real-world experience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-start lg:justify-end"
          >
            <Link
              href="/courses"
              className="group inline-flex items-center gap-2 text-sm font-black text-[#3244b5] transition hover:text-[#10163a]"
            >
              Explore All Courses
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Primary 3 courses grid */}
        <div className="mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {primaryCourses.map((course, idx) => {
            const Icon = courseIcons[idx % courseIcons.length]
            const bullets = courseBullets[course.title] ?? course.skills

            return (
              <motion.div
                key={`${course.title}-${idx}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: idx * 0.09, duration: 0.6 }}
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  className="group flex h-full flex-col overflow-hidden rounded-[2rem] border-[3px] border-[#10163a] bg-white shadow-[7px_7px_0_#10163a]"
                >
                  {/* Card header */}
                  <div
                    className="flex items-center gap-3 border-b-[3px] border-[#10163a] px-5 py-4"
                    style={{ backgroundColor: course.bg ?? `${course.accent}12` }}
                  >
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-[3px] border-[#10163a] text-white shadow-[3px_3px_0_#10163a]"
                      style={{ backgroundColor: course.accent }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-[#081225]">{course.title}</h3>
                      <p className="text-xs font-semibold" style={{ color: course.accent }}>
                        {course.duration}
                      </p>
                    </div>
                  </div>

                  {/* Bullets */}
                  <div className="flex-1 px-5 py-4">
                    <ul className="space-y-2">
                      {bullets.slice(0, 5).map((bullet) => (
                        <li key={bullet} className="flex items-center gap-2 text-sm text-[#344054]">
                          <CheckCircle2 size={13} className="shrink-0" style={{ color: course.accent }} />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer CTA */}
                  <div className="border-t-[3px] border-[#10163a] px-5 py-4">
                    <div className="flex gap-2">
                      <Link
                        href={course.link}
                        className="flex flex-1 items-center justify-center gap-1 rounded-[0.9rem] border-[3px] border-[#10163a] py-2.5 text-sm font-black text-white shadow-[3px_3px_0_#10163a] transition-all hover:-translate-y-0.5"
                        style={{ backgroundColor: course.accent }}
                      >
                        View Details
                        <ArrowRight size={13} />
                      </Link>
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
                        className="rounded-[0.9rem] border-[3px] border-[#10163a] bg-white px-3 py-2.5 text-sm font-black text-[#10163a] shadow-[3px_3px_0_#10163a] transition-all hover:-translate-y-0.5"
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

        {/* Secondary courses (smaller) */}
        {secondaryCourses.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {secondaryCourses.map((course, idx) => {
              const realIdx = idx + 3
              const Icon = courseIcons[realIdx % courseIcons.length]
              return (
                <motion.div
                  key={`${course.title}-${realIdx}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="flex items-center gap-4 rounded-[1.5rem] border-[3px] border-[#10163a] bg-white p-4 shadow-[5px_5px_0_#10163a]"
                  >
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-[3px] border-[#10163a] text-white shadow-[3px_3px_0_#10163a]"
                      style={{ backgroundColor: course.accent }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-[#081225]">{course.title}</h3>
                      <p className="mt-0.5 text-xs text-[#475467]">{course.tagline}</p>
                    </div>
                    <Link
                      href={course.link}
                      className="shrink-0 rounded-[0.9rem] border-[3px] border-[#10163a] px-3 py-2 text-xs font-black text-white shadow-[3px_3px_0_#10163a] transition hover:-translate-y-0.5"
                      style={{ backgroundColor: course.accent }}
                    >
                      View Details
                    </Link>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
