export type ScholarshipTier = { pct: string; label: string; bg: string }
export type ScholarshipFeature = { emoji: string; title: string; sub: string }
export type ScholarshipStep = { title: string; description: string }
export type ScholarshipFaq = { question: string; answer: string }

export type ScholarshipPageContent = {
  campaignTitle: string
  deadline: string
  deadlineLabel: string
  demoSlots: string[]
  registrationFee: number
  hero: {
    badge: string
    titleLine1: string
    titleHighlight: string
    titleLine3: string
    description: string
    heroImage: string
  }
  tiers: ScholarshipTier[]
  features: ScholarshipFeature[]
  formCard: {
    feeLabel: string
    feeSubtext: string
    trustBadges: string[]
  }
  process: {
    eyebrow: string
    heading: string
    steps: ScholarshipStep[]
  }
  faqSection: {
    eyebrow: string
    heading: string
    faqs: ScholarshipFaq[]
  }
  stickyBarLabel: string
}

export const defaultScholarshipPage: ScholarshipPageContent = {
  campaignTitle: 'Graphic Design Scholarship and Demo Class 2026',
  deadline: '2026-05-09T23:59:00+05:30',
  deadlineLabel: 'May 9th, 2026',
  demoSlots: ['May 10, 2026 - 11:00 AM', 'May 11, 2026 - 4:00 PM', 'May 12, 2026 - 11:00 AM', 'May 13, 2026 - 4:00 PM'],
  registrationFee: 99,
  hero: {
    badge: 'Scholarship 2026 · Limited Seats',
    titleLine1: 'Learn design.',
    titleHighlight: 'Win a scholarship.',
    titleLine3: 'Start at just ₹99.',
    description:
      'Attend a free demo class, take the scholarship assessment, and earn up to 100% fee waiver on our Graphic Design course.',
    heroImage: '/correct%20may%202nd.jpg.jpeg',
  },
  tiers: [
    { pct: '100%', label: 'Top performer', bg: 'bg-[#fef9c3] text-[#713f12] border-[#fde68a]' },
    { pct: '50%', label: 'Top 10 students', bg: 'bg-[#dcfce7] text-[#14532d] border-[#86efac]' },
    { pct: '25%', label: 'All selected', bg: 'bg-[#dbeafe] text-[#1e3a8a] border-[#93c5fd]' },
  ],
  features: [
    { emoji: '🎓', title: 'Free demo class', sub: 'See the course live' },
    { emoji: '📋', title: 'Scholarship test', sub: 'Creative evaluation' },
    { emoji: '🏆', title: 'Scholarship result', sub: 'Guidance + next step' },
  ],
  formCard: {
    feeLabel: 'One-time registration fee',
    feeSubtext: 'Demo class + scholarship evaluation included',
    trustBadges: ['Instant WhatsApp confirmation', 'Safe Razorpay checkout'],
  },
  process: {
    eyebrow: 'Simple process',
    heading: 'From registration to result.',
    steps: [
      { title: 'Register your slot', description: 'Fill the form and pay Rs 99/- to lock your scholarship evaluation spot.' },
      { title: 'Attend the demo class', description: 'Get your slot details and joining instructions on WhatsApp and email.' },
      { title: 'Take the scholarship test', description: 'A guided creative assessment measuring design thinking and curiosity.' },
      { title: 'Get your result', description: 'Scholarship outcome, fee guidance, and next steps directly from TSDC.' },
    ],
  },
  faqSection: {
    eyebrow: 'Questions answered',
    heading: 'Got questions?',
    faqs: [
      { question: 'What does the Rs 99/- cover?', answer: 'It confirms your scholarship registration, demo class slot, and assessment entry for this campaign.' },
      { question: 'Will I get the scholarship result on the same day?', answer: 'We follow up after the demo class and scholarship assessment with your result and admission guidance.' },
      { question: 'Is this for beginners?', answer: 'Yes. The offer is designed for students and beginners who want to build a creative career in graphic design.' },
      { question: 'Will I get details after I register?', answer: 'Yes. Demo class confirmation, exam format, and next-step instructions are sent after payment.' },
    ],
  },
  stickyBarLabel: 'Reserve Your Slot',
}

export const fetchScholarshipPage = async (): Promise<ScholarshipPageContent> => {
  try {
    const response = await fetch('/api/content/scholarshipPage', { cache: 'no-store' })
    if (!response.ok) throw new Error(`Failed to fetch scholarship page: ${response.status}`)
    const payload = (await response.json()) as { value?: ScholarshipPageContent }
    return payload.value ?? defaultScholarshipPage
  } catch (error) {
    console.error('[fetchScholarshipPage] falling back to default:', error)
    return defaultScholarshipPage
  }
}
