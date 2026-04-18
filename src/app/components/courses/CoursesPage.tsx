'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  BookOpenCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Clock,
  Megaphone,
  Palette,
  PlaySquare,
  Sparkles,
  Users,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useContactPopup } from '@/app/components/common/ContactPopupProvider'
import MasterclassSection from '@/app/components/masterclass/MasterclassSection'

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
    accent: '#ff9736',
    deep: '#3244b5',
    soft: '#fff1dd',
    icon: Palette,
    tools: ['Photoshop', 'Illustrator', 'InDesign'],
    fit: 'Best if you enjoy visuals, branding, posters, and social content.',
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
    accent: '#3244b5',
    deep: '#171d4d',
    soft: '#eaf0ff',
    icon: BookOpenCheck,
    tools: ['Figma', 'UX Research', 'Prototypes'],
    fit: 'Best if you like apps, websites, research, and structured problem solving.',
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
    accent: '#ef6b63',
    deep: '#3244b5',
    soft: '#fff0ed',
    icon: Megaphone,
    tools: ['SEO', 'Meta Ads', 'Google Ads'],
    fit: 'Best if you want a marketing role, freelance growth work, or business promotion skills.',
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
    accent: '#4b4bb9',
    deep: '#171d4d',
    soft: '#efedff',
    icon: PlaySquare,
    tools: ['Premiere Pro', 'After Effects', 'DaVinci'],
    badge: 'NEW',
    fit: 'Best if you enjoy reels, edits, motion, storytelling, and creator-brand video work.',
  },
]

