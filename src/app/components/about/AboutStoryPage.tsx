'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  MapPin,
  Megaphone,
  Palette,
  PlaySquare,
  Quote,
  Rocket,
  Sparkles,
  Target,
  Users,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useContactPopup } from '@/app/components/common/ContactPopupProvider'

const courses = [
  {
    title: 'Graphic Design',
    href: '/courses/graphic-design',
    copy: 'Branding, posters, packaging, social creatives, portfolio systems.',
    icon: Palette,
    color: '#ff9736',
  },
  {
    title: 'UI/UX Design',
    href: '/courses/uiux-design',
    copy: 'Figma, product thinking, case studies, wireframes, user journeys.',
    icon: BookOpen,
    color: '#3244b5',
  },
  {
    title: 'Digital Marketing',
    href: '/courses/digital-marketing',
    copy: 'SEO, Meta Ads, Google Ads, content strategy, analytics and growth.',
    icon: Megaphone,
    color: '#ef6b63',
  },
  {
    title: 'Video Editing',
    href: '/courses/video-editing',
    copy: 'Premiere Pro, reels, ads, motion cuts, YouTube and brand content.',
    icon: PlaySquare,
    color: '#4b4bb9',
  },
]

const methodPoints = [
  'Built real projects, not sample work or empty practice exercises.',
  'A portfolio you can show to clients, hiring managers, and your future self.',
  'Skills that transfer immediately into a job, freelance work, or your own studio.',
]

const localAreas = ['Perumbakkam', 'Sholinganallur', 'Medavakkam', 'Tambaram', 'Velachery', 'OMR']

const visionItems = [
  'A full creative campus in Chennai south zone.',
  'Online and hybrid programs for students across Tamil Nadu.',
  'Placement partnerships with design agencies, marketing firms, and product companies.',
  'A TSDC alumni community that hires, collaborates, and grows together.',
]

const faqItems = [
  {
    question: 'What courses does TSDC offer in Chennai?',
    answer:
      'TSDC offers core creative programs in Graphic Design, UI/UX Design, Digital Marketing, Video Editing, and Motion Graphics. The programs are taught with real project output and industry-style feedback.',
  },
  {
    question: 'Where is TSDC located?',
    answer:
      'TSDC - Traijo Skill Development Center is located in Perumbakkam, Chennai, in the south zone and accessible from Medavakkam, Sholinganallur, Tambaram, Velachery, and OMR.',
  },
  {
    question: 'Is TSDC good for beginners?',
    answer:
      'Yes. The programs are designed for students and working professionals starting from zero. We teach from fundamentals and move quickly into practical, industry-relevant work.',
  },
  {
    question: 'Does TSDC provide placement assistance?',
    answer:
      'Yes. TSDC provides portfolio reviews, mentoring, interview preparation, and placement support to help students connect with agencies, studios, startups, and product companies.',
  },
  {
    question: 'How is TSDC different from other design institutes in Chennai?',
    answer:
      'TSDC is built around real output. Our instructors are active industry professionals, and students graduate with usable portfolios, not just certificates.',
  },
]

const storyBlocks = [
  {
    kicker: 'Origin Story',
    heading: 'It started with one honest question.',
    body: [
      "Chennai has always been full of talented people. Walk into any college in Tambaram, Velachery, OMR, or Perumbakkam and you will find students who are curious, visually sharp, and hungry to build something real.",
      'But somewhere between graduation and the job market, something breaks. They learn theory. They practice nothing. They submit a portfolio with three random posters. They hear, "we need someone with experience" in a job that is supposed to give them experience.',
      'We saw this happen again and again. In design. In marketing. In video. In tech. So instead of complaining about it, we built TSDC.',
    ],
  },
  {
    kicker: 'Who We Are',
    heading: 'A skill school built by people still in the industry.',
    body: [
      'TSDC, Traijo Skill Development Center, is a creative education institute based in Perumbakkam, Chennai.',
      'We train students and working professionals in Graphic Design, UI/UX Design, Digital Marketing, Video Editing, and Motion Graphics.',
      "Our instructors are active professionals. The person teaching UI/UX is working on real product flows. The person teaching Digital Marketing is running campaigns with real budgets. That is not a sales line. That is how we built it.",
    ],
  },
  {
    kicker: 'The Real Start',
    heading: "Yes, we started small. No, we're not embarrassed about it.",
    body: [
      'Most great things in Chennai started small. We did not have a massive campus, a mood-lit reception desk, or a fancy cafeteria on day one.',
      'What we had was a space, screens, a solid curriculum, and a stubborn belief that practical skill beats theoretical knowledge every single time.',
      'Our first batch had one clear goal: every student should leave with real work. Not a Canva template collection. Actual work. That told us everything we needed to know.',
    ],
  },
]

