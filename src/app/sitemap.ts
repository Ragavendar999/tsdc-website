import type { MetadataRoute } from 'next'
import { defaultBlogPosts } from './lib/blogPosts'
import { normalizePath, siteUrl } from './lib/seo'
import { isMasterclassVisibleOnLiveSite } from './lib/masterclasses'
import { getStoredMasterclasses } from '@/lib/masterclasses-store'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()
  const masterclasses = await getStoredMasterclasses()
  const withSiteUrl = (path: string) => `${siteUrl}${normalizePath(path)}`

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: withSiteUrl('/'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: withSiteUrl('/courses'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: withSiteUrl('/courses/graphic-design'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: withSiteUrl('/courses/uiux-design'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: withSiteUrl('/courses/digital-marketing'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: withSiteUrl('/courses/video-editing'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: withSiteUrl('/about'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: withSiteUrl('/contact'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: withSiteUrl('/masterclasses'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: withSiteUrl('/blog'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: withSiteUrl('/graphic-design-scholarship'),
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: withSiteUrl('/privacy-policy'),
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: withSiteUrl('/terms-conditions'),
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: withSiteUrl('/refund-cancellation-policy'),
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const masterclassRoutes: MetadataRoute.Sitemap = masterclasses
    .filter((masterclass) => isMasterclassVisibleOnLiveSite(masterclass))
    .flatMap((masterclass) => [
      {
        url: withSiteUrl(`/masterclasses/${masterclass.slug}`),
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: withSiteUrl(`/masterclasses/${masterclass.slug}/register`),
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.5,
      },
    ])

  const blogRoutes: MetadataRoute.Sitemap = defaultBlogPosts
    .filter((post) => post.status === 'published')
    .map((post) => ({
      url: withSiteUrl(`/blog/${post.slug}`),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

  return [...staticRoutes, ...masterclassRoutes, ...blogRoutes]
}
