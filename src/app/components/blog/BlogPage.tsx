'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CalendarDays, Clock3, Sparkles, Tag } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { defaultBlogPosts, loadBlogPosts, type BlogPost } from '@/app/lib/blogPosts'

function BlogCover({ image, alt }: { image: string; alt: string }) {
  return (
    <div
      aria-label={alt}
      role="img"
      className="h-56 rounded-[1.8rem] border-[3px] border-[#10163a] bg-[#eef3ff] shadow-[5px_5px_0_#10163a]"
      style={{
        backgroundImage: image ? `linear-gradient(180deg,rgba(16,22,58,0.05),rgba(16,22,58,0.15)), url(${image})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  )
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(defaultBlogPosts)

  useEffect(() => {
    setPosts(loadBlogPosts())
  }, [])

  const publishedPosts = useMemo(
    () => posts.filter((post) => post.status === 'published'),
    [posts]
  )

  const [featuredPost, ...otherPosts] = publishedPosts

  if (!publishedPosts.length) {
    return null
  }

  return (
    <section className="site-section-bg section-alt-clean relative overflow-hidden px-4 py-12 text-[#081225] md:px-8 md:py-16">
      <div className="comic-dots pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <span className="retro-pill mb-4 px-4 py-2 text-sm font-black text-[#10163a]">
            <Sparkles size={14} className="text-[#fa8a43]" />
            TSDC Blog
          </span>
          <h1 className="text-4xl font-black tracking-[-0.05em] text-[#081225] md:text-6xl">
            Creative career insights that
            <span className="block text-[#3244b5]">help students move faster.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base font-semibold leading-7 text-[#475467] md:text-lg">
            Explore practical articles on AI tools, design workflows, career direction, and skill-building written for students,
            beginners, and ambitious creators in Chennai.
          </p>
        </div>

        {featuredPost ? (
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 overflow-hidden rounded-[2.5rem] border-[3px] border-[#10163a] bg-white p-6 shadow-[8px_8px_0_#10163a] md:p-8"
          >
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border-[3px] border-[#10163a] bg-[#3244b5] px-3 py-1 text-xs font-black text-white shadow-[3px_3px_0_#10163a]">
                    Featured
                  </span>
                  <span className="rounded-full bg-[#fff4e0] px-3 py-1 text-xs font-black text-[#fa8a43]" style={{ border: '1.5px solid rgba(250,138,67,0.3)' }}>
                    {featuredPost.category}
                  </span>
                </div>

                <h2 className="text-3xl font-black leading-[0.95] tracking-[-0.05em] text-[#10163a] md:text-5xl">
                  {featuredPost.title}
                </h2>
                <p className="mt-4 text-base font-semibold leading-7 text-[#475467]">
                  {featuredPost.excerpt}
                </p>

                <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold text-[#667085]">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eef3ff] px-3 py-1.5" style={{ border: '1.5px solid rgba(50,68,181,0.18)' }}>
                    <CalendarDays size={14} className="text-[#3244b5]" />
                    {featuredPost.publishedAt}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff4e0] px-3 py-1.5" style={{ border: '1.5px solid rgba(250,138,67,0.18)' }}>
                    <Clock3 size={14} className="text-[#fa8a43]" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="mt-6 inline-flex items-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#10163a] px-6 py-3 text-sm font-black text-white shadow-[5px_5px_0_#10163a]"
                >
                  Read article
                  <ArrowRight size={15} />
                </Link>
              </div>

              <BlogCover image={featuredPost.coverImage} alt={featuredPost.coverImageAlt} />
            </div>
          </motion.article>
        ) : null}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {otherPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="overflow-hidden rounded-[2rem] border-[3px] border-[#10163a] bg-white p-5 shadow-[6px_6px_0_#10163a]"
            >
              <BlogCover image={post.coverImage} alt={post.coverImageAlt} />
              <div className="mt-5">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#eef3ff] px-3 py-1 text-[11px] font-black text-[#3244b5]" style={{ border: '1.5px solid rgba(50,68,181,0.18)' }}>
                    {post.category}
                  </span>
                  <span className="text-xs font-bold text-[#667085]">{post.readTime}</span>
                </div>
                <h2 className="text-2xl font-black leading-tight text-[#10163a]">{post.title}</h2>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#475467]">{post.excerpt}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-[#fff8ed] px-3 py-1 text-[11px] font-black text-[#975a16]" style={{ border: '1.5px solid rgba(250,138,67,0.18)' }}>
                      <Tag size={11} />
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#3244b5]"
                >
                  Continue reading
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

