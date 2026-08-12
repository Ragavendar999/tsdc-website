import type { Metadata } from 'next'
import BlogPage from '@/app/components/blog/BlogPage'
import { breadcrumbSchema, itemListSchema, jsonLd } from '@/app/lib/seo'
import { blogPostsStore } from '@/lib/stores/blog-posts-store'

export const metadata: Metadata = {
  title: 'TSDC Blog',
  description:
    'Read TSDC blog articles on graphic design, AI tools, creative careers, portfolio building, and practical advice for students and beginners in Chennai.',
  alternates: {
    canonical: '/blog/',
  },
  openGraph: {
    title: 'TSDC Blog',
    description:
      'Explore TSDC blog insights on design tools, creative skills, student growth, and portfolio-ready learning.',
    url: 'https://traijoedu.in/blog/',
    images: [{ url: '/og-banner.png', width: 1200, height: 630, alt: 'TSDC Blog' }],
  },
}

export const dynamic = 'force-dynamic'

export default async function Page() {
  const posts = await blogPostsStore.get()
  const schemas = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
    ]),
    itemListSchema({
      name: 'TSDC Blog Posts',
      items: posts
        .filter((post) => post.status === 'published')
        .map((post) => ({ title: post.title, path: `/blog/${post.slug}` })),
    }),
  ]

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`blog-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
        />
      ))}
      <BlogPage posts={posts} />
    </>
  )
}
