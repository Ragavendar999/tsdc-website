import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import {
  computeTurnOffAt,
  formatMasterclassDisplayDate,
  getNextRecurringSessionDate,
  isMasterclassPastTurnOffAt,
  type Masterclass,
} from '@/app/lib/masterclasses'
import { getStoredMasterclasses, saveStoredMasterclasses } from '@/lib/masterclasses-store'

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')

const s = (value: unknown) => escapeHtml(String(value ?? '-').trim() || '-')

const buildStatusRows = (masterclasses: Masterclass[], siteUrl: string, statusLabel: string, statusColor: string) =>
  masterclasses
    .map((masterclass) => {
      const publicUrl = `${siteUrl.replace(/\/$/, '')}/masterclasses/${masterclass.slug}`

      return `
        <tr>
          <td style="padding:14px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:700;color:#10163a">${s(masterclass.title)}</td>
          <td style="padding:14px;border-bottom:1px solid #e5e7eb;font-size:13px;color:#475467">${s(masterclass.category)}</td>
          <td style="padding:14px;border-bottom:1px solid #e5e7eb;font-size:13px;color:#475467">${s(masterclass.date)}</td>
          <td style="padding:14px;border-bottom:1px solid #e5e7eb;font-size:13px;color:#475467">${s(masterclass.turnOffAt)}</td>
          <td style="padding:14px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:800;color:${statusColor}">${statusLabel}</td>
          <td style="padding:14px;border-bottom:1px solid #e5e7eb;font-size:13px"><a href="${s(publicUrl)}" style="color:#3244b5">Open page</a></td>
        </tr>`
    })
    .join('')

const buildRescheduledRows = (items: { before: Masterclass; after: Masterclass }[], siteUrl: string) =>
  items
    .map(({ before, after }) => {
      const publicUrl = `${siteUrl.replace(/\/$/, '')}/masterclasses/${after.slug}`

      return `
        <tr>
          <td style="padding:14px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:700;color:#10163a">${s(after.title)}</td>
          <td style="padding:14px;border-bottom:1px solid #e5e7eb;font-size:13px;color:#475467">${s(before.date)}</td>
          <td style="padding:14px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:800;color:#3244b5">${s(after.date)}</td>
          <td style="padding:14px;border-bottom:1px solid #e5e7eb;font-size:13px;color:#475467">${s(after.turnOffAt)}</td>
          <td style="padding:14px;border-bottom:1px solid #e5e7eb;font-size:13px"><a href="${s(publicUrl)}" style="color:#3244b5">Open page</a></td>
        </tr>`
    })
    .join('')

const buildEmailSection = (title: string, description: string, rows: string) =>
  rows
    ? `
          <tr>
            <td style="padding:24px 32px 0">
              <p style="margin:0 0 12px;font-size:11px;font-weight:900;letter-spacing:.18em;text-transform:uppercase;color:#3244b5">${s(title)}</p>
              <p style="margin:0 0 16px;font-size:14px;color:#475467;line-height:1.7">${s(description)}</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:14px;overflow:hidden">
                <thead>
                  <tr style="background:#fff8ed">
                    <th align="left" style="padding:14px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#9a6010">Title</th>
                    <th align="left" style="padding:14px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#9a6010">Category</th>
                    <th align="left" style="padding:14px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#9a6010">Shown date</th>
                    <th align="left" style="padding:14px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#9a6010">Turn off at</th>
                    <th align="left" style="padding:14px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#9a6010">Status</th>
                    <th align="left" style="padding:14px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#9a6010">Link</th>
                  </tr>
                </thead>
                <tbody>${rows}</tbody>
              </table>
            </td>
          </tr>`
    : ''

const buildRescheduledSection = (items: { before: Masterclass; after: Masterclass }[], siteUrl: string) =>
  items.length
    ? `
          <tr>
            <td style="padding:24px 32px 0">
              <p style="margin:0 0 12px;font-size:11px;font-weight:900;letter-spacing:.18em;text-transform:uppercase;color:#15803d">Rescheduled masterclasses</p>
              <p style="margin:0 0 16px;font-size:14px;color:#475467;line-height:1.7">These recurring masterclasses reached their turn-off time and were automatically moved to their next slot, with seats reset for the new batch.</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:14px;overflow:hidden">
                <thead>
                  <tr style="background:#f0fdf4">
                    <th align="left" style="padding:14px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#15803d">Title</th>
                    <th align="left" style="padding:14px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#15803d">Previous date</th>
                    <th align="left" style="padding:14px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#15803d">New date</th>
                    <th align="left" style="padding:14px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#15803d">Turn off at</th>
                    <th align="left" style="padding:14px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#15803d">Link</th>
                  </tr>
                </thead>
                <tbody>${buildRescheduledRows(items, siteUrl)}</tbody>
              </table>
            </td>
          </tr>`
    : ''

