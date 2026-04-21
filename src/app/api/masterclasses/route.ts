import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth/admin-session'
import { getStoredMasterclasses, saveStoredMasterclasses } from '@/lib/masterclasses-store'
import type { Masterclass } from '@/app/lib/masterclasses'

// Always read fresh from Firebase — never serve a cached GET response
export const dynamic = 'force-dynamic'

const isMasterclass = (value: unknown): value is Masterclass =>
  typeof value === 'object' && value !== null && 'id' in value && 'slug' in value && 'status' in value && 'title' in value

export async function GET() {
  try {
    const masterclasses = await getStoredMasterclasses()
    return NextResponse.json({ masterclasses })
  } catch (error) {
    console.error('[GET /api/masterclasses] Firebase read failed:', error)
    return NextResponse.json({ error: 'Failed to load masterclasses from database' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  const session = await verifyAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const masterclasses = Array.isArray(body?.masterclasses) ? body.masterclasses.filter(isMasterclass) : null

  if (!masterclasses) {
    return NextResponse.json({ error: 'Invalid masterclass payload' }, { status: 400 })
  }

  const saved = await saveStoredMasterclasses(masterclasses)

  // Bust relevant Next.js caches so admin changes show up immediately across
  // listing, detail, register/success pages, and homepage entry points.
  revalidatePath('/')
  revalidatePath('/masterclasses')
  revalidatePath('/sitemap.xml')

  saved.forEach((masterclass) => {
    revalidatePath(`/masterclasses/${masterclass.slug}`)
    revalidatePath(`/masterclasses/${masterclass.slug}/register`)
    revalidatePath(`/masterclasses/${masterclass.slug}/success`)
  })

  return NextResponse.json({ masterclasses: saved })
}
