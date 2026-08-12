export type MasterclassModule = {
  title: string
  duration: string
}

export type MasterclassOutcome = {
  title: string
  description: string
}

export type MasterclassValue = {
  label: string
  value: string
}

export type Masterclass = {
  id: string
  slug: string
  status: 'live' | 'draft'
  eventDate?: string
  turnOffAt?: string
  autoTurnedOffAt?: string
  expiryNotificationSentAt?: string
  replacementMasterclassId?: string
  autoActivatedAt?: string
  activatedFromMasterclassId?: string
  /** When true, the auto-turnoff cron reschedules this masterclass to its next recurring
   *  slot instead of unpublishing it. See getNextRecurringSessionDate. */
  recurring?: boolean
  autoRescheduledAt?: string
  autoRescheduledFrom?: string
  title: string
  backgroundStyle?: 'midnight' | 'blueprint' | 'ember' | 'violet'
  backgroundImage?: string
  /** Card photo on the listing page — falls back to backgroundImage when unset. */
  cardImage?: string
  /** Optional trailer/preview video — the "Watch Trailer" button only renders when this is set. */
  trailerVideoUrl?: string
  level?: 'Beginner' | 'Intermediate' | 'Advanced'
  badge: string
  category: string
  hook: string
  description: string
  date: string
  time: string
  mode: string
  price: number
  originalPrice: number
  discountLabel: string
  seatsTotal: number
  seatsTaken: number
  /** Short "what you'll learn" highlights, distinct from the detailed modules/curriculum below.
   *  Falls back to module titles on the detail page when unset. */
  outcomes?: MasterclassOutcome[]
  modules: MasterclassModule[]
  includes: MasterclassValue[]
  instructor: {
    name: string
    role: string
    credibility: string
  }
  audience: string[]
  faqs: string[]
  whatsappLink: string
}

export type MasterclassTestimonial = {
  name: string
  role: string
  quote: string
}

export type MasterclassStat = {
  value: string
  label: string
}

export type MasterclassWhyAttend = {
  title: string
  description: string
}

export type MasterclassPageContent = {
  heroStats: MasterclassStat[]
  whyAttend: MasterclassWhyAttend[]
  testimonials: MasterclassTestimonial[]
}

export const defaultMasterclassPageContent: MasterclassPageContent = {
  heroStats: [
    { value: '', label: 'Masterclasses Conducted' },
    { value: '', label: 'Industry Experts' },
    { value: '', label: 'Students Enrolled' },
    { value: '', label: 'Hours of Learning' },
  ],
  whyAttend: [
    {
      title: 'Learn from Industry Experts',
      description: 'Gain insights from professionals with real-world experience.',
    },
    {
      title: 'Live Interactive Sessions',
      description: 'Ask questions, participate, and get personalized guidance.',
    },
    {
      title: 'Practical & Actionable',
      description: 'Apply what you learn with hands-on examples and case studies.',
    },
    {
      title: 'Certificate of Participation',
      description: 'Receive a certificate to showcase your learning.',
    },
  ],
  testimonials: [],
}

export const MASTERCLASS_STORAGE_KEY = 'tsdc-masterclasses-v1'
export const MASTERCLASS_DELETED_KEY = 'tsdc-masterclasses-deleted-v1'

// The hardcoded fallback below is only ever shown for the first paint (before the
// client fetches real Firestore data) or if that fetch fails — it must never itself
// go stale, so its date is computed relative to "now" instead of hardcoded, the same
// class of bug that made the real masterclasses disappear earlier.
const FALLBACK_EVENT_DATE = new Date(Date.now() + 21 * 24 * 60 * 60 * 1000)
const FALLBACK_EVENT_DATE_ISO = FALLBACK_EVENT_DATE.toISOString().slice(0, 10)
const FALLBACK_EVENT_DATE_LABEL = FALLBACK_EVENT_DATE.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })
const FALLBACK_TURN_OFF_AT = new Date(Date.now() + 22 * 24 * 60 * 60 * 1000).toISOString()

