export type CoursesListingCourse = {
  title: string
  href: string
  image: string
  accent: string
  duration: string
  classes: string
  projects: string
  tools: string
  copy: string
}

export type CoursesListingBenefit = { title: string; description: string }
export type CoursesListingStat = { value: string; label: string }

export type CoursesListingContent = {
  hero: {
    eyebrow: string
    titleLine1: string
    titleHighlight: string
    description: string
    points: string[]
    heroImage: string
  }
  listing: {
    eyebrow: string
    heading: string
    description: string
    courses: CoursesListingCourse[]
  }
  guide: {
    heading: string
    description: string
    primaryButtonLabel: string
    secondaryButtonLabel: string
    checklist: string[]
  }
  benefits: {
    eyebrow: string
    heading: string
    items: CoursesListingBenefit[]
  }
  stats: CoursesListingStat[]
  cta: {
    heading: string
    description: string
    buttonLabel: string
    exploreLinkLabel: string
    exploreLinkHref: string
    metrics: CoursesListingStat[]
  }
}

export const defaultCoursesListing: CoursesListingContent = {
  hero: {
    eyebrow: 'Our courses',
    titleLine1: 'Industry-Focused Courses.',
    titleHighlight: 'Career-Ready Skills.',
    description: 'Explore our practical courses designed to help you learn, build real projects, and get job-ready.',
    points: ['Live Interactive Classes', 'Industry Expert Mentors', 'Real-World Projects', 'Placement Assistance'],
    heroImage: '/TSDC%20Classroom.png',
  },
  listing: {
    eyebrow: 'Popular courses',
    heading: 'Choose the Right Course for You',
    description: 'Learn from industry experts and build a portfolio that gets you hired.',
    courses: [
      {
        title: 'Graphic Design',
        href: '/courses/graphic-design',
        image: '/Graphic%20Design.png',
        accent: '#5637ef',
        duration: '3 Months',
        classes: '3 Classes / Week',
        projects: '6+ Projects',
        tools: 'Photoshop · Illustrator · InDesign',
        copy: 'Master the art of visual communication and create stunning designs for print and digital.',
      },
      {
        title: 'UI/UX Design',
        href: '/courses/uiux-design',
        image: '/UIUX%20Design.png',
        accent: '#6138ec',
        duration: '10 Weeks',
        classes: '4 Classes / Week',
        projects: '4+ Major Projects',
        tools: 'Figma · Prototyping',
        copy: 'Design user-friendly experiences and build interfaces that people love.',
      },
      {
        title: 'Digital Marketing',
        href: '/courses/digital-marketing',
        image: '/Digital_marketing.png',
        accent: '#00a978',
        duration: '12 Weeks',
        classes: '3 Classes / Week',
        projects: '5 Live Campaigns',
        tools: 'Google · Meta · Analytics',
        copy: 'Learn strategies to grow brands, generate leads, and drive real results.',
      },
      {
        title: 'Video Editing',
        href: '/courses/video-editing',
        image: '/Motion%20Graphics.png',
        accent: '#ff5c17',
        duration: '10 Weeks',
        classes: '3 Classes / Week',
        projects: '6+ Projects',
        tools: 'Premiere Pro · After Effects',
        copy: 'Edit engaging videos and create content that captivates your audience.',
      },
      {
        title: 'Motion Graphics',
        href: '/courses/motion-graphics',
        image: '/Motion%20Graphics.png',
        accent: '#d63f93',
        duration: '10 Weeks',
        classes: '3 Classes / Week',
        projects: '4+ Motion Projects',
        tools: 'After Effects · Illustrator',
        copy: 'Animate engaging titles, explainers, ads, and branded stories with professional motion workflows.',
      },
    ],
  },
  guide: {
    heading: 'Not Sure Which Course is Right for You?',
    description: 'Take our free career guidance session and get personalized course recommendations.',
    primaryButtonLabel: 'Book Free Counselling',
    secondaryButtonLabel: 'Talk to an Expert',
    checklist: ['Career Assessment', 'Course Recommendation', 'Skills Roadmap', 'Placement Guidance'],
  },
  benefits: {
    eyebrow: 'Detailed course overview',
    heading: 'Everything You Get in Our Courses',
    items: [
      { title: 'Live Classes', description: 'Interactive sessions with industry experts.' },
      { title: 'Hands-on Projects', description: 'Build real-world projects for your portfolio.' },
      { title: 'Mentorship', description: 'Personal guidance from industry professionals.' },
      { title: 'Study Materials', description: 'Access notes, templates, and resources.' },
      { title: 'Certifications', description: 'Industry-recognized course certificate.' },
      { title: 'Career Support', description: 'Resume, interview preparation and job assistance.' },
    ],
  },
  stats: [
    { value: '300+', label: 'Students Trained' },
    { value: '20+', label: 'Live Projects' },
    { value: '10+', label: 'Industry Experts' },
    { value: '5', label: 'Career Courses' },
    { value: '100%', label: 'Practical Learning' },
    { value: 'Ongoing', label: 'Career Support' },
  ],
  cta: {
    heading: 'Ready to Start Your\nLearning Journey?',
    description: 'Join hundreds of students who transformed their careers with TSDC.',
    buttonLabel: 'Book Free Counselling',
    exploreLinkLabel: 'Explore Courses',
    exploreLinkHref: '/courses/graphic-design',
    metrics: [
      { value: '300+', label: 'Students Trained' },
      { value: '95%', label: 'Course Completion' },
      { value: '80%', label: 'Placed Successfully' },
    ],
  },
}

export const fetchCoursesListing = async (): Promise<CoursesListingContent> => {
  try {
    const response = await fetch('/api/content/coursesListing', { cache: 'no-store' })
    if (!response.ok) throw new Error(`Failed to fetch courses listing: ${response.status}`)
    const payload = (await response.json()) as { value?: CoursesListingContent }
    return payload.value ?? defaultCoursesListing
  } catch (error) {
    console.error('[fetchCoursesListing] falling back to default:', error)
    return defaultCoursesListing
  }
}
