import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import {
  defaultMasterclasses,
  getMasterclassDaysUntil,
  isMasterclassVisibleOnLiveSite,
} from '@/app/lib/masterclasses'

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')

const s = (value: unknown) => escapeHtml(String(value ?? '-').trim() || '-')

type ReminderMasterclass = {
  id: string
  title: string
  slug: string
  category: string
  date: string
  eventDate?: string
  status: 'live' | 'draft'
}

const normalizeMasterclasses = (input?: ReminderMasterclass[]) => {
  if (input?.length) return input

  return defaultMasterclasses.map((masterclass) => ({
    id: masterclass.id,
    title: masterclass.title,
    slug: masterclass.slug,
    category: masterclass.category,
    date: masterclass.date,
    eventDate: masterclass.eventDate,
    status: masterclass.status,
  }))
}

const buildEmailHtml = ({
  siteUrl,
  flaggedMasterclasses,
  now,
}: {
  siteUrl: string
  flaggedMasterclasses: Array<ReminderMasterclass & { daysUntil: number | null }>
  now: string
}) => {
  const adminUrl = `${siteUrl.replace(/\/$/, '')}/admin/masterclasses`

  const rows = flaggedMasterclasses
    .map((masterclass) => {
      const publicUrl = `${siteUrl.replace(/\/$/, '')}/masterclasses/${masterclass.slug}`
      const visibilityLabel = isMasterclassVisibleOnLiveSite(masterclass) ? 'Still visible' : 'Auto-hidden from live site'
      const urgencyLabel = masterclass.daysUntil === 1 ? 'Expires tomorrow' : masterclass.daysUntil === 0 ? 'Expires today' : 'Past date'

      return `
        <tr>
          <td style="padding:14px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:700;color:#10163a">${s(masterclass.title)}</td>
          <td style="padding:14px;border-bottom:1px solid #e5e7eb;font-size:13px;color:#475467">${s(masterclass.category)}</td>
          <td style="padding:14px;border-bottom:1px solid #e5e7eb;font-size:13px;color:#475467">${s(masterclass.date)}</td>
          <td style="padding:14px;border-bottom:1px solid #e5e7eb;font-size:13px;color:#475467">${s(masterclass.eventDate)}</td>
          <td style="padding:14px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:800;color:#b45309">${urgencyLabel}</td>
          <td style="padding:14px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:800;color:#b42318">${visibilityLabel}</td>
          <td style="padding:14px;border-bottom:1px solid #e5e7eb;font-size:13px"><a href="${s(publicUrl)}" style="color:#3244b5">Open page</a></td>
        </tr>`
    })
    .join('')

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>TSDC Masterclass Auto-Hide Summary</title>
</head>
<body style="margin:0;padding:0;background:#f0f3ff;font-family:'Segoe UI',Arial,sans-serif;color:#10163a">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f3ff;padding:32px 16px">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:760px;background:#ffffff;border-radius:20px;border:3px solid #10163a;box-shadow:6px 6px 0 #10163a;overflow:hidden">
          <tr>
            <td style="background:#10163a;padding:24px 32px">
              <p style="margin:0;font-size:11px;font-weight:900;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.55)">TSDC Masterclass Automation</p>
              <h1 style="margin:8px 0 0;font-size:22px;font-weight:900;color:#ffffff;line-height:1.3">
                Masterclass pages auto-hidden because the event is today or tomorrow
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px 0">
              <p style="margin:0;font-size:14px;color:#475467;line-height:1.7">
                Checked at ${s(now)} IST. The live site now automatically hides masterclass pages when their <strong>event date is today or tomorrow</strong> so stale offers do not remain public.
              </p>
              <p style="margin:12px 0 0;font-size:14px;color:#475467;line-height:1.7">
                Review these entries in the admin panel if you want to update them to a new date or next cohort before making them live again.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px">
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:14px;overflow:hidden">
                <thead>
                  <tr style="background:#fff8ed">
                    <th align="left" style="padding:14px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#9a6010">Title</th>
                    <th align="left" style="padding:14px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#9a6010">Category</th>
                    <th align="left" style="padding:14px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#9a6010">Shown date</th>
                    <th align="left" style="padding:14px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#9a6010">Event date</th>
                    <th align="left" style="padding:14px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#9a6010">Urgency</th>
                    <th align="left" style="padding:14px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#9a6010">Live status</th>
                    <th align="left" style="padding:14px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#9a6010">Link</th>
                  </tr>
                </thead>
                <tbody>
                  ${rows}
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 24px">
              <div style="background:#fef2f2;border-radius:14px;border:2px solid #fecaca;padding:16px 20px">
                <p style="margin:0;font-size:13px;font-weight:900;color:#991b1b">
                  Next step: update the date or duplicate the session for the next cohort before re-publishing.
                </p>
                <p style="margin:10px 0 0;font-size:13px;color:#7f1d1d">
                  Admin panel: <a href="${s(adminUrl)}" style="color:#dc2626;font-weight:700">${s(adminUrl)}</a>
                </p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

async function handleReminder(req?: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    const recipient = process.env.CONTACT_TO_EMAIL || 'n.ragavendar@gmail.com'
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'TSDC <onboarding@resend.dev>'
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://traijoedu.in'

    if (!apiKey) {
      console.error('[masterclass/expiry-reminder] Missing RESEND_API_KEY')
      return NextResponse.json({ error: 'API key missing' }, { status: 500 })
    }

    const requestBody = req && req.method === 'POST' ? await req.json().catch(() => ({})) : {}
    const bodyMasterclasses = Array.isArray(requestBody?.masterclasses)
      ? requestBody.masterclasses
      : requestBody?.masterclass
        ? [requestBody.masterclass]
        : undefined

    const candidates = normalizeMasterclasses(bodyMasterclasses)
    const flaggedMasterclasses = candidates
      .map((masterclass) => ({
        ...masterclass,
        daysUntil: getMasterclassDaysUntil(masterclass),
      }))
      .filter((masterclass) => masterclass.status === 'live' && masterclass.daysUntil !== null && masterclass.daysUntil <= 1)

    if (!flaggedMasterclasses.length) {
      return NextResponse.json({ skipped: true, message: 'No masterclasses need auto-hide review today.' })
    }

    const resend = new Resend(apiKey)
    const now = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    })

    await resend.emails.send({
      from: fromEmail,
      to: recipient,
      subject: `Masterclass pages auto-hidden for review (${flaggedMasterclasses.length})`,
      html: buildEmailHtml({ siteUrl, flaggedMasterclasses, now }),
    })

    return NextResponse.json({
      success: true,
      hiddenFromLiveSite: flaggedMasterclasses.map((masterclass) => masterclass.slug),
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('[masterclass/expiry-reminder]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function GET(req: Request) {
  return handleReminder(req)
}

export async function POST(req: Request) {
  return handleReminder(req)
}