export const defaultMasterclasses: Masterclass[] = [
  {
    id: 'logo-design-masterclass',
    slug: 'logo-masterclass',
    status: 'live',
    eventDate: FALLBACK_EVENT_DATE_ISO,
    turnOffAt: FALLBACK_TURN_OFF_AT,
    recurring: true,
    title: 'Logo Design Masterclass',
    backgroundStyle: 'midnight',
    backgroundImage: '',
    cardImage: '',
    level: 'Beginner',
    badge: 'Live Online Masterclass',
    category: 'Logo Design',
    hook: 'Build logos that actually get remembered',
    description:
      'A 1-day intensive masterclass on logo design: theory, process, tools, and real practice for students, freelancers, and business owners.',
    date: FALLBACK_EVENT_DATE_LABEL,
    time: '10:00 AM - 2:00 PM',
    mode: 'Online Zoom / Meet',
    price: 1999,
    originalPrice: 4999,
    discountLabel: '60% OFF',
    seatsTotal: 50,
    seatsTaken: 0,
    outcomes: [
      { title: 'Design Thinking', description: 'Understand user and brand needs before opening design tools.' },
      { title: 'Brand Identity', description: 'Learn how a logo fits into a larger brand identity system.' },
      { title: 'Sketch to Vector', description: 'Take a concept from rough sketch to a clean vector logo.' },
      { title: 'Typography', description: 'Apply typography rules that most beginner designers break.' },
      { title: 'Color Systems', description: 'Build color psychology and logo color systems that work.' },
      { title: 'Live Critique', description: 'Get direct feedback on your own logo work in the session.' },
    ],
    modules: [
      { title: 'Logo design fundamentals: what makes a logo work', duration: '30 min' },
      { title: 'Brand identity thinking before opening Illustrator', duration: '30 min' },
      { title: 'Sketching to vector: the professional workflow', duration: '45 min' },
      { title: 'Typography in logos: rules most designers break', duration: '30 min' },
      { title: 'Color psychology and logo color systems', duration: '30 min' },
      { title: 'Live logo critique + Q&A session', duration: '45 min' },
    ],
    includes: [
      { label: 'Live session', value: '4 hrs' },
      { label: 'Recording', value: '7 days' },
      { label: 'Certificate', value: 'Included' },
      { label: 'AI logo kit', value: 'Resource' },
      { label: 'Swipe file', value: '50 logos' },
      { label: 'Q&A live', value: 'Direct' },
    ],
    instructor: {
      name: 'Ragavendar',
      role: 'Lead UI/UX Designer',
      credibility:
        'The same person who designs for enterprise SaaS products is teaching you logo design, not a YouTube instructor, a working professional.',
    },
    audience: [
      'Students who want to add logo design to their portfolio',
      'Freelancers who want to charge more for branding projects',
      'Business owners who want to understand what good branding looks like',
      'Anyone who opened Illustrator and had no idea where to start',
    ],
    faqs: ['Do I need Illustrator?', 'Is this recorded?', 'Beginner-friendly?', 'Will I get a certificate?'],
    whatsappLink: 'https://wa.me/919566656909',
  },
  {
    id: 'summer-bootcamp-ai-powered-graphic-design-program',
    slug: 'summer-bootcamp-ai-graphic-design',
    status: 'live',
    eventDate: FALLBACK_EVENT_DATE_ISO,
    turnOffAt: FALLBACK_TURN_OFF_AT,
    recurring: true,
    title: 'Summer Bootcamp for AI Powered Graphic Design Program',
    backgroundStyle: 'ember',
    backgroundImage: '',
    cardImage: '',
    level: 'Beginner',
    badge: 'Summer Bootcamp 2026',
    category: 'AI Powered Graphic Design',
    hook: 'Turn your summer into creativity with AI-powered graphic design.',
    description:
      'A summer bootcamp designed for students and beginners who want to learn graphic design with modern AI tools, practical projects, and portfolio-ready output through online or offline learning.',
    date: FALLBACK_EVENT_DATE_LABEL,
    time: 'Flexible batch timings',
    mode: 'Online & Offline Available',
    price: 6999,
    originalPrice: 9999,
    discountLabel: 'Summer Offer',
    seatsTotal: 50,
    seatsTaken: 0,
    outcomes: [
      { title: 'Design Basics', description: 'Layout, hierarchy, color, and composition fundamentals.' },
      { title: 'Adobe Tools', description: 'Photoshop and Illustrator foundations for beginners.' },
      { title: 'AI Workflows', description: 'Use AI tools to speed up concepts, moodboards, and ideation.' },
      { title: 'Marketing Creatives', description: 'Build social posts, posters, and marketing creatives from scratch.' },
      { title: 'Branding Basics', description: 'Logos, typography, and visual identity thinking.' },
      { title: 'Portfolio Building', description: 'Build a portfolio with real project feedback and a final showcase.' },
    ],
    modules: [
      { title: 'Graphic design basics: layout, hierarchy, color, and composition', duration: 'Module 1' },
      { title: 'Adobe Photoshop and Illustrator foundations for beginners', duration: 'Module 2' },
      { title: 'Using AI tools to speed up concepts, moodboards, and creative ideation', duration: 'Module 3' },
      { title: 'Social media posts, posters, and marketing creatives from scratch', duration: 'Module 4' },
      { title: 'Branding basics: logos, typography, and visual identity thinking', duration: 'Module 5' },
      { title: 'Portfolio building, project feedback, and final showcase', duration: 'Module 6' },
    ],
    includes: [
      { label: 'Bootcamp mode', value: 'Online / Offline' },
      { label: 'Program access', value: 'Summer batch' },
      { label: 'Certificate', value: 'Included' },
      { label: 'AI workflow', value: 'Hands-on' },
      { label: 'Portfolio pieces', value: 'Multiple' },
      { label: 'Mentor support', value: 'Guided' },
    ],
    instructor: {
      name: 'TSDC Design Team',
      role: 'Graphic Design & AI Mentors',
      credibility:
        'Learn with mentors who combine practical graphic design training with current AI workflows, so you build both creative confidence and job-relevant output.',
    },
    audience: [
      'School and college students looking for a creative summer skill program',
      'Beginners who want to start graphic design without feeling overwhelmed',
      'Aspiring freelancers who want faster design workflows using AI tools',
      'Anyone who wants to create posters, social posts, branding assets, and portfolio projects',
    ],
    faqs: [
      'Is this beginner-friendly?',
      'Can I join online or offline?',
      'Will AI tools be taught practically?',
      'Do I get a certificate and portfolio guidance?',
    ],
    whatsappLink: 'https://wa.me/919566656909',
  },
]

