import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const escapeHtml = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')

const s = (v: unknown) => escapeHtml(String(v ?? '-').trim() || '-')

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    const recipient = process.env.CONTACT_TO_EMAIL || 'n.ragavendar@gmail.com'
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'TSDC <onboarding@resend.dev>'

    if (!apiKey) {
      console.error('[masterclass/notify] Missing RESEND_API_KEY')
      return NextResponse.json({ error: 'API key missing' }, { status: 500 })
    }

    const body = await req.json()
    const { status, student, masterclass } = body as {
      status: 'paid' | 'abandoned'
      student: {
        name: string
        email: string
        phone: string
        city: string
        profession: string
        experience: string
        referral: string
        promoCode: string
        orderId: string
      }
      masterclass: {
        title: string
        category: string
        price: number
        date: string
        time: string
        mode: string
        slug: string
      }
    }

    if (!status || !student || !masterclass) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const resend = new Resend(apiKey)
    const now = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    })

    const isPaid = status === 'paid'

    const accentColor = isPaid ? '#16a34a' : '#d97706'
    const badgeBg = isPaid ? '#dcfce7' : '#fef3c7'
    const badgeBorder = isPaid ? '#bbf7d0' : '#fde68a'
    const badgeText = isPaid ? '#15803d' : '#92400e'
    const statusLabel = isPaid ? '✅ PAYMENT COMPLETED' : '⚠️ REACHED PAYMENT — DID NOT PAY'
    const subjectEmoji = isPaid ? '✅' : '⚠️'
    const subjectLabel = isPaid
      ? `Masterclass Payment Confirmed — ${student.name}`
      : `Incomplete Payment — ${student.name} reached checkout but didn't pay`

    const priceFormatted = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(masterclass.price)

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subjectEmoji} ${subjectLabel}</title>
</head>
<body style="margin:0;padding:0;background:#f0f3ff;font-family:'Segoe UI',Arial,sans-serif;color:#10163a">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f3ff;padding:32px 16px">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:600px;background:#ffffff;border-radius:20px;border:3px solid #10163a;box-shadow:6px 6px 0 #10163a;overflow:hidden">

          <!-- Header band -->
          <tr>
            <td style="background:#10163a;padding:24px 32px">
              <p style="margin:0;font-size:11px;font-weight:900;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.55)">TSDC Masterclass</p>
              <h1 style="margin:6px 0 0;font-size:22px;font-weight:900;color:#ffffff;line-height:1.3">
                ${subjectEmoji} ${isPaid ? 'Payment Confirmed' : 'Incomplete Payment Alert'}
              </h1>
            </td>
          </tr>

          <!-- Status badge -->
          <tr>
            <td style="padding:24px 32px 0">
              <div style="display:inline-block;background:${badgeBg};border:2px solid ${badgeBorder};border-radius:999px;padding:8px 18px">
                <span style="font-size:13px;font-weight:900;color:${badgeText};letter-spacing:.05em">${statusLabel}</span>
              </div>
              <p style="margin:12px 0 0;font-size:13px;color:#667085">Recorded at ${now} IST</p>
            </td>
          </tr>

          <!-- Masterclass details -->
          <tr>
            <td style="padding:24px 32px 0">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff8ed;border-radius:14px;border:2px solid #fde8c0;overflow:hidden">
                <tr>
                  <td style="padding:16px 20px;border-bottom:2px solid #fde8c0">
                    <p style="margin:0;font-size:11px;font-weight:900;letter-spacing:.18em;text-transform:uppercase;color:#9a6010">Masterclass Details</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px">
                    <table width="100%" cellpadding="0" cellspacing="6">
                      <tr>
                        <td style="font-size:13px;color:#667085;width:130px;padding:5px 0">Masterclass</td>
                        <td style="font-size:13px;font-weight:700;color:#10163a;padding:5px 0">${s(masterclass.title)}</td>
                      </tr>
                      <tr>
                        <td style="font-size:13px;color:#667085;padding:5px 0">Category</td>
                        <td style="font-size:13px;font-weight:700;color:#10163a;padding:5px 0">${s(masterclass.category)}</td>
                      </tr>
                      <tr>
                        <td style="font-size:13px;color:#667085;padding:5px 0">Date &amp; Time</td>
                        <td style="font-size:13px;font-weight:700;color:#10163a;padding:5px 0">${s(masterclass.date)} · ${s(masterclass.time)}</td>
                      </tr>
                      <tr>
                        <td style="font-size:13px;color:#667085;padding:5px 0">Mode</td>
                        <td style="font-size:13px;font-weight:700;color:#10163a;padding:5px 0">${s(masterclass.mode)}</td>
                      </tr>
                      <tr>
                        <td style="font-size:13px;color:#667085;padding:5px 0">Amount</td>
                        <td style="font-size:14px;font-weight:900;padding:5px 0;color:${accentColor}">${priceFormatted} ${isPaid ? '— PAID ✅' : '— NOT PAID ⚠️'}</td>
                      </tr>
                      ${student.orderId ? `
                      <tr>
                        <td style="font-size:13px;color:#667085;padding:5px 0">Order ID</td>
                        <td style="font-size:12px;font-weight:700;color:#10163a;font-family:monospace;padding:5px 0">${s(student.orderId)}</td>
                      </tr>` : ''}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Student details -->
          <tr>
            <td style="padding:20px 32px 0">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#eef1ff;border-radius:14px;border:2px solid #c7d2fe;overflow:hidden">
                <tr>
                  <td style="padding:16px 20px;border-bottom:2px solid #c7d2fe">
                    <p style="margin:0;font-size:11px;font-weight:900;letter-spacing:.18em;text-transform:uppercase;color:#3244b5">Applicant Details</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px">
                    <table width="100%" cellpadding="0" cellspacing="6">
                      <tr>
                        <td style="font-size:13px;color:#667085;width:130px;padding:5px 0">Full Name</td>
                        <td style="font-size:13px;font-weight:700;color:#10163a;padding:5px 0">${s(student.name)}</td>
                      </tr>
                      <tr>
                        <td style="font-size:13px;color:#667085;padding:5px 0">Email</td>
                        <td style="font-size:13px;font-weight:700;color:#10163a;padding:5px 0">${s(student.email)}</td>
                      </tr>
                      <tr>
                        <td style="font-size:13px;color:#667085;padding:5px 0">WhatsApp</td>
                        <td style="font-size:13px;font-weight:700;color:#10163a;padding:5px 0">${s(student.phone)}</td>
                      </tr>
                      <tr>
                        <td style="font-size:13px;color:#667085;padding:5px 0">City</td>
                        <td style="font-size:13px;font-weight:700;color:#10163a;padding:5px 0">${s(student.city)}</td>
                      </tr>
                      <tr>
                        <td style="font-size:13px;color:#667085;padding:5px 0">Profession</td>
                        <td style="font-size:13px;font-weight:700;color:#10163a;padding:5px 0">${s(student.profession)}</td>
                      </tr>
                      <tr>
                        <td style="font-size:13px;color:#667085;padding:5px 0">Experience</td>
                        <td style="font-size:13px;font-weight:700;color:#10163a;padding:5px 0">${s(student.experience)}</td>
                      </tr>
                      <tr>
                        <td style="font-size:13px;color:#667085;padding:5px 0">Referred via</td>
                        <td style="font-size:13px;font-weight:700;color:#10163a;padding:5px 0">${s(student.referral)}</td>
                      </tr>
                      ${student.promoCode ? `
                      <tr>
                        <td style="font-size:13px;color:#667085;padding:5px 0">Promo code</td>
                        <td style="font-size:13px;font-weight:700;color:#10163a;font-family:monospace;padding:5px 0">${s(student.promoCode)}</td>
                      </tr>` : ''}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Action note -->
          <tr>
            <td style="padding:20px 32px">
              <div style="background:${isPaid ? '#f0fdf4' : '#fffbeb'};border-radius:14px;border:2px solid ${isPaid ? '#bbf7d0' : '#fde68a'};padding:16px 20px">
                <p style="margin:0;font-size:13px;font-weight:900;color:${isPaid ? '#15803d' : '#92400e'}">
                  ${isPaid
                    ? '✅ Action: Send the student a welcome/confirmation message and ensure they are added to the WhatsApp community.'
                    : '⚠️ Action: This student filled the form and reached the payment screen but did not complete. Reach out via WhatsApp or email to recover this registration.'
                  }
                </p>
                ${!isPaid ? `
                <p style="margin:10px 0 0;font-size:13px;color:#78350f">
                  WhatsApp: <a href="https://wa.me/91${s(student.phone).replace(/\D/g, '')}" style="color:#d97706;font-weight:700">+91 ${s(student.phone)}</a> &nbsp;|&nbsp;
                  Email: <a href="mailto:${s(student.email)}" style="color:#d97706;font-weight:700">${s(student.email)}</a>
                </p>` : ''}
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px 28px;border-top:2px solid #f0f0f0">
              <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center">
                TSDC · Traijo Skill Development Center · Perumbakkam, Chennai<br>
                This is an automated notification from your masterclass registration system.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

    await resend.emails.send({
      from: fromEmail,
      to: recipient,
      subject: `${subjectEmoji} ${subjectLabel}`,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('[masterclass/notify]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
