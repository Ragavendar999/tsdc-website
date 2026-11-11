# December 2026 Digital Marketing campaign — review handoff

## Requested dates
- Program batch: Monday, 14 December 2026. No class time was supplied.
- Masterclass: Friday, 4 December 2026, 07:00 Asia/Kolkata (01:30 UTC). Not 7 PM.

## Routes
- `/ai-digital-marketing/`
- `/ai-digital-marketing-masterclass/`

These are additive campaign routes. Existing courses, homepage, admin, scholarships and masterclasses remain unchanged. The shared site chrome is omitted only on these two exact paths; each has its own focused navigation and footer.

## Review mode
Both pages default to `noindex` and a visible DESIGN PREVIEW banner. Forms validate inputs but make no network request in preview. The API independently rejects requests unless BOTH `TSDC_DM_CAMPAIGN_LIVE=true` and `VERCEL_ENV=production`. No environment settings are changed in this PR.

Do not activate before approving content, legal/privacy wording and end-to-end enquiry delivery. Root-layout advertising tags already exist in the application and are not changed here. Campaign-specific events are disabled in preview; inherited global tags should also be reviewed separately if analytics isolation is required.

## Content needing approval before launch
- Exact program fee, instalments/refund terms, duration, class hours, delivery mode and trainer.
- Masterclass fee/free status, duration, venue/platform, trainer, replay policy and registration process.
- The eight-part program pathway and four-part masterclass agenda are proposed campaign copy, not independently verified syllabus commitments.
- Confirm admissions WhatsApp +91 95666 56909 and support@traijoedu.in (reused from existing site source).
- No fabricated testimonials, placement rates, partner logos, salaries, income claims, seat counts, countdowns or scarcity claims were added. No old Graphic Design prices were reused.

Current CTA is an **enquiry**, not a confirmed seat or paid registration. Once the fee and booking workflow are approved, adapt the masterclass CTA to the actual booking process. Do not label these forms as successful registration without implementing the corresponding seat/payment logic.

## Enquiry backend
Isolated `/api/campaign-enquiry` route uses existing Resend dependency and existing server environment variable names: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`. Values are never read by the client. Missing configuration fails closed. No fallback test sender is used.

Server checks: allowed Origin, JSON content type, 8 KB streaming body limit, campaign allowlist, field limits, Indian mobile number, email shape, explicit contact consent and honeypot. Instance-local abuse guard (5 requests/10 min per hashed IP) is NOT a distributed rate limiter. Configure shared rate limits/WAF/bot protection before paid traffic. Origin checks are not bot authentication. No credentials or contact details are logged.

Success requires an actual provider message ID and no SDK error. Plain-text messages avoid HTML interpolation. Stable content-derived idempotency keys reduce duplicate emails on retries. Email provider acceptance is not proof of inbox delivery: verify the recipient inbox before launch.

This form sends an admissions email only; it does not create a student record, database registration, WhatsApp reminder, payment, calendar booking or seat allocation. No confirmation email to the prospect is sent. Test those future integrations separately.

## Tracking
Allowlisted UTM parameters are forwarded into enquiry email and static cross-page links. No PII is sent to analytics. Production-only events: `campaign_view`, `campaign_cta_click`, `campaign_audience_select`, and `generate_lead`; Meta `Lead` fires only after accepted enquiry. Existing global tags may also fire; check GTM for duplicate conversions and review consent controls before ads. Configure Google Ads mapping separately; no invented conversion IDs.

## Deployment/release checklist
1. Review both desktop/mobile pages and approve offer details above.
2. Run app typecheck/build and changed-file lint; run responsive, keyboard, date-boundary and mock form tests.
3. Verify the exact branch/commit in the intended Vercel team/project; do not promote a preview to production as an untested replacement.
4. Confirm secrets are configured through Vercel, not chat or source control; configure distributed abuse controls and privacy compliance.
5. Stage a reviewed production build and perform an authorised real enquiry test, checking actual inbox delivery, failure handling and conversion deduplication.
6. Enable the production-only campaign flag only with the owner's publication approval; publish and add routes to sitemap/campaign ads after release.
7. Post-masterclass: confirm appropriate next-session/replay messaging. Page CTA switches to next-opportunity enquiry at start time. The original event date remains as context; manually refresh historical copy.

## Scope
No production deployment, main-branch push, enrolment creation, emails or environment changes are authorised by this review PR alone.
