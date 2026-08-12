'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, CheckCircle2, CirclePlay, Lightbulb, Rocket, Sparkles } from 'lucide-react'
import { useContactPopup } from '@/app/components/common/ContactPopupProvider'
import { defaultAboutPage, type AboutPageContent } from '@/app/lib/aboutPage'

type AboutStoryPageProps = {
  content?: AboutPageContent
}

export default function AboutStoryPage({ content = defaultAboutPage }: AboutStoryPageProps) {
  const { openPopup } = useContactPopup()
  const counsel = (source: string) =>
    openPopup({
      title: 'Book Free Career Counselling',
      subtitle: 'Tell us your goal. Our team will guide you to the right career path.',
      interest: 'Career Counselling',
      source,
      ctaLabel: 'Book My Free Call',
    })

  const { hero, stats, journey, values, people, reviews, cta } = content

  return (
    <div className="about-ref">
      <section className="about-ref__hero">
        <div className="about-ref__hero-bg">
          <Image src={hero.heroImage} alt="TSDC classroom" fill priority className="object-cover" />
        </div>
        <div className="about-ref__overlay" />
        <div className="about-ref__wrap about-ref__hero-content">
          <div>
            <p>{hero.eyebrow}</p>
            <h1>
              {hero.titleLine1}
              <br />
              <b>{hero.titleHighlight}</b>
            </h1>
            <span>{hero.description}</span>
            <button onClick={() => counsel('about-story')}>
              <CirclePlay size={17} /> {hero.ctaLabel}
            </button>
          </div>
        </div>
      </section>

      <section className="about-ref__wrap about-ref__stats">
        {stats.map((stat) => (
          <article key={stat.label}>
            <BadgeCheck />
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </section>

      <section className="about-ref__wrap about-ref__journey">
        <div>
          <p>{journey.eyebrow}</p>
          <h2>
            {journey.headingLine1}
            <br />
            <b>{journey.headingHighlight}</b>
          </h2>
          <span>{journey.description}</span>
          {journey.checklist.map((x) => (
            <em key={x}>
              <CheckCircle2 /> {x}
            </em>
          ))}
        </div>
        <div className="about-ref__timeline">
          {journey.timeline.map((item, i) => (
            <article key={item.title}>
              <i>{i + 1}</i>
              <div>
                <strong>{item.title}</strong>
                <span>{item.description}</span>
              </div>
              <b>{item.year}</b>
            </article>
          ))}
        </div>
      </section>

      <section className="about-ref__wrap about-ref__values">
        <header>
          <p>{values.eyebrow}</p>
          <h2>{values.heading}</h2>
        </header>
        <div>
          {values.items.map((item) => (
            <article key={item.title}>
              <Lightbulb />
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="about-ref__wrap about-ref__people">
        <div>
          <p>{people.eyebrow}</p>
          <h2>{people.heading}</h2>
          <div className="about-ref__team">
            {people.team.map((member) => (
              <article key={member.name}>
                <div>
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <strong>{member.name}</strong>
                <span>{member.role}</span>
              </article>
            ))}
          </div>
        </div>
        <aside>
          <Image src={people.asideImage} alt="TSDC learner" fill className="object-cover" />
          <div>
            <h2>
              {people.asideHeading.split('\n').map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </h2>
            <p>{people.asideDescription}</p>
            <button onClick={() => counsel('about-community')}>
              {people.asideCtaLabel} <ArrowRight size={16} />
            </button>
          </div>
        </aside>
      </section>

      <section className="about-ref__wrap about-ref__reviews">
        <header>
          <p>{reviews.eyebrow}</p>
        </header>
        <div>
          {reviews.items.map((review) => (
            <article key={review.name}>
              <Sparkles />
              <p>{review.quote}</p>
              <strong>— {review.name}</strong>
              <span>{review.role}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="about-ref__wrap about-ref__cta">
        <Rocket />
        <div>
          <h2>{cta.heading}</h2>
          <p>{cta.description}</p>
        </div>
        <button onClick={() => counsel('about-final')}>{cta.buttonLabel}</button>
        <Link href="/courses">
          {cta.exploreCoursesLabel} <ArrowRight size={15} />
        </Link>
      </section>
    </div>
  )
}