export default function AboutStoryPage() {
  const { openPopup } = useContactPopup()

  const openCounsellor = (source: string) =>
    openPopup({
      title: 'Talk to a TSDC Counsellor',
      subtitle: 'Tell us where you are starting from. We will help you choose the right creative course.',
      interest: 'About Page Counselling',
      source,
      ctaLabel: 'Request Counselling',
    })

  return (
    <div className="overflow-hidden text-[#081225]">
      <section className="relative px-4 pb-12 pt-10 md:pb-16 md:pt-14">
        <div className="pointer-events-none absolute left-8 top-10 h-24 w-24 rounded-[1.8rem] bg-[#ff9736] opacity-55" />
        <div className="pointer-events-none absolute right-10 top-20 h-24 w-24 rounded-full bg-[#db4b87] opacity-45" />

        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="relative z-10"
          >
            <div className="retro-pill mb-5 px-4 py-2 text-sm font-black text-[#10163a]">
              <Sparkles size={16} className="text-[#ff9736]" />
              TSDC - Traijo Skill Development Center, Chennai
            </div>

            <h1 className="max-w-5xl text-4xl font-black leading-[0.92] tracking-[-0.06em] text-[#081225] md:text-6xl lg:text-7xl">
              You&apos;re not here to just learn.
              <span className="block text-[#3244b5]">You&apos;re here to build a career</span>
              <span className="block text-[#db4b87]">you&apos;re proud of.</span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-[#445066] md:text-xl">
              Whether you&apos;re a student, a working professional, or a career-switcher in Chennai — TSDC gives you real projects to build, real mentors to guide you, and a portfolio that gets you in the door.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#ff9736] px-7 py-4 text-base font-black text-white shadow-[5px_5px_0_#10163a]"
              >
                Explore Our Courses
                <ArrowRight size={18} />
              </Link>
              <button
                type="button"
                onClick={() => openCounsellor('about-hero-counsellor')}
                className="inline-flex items-center justify-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-white px-7 py-4 text-base font-black text-[#10163a] shadow-[5px_5px_0_#10163a]"
              >
                Talk to a Counsellor
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, rotate: -1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[2.6rem] border-[3px] border-[#10163a] bg-white p-4 shadow-[9px_9px_0_#10163a]">
              <div className="absolute left-6 top-6 z-10 rounded-full bg-[#ffcb53] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#10163a]" style={{ border: '1.5px solid rgba(255,203,83,0.6)' }}>
                Born in Perumbakkam
              </div>
              <Image
                src="/our-story.png"
                alt="TSDC practical creative classroom in Chennai"
                width={700}
                height={520}
                className="h-[360px] w-full rounded-[1.8rem] border-[3px] border-[#10163a] object-cover"
                priority
              />
              <div className="mt-4 grid grid-cols-3 gap-3">
                {['Real projects', 'Portfolio first', 'Career support'].map((item, index) => (
                  <div
                    key={item}
                    className="rounded-[1.2rem] p-4 text-center text-sm font-semibold text-[#10163a]"
                    style={{ backgroundColor: index === 0 ? '#fff4e0' : index === 1 ? '#eef3ff' : '#fff0f6', border: '1.5px solid rgba(16,22,58,0.08)' }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-8 md:py-10">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-4">
          {courses.map((course) => {
            const Icon = course.icon
            return (
              <Link
                key={course.title}
                href={course.href}
                className="group rounded-[2rem] border-[3px] border-[#10163a] bg-white p-6 shadow-[6px_6px_0_#10163a] transition-transform duration-300 hover:-translate-y-1"
              >
                <div
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-[1rem] border-[3px] border-[#10163a] text-white shadow-[4px_4px_0_#10163a]"
                  style={{ backgroundColor: course.color }}
                >
                  <Icon size={24} />
                </div>
                <h2 className="text-xl font-black text-[#081225]">{course.title}</h2>
                <p className="mt-3 text-sm font-semibold leading-6 text-[#445066]">{course.copy}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#3244b5]">
                  View course
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto max-w-7xl space-y-6">
          {storyBlocks.map((block, index) => (
            <motion.article
              key={block.heading}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="grid gap-6 rounded-[2.4rem] bg-white p-6 md:grid-cols-[0.42fr_0.58fr] md:p-9" style={{ border: '1.5px solid rgba(16,22,58,0.09)', boxShadow: '0 2px 20px rgba(16,22,58,0.07)' }}
            >
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#ff9736]">{block.kicker}</p>
                <h2 className="mt-4 text-3xl font-black leading-tight text-[#081225] md:text-5xl">{block.heading}</h2>
              </div>
              <div className="space-y-4 text-base font-medium leading-8 text-[#445066] md:text-lg">
                {block.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[2.6rem] border-[3px] border-[#10163a] bg-[#3244b5] p-7 text-white shadow-[8px_8px_0_#10163a] md:p-10">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-[1rem] bg-white/20 text-white">
              <Target size={26} />
            </div>
            <h2 className="text-3xl font-black leading-tight md:text-5xl">The TSDC method: learn it, use it, show it.</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-white/85">
              You don&apos;t just study design here — you build real projects, get real feedback, and walk out with a portfolio that proves what you can do. That&apos;s what our Graphic Design, UI/UX Design, Digital Marketing, and Video Editing courses are built around.
            </p>
          </div>

          <div className="grid gap-4">
            {methodPoints.map((point, index) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className="flex items-start gap-4 rounded-[1.8rem] bg-white p-6" style={{ border: '1.5px solid rgba(16,22,58,0.09)', boxShadow: '0 2px 12px rgba(16,22,58,0.06)' }}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] bg-[#fff4eb] text-[#fa8a43]" style={{ border: '1.5px solid rgba(250,138,67,0.25)' }}>
                  <CheckCircle2 size={22} />
                </span>
                <p className="text-lg font-bold leading-7 text-[#1b2940]">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto max-w-7xl rounded-[2.8rem] bg-white p-6 md:p-10" style={{ border: '1.5px solid rgba(16,22,58,0.09)', boxShadow: '0 2px 24px rgba(16,22,58,0.07)' }}>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#fff4eb] px-4 py-2 text-sm font-bold text-[#fa8a43]" style={{ border: '1.5px solid rgba(250,138,67,0.3)' }}>
                <MapPin size={16} />
                Why South Chennai Needed This
              </div>
              <h2 className="text-3xl font-black leading-tight md:text-5xl">Chennai is the real classroom.</h2>
              <p className="mt-5 text-lg font-semibold leading-8 text-[#445066]">
                We are from here. TSDC was placed in Perumbakkam deliberately, for students who live near Sholinganallur, Medavakkam, Tambaram, Velachery, and OMR and do not want a draining commute to learn a creative skill.
              </p>
              <p className="mt-4 text-lg font-semibold leading-8 text-[#445066]">
                We teach what local agencies, startups, e-commerce brands, and product companies actually look for: portfolio clarity, campaign thinking, useful UI/UX case studies, and confident execution.
              </p>
            </div>
            <div className="grid content-start gap-3 sm:grid-cols-2">
              {localAreas.map((area, index) => (
                <div
                  key={area}
                  className="rounded-[1.5rem] p-5 text-base font-semibold"
                  style={{
                    backgroundColor: index % 3 === 0 ? '#eef3ff' : index % 3 === 1 ? '#fff4e0' : '#fff0f6',
                    color: '#10163a',
                    border: '1.5px solid rgba(16,22,58,0.08)',
                  }}
                >
                  {area}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          <div className="rounded-[2.4rem] bg-[#ff9736] p-8 text-white" style={{ border: '1.5px solid rgba(255,255,255,0.2)' }}>
            <BriefcaseBusiness size={34} />
            <h2 className="mt-6 text-3xl font-black leading-tight">What happens after you graduate?</h2>
            <p className="mt-5 text-base font-semibold leading-7 text-white/92">
              Students go on to join agencies, product companies on OMR, freelance projects, and in some cases, their own studios. We do not let certificates do the talking. We let portfolios speak.
            </p>
          </div>
          <div className="rounded-[2.4rem] bg-white p-8 lg:col-span-2" style={{ border: '1.5px solid rgba(16,22,58,0.09)', boxShadow: '0 2px 20px rgba(16,22,58,0.07)' }}>
            <div className="grid gap-5 sm:grid-cols-3">
              {[
                ['Portfolio reviews', 'A mentor reviews the work students will actually show.'],
                ['Placement support', 'We help connect students with agencies, studios, and companies.'],
                ['Freelance readiness', 'Students learn how to present work, price effort, and communicate value.'],
              ].map(([title, copy], index) => (
                <div
                  key={title}
                  className="rounded-[1.8rem] p-6"
                  style={{ backgroundColor: index === 0 ? '#fffaf4' : index === 1 ? '#eef3ff' : '#fff0f6', border: '1.5px solid rgba(16,22,58,0.08)' }}
                >
                  <h3 className="text-xl font-black text-[#081225]">{title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-[#445066]">{copy}</p>
                </div>
              ))}
            </div>
            <div id="team" className="mt-6 rounded-[1.8rem] bg-[#171d4d] p-6 text-white" style={{ border: '1.5px solid rgba(50,68,181,0.3)' }}>
              <Users size={28} className="text-[#fa8a43]" />
              <h2 className="mt-4 text-2xl font-black">We're not a franchise. We're a team.</h2>
              <p className="mt-3 text-base font-semibold leading-7 text-white/78">
                TSDC is led by designers, marketers, and educators who still have skin in the game professionally. We are a real team, in a real space, invested in every student who walks through our door.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[2.8rem] bg-[#171d4d] p-8 text-white md:p-10" style={{ border: '1.5px solid rgba(50,68,181,0.3)' }}>
            <Rocket size={36} className="text-[#fa8a43]" />
            <h2 className="mt-6 text-3xl font-black leading-tight md:text-5xl">Where we're going.</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-white/80">
              We started with one goal: make creative education in Chennai actually worth paying for. Now we are building toward something bigger, one honest batch at a time.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {visionItems.map((item) => (
                <div key={item} className="rounded-[1.6rem] bg-white p-5 text-sm font-semibold leading-6 text-[#10163a]" style={{ border: '1.5px solid rgba(255,255,255,0.15)' }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2.8rem] bg-white p-8 md:p-10" style={{ border: '1.5px solid rgba(16,22,58,0.09)', boxShadow: '0 2px 24px rgba(16,22,58,0.07)' }}>
            <Quote size={36} className="text-[#db4b87]" />
            <p className="mt-5 text-2xl font-black leading-tight text-[#081225]">
              If you're tired of watching tutorials and still feeling stuck, come talk to us.
            </p>
            <p className="mt-5 text-lg font-semibold leading-8 text-[#445066]">
              TSDC is not just a course. It is the start of your creative career in Chennai.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#3244b5] px-7 py-4 text-base font-black text-white shadow-[5px_5px_0_#10163a]"
              >
                Explore Our Courses
                <ArrowRight size={18} />
              </Link>
              <button
                type="button"
                onClick={() => openCounsellor('about-closing-counsellor')}
                className="inline-flex items-center justify-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#ff9736] px-7 py-4 text-base font-black text-white shadow-[5px_5px_0_#10163a]"
              >
                Talk to a Counsellor
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border-[3px] border-[#10163a] bg-white px-4 py-2 text-sm font-black text-[#3244b5] shadow-[4px_4px_0_#10163a]">
              <GraduationCap size={16} />
              About TSDC FAQ
            </div>
            <h2 className="mt-5 text-3xl font-black md:text-5xl">Questions students ask before joining.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {faqItems.map((item) => (
              <div key={item.question} className="rounded-[2rem] border-[3px] border-[#10163a] bg-white p-6 shadow-[6px_6px_0_#10163a]">
                <h3 className="text-xl font-black text-[#081225]">{item.question}</h3>
                <p className="mt-3 text-base font-semibold leading-7 text-[#445066]">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
