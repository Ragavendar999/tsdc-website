export type LiveProject = {
  id: string
  title: string
  category: string
  description: string
  coverImage: string
  images: string[]
}

export type LiveProjectsContent = {
  hero: {
    eyebrow: string
    titleLine1: string
    titleHighlight: string
    subtitle: string
    heroImage: string
    exploreLinkLabel: string
    ctaLabel: string
  }
  stats: { value: string; label: string }[]
  filters: string[]
  projects: LiveProject[]
  portfolio: {
    image: string
    heading: string
    description: string
    checklist: string[]
  }
  process: { step: string; description: string }[]
  cta: {
    heading: string
    description: string
    buttonLabel: string
    exploreCoursesLabel: string
  }
}

export const defaultLiveProjects: LiveProjectsContent = {
  hero: {
    eyebrow: 'Real projects. Real learning.',
    titleLine1: 'Projects That',
    titleHighlight: 'Build Real Careers.',
    subtitle:
      'At TSDC, every project is a step towards industry readiness. Explore the work our students create and get inspired.',
    heroImage: '/Mindspace.png',
    exploreLinkLabel: 'Explore Student Work',
    ctaLabel: 'Start Your Project Journey',
  },
  stats: [
    { value: '100+', label: 'Student Projects' },
    { value: '20+', label: 'Live Project Partners' },
    { value: '10+', label: 'Industries Covered' },
    { value: '300+', label: 'Students Showcased' },
    { value: '100%', label: 'Practical Learning' },
    { value: 'Real', label: 'Portfolio Impact' },
  ],
  filters: ['All Projects', 'Graphic Design', 'UI/UX Design', 'Digital Marketing', 'Video Editing'],
  projects: [
    {
      id: 'finmate-finance-dashboard',
      title: 'FinMate - Finance Dashboard',
      category: 'UI/UX Design',
      description: 'A comprehensive dashboard for personal finance management.',
      coverImage: '/UIUX%20Design.png',
      images: [],
    },
    {
      id: 'avenue-brand-identity',
      title: 'Avenue - Brand Identity',
      category: 'Graphic Design',
      description: 'Complete brand identity design for a premium lifestyle brand.',
      coverImage: '/Graphic%20Design.png',
      images: [],
    },
    {
      id: 'ecopure-campaign',
      title: 'EcoPure - Campaign',
      category: 'Digital Marketing',
      description: 'Social media campaign built around a clear product story.',
      coverImage: '/Digital_marketing.png',
      images: [],
    },
    {
      id: 'travel-vlog-cinematic-edit',
      title: 'Travel Vlog - Cinematic Edit',
      category: 'Video Editing',
      description: 'Cinematic vlog edit with colour grading and sound design.',
      coverImage: '/TSDC%20Classroom.png',
      images: [],
    },
    {
      id: 'healthcare-mobile-app',
      title: 'HealthCare+ - Mobile App',
      category: 'UI/UX Design',
      description: 'UI/UX design for a healthcare app with appointment booking.',
      coverImage: '/UIUXDesign.png',
      images: [],
    },
    {
      id: 'brewlab-packaging-design',
      title: 'BrewLab - Packaging Design',
      category: 'Graphic Design',
      description: 'Packaging design for a premium specialty coffee brand.',
      coverImage: '/Logo%20Design%20Samples.png',
      images: [],
    },
    {
      id: 'eduboost-lead-campaign',
      title: 'EduBoost - Lead Campaign',
      category: 'Digital Marketing',
      description: 'Performance marketing campaign designed for qualified leads.',
      coverImage: '/marketing.png',
      images: [],
    },
    {
      id: 'product-promo-video',
      title: 'Product Promo Video',
      category: 'Video Editing',
      description: 'High-impact product promo video for an e-commerce brand.',
      coverImage: '/Motion%20Graphics.png',
      images: [],
    },
  ],
  portfolio: {
    image: '/our-story.png',
    heading: 'Your Project. Your Portfolio. Your Future.',
    description: 'Work on live projects, solve real problems and build a portfolio that gets you hired.',
    checklist: ['Mentor Guided Projects', 'Industry Relevant Tasks', 'Portfolio & Certification'],
  },
  process: [
    { step: '1. Understand', description: 'Understand the brief and objectives.' },
    { step: '2. Plan', description: 'Plan the strategy and user flow.' },
    { step: '3. Design / Build', description: 'Design, develop and bring ideas to life.' },
    { step: '4. Review', description: 'Get feedback and refine your work.' },
    { step: '5. Deliver', description: 'Deliver the final project with confidence.' },
  ],
  cta: {
    heading: 'Want to Work on Projects Like These?',
    description: 'Join TSDC and turn your ideas into industry-ready projects.',
    buttonLabel: 'Book Free Counselling',
    exploreCoursesLabel: 'Explore Courses',
  },
}

export const fetchLiveProjects = async (): Promise<LiveProjectsContent> => {
  try {
    const response = await fetch('/api/content/liveProjects', { cache: 'no-store' })
    if (!response.ok) throw new Error(`Failed to fetch live projects: ${response.status}`)
    const payload = (await response.json()) as { value?: LiveProjectsContent }
    return payload.value ?? defaultLiveProjects
  } catch (error) {
    console.error('[fetchLiveProjects] falling back to default:', error)
    return defaultLiveProjects
  }
}
