'use client'

import Image from 'next/image'
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  Download,
  GraduationCap,
  MessageCircle,
  Palette,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
} from 'lucide-react'
import { useContactPopup } from '@/app/components/common/ContactPopupProvider'
import { Accordion } from '@/app/components/ui/accordion'
import type { CourseData } from '@/app/lib/courseContent'
import {
  achievements,
  admissionSteps,
  agencyWorkflowSteps,
  aiTools,
  aiWorkflowSteps,
  audience,
  careerRoles,
  careerSupport,
  certifications,
  curriculum,
  fileHandoverStructure,
  internshipPoints,
  learningAreas,
  learningMethodology,
  portfolioProcessSteps,
  prerequisites,
  projectTypes,
  responsibleAiPoints,
  showcaseImages,
  toolsList,
  whyPillars,
} from '@/app/lib/graphicDesignProgram'

const WHATSAPP_URL = 'https://wa.me/919566656909'

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-[.68rem] font-black uppercase tracking-[0.18em] text-[#6036e9]">{eyebrow}</p>
      <h2 className="mt-2 text-[1.7rem] font-black leading-tight text-[#0a1039] sm:text-[2.1rem]">{title}</h2>
      {description ? <p className="mt-3 text-sm leading-relaxed text-[#5b6480]">{description}</p> : null}
    </div>
  )
}

