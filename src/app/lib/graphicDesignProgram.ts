export type CurriculumWeek = {
  month: 1 | 2 | 3
  week: number
  title: string
  topics: string[]
  assignment: string
}

export type WorkflowStep = {
  label: string
}

export type AiTool = {
  name: string
  role: string
  uses: string[]
}

export type ProcessStep = {
  number: string
  title: string
  text: string
}

export type ShowcaseImage = {
  src: string
  alt: string
  caption: string
}

export const whyPillars = [
  {
    title: 'Design Thinking',
    text: 'Learn to research a brief, form a concept and defend design decisions — not just operate software.',
  },
  {
    title: 'Professional Tools',
    text: 'Build real fluency in Adobe Illustrator, Photoshop and InDesign through commercial-style exercises.',
  },
  {
    title: 'AI-Powered Workflow',
    text: 'Use ChatGPT, Gemini and Claude as research and ideation co-pilots — while human judgement stays in charge of the design.',
  },
  {
    title: 'Real Projects & Portfolio',
    text: 'Work through agency-style briefs and turn your strongest pieces into 8–12 portfolio-ready case studies.',
  },
]

export const learningMethodology = ['Learn', 'Watch', 'Practice', 'Build', 'Get Feedback', 'Improve']

export const learningAreas = [
  'Graphic Design Fundamentals',
  'Typography & Colour Theory',
  'Logo Design',
  'Brand Identity Systems',
  'Social Media Design',
  'Advertising Creatives',
  'Photoshop Manipulation',
  'Print Design & Production',
  'Packaging Design',
  'AI-Powered Design Workflow',
  'Portfolio Development',
]

export const achievements = [
  'Understand a professional creative brief and conduct visual/competitor research',
  'Design professional logos and complete brand identity systems',
  'Build colour and typography systems that hold up across applications',
  'Design social media campaigns and advertising creatives',
  'Edit and manipulate images at a commercial production level',
  'Create print-ready collateral and packaging concepts with correct production files',
  'Integrate AI tools into a design workflow without losing creative judgement',
  'Present design decisions professionally and handle feedback and revisions',
]

export const audience = [
  'Students & graduates exploring a creative career',
  'Job seekers & career switchers',
  'Freelancers who want structured, professional-grade skills',
  'Entrepreneurs & business owners who design their own content',
  'Creative enthusiasts who want to work with brands professionally',
]

export const prerequisites = [
  'No prior design or software experience required — the program starts from fundamentals',
  'A laptop or desktop capable of running Adobe Creative Cloud apps',
  'A stable internet connection for live online classes',
  'Access to ChatGPT, Gemini and Claude (free tiers are sufficient to start)',
]

export const toolsList = [
  { name: 'Adobe Illustrator', category: 'Design Software' },
  { name: 'Adobe Photoshop', category: 'Design Software' },
  { name: 'Adobe InDesign', category: 'Design Software' },
  { name: 'ChatGPT', category: 'AI Co-Pilot' },
  { name: 'Gemini', category: 'AI Co-Pilot' },
  { name: 'Claude', category: 'AI Co-Pilot' },
]

