'use client'

import { CalendarDays, Clock3, Tag } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useContactPopup } from '@/app/components/common/ContactPopupProvider'
import { defaultBlogPosts, loadBlogPosts, type BlogPost } from '@/app/lib/blogPosts'

function BlogHeroImage({ image, alt }: { image: string; alt: string }) {
  return (
    <div
      role="img"
      aria-label={alt}
      className="h-[320px] rounded-[2.2rem] border-[3px] border-[#10163a] bg-[#eef3ff] shadow-[8px_8px_0_#10163a] md:h-[420px]"
      style={{
        backgroundImage: image ? `linear-gradient(180deg,rgba(16,22,58,0.08),rgba(16,22,58,0.22)), url(${image})` : undefined,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    />
  )
}

export default function BlogArticlePage({ slug }: { slug: string }) {
  const [posts, setPosts] = useState<BlogPost[]>(defaultBlogPosts)
  const { openPopup } = useContactPopup()

  useEffect(() => {
    setPosts(loadBlogPosts())
  }, [])

  const post = useMemo(
    () => posts.find((item) => item.slug === slug),
    [posts, slug]
  )

  if (!post) {
    return (
      <section className="site-section-bg section-alt-clean px-4 py-24 text-[#081225] md:px-8">
        <div className="mx-auto max-w-3xl rounded-[2rem] border-[3px] border-[#10163a] bg-white p-8 text-center shadow-[8px_8px_0_#10163a]">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#667085]">Blog</p>
          <h1 className="mt-4 text-3xl font-black text-[#10163a]">This article is unavailable.</h1>
          <p className="mt-3 text-base font-semibold leading-7 text-[#475467]">
            The post may have been moved, unpublished, or removed from this browser's saved content.
          </p>
          <Link
            href="/blog"
            className="mt-6 inline-flex items-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#3244b5] px-6 py-3 text-sm font-black text-white shadow-[5px_5px_0_#10163a]"
          >
            Back to blog
          </Link>
        </div>
      </section>
    )
  }

  return (
    <article className="site-section-bg section-alt-clean relative overflow-hidden px-4 py-10 text-[#081225] md:px-8 md:py-14">
      <div className="comic-dots pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative z-10 mx-auto max-w-5xl">
        <Link href="/blog" className="mb-5 inline-flex text-sm font-black text-[#3244b5]">
          ← Back to blog
        </Link>

        <div className="mb-8 rounded-[2.4rem] border-[3px] border-[#10163a] bg-white p-6 shadow-[8px_8px_0_#10163a] md:p-8">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full border-[3px] border-[#10163a] bg-[#10163a] px-3 py-1 text-xs font-black text-white shadow-[3px_3px_0_#10163a]">
              {post.category}
            </span>
            {post.status === 'draft' ? (
              <span className="rounded-full border-[3px] border-[#10163a] bg-[#f3f4f6] px-3 py-1 text-xs font-black uppercase text-[#6b7280] shadow-[3px_3px_0_#10163a]">
                Draft preview
              </span>
            ) : null}
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-[#eef3ff] px-3 py-1 text-[11px] font-black text-[#3244b5]" style={{ border: '1.5px solid rgba(50,68,181,0.18)' }}>
                <Tag size={11} />
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl font-black leading-[0.95] tracking-[-0.05em] text-[#10163a] md:text-6xl">
            {post.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-[#475467] md:text-lg">
            {post.subtitle}
          </p>

          <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold text-[#667085]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff4e0] px-3 py-1.5" style={{ border: '1.5px solid rgba(250,138,67,0.18)' }}>
              <CalendarDays size={14} className="text-[#fa8a43]" />
              {post.publishedAt}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eef3ff] px-3 py-1.5" style={{ border: '1.5px solid rgba(50,68,181,0.18)' }}>
              <Clock3 size={14} className="text-[#3244b5]" />
              {post.readTime}
            </span>
            <span className="inline-flex items-center rounded-full bg-[#fffdf7] px-3 py-1.5 text-sm font-black text-[#10163a]" style={{ border: '1.5px solid rgba(16,22,58,0.12)' }}>
              By {post.author}
            </span>
          </div>
        </div>

        <BlogHeroImage image={post.coverImage} alt={post.coverImageAlt} />

        <div className="mt-8 rounded-[2.4rem] border-[3px] border-[#10163a] bg-white p-6 shadow-[8px_8px_0_#10163a] md:p-8">
          {post.intro.map((paragraph) => (
            <p key={paragraph} className="mb-5 text-base font-semibold leading-8 text-[#344054] last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8 space-y-6">
          {post.sections.map((section, index) => (
            <section
              key={section.id}
              className="rounded-[2.2rem] border-[3px] border-[#10163a] bg-white p-6 shadow-[7px_7px_0_#10163a] md:p-8"
            >
              <div className={`grid gap-6 ${section.image ? 'lg:grid-cols-[1.05fr_0.95fr]' : ''}`}>
                <div>
                  {section.eyebrow ? (
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-[#fa8a43]">{section.eyebrow}</p>
                  ) : null}
                  <h2 className="mt-2 text-3xl font-black leading-tight text-[#10163a] md:text-4xl">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-base font-semibold leading-8 text-[#475467]">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {section.bullets?.length ? (
                    <ul className="mt-5 space-y-3">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="rounded-[1.1rem] bg-[#f8faff] px-4 py-3 text-sm font-bold leading-7 text-[#1f2a44]"
                          style={{ border: '1.5px solid rgba(50,68,181,0.12)' }}
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                {section.image ? (
                  <div
                    role="img"
                    aria-label={section.imageAlt || section.heading}
                    className={`rounded-[1.9rem] border-[3px] border-[#10163a] bg-[#eef3ff] shadow-[6px_6px_0_#10163a] ${
                      index % 2 === 0 ? 'min-h-[280px]' : 'min-h-[320px]'
                    }`}
                    style={{
                      backgroundImage: `linear-gradient(180deg,rgba(16,22,58,0.06),rgba(16,22,58,0.2)), url(${section.image})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                    }}
                  />
                ) : null}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8 rounded-[2.4rem] border-[3px] border-[#10163a] bg-[#10163a] p-6 text-white shadow-[8px_8px_0_#3244b5] md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ffcb53]">Next step</p>
          <h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">{post.ctaTitle}</h2>
          <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-white/80">
            {post.ctaText}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={post.ctaHref}
              className="inline-flex items-center justify-center rounded-[1rem] border-[3px] border-[#10163a] bg-[#ff9736] px-6 py-3 text-sm font-black text-white shadow-[5px_5px_0_#0a0f28]"
            >
              {post.ctaLabel}
            </Link>
            <button
              type="button"
              onClick={() =>
                openPopup({
                  title: 'Talk to TSDC Admissions',
                  subtitle: 'Share your details and our team will guide you to the right course, batch, and next step.',
                  interest: 'Blog Enquiry',
                  source: `blog-${post.slug}-cta`,
                  ctaLabel: 'Get Guidance',
                })
              }
              className="inline-flex items-center justify-center rounded-[1rem] border-[3px] border-white/25 bg-white/10 px-6 py-3 text-sm font-black text-white"
            >
              Ask for guidance
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
