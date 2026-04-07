import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET

    if (!keyId) {
      return NextResponse.json(
        { error: 'Razorpay public key ID is missing. Add NEXT_PUBLIC_RAZORPAY_KEY_ID in Vercel environment variables.' },
        { status: 500 }
      )
    }

    if (!keySecret) {
      return NextResponse.json(
        { error: 'Razorpay key secret is missing. Add RAZORPAY_KEY_SECRET in Vercel environment variables. Do not commit the secret to GitHub.' },
        { status: 500 }
      )
    }

    const body = await req.json()
    const amount = Number(body.amount)
    const masterclassTitle = String(body.masterclassTitle || 'TSDC Masterclass')
    const studentName = String(body.studentName || 'Student')

    if (!Number.isFinite(amount) || amount < 1) {
      return NextResponse.json({ error: 'Invalid payment amount.' }, { status: 400 })
    }

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100),
        currency: 'INR',
        receipt: `tsdc_${Date.now()}`,
        notes: {
          masterclass: masterclassTitle,
          student: studentName,
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error?.description || 'Unable to create Razorpay order.' },
        { status: response.status }
      )
    }

    return NextResponse.json({
      keyId,
      orderId: data.id,
      amount: data.amount,
      currency: data.currency,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown Razorpay error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