export const curriculum: CurriculumWeek[] = [
  {
    month: 1,
    week: 1,
    title: 'Introduction to Graphic Design',
    topics: [
      'What graphic design is, and where it is used: branding, advertising, social, print, packaging, digital marketing, editorial',
      'The professional design process — Brief → Research → Ideation → Concept → Design → Feedback → Revision → Final Delivery',
      'Understanding client requirements: business objective, audience, brand personality, competitors, deliverables and constraints',
    ],
    assignment: 'Analyse three existing advertisements for target audience, message, typography, colour strategy, visual hierarchy and CTA.',
  },
  {
    month: 1,
    week: 2,
    title: 'Design Principles',
    topics: [
      'Elements of design: line, shape, form, colour, texture, space, typography, imagery',
      'Principles of design: balance, alignment, contrast, repetition, emphasis, rhythm, unity, scale, white space',
      'Visual hierarchy — controlling what a viewer sees first, second and third',
    ],
    assignment: 'Redesign a promotional poster, an Instagram creative and an event poster to improve hierarchy rather than decoration.',
  },
  {
    month: 1,
    week: 3,
    title: 'Colour Theory & Typography',
    topics: [
      'Colour wheel, harmony schemes and colour psychology',
      'RGB, CMYK, HEX and Pantone basics for digital vs print colour',
      'Type classification, kerning, tracking, leading and typography hierarchy',
      'Font pairing: heading + body combinations and creating visual contrast',
    ],
    assignment: 'Develop colour systems for three hypothetical brands, plus a typography poster and a brand typography system.',
  },
  {
    month: 1,
    week: 4,
    title: 'Adobe Illustrator',
    topics: [
      'Illustrator workspace: artboards, layers, and the professional vector workflow',
      'Essential tools: Pen, Shape Builder, Pathfinder, Gradient, Type',
      'Vector concepts: anchor points, paths, compound paths, clipping masks',
    ],
    assignment: 'Create an icon set, a typography logo, a symbol logo, a combination mark, a business card and a basic brand identity.',
  },
  {
    month: 2,
    week: 5,
    title: 'Logo Design & Brand Identity',
    topics: [
      'Logo categories: wordmark, lettermark, symbol, combination mark, emblem, mascot',
      'The professional logo process: brief → research → moodboard → sketching → vector construction → presentation',
      'Logo construction: geometry, grid systems, negative space, scalability, black-and-white testing',
    ],
    assignment: 'Create a complete logo for a fictional or approved project.',
  },
  {
    month: 2,
    week: 6,
    title: 'Brand Identity Design',
    topics: [
      'Logo ≠ Brand: primary/secondary logo, colour palette, typography, iconography, patterns',
      'Brand applications: business card, letterhead, ID card, social profile, packaging mockup, signage',
      'Documenting brand guidelines: usage, clear space, minimum size, incorrect usage',
    ],
    assignment: 'Major Project 1 — a complete brand identity project.',
  },
  {
    month: 2,
    week: 7,
    title: 'Adobe Photoshop',
    topics: [
      'Photoshop workspace: layers, smart objects, masks, adjustment layers',
      'Selection and editing: background removal, colour correction, levels/curves',
      'Retouching and compositing: lighting consistency, shadows, colour matching',
    ],
    assignment: 'Create a product advertisement, a movie-style poster, a social media advertisement and an image-manipulation artwork.',
  },
  {
    month: 2,
    week: 8,
    title: 'Social Media & Advertising Design',
    topics: [
      'Creative specs for Instagram, Stories, Reels covers, Facebook, LinkedIn and YouTube thumbnails',
      'Performance creative fundamentals: scroll-stopping headlines, product focus, CTA placement, mobile readability',
      'The 60:20:20 approach — primary visual, supporting information, CTA — used as a practical guideline',
    ],
    assignment: 'Build a mini campaign: 3 static ads, 3 social posts, 2 story creatives, 2 Reel covers and 1 YouTube thumbnail.',
  },
  {
    month: 3,
    week: 9,
    title: 'Adobe InDesign',
    topics: [
      'Pages, spreads, master pages, margins, columns and guides',
      'Paragraph styles, character styles and grid systems',
      'Editorial layout: baseline consistency, typography hierarchy, page rhythm',
    ],
    assignment: 'Design a flyer, a brochure, a company profile and a multi-page document.',
  },
  {
    month: 3,
    week: 10,
    title: 'Print Design & Production',
    topics: [
      'CMYK vs RGB, DPI/PPI, bleed, trim, safe area and crop marks',
      'Preparing vector assets, image resolution and correct PDF export',
      'Preflight checklist before submitting print files',
    ],
    assignment: 'Design business cards, flyers, brochures, posters and corporate stationery.',
  },
  {
    month: 3,
    week: 11,
    title: 'Packaging Design',
    topics: [
      'Packaging hierarchy: front-of-pack communication, product naming, information hierarchy',
      'Dieline basics, safe zones, bleed and mockup presentation',
      'Packaging workflow: product research → competitor analysis → concept → dieline → mockup',
    ],
    assignment: 'Major Project 2 — packaging design for a chosen category (food, cosmetics, personal care, pet or consumer products).',
  },
  {
    month: 3,
    week: 12,
    title: 'Portfolio & Career Preparation',
    topics: [
      'Case-study structure: overview, problem, audience, research, moodboard, concept, design system, applications, final presentation',
      'Curating 8–12 portfolio-quality projects — quality over quantity',
      'The Final Capstone Project: a realistic brief executed through the full 7-stage agency process',
    ],
    assignment: 'Convert your strongest projects into complete portfolio case studies and complete the Final Capstone Brand Project.',
  },
]

export const aiWorkflowSteps: WorkflowStep[] = [
  { label: 'Brief' },
  { label: 'Research with AI' },
  { label: 'Ideation' },
  { label: 'Design' },
  { label: 'AI-Assisted Refinement' },
  { label: 'Human Review' },
  { label: 'Final Output' },
]

