export type AboutStat = { value: string; label: string }
export type AboutValue = { title: string; description: string }
export type AboutTimelineItem = { title: string; description: string; year: string }
export type AboutTeamMember = { name: string; role: string; image: string }
export type AboutReview = { name: string; role: string; quote: string }

export type AboutPageContent = {
  hero: {
    eyebrow: string
    titleLine1: string
    titleHighlight: string
    description: string
    heroImage: string
    ctaLabel: string
  }
  stats: AboutStat[]
  journey: {
    eyebrow: string
    headingLine1: string
    headingHighlight: string
    description: string
    checklist: string[]
    timeline: AboutTimelineItem[]
  }
  values: {
    eyebrow: string
    heading: string
    items: AboutValue[]
  }
  people: {
    eyebrow: string
    heading: string
    team: AboutTeamMember[]
    asideImage: string
    asideHeading: string
    asideDescription: string
    asideCtaLabel: string
  }
  reviews: {
    eyebrow: string
    items: AboutReview[]
  }
  cta: {
    heading: string
    description: string
    buttonLabel: string
    exploreCoursesLabel: string
  }
}

export const defaultAboutPage: AboutPageContent = {
  hero: {
    eyebrow: 'About TSDC',
    titleLine1: 'Empowering Minds.',
    titleHighlight: 'Building Futures.',
    description:
      'TSDC is a career-focused skill development center dedicated to equipping students with practical skills, real-world experience, and industry exposure to help them build successful careers.',
    heroImage: '/TSDC%20Classroom.png',
    ctaLabel: 'Watch Our Story',
  },
  stats: [
    { value: '300+', label: 'Students Trained' },
    { value: '20+', label: 'Live Projects' },
    { value: '10+', label: 'Industry Experts' },
    { value: '4', label: 'Career Courses' },
    { value: '100%', label: 'Practical Learning' },
    { value: 'Ongoing', label: 'Career Support' },
  ],
  journey: {
    eyebrow: 'Our journey',
    headingLine1: 'From Learning to',
    headingHighlight: 'Leadership',
    description:
      'Founded with a vision to bridge the gap between education and industry, TSDC has trained hundreds of students and helped them start meaningful careers in creative and digital fields.',
    checklist: ['Practical Learning Approach', 'Relevant Curriculum', 'Real Projects & Portfolio Building', 'Mentorship by Industry Experts'],
    timeline: [
      { title: 'Our Beginning', description: 'TSDC was founded to make quality skill education accessible, affordable, and career-focused.', year: '2021' },
      { title: 'Growing Together', description: 'Hundreds of passionate learners joined us and transformed their skills into real opportunities.', year: '2022–23' },
      { title: 'Expanding Impact', description: 'We collaborated with industry experts and launched advanced programs with real-world projects.', year: '2024' },
      { title: 'Building Futures', description: 'We continue to empower the next generation with skills, confidence, and career support.', year: '2025+' },
    ],
  },
  values: {
    eyebrow: 'Our values',
    heading: 'What Drives Us Every Day',
    items: [
      { title: 'Quality Education', description: 'We deliver industry-relevant training with a focus on practical learning.' },
      { title: 'Student Success', description: 'Your growth is our mission. We support you at every step of your journey.' },
      { title: 'Practical Approach', description: 'Learn by doing. Our projects and assignments simulate real-world challenges.' },
      { title: 'Expert Guidance', description: 'Learn from experienced professionals and industry mentors.' },
      { title: 'Integrity & Support', description: 'We build a supportive environment based on trust, respect, and transparency.' },
    ],
  },
  people: {
    eyebrow: 'Meet the minds behind TSDC',
    heading: 'Guiding You. Inspiring You.',
    team: [
      { name: 'Ragav', role: 'Founder & Mentor', image: '/our-story.png' },
      { name: 'Ananya', role: 'Graphic Design Expert', image: '/Graphic%20Design.png' },
      { name: 'Karthik', role: 'UI/UX Design Expert', image: '/UIUX%20Design.png' },
      { name: 'Priya', role: 'Digital Marketing Expert', image: '/Digital_marketing.png' },
    ],
    asideImage: '/our-story.png',
    asideHeading: 'Join a Community\nThat Builds Careers',
    asideDescription: "At TSDC, you're not just a student. You're part of a community that learns, creates, and grows together.",
    asideCtaLabel: 'Book Free Counselling',
  },
  reviews: {
    eyebrow: 'What our students say',
    items: [
      { name: 'Harini S.', role: 'Graphic Design Student', quote: 'TSDC changed the way I look at my career. The practical classes and projects helped me build a strong portfolio.' },
      { name: 'Vignesh K.', role: 'UI/UX Design Student', quote: 'The mentors are amazing and the support from the team is outstanding. I got my first freelance project during the course!' },
      { name: 'Priya M.', role: 'Digital Marketing Student', quote: 'Digital Marketing course at TSDC is practical, updated, and career-oriented. Highly recommended!' },
    ],
  },
  cta: {
    heading: 'Ready to Start Your Journey?',
    description: "Learn in-demand skills, work on real projects, and build the career you've always dreamed of.",
    buttonLabel: 'Book Free Counselling',
    exploreCoursesLabel: 'Explore Courses',
  },
}

export const fetchAboutPage = async (): Promise<AboutPageContent> => {
  try {
    const response = await fetch('/api/content/aboutPage', { cache: 'no-store' })
    if (!response.ok) throw new Error(`Failed to fetch about page: ${response.status}`)
    const payload = (await response.json()) as { value?: AboutPageContent }
    return payload.value ?? defaultAboutPage
  } catch (error) {
    console.error('[fetchAboutPage] falling back to default:', error)
    return defaultAboutPage
  }
}
