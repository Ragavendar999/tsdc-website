import { randomUUID } from 'crypto'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getFirebaseAdminDb } from '@/lib/firebase/admin'

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')

const s = (value: unknown) => escapeHtml(String(value ?? '-').trim() || '-')

type ScholarshipLeadCapturePayload = {
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
}

const buildAdminHtml = (payload: ScholarshipLeadCapturePayload, submittedAt: string) => `
  <div style="font-family:Arial,sans-serif;color:#10163a;line-height:1.6">
    <h2 style="margin:0 0 16px;color:#3244b5">New Scholarship Lead Captured</h2>
    <p><strong>Submitted:</strong> ${s(submittedAt)} IST</p>
    <p><strong>Campaign:</strong> ${s(payload.campaignTitle)}</p>
    <p><strong>Status:</strong> Pending payment follow-up</p>
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
    <p><strong>Registration fee to collect:</strong> Rs ${payload.amount}/-</p>
    <p style="margin-top:20px;color:#9a4a10"><strong>Action:</strong> follow up on WhatsApp or phone even if the student does not complete payment.</p>
  </div>
`

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as ScholarshipLeadCapturePayload

    if (!payload?.student?.name || !payload?.student?.email || !payload?.student?.phone) {
      return NextResponse.json({ error: 'Missing required scholarship lead details' }, { status: 400 })
    }

    const submittedAt = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    })

    const leadId = payload.leadId || randomUUID()
    const createdAt = new Date().toISOString()
    let storedInFirestore = false

    try {
      const db = getFirebaseAdminDb()
      await db.collection('scholarship_registrations').doc(leadId).set(
        {
          campaignSlug: payload.campaignSlug,
          campaignTitle: payload.campaignTitle,
          amount: payload.amount,
          student: payload.student,
          status: 'pending_payment',
          createdAt,
          updatedAt: createdAt,
          payment: null,
        },
        { merge: true }
      )
      storedInFirestore = true
    } catch (error) {
      console.error('[scholarship/lead] Firestore write failed, falling back to email only', error)
    }

    const apiKey = process.env.RESEND_API_KEY
    if (apiKey) {
      const recipient = process.env.CONTACT_TO_EMAIL || 'n.ragavendar@gmail.com'
      const fromEmail = process.env.CONTACT_FROM_EMAIL || 'TSDC <onboarding@resend.dev>'
      const resend = new Resend(apiKey)

      await resend.emails.send({
        from: fromEmail,
        to: recipient,
        subject: `Scholarship lead captured - ${payload.student.name}`,
        html: buildAdminHtml(payload, submittedAt),
      })
    }

    return NextResponse.json({
      success: true,
      leadId,
      storage: storedInFirestore ? 'firestore_and_email' : 'email_only',
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown scholarship lead capture error'
    console.error('[scholarship/lead]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
