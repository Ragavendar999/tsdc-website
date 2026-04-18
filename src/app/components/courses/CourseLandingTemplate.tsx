'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  BookOpenCheck,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  CreditCard,
  FileDown,
  Sparkles,
  Users,
  Wrench,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useContactPopup } from '@/app/components/common/ContactPopupProvider'

export type CourseLandingData = {
  title: string
  eyebrow: string
  description: string
  image: string
  imageAlt: string
  accent: string
  deep: string
  soft: string
  duration: string
  mode: string
  seats: string
  fee: string
  emi: string
  nextBatches: string[]
  syllabusUrl: string
  syllabusFileName: string
  heroPoints: string[]
  outcomes: { title: string; text: string }[]
  modules: { label: string; title: string; text: string }[]
  tools: string[]
  project: string
  careerRoles: string
  testimonial: { quote: string; author: string; role: string }
  faqs: { question: string; answer: string }[]
  popupInterest: string
  fitCards?: { title: string; text: string }[]
}

const defaultFitCards = [
  {
    title: 'Best for beginners',
    text: 'A clear, guided structure if you are starting from zero and want to build confidence quickly.',
  },
  {
    title: 'Good for career switchers',
    text: 'Useful if you want job-ready proof, practical projects, and a portfolio you can show in interviews.',
  },
  {
    title: 'Helpful for freelancers',
    text: 'Strong if you want clearer services, better-looking work, and more confidence presenting to clients.',
  },
]

