export type HomepageProgram = {
  name: string
  href: string
  image: string
  description: string
  tools: string
  accentClass: string
}

export type HomepageBenefit = { title: string; description: string }
export type HomepageStudentProject = { title: string; image: string }
export type HomepageStat = { value: string; label: string }

export type HomepageContentData = {
  hero: {
    kicker: string
    titleLine1: string
    titleHighlight: string
    description: string
    primaryCtaLabel: string
    secondaryCtaLabel: string
    checklist: string[]
    heroBgImage: string
    heroImage: string
  }
  stats: HomepageStat[]
  programsSection: {
    eyebrow: string
    heading: string
    description: string
    programs: HomepageProgram[]
  }
  skills: {
    image: string
    headingBold: string
    headingRest: string
    description: string
    checklist: string[]
  }
  whyLearn: {
    eyebrow: string
    benefits: HomepageBenefit[]
  }
  methodology: {
    eyebrow: string
    steps: string[]
    description: string
    ctaLabel: string
  }
  studentProjects: {
    eyebrow: string
    heading: string
    viewAllLabel: string
    projects: HomepageStudentProject[]
  }
  finalCta: {
    masterclassHeading: string
    masterclassDescription: string
    masterclassLinkLabel: string
    counsellingHeading: string
    counsellingDescription: string
    counsellingButtonLabel: string
    visualImage: string
    visualChecklist: string[]
  }
  tools: {
    heading: string
    items: string[]
  }
}

export const defaultHomepageContent: HomepageContentData = {
  hero: {
    kicker: 'Career-focused skill development',
    titleLine1: "Don't Just Learn a Skill.",
    titleHighlight: 'Learn How Professionals Work.',
    description:
      'Build practical, career-ready skills through live training, industry-oriented projects, portfolio development and AI-powered workflows.',
    primaryCtaLabel: 'Explore Courses',
    secondaryCtaLabel: 'Book Free Counselling',
    checklist: ['Live Classes', 'Practical Projects', 'Portfolio Development', 'AI-Powered Learning'],
    heroBgImage: '/TSDC%20Classroom.png',
    heroImage: '/TSDC%20Classroom.png',
  },
  stats: [
    { value: '300+', label: 'Students Trained' },
    { value: '20+', label: 'Live Projects' },
    { value: '10+', label: 'Industry Experts' },
    { value: '4', label: 'Career Courses' },
    { value: '100%', label: 'Practical Learning' },
    { value: 'Ongoing', label: 'Career Support' },
  ],
  programsSection: {
    eyebrow: 'Our Programs',
    heading: 'Choose the Skill You Want to Master',
    description: 'Industry-focused programs designed to help you build real skills and real-world portfolios.',
    programs: [
      {
        name: 'Graphic Design',
        href: '/courses/graphic-design',
        image: '/Graphic%20Design.png',
        description: 'Learn visual communication, branding, advertising and creative design.',
        tools: 'Ps  Ai  Id',
        accentClass: 'program-navy',
      },
      {
        name: 'UI/UX Design',
        href: '/courses/uiux-design',
        image: '/UIUX%20Design.png',
        description: 'Learn user research, UI design, prototyping and design systems.',
        tools: 'Figma',
        accentClass: 'program-violet',
      },
      {
        name: 'Digital Marketing',
        href: '/courses/digital-marketing',
        image: '/Digital_marketing.png',
        description: 'Learn SEO, social media, ads, analytics and AI-powered marketing.',
        tools: 'Google  Meta  Analytics',
        accentClass: 'program-green',
      },
      {
        name: 'Video Editing',
        href: '/courses/video-editing',
        image: '/Digital_marketing.png',
        description: 'Learn professional editing, motion graphics and content creation.',
        tools: 'Pr  Ae',
        accentClass: 'program-orange',
      },
    ],
  },
  skills: {
    image: '/our-story.png',
    headingBold: 'SKILLS',
    headingRest: '> DEGREE',
    description:
      'TSDC focuses on developing practical skills, projects and portfolios that help learners demonstrate their capabilities.',
    checklist: ['Build Practical Skills', 'Work on Real Projects', 'Create a Strong Portfolio'],
  },
  whyLearn: {
    eyebrow: 'Why learn at TSDC?',
    benefits: [
      { title: 'Live Classes', description: 'Learn directly with trainers' },
      { title: 'Practical Learning', description: 'Hands-on assignments & projects' },
      { title: 'Industry Projects', description: 'Work on real-world industry briefs' },
      { title: 'Portfolio Development', description: 'Build a professional portfolio' },
      { title: 'AI-Powered Workflow', description: 'Learn modern tools & AI integration' },
      { title: 'Career Preparation', description: 'Guidance for portfolio and interviews' },
    ],
  },
  methodology: {
    eyebrow: 'Our learning methodology',
    steps: ['Learn', 'Practice', 'Build', 'Showcase', 'Prepare', 'Grow'],
    description: 'A step-by-step approach to transform your learning into a career.',
    ctaLabel: 'Know Our Methodology',
  },
  studentProjects: {
    eyebrow: 'Student Projects',
    heading: "Don't Just Watch. Build.",
    viewAllLabel: 'View All Projects',
    projects: [
      { title: 'Brand Identity Design', image: '/Logo%20Design%20Samples.png' },
      { title: 'Mobile App Design', image: '/UIUXDesign.png' },
      { title: 'Social Media Campaign', image: '/marketing.png' },
      { title: 'Cinematic Promo Edit', image: '/Digital_marketing.png' },
    ],
  },
  finalCta: {
    masterclassHeading: 'Not Sure Yet?\nExperience TSDC First.',
    masterclassDescription: 'Join our ₹99 Masterclass and explore your career possibilities.',
    masterclassLinkLabel: 'View Masterclasses',
    counsellingHeading: 'Confused About Your\nCareer Path?',
    counsellingDescription: 'Talk to our career experts and get the right guidance for your future.',
    counsellingButtonLabel: 'Book Free Counselling',
    visualImage: '/Mindspace.png',
    visualChecklist: ['Career Guidance', 'Course Recommendation', 'Goal Planning', 'Growth Roadmap'],
  },
  tools: {
    heading: 'Tools & Technologies We Teach',
    items: ['Ps', 'Ai', 'Id', 'Figma', 'Pr', 'Ae', 'Canva', 'Google Ads', 'Meta', 'Analytics'],
  },
}

export const fetchHomepageContent = async (): Promise<HomepageContentData> => {
  try {
    const response = await fetch('/api/content/homepage', { cache: 'no-store' })
    if (!response.ok) throw new Error(`Failed to fetch homepage content: ${response.status}`)
    const payload = (await response.json()) as { value?: HomepageContentData }
    return payload.value ?? defaultHomepageContent
  } catch (error) {
    console.error('[fetchHomepageContent] falling back to default:', error)
    return defaultHomepageContent
  }
}
