'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  BookOpenCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Clock,
  FileDown,
  Megaphone,
  Palette,
  PlaySquare,
  Sparkles,
  Users,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useContactPopup } from '@/app/components/common/ContactPopupProvider'

const courses = [
  {
    title: 'Graphic Design',
    eyebrow: 'Creative Design',
    tagline: 'Build brand visuals that look client-ready.',
    desc: 'Learn Photoshop, Illustrator, InDesign, branding, packaging, social media creatives, and portfolio presentation through practical design projects.',
    image: '/graphicdesign.png',
    href: '/courses/graphic-design',
    duration: '12 Weeks',
    projects: '5+ brand projects',
    outcome: 'Portfolio-ready designer',
    accent: '#fa8a43',
    deep: '#4562b0',
    soft: '#fff4eb',
    icon: Palette,
    tools: ['Photoshop', 'Illustrator', 'InDesign'],
  },
  {
    title: 'UI/UX Design',
    eyebrow: 'Product Design',
    tagline: 'Design apps and websites people can actually use.',
    desc: 'Learn Figma, user journeys, wireframes, responsive UI, prototyping, design systems, and case-study writing for job-ready product portfolios.',
    image: '/UIUXDesign.png',
    href: '/courses/uiux-design',
    duration: '10 Weeks',
    projects: '4 product case studies',
    outcome: 'UX portfolio builder',
    accent: '#4562b0',
    deep: '#081225',
    soft: '#eef4ff',
    icon: BookOpenCheck,
    tools: ['Figma', 'UX Research', 'Prototypes'],
  },
  {
    title: 'Digital Marketing',
    eyebrow: 'Growth Marketing',
    tagline: 'Run campaigns that connect creativity to business.',
    desc: 'Learn SEO, Meta Ads, Google Ads, content planning, campaign reporting, analytics, and local business growth workflows with practical campaign exercises.',
    image: '/Digital_marketing.png',
    href: '/courses/digital-marketing',
    duration: '8 Weeks',
    projects: '2 campaign projects',
    outcome: 'Growth-ready marketer',
    accent: '#ea6865',
    deep: '#4562b0',
    soft: '#fff4f3',
    icon: Megaphone,
    tools: ['SEO', 'Meta Ads', 'Google Ads'],
  },
  {
    title: 'Video Editing',
    eyebrow: 'Video Production',
    tagline: 'Edit reels, ads, and stories with professional polish.',
    desc: 'Learn Premiere Pro, After Effects, DaVinci Resolve, pacing, motion graphics, color basics, captions, and showreel building for creator and brand work.',
    image: '/graphic.png',
    href: '/courses/video-editing',
    duration: '12 Weeks',
    projects: '5+ commercial edits',
    outcome: 'Showreel-ready editor',
    accent: '#4a4a99',
    deep: '#081225',
    soft: '#f1f0ff',
    icon: PlaySquare,
    tools: ['Premiere Pro', 'After Effects', 'DaVinci'],
    badge: 'NEW',
  },
]

const proofPoints = [
  {
    title: 'Pick the right path',
    text: 'Every course is designed around one clear career direction, so students do not waste time guessing what to learn next.',
    icon: Sparkles,
  },
  {
    title: 'Build real output',
    text: 'Students work on portfolio pieces, brand-style projects, campaign tasks, product screens, or showreel edits instead of only watching lessons.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Get guided by mentors',
    text: 'The training flow includes feedback, corrections, counselling, and practical next steps for job or freelance goals.',
    icon: Users,
  },
]

