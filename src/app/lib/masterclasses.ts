export type MasterclassModule = {
  title: string
  duration: string
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
  title: string
  backgroundStyle?: 'midnight' | 'blueprint' | 'ember' | 'violet'
  backgroundImage?: string
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

export const MASTERCLASS_STORAGE_KEY = 'tsdc-masterclasses-v1'
export const MASTERCLASS_DELETED_KEY = 'tsdc-masterclasses-deleted-v1'

export const defaultMasterclasses: Masterclass[] = [
  {
    id: 'logo-design-masterclass',
    slug: 'logo-masterclass',
    status: 'live',
    eventDate: '2026-04-20',
    turnOffAt: '2026-04-20T09:30:00.000Z',
    replacementMasterclassId: 'summer-bootcamp-ai-powered-graphic-design-program',
    title: 'Logo Design Masterclass',
    backgroundStyle: 'midnight',
    backgroundImage: '',
    badge: 'Live Online Masterclass',
    category: 'Logo Design',
    hook: 'Build logos that actually get remembered',
    description:
      'A 1-day intensive masterclass on logo design: theory, process, tools, and real practice for students, freelancers, and business owners.',
    date: 'April 20, 2026',
    time: '10:00 AM - 2:00 PM',
    mode: 'Online Zoom / Meet',
    price: 1999,
    originalPrice: 4999,
    discountLabel: '60% OFF',
    seatsTotal: 50,
    seatsTaken: 34,
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
    whatsappLink: 'https://wa.me/917358116929',
  },
  {
    id: 'summer-bootcamp-ai-powered-graphic-design-program',
    slug: 'summer-bootcamp-ai-graphic-design',
    status: 'live',
    eventDate: '2026-04-20',
    turnOffAt: '2026-04-20T09:30:00.000Z',
    title: 'Summer Bootcamp for AI Powered Graphic Design Program',
    backgroundStyle: 'ember',
    backgroundImage: '',
    badge: 'Summer Bootcamp 2026',
    category: 'AI Powered Graphic Design',
    hook: 'Turn your summer into creativity with AI-powered graphic design.',
    description:
      'A summer bootcamp designed for students and beginners who want to learn graphic design with modern AI tools, practical projects, and portfolio-ready output through online or offline learning.',
    date: 'April 20, 2026',
    time: 'Flexible batch timings',
    mode: 'Online & Offline Available',
    price: 6999,
    originalPrice: 9999,
    discountLabel: 'Summer Offer',
    seatsTotal: 40,
    seatsTaken: 18,
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
    whatsappLink: 'https://wa.me/917358116929',
  },
]

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
    if (!response.ok) throw new Error(`Failed to fetch masterclasses: ${response.status}`)
    const payload = (await response.json()) as { masterclasses?: Masterclass[] }
    return Array.isArray(payload.masterclasses) ? payload.masterclasses : defaultMasterclasses
  } catch {
    return defaultMasterclasses
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
  return Array.isArray(payload.masterclasses) ? payload.masterclasses : masterclasses
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

