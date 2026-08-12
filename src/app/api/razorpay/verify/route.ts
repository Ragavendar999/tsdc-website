import crypto from 'crypto'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import type { Masterclass } from '@/app/lib/masterclasses'
import { getFirebaseAdminDb } from '@/lib/firebase/admin'

export const dynamic = 'force-dynamic'

const COLLECTION_NAME = 'site_content'
const DOCUMENT_ID = 'masterclasses'

export async function POST(req: Request) {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET
    if (!keySecret) {
      return NextResponse.json({ error: 'Razorpay key secret is not configured.' }, { status: 500 })
    }

    const body = await req.json().catch(() => ({}))
    const orderId = String(body.orderId || '')
    const paymentId = String(body.paymentId || '')
    const signature = String(body.signature || '')
    const masterclassId = String(body.masterclassId || '')

    if (!orderId || !paymentId || !signature || !masterclassId) {
      return NextResponse.json({ error: 'Missing payment verification fields.' }, { status: 400 })
    }

    const expectedSignature = crypto.createHmac('sha256', keySecret).update(`${orderId}|${paymentId}`).digest('hex')

    if (expectedSignature !== signature) {
      console.error('[razorpay/verify] signature mismatch', { orderId, paymentId, masterclassId })
      return NextResponse.json({ verified: false, error: 'Payment signature verification failed.' }, { status: 400 })
    }

    const db = getFirebaseAdminDb()
    const docRef = db.collection(COLLECTION_NAME).doc(DOCUMENT_ID)

    // Transaction avoids a lost-update race if two payments confirm at the same instant —
    // this store keeps every masterclass as one array inside a single document.
    const updatedMasterclass = await db.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(docRef)
      const items = (snapshot.data()?.items as Masterclass[] | undefined) || []
      const index = items.findIndex((item) => item.id === masterclassId)

      if (index === -1) {
        throw new Error('MASTERCLASS_NOT_FOUND')
      }

      const current = items[index]
      if (current.seatsTaken >= current.seatsTotal) {
        throw new Error('SOLD_OUT')
      }

      const updated: Masterclass = { ...current, seatsTaken: current.seatsTaken + 1 }
      const nextItems = [...items]
      nextItems[index] = updated

      transaction.set(docRef, { items: nextItems, updatedAt: new Date().toISOString() }, { merge: true })
      return updated
    })

    revalidatePath('/')
    revalidatePath('/masterclasses')
    revalidatePath(`/masterclasses/${updatedMasterclass.slug}`)
    revalidatePath(`/masterclasses/${updatedMasterclass.slug}/register`)
    revalidatePath(`/masterclasses/${updatedMasterclass.slug}/success`)

    return NextResponse.json({
      verified: true,
      seatsTaken: updatedMasterclass.seatsTaken,
      seatsTotal: updatedMasterclass.seatsTotal,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'

    if (message === 'SOLD_OUT') {
      return NextResponse.json({ verified: true, error: 'This masterclass is sold out.' }, { status: 409 })
    }
    if (message === 'MASTERCLASS_NOT_FOUND') {
      return NextResponse.json({ verified: true, error: 'Masterclass not found.' }, { status: 404 })
    }

    console.error('[razorpay/verify]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
