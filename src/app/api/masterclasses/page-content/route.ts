import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth/admin-session'
import { getMasterclassPageContent, saveMasterclassPageContent } from '@/lib/masterclasses-store'
import type { MasterclassPageContent } from '@/app/lib/masterclasses'

export const dynamic = 'force-dynamic'

const isPageContent = (value: unknown): value is MasterclassPageContent =>
  typeof value === 'object' &&
  value !== null &&
  Array.isArray((value as MasterclassPageContent).heroStats) &&
  Array.isArray((value as MasterclassPageContent).whyAttend) &&
  Array.isArray((value as MasterclassPageContent).testimonials)

export async function GET() {
  try {
    const content = await getMasterclassPageContent()
    return NextResponse.json({ content })
  } catch (error) {
    console.error('[GET /api/masterclasses/page-content] Firebase read failed:', error)
    return NextResponse.json({ error: 'Failed to load masterclasses page content' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  const session = await verifyAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const content = isPageContent(body?.content) ? body.content : null

  if (!content) {
    return NextResponse.json({ error: 'Invalid page content payload' }, { status: 400 })
  }

  try {
    const saved = await saveMasterclassPageContent(content)
    revalidatePath('/masterclasses')
    return NextResponse.json({ content: saved })
  } catch (error) {
    console.error('[PUT /api/masterclasses/page-content] Firebase write failed:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: `Failed to save masterclasses page content: ${message}` }, { status: 500 })
  }
}