/** IDs of the two masterclasses that alternate between the 1st-weekend and
 *  mid-month-weekend Sunday slots. Odd calendar months: LOGO gets the 1st
 *  weekend, BOOTCAMP gets the mid-month weekend. Even months: swapped.
 *  This is derived purely from calendar month parity (no stored cursor),
 *  so re-running it is always consistent and can't drift out of sync. */
const RECURRING_MASTERCLASS_IDS = {
  LOGO: 'logo-design-masterclass',
  BOOTCAMP: 'summer-bootcamp-ai-powered-graphic-design-program',
} as const

const getFirstSundayUTC = (year: number, monthIndex0: number) => {
  const firstOfMonth = new Date(Date.UTC(year, monthIndex0, 1))
  const offset = (7 - firstOfMonth.getUTCDay()) % 7
  return new Date(Date.UTC(year, monthIndex0, 1 + offset))
}

const getMidSundayUTC = (year: number, monthIndex0: number) => {
  // The unique Sunday in days 12-18 is always "the weekend nearest the 15th".
  for (let day = 12; day <= 18; day++) {
    const candidate = new Date(Date.UTC(year, monthIndex0, day))
    if (candidate.getUTCDay() === 0) return candidate
  }
  throw new Error(`No Sunday found in mid-month window for ${year}-${monthIndex0 + 1}`)
}

const getRecurringSlotForMonth = (masterclassId: string, monthIndex0: number): 'first' | 'mid' => {
  const isOddMonth = (monthIndex0 + 1) % 2 === 1
  if (masterclassId === RECURRING_MASTERCLASS_IDS.BOOTCAMP) return isOddMonth ? 'mid' : 'first'
  return isOddMonth ? 'first' : 'mid'
}

/** Next Sunday (strictly after `after`) that this masterclass's alternating
 *  monthly slot lands on. Used both for the one-time data fix and for the
 *  auto-turnoff cron's rollover-to-next-session logic. */
export const getNextRecurringSessionDate = (masterclassId: string, after: Date = new Date()) => {
  let year = after.getUTCFullYear()
  let monthIndex0 = after.getUTCMonth()

  for (let i = 0; i < 24; i++) {
    const slot = getRecurringSlotForMonth(masterclassId, monthIndex0)
    const candidate = slot === 'first' ? getFirstSundayUTC(year, monthIndex0) : getMidSundayUTC(year, monthIndex0)

    if (candidate.getTime() > after.getTime()) return candidate

    monthIndex0 += 1
    if (monthIndex0 > 11) {
      monthIndex0 = 0
      year += 1
    }
  }

  throw new Error(`Could not compute next recurring session date for ${masterclassId}`)
}

