import type { MetadataRoute } from 'next'
import { defaultBlogPosts } from './lib/blogPosts'
import { isMasterclassVisibleOnLiveSite } from './lib/masterclasses'
import { getStoredMasterclasses } from '@/lib/masterclasses-store'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://traijoedu.in'
  const lastModified = new Date()
  const masterclasses = await getStoredMasterclasses()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/graphic-design`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/uiux-design`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/digital-marketing`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/video-editing`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/masterclasses`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-conditions`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund-cancellation-policy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const masterclassRoutes: MetadataRoute.Sitemap = masterclasses
    .filter((masterclass) => isMasterclassVisibleOnLiveSite(masterclass))
    .flatMap((masterclass) => [
      {
        url: `${baseUrl}/masterclasses/${masterclass.slug}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/masterclasses/${masterclass.slug}/register`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.5,
      },
    ])

  const blogRoutes: MetadataRoute.Sitemap = defaultBlogPosts
    .filter((post) => post.status === 'published')
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

  return [...staticRoutes, ...masterclassRoutes, ...blogRoutes]
}
