export type ConversionKindConfig = {
  title: string
  description: string
  actionLabel: string
}

export type ConversionFaq = { question: string; answer: string }

export type ConversionPagesContent = {
  admissions: ConversionKindConfig
  counselling: ConversionKindConfig
  faqPage: { title: string; description: string }
  admissionSteps: string[]
  admissionNote: string
  counsellingHeading: string
  counsellingPoints: string[]
  faqs: ConversionFaq[]
  contactPrompt: string
}

export const defaultConversionPages: ConversionPagesContent = {
  admissions: {
    title: 'Start your TSDC admission journey with clarity.',
    description: 'Choose a course, share your goals and our admissions team will guide you through counselling, batch confirmation and the next steps.',
    actionLabel: 'Start admission',
  },
  counselling: {
    title: 'Find the creative career path that fits you.',
    description: 'A free career counselling conversation helps you compare courses, learning modes and the right next step based on your interests.',
    actionLabel: 'Book free counselling',
  },
  faqPage: {
    title: 'Questions before you begin? Get clear answers.',
    description: 'Find straightforward information about TSDC courses, learning, projects and career preparation.',
  },
  admissionSteps: ['Choose a course', 'Submit your application', 'Speak with admissions', 'Confirm your batch', 'Complete payment securely', 'Start learning'],
  admissionNote: 'Payments are completed through a secure payment provider. TSDC does not store card details.',
  counsellingHeading: 'A useful conversation, not a sales script.',
  counsellingPoints: [
    'Your interests and starting point',
    'The skills and tools each course covers',
    'Project, portfolio and career preparation',
    'Current learning modes, batches and fee options',
  ],
  faqs: [
    {
      question: 'Who can join TSDC courses?',
      answer:
        'Students, graduates, working professionals, career switchers, freelancers and beginners who are ready to learn practical creative skills can explore the programmes.',
    },
    { question: 'Do I need prior experience?', answer: 'No. The courses begin with fundamentals and build towards practical project work.' },
    {
      question: 'Are classes online or offline?',
      answer: 'TSDC offers learning modes based on the programme and batch. Speak with admissions to confirm the current options.',
    },
    { question: 'Will I work on projects?', answer: 'Yes. Practical assignments and portfolio-oriented projects are a core part of the learning approach.' },
    {
      question: 'Is placement support available?',
      answer:
        'TSDC provides career preparation support such as portfolio, resume and interview guidance. Career outcomes depend on individual skill development, portfolio quality, experience and employer requirements.',
    },
  ],
  contactPrompt: 'Have a quick question?',
}

export const fetchConversionPages = async (): Promise<ConversionPagesContent> => {
  try {
    const response = await fetch('/api/content/conversionPages', { cache: 'no-store' })
    if (!response.ok) throw new Error(`Failed to fetch conversion pages: ${response.status}`)
    const payload = (await response.json()) as { value?: ConversionPagesContent }
    return payload.value ?? defaultConversionPages
  } catch (error) {
    console.error('[fetchConversionPages] falling back to default:', error)
    return defaultConversionPages
  }
}
