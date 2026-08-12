export type ContactWayIcon = 'phone' | 'chat' | 'mail' | 'map'
export type ContactWay = { title: string; copy: string; icon: ContactWayIcon }

export type ContactBenefitIcon = 'education' | 'calendar' | 'team' | 'help'
export type ContactBenefit = { title: string; description: string; icon: ContactBenefitIcon }

export type ContactPromise = { title: string; copy: string }

export type ContactPageContent = {
  hero: {
    eyebrow: string
    titleLine1: string
    titleHighlight: string
    description: string
    promises: ContactPromise[]
  }
  form: {
    heading: string
    description: string
  }
  waysHeading: string
  ways: ContactWay[]
  map: {
    heading: string
    embedUrl: string
    addressName: string
    addressLine: string
    directionsUrl: string
  }
  benefits: {
    heading: string
    items: ContactBenefit[]
  }
  faq: {
    eyebrow: string
    heading: string
    questions: string[]
    genericAnswer: string
  }
  cta: {
    image: string
    heading: string
    description: string
    buttonLabel: string
    exploreLabel: string
  }
}

export const defaultContactPage: ContactPageContent = {
  hero: {
    eyebrow: 'Get in touch',
    titleLine1: "We're Here to",
    titleHighlight: 'Help You Grow.',
    description: 'Have questions about our courses, projects, or admissions? Reach out to us and our team will get back to you shortly.',
    promises: [
      { title: 'Quick Response', copy: 'We usually reply within 24 hours' },
      { title: 'Expert Guidance', copy: 'Get free career and course advice' },
      { title: 'Personalised Support', copy: "We help you choose what's right for you" },
      { title: 'Book a Session', copy: 'Schedule a free counselling call' },
    ],
  },
  form: {
    heading: 'Send Us a Message',
    description: "Fill out the form and we'll get back to you.",
  },
  waysHeading: 'Other Ways to Reach Us',
  ways: [
    { title: 'Call Us', copy: 'Mon – Sat, 9:00 AM – 7:00 PM', icon: 'phone' },
    { title: 'WhatsApp', copy: 'Quick chat with our counsellors', icon: 'chat' },
    { title: 'Email Us', copy: 'We respond within 24 hours', icon: 'mail' },
    { title: 'Visit Us', copy: 'Near OMR, Chennai – 600131', icon: 'map' },
  ],
  map: {
    heading: 'Our Location',
    embedUrl: 'https://www.google.com/maps?q=12.8817134,80.2026107&z=15&output=embed',
    addressName: 'TSDC – Traijo Skill\nDevelopment Center',
    addressLine: 'Perumbakkam, Chennai – 600131',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=12.8817134,80.2026107',
  },
  benefits: {
    heading: 'Why Connect With Us?',
    items: [
      { title: 'Admission Guidance', description: 'Get help with course details, fees, eligibility and admission process.', icon: 'education' },
      { title: 'Career Counselling', description: 'Speak with our experts and get clarity on career paths and opportunities.', icon: 'calendar' },
      { title: 'Corporate & Partnerships', description: 'For training partnerships, collaborations and corporate enquiries.', icon: 'team' },
      { title: 'General Support', description: "Any other queries? We're just a message away!", icon: 'help' },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    heading: 'Frequently Asked Questions',
    questions: [
      'How do I know which course is right for me?',
      'What is the duration of the courses?',
      'Do you provide placement assistance?',
      'Can I attend classes online?',
    ],
    genericAnswer: 'Our admissions team will explain this during your free counselling session, based on your goals and preferred learning path.',
  },
  cta: {
    image: '/our-story.png',
    heading: 'Still have questions?',
    description: 'Book a free counselling session with our experts and take the next step towards your future.',
    buttonLabel: 'Book Free Counselling',
    exploreLabel: 'Explore Courses',
  },
}

export const fetchContactPage = async (): Promise<ContactPageContent> => {
  try {
    const response = await fetch('/api/content/contactPage', { cache: 'no-store' })
    if (!response.ok) throw new Error(`Failed to fetch contact page: ${response.status}`)
    const payload = (await response.json()) as { value?: ContactPageContent }
    return payload.value ?? defaultContactPage
  } catch (error) {
    console.error('[fetchContactPage] falling back to default:', error)
    return defaultContactPage
  }
}
