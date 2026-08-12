import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth/admin-session'
import { siteSettingsStore } from '@/lib/stores/site-settings-store'
import { liveProjectsStore } from '@/lib/stores/live-projects-store'
import { homepageStore } from '@/lib/stores/homepage-store'
import { aboutPageStore } from '@/lib/stores/about-page-store'
import { coursesListingStore } from '@/lib/stores/courses-listing-store'
import { courseContentStore } from '@/lib/stores/course-content-store'
import { navigationStore } from '@/lib/stores/navigation-store'
import { contactPageStore } from '@/lib/stores/contact-page-store'
import { scholarshipPageStore } from '@/lib/stores/scholarship-page-store'
import { conversionPagesStore } from '@/lib/stores/conversion-pages-store'
import { blogPostsStore } from '@/lib/stores/blog-posts-store'

const registry = {
  siteSettings: siteSettingsStore,
  liveProjects: liveProjectsStore,
  homepage: homepageStore,
  aboutPage: aboutPageStore,
  coursesListing: coursesListingStore,
  courseContent: courseContentStore,
  navigation: navigationStore,
  contactPage: contactPageStore,
  scholarshipPage: scholarshipPageStore,
  conversionPages: conversionPagesStore,
  blogPosts: blogPostsStore,
} as const

type ContentType = keyof typeof registry

const revalidatePathsFor: Record<ContentType, string[]> = {
  siteSettings: ['/'],
  liveProjects: ['/live-projects'],
  homepage: ['/'],
  aboutPage: ['/about'],
  coursesListing: ['/courses'],
  courseContent: [
    '/courses/graphic-design',
    '/courses/uiux-design',
    '/courses/digital-marketing',
    '/courses/video-editing',
    '/courses/motion-graphics',
  ],
  navigation: ['/'],
  contactPage: ['/contact'],
  scholarshipPage: ['/graphic-design-scholarship', '/graphic-design-scholarship/success'],
  conversionPages: ['/admissions', '/career-counselling', '/faq'],
  blogPosts: ['/blog'],
}

const isKnownType = (type: string): type is ContentType => type in registry

export const dynamic = 'force-dynamic'

export async function GET(_req: Request, { params }: { params: Promise<{ type: string }> }) {
  const { type } = await params
  if (!isKnownType(type)) {
    return NextResponse.json({ error: 'Unknown content type' }, { status: 404 })
  }

  const value = await registry[type].get()
  return NextResponse.json({ value })
}

export async function PUT(req: Request, { params }: { params: Promise<{ type: string }> }) {
  const { type } = await params
  if (!isKnownType(type)) {
    return NextResponse.json({ error: 'Unknown content type' }, { status: 404 })
  }

  const session = await verifyAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  if (body === null || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  try {
    const saved = await registry[type].save(body)
    for (const path of revalidatePathsFor[type]) revalidatePath(path)
    return NextResponse.json({ value: saved })
  } catch (error) {
    console.error(`[PUT /api/content/${type}] write failed:`, error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: `Failed to save: ${message}` }, { status: 500 })
  }
}
