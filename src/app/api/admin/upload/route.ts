import { randomUUID } from 'crypto'
import { NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth/admin-session'
import { getFirebaseAdminStorage } from '@/lib/firebase/admin'

const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
const MAX_SIZE_BYTES = 8 * 1024 * 1024

export async function POST(req: Request) {
  const session = await verifyAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await req.formData().catch(() => null)
  const file = formData?.get('file')
  const folder = typeof formData?.get('folder') === 'string' ? (formData.get('folder') as string) : 'uploads'

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: 'Only JPEG, PNG, WebP, or GIF images are allowed' }, { status: 400 })
  }
  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: 'Image must be smaller than 8MB' }, { status: 400 })
  }

  const safeFolder = folder.replace(/[^a-zA-Z0-9/_-]/g, '').replace(/^\/+/, '') || 'uploads'
  const extension = file.name.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg'
  const objectPath = `${safeFolder}/${randomUUID()}.${extension}`

  try {
    const buffer = Buffer.from(await file.arrayBuffer())
    const bucket = getFirebaseAdminStorage()
    const blob = bucket.file(objectPath)
    await blob.save(buffer, { contentType: file.type, public: true })
    await blob.makePublic()

    const url = `https://storage.googleapis.com/${bucket.name}/${objectPath}`
    return NextResponse.json({ url })
  } catch (error) {
    console.error('[POST /api/admin/upload] failed:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: `Upload failed: ${message}` }, { status: 500 })
  }
}
