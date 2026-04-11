export type HeroTrack = {
  title: string
  accent: string
  line: string
}

export type SiteStat = {
  value: string
  label: string
}

export type SiteLink = {
  name: string
  href: string
}

export type SiteSectionConfig = {
  id: string
  label: string
  enabled: boolean
}

export type HomepageSectionId = 'hero' | 'why-tsdc' | 'masterclasses' | 'courses' | 'batch-schedule' | 'journey'

export type CourseCard = {
  title: string
  role: string
  tagline: string
  duration: string
  skills: string[]
  careerPath: string
  bonus: string
  accent: string
  link: string
  bg: string
}

export type BatchEntry = {
  course: string
  accent: string
  icon: string                       // emoji icon for visual scanning
  startDate: string                  // e.g. "May 5, 2025"
  duration: string                   // e.g. "12 Weeks"
  mode: string                       // "Offline / Hybrid"
  fee: string                        // e.g. "₹18,000"
  emi: string                        // e.g. "₹6,000 × 3 months"
  seatsTotal: number
  seatsTaken: number
  status: 'open' | 'filling' | 'starting-soon' | 'full'
  link: string
}

export type SiteContent = {
  homepage: {
    sections: SiteSectionConfig[]
  }
  hero: {
    badge: string
    title: string
    highlight: string
    description: string
    primaryCta: string
    secondaryCta: string
    checklist: string[]
    stats: SiteStat[]
    panelEyebrow: string
    panelTitle: string
    panelHighlight: string
    panelDescription: string
    tracks: HeroTrack[]
  }
  whyTsdc: {
    badge: string
    title: string
    highlight: string
    description: string
    outcomesTitle: string
    outcomes: string[]
    features: { title: string; description: string; support: string; accent: string; tint: string }[]
    ctaLabel: string
  }
  coursesSection: {
    badge: string
    title: string
    highlight: string
    description: string
    courses: CourseCard[]
  }
  batchSchedule: {
    badge: string
    title: string
    highlight: string
    description: string
    batches: BatchEntry[]
    noteText: string
  }
  footer: {
    description: string
    pillText: string
    socialLinks: SiteLink[]
    contactEmail: string
    contactPhone: string
    contactHours: string
    addressLines: string[]
    copyrightLine: string
  }
  contact: {
    badge: string
    title: string
    highlight: string
    description: string
    stats: SiteStat[]
    quickActions: {
      title: string
      text: string
      accent: string
      popupTitle: string
      popupSubtitle: string
      interest: string
      source: string
      ctaLabel: string
    }[]
    supportEyebrow: string
    supportTitle: string
    supportDescription: string
    supportCards: { title: string; text: string; color: string }[]
    mapTitle: string
    mapPhone: string
    mapButtonLabel: string
    launchCardEyebrow: string
    launchCardTitle: string
    launchCardDescription: string
    popupPrimary: { title: string; subtitle: string; interest: string; source: string; ctaLabel: string }
    popupCounselling: { title: string; subtitle: string; interest: string; source: string; ctaLabel: string }
    mapEmbedUrl: string
  }
}

export const SITE_CONTENT_STORAGE_KEY = 'tsdc-site-content-v1'
export const SITE_CONTENT_UPDATED_EVENT = 'tsdc-site-content-updated'

export const homepageSectionCatalog: SiteSectionConfig[] = [
  { id: 'hero',             label: 'Hero',             enabled: true  },
  { id: 'why-tsdc',         label: 'Why TSDC',         enabled: true  },
  { id: 'masterclasses',    label: 'Masterclasses',    enabled: true  },
  { id: 'courses',          label: 'Courses',          enabled: true  },
  { id: 'batch-schedule',   label: 'Batch Schedule',   enabled: true  },
  { id: 'journey',          label: 'Journey Timeline', enabled: false },
]

