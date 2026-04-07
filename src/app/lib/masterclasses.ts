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

export const defaultMasterclasses: Masterclass[] = [
  {
    id: 'logo-design-masterclass',
    slug: 'logo-masterclass',
    status: 'live',
    title: 'Logo Design Masterclass',
    backgroundStyle: 'midnight',
    backgroundImage: '',
    badge: 'Live Online Masterclass',
    category: 'Logo Design',
    hook: 'Build logos that actually get remembered',
    description:
      'A 1-day intensive masterclass on logo design: theory, process, tools, and real practice for students, freelancers, and business owners.',
    date: 'Next Sunday',
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
]

export const formatPrice = (price: number) => `Rs. ${price.toLocaleString('en-IN')}`

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