export const aiTools: AiTool[] = [
  {
    name: 'ChatGPT',
    role: 'Brief analysis, research and content development',
    uses: [
      'Understanding briefs and forming discovery questions',
      'Brand, audience and competitor research',
      'Naming, tagline and campaign concept exploration',
      'Ad copy, social content and presentation structure',
      'Design critique and case-study writing',
    ],
  },
  {
    name: 'Gemini',
    role: 'Research and creative exploration',
    uses: [
      'Research assistance and idea exploration',
      'Reference analysis and creative direction',
      'Campaign ideation and alternative concepts',
      'Multimodal exploration where relevant',
    ],
  },
  {
    name: 'Claude',
    role: 'Strategy and long-form documentation',
    uses: [
      'Long creative briefs and brand strategy documents',
      'Organising research and structuring content',
      'Brand guideline drafts and campaign planning',
      'Comparing creative directions for a project',
    ],
  },
]

export const responsibleAiPoints = [
  'AI output is not automatically correct — every response is checked, not assumed',
  'Copyright, trademark and commercial-usage awareness before using any AI output',
  'Avoiding direct imitation and plagiarism of existing work',
  'Human creative judgement and originality stay in charge of every design decision',
]

export const projectTypes = [
  'Logo Design',
  'Complete Brand Identity',
  'Social Media Campaign',
  'Advertisement Creative',
  'Product Advertisement',
  'Poster Design',
  'Brochure / Editorial Project',
  'Packaging Design',
  'Brand Collateral',
  'AI-Assisted Creative Campaign',
  'Brand Redesign',
  'Final Capstone Brand Project',
]

export const agencyWorkflowSteps: WorkflowStep[] = [
  { label: 'Client Brief' },
  { label: 'Research' },
  { label: 'Concept' },
  { label: 'Design' },
  { label: 'Client Presentation' },
  { label: 'Feedback' },
  { label: 'Revision' },
  { label: 'Final Delivery' },
]

export const fileHandoverStructure = [
  '01 — Source Files',
  '02 — Final Files',
  '03 — Print Files',
  '04 — Web Files',
  '05 — Mockups',
  '06 — Brand Guidelines',
]

export const portfolioProcessSteps: ProcessStep[] = [
  { number: '01', title: 'Project Overview', text: 'What was the project?' },
  { number: '02', title: 'Problem', text: 'What problem needed to be solved?' },
  { number: '03', title: 'Target Audience', text: 'Who was the design intended for?' },
  { number: '04', title: 'Research', text: 'What was discovered during research?' },
  { number: '05', title: 'Moodboard', text: 'What visual direction was selected?' },
  { number: '06', title: 'Concept', text: 'Why was this direction chosen?' },
  { number: '07', title: 'Design System', text: 'Typography, colour and visual elements.' },
  { number: '08', title: 'Applications', text: 'How the design works in real situations.' },
  { number: '09', title: 'Final Presentation', text: 'Professional mockups and finished designs.' },
]

export const internshipPoints = [
  'Understanding real creative briefs and working within deadlines',
  'Creating concepts, receiving feedback and revising designs',
  'Preparing deliverables within brand guidelines',
  'Maintaining professional client-style communication',
]

export const careerRoles = [
  'Graphic Designer',
  'Brand Identity Designer',
  'Social Media Designer',
  'Marketing Designer',
  'Junior Visual Designer',
  'Packaging Designer',
  'Freelance Graphic Designer',
]

export const careerSupport = [
  'Portfolio review and refinement',
  'Resume and profile guidance',
  'Interview preparation',
  'Freelance and client-handling guidance',
  'Job-search guidance',
]

export const certifications = [
  {
    title: 'Course Completion Certificate',
    text: 'Issued to every student who completes the AI-Powered Graphic Design Program.',
  },
  {
    title: 'Internship / Project Exposure Certificate',
    text: 'Issued to eligible students who complete the internship/project exposure component, where applicable.',
  },
]

export const admissionSteps = [
  'Enquire',
  'Counselling',
  'Course Details',
  'Registration',
  'Fee Payment',
  'Onboarding',
  'Classes Begin',
]

export const showcaseImages: ShowcaseImage[] = [
  { src: '/Logo%20Design%20Samples.png', alt: 'Logo design samples', caption: 'Demonstration project — logo design' },
  { src: '/Mindspace.png', alt: 'Mindspace brand mockup', caption: 'Demonstration project — app branding visual' },
  { src: '/Mindspace_userjourney.png', alt: 'Mindspace user journey mockup', caption: 'Demonstration project — case study presentation layout' },
]
