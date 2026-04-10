'use client'

import { motion } from 'framer-motion'
import { ArrowRight, BookOpenCheck, CheckCircle2, Clock, FileDown, Sparkles, Users } from 'lucide-react'
import Image from 'next/image'
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
  syllabusUrl: string
  syllabusFileName: string
  heroPoints: string[]
  outcomes: { title: string; text: string }[]
  modules: { label: string; title: string; text: string }[]
  tools: string[]
  project: string
  careerRoles: string
  testimonial: { quote: string; author: string; role: string }
  popupInterest: string
}

export function CourseLandingTemplate({ course }: { course: CourseLandingData }) {
  const { openPopup } = useContactPopup()

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
      title: `Get the ${course.popupInterest} Syllabus`,
      subtitle: 'Submit your details and the syllabus PDF will download immediately after successful submission.',
      interest: `${course.popupInterest} Syllabus`,
      source: `${course.popupInterest.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-syllabus-download`,
      ctaLabel: 'Download Syllabus',
      syllabusDownloadUrl: course.syllabusUrl,
      syllabusFileName: course.syllabusFileName,
    })

  return (
    <section className="site-section-bg relative overflow-hidden px-5 py-12 text-[#081225] md:px-8">
      {/* Comic halftone background */}
      <div className="comic-dots pointer-events-none absolute inset-0 z-0" />
      {/* Comic burst stickers — peeking behind the card */}
      <div className="comic-burst pointer-events-none absolute -right-6 top-16 z-0 hidden h-28 w-28 bg-[#ff9736] opacity-80 lg:block" />
      <div className="comic-burst pointer-events-none absolute -left-6 bottom-24 z-0 hidden h-24 w-24 bg-[#db4b87] opacity-75 lg:block" />
      <div className="comic-burst pointer-events-none absolute right-[2%] bottom-16 z-0 hidden h-16 w-16 bg-[#ffcb53] opacity-85 xl:block" />

      <div className="relative z-10 mx-auto max-w-6xl rounded-[2.5rem] border-[3px] border-[#10163a] bg-white px-5 py-6 shadow-[9px_9px_0_#10163a] md:px-10 md:py-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2.4rem] border-[3px] border-[#10163a] px-6 py-8 text-white shadow-[7px_7px_0_#10163a] md:px-10 md:py-10"
          style={{ backgroundColor: course.deep }}
        >
          {/* Comic halftone on the dark hero */}
          <div className="comic-dots-dark pointer-events-none absolute inset-0 z-0" />
          {/* Comic burst accent on hero */}
          <div className="comic-burst pointer-events-none absolute -right-8 -top-8 z-0 h-32 w-32 bg-white opacity-8" />
          <div className="comic-burst pointer-events-none absolute -bottom-6 -left-6 z-0 h-24 w-24 opacity-15" style={{ backgroundColor: course.accent }} />
          <div className="absolute -left-10 top-8 h-32 w-32 rounded-full bg-white/10" />
          <div className="absolute -right-8 bottom-8 h-36 w-36 rounded-[2rem] bg-[#ffcb53]/15" />

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
                  onClick={() => openApplyPopup(`${course.popupInterest.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-hero`)}
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

            <motion.div whileHover={{ y: -8, rotate: 1 }} className="relative">
              <div className="overflow-hidden rounded-[2rem] border-[3px] border-[#10163a] bg-white p-3 shadow-[6px_6px_0_#10163a]">
                <Image
                  src={course.image}
                  alt={course.imageAlt}
                  width={760}
                  height={520}
                  className="h-[280px] w-full rounded-[1.5rem] object-cover md:h-[360px]"
                  priority
                />
                <div className="absolute bottom-7 left-7 right-7 rounded-[1.4rem] border-[3px] border-[#10163a] bg-white p-4 text-[#081225] shadow-[5px_5px_0_#10163a]">
                  <p className="text-xs font-black uppercase tracking-[0.18em]" style={{ color: course.accent }}>
                    Career-ready program
                  </p>
                  <div className="mt-2 grid gap-2 text-sm font-black sm:grid-cols-3">
                    <span>{course.duration}</span>
                    <span>{course.mode}</span>
                    <span>{course.seats}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="py-14 text-center">
          <p className="mx-auto mb-3 inline-flex rounded-full border-[3px] border-[#10163a] px-4 py-2 text-sm font-black shadow-[4px_4px_0_#10163a]" style={{ backgroundColor: course.soft, color: course.deep }}>
            What students develop here
          </p>
          <h2 className="mx-auto max-w-3xl text-3xl font-black tracking-[-0.04em] md:text-5xl">
            Practical skills, portfolio proof, and confidence from multiple sides.
          </h2>
        </div>

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

        <div className="my-12 rounded-[2rem] border-[3px] border-[#10163a] bg-[#fff4e7] p-6 shadow-[7px_7px_0_#10163a] md:flex md:items-center md:justify-between md:gap-8">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white" style={{ backgroundColor: course.deep }}>
              <BookOpenCheck />
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

        <div className="py-10 text-center">
          <h2 className="text-3xl font-black tracking-[-0.04em] md:text-5xl">Choose your learning focus</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#475467]">
            Each block is designed to move you toward visible work, stronger thinking, and employable output.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {course.modules.map((module, index) => (
            <motion.div
              key={module.title}
              whileHover={{ y: -6 }}
              className="relative overflow-hidden rounded-[1.8rem] border-[3px] border-[#10163a] p-6 text-white shadow-[6px_6px_0_#10163a]"
              style={{ backgroundColor: index % 3 === 0 ? course.deep : index % 3 === 1 ? course.accent : '#db4b87' }}
            >
              <div className="comic-dots-dark pointer-events-none absolute inset-0 z-0" />
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10" />
              <div className="relative z-10">
                <div className="mb-4 inline-flex rounded-full bg-white/16 px-3 py-1 text-xs font-black uppercase tracking-[0.16em]">
                  {module.label}
                </div>
                <h3 className="text-2xl font-black">{module.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/86">{module.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="my-12 grid gap-5 rounded-[2rem] border-[3px] border-[#10163a] bg-white p-6 shadow-[7px_7px_0_#10163a] md:grid-cols-3">
          <div className="rounded-[1.5rem] border-[3px] border-[#10163a] p-5 shadow-[4px_4px_0_#10163a]" style={{ backgroundColor: course.soft }}>
            <Clock className="mb-3" style={{ color: course.deep }} />
            <h3 className="font-black">{course.duration}</h3>
            <p className="mt-2 text-sm leading-6 text-[#475467]">{course.mode} with rolling admissions and guided batches.</p>
          </div>
          <div className="rounded-[1.5rem] border-[3px] border-[#10163a] bg-[#eef1ff] p-5 shadow-[4px_4px_0_#10163a]">
            <Users className="mb-3 text-[#4562b0]" />
            <h3 className="font-black">Career paths</h3>
            <p className="mt-2 text-sm leading-6 text-[#475467]">{course.careerRoles}</p>
          </div>
          <div className="rounded-[1.5rem] border-[3px] border-[#10163a] bg-[#fff1f6] p-5 shadow-[4px_4px_0_#10163a]">
            <Sparkles className="mb-3 text-[#ea6865]" />
            <h3 className="font-black">Tools included</h3>
            <p className="mt-2 text-sm leading-6 text-[#475467]">{course.tools.join(', ')}</p>
          </div>
        </div>

        <div className="rounded-[2rem] border-[3px] border-[#10163a] p-7 text-white shadow-[8px_8px_0_#10163a] md:grid md:grid-cols-[1fr_0.8fr] md:items-center md:gap-8" style={{ backgroundColor: course.deep }}>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-white/68">Still confused?</p>
            <h2 className="mt-2 text-3xl font-black leading-tight md:text-4xl">Talk to TSDC and get the right course plan.</h2>
            <p className="mt-4 text-sm leading-7 text-white/82">"{course.testimonial.quote}"</p>
            <p className="mt-3 text-sm font-black text-white">{course.testimonial.author}, {course.testimonial.role}</p>
          </div>
          <div className="mt-6 rounded-[1.5rem] border-[3px] border-[#10163a] bg-white p-5 text-[#10163a] shadow-[5px_5px_0_#10163a] md:mt-0">
            <div className="space-y-3">
              <div className="rounded-full border-[3px] border-[#10163a] px-4 py-3 text-sm font-semibold text-[#667085]">Your name</div>
              <div className="rounded-full border-[3px] border-[#10163a] px-4 py-3 text-sm font-semibold text-[#667085]">Mobile number</div>
              <button
                type="button"
                onClick={() => openApplyPopup(`${course.popupInterest.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-bottom-cta`)}
                className="flex w-full items-center justify-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] px-5 py-3.5 text-sm font-black text-white shadow-[4px_4px_0_#10163a]"
                style={{ backgroundColor: course.accent }}
              >
                Open Contact Form
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
