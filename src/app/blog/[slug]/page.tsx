import type { Metadata } from 'next'
import BlogArticlePage from '@/app/components/blog/BlogArticlePage'
import { blogPostsStore } from '@/lib/stores/blog-posts-store'
import { articleSchema, breadcrumbSchema, jsonLd } from '@/app/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const posts = await blogPostsStore.get()
  const post = posts.find((item) => item.slug === slug)

  if (!post) {
    return {
      title: 'TSDC Blog',
      description: 'Creative career insights, AI design tool guides, and learning resources from TSDC.',
    }
  }

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    alternates: {
      canonical: `/blog/${post.slug}/`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://traijoedu.in/blog/${post.slug}/`,
      images: [{ url: post.coverImage || '/og-banner.png', width: 1200, height: 630, alt: post.coverImageAlt || post.title }],
    },
  }
}

export async function generateStaticParams() {
  const posts = await blogPostsStore.get()
  return posts.filter((post) => post.status === 'published').map((post) => ({ slug: post.slug }))
}

export const dynamicParams = true
export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const posts = await blogPostsStore.get()
  const post = posts.find((item) => item.slug === slug) ?? null

  const schemas = post
    ? [
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ]),
        articleSchema({
          headline: post.title,
          description: post.excerpt,
          path: `/blog/${post.slug}`,
          image: post.coverImage,
          datePublished: post.publishedAt,
          author: post.author,
        }),
      ]
    : []

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`blog-article-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
        />
      ))}
      <BlogArticlePage post={post} />
    </>
  )
}