export default function CoursesPage() {
  const { openPopup } = useContactPopup()

  const openGuidancePopup = (source: string) =>
    openPopup({
      title: 'Choose the Right TSDC Course',
      subtitle: 'Share your details and our counsellor will help you pick the course that fits your current skill level and career goal.',
      interest: 'Course Selection Help',
      source,
      ctaLabel: 'Get Course Guidance',
    })

  return (
    <section className="site-section-bg relative overflow-hidden px-4 py-10 text-[#081225] md:px-8">
      <div className="pointer-events-none absolute left-0 top-20 h-40 w-40 rounded-[2.5rem] bg-[#4562b0]/10" />
      <div className="pointer-events-none absolute right-10 top-32 h-28 w-28 rounded-full bg-[#fa8a43]/20" />
      <div className="pointer-events-none absolute bottom-40 left-[18%] h-24 w-24 rotate-12 rounded-[2rem] bg-[#ea6865]/12" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-[2.8rem] bg-white p-5 md:p-8"
        >
          <div className="grid items-center gap-8 rounded-[2.3rem] bg-[#4562b0] p-7 text-white md:p-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/14 px-4 py-2 text-xs font-black uppercase tracking-[0.18em]">
                <Sparkles size={14} />
                All Courses at TSDC Chennai
              </div>
              <h1 className="max-w-4xl text-4xl font-black leading-[0.98] tracking-[-0.05em] md:text-6xl">
                Choose the creative course that gets your work noticed.
              </h1>
              <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-white/88 md:text-lg">
                Explore job-focused Graphic Design, UI/UX Design, Digital Marketing, and Video Editing courses in Chennai,
                built with projects, mentor feedback, portfolio support, and practical career guidance.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => openGuidancePopup('courses-hero-guidance')}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-black text-[#4562b0]"
                >
                  Help Me Choose
                  <ArrowRight size={16} />
                </button>
                <Link
                  href="#course-pathways"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-black text-white transition hover:bg-white/12"
                >
                  View All Programs
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {courses.map((course, index) => {
                const Icon = course.icon
                return (
                  <motion.div
                    key={course.title}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.07 }}
                    className="rounded-[1.8rem] bg-white p-5 text-[#081225]"
                  >
                    <div
                      className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-white"
                      style={{ backgroundColor: course.accent }}
                    >
                      <Icon size={22} />
                    </div>
                    <h2 className="text-xl font-black">{course.title}</h2>
                    <p className="mt-2 text-sm font-semibold leading-6 text-[#344054]">{course.duration}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>

        <div className="grid gap-5 py-10 md:grid-cols-3">
          {proofPoints.map((point, index) => {
            const Icon = point.icon
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[2rem] border border-[#d9e4f5] bg-white p-6"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff4eb] text-[#fa8a43]">
                  <Icon size={22} />
                </div>
                <h2 className="text-2xl font-black">{point.title}</h2>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#344054]">{point.text}</p>
              </motion.div>
            )
          })}
        </div>

        <div id="course-pathways" className="py-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#4562b0]">
            <CheckCircle2 size={16} className="text-[#fa8a43]" />
            Career Pathways
          </div>
          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-black leading-tight md:text-5xl">
            Four programs. One consistent TSDC learning system.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-7 text-[#344054]">
            Every course page now follows the same structure: clear outcomes, practical modules, tools, project focus,
            counselling CTA, and syllabus access after enquiry submission.
          </p>
        </div>

        <div className="grid gap-6 pb-12 md:grid-cols-2">
          {courses.map((course, index) => {
            const Icon = course.icon
            return (
              <motion.article
                key={course.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: index * 0.08 }}
                className="group overflow-hidden rounded-[2.4rem] border border-[#d9e4f5] bg-white"
              >
                <div className="relative overflow-hidden p-4">
                  <Image
                    src={course.image}
                    alt={`${course.title} course at TSDC Chennai`}
                    width={760}
                    height={420}
                    className="h-64 w-full rounded-[1.8rem] object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute left-8 top-8 rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em]" style={{ color: course.accent }}>
                    {course.eyebrow}
                  </div>
                  {course.badge && (
                    <div className="absolute right-8 top-8 rounded-full bg-[#fa8a43] px-3 py-1.5 text-xs font-black text-white">
                      {course.badge}
                    </div>
                  )}
                </div>

                <div className="p-6 md:p-7">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white"
                      style={{ backgroundColor: course.accent }}
                    >
                      <Icon size={24} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black tracking-[-0.04em]">{course.title}</h2>
                      <p className="mt-2 text-base font-black" style={{ color: course.accent }}>
                        {course.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm font-semibold leading-7 text-[#344054]">{course.desc}</p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {[
                      [Clock, course.duration],
                      [BookOpenCheck, course.projects],
                      [BriefcaseBusiness, course.outcome],
                    ].map(([MetaIcon, label]) => {
                      const TypedIcon = MetaIcon as typeof Clock
                      return (
                        <div key={label as string} className="rounded-[1.4rem] p-4" style={{ backgroundColor: course.soft }}>
                          <TypedIcon size={17} style={{ color: course.deep }} />
                          <p className="mt-2 text-xs font-black leading-5 text-[#1b2940]">{label as string}</p>
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {course.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-[#d9e4f5] bg-[#f8fbff] px-3 py-1.5 text-xs font-black text-[#344054]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href={course.href}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-black text-white"
                      style={{ backgroundColor: course.deep }}
                    >
                      View Full Details
                      <ArrowRight size={16} />
                    </Link>
                    <button
                      type="button"
                      onClick={() =>
                        openPopup({
                          title: `Get Guidance for ${course.title}`,
                          subtitle: `Share your details and our team will explain ${course.title}, fees, batch timing, and the best next step for you.`,
                          interest: course.title,
                          source: `${course.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-courses-list-card`,
                          ctaLabel: 'Get Guidance',
                        })
                      }
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 px-6 py-3.5 text-sm font-black"
                      style={{ borderColor: course.accent, color: course.accent }}
                    >
                      Ask Counsellor
                    </button>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[2.6rem] bg-[#081225] p-7 text-white md:p-10"
        >
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.85fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#fa8a43]">Still deciding?</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight md:text-5xl">
                Tell us your goal. We will suggest the right course path.
              </h2>
              <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-white/78">
                Whether you want a job, freelance clients, a stronger portfolio, or a career switch, the admissions team
                can help you choose without pressure.
              </p>
            </div>
            <div className="rounded-[2rem] bg-white p-5 text-[#081225]">
              <div className="grid gap-3">
                {['Program selection support', 'Appointment scheduling', 'Instant Rs. 2,000 coupon for immediate joiners'].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-[#f4f7ff] px-4 py-3 text-sm font-black text-[#4562b0]">
                    <CheckCircle2 size={16} />
                    {item}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => openGuidancePopup('courses-page-final-cta')}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#fa8a43] px-7 py-4 text-base font-black text-white"
              >
                Open Contact Form
                <FileDown size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
