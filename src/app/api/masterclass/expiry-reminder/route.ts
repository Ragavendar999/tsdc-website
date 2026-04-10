import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')

const s = (value: unknown) => escapeHtml(String(value ?? '-').trim() || '-')

const getDaysUntil = (eventDate?: string) => {
  if (!eventDate) return null

  const parts = eventDate.split('-').map(Number)
  if (parts.length !== 3 || parts.some((part) => Number.isNaN(part))) return null

  const [year, month, day] = parts
  const target = new Date(year, month - 1, day)
  const today = new Date()

  target.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)

  return Math.round((target.getTime() - today.getTime()) / 86400000)
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    const recipient = process.env.CONTACT_TO_EMAIL || 'n.ragavendar@gmail.com'
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'TSDC <onboarding@resend.dev>'
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://traijoedu.in'

    if (!apiKey) {
      console.error('[masterclass/expiry-reminder] Missing RESEND_API_KEY')
      return NextResponse.json({ error: 'API key missing' }, { status: 500 })
    }

    const body = await req.json()
    const { masterclass } = body as {
      masterclass?: {
        id: string
        title: string
        slug: string
        category: string
        date: string
        eventDate?: string
        status: 'live' | 'draft'
      }
    }

    if (!masterclass?.title || !masterclass.slug || masterclass.status !== 'live') {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const daysUntil = getDaysUntil(masterclass.eventDate)
    if (daysUntil !== 0 && daysUntil !== 1) {
      return NextResponse.json({ skipped: true })
    }

    const resend = new Resend(apiKey)
    const now = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    })

    const urgencyLabel = daysUntil === 0 ? 'Expires today' : 'Expires tomorrow'
    const urgencyColor = daysUntil === 0 ? '#dc2626' : '#d97706'
    const publicUrl = `${siteUrl.replace(/\/$/, '')}/masterclasses/${masterclass.slug}`
    const adminUrl = `${siteUrl.replace(/\/$/, '')}/admin/masterclasses`
    const subject = `${daysUntil === 0 ? 'Today' : 'Tomorrow'}: update or remove masterclass page for ${masterclass.title}`

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${s(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#f0f3ff;font-family:'Segoe UI',Arial,sans-serif;color:#10163a">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f3ff;padding:32px 16px">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:620px;background:#ffffff;border-radius:20px;border:3px solid #10163a;box-shadow:6px 6px 0 #10163a;overflow:hidden">
          <tr>
            <td style="background:#10163a;padding:24px 32px">
              <p style="margin:0;font-size:11px;font-weight:900;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.55)">TSDC Masterclass Reminder</p>
              <h1 style="margin:8px 0 0;font-size:22px;font-weight:900;color:#ffffff;line-height:1.3">
                Page date is ${daysUntil === 0 ? 'today' : 'tomorrow'}
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 32px 0">
              <div style="display:inline-block;background:#fff7ed;border:2px solid #fed7aa;border-radius:999px;padding:8px 18px">
                <span style="font-size:13px;font-weight:900;color:${urgencyColor};letter-spacing:.05em">${urgencyLabel}</span>
              </div>
              <p style="margin:12px 0 0;font-size:13px;color:#667085">Checked at ${now} IST</p>
            </td>
          </tr>

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
                        <td style="font-size:13px;color:#667085;width:140px;padding:5px 0">Title</td>
                        <td style="font-size:13px;font-weight:700;color:#10163a;padding:5px 0">${s(masterclass.title)}</td>
                      </tr>
                      <tr>
                        <td style="font-size:13px;color:#667085;padding:5px 0">Category</td>
                        <td style="font-size:13px;font-weight:700;color:#10163a;padding:5px 0">${s(masterclass.category)}</td>
                      </tr>
                      <tr>
                        <td style="font-size:13px;color:#667085;padding:5px 0">Displayed date</td>
                        <td style="font-size:13px;font-weight:700;color:#10163a;padding:5px 0">${s(masterclass.date)}</td>
                      </tr>
                      <tr>
                        <td style="font-size:13px;color:#667085;padding:5px 0">Event date</td>
                        <td style="font-size:13px;font-weight:700;color:#10163a;padding:5px 0">${s(masterclass.eventDate)}</td>
                      </tr>
                      <tr>
                        <td style="font-size:13px;color:#667085;padding:5px 0">Public URL</td>
                        <td style="font-size:13px;font-weight:700;padding:5px 0"><a href="${s(publicUrl)}" style="color:#3244b5">${s(publicUrl)}</a></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 32px">
              <div style="background:#fef2f2;border-radius:14px;border:2px solid #fecaca;padding:16px 20px">
                <p style="margin:0;font-size:13px;font-weight:900;color:#991b1b">
                  Action needed: edit the masterclass date/details or remove/unpublish this page if the session is no longer valid.
                </p>
                <p style="margin:10px 0 0;font-size:13px;color:#7f1d1d">
                  Admin panel: <a href="${s(adminUrl)}" style="color:#dc2626;font-weight:700">${s(adminUrl)}</a>
                </p>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:16px 32px 28px;border-top:2px solid #f0f0f0">
              <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center">
                TSDC · Traijo Skill Development Center · This reminder was triggered from the masterclass admin workflow.
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
      subject,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('[masterclass/expiry-reminder]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
