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
import { useContactPopup } from '@/app/components/common/ContactPopupProvider'

const courses = [
  {
    title: 'Graphic Design',
    role: 'Brand and visual design path',
    tagline: 'Learn Photoshop, Illustrator, and real-world design thinking.',
    icon: <Paintbrush className="h-6 w-6" />,
    duration: '12 Weeks',
    skills: ['Branding', 'Typography', 'Social creatives'],
    careerPath: 'Graphic Designer | Brand Designer | Freelancer',
    bonus: 'Live brand projects + portfolio support',
    accent: '#fa8a43',
    link: '/courses/graphic-design',
    bg: '#fff4eb',
  },
  {
    title: 'UI/UX Design',
    role: 'Product and interface design path',
    tagline: 'Build app and web experiences with Figma and UX thinking.',
    icon: <MonitorSmartphone className="h-6 w-6" />,
    duration: '10 Weeks',
    skills: ['Figma', 'UX Research', 'Design Systems'],
    careerPath: 'UI Designer | Product Designer | Freelancer',
    bonus: 'Portfolio case studies + product projects',
    accent: '#4562b0',
    link: '/courses/uiux-design',
    bg: '#eef4ff',
  },
  {
    title: 'Digital Marketing',
    role: 'Performance and growth path',
    tagline: 'Master SEO, paid ads, analytics, and campaign strategy.',
    icon: <Megaphone className="h-6 w-6" />,
    duration: '8 Weeks',
    skills: ['Google Ads', 'Meta Ads', 'SEO'],
    careerPath: 'Digital Marketer | Growth Executive | Strategist',
    bonus: 'Live campaigns + practical growth training',
    accent: '#ea6865',
    link: '/courses/digital-marketing',
    bg: '#fff1f0',
  },
  {
    title: 'Video Editing',
    role: 'Editing and motion path',
    tagline: 'Create reels, ads, and polished video content with pro tools.',
    icon: <Video className="h-6 w-6" />,
    duration: '12 Weeks',
    skills: ['Premiere Pro', 'After Effects', 'DaVinci'],
    careerPath: 'Video Editor | Content Creator | Motion Designer',
    bonus: 'Showreel building + commercial edits',
    accent: '#4a4a99',
    link: '/courses/video-editing',
    bg: '#f2f0ff',
  },
]

export default function CoursesSection() {
  const { openPopup } = useContactPopup()

  return (
    <section className="site-section-bg section-alt-blue section-divider relative overflow-hidden px-4 py-20 sm:px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-12 top-24 h-20 w-20 rounded-full bg-[#fff1d8]" />
        <div className="absolute bottom-20 right-12 h-24 w-24 rounded-[2rem] bg-[#e9f1ff]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#dbe4f5] bg-white px-4 py-2 text-sm font-black text-[#4562b0] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#fa8a43] animate-pulse-soft" />
            High-demand creative career courses
          </span>
          <h2 className="text-3xl font-black tracking-[-0.04em] text-[#081225] sm:text-4xl md:text-6xl">
            Choose the course that turns
            <span className="block text-[#4562b0]">interest into income.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-[#475467] sm:text-lg sm:leading-8">
            Every program is designed to feel premium, practical, and clearly connected to real creative work in Chennai. Students learn fast, build visible output, and leave with stronger career direction.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {courses.map((course, idx) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: idx * 0.08, duration: 0.6 }}
            >
              <motion.div
                whileHover={{ y: -8 }}
                className="group h-full overflow-hidden rounded-[2.1rem] border border-[#dbe4f5] bg-white shadow-[0_22px_55px_rgba(17,24,39,0.06)]"
              >
                <div className="p-5 sm:p-6" style={{ backgroundColor: course.bg }}>
                  <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg"
                        style={{ backgroundColor: course.accent }}
                      >
                        {course.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-[#081225] sm:text-2xl">{course.title}</h3>
                        <p className="text-sm font-bold" style={{ color: course.accent }}>{course.role}</p>
                      </div>
                    </div>
                    <div className="w-max rounded-full bg-white px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-[#667085]">
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
                        className="rounded-full border border-[#dbe4f5] bg-[#f8fbff] px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-[#445066]"
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
                      className="flex-1 rounded-[1rem] py-3 text-sm font-black text-white shadow-md transition-all"
                      style={{ backgroundColor: course.accent }}
                    >
                      Enquire Now
                    </motion.button>
                    <Link
                      href={course.link}
                      className="group/link inline-flex items-center justify-center gap-1 rounded-[1rem] border border-[#dbe4f5] px-4 py-3 text-sm font-black text-[#1b2940] transition-all hover:border-[#4562b0] hover:text-[#4562b0]"
                    >
                      Details
                      <ArrowUpRight size={14} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