export const defaultSiteContent: SiteContent = {
  homepage: {
    sections: homepageSectionCatalog,
  },

  hero: {
    badge: 'Best Creative Institute in Chennai',
    title: 'Learn creative skills that',
    highlight: 'get you hired.',
    description:
      "TSDC is Chennai's hands-on creative career institute. Real projects, portfolio building, and mentor feedback — designed to get you job-ready fast.",
    primaryCta: 'Explore Courses',
    secondaryCta: 'Free Counselling',
    checklist: ['Live client projects', 'Portfolio-first', '1:1 mentorship', 'Placement support'],
    stats: [
      { value: '1500+', label: 'Students launched' },
      { value: '95%',   label: 'Career outcomes'   },
      { value: 'ISO',   label: 'Certified institute'},
      { value: '4.9/5', label: 'Student love'       },
    ],
    panelEyebrow:      'Chennai Creative Career Hub',
    panelTitle:        'Build a portfolio that looks',
    panelHighlight:    'worth hiring.',
    panelDescription:
      'Learn with structured projects, internship-style feedback, and practical briefs designed to make your work stand out to employers and clients.',
    tracks: [
      { title: 'Graphic Design',    accent: '#fa8a43', line: 'Branding, posters, social creatives'   },
      { title: 'UI/UX Design',      accent: '#4562b0', line: 'Figma, product thinking, portfolio'    },
      { title: 'Digital Marketing', accent: '#ea6865', line: 'SEO, Meta Ads, Google Ads, growth'    },
      { title: 'Video Editing',     accent: '#4a4a99', line: 'Premiere Pro, reels, ads, motion'     },
    ],
  },

  whyTsdc: {
    badge: 'Why students choose TSDC in Chennai',
    title: 'The institute experience feels',
    highlight: 'clearer, brighter, and more career-focused.',
    description:
      'Students join TSDC for practical work, real mentorship, stronger portfolios, and a clearer path into creative jobs — not just a classroom experience.',
    outcomesTitle: 'What you walk away with',
    outcomes: [
      'A portfolio of real work you can show employers and clients — not just a certificate.',
      'Hands-on skills from live projects, industry briefs, and mentor-reviewed feedback.',
      'A clear next step: placement support, freelance confidence, and a career direction that sticks.',
    ],
    features: [
      {
        title: 'Beginner-friendly by design',
        description: 'Start from zero and build a polished portfolio with structure, clarity, and guided momentum — no prior experience required.',
        support: 'No degree required',
        accent: '#ff9736',
        tint: '#fff1dd',
      },
      {
        title: 'Job-ready practical training',
        description: 'The learning mirrors real studio, startup, and agency work so you build the confidence employers actually look for.',
        support: 'Industry-style assignments',
        accent: '#3244b5',
        tint: '#eef1ff',
      },
      {
        title: 'Mentors who push quality',
        description: 'Get direct feedback, practical corrections, and portfolio review support — not just recorded videos left to watch alone.',
        support: '1:1 growth feedback',
        accent: '#ef6b63',
        tint: '#fff1ee',
      },
      {
        title: 'A confidence upgrade',
        description: 'The real outcome is better work, clearer thinking, and visible proof of creative ability you can show anyone.',
        support: 'Results you can show',
        accent: '#db4b87',
        tint: '#fff1f7',
      },
    ],
    ctaLabel: 'View All Job-Ready Courses',
  },

  coursesSection: {
    badge: 'High-demand creative career courses',
    title: 'Choose the course that turns',
    highlight: 'interest into income.',
    description:
      'Four in-demand creative skills. Real projects, portfolio building, and mentor guidance — designed for students in Chennai ready to make their move.',
    courses: [
      {
        title: 'Graphic Design',
        role: 'Brand and visual design path',
        tagline: 'Learn Photoshop, Illustrator, and real-world design thinking.',
        duration: '12 Weeks',
        skills: ['Branding', 'Typography', 'Social creatives'],
        careerPath: 'Graphic Designer | Brand Designer | Freelancer',
        bonus: 'Live brand projects + portfolio support',
        accent: '#fa8a43',
        link: '/courses/graphic-design',
        bg: '#fff4eb',
      },
      {
        title: 'UI/UX Design',
        role: 'Product and interface design path',
        tagline: 'Build app and web experiences with Figma and UX thinking.',
        duration: '10 Weeks',
        skills: ['Figma', 'UX Research', 'Design Systems'],
        careerPath: 'UI Designer | Product Designer | Freelancer',
        bonus: 'Portfolio case studies + product projects',
        accent: '#4562b0',
        link: '/courses/uiux-design',
        bg: '#eef4ff',
      },
      {
        title: 'Digital Marketing',
        role: 'Performance and growth path',
        tagline: 'Master SEO, paid ads, analytics, and campaign strategy.',
        duration: '8 Weeks',
        skills: ['Google Ads', 'Meta Ads', 'SEO'],
        careerPath: 'Digital Marketer | Growth Executive | Strategist',
        bonus: 'Live campaigns + practical growth training',
        accent: '#ea6865',
        link: '/courses/digital-marketing',
        bg: '#fff1f0',
      },
      {
        title: 'Video Editing',
        role: 'Editing and motion path',
        tagline: 'Create reels, ads, and polished video content with pro tools.',
        duration: '12 Weeks',
        skills: ['Premiere Pro', 'After Effects', 'DaVinci'],
        careerPath: 'Video Editor | Content Creator | Motion Designer',
        bonus: 'Showreel building + commercial edits',
        accent: '#4a4a99',
        link: '/courses/video-editing',
        bg: '#f2f0ff',
      },
    ],
  },

  batchSchedule: {
    badge: 'Upcoming batches — Chennai',
    title: 'See which batch',
    highlight: 'fits your schedule.',
    description:
      'All courses run in small batches so every student gets real attention. Check seat availability and join the upcoming batch that works for you.',
    noteText: 'Batches fill fast. Once a batch closes, the next opening is 4–6 weeks away. Secure your seat today.',
    batches: [
      {
        course: 'Graphic Design',
        accent: '#fa8a43',
        icon: '🎨',
        startDate: 'May 5, 2025',
        duration: '12 Weeks',
        mode: 'Offline / Hybrid',
        fee: '₹18,000',
        emi: '₹6,000 × 3 months',
        seatsTotal: 20,
        seatsTaken: 14,
        status: 'filling',
        link: '/courses/graphic-design',
      },
      {
        course: 'UI/UX Design',
        accent: '#4562b0',
        icon: '🖥️',
        startDate: 'May 12, 2025',
        duration: '10 Weeks',
        mode: 'Offline / Hybrid',
        fee: '₹20,000',
        emi: '₹10,000 × 2 months',
        seatsTotal: 15,
        seatsTaken: 8,
        status: 'open',
        link: '/courses/uiux-design',
      },
      {
        course: 'Digital Marketing',
        accent: '#ea6865',
        icon: '📣',
        startDate: 'May 8, 2025',
        duration: '8 Weeks',
        mode: 'Offline / Hybrid',
        fee: '₹15,000',
        emi: '₹7,500 × 2 months',
        seatsTotal: 20,
        seatsTaken: 20,
        status: 'full',
        link: '/courses/digital-marketing',
      },
      {
        course: 'Video Editing',
        accent: '#4a4a99',
        icon: '🎬',
        startDate: 'May 19, 2025',
        duration: '12 Weeks',
        mode: 'Offline / Hybrid',
        fee: '₹18,000',
        emi: '₹6,000 × 3 months',
        seatsTotal: 15,
        seatsTaken: 3,
        status: 'open',
        link: '/courses/video-editing',
      },
    ],
  },

  footer: {
    description:
      'TSDC is a hands-on creative career institute in Chennai, with practical training, real projects, portfolio building, and mentorship that helps students become more visible and employable.',
    pillText: 'Built for students who want real outcomes',
    socialLinks: [
      { name: 'Instagram', href: 'https://www.instagram.com/traijosdc_official/'                     },
      { name: 'Facebook',  href: 'https://www.facebook.com/Traijosdc'                                },
      { name: 'LinkedIn',  href: 'https://in.linkedin.com/company/traijoskilldevelopmentcenter'      },
    ],
    contactEmail: 'support@traijoedu.in',
    contactPhone: '+91-73581-16929',
    contactHours: 'Mon-Sat, 9AM - 6PM',
    addressLines: [
      'Villa 20, Block 52,',
      'Bollineni Hillside Rd, Nookampalayam,',
      'Perumbakkam, Chennai, Tamil Nadu 600131.',
    ],
    copyrightLine: 'Design | Marketing | Innovation',
  },

  contact: {
    badge: 'Contact TSDC Admissions',
    title: 'Start your creative career',
    highlight: 'with one conversation.',
    description:
      'Whether you want to pick the right course, understand fees, or know what a batch looks like day-to-day — our admissions team will walk you through everything clearly and quickly.',
    stats: [
      { value: '4 courses', label: 'Creative career tracks'  },
      { value: 'Same day',  label: 'Response time'           },
      { value: 'Free',      label: 'Counselling session'     },
    ],
    quickActions: [
      {
        title: 'General Enquiry',
        text: 'Ask about courses, fees, timings, and the best starting point for you.',
        accent: '#3244b5',
        popupTitle: 'Talk to TSDC Admissions',
        popupSubtitle: 'Share your details and we will help you choose the right course, batch, and next step.',
        interest: 'General Enquiry',
        source: 'contact-page-primary',
        ctaLabel: 'Send My Enquiry',
      },
      {
        title: 'Free Counselling',
        text: 'Get one-on-one guidance before you decide which creative path to take.',
        accent: '#ff9736',
        popupTitle: 'Book a Free Counselling Session',
        popupSubtitle: 'Tell us your current skill level and we will guide you toward the best course path.',
        interest: 'Free Counselling',
        source: 'contact-page-counselling',
        ctaLabel: 'Book My Session',
      },
      {
        title: 'Course Guidance',
        text: 'Tell us your goal and we will match you to the right design or marketing course.',
        accent: '#db4b87',
        popupTitle: 'Get Course Guidance',
        popupSubtitle: 'Tell us your goal and we will help you choose the right TSDC program.',
        interest: 'Course Guidance',
        source: 'contact-page-guidance',
        ctaLabel: 'Get My Guidance',
      },
    ],
    supportEyebrow: 'Admissions Support',
    supportTitle: 'Friendly support, zero pressure.',
    supportDescription:
      'You can call, WhatsApp, or email us and always reach a real person. We will help you understand fees, installment options, batch timings, and whether a course fits where you are right now.',
    supportCards: [
      {
        title: 'Course Guidance',
        text: 'Graphic Design, UI/UX, Digital Marketing, and Video Editing — we will help you pick the right one.',
        color: '#eef1ff',
      },
      {
        title: 'Same-day Response',
        text: 'Share your number and we will call or WhatsApp you back within the day.',
        color: '#fff4e7',
      },
      {
        title: 'Fee & EMI Plans',
        text: 'We offer easy 2–3 month installment plans so fees never block your start.',
        color: '#fff1f6',
      },
      {
        title: 'Placement Support',
        text: 'After the course, we actively help with portfolio reviews, referrals, and job preparation.',
        color: '#f7f8ff',
      },
    ],
    mapTitle: 'Traijo Skill Development Center',
    mapPhone: '+91 73581 16929',
    mapButtonLabel: 'Admissions Support',
    launchCardEyebrow: 'Quick Enquiry',
    launchCardTitle: 'Have a question? Let us answer it now.',
    launchCardDescription:
      'Fill in your details and our admissions team will get back to you the same day with answers on courses, fees, batch dates, and the next step.',
    popupPrimary: {
      title: 'Talk to TSDC Admissions',
      subtitle: 'Share your details and we will help you choose the right course, batch, and next step.',
      interest: 'General Enquiry',
      source: 'contact-page-primary',
      ctaLabel: 'Send My Enquiry',
    },
    popupCounselling: {
      title: 'Book a Free Counselling Session',
      subtitle: 'Tell us your current skill level and we will guide you toward the best course path.',
      interest: 'Free Counselling',
      source: 'contact-page-counselling',
      ctaLabel: 'Book My Session',
    },
    mapEmbedUrl: 'https://www.google.com/maps?q=12.8817134,80.2026107&z=17&output=embed',
  },
}

