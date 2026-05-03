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
  'motion-graphics': CourseData
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
      { question: 'What is a graphic design course all about?', answer: 'A graphic design course teaches you how to visually communicate ideas through typography, color, layout, branding, and digital tools like Photoshop and Illustrator. At TSDC, the program covers design fundamentals, Adobe tools, brand identity, packaging, social media creatives, and a portfolio of 8+ real projects.' },
      { question: 'What subjects are covered in a graphic design course?', answer: 'Core subjects include visual hierarchy, color theory, typography, logo design, branding systems, print and packaging design, social media creatives, and portfolio development. At TSDC, students also learn Adobe Photoshop, Illustrator, InDesign, Canva Pro, and Figma.' },
      { question: 'What is the graphic design course fee?', answer: 'The TSDC Graphic Design Mastery Program is Rs 18,000 with a 3-month EMI option at Rs 6,000 per month, so you can start without paying the full amount upfront. The fee covers all course materials, software guidance, project reviews, and certification.' },
      { question: 'How long is the graphic design course?', answer: 'The TSDC Graphic Design program runs for 12 weeks. This covers design fundamentals, Adobe tools, branding, packaging, social creatives, and a complete portfolio review — structured so students are job-ready by the end.' },
      { question: 'Can I learn graphic design online?', answer: 'Yes. TSDC offers both offline classroom sessions and a hybrid mode, so students who cannot attend in person can still follow the full curriculum, get project feedback, and build their portfolio.' },
      { question: 'Can I learn graphic design with no prior experience?', answer: 'Absolutely. The course starts from the very beginning — design fundamentals, visual thinking, and software basics — before building into advanced branding and portfolio projects. No prior design or computer experience is required.' },
      { question: 'What is the salary after a graphic design course?', answer: 'Entry-level graphic designers in Chennai typically earn between Rs 15,000 and Rs 30,000 per month depending on the role and portfolio quality. Freelancers can earn more depending on client volume. Roles like Brand Designer and Creative Executive can grow further with experience.' },
      { question: 'Which graphic design course is best for beginners?', answer: 'The best graphic design course for a beginner is one that teaches fundamentals first, covers professional tools like Photoshop and Illustrator, includes live project work, and ends with a portfolio you can show employers. TSDC is designed specifically around that outcome.' },
      { question: 'Which graphic design course is right for me?', answer: 'If you enjoy visual communication, branding, color, and creating for print, social, or digital campaigns, graphic design is likely the right path. If you prefer product thinking, apps, and user interfaces, UI/UX may suit you better. TSDC can help you compare both before you enroll.' },
      { question: 'Where can I do a graphic design course in Chennai?', answer: 'TSDC is a creative education institute located near OMR, Perumbakkam in Chennai. It offers the Graphic Design Mastery Program in offline and hybrid modes with limited batch sizes for focused learning.' },
      { question: 'Is this course beginner-friendly?', answer: 'Yes. The program starts with design fundamentals before moving into Adobe tools, branding systems, and portfolio projects. No prior experience is needed.' },
      { question: 'Will I work on real projects?', answer: 'Yes. You will build brand identities, packaging, social creatives, and presentation-ready portfolio pieces based on commercial-style briefs reviewed by working designers.' },
      { question: 'Do I get a certificate and portfolio support?', answer: 'Yes. Students receive a course completion certificate and portfolio review support tied to the projects built in class.' },
      { question: 'Can I pay in installments?', answer: 'Yes. The fee can be split into a 3-month EMI plan of Rs 6,000 per month so you can start without paying the full amount upfront.' },
      { question: 'What jobs can I apply for after this course?', answer: 'Students typically prepare for Graphic Designer, Brand Designer, Social Media Designer, Print Designer, and Creative Executive roles at agencies, brands, and studios.' },
      { question: 'Can a 12th pass student become a graphic designer?', answer: 'Yes. Graphic design does not require a degree. Many working designers entered the field after 12th with a practical certificate course. What matters most is your portfolio, software skills, and understanding of design fundamentals — all of which you build during the TSDC program.' },
      { question: 'Is graphic design a well-paid career?', answer: 'Graphic design is a well-paid and growing career, especially in digital-first businesses. In India, starting salaries range from Rs 15,000 to Rs 30,000 per month. Experienced brand designers, senior creatives, and freelancers often earn significantly more. Logo and brand designers also command strong project fees.' },
      { question: 'What are the main types of graphic design?', answer: 'The main types include brand identity design, print design, packaging design, digital and social media design, advertising design, motion design, and UI/UX design. At TSDC, the course covers brand identity, print, packaging, and social media design as core areas, giving students a broad commercial foundation.' },
      { question: 'Is logo design a good career?', answer: 'Yes. Logo and brand identity design is one of the highest-value services in the design industry. Strong logo designers often work freelance, charging per-project fees that grow with portfolio quality. The TSDC program includes logo construction, vector illustration, and full brand identity development.' },
      { question: 'Which is the best graphic design institute in Chennai?', answer: 'The best graphic design institute in Chennai is one that focuses on practical portfolio building over theory, covers professional tools like Photoshop and Illustrator, provides mentor feedback on real projects, and prepares students for actual job roles. TSDC is a practical, outcome-focused creative institute near OMR, Perumbakkam built around exactly this model.' },
      { question: 'Which is the best graphic design institute in India?', answer: 'The best graphic design institutes in India prioritize live projects, mentor critique, real-world briefs, and strong portfolio outcomes. TSDC, based in Chennai, is a career-focused creative institute built around portfolio-first training — preparing students for brand design, agency work, and freelance careers across India.' },
      { question: 'Can AI replace graphic designers?', answer: 'No. AI tools like Adobe Firefly and Canva AI help designers work faster, but they cannot replace human creative judgment, cultural understanding, brand strategy, or the ability to solve complex communication problems. Designers who learn to use AI as a co-pilot are more valuable, not less. TSDC integrates AI-aware workflows into training.' },
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
      'Learn Premiere Pro, DaVinci Resolve, color grading, reels, shorts, brand videos, editing workflow, and showreel-building systems for creator and commercial work.',
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
    heroPoints: ['Premiere Pro and DaVinci Resolve', 'Reels and brand videos', 'Showreel portfolio'],
    outcomes: [
      { title: 'Professional video editing', text: 'Edit timelines, multi-cam footage, color grade, and export broadcast-ready video content.' },
      { title: 'Polished titles and finishing', text: 'Create lower-thirds, transitions, subtitles, and clean presentation elements that make edits feel commercial-ready.' },
      { title: 'Reels and short-form content', text: 'Edit vertical video, trending reels, shorts, and ads optimized for social performance.' },
      { title: 'Showreel that gets hired', text: 'Build a showreel of 5+ real projects across brand videos, reels, and motion work.' },
    ],
    modules: [
      { label: 'Block 01', title: 'Premiere Pro editing workflow', text: 'Timeline fundamentals, audio editing, color correction, titles, and export settings.' },
      { label: 'Block 02', title: 'Advanced editing and ad polish', text: 'Cuts, rhythm, title timing, pacing, overlays, and edit structures used in commercial reels and campaigns.' },
      { label: 'Block 03', title: 'Color grading and DaVinci Resolve', text: 'Professional color grading workflow, LUT application, and finishing for delivery.' },
      { label: 'Block 04', title: 'Reels, ads, and showreel building', text: 'Short-form editing strategy, ad video formats, and assembling your final showreel.' },
    ],
    tools: ['Adobe Premiere Pro', 'DaVinci Resolve', 'Adobe Audition', 'CapCut', 'Frame.io'],
    project:
      'Edit a complete brand video campaign - intro film, 3 reels, client revisions, and a final showreel package reviewed by a working video professional.',
    careerRoles: 'Video Editor, Reel Editor, Content Creator, Brand Video Producer, Freelance Editor',
    testimonial: {
      quote: 'I joined to learn editing properly and left with a showreel I could actually send to clients. The feedback made my work feel professional.',
      author: 'Arjun T.',
      role: 'Freelance Video Editor, Chennai',
    },
    faqs: [
      { question: 'Do I need editing experience before joining?', answer: 'No. The course is beginner-friendly and starts with editing workflow fundamentals before moving into advanced pacing, color, and finishing.' },
      { question: 'What software is covered?', answer: 'Students learn Premiere Pro, DaVinci Resolve, Adobe Audition, and collaborative review workflows used for creator and brand content.' },
      { question: 'Will I build a showreel?', answer: 'Yes. The goal is to leave with multiple brand, reel, and motion projects assembled into a showreel.' },
      { question: 'Is this course only for YouTube editors?', answer: 'No. It supports reels, ads, commercial edits, brand videos, and short-form content work across multiple platforms.' },
      { question: 'Can I choose EMI payment?', answer: 'Yes. The fee is split across a 3-month installment plan.' },
      { question: 'Is placement support included?', answer: 'Yes. Students get guidance on showreel presentation, freelance positioning, and interview readiness.' },
    ],
    popupInterest: 'Video Editing Course',
  },
  'motion-graphics': {
    id: 'motion-graphics',
    slug: 'motion-graphics',
    title: 'Motion Graphics Specialist Program',
    eyebrow: 'Motion Design Course - Chennai',
    description:
      'Learn After Effects, Illustrator workflows, title animation, explainer scenes, ad motion systems, reels, and storyboard-to-animation production for modern brand work.',
    image: '/graphic.png',
    imageAlt: 'Motion Graphics Course in Chennai - TSDC',
    accent: '#DB4B87',
    deep: '#171D4D',
    soft: '#FFF1F7',
    duration: '10 Weeks',
    mode: 'Offline / Hybrid',
    seats: 'Small batch',
    fee: 'Rs 20,000',
    emi: 'Rs 10,000 x 2 months',
    nextBatches: ['May 28, 2026', 'June 25, 2026'],
    syllabusUrl: '/syllabus/MG%20Syllabus.pdf',
    syllabusFileName: 'MG Syllabus.pdf',
    heroPoints: ['After Effects and motion systems', 'Explainer and ad scenes', 'Showcase-ready motion portfolio'],
    outcomes: [
      { title: 'Motion design fundamentals', text: 'Understand timing, easing, spacing, transitions, and visual rhythm so animations feel intentional instead of random.' },
      { title: 'Explainers and social ads', text: 'Build animated scenes for product explainers, reels, launch promos, and campaign cutdowns used by real brands.' },
      { title: 'Typography and logo animation', text: 'Create kinetic type, title sequences, logo reveals, lower-thirds, and motion packages that feel commercially usable.' },
      { title: 'Portfolio-ready motion work', text: 'Leave with polished animation samples that show style, consistency, and presentation quality for recruiters and clients.' },
    ],
    modules: [
      { label: 'Block 01', title: 'Motion principles and After Effects basics', text: 'Interface setup, keyframes, graphs, easing, timing, and animation logic for clean motion foundations.' },
      { label: 'Block 02', title: 'Typography, titles, and logo animation', text: 'Animate text systems, title cards, logo reveals, transitions, and identity-led motion assets.' },
      { label: 'Block 03', title: 'Illustrator to After Effects workflow', text: 'Import vectors, rig layered assets, create scene movement, and build explainer-style compositions.' },
      { label: 'Block 04', title: 'Commercial motion portfolio project', text: 'Produce a complete motion campaign pack with reels, ad visuals, and a final showcase sequence.' },
    ],
    tools: ['Adobe After Effects', 'Adobe Illustrator', 'Adobe Photoshop', 'Premiere Pro', 'LottieFiles'],
    project:
      'Create a motion campaign pack for a brand brief - logo animation, social promo, animated typography sequence, and an explainer-style scene presented as a portfolio case.',
    careerRoles: 'Motion Graphics Designer, Motion Designer, Video Creative, Social Media Animator, Ad Motion Editor',
    testimonial: {
      quote: 'This course helped me understand motion as a system, not just random effects. My portfolio finally looked focused enough to show studios.',
      author: 'Nivetha R.',
      role: 'Junior Motion Designer, Chennai',
    },
    faqs: [
      { question: 'Is this different from the video editing course?', answer: 'Yes. The motion graphics course focuses more on animation systems, typography, explainer scenes, and After Effects workflows, while the video editing course focuses more on edit rhythm, reels, and showreel-based editing.' },
      { question: 'Do I need to know After Effects already?', answer: 'No. The course starts from motion basics and gradually builds into commercial-style animation projects.' },
      { question: 'Will I learn logo animation and animated text?', answer: 'Yes. Logo animation, title systems, kinetic typography, and social ad motion are core parts of the curriculum.' },
      { question: 'Can beginners join this course?', answer: 'Yes. It is structured for learners who are new to motion design but ready to practice consistently.' },
      { question: 'Will I build a portfolio by the end?', answer: 'Yes. Students leave with multiple motion samples designed to help with freelance pitching, internships, and junior motion roles.' },
      { question: 'Does TSDC offer EMI or payment support?', answer: 'Yes. The fee can be split into two installments for students who prefer a lighter payment start.' },
    ],
    popupInterest: 'Motion Graphics Course',
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
      'motion-graphics': { ...defaultCourseContent['motion-graphics'], ...(parsed['motion-graphics'] ?? {}) },
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
