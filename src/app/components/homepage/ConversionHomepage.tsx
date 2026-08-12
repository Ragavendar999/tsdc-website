'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, BookOpen, BriefcaseBusiness, CheckCircle2, Cpu, GraduationCap, Lightbulb, MonitorSmartphone, Palette, PenTool, Sparkles } from 'lucide-react'
import { useContactPopup } from '@/app/components/common/ContactPopupProvider'
import { defaultHomepageContent, type HomepageContentData } from '@/app/lib/homepage'

const benefitIcons = [GraduationCap, PenTool, BriefcaseBusiness, Palette, Cpu, MonitorSmartphone]

type ConversionHomepageProps = {
  content?: HomepageContentData
}

export default function ConversionHomepage({ content = defaultHomepageContent }: ConversionHomepageProps) {
  const { openPopup } = useContactPopup()
  const counsel = () =>
    openPopup({
      title: 'Book free career counselling',
      subtitle: 'Share your goal and we will help you choose the right creative career path.',
      interest: 'Free Career Counselling',
      source: 'homepage-counselling',
      ctaLabel: 'Book My Free Call',
    })

  const { hero, stats, programsSection, skills, whyLearn, methodology, studentProjects, finalCta, tools } = content

  return (
    <div className="reference-home">
      <section className="ref-hero">
        <div className="ref-home-hero-bg" aria-hidden="true">
          <Image src={hero.heroBgImage} alt="" fill priority className="object-cover" />
        </div>
        <div className="ref-home-hero-overlay" aria-hidden="true" />
        <div className="ref-wrap ref-hero__grid">
          <div className="ref-hero__copy">
            <p className="ref-kicker">
              <Sparkles size={14} /> {hero.kicker}
            </p>
            <h1>
              {hero.titleLine1}
              <br />
              <b>{hero.titleHighlight}</b>
            </h1>
            <p>{hero.description}</p>
            <div className="ref-actions">
              <Link href="/courses" className="ref-btn ref-btn--yellow">
                {hero.primaryCtaLabel} <ArrowRight size={16} />
              </Link>
              <button onClick={counsel} className="ref-btn ref-btn--outline">
                {hero.secondaryCtaLabel}
              </button>
            </div>
            <div className="ref-hero__checks">
              {hero.checklist.map((x) => (
                <span key={x}>
                  <CheckCircle2 size={14} />
                  {x}
                </span>
              ))}
            </div>
          </div>
          <div className="ref-hero__image">
            <Image src={hero.heroImage} alt="TSDC classroom with students learning practical creative skills" fill priority className="object-cover" />
          </div>
        </div>
      </section>

      <section className="ref-wrap ref-stats">
        {stats.map((stat) => (
          <div key={stat.label}>
            <BadgeCheck />
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="ref-section ref-wrap">
        <header className="ref-head">
          <p>{programsSection.eyebrow}</p>
          <h2>{programsSection.heading}</h2>
          <span>{programsSection.description}</span>
        </header>
        <div className="ref-programs">
          {programsSection.programs.map((program) => (
            <Link key={program.name} href={program.href} className={`ref-program ${program.accentClass}`}>
              <div className="ref-program__image">
                <Image src={program.image} alt={`${program.name} course`} fill className="object-cover" />
              </div>
              <small>AI-Powered</small>
              <h3>{program.name}</h3>
              <p>{program.description}</p>
              <b>
                Tools: <i>{program.tools}</i>
              </b>
              <em>
                Explore {program.name} <ArrowRight size={14} />
              </em>
            </Link>
          ))}
        </div>
      </section>

      <section className="ref-wrap ref-skills">
        <div className="ref-skills__image">
          <Image src={skills.image} alt="TSDC learner building skills" fill className="object-cover" />
        </div>
        <div>
          <h2>
            <b>{skills.headingBold}</b> {skills.headingRest}
          </h2>
          <h3>Your qualification can open a door.<br />Your ability to demonstrate what you can do helps you move forward.</h3>
          <p>{skills.description}</p>
        </div>
        <ul>
          {skills.checklist.map((item, i) => {
            const icons = [Lightbulb, BriefcaseBusiness, BookOpen]
            const Icon = icons[i % icons.length]
            return (
              <li key={item}>
                <Icon />
                {item}
              </li>
            )
          })}
        </ul>
      </section>

      <section className="ref-section ref-wrap">
        <header className="ref-head">
          <p>{whyLearn.eyebrow}</p>
        </header>
        <div className="ref-benefits">
          {whyLearn.benefits.map((benefit, i) => {
            const Icon = benefitIcons[i % benefitIcons.length]
            return (
              <article key={benefit.title}>
                <Icon />
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="ref-wrap ref-method">
        <div>
          <p className="ref-kicker">{methodology.eyebrow}</p>
          <div className="ref-steps">
            {methodology.steps.map((s, i) => (
              <span key={s}>
                <i>{i + 1}</i>
                {s}
              </span>
            ))}
          </div>
          <p>{methodology.description}</p>
          <button className="ref-dark-btn" onClick={counsel}>
            {methodology.ctaLabel} <ArrowRight size={15} />
          </button>
        </div>
        <div className="ref-projects">
          <header>
            <p>{studentProjects.eyebrow}</p>
            <h2>{studentProjects.heading}</h2>
            <Link href="/live-projects">{studentProjects.viewAllLabel}</Link>
          </header>
          <div>
            {studentProjects.projects.map((project) => (
              <article key={project.title}>
                <Image src={project.image} alt={project.title} fill className="object-cover" />
                <span>{project.title}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ref-wrap ref-final">
        <div>
          <h2>
            {finalCta.masterclassHeading.split('\n').map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h2>
          <p>{finalCta.masterclassDescription}</p>
          <Link href="/masterclasses">
            {finalCta.masterclassLinkLabel} <ArrowRight size={15} />
          </Link>
        </div>
        <div>
          <h2>
            {finalCta.counsellingHeading.split('\n').map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h2>
          <p>{finalCta.counsellingDescription}</p>
          <button onClick={counsel}>
            {finalCta.counsellingButtonLabel} <ArrowRight size={15} />
          </button>
        </div>
        <div className="ref-final__visual">
          <Image src={finalCta.visualImage} alt="Career counselling at TSDC" fill className="object-cover" />
          <ul>
            {finalCta.visualChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ref-tools ref-wrap">
        <span>{tools.heading}</span>
        {tools.items.map((item) => (
          <b key={item}>{item}</b>
        ))}
      </section>
    </div>
  )
}
