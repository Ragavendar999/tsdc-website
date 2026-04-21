import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth/admin-session'
import { getStoredMasterclasses, saveStoredMasterclasses } from '@/lib/masterclasses-store'
import type { Masterclass } from '@/app/lib/masterclasses'

const isMasterclass = (value: unknown): value is Masterclass =>
  typeof value === 'object' && value !== null && 'id' in value && 'slug' in value && 'status' in value && 'title' in value

export async function GET() {
  const masterclasses = await getStoredMasterclasses()
  return NextResponse.json({ masterclasses })
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

  // Bust the Next.js page cache so changes show immediately on the live site
  revalidatePath('/masterclasses', 'layout')

  return NextResponse.json({ masterclasses: saved })
}