const IST_OFFSET_MINUTES = 330

/** 10:00 PM IST the day before the session date — matches isMasterclassPastTurnOffAt. */
export const computeTurnOffAt = (sessionDateUTC: Date) => {
  const cutoffUtcMs =
    Date.UTC(
      sessionDateUTC.getUTCFullYear(),
      sessionDateUTC.getUTCMonth(),
      sessionDateUTC.getUTCDate() - 1,
      22,
      0,
      0
    ) - IST_OFFSET_MINUTES * 60000
  return new Date(cutoffUtcMs).toISOString()
}

export const formatMasterclassDisplayDate = (sessionDateUTC: Date) =>
  sessionDateUTC.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric', timeZone: 'UTC' })

export const formatPrice = (price: number) => `Rs ${price.toLocaleString('en-IN')}/-`

const parseDateTime = (value?: string) => {
  if (!value) return null
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

const getMasterclassKey = (masterclass: Pick<Masterclass, 'id' | 'slug'>) => `${masterclass.id}::${masterclass.slug}`

const loadDeletedMasterclassKeys = () => {
  if (typeof window === 'undefined') return new Set<string>()

  try {
    const stored = window.localStorage.getItem(MASTERCLASS_DELETED_KEY)
    if (!stored) return new Set<string>()
    return new Set(JSON.parse(stored) as string[])
  } catch {
    return new Set<string>()
  }
}

const persistDeletedMasterclassKeys = (keys: Set<string>) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(MASTERCLASS_DELETED_KEY, JSON.stringify(Array.from(keys)))
}

export const mergeMasterclasses = (storedMasterclasses: Masterclass[] = []) => {
  const merged = new Map<string, Masterclass>()
  const deletedKeys = loadDeletedMasterclassKeys()

  defaultMasterclasses.forEach((masterclass) => {
    if (deletedKeys.has(getMasterclassKey(masterclass))) return
    merged.set(getMasterclassKey(masterclass), masterclass)
  })

  storedMasterclasses.forEach((masterclass) => {
    if (deletedKeys.has(getMasterclassKey(masterclass))) return
    merged.set(getMasterclassKey(masterclass), masterclass)
  })

  return Array.from(merged.values())
}

export const loadMasterclasses = () => {
  if (typeof window === 'undefined') return defaultMasterclasses

  try {
    const stored = window.localStorage.getItem(MASTERCLASS_STORAGE_KEY)
    if (!stored) return defaultMasterclasses

    const parsed = JSON.parse(stored) as Masterclass[]
    return mergeMasterclasses(parsed)
  } catch {
    return defaultMasterclasses
  }
}

export const persistMasterclasses = (masterclasses: Masterclass[]) => {
  if (typeof window === 'undefined') return
  const deletedKeys = loadDeletedMasterclassKeys()
  masterclasses.forEach((masterclass) => deletedKeys.delete(getMasterclassKey(masterclass)))
  persistDeletedMasterclassKeys(deletedKeys)
  window.localStorage.setItem(MASTERCLASS_STORAGE_KEY, JSON.stringify(mergeMasterclasses(masterclasses)))
}

export const deleteMasterclass = (masterclass: Pick<Masterclass, 'id' | 'slug'>, masterclasses: Masterclass[]) => {
  if (typeof window === 'undefined') return masterclasses.filter((item) => item.id !== masterclass.id)

  const nextMasterclasses = masterclasses.filter((item) => item.id !== masterclass.id)
  const deletedKeys = loadDeletedMasterclassKeys()
  deletedKeys.add(getMasterclassKey(masterclass))
  persistDeletedMasterclassKeys(deletedKeys)
  window.localStorage.setItem(MASTERCLASS_STORAGE_KEY, JSON.stringify(nextMasterclasses))
  return nextMasterclasses
}

const parseIsoDate = (value?: string) => {
  if (!value) return null

  const parts = value.split('-').map(Number)
  if (parts.length !== 3 || parts.some((part) => Number.isNaN(part))) return null

  const [year, month, day] = parts
  return new Date(year, month - 1, day)
}

export const getMasterclassDaysUntil = (masterclass: Pick<Masterclass, 'eventDate'>, now = new Date()) => {
  const target = parseIsoDate(masterclass.eventDate)
  if (!target) return null

  const today = new Date(now)
  today.setHours(0, 0, 0, 0)
  target.setHours(0, 0, 0, 0)

  return Math.round((target.getTime() - today.getTime()) / 86400000)
}

