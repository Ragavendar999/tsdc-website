'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, CheckCircle2, CirclePlay, ClipboardList } from 'lucide-react'
import { useState } from 'react'
import { useContactPopup } from '@/app/components/common/ContactPopupProvider'
import CaseStudyModal from '@/app/components/liveprojects/CaseStudyModal'
import { defaultLiveProjects, type LiveProject, type LiveProjectsContent as LiveProjectsData } from '@/app/lib/liveProjects'

type LiveProjectsContentProps = {
  content?: LiveProjectsData
}

export default function LiveProjectsContent({ content = defaultLiveProjects }: LiveProjectsContentProps) {
  const [filter, setFilter] = useState('All Projects')
  const [activeProject, setActiveProject] = useState<LiveProject | null>(null)
  const { openPopup } = useContactPopup()
  const { hero, stats, filters, projects, portfolio, process, cta } = content
  const list = filter === 'All Projects' ? projects : projects.filter((project) => project.category === filter)

  const handleViewCaseStudy = (project: LiveProject) => {
    if (project.images.length > 0) {
      setActiveProject(project)
      return
    }
    openPopup({
      title: `Explore ${project.title}`,
      subtitle: 'Want to build work like this? Talk to TSDC admissions about the relevant course.',
      interest: project.category,
      source: 'projects-card',
      ctaLabel: 'Get Course Guidance',
    })
  }

  return (
    <div className="projects-ref">
      <section className="projects-ref__hero">
        <div className="projects-ref__hero-bg">
          <Image src={hero.heroImage} alt="TSDC student projects" fill priority className="object-cover" />
        </div>
        <div className="projects-ref__hero-overlay" />
        <div className="projects-ref__wrap projects-ref__hero-content">
          <div>
            <p>{hero.eyebrow}</p>
            <h1>
              {hero.titleLine1}
              <br />
              <b>{hero.titleHighlight}</b>
            </h1>
            <span>{hero.subtitle}</span>
            <div>
              <a href="#project-gallery">
                {hero.exploreLinkLabel} <ArrowRight size={16} />
              </a>
              <button
                onClick={() =>
                  openPopup({
                    title: 'Start Your Project Journey',
                    subtitle: 'Share your goal and we will guide you to the right course and project path.',
                    interest: 'Projects Enquiry',
                    source: 'projects-hero',
                    ctaLabel: 'Get Started',
                  })
                }
              >
                {hero.ctaLabel}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="projects-ref__wrap projects-ref__stats">
        {stats.map((stat) => (
          <article key={stat.label}>
            <BadgeCheck />
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </section>

      <section id="project-gallery" className="projects-ref__wrap projects-ref__gallery">
        <div className="projects-ref__filters">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={filter === f ? 'active' : ''}>
              {f}
            </button>
          ))}
        </div>
        <div className="projects-ref__grid">
          {list.map((project) => (
            <article key={project.id}>
              <div>
                <Image src={project.coverImage} alt={project.title} fill className="object-cover" />
                {project.category === 'Video Editing' && <CirclePlay />}
              </div>
              <small>{project.category}</small>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <button onClick={() => handleViewCaseStudy(project)}>
                View Case Study <ArrowRight size={14} />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="projects-ref__wrap projects-ref__portfolio">
        <div className="projects-ref__portfolio-image">
          <Image src={portfolio.image} alt="Student building a portfolio" fill className="object-cover" />
        </div>
        <div>
          <h2>{portfolio.heading}</h2>
          <p>{portfolio.description}</p>
          {portfolio.checklist.map((item) => (
            <span key={item}>
              <CheckCircle2 /> {item}
            </span>
          ))}
        </div>
      </section>

      <section className="projects-ref__wrap projects-ref__process">
        <header>
          <p>Our project process</p>
        </header>
        <div>
          {process.map((item) => (
            <article key={item.step}>
              <ClipboardList />
              <strong>{item.step}</strong>
              <span>{item.description}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="projects-ref__wrap projects-ref__cta">
        <div>
          <h2>{cta.heading}</h2>
          <p>{cta.description}</p>
        </div>
        <button
          onClick={() =>
            openPopup({
              title: 'Book Free Career Counselling',
              subtitle: 'Let us help you choose the right course and project path.',
              interest: 'Free Career Counselling',
              source: 'projects-final',
              ctaLabel: 'Book My Free Call',
            })
          }
        >
          {cta.buttonLabel}
        </button>
        <Link href="/courses">
          {cta.exploreCoursesLabel} <ArrowRight size={15} />
        </Link>
      </section>

      {activeProject && <CaseStudyModal project={activeProject} onClose={() => setActiveProject(null)} />}
    </div>
  )
}