const buildEmailHtml = (
  turnedOff: Masterclass[],
  activated: Masterclass[],
  rescheduled: { before: Masterclass; after: Masterclass }[],
  siteUrl: string,
  nowLabel: string
) => {
  const turnedOffRows = buildStatusRows(turnedOff, siteUrl, 'Auto turned off', '#b42318')
  const activatedRows = buildStatusRows(activated, siteUrl, 'Auto published', '#15803d')

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>TSDC Masterclass Auto Turn-off</title>
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
                Masterclass schedule update
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px 0">
              <p style="margin:0;font-size:14px;color:#475467;line-height:1.7">
                Checked at ${s(nowLabel)} IST. The automation reviewed the live masterclasses, rescheduled recurring ones to their next slot, unpublished any expired one-off items, and promoted any preselected replacement items that were ready to go live.
              </p>
            </td>
          </tr>
          ${buildRescheduledSection(rescheduled, siteUrl)}
          ${buildEmailSection(
            'Expired masterclasses',
            'These live masterclasses reached the admin-configured turn-off date and were automatically unpublished.',
            turnedOffRows
          )}
          ${buildEmailSection(
            'Replacement masterclasses',
            'These draft masterclasses were automatically published as the next live offer after expiry.',
            activatedRows
          )}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret) {
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  try {
    const currentMasterclasses = await getStoredMasterclasses()
    const now = new Date()
    const expired = currentMasterclasses.filter(
      (masterclass) => masterclass.status === 'live' && isMasterclassPastTurnOffAt(masterclass, now)
    )

    if (!expired.length) {
      return NextResponse.json({ skipped: true, message: 'No masterclasses need auto turn-off right now.' })
    }

    const nowIso = now.toISOString()
    const toReschedule = expired.filter((masterclass) => masterclass.recurring)
    const toTurnOff = expired.filter((masterclass) => !masterclass.recurring)
    const rescheduledIds = new Set(toReschedule.map((item) => item.id))
    const turnedOffIds = new Set(toTurnOff.map((item) => item.id))
    const activatedIds = new Set<string>()
    const rescheduledSummary: { before: Masterclass; after: Masterclass }[] = []

    const updatedMasterclasses = currentMasterclasses.map((masterclass) => {
      if (rescheduledIds.has(masterclass.id)) {
        const nextSessionDate = getNextRecurringSessionDate(masterclass.id, now)
        const updated: Masterclass = {
          ...masterclass,
          eventDate: nextSessionDate.toISOString().slice(0, 10),
          date: formatMasterclassDisplayDate(nextSessionDate),
          turnOffAt: computeTurnOffAt(nextSessionDate),
          seatsTaken: 0,
          status: 'live',
          autoRescheduledAt: nowIso,
          autoRescheduledFrom: masterclass.eventDate,
        }
        rescheduledSummary.push({ before: masterclass, after: updated })
        return updated
      }

      if (turnedOffIds.has(masterclass.id)) {
        return {
          ...masterclass,
          status: 'draft' as const,
          autoTurnedOffAt: nowIso,
          expiryNotificationSentAt: nowIso,
        }
      }

      const trigger = toTurnOff.find((item) => item.replacementMasterclassId === masterclass.id)
      if (
        trigger &&
        !activatedIds.has(masterclass.id) &&
        masterclass.status === 'draft' &&
        !isMasterclassPastTurnOffAt(masterclass, now)
      ) {
        activatedIds.add(masterclass.id)
        return {
          ...masterclass,
          status: 'live' as const,
          autoActivatedAt: nowIso,
          activatedFromMasterclassId: trigger.id,
        }
      }

      return masterclass
    })

    await saveStoredMasterclasses(updatedMasterclasses)

    const activated = updatedMasterclasses.filter((masterclass) => activatedIds.has(masterclass.id))

    const apiKey = process.env.RESEND_API_KEY
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://traijoedu.in'
    const nowLabel = now.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    })

    if (apiKey) {
      const resend = new Resend(apiKey)
      const recipient = process.env.CONTACT_TO_EMAIL || 'n.ragavendar@gmail.com'
      const fromEmail = process.env.CONTACT_FROM_EMAIL || 'TSDC <onboarding@resend.dev>'

      await resend.emails.send({
        from: fromEmail,
        to: recipient,
        subject: `Masterclass automation update (${rescheduledSummary.length} rescheduled, ${toTurnOff.length} expired, ${activated.length} activated)`,
        html: buildEmailHtml(toTurnOff, activated, rescheduledSummary, siteUrl, nowLabel),
      })
    }

    return NextResponse.json({
      success: true,
      rescheduled: rescheduledSummary.map((item) => ({ slug: item.after.slug, from: item.before.date, to: item.after.date })),
      turnedOff: toTurnOff.map((masterclass) => masterclass.slug),
      activated: activated.map((masterclass) => masterclass.slug),
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('[masterclasses/auto-turnoff]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
