import { randomUUID } from 'crypto'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getFirebaseAdminDb } from '@/lib/firebase/admin'

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')

const s = (value: unknown) => escapeHtml(String(value ?? '-').trim() || '-')

type ScholarshipLeadPayload = {
  leadId?: string
  campaignSlug: string
  campaignTitle: string
  amount: number
  student: {
    name: string
    email: string
    phone: string
    city: string
    schoolOrCollege: string
    classLevel: string
    preferredSlot: string
    goals: string
    source: string
  }
  payment: {
    orderId: string
    paymentId: string
  }
}

const buildAdminHtml = (payload: ScholarshipLeadPayload, submittedAt: string) => `
  <div style="font-family:Arial,sans-serif;color:#10163a;line-height:1.6">
    <h2 style="margin:0 0 16px;color:#3244b5">New Graphic Design Scholarship Registration</h2>
    <p><strong>Submitted:</strong> ${s(submittedAt)} IST</p>
    <p><strong>Campaign:</strong> ${s(payload.campaignTitle)}</p>
    <p><strong>Source:</strong> ${s(payload.student.source)}</p>
    <hr style="margin:20px 0;border:none;border-top:1px solid #e5e7eb" />
    <p><strong>Name:</strong> ${s(payload.student.name)}</p>
    <p><strong>Email:</strong> ${s(payload.student.email)}</p>
    <p><strong>Phone:</strong> ${s(payload.student.phone)}</p>
    <p><strong>City:</strong> ${s(payload.student.city)}</p>
    <p><strong>School / College:</strong> ${s(payload.student.schoolOrCollege)}</p>
    <p><strong>Current level:</strong> ${s(payload.student.classLevel)}</p>
    <p><strong>Preferred demo slot:</strong> ${s(payload.student.preferredSlot)}</p>
    <p><strong>Creative goal:</strong> ${s(payload.student.goals)}</p>
    <hr style="margin:20px 0;border:none;border-top:1px solid #e5e7eb" />
    <p><strong>Amount paid:</strong> Rs ${payload.amount}/-</p>
    <p><strong>Razorpay order:</strong> ${s(payload.payment.orderId)}</p>
    <p><strong>Razorpay payment:</strong> ${s(payload.payment.paymentId)}</p>
    <p style="margin-top:20px;color:#9a4a10"><strong>Follow-up:</strong> share demo class details, scholarship exam format, and reporting instructions on WhatsApp and email.</p>
  </div>
`

const buildStudentHtml = (payload: ScholarshipLeadPayload, submittedAt: string) => `
  <div style="font-family:Arial,sans-serif;color:#10163a;line-height:1.7">
    <h2 style="margin:0 0 12px;color:#3244b5">Your scholarship registration is confirmed</h2>
    <p>Hi ${s(payload.student.name)},</p>
    <p>We have received your <strong>Rs ${payload.amount}/-</strong> registration for the <strong>${s(payload.campaignTitle)}</strong>.</p>
    <div style="margin:20px 0;padding:18px;border:1px solid #dbe5ff;border-radius:16px;background:#eef3ff">
      <p style="margin:0 0 8px"><strong>Preferred demo class slot:</strong> ${s(payload.student.preferredSlot)}</p>
      <p style="margin:0"><strong>Submitted:</strong> ${s(submittedAt)} IST</p>
    </div>
    <p>Our team will send you the following next:</p>
    <ul>
      <li>demo class confirmation</li>
      <li>scholarship examination instructions</li>
      <li>WhatsApp support follow-up</li>
      <li>result and admission guidance</li>
    </ul>
    <p>If you need urgent help, WhatsApp us at <strong>+91 73581 16929</strong>.</p>
    <p>Regards,<br /><strong>TSDC Admissions Team</strong></p>
  </div>
`

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    const recipient = process.env.CONTACT_TO_EMAIL || 'n.ragavendar@gmail.com'
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'TSDC <onboarding@resend.dev>'

    if (!apiKey) {
      return NextResponse.json({ error: 'API key missing' }, { status: 500 })
    }

    const payload = (await req.json()) as ScholarshipLeadPayload

    if (!payload?.student?.name || !payload?.student?.email || !payload?.student?.phone || !payload?.payment?.orderId) {
      return NextResponse.json({ error: 'Missing required scholarship registration details' }, { status: 400 })
    }

    const submittedAt = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    })

    let storedInFirestore = false

    try {
      const db = getFirebaseAdminDb()
      const registrationId = payload.leadId || randomUUID()
      await db.collection('scholarship_registrations').doc(registrationId).set({
        ...payload,
        status: 'paid',
        updatedAt: new Date().toISOString(),
        paidAt: new Date().toISOString(),
      }, { merge: true })
      storedInFirestore = true
    } catch (error) {
      console.error('[scholarship/notify] Firestore write failed, continuing with email confirmation', error)
    }

    const resend = new Resend(apiKey)

    await resend.emails.send({
      from: fromEmail,
      to: recipient,
      subject: `New scholarship registration - ${payload.student.name}`,
      html: buildAdminHtml(payload, submittedAt),
    })

    await resend.emails.send({
      from: fromEmail,
      to: payload.student.email,
      subject: 'TSDC scholarship registration confirmed',
      html: buildStudentHtml(payload, submittedAt),
    })

    return NextResponse.json({ success: true, storage: storedInFirestore ? 'firestore_and_email' : 'email_only' })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown scholarship notification error'
    console.error('[scholarship/notify]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
