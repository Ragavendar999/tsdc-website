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
    color: '#fa8a43',
  },
  {
    title: 'UI/UX Design',
    href: '/courses/uiux-design',
    copy: 'Figma, product thinking, case studies, wireframes, user journeys.',
    icon: BookOpen,
    color: '#4562b0',
  },
  {
    title: 'Digital Marketing',
    href: '/courses/digital-marketing',
    copy: 'SEO, Meta Ads, Google Ads, content strategy, analytics and growth.',
    icon: Megaphone,
    color: '#ea6865',
  },
  {
    title: 'Video Editing',
    href: '/courses/video-editing',
    copy: 'Premiere Pro, reels, ads, motion cuts, YouTube and brand content.',
    icon: PlaySquare,
    color: '#4a4a99',
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
        <div className="pointer-events-none absolute left-0 top-10 h-36 w-36 rounded-[2.5rem] bg-[#4562b0]/12" />
        <div className="pointer-events-none absolute right-8 top-20 h-28 w-28 rounded-full bg-[#fa8a43]/20" />
        <div className="pointer-events-none absolute bottom-10 right-[18%] h-24 w-24 rotate-12 rounded-[2rem] bg-[#ea6865]/12" />

        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="relative z-10"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#4562b0]/25 bg-white px-4 py-2 text-sm font-black text-[#4562b0]">
              <Sparkles size={16} className="text-[#fa8a43]" />
              TSDC - Traijo Skill Development Center, Chennai
            </div>

            <h1 className="max-w-5xl text-4xl font-black leading-[0.98] tracking-tight text-[#081225] md:text-6xl lg:text-7xl">
              We didn't build a design school.{' '}
              <span className="text-[#4562b0]">We built the thing we wish existed.</span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-[#344054] md:text-xl">
              TSDC was born from frustration and built with purpose: practical creative courses in Chennai
              where students learn, build, show, and move toward real career outcomes.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#4562b0] px-7 py-4 text-base font-black text-white"
              >
                Explore Our Courses
                <ArrowRight size={18} />
              </Link>
              <button
                type="button"
                onClick={() => openCounsellor('about-hero-counsellor')}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#fa8a43] bg-white px-7 py-4 text-base font-black text-[#fa8a43]"
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
            <div className="relative overflow-hidden rounded-[2.4rem] border border-[#d9e4f5] bg-white p-4">
              <div className="absolute left-6 top-6 z-10 rounded-full bg-[#fa8a43] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white">
                Born in Perumbakkam
              </div>
              <Image
                src="/our-story.png"
                alt="TSDC practical creative classroom in Chennai"
                width={700}
                height={520}
                className="h-[360px] w-full rounded-[1.8rem] object-cover"
                priority
              />
              <div className="mt-4 grid grid-cols-3 gap-3">
                {['Real projects', 'Portfolio first', 'Career support'].map((item) => (
                  <div key={item} className="rounded-3xl bg-[#f4f7ff] p-4 text-center text-sm font-black text-[#4562b0]">
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
                className="group rounded-[2rem] border border-[#d9e4f5] bg-white p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <div
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-white"
                  style={{ backgroundColor: course.color }}
                >
                  <Icon size={24} />
                </div>
                <h2 className="text-xl font-black text-[#081225]">{course.title}</h2>
                <p className="mt-3 text-sm font-semibold leading-6 text-[#344054]">{course.copy}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#4562b0]">
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
              className="grid gap-6 rounded-[2.4rem] border border-[#d9e4f5] bg-white p-6 md:grid-cols-[0.42fr_0.58fr] md:p-9"
            >
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#fa8a43]">{block.kicker}</p>
                <h2 className="mt-4 text-3xl font-black leading-tight text-[#081225] md:text-5xl">{block.heading}</h2>
              </div>
              <div className="space-y-4 text-base font-medium leading-8 text-[#344054] md:text-lg">
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
          <div className="rounded-[2.5rem] bg-[#4562b0] p-7 text-white md:p-10">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#4562b0]">
              <Target size={26} />
            </div>
            <h2 className="text-3xl font-black leading-tight md:text-5xl">The TSDC method: learn it, use it, show it.</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-white/85">
              Most courses give you knowledge. We give you output. That is why our Graphic Design, UI/UX Design,
              Digital Marketing, and Video Editing courses are built around practical work.
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
                className="flex items-start gap-4 rounded-[1.8rem] border border-[#d9e4f5] bg-white p-6"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#fff4eb] text-[#fa8a43]">
                  <CheckCircle2 size={22} />
                </span>
                <p className="text-lg font-bold leading-7 text-[#1b2940]">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto max-w-7xl rounded-[2.8rem] border border-[#d9e4f5] bg-white p-6 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#fff4eb] px-4 py-2 text-sm font-black text-[#fa8a43]">
                <MapPin size={16} />
                Why South Chennai Needed This
              </div>
              <h2 className="text-3xl font-black leading-tight md:text-5xl">Chennai is the real classroom.</h2>
              <p className="mt-5 text-lg font-semibold leading-8 text-[#344054]">
                We are from here. TSDC was placed in Perumbakkam deliberately, for students who live near
                Sholinganallur, Medavakkam, Tambaram, Velachery, and OMR and do not want a draining commute to learn a creative skill.
              </p>
              <p className="mt-4 text-lg font-semibold leading-8 text-[#344054]">
                We teach what local agencies, startups, e-commerce brands, and product companies actually look for:
                portfolio clarity, campaign thinking, useful UI/UX case studies, and confident execution.
              </p>
            </div>
            <div className="grid content-start gap-3 sm:grid-cols-2">
              {localAreas.map((area) => (
                <div key={area} className="rounded-[1.5rem] bg-[#f4f7ff] p-5 text-lg font-black text-[#4562b0]">
                  {area}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          <div className="rounded-[2.4rem] bg-[#fa8a43] p-8 text-white">
            <BriefcaseBusiness size={34} />
            <h2 className="mt-6 text-3xl font-black leading-tight">What happens after you graduate?</h2>
            <p className="mt-5 text-base font-semibold leading-7 text-white/90">
              Students go on to join agencies, product companies on OMR, freelance projects, and in some cases,
              their own studios. We do not let certificates do the talking. We let portfolios speak.
            </p>
          </div>
          <div className="rounded-[2.4rem] bg-white p-8 lg:col-span-2">
            <div className="grid gap-5 sm:grid-cols-3">
              {[
                ['Portfolio reviews', 'A mentor reviews the work students will actually show.'],
                ['Placement support', 'We help connect students with agencies, studios, and companies.'],
                ['Freelance readiness', 'Students learn how to present work, price effort, and communicate value.'],
              ].map(([title, copy]) => (
                <div key={title} className="rounded-[1.8rem] border border-[#d9e4f5] bg-[#fffaf4] p-6">
                  <h3 className="text-xl font-black text-[#081225]">{title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-[#344054]">{copy}</p>
                </div>
              ))}
            </div>
            <div id="team" className="mt-6 rounded-[1.8rem] bg-[#081225] p-6 text-white">
              <Users size={28} className="text-[#fa8a43]" />
              <h2 className="mt-4 text-2xl font-black">We're not a franchise. We're a team.</h2>
              <p className="mt-3 text-base font-semibold leading-7 text-white/78">
                TSDC is led by designers, marketers, and educators who still have skin in the game professionally.
                We are a real team, in a real space, invested in every student who walks through our door.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[2.8rem] bg-[#081225] p-8 text-white md:p-10">
            <Rocket size={36} className="text-[#fa8a43]" />
            <h2 className="mt-6 text-3xl font-black leading-tight md:text-5xl">Where we're going.</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-white/80">
              We started with one goal: make creative education in Chennai actually worth paying for. Now we are
              building toward something bigger, one honest batch at a time.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {visionItems.map((item) => (
                <div key={item} className="rounded-[1.6rem] bg-white/10 p-5 text-sm font-bold leading-6 text-white/88">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2.8rem] border border-[#d9e4f5] bg-white p-8 md:p-10">
            <Quote size={36} className="text-[#ea6865]" />
            <p className="mt-5 text-2xl font-black leading-tight text-[#081225]">
              If you're tired of watching tutorials and still feeling stuck, come talk to us.
            </p>
            <p className="mt-5 text-lg font-semibold leading-8 text-[#344054]">
              TSDC is not just a course. It is the start of your creative career in Chennai.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#4562b0] px-7 py-4 text-base font-black text-white"
              >
                Explore Our Courses
                <ArrowRight size={18} />
              </Link>
              <button
                type="button"
                onClick={() => openCounsellor('about-closing-counsellor')}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fa8a43] px-7 py-4 text-base font-black text-white"
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
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#4562b0]">
              <GraduationCap size={16} />
              About TSDC FAQ
            </div>
            <h2 className="mt-5 text-3xl font-black md:text-5xl">Questions students ask before joining.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {faqItems.map((item) => (
              <div key={item.question} className="rounded-[2rem] border border-[#d9e4f5] bg-white p-6">
                <h3 className="text-xl font-black text-[#081225]">{item.question}</h3>
                <p className="mt-3 text-base font-semibold leading-7 text-[#344054]">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