const proofPoints = [
  {
    title: 'Portfolio ready in weeks',
    text: 'Every course runs on real project work — not just theory. You leave with actual output you can show in interviews and to clients.',
    icon: Sparkles,
    accent: '#ff9736',
  },
  {
    title: 'Live mentor feedback',
    text: 'Sessions are led by working industry professionals who give honest critique, not just pre-recorded lessons you watch alone.',
    icon: BriefcaseBusiness,
    accent: '#3244b5',
  },
  {
    title: 'Chennai campus or remote',
    text: 'Attend from TSDC Chennai or join remotely. Same structured program, same mentor access, same batch pace.',
    icon: Users,
    accent: '#db4b87',
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
      <div className="comic-dots pointer-events-none absolute inset-0 z-0" />
      <div className="comic-burst pointer-events-none absolute -left-5 top-10 z-0 h-28 w-28 bg-[#ff9736] opacity-80" />
      <div className="comic-burst pointer-events-none absolute -right-5 top-28 z-0 h-24 w-24 bg-[#db4b87] opacity-75" />
      <div className="comic-burst pointer-events-none absolute bottom-28 left-[4%] z-0 hidden h-20 w-20 bg-[#3244b5] opacity-65 xl:block" />
      <div className="comic-burst pointer-events-none absolute bottom-40 right-[5%] z-0 hidden h-16 w-16 bg-[#ffcb53] opacity-80 lg:block" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-[3rem] border-[3px] border-[#10163a] bg-[#fffdf7] p-5 shadow-[10px_10px_0_#10163a] md:p-8"
        >
          <div className="grid items-center gap-8 rounded-[2.6rem] border-[3px] border-[#10163a] bg-[#fff8ed] p-7 md:p-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="retro-pill mb-5 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#10163a] md:text-sm">
                <Sparkles size={14} className="text-[#ff9736]" />
                All Courses at TSDC Chennai
              </div>
              <h1 className="max-w-4xl text-4xl font-black leading-[0.92] tracking-[-0.06em] text-[#10163a] md:text-6xl lg:text-7xl">
                Choose the creative course that
                <span className="block text-[#3244b5]">matches how you want to grow.</span>
              </h1>
              <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-[#445066] md:text-lg">
                Explore job-focused Graphic Design, UI/UX Design, Digital Marketing, and Video Editing courses in Chennai, built with projects, mentor feedback, portfolio support, and practical career guidance.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => openGuidancePopup('courses-hero-guidance')}
                  className="inline-flex items-center justify-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#ff9736] px-7 py-3.5 text-sm font-black text-white shadow-[5px_5px_0_#10163a] transition hover:-translate-y-1"
                >
                  Help Me Choose
                  <ArrowRight size={16} />
                </button>
                <Link
                  href="#course-pathways"
                  className="inline-flex items-center justify-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-white px-7 py-3.5 text-sm font-black text-[#10163a] shadow-[5px_5px_0_#10163a] transition hover:-translate-y-1"
                >
                  Compare Programs
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {courses.map((course, index) => {
                const Icon = course.icon

                return (
                  <motion.div
                    key={course.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.06 }}
                    whileHover={{ y: -4 }}
                  >
                    <Link
                      href={course.href}
                      className="group flex flex-col rounded-[2rem] border-[3px] border-[#10163a] bg-white p-5 shadow-[6px_6px_0_#10163a] transition-shadow hover:shadow-[8px_8px_0_#10163a]"
                    >
                      <div
                        className="mb-4 flex h-14 w-14 items-center justify-center rounded-[1.2rem] border-[3px] border-[#10163a] text-white shadow-[4px_4px_0_#10163a]"
                        style={{ backgroundColor: course.accent }}
                      >
                        <Icon size={24} />
                      </div>
                      <h2 className="text-xl font-black text-[#10163a]">{course.title}</h2>
                      <p className="mt-1 text-sm font-semibold text-[#445066]">{course.duration}</p>
                      <div className="mt-3 flex items-center gap-1 text-xs font-black" style={{ color: course.accent }}>
                        View course <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
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
                className="rounded-[2rem] border-[3px] border-[#10163a] bg-white p-6 shadow-[6px_6px_0_#10163a]"
              >
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-[1rem] border-[3px] border-[#10163a] text-white shadow-[4px_4px_0_#10163a]"
                  style={{ backgroundColor: point.accent }}
                >
                  <Icon size={20} />
                </div>
                <h2 className="text-2xl font-black text-[#10163a]">{point.title}</h2>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#445066]">{point.text}</p>
              </motion.div>
            )
          })}
        </div>

        <div className="mb-12 rounded-[2.5rem] border-[3px] border-[#10163a] bg-white p-6 shadow-[8px_8px_0_#10163a] md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border-[3px] border-[#10163a] bg-[#eef3ff] px-4 py-2 text-sm font-black text-[#3244b5] shadow-[4px_4px_0_#10163a]">
                <CheckCircle2 size={16} className="text-[#ff9736]" />
                Find your fit faster
              </div>
              <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight md:text-5xl">
                Use this quick guide if you are wondering
                <span className="block text-[#db4b87]">which path suits you best.</span>
              </h2>
            </div>
            <button
              type="button"
              onClick={() => openGuidancePopup('courses-fit-guide')}
              className="inline-flex items-center justify-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#ff9736] px-6 py-3 text-sm font-black text-white shadow-[5px_5px_0_#10163a]"
            >
              Talk To A Counsellor
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {courses.map((course) => {
              const Icon = course.icon
              return (
                <div key={course.title} className="rounded-[1.8rem] border-[3px] border-[#10163a] p-5 shadow-[5px_5px_0_#10163a]" style={{ backgroundColor: course.soft }}>
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-[1rem] border-[3px] border-[#10163a] text-white shadow-[4px_4px_0_#10163a]"
                    style={{ backgroundColor: course.accent }}
                  >
                    <Icon size={20} />
                  </div>
                  <h3 className="text-xl font-black text-[#10163a]">{course.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#475569]">{course.fit}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div id="course-pathways" className="py-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border-[3px] border-[#10163a] bg-white px-4 py-2 text-sm font-black text-[#3244b5] shadow-[4px_4px_0_#10163a]">
            <CheckCircle2 size={16} className="text-[#ff9736]" />
            Career Pathways
          </div>
          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-black leading-tight md:text-5xl">
            Four programs with clear
            <span className="block text-[#db4b87]">outcomes, projects, and next steps.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-7 text-[#445066]">
            Compare what each course covers, how long it runs, and what kind of work you will leave with.
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
                className="group overflow-hidden rounded-[2.5rem] border-[3px] border-[#10163a] bg-white shadow-[8px_8px_0_#10163a]"
              >
                <div className="relative overflow-hidden p-4">
                  <Image
                    src={course.image}
                    alt={`${course.title} course at TSDC Chennai`}
                    width={760}
                    height={420}
                    className="h-64 w-full rounded-[1.9rem] border-[3px] border-[#10163a] object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute left-8 top-8 rounded-full border-[3px] border-[#10163a] bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] shadow-[4px_4px_0_#10163a]" style={{ color: course.accent }}>
                    {course.eyebrow}
                  </div>
                  {course.badge ? (
                    <div className="absolute right-8 top-8 rounded-full border-[3px] border-[#10163a] bg-[#fa8a43] px-3 py-1.5 text-xs font-black text-white shadow-[4px_4px_0_#10163a]">
                      {course.badge}
                    </div>
                  ) : null}
                </div>

                <div className="p-6 md:p-7">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.2rem] border-[3px] border-[#10163a] text-white shadow-[4px_4px_0_#10163a]"
                      style={{ backgroundColor: course.accent }}
                    >
                      <Icon size={24} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black tracking-[-0.04em] text-[#10163a]">{course.title}</h2>
                      <p className="mt-2 text-base font-black" style={{ color: course.accent }}>
                        {course.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm font-semibold leading-7 text-[#445066]">{course.desc}</p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {[
                      [Clock, course.duration],
                      [BookOpenCheck, course.projects],
                      [BriefcaseBusiness, course.outcome],
                    ].map(([MetaIcon, label]) => {
                      const TypedIcon = MetaIcon as typeof Clock
                      return (
                        <div key={label as string} className="rounded-[1.4rem] border-[3px] border-[#10163a] p-4 shadow-[4px_4px_0_#10163a]" style={{ backgroundColor: course.soft }}>
                          <TypedIcon size={17} style={{ color: course.deep }} />
                          <p className="mt-2 text-xs font-black leading-5 text-[#1b2940]">{label as string}</p>
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {course.tools.map((tool) => (
                      <span key={tool} className="rounded-full border-[3px] border-[#10163a] bg-[#f8fbff] px-3 py-1.5 text-xs font-black text-[#344054] shadow-[3px_3px_0_#10163a]">
                        {tool}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 rounded-[1.4rem] border-[3px] border-[#10163a] bg-[#fffdf7] p-4 shadow-[4px_4px_0_#10163a]">
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#667085]">Choose this if...</p>
                    <p className="mt-2 text-sm font-semibold leading-7 text-[#445066]">{course.fit}</p>
                  </div>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href={course.href}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] px-6 py-3.5 text-sm font-black text-white shadow-[5px_5px_0_#10163a]"
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
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-[1rem] border-[3px] px-6 py-3.5 text-sm font-black shadow-[5px_5px_0_#10163a]"
                      style={{ borderColor: '#10163a', color: course.accent, backgroundColor: '#fffdf7' }}
                    >
                      Ask Counsellor
                    </button>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        <MasterclassSection
          compact
          title="Masterclasses for quick creative upgrades."
          subtitle="Join focused TSDC sessions when you want a fast, practical skill boost before choosing a full program."
        />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[2.8rem] border-[3px] border-[#10163a] bg-[#3244b5] p-7 text-white shadow-[10px_10px_0_#10163a] md:p-10"
        >
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ffcb53]">Still deciding?</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight md:text-5xl">
                Tell us your goal.
                <span className="block text-[#ffd9ed]">We will match you to the right path.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-white/84">
                Whether you want a job, freelance clients, a stronger portfolio, or a career switch, we can help you understand which course fits best.
              </p>
            </div>
            <div className="rounded-[2rem] border-[3px] border-[#10163a] bg-white p-5 text-[#081225] shadow-[6px_6px_0_#10163a]">
              <div className="grid gap-3">
                {['Program selection support', 'Batch and fee clarity', 'Fast counselling follow-up'].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border-[3px] border-[#10163a] bg-[#fff4e7] px-4 py-3 text-sm font-black text-[#10163a] shadow-[4px_4px_0_#10163a]">
                    <CheckCircle2 size={16} className="text-[#ff9736]" />
                    {item}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => openGuidancePopup('courses-page-final-cta')}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#ff9736] px-7 py-4 text-base font-black text-white shadow-[5px_5px_0_#10163a] transition hover:-translate-y-0.5"
              >
                Talk to a Counsellor
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
