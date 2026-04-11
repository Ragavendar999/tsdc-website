/* ─────────────────────────────────────────────────────────────
   Course landing page content — admin-editable via localStorage
───────────────────────────────────────────────────────────── */

export const COURSE_CONTENT_KEY = 'tsdc-course-content-v1'
export const COURSE_CONTENT_UPDATED_EVENT = 'tsdc-course-content-updated'

export type CourseOutcome = { title: string; text: string }
export type CourseModule  = { label: string; title: string; text: string }
export type CourseTestimonial = { quote: string; author: string; role: string }

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
  syllabusUrl: string
  syllabusFileName: string
  heroPoints: string[]
  outcomes: CourseOutcome[]
  modules: CourseModule[]
  tools: string[]
  project: string
  careerRoles: string
  testimonial: CourseTestimonial
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
    description: 'Become a commercial graphic designer with branding, typography, Adobe tools, packaging, social media creatives, and a job-ready portfolio built through practical projects.',
    image: '/Gd1.jpeg',
    imageAlt: 'Graphic Design Course in Chennai - TSDC',
    accent: '#F4793E',
    deep: '#4B3A97',
    soft: '#fff3ec',
    duration: '12 Weeks',
    mode: 'Offline / Hybrid',
    seats: 'Limited seats',
    syllabusUrl: '/syllabus/GD%20syllabus.pdf',
    syllabusFileName: 'GD syllabus.pdf',
    heroPoints: ['Adobe Photoshop & Illustrator', 'Real client briefs', 'Portfolio of 8+ projects'],
    outcomes: [
      { title: 'Brand identity design', text: 'Design complete brand systems — logos, color palettes, typography, and brand guidelines for real businesses.' },
      { title: 'Print & packaging design', text: 'Create product packaging, brochures, flyers, and print-ready artwork for commercial clients.' },
      { title: 'Social media creatives', text: 'Design scroll-stopping Instagram, Facebook, and YouTube content that performs for brands.' },
      { title: 'Portfolio that gets hired', text: 'Leave with 8+ polished projects reviewed by working designers to match employer expectations.' },
    ],
    modules: [
      { label: 'Block 01', title: 'Design fundamentals', text: 'Visual hierarchy, composition, colour theory, and typography — the principles every designer must own.' },
      { label: 'Block 02', title: 'Adobe Photoshop deep dive', text: 'Photo editing, compositing, retouching, and creative manipulation at a commercial production level.' },
      { label: 'Block 03', title: 'Adobe Illustrator & branding', text: 'Vector illustration, logo construction, icon design, and complete brand identity development.' },
      { label: 'Block 04', title: 'Print, packaging & social', text: 'Design for real-world use cases: packaging dielines, magazine layouts, and social content systems.' },
    ],
    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Canva Pro', 'Figma'],
    project: 'You will complete a full brand identity project for a real business brief — logo, brand guide, social templates, and a packaging mockup — reviewed by working designers.',
    careerRoles: 'Graphic Designer, Brand Designer, Social Media Designer, Print Designer, Creative Executive',
    testimonial: { quote: 'I went from zero Photoshop knowledge to landing a brand design job in 14 weeks. The project feedback made the difference.', author: 'Priya M.', role: 'Brand Designer, Chennai' },
    popupInterest: 'Graphic Design Course',
  },

  'uiux-design': {
    id: 'uiux-design',
    slug: 'uiux-design',
    title: 'UI/UX Design Mastery Program',
    eyebrow: 'Product Design Course - Chennai',
    description: 'Learn human-first interface design, UX research, wireframes, Figma prototyping, design systems, usability thinking, and portfolio case studies.',
    image: '/UIUXDesign.png',
    imageAlt: 'UI/UX Design Course in Chennai - TSDC',
    accent: '#4562B0',
    deep: '#4B3A97',
    soft: '#f0eeff',
    duration: '10 Weeks',
    mode: 'Offline / Hybrid',
    seats: '15 seats',
    syllabusUrl: '/syllabus/UIUX%20syllabus.pdf',
    syllabusFileName: 'UIUX syllabus.pdf',
    heroPoints: ['Figma end-to-end', 'UX research methods', '3 case study portfolio'],
    outcomes: [
      { title: 'UX research & user thinking', text: 'Conduct interviews, build personas, and map user journeys that actually solve real problems.' },
      { title: 'Wireframing & prototyping', text: 'Move from rough sketches to interactive Figma prototypes tested with real users.' },
      { title: 'Design systems & components', text: 'Build scalable component libraries and design tokens used in real product teams.' },
      { title: 'Case study portfolio', text: 'Complete 3 end-to-end case studies with problem framing, process, and outcomes.' },
    ],
    modules: [
      { label: 'Block 01', title: 'UX foundations & research', text: 'User psychology, research methods, competitive analysis, and problem framing.' },
      { label: 'Block 02', title: 'Wireframing & information architecture', text: 'From flows and sitemaps to low-fidelity wireframes with structure thinking.' },
      { label: 'Block 03', title: 'Figma UI design & prototyping', text: 'High-fidelity screens, auto-layout, components, variables, and interactive prototypes.' },
      { label: 'Block 04', title: 'Usability testing & handoff', text: 'Testing sessions, iteration, and developer-ready handoff with annotations.' },
    ],
    tools: ['Figma', 'FigJam', 'Maze', 'Notion', 'Lottie'],
    project: 'Design a complete product — from research brief to interactive prototype — with usability testing, a documented case study, and a developer-ready handoff file.',
    careerRoles: 'UI Designer, UX Designer, Product Designer, UX Researcher, Design Lead',
    testimonial: { quote: 'The case study approach prepared me for interviews. I had actual work to show — not just a course certificate.', author: 'Karthik S.', role: 'Product Designer, Bangalore' },
    popupInterest: 'UI/UX Design Course',
  },

  'digital-marketing': {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    title: 'Digital Marketing Pro Program',
    eyebrow: 'Growth Marketing Course - Chennai',
    description: 'Learn SEO, Google Ads, Meta Ads, social media strategy, analytics, content planning, and campaign reporting through practical growth projects.',
    image: '/Digital_marketing.png',
    imageAlt: 'Digital Marketing Course in Chennai - TSDC',
    accent: '#EA6865',
    deep: '#F4793E',
    soft: '#fff3ec',
    duration: '8 Weeks',
    mode: 'Offline / Hybrid',
    seats: 'Small batch',
    syllabusUrl: '/syllabus/DM%20Syllabus.pdf',
    syllabusFileName: 'DM Syllabus.pdf',
    heroPoints: ['Live ad campaigns', 'SEO & Google Ads certified', 'Analytics reporting'],
    outcomes: [
      { title: 'SEO & content strategy', text: 'Rank websites on Google through technical SEO, keyword strategy, and content planning.' },
      { title: 'Paid advertising (Meta + Google)', text: 'Run live Meta Ads and Google Ads campaigns with real budgets, targeting, and reporting.' },
      { title: 'Social media management', text: 'Plan, create, schedule, and analyse content strategies for Instagram, LinkedIn, and YouTube.' },
      { title: 'Analytics & reporting', text: 'Read GA4 dashboards, build campaign reports, and make data-led recommendations.' },
    ],
    modules: [
      { label: 'Block 01', title: 'Digital marketing foundations', text: 'Channels, funnels, buyer personas, and how the modern digital landscape is structured.' },
      { label: 'Block 02', title: 'SEO & content', text: 'On-page, off-page, technical SEO, content calendar building, and ranking strategy.' },
      { label: 'Block 03', title: 'Paid media — Meta & Google', text: 'Ad account setup, campaign types, audience targeting, A/B testing, and budget management.' },
      { label: 'Block 04', title: 'Analytics, reporting & strategy', text: 'GA4, conversion tracking, campaign performance dashboards, and growth reporting.' },
    ],
    tools: ['Google Ads', 'Meta Business Suite', 'Google Analytics 4', 'SEMrush', 'Canva', 'Notion'],
    project: 'Run a live digital marketing campaign for a real brand — from strategy brief to ads, SEO plan, and a performance report presented to the mentor.',
    careerRoles: 'Digital Marketing Executive, SEO Specialist, Paid Media Manager, Social Media Manager, Growth Marketer',
    testimonial: { quote: 'I ran my first Meta Ads campaign in week 3. By the end I had a live campaign portfolio to show in interviews.', author: 'Divya R.', role: 'Digital Marketing Executive, Chennai' },
    popupInterest: 'Digital Marketing Course',
  },

  'video-editing': {
    id: 'video-editing',
    slug: 'video-editing',
    title: 'Video Editing Mastery Program',
    eyebrow: 'Creative Video Course - Chennai',
    description: 'Learn Premiere Pro, After Effects, DaVinci Resolve, color grading, reels, shorts, brand videos, motion graphics, and showreel-building workflows.',
    image: '/graphicdesign.png',
    imageAlt: 'Video Editing Course in Chennai - TSDC',
    accent: '#EA6865',
    deep: '#4B3A97',
    soft: '#f2f0ff',
    duration: '12 Weeks',
    mode: 'Offline / Hybrid',
    seats: 'Limited seats',
    syllabusUrl: '/syllabus/VE%20Syllabus.pdf',
    syllabusFileName: 'VE Syllabus.pdf',
    heroPoints: ['Premiere Pro & After Effects', 'Reels & brand videos', 'Showreel portfolio'],
    outcomes: [
      { title: 'Professional video editing', text: 'Edit timelines, multi-cam footage, colour grade, and export broadcast-ready video content.' },
      { title: 'Motion graphics & titles', text: 'Create animated lower-thirds, transitions, and full motion graphics sequences in After Effects.' },
      { title: 'Reels & short-form content', text: 'Edit vertical video, trending reels, shorts, and ads optimised for social performance.' },
      { title: 'Showreel that gets hired', text: 'Build a showreel of 5+ real projects across brand videos, reels, and motion work.' },
    ],
    modules: [
      { label: 'Block 01', title: 'Premiere Pro editing workflow', text: 'Timeline fundamentals, audio editing, colour correction, titles, and export settings.' },
      { label: 'Block 02', title: 'After Effects & motion graphics', text: 'Keyframe animation, expressions, title sequences, and motion design for brand use.' },
      { label: 'Block 03', title: 'Colour grading & DaVinci Resolve', text: 'Professional colour grading workflow, LUT application, and finishing for delivery.' },
      { label: 'Block 04', title: 'Reels, ads & showreel building', text: 'Short-form editing strategy, ad video formats, and assembling your final showreel.' },
    ],
    tools: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Adobe Audition', 'Frame.io'],
    project: 'Edit a complete brand video campaign — intro film, 3 reels, and a motion graphics package — assembled into a showreel reviewed by a working video professional.',
    careerRoles: 'Video Editor, Motion Graphics Designer, Content Creator, Reel Editor, Brand Video Producer',
    testimonial: { quote: 'After Effects felt impossible before. Now I have a showreel with actual brand projects that got me freelance clients.', author: 'Arjun T.', role: 'Freelance Video Editor, Chennai' },
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
      'graphic-design':    { ...defaultCourseContent['graphic-design'],    ...(parsed['graphic-design']    ?? {}) },
      'uiux-design':       { ...defaultCourseContent['uiux-design'],       ...(parsed['uiux-design']       ?? {}) },
      'digital-marketing': { ...defaultCourseContent['digital-marketing'], ...(parsed['digital-marketing'] ?? {}) },
      'video-editing':     { ...defaultCourseContent['video-editing'],     ...(parsed['video-editing']     ?? {}) },
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