const mergeHomepageSections = (sections?: SiteSectionConfig[]) => {
  const merged = new Map<string, SiteSectionConfig>()
  defaultSiteContent.homepage.sections.forEach((section) => merged.set(section.id, section))
  sections?.forEach((section) => merged.set(section.id, section))
  return Array.from(merged.values())
}

export const mergeSiteContent = (parsed?: Partial<SiteContent>): SiteContent => ({
  ...defaultSiteContent,
  ...parsed,
  homepage: {
    ...defaultSiteContent.homepage,
    ...parsed?.homepage,
    sections: mergeHomepageSections(parsed?.homepage?.sections),
  },
  hero:           { ...defaultSiteContent.hero,           ...parsed?.hero           },
  whyTsdc:        { ...defaultSiteContent.whyTsdc,        ...parsed?.whyTsdc        },
  coursesSection: { ...defaultSiteContent.coursesSection, ...parsed?.coursesSection },
  batchSchedule:  { ...defaultSiteContent.batchSchedule,  ...parsed?.batchSchedule  },
  footer:         { ...defaultSiteContent.footer,         ...parsed?.footer         },
  contact:        { ...defaultSiteContent.contact,        ...parsed?.contact        },
})

export const loadSiteContent = () => {
  if (typeof window === 'undefined') return defaultSiteContent
  try {
    const stored = window.localStorage.getItem(SITE_CONTENT_STORAGE_KEY)
    if (!stored) return defaultSiteContent
    const parsed = JSON.parse(stored) as Partial<SiteContent>
    return mergeSiteContent(parsed)
  } catch {
    return defaultSiteContent
  }
}

export const persistSiteContent = (content: SiteContent) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(SITE_CONTENT_STORAGE_KEY, JSON.stringify(content))
  window.dispatchEvent(new Event(SITE_CONTENT_UPDATED_EVENT))
}
