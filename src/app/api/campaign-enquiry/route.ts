import { NextResponse } from 'next/server'
import { createHash } from 'node:crypto'
import { Resend } from 'resend'

export const runtime = 'nodejs'
const MAX_BYTES = 8192
const origins = new Set(['https://traijoedu.in', 'https://www.traijoedu.in'])
const campaigns = new Set(['program', 'masterclass'])
const audiences = new Set(['', 'student', 'professional', 'freelancer', 'business', 'other'])
const attributionKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
// Instance-local abuse guard only. Add a shared limit/WAF rule before paid traffic.
const rate = new Map<string, { count: number; until: number }>()
const reply = (body: object, status: number) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
const text = (value: unknown) => typeof value === 'string' ? value.trim() : ''

async function readLimitedJson(req: Request): Promise<unknown> {
  if (Number(req.headers.get('content-length') || 0) > MAX_BYTES) throw new Error('too_large')
  const reader = req.body?.getReader()
  if (!reader) throw new Error('invalid_json')
  const chunks: Uint8Array[] = []
  let size = 0
  try {
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > MAX_BYTES) { await reader.cancel(); throw new Error('too_large') }
      chunks.push(value)
    }
  } finally { reader.releaseLock() }
  const bytes = new Uint8Array(size)
  let offset = 0
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength }
  return JSON.parse(new TextDecoder().decode(bytes))
}

export async function POST(req: Request) {
  // Preview cannot submit, even when called directly. Enable only after launch review.
  if (process.env.TSDC_DM_CAMPAIGN_LIVE !== 'true' || process.env.VERCEL_ENV !== 'production') {
    return reply({ error: 'This campaign is in preview. No enquiry was sent.' }, 503)
  }
  if (!origins.has(req.headers.get('origin') || '')) return reply({ error: 'Invalid request origin.' }, 403)
  if (!(req.headers.get('content-type') || '').toLowerCase().startsWith('application/json')) return reply({ error: 'Use a JSON request.' }, 415)
  const now = Date.now()
  for (const [key, entry] of rate) if (entry.until <= now) rate.delete(key)
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown'
  const key = createHash('sha256').update(ip).digest('hex')
  const previous = rate.get(key)
  if (previous && previous.count >= 5) return reply({ error: 'Too many requests. Please try again in a few minutes.' }, 429)
  if (!previous && rate.size >= 5000) return reply({ error: 'Please try again shortly.' }, 429)
  rate.set(key, { count: (previous?.count || 0) + 1, until: previous?.until || now + 10 * 60 * 1000 })
  let raw: unknown
  try { raw = await readLimitedJson(req) } catch (e) {
    return reply({ error: 'Invalid or oversized request.' }, e instanceof Error && e.message === 'too_large' ? 413 : 400)
  }
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return reply({ error: 'Invalid request.' }, 400)
  const body = raw as Record<string, unknown>
  const campaign = text(body.campaign)
  const name = text(body.name)
  const email = text(body.email).toLowerCase()
  const phone = text(body.phone)
  const audience = text(body.audience)
  if (text(body.website)) return reply({ error: 'Unable to accept this request.' }, 400)
  if (!campaigns.has(campaign) || name.length < 2 || name.length > 80 || /[\r\n]/.test(name) || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^[6-9]\d{9}$/.test(phone) || !audiences.has(audience) || body.consent !== true) {
    return reply({ error: 'Check your name, email, Indian mobile number and contact consent.' }, 400)
  }
  const attribution = body.attribution && typeof body.attribution === 'object' && !Array.isArray(body.attribution) ? body.attribution as Record<string, unknown> : {}
  const fields = attributionKeys.map((k) => `${k}: ${text(attribution[k]).replace(/[\r\n]/g, ' ').slice(0, 160)}`)
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL
  // Fail closed instead of sending via an unverified default address.
  if (!apiKey || !to || !from) return reply({ error: 'Online enquiries are temporarily unavailable. Please contact TSDC admissions.' }, 503)
  const schedule = campaign === 'masterclass' ? '4 December 2026, 7:00 AM IST' : '14 December 2026 (class time to be confirmed)'
  // Stable email content + key allows safe retries during a daily deduplication window.
  const day = new Date().toISOString().slice(0, 10)
  const content = [
    `TSDC December 2026 ${campaign} enquiry`, `Schedule: ${schedule}`,
    `Name: ${name}`, `Email: ${email}`, `Phone: +91${phone}`, `Audience: ${audience || 'Not specified'}`,
    'Contact consent: explicitly checked', `Consent policy: dm-enquiry-v1 (2026-11-11); request day (UTC): ${day}`,
    ...fields, '', 'This is an enquiry only. No payment or seat confirmation has been made.',
  ].join('\n')
  const idempotencyKey = `dm-${createHash('sha256').update(content).digest('hex')}`
  try {
    const { data, error } = await new Resend(apiKey).emails.send({
      from, to, replyTo: email,
      subject: `[TSDC] ${campaign === 'masterclass' ? '4 Dec masterclass' : '14 Dec program'} enquiry`,
      text: content,
    }, { idempotencyKey })
    if (error || !data?.id) return reply({ error: 'Your enquiry could not be sent. Please retry or contact admissions.' }, 502)
    return reply({ success: true, message: 'Enquiry sent. This is not a confirmed booking.' }, 200)
  } catch {
    // Do not log or expose contact details, provider responses or credentials.
    return reply({ error: 'The enquiry service is unavailable. Please retry or contact admissions.' }, 502)
  }
}
