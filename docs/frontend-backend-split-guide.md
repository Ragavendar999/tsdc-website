# Frontend / Backend Split Guide

## Goal

Move TSDC from a single Vercel-hosted Next.js app with embedded server routes into:

- `Frontend`: Next.js marketing site on Vercel
- `Backend`: separate API service
- `Database`: separate managed database
- `Email`: Resend
- `Payments`: Razorpay

## Recommended zero-cost setup

### Frontend

- Platform: Vercel Hobby
- Responsibility:
  - landing pages
  - public course pages
  - ad campaign pages
  - client-side forms
  - analytics and Meta Pixel

### Backend

- Platform: Cloudflare Workers Free
- Responsibility:
  - lead capture APIs
  - admin APIs
  - Razorpay order creation
  - Razorpay webhook verification
  - scholarship auto turn-off cron
  - email triggers

### Database

- Platform: Cloudflare D1 Free
- Responsibility:
  - scholarship registrations
  - masterclasses
  - demo class slots
  - lead pipeline
  - payment status
  - scholarship results

### File and image storage

- Platform: Cloudflare R2 Free tier as needed later

## Why this stack

- Keeps the frontend on Vercel where it already works well
- Removes sensitive logic from the frontend deployment
- Gives you cron jobs and backend execution separately from the site
- Keeps running cost near zero for an early funnel
- Avoids backend cold-start style issues common on some free Node hosts

## Free-tier caveats

- Vercel Hobby is for personal/non-commercial use, so plan for Pro once ad spend and paid traffic increase
- Cloudflare Workers Free has request and CPU limits
- D1 is SQLite-based, which is fine for leads, payments, and admin content at this stage

## Target architecture

```text
Meta Ad
  -> Vercel frontend landing page
  -> call backend API on Cloudflare Workers
      -> write lead/payment data to D1
      -> send mail via Resend
      -> create/verify Razorpay payment
      -> run cron for expiry and reminders
```

## Suggested database tables

### `masterclasses`

- `id`
- `slug`
- `title`
- `status`
- `event_date`
- `turn_off_at`
- `auto_turned_off_at`
- `expiry_notification_sent_at`
- `payload_json`
- `created_at`
- `updated_at`

### `scholarship_campaigns`

- `id`
- `slug`
- `title`
- `deadline_at`
- `fee_amount`
- `status`
- `payload_json`
- `created_at`
- `updated_at`

### `scholarship_registrations`

- `id`
- `campaign_slug`
- `full_name`
- `email`
- `phone`
- `city`
- `school_or_college`
- `current_stage`
- `preferred_demo_slot`
- `payment_status`
- `payment_order_id`
- `payment_id`
- `scholarship_status`
- `created_at`
- `updated_at`

### `followup_events`

- `id`
- `registration_id`
- `event_type`
- `event_status`
- `notes`
- `scheduled_at`
- `created_at`

## Migration phases

### Phase 1

- Keep frontend on Vercel
- Create Cloudflare Worker API
- Move all `/api/*` logic out of Next.js
- Use `NEXT_PUBLIC_API_BASE_URL` in the frontend

### Phase 2

- Move masterclasses and scholarship forms to D1
- Move admin save/load operations to the backend API
- Move cron jobs to Cloudflare Cron Triggers

### Phase 3

- Move Razorpay verification to secure webhooks on backend only
- Add admin audit logs
- Add role-based permissions
- Add exportable lead dashboard

## Environment variables split

### Frontend on Vercel

- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- `NEXT_PUBLIC_SITE_URL`

### Backend on Cloudflare Workers

- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_KEY_ID`
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`
- `JWT_SECRET` or admin verification secret

## What should never stay in the frontend app

- Razorpay secret
- Resend secret
- webhook verification logic
- cron-based expiry logic
- database write credentials
- lead export endpoints

## Deployment order

1. Deploy backend API first
2. Create D1 database and schema
3. Add backend secrets
4. Point frontend forms to backend
5. Test one payment end-to-end
6. Test one expiry cron end-to-end
7. Move admin pages to backend-backed reads and writes

## Best next refactor inside this repo

1. extract all payment and mail routes behind `NEXT_PUBLIC_API_BASE_URL`
2. stop using browser-only local storage for admin-managed content
3. introduce backend webhooks for payment confirmation
4. mirror all scholarship and masterclass writes into the database
