'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  Download,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'
import { useState } from 'react'
import { useContactPopup } from '@/app/components/common/ContactPopupProvider'
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

function WorkflowRow({ steps }: { steps: { label: string }[] }) {
  return (
    <div className="course-ref__workflow">
      {steps.map((step, index) => (
        <span key={step.label} className="flex items-center gap-2">
          {step.label}
          {index < steps.length - 1 ? <ArrowRight size={12} /> : null}
        </span>
      ))}
    </div>
  )
}

export default function GraphicDesignProgram({ course }: { course: CourseData }) {
  const { openPopup } = useContactPopup()
  const [faq, setFaq] = useState<number | null>(null)

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
    <div className="course-ref">
      {/* Hero */}
      <section className="course-ref__hero">
        <div className="course-ref__hero-bg" aria-hidden="true">
          <Image src={course.image} alt="" fill className="object-cover" />
        </div>
        <div className="course-ref__hero-overlay" aria-hidden="true" />
        <div className="course-ref__wrap">
          <p className="course-ref__crumb">Home　›　Courses　›　{course.title}</p>
          <div className="course-ref__hero-grid">
            <div>
              <p className="course-ref__badge">
                <Sparkles size={12} className="mr-1 inline" /> {course.eyebrow}
              </p>
              <h1>Become an AI-Powered Graphic Designer</h1>
              <p className="course-ref__desc">
                Learn professional design, use AI intelligently, and build real brands. {course.description}
              </p>
              <div className="course-ref__points">
                {[course.duration, course.mode, 'Portfolio + Internship Exposure', '8–12 Portfolio Projects'].map((x) => (
                  <span key={x}>
                    <BadgeCheck size={17} />
                    {x}
                  </span>
                ))}
              </div>
              <div className="course-ref__actions">
                <button onClick={() => open('gdp-hero-apply')}>
                  Apply Now <ArrowRight size={16} />
                </button>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={16} /> WhatsApp Us
                </a>
                <button className="course-ref__download" onClick={() => open('gdp-hero-syllabus', true)}>
                  <Download size={15} /> Download Syllabus
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facts strip */}
      <section className="course-ref__wrap course-ref__facts">
        {[
          ['Duration', course.duration],
          ['Mode', course.mode],
          ['Projects', '8–12 Portfolio Projects'],
          ['Level', 'Beginner to Job-Ready'],
          ['Certification', 'Yes'],
          ['Fees', course.fee],
        ].map(([l, v]) => (
          <div key={l}>
            <BadgeCheck />
            <small>{l}</small>
            <strong>{v}</strong>
          </div>
        ))}
      </section>

      {/* Tabbed body */}
      <section className="course-ref__wrap course-ref__body">
        <main>
          <nav className="course-ref__tabs">
            <a href="#overview">Overview</a>
            <a href="#curriculum">Curriculum</a>
            <a href="#ai-workflow">AI Workflow</a>
            <a href="#projects">Projects</a>
            <a href="#faq">FAQ</a>
          </nav>

          {/* Overview */}
          <div id="overview" className="course-ref__panel">
            <h2>About This Program</h2>
            <p>
              A {course.duration.toLowerCase()} program combining design fundamentals, Adobe tools, AI-assisted workflows and a
              portfolio built through real-world, agency-style projects. AI is taught as a design assistant, not a replacement for
              design fundamentals.
            </p>

            <h2>What You&apos;ll Achieve</h2>
            <div className="course-ref__check-grid">
              {achievements.map((item) => (
                <span key={item}>
                  <CheckCircle2 />
                  {item}
                </span>
              ))}
            </div>

            <h2>Who Should Join?</h2>
            <div className="course-ref__audiences">
              {audience.map((item) => (
                <article key={item}>
                  <Users />
                  {item}
                </article>
              ))}
            </div>

            <h2>What You&apos;ll Learn</h2>
            <div className="course-ref__chips">
              {learningAreas.map((area) => (
                <span key={area}>{area}</span>
              ))}
            </div>

            <h2>Why This Program</h2>
            <div className="course-ref__benefits">
              {whyPillars.map((pillar) => (
                <article key={pillar.title}>
                  <Sparkles />
                  <h3>{pillar.title}</h3>
                  <p>{pillar.text}</p>
                </article>
              ))}
            </div>
            <div className="mt-4">
              <WorkflowRow steps={learningMethodology.map((label) => ({ label }))} />
            </div>

            <h2 className="mt-6">Prerequisites</h2>
            <div className="course-ref__check-grid">
              {prerequisites.map((item) => (
                <span key={item}>
                  <CheckCircle2 />
                  {item}
                </span>
              ))}
            </div>

            <h2>Tools You&apos;ll Master</h2>
            <div className="course-ref__chips">
              {toolsList.map((tool) => (
                <span key={tool.name}>{tool.name}</span>
              ))}
            </div>
          </div>

          {/* Curriculum */}
          <div id="curriculum" className="course-ref__panel">
            <h2>Detailed Curriculum</h2>
            <p>
              Month 1: Design Foundation + Illustrator · Month 2: Branding + Photoshop + Social Media · Month 3: InDesign + Print +
              Packaging + Portfolio
            </p>
            {curriculum.map((week) => (
              <details key={`${week.month}-${week.week}`}>
                <summary>
                  Month {week.month} · Week {week.week} — {week.title}
                  <ChevronDown size={17} />
                </summary>
                <ul className="mt-2 grid gap-1.5">
                  {week.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="mt-1 shrink-0 text-[#6036e9]" /> {topic}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 font-semibold text-[#4f39b3]">Assignment: {week.assignment}</p>
              </details>
            ))}
            <p className="mt-4 text-center">
              Want the full syllabus?{' '}
              <button onClick={() => open('gdp-curriculum-syllabus', true)} className="font-bold text-[#6036e9] underline">
                Download it here
              </button>
              .
            </p>
          </div>

          {/* AI Workflow */}
          <div id="ai-workflow" className="course-ref__panel">
            <h2>The AI-Powered Design Workflow</h2>
            <p>AI is taught as a design assistant, not a replacement for design fundamentals.</p>
            <WorkflowRow steps={aiWorkflowSteps} />
            <div className="course-ref__ai-tools">
              {aiTools.map((tool) => (
                <article key={tool.name}>
                  <h3>{tool.name}</h3>
                  <em>{tool.role}</em>
                  <ul>
                    {tool.uses.map((use) => (
                      <li key={use}>
                        <CheckCircle2 size={12} /> {use}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <div className="course-ref__responsible">
              <h3>
                <ShieldCheck size={16} className="text-[#6036e9]" /> Responsible AI Usage
              </h3>
              {responsibleAiPoints.map((point) => (
                <p key={point}>{point}</p>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div id="projects" className="course-ref__panel">
            <header>
              <h2>See the Kind of Work You&apos;ll Build</h2>
              <Link href="/live-projects">
                View All Projects <ArrowRight size={14} />
              </Link>
            </header>
            <p className="-mt-2 text-[#8890a8]">
              Demonstration and reference projects showing the standard of work this program is built around — not verified student
              outcomes.
            </p>
            <div className="course-ref__projects">
              {showcaseImages.map((image) => (
                <article key={image.src}>
                  <div>
                    <Image src={image.src} alt={image.alt} fill className="object-cover" />
                  </div>
                  <strong>{image.caption}</strong>
                </article>
              ))}
            </div>

            <h2>Projects You&apos;ll Build</h2>
            <div className="course-ref__chips">
              {projectTypes.map((project) => (
                <span key={project}>{project}</span>
              ))}
            </div>

            <h2>Agency-Based Learning</h2>
            <p>Every major project runs through the same process a design agency uses with a real client.</p>
            <WorkflowRow steps={agencyWorkflowSteps} />
            <div className="course-ref__check-grid mt-3">
              {[
                'Asking the right questions before opening the software',
                'Estimating scope, deliverables and revision rounds',
                'Explaining why a colour, typeface or concept was chosen',
                'Separating personal preference from design objectives in feedback',
              ].map((item) => (
                <span key={item}>
                  <CheckCircle2 />
                  {item}
                </span>
              ))}
            </div>
            <h3 className="mt-4 text-[.72rem] font-black uppercase tracking-wide text-[#6036e9]">Professional File Handover</h3>
            <div className="course-ref__chips">
              {fileHandoverStructure.map((folder) => (
                <span key={folder}>{folder}</span>
              ))}
            </div>

            <h2>Portfolio Development</h2>
            <p>You don&apos;t just export a JPEG. You build a case study.</p>
            <div className="course-ref__check-grid">
              {portfolioProcessSteps.map((step) => (
                <span key={step.number}>
                  <CheckCircle2 />
                  <b>{step.number} {step.title}:</b>&nbsp;{step.text}
                </span>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div id="faq" className="course-ref__panel">
            <h2>Frequently Asked Questions</h2>
            {course.faqs.map((x, i) => (
              <details open={faq === i} key={x.question}>
                <summary
                  onClick={(e) => {
                    e.preventDefault()
                    setFaq(faq === i ? null : i)
                  }}
                >
                  {x.question}
                  <ChevronDown size={17} />
                </summary>
                <p>{x.answer}</p>
              </details>
            ))}
          </div>
        </main>

        <aside>
          <div className="course-ref__price">
            <p>Course Fee</p>
            <h2>{course.fee}</h2>
            {['Live Classes', 'Industry Projects', 'AI Tools Training', 'Portfolio Development', 'Certificate of Completion', 'Career Support'].map((x) => (
              <span key={x}>
                <CheckCircle2 />
                {x}
              </span>
            ))}
            <button onClick={() => open('gdp-price-apply')}>
              Apply Now <ArrowRight size={15} />
            </button>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle /> Talk to Counsellor
            </a>
            <small>Easy payment options · {course.emi}</small>
          </div>
          <div className="course-ref__trainer">
            <p>Course Trainer</p>
            <div>
              <Image src="/logo.png" alt="TSDC Creative Team" width={150} height={52} />
              <span>
                <strong>TSDC Creative Team</strong>
                <small>Creative Director &amp; Trainers</small>
                <small>Live industry-oriented guidance</small>
              </span>
            </div>
            <Link href="/about">
              View Trainer Profile <ArrowRight size={14} />
            </Link>
          </div>
          <div className="course-ref__help">
            <BookOpen />
            <strong>Need Help Choosing?</strong>
            <p>Get free career counselling from our experts.</p>
            <button onClick={() => open('gdp-side-counselling')}>
              Book Free Counselling <ArrowRight size={14} />
            </button>
          </div>
        </aside>
      </section>

      {/* Internship */}
      <section className="course-ref__wrap">
        <div className="course-ref__extra">
          <h2>Internship / Project Exposure</h2>
          <p className="mb-3 text-[#5a647a]">
            Eligible students can be given structured internship or project exposure based on TSDC&apos;s internship model, focused on
            real briefs and deadlines rather than a fixed guarantee for every student.
          </p>
          <div className="course-ref__check-grid">
            {internshipPoints.map((point) => (
              <span key={point}>
                <BriefcaseBusiness size={15} />
                {point}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Career & Certification */}
      <section className="course-ref__wrap">
        <div className="course-ref__extra">
          <h2>Career Opportunities &amp; Support</h2>
          <h3 className="text-[.72rem] font-black uppercase tracking-wide text-[#6036e9]">Roles You Can Prepare For</h3>
          <div className="course-ref__chips">
            {careerRoles.map((role) => (
              <span key={role}>{role}</span>
            ))}
          </div>
          <h3 className="mt-4 text-[.72rem] font-black uppercase tracking-wide text-[#6036e9]">Career &amp; Placement Support</h3>
          <div className="course-ref__check-grid">
            {careerSupport.map((item) => (
              <span key={item}>
                <CheckCircle2 />
                {item}
              </span>
            ))}
          </div>
          <h3 className="mt-4 text-[.72rem] font-black uppercase tracking-wide text-[#6036e9]">Certification</h3>
          <div className="course-ref__check-grid">
            {certifications.map((cert) => (
              <span key={cert.title}>
                <Award size={15} />
                <b>{cert.title}:</b>&nbsp;{cert.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="course-ref__wrap">
        <div className="course-ref__extra">
          <h2>Admission Process</h2>
          <WorkflowRow steps={admissionSteps.map((label) => ({ label }))} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="course-ref__wrap course-ref__cta">
        <div>
          <h2>Ready to Build Your Graphic Design Career?</h2>
          <p>Think. Research. Create. Present. Revise. Deliver — like a professional designer.</p>
        </div>
        <button onClick={() => open('gdp-final-apply')}>
          Apply Now <ArrowRight size={15} />
        </button>
        <button onClick={() => open('gdp-final-counselling')}>
          Book Free Counselling <ArrowRight size={15} />
        </button>
      </section>
    </div>
  )
}