function WorkflowRow({ steps }: { steps: { label: string }[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {steps.map((step, index) => (
        <div key={step.label} className="flex items-center gap-2">
          <span className="rounded-full border border-[#e3e6ef] bg-white px-3.5 py-2 text-xs font-bold text-[#0a1039] shadow-sm">
            {step.label}
          </span>
          {index < steps.length - 1 ? <ArrowRight size={14} className="text-[#a596e8]" /> : null}
        </div>
      ))}
    </div>
  )
}

export default function GraphicDesignProgram({ course }: { course: CourseData }) {
  const { openPopup } = useContactPopup()

  const open = (source: string, syllabus = false) =>
    openPopup({
      title: syllabus ? 'Get the AI-Powered Graphic Design syllabus' : 'Apply for the AI-Powered Graphic Design Program',
      subtitle: syllabus
        ? 'Submit your details and download the current syllabus.'
        : 'Get clear guidance on the program, fees, batch timing and next steps.',
      interest: course.popupInterest,
      source,
      ctaLabel: syllabus ? 'Download Syllabus' : 'Apply Now',
      ...(syllabus ? { syllabusDownloadUrl: course.syllabusUrl, syllabusFileName: course.syllabusFileName } : {}),
    })

  return (
    <div className="bg-white text-[#0a1039]">
      {/* 1. Hero */}
      <section className="relative isolate overflow-hidden bg-[#040824]">
        <div className="absolute inset-0 -z-10 opacity-30">
          <Image src={course.image} alt="" fill className="object-cover" />
        </div>
        <div
          className="absolute inset-0 -z-10"
          style={{ background: 'linear-gradient(90deg, rgba(4,8,36,.97) 0%, rgba(4,8,36,.9) 45%, rgba(4,8,36,.55) 72%, rgba(4,8,36,.2) 100%)' }}
        />
        <div className="mx-auto w-full max-w-[1160px] px-6 py-16 sm:py-24">
          <p className="inline-flex items-center gap-2 rounded-full bg-[#6036e9] px-4 py-1.5 text-[.68rem] font-black uppercase tracking-[0.14em] text-white">
            <Sparkles size={13} /> AI-Powered Graphic Design Program
          </p>
          <h1 className="mt-5 max-w-2xl text-[2.4rem] font-black leading-[1.05] text-[#b08cff] sm:text-[3.4rem]">
            Become an AI-Powered Graphic Designer
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
            Learn professional design, use AI intelligently, and build real brands. A {course.duration.toLowerCase()} program combining design
            fundamentals, Adobe tools, AI-assisted workflows and a portfolio built through real-world projects.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {[course.duration, course.mode, 'Portfolio + Internship Exposure'].map((point) => (
              <span key={point} className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white">
                <BadgeCheck size={14} className="text-[#ab91ff]" /> {point}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => open('gdp-hero-apply')}
              className="flex items-center gap-2 rounded-lg bg-[#6036e9] px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5"
            >
              Apply Now <ArrowRight size={16} />
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-white/30 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5"
            >
              <MessageCircle size={16} /> WhatsApp Us
            </a>
            <button
              onClick={() => open('gdp-hero-syllabus', true)}
              className="flex items-center gap-2 px-2 py-3 text-sm font-black text-white/85 underline-offset-4 transition hover:underline"
            >
              <Download size={15} /> Download Syllabus
            </button>
          </div>
        </div>
      </section>

      {/* 2. Course Overview */}
      <section className="mx-auto -mt-8 w-full max-w-[1160px] px-6">
        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-[#e5e7ef] bg-white p-5 shadow-[0_8px_24px_rgba(9,16,50,.08)] sm:grid-cols-3 lg:grid-cols-6">
          {[
            ['Duration', course.duration],
            ['Mode', course.mode],
            ['Level', 'Beginner to Job-Ready'],
            ['Projects', '8–12 Portfolio Projects'],
            ['Certification', 'Yes'],
            ['Fee', course.fee],
          ].map(([label, value]) => (
            <div key={label} className="text-center">
              <p className="text-[.6rem] font-bold uppercase tracking-wide text-[#8890a8]">{label}</p>
              <p className="mt-1 text-xs font-black text-[#0a1039] sm:text-sm">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1160px] px-6 py-14">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-sm font-black uppercase tracking-wide text-[#6036e9]">Who Is This Program For?</h3>
            <div className="mt-3 grid gap-2">
              {audience.map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-sm text-[#3a4260]">
                  <Users size={15} className="mt-0.5 shrink-0 text-[#6036e9]" /> {item}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-wide text-[#6036e9]">Prerequisites</h3>
            <div className="mt-3 grid gap-2">
              {prerequisites.map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-sm text-[#3a4260]">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#16b56b]" /> {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. What You'll Learn & Achieve */}
      <section className="bg-[#f7f5ff] py-14">
        <div className="mx-auto w-full max-w-[1160px] px-6">
          <SectionHeading eyebrow="Curriculum Scope" title="What You'll Learn" />
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            {learningAreas.map((area) => (
              <span key={area} className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#4f39b3] shadow-sm">
                {area}
              </span>
            ))}
          </div>
          <h3 className="mt-10 text-center text-sm font-black uppercase tracking-wide text-[#6036e9]">What You&apos;ll Achieve</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {achievements.map((item) => (
              <div key={item} className="flex items-start gap-2.5 rounded-xl bg-white p-3.5 text-sm text-[#3a4260] shadow-sm">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#16b56b]" /> {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Student Work / Project Showcase */}
      <section className="mx-auto w-full max-w-[1160px] px-6 py-14">
        <SectionHeading
          eyebrow="Project Showcase"
          title="See the Kind of Work You'll Build"
          description="These are demonstration and reference projects that show the standard of work this program is built around — not verified student outcomes."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {showcaseImages.map((image) => (
            <figure key={image.src} className="overflow-hidden rounded-xl border border-[#e5e7ef] shadow-sm">
              <div className="relative h-40 bg-[#111a49]">
                <Image src={image.src} alt={image.alt} fill className="object-cover" />
              </div>
              <figcaption className="bg-white px-3 py-2 text-[.65rem] font-semibold text-[#6a7288]">{image.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* 5. Why This Program */}
      <section className="bg-[#0a1039] py-14 text-white">
        <div className="mx-auto w-full max-w-[1160px] px-6">
          <p className="text-center text-[.68rem] font-black uppercase tracking-[0.18em] text-[#ffc43d]">Why This Program</p>
          <h2 className="mt-2 text-center text-[1.7rem] font-black leading-tight sm:text-[2.1rem]">
            Not Just Software. <span className="text-[#ab91ff]">A Complete Design Career Foundation.</span>
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {whyPillars.map((pillar) => (
              <div key={pillar.title} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-sm font-black">{pillar.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/70">{pillar.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {learningMethodology.map((step, index) => (
              <div key={step} className="flex items-center gap-2">
                <span className="rounded-full border border-white/20 px-3.5 py-1.5 text-xs font-bold text-white/90">{step}</span>
                {index < learningMethodology.length - 1 ? <ArrowRight size={13} className="text-[#ab91ff]" /> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Tools You'll Master */}
      <section className="mx-auto w-full max-w-[1160px] px-6 py-14">
        <SectionHeading eyebrow="Tools" title="Tools You'll Master" />
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {toolsList.map((tool) => (
            <div key={tool.name} className="rounded-xl border border-[#e5e7ef] p-4 text-center shadow-sm">
              <Wrench size={18} className="mx-auto text-[#6036e9]" />
              <p className="mt-2 text-xs font-black text-[#0a1039]">{tool.name}</p>
              <p className="mt-1 text-[.6rem] font-semibold text-[#8890a8]">{tool.category}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Detailed Curriculum */}
      <section className="bg-[#f7f5ff] py-14">
        <div className="mx-auto w-full max-w-[1160px] px-6">
          <SectionHeading
            eyebrow="12-Week Syllabus"
            title="Detailed Curriculum"
            description="Month 1: Design Foundation + Illustrator · Month 2: Branding + Photoshop + Social Media · Month 3: InDesign + Print + Packaging + Portfolio"
          />
          <div className="mt-8">
            <Accordion
              items={curriculum.map((week) => ({
                title: `Month ${week.month} · Week ${week.week} — ${week.title}`,
                content: (
                  <div className="grid gap-3">
                    <ul className="grid gap-1.5">
                      {week.topics.map((topic) => (
                        <li key={topic} className="flex items-start gap-2 text-sm text-[#3a4260]">
                          <CheckCircle2 size={14} className="mt-1 shrink-0 text-[#6036e9]" /> {topic}
                        </li>
                      ))}
                    </ul>
                    <p className="rounded-lg bg-[#f3efff] px-3 py-2 text-xs font-semibold text-[#4f39b3]">
                      Assignment: {week.assignment}
                    </p>
                  </div>
                ),
              }))}
            />
          </div>
          <p className="mt-6 text-center text-xs text-[#8890a8]">
            Want the full syllabus? <button onClick={() => open('gdp-curriculum-syllabus', true)} className="font-bold text-[#6036e9] underline">Download it here</button>.
          </p>
        </div>
      </section>

      {/* 8. AI-Powered Design Workflow */}
      <section className="mx-auto w-full max-w-[1160px] px-6 py-14">
        <SectionHeading
          eyebrow="What Makes This Program Different"
          title="The AI-Powered Design Workflow"
          description="AI is taught as a design assistant, not a replacement for design fundamentals."
        />
        <div className="mt-8 overflow-x-auto">
          <WorkflowRow steps={aiWorkflowSteps} />
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {aiTools.map((tool) => (
            <div key={tool.name} className="rounded-xl border border-[#e5e7ef] p-5 shadow-sm">
              <h3 className="text-base font-black text-[#0a1039]">{tool.name}</h3>
              <p className="mt-1 text-xs font-bold text-[#6036e9]">{tool.role}</p>
              <ul className="mt-3 grid gap-1.5">
                {tool.uses.map((use) => (
                  <li key={use} className="flex items-start gap-2 text-xs text-[#5b6480]">
                    <CheckCircle2 size={12} className="mt-0.5 shrink-0 text-[#16b56b]" /> {use}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-xl bg-[#f7f5ff] p-5">
          <h3 className="flex items-center gap-2 text-sm font-black text-[#0a1039]">
            <ShieldCheck size={16} className="text-[#6036e9]" /> Responsible AI Usage
          </h3>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {responsibleAiPoints.map((point) => (
              <p key={point} className="text-xs text-[#5b6480]">{point}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Projects You'll Build */}
      <section className="bg-[#f7f5ff] py-14">
        <div className="mx-auto w-full max-w-[1160px] px-6">
          <SectionHeading eyebrow="Portfolio Projects" title="Projects You'll Build" />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {projectTypes.map((project) => (
              <div key={project} className="flex items-center gap-2 rounded-lg bg-white px-3.5 py-3 text-xs font-bold text-[#3a4260] shadow-sm">
                <Palette size={14} className="shrink-0 text-[#6036e9]" /> {project}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Agency-Based Learning */}
      <section className="mx-auto w-full max-w-[1160px] px-6 py-14">
        <SectionHeading
          eyebrow="Agency-Based Masterclass"
          title="How Design Work Is Handled Professionally"
          description="Every major project runs through the same process a design agency uses with a real client."
        />
        <div className="mt-8 overflow-x-auto">
          <WorkflowRow steps={agencyWorkflowSteps} />
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-black uppercase tracking-wide text-[#6036e9]">What Students Learn</h3>
            <div className="mt-3 grid gap-2">
              {['Asking the right questions before opening the software', 'Estimating scope, deliverables and revision rounds', 'Explaining why a colour, typeface or concept was chosen', 'Separating personal preference from design objectives in feedback', 'Version control and revision tracking'].map((point) => (
                <div key={point} className="flex items-start gap-2.5 text-sm text-[#3a4260]">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#16b56b]" /> {point}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-wide text-[#6036e9]">Professional File Handover</h3>
            <div className="mt-3 grid gap-2">
              {fileHandoverStructure.map((folder) => (
                <div key={folder} className="rounded-lg bg-[#f7f5ff] px-3.5 py-2.5 text-sm font-semibold text-[#4f39b3]">
                  {folder}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 11. Portfolio Development */}
      <section className="bg-[#f7f5ff] py-14">
        <div className="mx-auto w-full max-w-[1160px] px-6">
          <SectionHeading
            eyebrow="Portfolio Development"
            title="You Don't Just Export a JPEG. You Build a Case Study."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {portfolioProcessSteps.map((step) => (
              <div key={step.number} className="rounded-xl bg-white p-4 shadow-sm">
                <span className="text-xs font-black text-[#6036e9]">{step.number}</span>
                <h3 className="mt-1 text-sm font-black text-[#0a1039]">{step.title}</h3>
                <p className="mt-1 text-xs text-[#5b6480]">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Internship / Industry Exposure */}
      <section className="mx-auto w-full max-w-[1160px] px-6 py-14">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-[.68rem] font-black uppercase tracking-[0.18em] text-[#6036e9]">Industry Exposure</p>
            <h2 className="mt-2 text-[1.5rem] font-black leading-tight text-[#0a1039]">Internship / Project Exposure</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#5b6480]">
              Eligible students can be given structured internship or project exposure based on TSDC&apos;s internship model, focused on
              real briefs and deadlines rather than a fixed guarantee for every student.
            </p>
          </div>
          <div className="grid gap-2.5">
            {internshipPoints.map((point) => (
              <div key={point} className="flex items-start gap-2.5 rounded-xl border border-[#e5e7ef] p-3.5 text-sm text-[#3a4260] shadow-sm">
                <BriefcaseBusiness size={16} className="mt-0.5 shrink-0 text-[#6036e9]" /> {point}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. Faculty / Mentorship */}
      <section className="bg-[#f7f5ff] py-14">
        <div className="mx-auto w-full max-w-[1160px] px-6">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <Image src="/logo.png" alt="TSDC Creative Team" width={140} height={48} />
            <h2 className="text-[1.5rem] font-black text-[#0a1039]">Taught by the TSDC Creative Team</h2>
            <p className="text-sm leading-relaxed text-[#5b6480]">
              Led by TSDC&apos;s in-house creative directors and design mentors who work on real client and brand projects, and teach
              through live demonstration, guided practice and project critique — the same agency-style process used throughout this
              program.
            </p>
          </div>
        </div>
      </section>

      {/* 14. Career Opportunities & Placement Support */}
      <section className="mx-auto w-full max-w-[1160px] px-6 py-14">
        <SectionHeading eyebrow="Career Path" title="Career Opportunities & Support" />
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-sm font-black uppercase tracking-wide text-[#6036e9]">Roles You Can Prepare For</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {careerRoles.map((role) => (
                <span key={role} className="rounded-full bg-[#f3efff] px-3.5 py-1.5 text-xs font-bold text-[#4f39b3]">
                  {role}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-wide text-[#6036e9]">Career & Placement Support</h3>
            <div className="mt-3 grid gap-2">
              {careerSupport.map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-sm text-[#3a4260]">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#16b56b]" /> {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 15. Certification */}
      <section className="bg-[#0a1039] py-14 text-white">
        <div className="mx-auto w-full max-w-[1160px] px-6">
          <p className="text-center text-[.68rem] font-black uppercase tracking-[0.18em] text-[#ffc43d]">Certification</p>
          <h2 className="mt-2 text-center text-[1.5rem] font-black">What You Receive</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {certifications.map((cert) => (
              <div key={cert.title} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-5">
                <Award size={20} className="mt-0.5 shrink-0 text-[#ffc43d]" />
                <div>
                  <h3 className="text-sm font-black">{cert.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/70">{cert.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 16. Course Fee & Admission */}
      <section className="mx-auto w-full max-w-[1160px] px-6 py-14">
        <div className="rounded-2xl border border-[#e5e7ef] bg-white p-8 text-center shadow-[0_8px_24px_rgba(9,16,50,.08)]">
          <p className="text-[.68rem] font-black uppercase tracking-[0.18em] text-[#6036e9]">Course Fee</p>
          <h2 className="mt-2 text-[2.4rem] font-black text-[#0a1039]">{course.fee}</h2>
          <p className="mt-1 text-sm font-bold text-[#5c4aab]">Easy payment options · {course.emi}</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-[#5b6480]">
            <span>Seats: {course.seats}</span>
            <span aria-hidden="true">·</span>
            <span>Next batches: {course.nextBatches.join(' · ')}</span>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => open('gdp-fee-apply')}
              className="flex items-center gap-2 rounded-lg bg-[#6036e9] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5"
            >
              Apply Now <ArrowRight size={16} />
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-[#e3e6ef] px-6 py-3 text-sm font-black text-[#0a1039] transition hover:-translate-y-0.5"
            >
              <MessageCircle size={16} /> Talk to Counsellor
            </a>
          </div>
        </div>

        <div className="mt-12">
          <SectionHeading eyebrow="Admission Process" title="How to Join" />
          <div className="mt-8 overflow-x-auto">
            <WorkflowRow steps={admissionSteps.map((label) => ({ label }))} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#f7f5ff] py-14">
        <div className="mx-auto w-full max-w-[1160px] px-6">
          <SectionHeading eyebrow="Questions" title="Frequently Asked Questions" />
          <div className="mt-8">
            <Accordion items={course.faqs.map((faq) => ({ title: faq.question, content: <p>{faq.answer}</p> }))} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto w-full max-w-[1160px] px-6 py-14">
        <div className="flex flex-col items-center gap-5 rounded-2xl bg-[#6036e9] px-8 py-12 text-center text-white sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="flex items-center gap-2 text-[1.5rem] font-black sm:justify-start">
              <GraduationCap size={24} /> Ready to Build Your Graphic Design Career?
            </h2>
            <p className="mt-2 text-sm text-white/80">Think. Research. Create. Present. Revise. Deliver — like a professional designer.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => open('gdp-final-apply')}
              className="flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-black text-[#0a1039] transition hover:-translate-y-0.5"
            >
              Apply Now <ArrowRight size={16} />
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-white/40 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
            <button
              onClick={() => open('gdp-final-counselling')}
              className="flex items-center gap-2 rounded-lg border border-white/40 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5"
            >
              <BookOpen size={16} /> Free Counselling
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
