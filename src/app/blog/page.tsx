import type { Metadata } from 'next'
import BlogPage from '@/app/components/blog/BlogPage'
import { defaultBlogPosts } from '@/app/lib/blogPosts'
import { breadcrumbSchema, itemListSchema, jsonLd } from '@/app/lib/seo'

export const metadata: Metadata = {
  title: 'TSDC Blog | Creative Careers, AI Design Tools, and Student Guides',
  description:
    'Read TSDC blog articles on graphic design, AI tools, creative careers, portfolio building, and practical advice for students and beginners in Chennai.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'TSDC Blog | Creative Careers and AI Design Learning',
    description:
      'Explore TSDC blog insights on design tools, creative skills, student growth, and portfolio-ready learning.',
    url: 'https://traijoedu.in/blog',
    images: [{ url: '/og-banner.png', width: 1200, height: 630, alt: 'TSDC Blog' }],
  },
}

export default function Page() {
  const schemas = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
    ]),
    itemListSchema({
      name: 'TSDC Blog Posts',
      items: defaultBlogPosts
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
      <BlogPage />
    </>
  )
}