export function CourseLandingTemplate({ course }: { course: CourseLandingData }) {
  const { openPopup } = useContactPopup()
  const pathname = usePathname()
  const [showStickyCta, setShowStickyCta] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const fitCards = course.fitCards ?? defaultFitCards

  useEffect(() => {
    const onScroll = () => setShowStickyCta(window.scrollY > 580)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openApplyPopup = (source: string) =>
    openPopup({
      title: `Apply for ${course.popupInterest}`,
      subtitle: `Share your details and our admissions team will guide you on ${course.title}, fees, batch timing, and next steps.`,
      interest: course.popupInterest,
      source,
      ctaLabel: 'Get Admission Guidance',
    })

  const openSyllabusPopup = () =>
    openPopup({
      title: `Get the ${course.popupInterest} syllabus`,
      subtitle: 'Submit your details and the syllabus PDF will download immediately after successful submission.',
      interest: `${course.popupInterest} Syllabus`,
      source: `${course.popupInterest.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-syllabus-download`,
      ctaLabel: 'Download Syllabus',
      syllabusDownloadUrl: course.syllabusUrl,
      syllabusFileName: course.syllabusFileName,
    })

  const courseSlug = pathname.split('/').filter(Boolean).pop() ?? ''

  return (
    <>
      <section className="site-section-bg relative overflow-hidden px-5 py-12 text-[#081225] md:px-8">
        <div className="comic-dots pointer-events-none absolute inset-0 z-0" />
        <div className="comic-burst pointer-events-none absolute -right-6 top-16 z-0 hidden h-28 w-28 bg-[#ff9736] opacity-80 lg:block" />
        <div className="comic-burst pointer-events-none absolute -left-6 bottom-24 z-0 hidden h-24 w-24 bg-[#db4b87] opacity-75 lg:block" />

        <div className="relative z-10 mx-auto max-w-6xl">
          {/* ── Breadcrumb ── */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-[#667085]">
              <li>
                <Link href="/" className="transition hover:text-[#10163a]">Home</Link>
              </li>
              <li><ChevronRight size={11} /></li>
              <li>
                <Link href="/courses" className="transition hover:text-[#10163a]">Courses</Link>
              </li>
              <li><ChevronRight size={11} /></li>
              <li className="font-black text-[#10163a]" aria-current="page">{course.title}</li>
            </ol>
          </nav>

          <div className="rounded-[2.5rem] border-[3px] border-[#10163a] bg-white px-5 py-6 shadow-[9px_9px_0_#10163a] md:px-10 md:py-10">
            {/* ── Hero ── */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="relative overflow-hidden rounded-[2.4rem] border-[3px] border-[#10163a] px-6 py-8 text-white shadow-[7px_7px_0_#10163a] md:px-10 md:py-10"
              style={{ backgroundColor: course.deep }}
            >
              <div className="comic-dots-dark pointer-events-none absolute inset-0 z-0" />
              <div className="comic-burst pointer-events-none absolute -right-8 -top-8 z-0 h-32 w-32 bg-white opacity-8" />
              <div className="comic-burst pointer-events-none absolute -bottom-6 -left-6 z-0 h-24 w-24 opacity-15" style={{ backgroundColor: course.accent }} />

              <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_0.88fr]">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border-[3px] border-[#10163a] bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#10163a] shadow-[4px_4px_0_#10163a]">
                    <Sparkles size={14} />
                    {course.eyebrow}
                  </div>
                  <h1 className="max-w-2xl text-4xl font-black leading-[0.98] tracking-[-0.05em] md:text-6xl">
                    {course.title}
                  </h1>
                  <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-white/88 md:text-lg">
                    {course.description}
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {course.heroPoints.map((point) => (
                      <div key={point} className="flex items-start gap-2 rounded-2xl border-[3px] border-[#10163a] bg-white px-4 py-3 text-sm font-bold text-[#10163a] shadow-[4px_4px_0_#10163a]">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                        {point}
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => openApplyPopup(`${courseSlug}-hero`)}
                      className="inline-flex items-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#ff9736] px-7 py-3.5 text-sm font-black text-white shadow-[5px_5px_0_#10163a] transition hover:-translate-y-1"
                    >
                      Apply Now
                      <ArrowRight size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={openSyllabusPopup}
                      className="inline-flex items-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-white px-7 py-3.5 text-sm font-black text-[#10163a] shadow-[5px_5px_0_#10163a] transition hover:-translate-y-1"
                    >
                      <FileDown size={16} />
                      Download Syllabus
                    </button>
                  </div>
                </div>

                {/* Hero image — no rotation, clean lift */}
                <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }} className="relative">
                  <div className="overflow-hidden rounded-[2rem] border-[3px] border-[#10163a] bg-white p-3 shadow-[6px_6px_0_#10163a]">
                    <Image
                      src={course.image}
                      alt={course.imageAlt}
                      width={760}
                      height={520}
                      className="h-[280px] w-full rounded-[1.5rem] object-cover md:h-[360px]"
                      priority
                    />
                    {/* Intake snapshot overlay */}
                    <div className="mt-3 rounded-[1.4rem] border-[3px] border-[#10163a] bg-white p-4 text-[#081225] shadow-[4px_4px_0_#10163a]">
                      <p className="text-xs font-black uppercase tracking-[0.18em]" style={{ color: course.accent }}>
                        Upcoming intake
                      </p>
                      <div className="mt-2 grid gap-2 text-sm font-black sm:grid-cols-3">
                        <span className="flex items-center gap-1.5"><Clock size={12} className="shrink-0 text-[#667085]" />{course.duration}</span>
                        <span className="flex items-center gap-1.5"><BookOpenCheck size={12} className="shrink-0 text-[#667085]" />{course.mode}</span>
                        <span className="flex items-center gap-1.5"><Users size={12} className="shrink-0 text-[#667085]" />{course.seats}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* ── Key info cards ── */}
            <div className="my-10 grid gap-5 md:grid-cols-3">
              <div className="rounded-[1.8rem] border-[3px] border-[#10163a] p-6 shadow-[6px_6px_0_#10163a]" style={{ backgroundColor: course.soft }}>
                <CreditCard className="mb-2" style={{ color: course.deep }} />
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#667085]">Course Fee</p>
                <h2 className="mt-1 text-2xl font-black text-[#10163a]">{course.fee}</h2>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#475467]">EMI available: {course.emi}</p>
              </div>
              <div className="rounded-[1.8rem] border-[3px] border-[#10163a] bg-[#eef1ff] p-6 shadow-[6px_6px_0_#10163a]">
                <CalendarDays className="mb-2 text-[#4562b0]" />
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#667085]">Next Batches</p>
                <div className="mt-2 space-y-2 text-sm font-semibold text-[#475467]">
                  {course.nextBatches.map((batch) => (
                    <div key={batch} className="rounded-xl border-[2px] border-[#10163a] bg-white px-4 py-3 shadow-[3px_3px_0_#10163a]">
                      {batch}
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[1.8rem] border-[3px] border-[#10163a] bg-[#fff1f6] p-6 shadow-[6px_6px_0_#10163a]">
                <BriefcaseBusiness className="mb-2 text-[#db4b87]" />
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#667085]">Career Outcomes</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#475467]">{course.careerRoles}</p>
              </div>
            </div>

            {/* ── Who is this for ── */}
            <div className="mb-12 grid gap-5 md:grid-cols-3">
              {fitCards.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-[1.8rem] border-[3px] border-[#10163a] p-6 shadow-[6px_6px_0_#10163a]"
                  style={{ backgroundColor: index === 0 ? '#fff6eb' : index === 1 ? '#eef3ff' : '#fff1f7' }}
                >
                  <p className="text-sm font-black uppercase tracking-[0.18em]" style={{ color: index === 0 ? '#c25e19' : index === 1 ? '#3244b5' : '#db4b87' }}>
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#475467]">{item.text}</p>
                </div>
              ))}
            </div>

            {/* ── Outcomes header ── */}
            <div className="py-6 text-center">
              <p className="mx-auto mb-3 inline-flex rounded-full border-[3px] border-[#10163a] px-4 py-2 text-sm font-black shadow-[4px_4px_0_#10163a]" style={{ backgroundColor: course.soft, color: course.deep }}>
                What students develop here
              </p>
              <h2 className="mx-auto max-w-3xl text-3xl font-black tracking-[-0.04em] md:text-5xl">
                Practical skills, portfolio proof, and confidence from multiple angles.
              </h2>
            </div>

            {/* ── Outcome cards ── */}
            <div className="grid gap-5 md:grid-cols-2">
              {course.outcomes.map((outcome, index) => (
                <motion.div
                  key={outcome.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="rounded-[1.8rem] border-[3px] border-[#10163a] p-6 shadow-[6px_6px_0_#10163a]"
                  style={{ backgroundColor: index % 2 === 0 ? course.soft : index % 3 === 1 ? '#eef1ff' : '#fff1f6' }}
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border-[3px] border-[#10163a] text-sm font-black text-white shadow-[3px_3px_0_#10163a]" style={{ backgroundColor: course.accent }}>
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-xl font-black">{outcome.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#475467]">{outcome.text}</p>
                </motion.div>
              ))}
            </div>

            {/* ── Real project CTA ── */}
            <div className="my-12 rounded-[2rem] border-[3px] border-[#10163a] bg-[#fff4e7] p-6 shadow-[7px_7px_0_#10163a] md:flex md:items-center md:justify-between md:gap-8">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-[3px] border-[#10163a] text-white shadow-[3px_3px_0_#10163a]" style={{ backgroundColor: course.deep }}>
                  <BookOpenCheck size={22} />
                </div>
                <div>
                  <h3 className="text-2xl font-black">Real work, not just lessons.</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-[#475467]">{course.project}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={openSyllabusPopup}
                className="mt-5 inline-flex items-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] px-6 py-3 text-sm font-black text-white shadow-[4px_4px_0_#10163a] md:mt-0"
                style={{ backgroundColor: course.accent }}
              >
                Get Full Syllabus
                <FileDown size={16} />
              </button>
            </div>

            {/* ── Modules ── */}
            <div className="py-4 text-center">
              <h2 className="text-3xl font-black tracking-[-0.04em] md:text-5xl">Structured syllabus breakdown</h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#475467]">
                Each module is designed to move you from basics to finished, portfolio-ready outcomes with clear practical deliverables.
              </p>
            </div>

            <div className="space-y-4">
              {course.modules.map((module, index) => (
                <div
                  key={module.title}
                  className="grid gap-4 rounded-[1.8rem] border-[3px] border-[#10163a] bg-white p-5 shadow-[6px_6px_0_#10163a] md:grid-cols-[180px_1fr]"
                >
                  <div className="rounded-[1.2rem] border-[3px] border-[#10163a] px-4 py-4 text-center font-black text-white shadow-[4px_4px_0_#10163a]" style={{ backgroundColor: index % 2 === 0 ? course.deep : course.accent }}>
                    <p className="text-xs uppercase tracking-[0.18em] text-white/75">{module.label}</p>
                    <p className="mt-2 text-lg">Core module</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[#10163a]">{module.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#475467]">{module.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Quick facts ── */}
            <div className="my-12 grid gap-5 rounded-[2rem] border-[3px] border-[#10163a] bg-white p-6 shadow-[7px_7px_0_#10163a] md:grid-cols-3">
              <div className="rounded-[1.5rem] border-[3px] border-[#10163a] p-5 shadow-[4px_4px_0_#10163a]" style={{ backgroundColor: course.soft }}>
                <Clock className="mb-3" style={{ color: course.deep }} />
                <h3 className="font-black">{course.duration}</h3>
                <p className="mt-2 text-sm leading-6 text-[#475467]">{course.mode} with guided sessions and active mentor feedback.</p>
              </div>
              <div className="rounded-[1.5rem] border-[3px] border-[#10163a] bg-[#eef1ff] p-5 shadow-[4px_4px_0_#10163a]">
                <Wrench className="mb-3 text-[#4562b0]" />
                <h3 className="font-black">Tools covered</h3>
                <p className="mt-2 text-sm leading-6 text-[#475467]">{course.tools.join(', ')}</p>
              </div>
              <div className="rounded-[1.5rem] border-[3px] border-[#10163a] bg-[#fff1f6] p-5 shadow-[4px_4px_0_#10163a]">
                <Sparkles className="mb-3 text-[#ea6865]" />
                <h3 className="font-black">Fee and EMI</h3>
                <p className="mt-2 text-sm leading-6 text-[#475467]">{course.fee} with {course.emi} available for students who want a lighter start.</p>
              </div>
            </div>

            {/* ── Testimonial + FAQ ── */}
            <div className="grid gap-5 md:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[2rem] border-[3px] border-[#10163a] bg-[#171d4d] p-7 text-white shadow-[8px_8px_0_#10163a]">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-white/60">Student proof</p>
                <h2 className="mt-2 text-3xl font-black leading-tight md:text-4xl">Can you picture yourself getting results here?</h2>
                <p className="mt-4 text-sm leading-7 text-white/82">"{course.testimonial.quote}"</p>
                <p className="mt-3 text-sm font-black text-white">{course.testimonial.author}, {course.testimonial.role}</p>
              </div>

              {/* ── Animated FAQ ── */}
              <div className="rounded-[2rem] border-[3px] border-[#10163a] bg-white p-7 shadow-[8px_8px_0_#10163a]">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-[#3244b5]">Frequently asked questions</p>
                <div className="mt-5 space-y-3">
                  {course.faqs.map((faq, index) => (
                    <div key={faq.question} className="rounded-[1.2rem] border-[3px] border-[#10163a] bg-[#fffdf7] shadow-[4px_4px_0_#10163a] overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                        aria-expanded={openFaqIndex === index}
                        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
                      >
                        <span className="text-sm font-black text-[#10163a]">{faq.question}</span>
                        <motion.span
                          animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="shrink-0 text-[#667085]"
                        >
                          <ChevronDown size={16} />
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {openFaqIndex === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="border-t-[2px] border-[#10163a]/10 px-4 pb-4 pt-3 text-sm leading-7 text-[#475467]">{faq.answer}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Bottom CTA panel ── */}
            <div className="mt-12 rounded-[2rem] border-[3px] border-[#10163a] p-7 text-white shadow-[8px_8px_0_#10163a] md:grid md:grid-cols-[1fr_0.8fr] md:items-center md:gap-8" style={{ backgroundColor: course.deep }}>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-white/68">Need clarity before you decide?</p>
                <h2 className="mt-2 text-3xl font-black leading-tight md:text-4xl">Talk to TSDC and get the right batch, fee plan, and course roadmap.</h2>
                <p className="mt-4 text-sm leading-7 text-white/82">
                  We will help you understand the syllabus, next batch dates, payment options, and whether this course fits your current level.
                </p>
              </div>
              <div className="mt-6 rounded-[1.5rem] border-[3px] border-[#10163a] bg-white p-5 text-[#10163a] shadow-[5px_5px_0_#10163a] md:mt-0">
                <div className="grid gap-3">
                  {[
                    'Course fit based on your current level',
                    'Fee and installment clarity before you join',
                    'Batch timing guidance with real next steps',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-[1rem] border-[3px] border-[#10163a] bg-[#fff8ed] px-4 py-3 text-sm font-black shadow-[3px_3px_0_#10163a]">
                      <BriefcaseBusiness size={16} className="shrink-0 text-[#ff9736]" />
                      {item}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => openApplyPopup(`${courseSlug}-bottom-cta`)}
                    className="mt-1 flex w-full items-center justify-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] px-5 py-3.5 text-sm font-black text-white shadow-[4px_4px_0_#10163a] transition hover:-translate-y-0.5"
                    style={{ backgroundColor: course.accent }}
                  >
                    Talk To Admissions
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky bottom CTA bar ── */}
      <AnimatePresence>
        {showStickyCta && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-x-0 bottom-0 z-[1100] border-t-[3px] border-[#10163a] bg-white/95 px-4 py-3 backdrop-blur-xl shadow-[0_-4px_20px_rgba(0,0,0,0.12)]"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-black text-[#10163a]">{course.title}</p>
                <p className="text-xs font-semibold text-[#667085]">{course.fee} · {course.duration} · {course.mode}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={openSyllabusPopup}
                  className="inline-flex items-center gap-1.5 rounded-[0.9rem] border-[3px] border-[#10163a] bg-white px-4 py-2.5 text-xs font-black text-[#10163a] shadow-[3px_3px_0_#10163a] transition hover:-translate-y-0.5"
                >
                  <FileDown size={13} />
                  Syllabus
                </button>
                <button
                  type="button"
                  onClick={() => openApplyPopup(`${courseSlug}-sticky-cta`)}
                  className="inline-flex items-center gap-1.5 rounded-[0.9rem] border-[3px] border-[#10163a] bg-[#ff9736] px-5 py-2.5 text-xs font-black text-white shadow-[3px_3px_0_#10163a] transition hover:-translate-y-0.5"
                >
                  Apply Now
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