export const isMasterclassPastTurnOffAt = (
  masterclass: Pick<Masterclass, 'turnOffAt'>,
  now = new Date()
) => {
  const turnOffAt = parseDateTime(masterclass.turnOffAt)
  if (!turnOffAt) return false
  return turnOffAt.getTime() <= now.getTime()
}

export const isMasterclassVisibleOnLiveSite = (
  masterclass: Pick<Masterclass, 'status' | 'turnOffAt'>,
  now = new Date()
) => masterclass.status === 'live' && !isMasterclassPastTurnOffAt(masterclass, now)

export const fetchMasterclasses = async () => {
  if (typeof window === 'undefined') return defaultMasterclasses

  try {
    const response = await fetch('/api/masterclasses', { cache: 'no-store' })
    if (!response.ok) {
      const payload = (await response.json().catch(() => ({}))) as { error?: string }
      throw new Error(payload.error || `Failed to fetch masterclasses: ${response.status}`)
    }

    const payload = (await response.json()) as { masterclasses?: Masterclass[] }
    const items = Array.isArray(payload.masterclasses) ? mergeMasterclasses(payload.masterclasses) : defaultMasterclasses
    persistMasterclasses(items)
    return items
  } catch (error) {
    console.error('[fetchMasterclasses] falling back to local cache:', error)
    return loadMasterclasses()
  }
}

export const saveMasterclassesToApi = async (masterclasses: Masterclass[]) => {
  const response = await fetch('/api/masterclasses', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ masterclasses }),
  })

  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as { error?: string }
    throw new Error(payload.error || `Failed to save masterclasses: ${response.status}`)
  }

  const payload = (await response.json()) as { masterclasses?: Masterclass[] }
  const items = Array.isArray(payload.masterclasses) ? mergeMasterclasses(payload.masterclasses) : mergeMasterclasses(masterclasses)
  persistMasterclasses(items)
  return items
}

export const fetchMasterclassPageContent = async (): Promise<MasterclassPageContent> => {
  if (typeof window === 'undefined') return defaultMasterclassPageContent

  try {
    const response = await fetch('/api/masterclasses/page-content', { cache: 'no-store' })
    if (!response.ok) throw new Error(`Failed to fetch masterclasses page content: ${response.status}`)

    const payload = (await response.json()) as { content?: MasterclassPageContent }
    return payload.content || defaultMasterclassPageContent
  } catch (error) {
    console.error('[fetchMasterclassPageContent] falling back to default:', error)
    return defaultMasterclassPageContent
  }
}

export const saveMasterclassPageContentToApi = async (content: MasterclassPageContent) => {
  const response = await fetch('/api/masterclasses/page-content', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  })

  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as { error?: string }
    throw new Error(payload.error || `Failed to save masterclasses page content: ${response.status}`)
  }

  const payload = (await response.json()) as { content?: MasterclassPageContent }
  return payload.content || content
}

export const masterclassBackgrounds = {
  midnight:
    'bg-[radial-gradient(circle_at_20%_0%,rgba(250,138,67,0.28),transparent_32%),radial-gradient(circle_at_78%_10%,rgba(69,98,176,0.32),transparent_34%),linear-gradient(180deg,#070707_0%,#000_62%,#0d0b16_100%)]',
  blueprint:
    'bg-[radial-gradient(circle_at_16%_0%,rgba(129,179,255,0.34),transparent_32%),radial-gradient(circle_at_82%_12%,rgba(69,98,176,0.45),transparent_36%),linear-gradient(180deg,#061122_0%,#02050d_68%,#080b18_100%)]',
  ember:
    'bg-[radial-gradient(circle_at_18%_0%,rgba(250,138,67,0.48),transparent_34%),radial-gradient(circle_at_80%_12%,rgba(234,104,101,0.35),transparent_34%),linear-gradient(180deg,#180905_0%,#050000_66%,#120604_100%)]',
  violet:
    'bg-[radial-gradient(circle_at_20%_0%,rgba(126,87,255,0.42),transparent_34%),radial-gradient(circle_at_78%_12%,rgba(234,104,101,0.28),transparent_34%),linear-gradient(180deg,#120824_0%,#030108_66%,#100719_100%)]',
}

export const getMasterclassBackgroundClass = (style?: Masterclass['backgroundStyle']) =>
  masterclassBackgrounds[style || 'midnight'] || masterclassBackgrounds.midnight
