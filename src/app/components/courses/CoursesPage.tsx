'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, BookOpenCheck, CalendarDays, CheckCircle2, Clock3, GraduationCap, Layers3 } from 'lucide-react'
import { useState } from 'react'
import { useContactPopup } from '@/app/components/common/ContactPopupProvider'
import { defaultCoursesListing, type CoursesListingContent } from '@/app/lib/coursesListing'

type CoursesPageProps = {
  content?: CoursesListingContent
}

export default function CoursesPage({ content = defaultCoursesListing }: CoursesPageProps) {
  const { openPopup } = useContactPopup()
  const [selected, setSelected] = useState(0)
  const { hero, listing, guide, benefits, stats, cta } = content
  const current = listing.courses[selected]
  const guideEnquiry = (source: string) =>
    openPopup({
      title: 'Get course guidance',
      subtitle: 'Share your details and our admissions team will help you choose the right course.',
      interest: current.title,
      source,
      ctaLabel: 'Get Guidance',
    })

  return (
    <div className="courses-ref">
      <section className="courses-ref__hero">
        <div className="courses-ref__hero-bg">
          <Image src={hero.heroImage} alt="TSDC practical creative classroom" fill priority className="object-contain object-right" />
        </div>
        <div className="courses-ref__overlay" />
        <div className="courses-ref__wrap courses-ref__hero-content">
          <div>
            <p>{hero.eyebrow}</p>
            <h1>
              {hero.titleLine1}
              <br />
              <b>{hero.titleHighlight}</b>
            </h1>
            <span>{hero.description}</span>
            <div className="courses-ref__hero-points">
              {hero.points.map((x) => (
                <article key={x}>
                  <BadgeCheck />
                  <small>{x}</small>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="courses-ref__wrap courses-ref__listing">
        <header>
          <p>{listing.eyebrow}</p>
          <h2>{listing.heading}</h2>
          <span>{listing.description}</span>
        </header>
        <div className="courses-ref__cards">
          {listing.courses.map((course) => (
            <article key={course.title}>
              <Link className="courses-ref__card-image" href={course.href}>
                <Image src={course.image} alt={course.title} fill className="object-cover" />
              </Link>
              <div>
                <h2>{course.title}</h2>
                <p>{course.copy}</p>
                <ul>
                  <li>
                    <Clock3 /> Duration <b>{course.duration}</b>
                  </li>
                  <li>
                    <CalendarDays /> Live Classes <b>{course.classes}</b>
                  </li>
                  <li>
                    <Layers3 /> Projects <b>{course.projects}</b>
                  </li>
                  <li>
                    <BookOpenCheck /> Tools You&apos;ll Master <b>{course.tools}</b>
                  </li>
                  <li>
                    <BadgeCheck /> Certificate <b>Industry Recognized</b>
                  </li>
                </ul>
                <Link href={course.href} style={{ backgroundColor: course.accent }}>
                  View Course Details <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="courses-ref__wrap courses-ref__guide">
        <div>
          <h2>{guide.heading}</h2>
          <p>{guide.description}</p>
          <button onClick={() => guideEnquiry('courses-guidance')}>
            {guide.primaryButtonLabel} <ArrowRight size={14} />
          </button>
          <button onClick={() => guideEnquiry('courses-expert')}>{guide.secondaryButtonLabel}</button>
        </div>
        <ul>
          {guide.checklist.map((x) => (
            <li key={x}>
              <CheckCircle2 />
              {x}
            </li>
          ))}
        </ul>
      </section>

      <section className="courses-ref__wrap courses-ref__benefits">
        <header>
          <p>{benefits.eyebrow}</p>
          <h2>{benefits.heading}</h2>
        </header>
        <div>
          {benefits.items.map((item) => (
            <article key={item.title}>
              <GraduationCap />
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="courses-ref__wrap courses-ref__overview">
        <aside>
          <h3>Explore All Courses</h3>
          {listing.courses.map((course, i) => (
            <button key={course.title} className={selected === i ? 'active' : ''} onClick={() => setSelected(i)}>
              {course.title}
            </button>
          ))}
        </aside>
        <article>
          <header>
            <p>{current.title}</p>
            <h2>{current.title} Program</h2>
          </header>
          <div className="courses-ref__overview-body">
            <div className="courses-ref__overview-image">
              <Image src={current.image} alt={current.title} fill className="object-cover" />
            </div>
            <div>
              <p>{current.copy} Learn with guided projects, practical feedback, and portfolio-focused support.</p>
              <h3>What You&apos;ll Learn</h3>
              <ul>
                {['Design fundamentals and real workflows', 'Typography, colour, and composition', 'Portfolio-ready project presentation', 'Client briefs and practical execution'].map(
                  (x) => (
                    <li key={x}>
                      <CheckCircle2 />
                      {x}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="courses-ref__overview-facts">
              <span>
                Duration <b>{current.duration}</b>
              </span>
              <span>
                Live Classes <b>{current.classes}</b>
              </span>
              <span>
                Projects <b>{current.projects}</b>
              </span>
              <span>
                Level <b>Beginner to Advanced</b>
              </span>
              <button onClick={() => guideEnquiry('courses-overview')}>
                Enroll Now <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </article>
      </section>

      <section className="courses-ref__wrap courses-ref__stats">
        {stats.map((stat) => (
          <article key={stat.label}>
            <BadgeCheck />
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </section>

      <section className="courses-ref__wrap courses-ref__cta">
        <div>
          <h2>
            {cta.heading.split('\n').map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h2>
          <p>{cta.description}</p>
        </div>
        {cta.metrics.map((metric) => (
          <strong key={metric.label}>
            {metric.value}
            <small>{metric.label}</small>
          </strong>
        ))}
        <div>
          <button onClick={() => guideEnquiry('courses-final')}>
            {cta.buttonLabel} <ArrowRight size={14} />
          </button>
          <Link href={cta.exploreLinkHref}>
            {cta.exploreLinkLabel} <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  )
}
