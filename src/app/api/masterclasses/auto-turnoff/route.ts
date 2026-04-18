import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { isMasterclassPastTurnOffAt, type Masterclass } from '@/app/lib/masterclasses'
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

const buildEmailHtml = (turnedOff: Masterclass[], activated: Masterclass[], siteUrl: string, nowLabel: string) => {
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
                Masterclasses auto turned off from admin turn-off date and time
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px 0">
              <p style="margin:0;font-size:14px;color:#475467;line-height:1.7">
                Checked at ${s(nowLabel)} IST. The automation reviewed the live masterclasses, unpublished expired items, and promoted any preselected replacement items that were ready to go live.
              </p>
            </td>
          </tr>
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

export async function GET() {
  try {
    const currentMasterclasses = await getStoredMasterclasses()
    const now = new Date()
    const toTurnOff = currentMasterclasses.filter(
      (masterclass) => masterclass.status === 'live' && isMasterclassPastTurnOffAt(masterclass, now)
    )

    if (!toTurnOff.length) {
      return NextResponse.json({ skipped: true, message: 'No masterclasses need auto turn-off right now.' })
    }

    const nowIso = now.toISOString()
    const turnedOffIds = new Set(toTurnOff.map((item) => item.id))
    const activatedIds = new Set<string>()

    const updatedMasterclasses = currentMasterclasses.map((masterclass) => {
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
        subject: `Masterclass automation update (${toTurnOff.length} expired, ${activated.length} activated)`,
        html: buildEmailHtml(toTurnOff, activated, siteUrl, nowLabel),
      })
    }

    return NextResponse.json({
      success: true,
      turnedOff: toTurnOff.map((masterclass) => masterclass.slug),
      activated: activated.map((masterclass) => masterclass.slug),
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('[masterclasses/auto-turnoff]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
