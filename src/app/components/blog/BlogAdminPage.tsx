'use client'

import { ExternalLink, Eye, Plus, Save, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import {
  defaultBlogPosts,
  deleteBlogPost,
  loadBlogPosts,
  persistBlogPosts,
  type BlogPost,
  type BlogSection,
} from '@/app/lib/blogPosts'

const inputCls =
  'w-full rounded-[0.95rem] border-[2.5px] border-[#10163a] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#10163a] outline-none transition focus:border-[#3244b5]'
const textareaCls = `${inputCls} resize-none`

const createSection = (): BlogSection => ({
  id: `section-${Date.now()}`,
  eyebrow: '',
  heading: 'New section',
  paragraphs: ['Add your paragraph here.'],
  bullets: [],
  image: '',
  imageAlt: '',
})

const createPost = (): BlogPost => ({
  ...defaultBlogPosts[0],
  id: `blog-${Date.now()}`,
  slug: `new-blog-post-${Date.now()}`,
  status: 'draft',
  featured: false,
  title: 'New blog post',
  subtitle: 'Add a strong subtitle for this article.',
  excerpt: 'Write a short summary that works on the blog listing page.',
  category: 'Blog',
  publishedAt: new Date().toISOString().slice(0, 10),
  readTime: '6 min read',
  coverImage: '/og-banner.png',
  coverImageAlt: 'Blog cover image',
  tags: ['blog'],
  seoTitle: 'New blog post | TSDC Blog',
  seoDescription: 'Add an SEO description for this article.',
  intro: ['Add the opening paragraph for this article.'],
  sections: [createSection()],
  ctaTitle: 'Guide readers toward the next step',
  ctaText: 'Use this CTA area to push visitors toward a course page or counselling action.',
  ctaLabel: 'Explore Courses',
  ctaHref: '/courses',
})

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>(defaultBlogPosts)
  const [activeId, setActiveId] = useState(defaultBlogPosts[0]?.id ?? '')

  useEffect(() => {
    const initial = loadBlogPosts()
    setPosts(initial)
    setActiveId(initial[0]?.id ?? '')
  }, [])

  const activePost = useMemo(
    () => posts.find((post) => post.id === activeId) ?? posts[0],
    [activeId, posts]
  )

  const savePosts = (nextPosts: BlogPost[]) => {
    setPosts(nextPosts)
    persistBlogPosts(nextPosts)
  }

  const updateActivePost = (patch: Partial<BlogPost>) => {
    if (!activePost) return
    savePosts(posts.map((post) => (post.id === activePost.id ? { ...post, ...patch } : post)))
  }

  const updateSection = (sectionId: string, patch: Partial<BlogSection>) => {
    if (!activePost) return
    updateActivePost({
      sections: activePost.sections.map((section) =>
        section.id === sectionId ? { ...section, ...patch } : section
      ),
    })
  }

  const handleDelete = () => {
    if (!activePost) return
    if (!confirm(`Delete "${activePost.title}" from the blog? This removes it from the site on this browser.`)) return

    const nextPosts = deleteBlogPost(activePost, posts)
    const refreshed = loadBlogPosts()
    setPosts(refreshed.length ? refreshed : nextPosts)
    setActiveId((refreshed.length ? refreshed : nextPosts)[0]?.id ?? '')
  }

  if (!activePost) return null

  return (
    <div className="grid gap-6 lg:grid-cols-[0.3fr_0.7fr]">
      <aside className="space-y-3">
        <div className="flex items-center justify-between gap-3 px-1">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#667085]">Blog posts</p>
          <button
            onClick={() => {
              const nextPost = createPost()
              savePosts([nextPost, ...posts])
              setActiveId(nextPost.id)
            }}
            className="inline-flex items-center gap-2 rounded-[0.9rem] border-[3px] border-[#10163a] bg-[#ff9736] px-3 py-2 text-xs font-black text-white shadow-[3px_3px_0_#10163a]"
          >
            <Plus size={13} />
            New
          </button>
        </div>

        {posts.map((post) => (
          <div
            key={post.id}
            className={`overflow-hidden rounded-[1.5rem] border-[3px] transition-all ${
              post.id === activePost.id
                ? 'border-[#3244b5] bg-[#eef1ff] shadow-[5px_5px_0_#3244b5]'
                : 'border-[#10163a] bg-white shadow-[4px_4px_0_#10163a]'
            }`}
          >
            <button className="w-full p-4 text-left" onClick={() => setActiveId(post.id)}>
              <div className="flex items-start justify-between gap-2">
                <p className="font-black leading-snug text-[#10163a]">{post.title}</p>
                <span
                  className={`shrink-0 rounded-full border-2 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.12em] ${
                    post.status === 'published'
                      ? 'border-[#16a34a] bg-[#dcfce7] text-[#16a34a]'
                      : 'border-[#9ca3af] bg-[#f3f4f6] text-[#6b7280]'
                  }`}
                >
                  {post.status}
                </span>
              </div>
              <p className="mt-1 text-xs font-bold text-[#667085]">{post.category}</p>
              <div className="mt-2 flex items-center gap-2 text-[10px] font-bold text-[#98a2b3]">
                <span>/{post.slug}</span>
                <span>|</span>
                <span>{post.readTime}</span>
              </div>
            </button>
            <div className="flex gap-1.5 border-t-[3px] border-dashed border-[#10163a]/15 px-4 py-2.5">
              <Link
                href={`/blog/${post.slug}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#10163a]/20 px-3 py-1 text-[10px] font-black text-[#3244b5] transition hover:bg-[#eef1ff]"
              >
                <Eye size={11} />
                Preview
                <ExternalLink size={9} />
              </Link>
            </div>
          </div>
        ))}
      </aside>

      <section className="rounded-[2rem] border-[3px] border-[#10163a] bg-white shadow-[8px_8px_0_#10163a]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-[3px] border-[#10163a] p-5 md:p-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#667085]">Editing blog</p>
            <h2 className="text-xl font-black text-[#10163a]">{activePost.title}</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => updateActivePost({ status: activePost.status === 'published' ? 'draft' : 'published' })}
              className={`rounded-[1rem] border-[3px] border-[#10163a] px-4 py-2 text-sm font-black text-white shadow-[4px_4px_0_#10163a] ${
                activePost.status === 'published' ? 'bg-[#667085]' : 'bg-[#16a34a]'
              }`}
            >
              {activePost.status === 'published' ? 'Unpublish' : 'Publish'}
            </button>
            <button
              onClick={() => {
                const copy = {
                  ...activePost,
                  id: `blog-${Date.now()}`,
                  slug: `${activePost.slug}-copy`,
                  title: `${activePost.title} Copy`,
                  featured: false,
                  status: 'draft' as const,
                }
                savePosts([copy, ...posts])
                setActiveId(copy.id)
              }}
              className="rounded-[1rem] border-[3px] border-[#10163a] bg-[#3244b5] px-4 py-2 text-sm font-black text-white shadow-[4px_4px_0_#10163a]"
            >
              Duplicate
            </button>
            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-1.5 rounded-[1rem] border-[3px] border-[#10163a] bg-[#ea6865] px-4 py-2 text-sm font-black text-white shadow-[4px_4px_0_#10163a]"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>

        <div className="space-y-6 p-5 md:p-6">
          <fieldset className="rounded-[1.6rem] border-[3px] border-[#10163a] p-5 shadow-[4px_4px_0_#10163a]">
            <legend className="px-2 text-xs font-black uppercase tracking-[0.18em] text-[#3244b5]">Post settings</legend>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <label className="block">
                <p className="mb-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#667085]">Title</p>
                <input className={inputCls} value={activePost.title} onChange={(e) => updateActivePost({ title: e.target.value })} />
              </label>
              <label className="block">
                <p className="mb-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#667085]">Slug</p>
                <input className={inputCls} value={activePost.slug} onChange={(e) => updateActivePost({ slug: e.target.value })} />
              </label>
              <label className="block md:col-span-2">
                <p className="mb-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#667085]">Subtitle</p>
                <input className={inputCls} value={activePost.subtitle} onChange={(e) => updateActivePost({ subtitle: e.target.value })} />
              </label>
              <label className="block md:col-span-2">
                <p className="mb-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#667085]">Excerpt</p>
                <textarea rows={3} className={textareaCls} value={activePost.excerpt} onChange={(e) => updateActivePost({ excerpt: e.target.value })} />
              </label>
              <label className="block">
                <p className="mb-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#667085]">Category</p>
                <input className={inputCls} value={activePost.category} onChange={(e) => updateActivePost({ category: e.target.value })} />
              </label>
              <label className="block">
                <p className="mb-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#667085]">Author</p>
                <input className={inputCls} value={activePost.author} onChange={(e) => updateActivePost({ author: e.target.value })} />
              </label>
              <label className="block">
                <p className="mb-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#667085]">Published date</p>
                <input type="date" className={inputCls} value={activePost.publishedAt} onChange={(e) => updateActivePost({ publishedAt: e.target.value })} />
              </label>
              <label className="block">
                <p className="mb-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#667085]">Read time</p>
                <input className={inputCls} value={activePost.readTime} onChange={(e) => updateActivePost({ readTime: e.target.value })} />
              </label>
              <label className="block">
                <p className="mb-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#667085]">Cover image URL</p>
                <input className={inputCls} value={activePost.coverImage} onChange={(e) => updateActivePost({ coverImage: e.target.value })} />
              </label>
              <label className="block">
                <p className="mb-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#667085]">Cover image alt</p>
                <input className={inputCls} value={activePost.coverImageAlt} onChange={(e) => updateActivePost({ coverImageAlt: e.target.value })} />
              </label>
              <label className="block">
                <p className="mb-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#667085]">SEO title</p>
                <input className={inputCls} value={activePost.seoTitle} onChange={(e) => updateActivePost({ seoTitle: e.target.value })} />
              </label>
              <label className="block">
                <p className="mb-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#667085]">Featured post</p>
                <button
                  type="button"
                  onClick={() => {
                    const nextPosts = posts.map((post) =>
                      post.id === activePost.id
                        ? { ...post, featured: !activePost.featured }
                        : { ...post, featured: !activePost.featured ? false : post.featured }
                    )
                    savePosts(nextPosts)
                  }}
                  className={`w-full rounded-[0.95rem] border-[2.5px] border-[#10163a] px-3.5 py-2.5 text-sm font-black ${
                    activePost.featured ? 'bg-[#16a34a] text-white' : 'bg-white text-[#10163a]'
                  }`}
                >
                  {activePost.featured ? 'Featured' : 'Mark as featured'}
                </button>
              </label>
              <label className="block md:col-span-2">
                <p className="mb-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#667085]">SEO description</p>
                <textarea rows={3} className={textareaCls} value={activePost.seoDescription} onChange={(e) => updateActivePost({ seoDescription: e.target.value })} />
              </label>
              <label className="block md:col-span-2">
                <p className="mb-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#667085]">Tags (one per line)</p>
                <textarea rows={4} className={textareaCls} value={activePost.tags.join('\n')} onChange={(e) => updateActivePost({ tags: e.target.value.split('\n').map((item) => item.trim()).filter(Boolean) })} />
              </label>
              <label className="block md:col-span-2">
                <p className="mb-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#667085]">Intro paragraphs (one paragraph per blank line)</p>
                <textarea rows={6} className={textareaCls} value={activePost.intro.join('\n\n')} onChange={(e) => updateActivePost({ intro: e.target.value.split(/\n\s*\n/).map((item) => item.trim()).filter(Boolean) })} />
              </label>
            </div>
          </fieldset>

          <fieldset className="rounded-[1.6rem] border-[3px] border-[#10163a] p-5 shadow-[4px_4px_0_#10163a]">
            <legend className="px-2 text-xs font-black uppercase tracking-[0.18em] text-[#3244b5]">Content sections</legend>
            <div className="mt-3 space-y-4">
              {activePost.sections.map((section, index) => (
                <div key={section.id} className="rounded-[1.3rem] border-[2.5px] border-[#10163a] bg-[#fffdf7] p-4 shadow-[3px_3px_0_#10163a]">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-sm font-black text-[#10163a]">Section {index + 1}</p>
                    <button
                      type="button"
                      onClick={() =>
                        updateActivePost({
                          sections: activePost.sections.filter((item) => item.id !== section.id),
                        })
                      }
                      className="rounded-[0.8rem] border-[2.5px] border-[#10163a] bg-[#ea6865] px-3 py-1.5 text-xs font-black text-white"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block">
                      <p className="mb-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#667085]">Eyebrow</p>
                      <input className={inputCls} value={section.eyebrow || ''} onChange={(e) => updateSection(section.id, { eyebrow: e.target.value })} />
                    </label>
                    <label className="block">
                      <p className="mb-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#667085]">Heading</p>
                      <input className={inputCls} value={section.heading} onChange={(e) => updateSection(section.id, { heading: e.target.value })} />
                    </label>
                    <label className="block md:col-span-2">
                      <p className="mb-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#667085]">Paragraphs (one paragraph per blank line)</p>
                      <textarea rows={6} className={textareaCls} value={section.paragraphs.join('\n\n')} onChange={(e) => updateSection(section.id, { paragraphs: e.target.value.split(/\n\s*\n/).map((item) => item.trim()).filter(Boolean) })} />
                    </label>
                    <label className="block md:col-span-2">
                      <p className="mb-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#667085]">Bullets (one per line)</p>
                      <textarea rows={4} className={textareaCls} value={(section.bullets || []).join('\n')} onChange={(e) => updateSection(section.id, { bullets: e.target.value.split('\n').map((item) => item.trim()).filter(Boolean) })} />
                    </label>
                    <label className="block">
                      <p className="mb-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#667085]">Section image URL</p>
                      <input className={inputCls} value={section.image || ''} onChange={(e) => updateSection(section.id, { image: e.target.value })} />
                    </label>
                    <label className="block">
                      <p className="mb-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#667085]">Section image alt</p>
                      <input className={inputCls} value={section.imageAlt || ''} onChange={(e) => updateSection(section.id, { imageAlt: e.target.value })} />
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => updateActivePost({ sections: [...activePost.sections, createSection()] })}
                className="inline-flex items-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#ff9736] px-4 py-2 text-sm font-black text-white shadow-[4px_4px_0_#10163a]"
              >
                <Plus size={14} />
                Add section
              </button>
            </div>
          </fieldset>

          <fieldset className="rounded-[1.6rem] border-[3px] border-[#10163a] p-5 shadow-[4px_4px_0_#10163a]">
            <legend className="px-2 text-xs font-black uppercase tracking-[0.18em] text-[#3244b5]">Article CTA</legend>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <label className="block">
                <p className="mb-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#667085]">CTA title</p>
                <input className={inputCls} value={activePost.ctaTitle} onChange={(e) => updateActivePost({ ctaTitle: e.target.value })} />
              </label>
              <label className="block">
                <p className="mb-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#667085]">CTA button label</p>
                <input className={inputCls} value={activePost.ctaLabel} onChange={(e) => updateActivePost({ ctaLabel: e.target.value })} />
              </label>
              <label className="block">
                <p className="mb-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#667085]">CTA link</p>
                <input className={inputCls} value={activePost.ctaHref} onChange={(e) => updateActivePost({ ctaHref: e.target.value })} />
              </label>
              <label className="block md:col-span-2">
                <p className="mb-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#667085]">CTA text</p>
                <textarea rows={3} className={textareaCls} value={activePost.ctaText} onChange={(e) => updateActivePost({ ctaText: e.target.value })} />
              </label>
            </div>
          </fieldset>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => savePosts([...posts])}
              className="inline-flex items-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#16a34a] px-5 py-3 text-sm font-black text-white shadow-[4px_4px_0_#10163a]"
            >
              <Save size={15} />
              Save changes
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

