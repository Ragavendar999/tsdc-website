export const COURSE_CONTENT_KEY = 'tsdc-course-content-v1'
export const COURSE_CONTENT_UPDATED_EVENT = 'tsdc-course-content-updated'

export type CourseOutcome = { title: string; text: string }
export type CourseModule = { label: string; title: string; text: string }
export type CourseTestimonial = { quote: string; author: string; role: string }
export type CourseFaq = { question: string; answer: string }

export type CourseData = {
  id: string
  slug: string
  title: string
  eyebrow: string
  description: string
  image: string
  imageAlt: string
  accent: string
  deep: string
  soft: string
  duration: string
  mode: string
  seats: string
  fee: string
  emi: string
  nextBatches: string[]
  syllabusUrl: string
  syllabusFileName: string
  heroPoints: string[]
  outcomes: CourseOutcome[]
  modules: CourseModule[]
  tools: string[]
  project: string
  careerRoles: string
  testimonial: CourseTestimonial
  faqs: CourseFaq[]
  popupInterest: string
}

export type AllCourseContent = {
  'graphic-design': CourseData
  'uiux-design': CourseData
  'digital-marketing': CourseData
  'video-editing': CourseData
}

export const defaultCourseContent: AllCourseContent = {
  'graphic-design': {
    id: 'graphic-design',
    slug: 'graphic-design',
    title: 'Graphic Design Mastery Program',
    eyebrow: 'Creative Education Institute - Chennai',
    description:
      'Become a commercial graphic designer with branding, typography, Adobe tools, packaging, social media creatives, and a job-ready portfolio built through practical projects.',
    image: '/Gd1.jpeg',
    imageAlt: 'Graphic Design Course in Chennai - TSDC',
    accent: '#F4793E',
    deep: '#4B3A97',
    soft: '#fff3ec',
    duration: '12 Weeks',
    mode: 'Offline / Hybrid',
    seats: 'Limited seats',
    fee: 'Rs 18,000',
    emi: 'Rs 6,000 x 3 months',
    nextBatches: ['May 11, 2026', 'June 8, 2026'],
    syllabusUrl: '/syllabus/GD%20syllabus.pdf',
    syllabusFileName: 'GD syllabus.pdf',
    heroPoints: ['Adobe Photoshop and Illustrator', 'Real client briefs', 'Portfolio of 8+ projects'],
    outcomes: [
      { title: 'Brand identity design', text: 'Design complete brand systems - logos, color palettes, typography, and brand guidelines for real businesses.' },
      { title: 'Print and packaging design', text: 'Create product packaging, brochures, flyers, and print-ready artwork for commercial clients.' },
      { title: 'Social media creatives', text: 'Design scroll-stopping Instagram, Facebook, and YouTube content that performs for brands.' },
      { title: 'Portfolio that gets hired', text: 'Leave with 8+ polished projects reviewed by working designers to match employer expectations.' },
    ],
    modules: [
      { label: 'Block 01', title: 'Design fundamentals', text: 'Visual hierarchy, composition, color theory, and typography - the principles every designer must own.' },
      { label: 'Block 02', title: 'Adobe Photoshop deep dive', text: 'Photo editing, compositing, retouching, and creative manipulation at a commercial production level.' },
      { label: 'Block 03', title: 'Adobe Illustrator and branding', text: 'Vector illustration, logo construction, icon design, and complete brand identity development.' },
      { label: 'Block 04', title: 'Print, packaging, and social systems', text: 'Design for real-world use cases: packaging dielines, magazine layouts, ad creatives, and social content systems.' },
    ],
    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Canva Pro', 'Figma'],
    project:
      'You will complete a full brand identity project for a real business brief - logo, brand guide, social templates, and a packaging mockup reviewed by working designers.',
    careerRoles: 'Graphic Designer, Brand Designer, Social Media Designer, Print Designer, Creative Executive',
    testimonial: {
      quote: 'I went from zero Photoshop knowledge to landing a brand design job in 14 weeks. The project feedback made the difference.',
      author: 'Priya M.',
      role: 'Brand Designer, Chennai',
    },
    faqs: [
      { question: 'Is this course beginner-friendly?', answer: 'Yes. The program starts with design fundamentals before moving into Adobe tools, branding systems, and portfolio projects.' },
      { question: 'Do I get a certificate and portfolio support?', answer: 'Yes. Students receive a course completion certificate and portfolio review support tied to the projects built in class.' },
      { question: 'Can I pay in installments?', answer: 'Yes. The fee can be split into a 3-month EMI plan so you can start without paying the full amount upfront.' },
      { question: 'Will I work on real projects?', answer: 'Yes. You will build brand identities, packaging, social creatives, and presentation-ready portfolio pieces based on commercial-style briefs.' },
      { question: 'Is this online or offline?', answer: 'The course is available in offline and hybrid modes for students in Chennai and nearby areas.' },
      { question: 'What jobs can I apply for after this course?', answer: 'Students typically prepare for Graphic Designer, Brand Designer, Social Media Designer, and print or creative executive roles.' },
    ],
    popupInterest: 'Graphic Design Course',
  },
  'uiux-design': {
    id: 'uiux-design',
    slug: 'uiux-design',
    title: 'UI/UX Design Mastery Program',
    eyebrow: 'Product Design Course - Chennai',
    description:
      'Learn human-first interface design, UX research, wireframes, Figma prototyping, design systems, usability thinking, and portfolio case studies.',
    image: '/UIUXDesign.png',
    imageAlt: 'UI/UX Design Course in Chennai - TSDC',
    accent: '#4562B0',
    deep: '#4B3A97',
    soft: '#f0eeff',
    duration: '10 Weeks',
    mode: 'Offline / Hybrid',
    seats: '15 seats',
    fee: 'Rs 20,000',
    emi: 'Rs 10,000 x 2 months',
    nextBatches: ['May 18, 2026', 'June 15, 2026'],
    syllabusUrl: '/syllabus/UIUX%20syllabus.pdf',
    syllabusFileName: 'UIUX syllabus.pdf',
    heroPoints: ['Figma end-to-end', 'UX research methods', '3 case-study portfolio projects'],
    outcomes: [
      { title: 'UX research and user thinking', text: 'Conduct interviews, build personas, and map user journeys that actually solve real problems.' },
      { title: 'Wireframing and prototyping', text: 'Move from rough sketches to interactive Figma prototypes tested with real users.' },
      { title: 'Design systems and components', text: 'Build scalable component libraries and design tokens used in real product teams.' },
      { title: 'Case study portfolio', text: 'Complete 3 end-to-end case studies with problem framing, process, and measurable outcomes.' },
    ],
    modules: [
      { label: 'Block 01', title: 'UX foundations and research', text: 'User psychology, research methods, competitive analysis, and problem framing.' },
      { label: 'Block 02', title: 'Wireframing and information architecture', text: 'From flows and sitemaps to low-fidelity wireframes with structure thinking.' },
      { label: 'Block 03', title: 'Figma UI design and prototyping', text: 'High-fidelity screens, auto-layout, components, variables, and interactive prototypes.' },
      { label: 'Block 04', title: 'Usability testing and developer handoff', text: 'Testing sessions, iteration, annotations, and polished developer-ready handoff files.' },
    ],
    tools: ['Figma', 'FigJam', 'Maze', 'Notion', 'Lottie'],
    project:
      'Design a complete product - from research brief to interactive prototype - with usability testing, a documented case study, and a developer-ready handoff file.',
    careerRoles: 'UI Designer, UX Designer, Product Designer, UX Researcher, Design Lead',
    testimonial: {
      quote: 'The case study approach prepared me for interviews. I had actual work to show - not just a course certificate.',
      author: 'Karthik S.',
      role: 'Product Designer, Bangalore',
    },
    faqs: [
      { question: 'Will I build a portfolio during the course?', answer: 'Yes. The program is structured around three case-study style portfolio projects, not just tool lessons.' },
      { question: 'Do I need prior design experience?', answer: 'No. Beginners can start here because the course covers UX foundations, research, wireframes, and Figma from the ground up.' },
      { question: 'What software will I learn?', answer: 'You will work primarily in Figma and FigJam, with additional exposure to prototyping, user testing, and product workflow tools.' },
      { question: 'Can I pay by EMI?', answer: 'Yes. The UI/UX program supports a 2-installment payment plan.' },
      { question: 'Is placement support included?', answer: 'Yes. Students get case-study review, interview guidance, and portfolio positioning support for product and design roles.' },
      { question: 'Can students outside Chennai join?', answer: 'Yes. Hybrid support makes the program accessible for students who cannot attend every session offline.' },
    ],
    popupInterest: 'UI/UX Design Course',
  },
  'digital-marketing': {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    title: 'Digital Marketing Pro Program',
    eyebrow: 'Growth Marketing Course - Chennai',
    description:
      'Learn SEO, Google Ads, Meta Ads, social media strategy, analytics, content planning, and campaign reporting through practical growth projects.',
    image: '/Digital_marketing.png',
    imageAlt: 'Digital Marketing Course in Chennai - TSDC',
    accent: '#EA6865',
    deep: '#F4793E',
    soft: '#fff3ec',
    duration: '8 Weeks',
    mode: 'Offline / Hybrid',
    seats: 'Small batch',
    fee: 'Rs 15,000',
    emi: 'Rs 7,500 x 2 months',
    nextBatches: ['May 14, 2026', 'June 11, 2026'],
    syllabusUrl: '/syllabus/DM%20Syllabus.pdf',
    syllabusFileName: 'DM Syllabus.pdf',
    heroPoints: ['Live ad campaigns', 'SEO and Google Ads workflow', 'Analytics reporting'],
    outcomes: [
      { title: 'SEO and content strategy', text: 'Rank websites on Google through technical SEO, keyword strategy, and content planning.' },
      { title: 'Paid advertising', text: 'Run live Meta Ads and Google Ads campaigns with real budgets, targeting, and reporting.' },
      { title: 'Social media management', text: 'Plan, create, schedule, and analyze content strategies for Instagram, LinkedIn, and YouTube.' },
      { title: 'Analytics and reporting', text: 'Read GA4 dashboards, build campaign reports, and make data-led recommendations.' },
    ],
    modules: [
      { label: 'Block 01', title: 'Digital marketing foundations', text: 'Channels, funnels, buyer personas, and how the modern digital landscape is structured.' },
      { label: 'Block 02', title: 'SEO and content systems', text: 'On-page, off-page, technical SEO, content calendar building, and ranking strategy.' },
      { label: 'Block 03', title: 'Paid media with Meta and Google', text: 'Ad account setup, campaign types, audience targeting, A/B testing, and budget management.' },
      { label: 'Block 04', title: 'Analytics, reporting, and growth strategy', text: 'GA4, conversion tracking, campaign performance dashboards, and presentation-ready reports.' },
    ],
    tools: ['Google Ads', 'Meta Business Suite', 'Google Analytics 4', 'SEMrush', 'Canva', 'Notion'],
    project:
      'Run a live digital marketing campaign for a real brand - from strategy brief to ads, SEO plan, and a performance report presented to the mentor.',
    careerRoles: 'Digital Marketing Executive, SEO Specialist, Paid Media Manager, Social Media Manager, Growth Marketer',
    testimonial: {
      quote: 'I ran my first Meta Ads campaign in week 3. By the end I had a live campaign portfolio to show in interviews.',
      author: 'Divya R.',
      role: 'Digital Marketing Executive, Chennai',
    },
    faqs: [
      { question: 'Will I learn both SEO and paid ads?', answer: 'Yes. The course covers SEO, content planning, Meta Ads, Google Ads, analytics, and reporting.' },
      { question: 'Is this useful for freelancers and business owners too?', answer: 'Yes. The curriculum works for job seekers, freelancers, and small business owners who want practical growth skills.' },
      { question: 'Are live campaigns part of the course?', answer: 'Yes. Students work on campaign planning, ad setup, reporting, and optimization exercises tied to real business contexts.' },
      { question: 'How long is the course?', answer: 'The digital marketing program runs for 8 weeks in small guided batches.' },
      { question: 'Do you offer EMI options?', answer: 'Yes. The fee can be split into two payments to make joining easier.' },
      { question: 'What roles can I target after completion?', answer: 'Students usually prepare for digital marketing executive, SEO specialist, paid media, social media, and growth roles.' },
    ],
    popupInterest: 'Digital Marketing Course',
  },
  'video-editing': {
    id: 'video-editing',
    slug: 'video-editing',
    title: 'Video Editing Mastery Program',
    eyebrow: 'Creative Video Course - Chennai',
    description:
      'Learn Premiere Pro, After Effects, DaVinci Resolve, color grading, reels, shorts, brand videos, motion graphics, and showreel-building workflows.',
    image: '/graphicdesign.png',
    imageAlt: 'Video Editing Course in Chennai - TSDC',
    accent: '#EA6865',
    deep: '#4B3A97',
    soft: '#f2f0ff',
    duration: '12 Weeks',
    mode: 'Offline / Hybrid',
    seats: 'Limited seats',
    fee: 'Rs 18,000',
    emi: 'Rs 6,000 x 3 months',
    nextBatches: ['May 25, 2026', 'June 22, 2026'],
    syllabusUrl: '/syllabus/VE%20Syllabus.pdf',
    syllabusFileName: 'VE Syllabus.pdf',
    heroPoints: ['Premiere Pro and After Effects', 'Reels and brand videos', 'Showreel portfolio'],
    outcomes: [
      { title: 'Professional video editing', text: 'Edit timelines, multi-cam footage, color grade, and export broadcast-ready video content.' },
      { title: 'Motion graphics and titles', text: 'Create animated lower-thirds, transitions, and full motion graphics sequences in After Effects.' },
      { title: 'Reels and short-form content', text: 'Edit vertical video, trending reels, shorts, and ads optimized for social performance.' },
      { title: 'Showreel that gets hired', text: 'Build a showreel of 5+ real projects across brand videos, reels, and motion work.' },
    ],
    modules: [
      { label: 'Block 01', title: 'Premiere Pro editing workflow', text: 'Timeline fundamentals, audio editing, color correction, titles, and export settings.' },
      { label: 'Block 02', title: 'After Effects and motion graphics', text: 'Keyframe animation, expressions, title sequences, and motion design for brand use.' },
      { label: 'Block 03', title: 'Color grading and DaVinci Resolve', text: 'Professional color grading workflow, LUT application, and finishing for delivery.' },
      { label: 'Block 04', title: 'Reels, ads, and showreel building', text: 'Short-form editing strategy, ad video formats, and assembling your final showreel.' },
    ],
    tools: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Adobe Audition', 'Frame.io'],
    project:
      'Edit a complete brand video campaign - intro film, 3 reels, and a motion graphics package assembled into a showreel reviewed by a working video professional.',
    careerRoles: 'Video Editor, Motion Graphics Designer, Content Creator, Reel Editor, Brand Video Producer',
    testimonial: {
      quote: 'After Effects felt impossible before. Now I have a showreel with actual brand projects that got me freelance clients.',
      author: 'Arjun T.',
      role: 'Freelance Video Editor, Chennai',
    },
    faqs: [
      { question: 'Do I need editing experience before joining?', answer: 'No. The course is beginner-friendly and starts with editing workflow fundamentals before motion graphics and finishing.' },
      { question: 'What software is covered?', answer: 'Students learn Premiere Pro, After Effects, DaVinci Resolve, Adobe Audition, and collaborative review workflows.' },
      { question: 'Will I build a showreel?', answer: 'Yes. The goal is to leave with multiple brand, reel, and motion projects assembled into a showreel.' },
      { question: 'Is this course only for YouTube editors?', answer: 'No. It supports reels, ads, commercial edits, brand videos, and motion design work as well.' },
      { question: 'Can I choose EMI payment?', answer: 'Yes. The fee is split across a 3-month installment plan.' },
      { question: 'Is placement support included?', answer: 'Yes. Students get guidance on showreel presentation, freelance positioning, and interview readiness.' },
    ],
    popupInterest: 'Video Editing Course',
  },
}

export function loadCourseContent(): AllCourseContent {
  if (typeof window === 'undefined') return defaultCourseContent
  try {
    const raw = localStorage.getItem(COURSE_CONTENT_KEY)
    if (!raw) return defaultCourseContent
    const parsed = JSON.parse(raw) as Partial<AllCourseContent>
    return {
      'graphic-design': { ...defaultCourseContent['graphic-design'], ...(parsed['graphic-design'] ?? {}) },
      'uiux-design': { ...defaultCourseContent['uiux-design'], ...(parsed['uiux-design'] ?? {}) },
      'digital-marketing': { ...defaultCourseContent['digital-marketing'], ...(parsed['digital-marketing'] ?? {}) },
      'video-editing': { ...defaultCourseContent['video-editing'], ...(parsed['video-editing'] ?? {}) },
    }
  } catch {
    return defaultCourseContent
  }
}

export function persistCourseContent(content: AllCourseContent): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(COURSE_CONTENT_KEY, JSON.stringify(content))
  window.dispatchEvent(new CustomEvent(COURSE_CONTENT_UPDATED_EVENT))
}
