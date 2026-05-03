export type BlogSection = {
  id: string
  eyebrow?: string
  heading: string
  paragraphs: string[]
  bullets?: string[]
  image?: string
  imageAlt?: string
}

export type BlogPost = {
  id: string
  slug: string
  status: 'published' | 'draft'
  featured: boolean
  title: string
  subtitle: string
  excerpt: string
  category: string
  author: string
  publishedAt: string
  readTime: string
  coverImage: string
  coverImageAlt: string
  tags: string[]
  seoTitle: string
  seoDescription: string
  intro: string[]
  sections: BlogSection[]
  ctaTitle: string
  ctaText: string
  ctaLabel: string
  ctaHref: string
}

export const BLOG_STORAGE_KEY = 'tsdc-blog-posts-v1'
export const BLOG_DELETED_KEY = 'tsdc-blog-posts-deleted-v1'

const createPost = (post: BlogPost): BlogPost => post

export const defaultBlogPosts: BlogPost[] = [
  createPost({
    id: 'ai-design-tools-graphic-design-students-2026',
    slug: 'best-ai-design-tools-for-graphic-design-students',
    status: 'published',
    featured: true,
    title: 'Best AI Design Tools for Graphic Design Students in 2026',
    subtitle: 'A practical TSDC guide to the AI tools that actually help students research faster, design better, and build stronger portfolios.',
    excerpt:
      'AI is not replacing design students. It is helping them brainstorm faster, research deeper, produce more variations, and move from rough idea to presentable work with less friction.',
    category: 'AI Design Tools',
    author: 'TSDC Creative Team',
    publishedAt: '2026-04-11',
    readTime: '10 min read',
    coverImage: '/graphicdesign.png',
    coverImageAlt: 'Graphic design student using AI-powered creative tools',
    tags: ['AI design tools', 'graphic design', 'design students', 'creative careers', 'TSDC Chennai'],
    seoTitle: 'Best AI Design Tools for Graphic Design Students in 2026 | TSDC Blog',
    seoDescription:
      'Discover the best AI design tools for graphic design students in 2026, including research, ideation, image generation, layouts, branding, and portfolio workflow tips from TSDC.',
    intro: [
      'If you are learning graphic design in 2026, one thing is already clear: knowing only software is not enough. Students who stand out are the ones who know how to combine design thinking with faster research, stronger ideation, and cleaner execution.',
      'That is where AI tools become useful. Not because they magically make someone a designer, but because they reduce repetitive work and give students more time to focus on layout, concept, hierarchy, typography, and storytelling.',
      'At TSDC, we look at AI as a creative support system. The best tools help students explore more directions, test ideas quickly, and present better work in less time, while still learning the fundamentals that matter in real jobs and freelance work.',
    ],
    sections: [
      {
        id: 'why-ai-matters',
        eyebrow: 'Start here',
        heading: 'Why AI matters for graphic design students',
        paragraphs: [
          'Most beginners waste a lot of time before the actual design work even starts. They struggle to collect references, define a concept, write content, test headlines, or figure out which direction is worth developing. AI tools help compress that early confusion.',
          'Used properly, AI can help students generate moodboard ideas, summarize a client brief, rewrite messy content into clearer structure, explore naming directions, and produce faster first drafts. That means more energy can go into the parts that still need human judgment: visual quality, consistency, originality, and communication.',
        ],
        bullets: [
          'Faster creative research and competitor scanning',
          'More concept options before choosing a direction',
          'Better first drafts for copy, headlines, and campaign ideas',
          'Quicker production support for mockups, images, and presentation material',
        ],
        image: '/UIUXDesign.png',
        imageAlt: 'Students exploring research and ideation workflows',
      },
      {
        id: 'core-tool-stack',
        eyebrow: 'Best stack',
        heading: 'A strong beginner stack mixes language, research, and visual production tools',
        paragraphs: [
          'Language tools such as ChatGPT or Claude help students unpack briefs, structure campaign ideas, and challenge weak concepts. Research tools such as Perplexity help them gather better context quickly. Visual tools such as Firefly, Canva Magic Studio, and Figma AI help them move faster during execution.',
          'The point is not to let AI do the creative judgment. The point is to reduce friction so students can spend more time refining layout, hierarchy, and presentation quality.',
        ],
        bullets: [
          'Use language models for concept development and content structure',
          'Use research tools to gather audience and category insight',
          'Use visual tools for fast first drafts, then refine manually',
        ],
        image: '/Digital_marketing.png',
        imageAlt: 'Research and design production workflow',
      },
      {
        id: 'fundamentals-still-win',
        eyebrow: 'Important reminder',
        heading: 'Fundamentals still decide whether the final work feels strong',
        paragraphs: [
          'Students sometimes assume AI will cover for weak design thinking. It will not. If the hierarchy is weak, the typography feels random, or the composition lacks intent, the output still looks amateur.',
          'The winning combination is simple: learn fundamentals, then use AI to move faster without losing control of quality.',
        ],
      },
    ],
    ctaTitle: 'Want to learn graphic design with modern AI workflows?',
    ctaText:
      'At TSDC, students do not just watch tools in action. They learn how to use them inside real design projects, portfolio work, and job-ready creative systems.',
    ctaLabel: 'Explore Graphic Design Course',
    ctaHref: '/courses/graphic-design',
  }),
  createPost({
    id: 'ui-ux-course-guide-chennai-beginners-2026',
    slug: 'ui-ux-course-guide-chennai-beginners',
    status: 'published',
    featured: false,
    title: 'How to Choose the Right UI/UX Course in Chennai as a Beginner',
    subtitle: 'A grounded guide for students comparing UI/UX programs, portfolios, mentors, and placement promises.',
    excerpt:
      'A good UI/UX course should help you build case studies, think through user problems, and explain your design decisions clearly, not just learn where the buttons are in Figma.',
    category: 'UI/UX Careers',
    author: 'TSDC Creative Team',
    publishedAt: '2026-04-10',
    readTime: '8 min read',
    coverImage: '/UIUXDesign.png',
    coverImageAlt: 'UI/UX design learning path for beginners in Chennai',
    tags: ['ui ux course chennai', 'beginner ui ux', 'figma training', 'design career'],
    seoTitle: 'How to Choose the Right UI/UX Course in Chennai | TSDC Blog',
    seoDescription:
      'Compare UI/UX courses in Chennai with a practical checklist covering mentors, portfolio work, case studies, and placement outcomes.',
    intro: [
      'UI/UX is one of the most searched creative career paths right now, but that also means students are flooded with vague promises.',
      'The better question is simpler: will the course help you think like a designer and leave with work worth showing?',
      'If you are comparing UI/UX courses in Chennai, here is the filter we recommend students use before joining anything.',
    ],
    sections: [
      {
        id: 'portfolio-first',
        eyebrow: 'Checkpoint 1',
        heading: 'Look for portfolio-first learning, not tool-only teaching',
        paragraphs: [
          'Recruiters do not shortlist freshers because they know where Figma panels live. They shortlist people who can explain a problem, show a process, and present the outcome clearly.',
          'A stronger UI/UX course starts with user understanding, flows, wireframes, visual systems, testing, and case-study writing. The tool should support the thinking, not replace it.',
        ],
        bullets: [
          'Ask how many case studies you will complete',
          'Check whether research and testing are part of the curriculum',
          'Look for end-to-end portfolio outcomes instead of isolated screens',
        ],
      },
      {
        id: 'mentor-relevance',
        eyebrow: 'Checkpoint 2',
        heading: 'Ask who is teaching and whether they still work in the field',
        paragraphs: [
          'Students learn faster when feedback comes from active practice. Someone still working in product or design systems will catch different mistakes than someone repeating the same slides for years.',
          'That matters because interface patterns, handoff expectations, and hiring filters change quickly.',
        ],
        image: '/our-story.png',
        imageAlt: 'Mentor-led product design classroom',
      },
      {
        id: 'placement-reality',
        eyebrow: 'Checkpoint 3',
        heading: 'Treat placement claims carefully and focus on proof',
        paragraphs: [
          'Placement support matters, but only when the course helps you produce portfolio work, prepare for interviews, and understand how to present process clearly.',
          'Honest institutes talk about readiness, not magic. They help you get stronger and more visible instead of pretending a certificate does the work for you.',
        ],
      },
    ],
    ctaTitle: 'Want a UI/UX program built around case studies and real reviews?',
    ctaText:
      'TSDC teaches UI/UX through practical projects, mentor critique, Figma workflows, and portfolio-ready case studies designed for beginners.',
    ctaLabel: 'Explore UI/UX Course',
    ctaHref: '/courses/uiux-design',
  }),
  createPost({
    id: 'graphic-design-vs-ui-ux-career-path-chennai',
    slug: 'graphic-design-vs-ui-ux-career-path-chennai',
    status: 'published',
    featured: false,
    title: 'Graphic Design vs UI/UX Design: Which Course Fits You Better?',
    subtitle: 'A practical comparison for students deciding between visual communication and product design careers.',
    excerpt:
      'Graphic Design and UI/UX often get grouped together, but the day-to-day work, portfolio style, and career direction are different enough that students should choose deliberately.',
    category: 'Course Comparison',
    author: 'TSDC Creative Team',
    publishedAt: '2026-04-09',
    readTime: '7 min read',
    coverImage: '/graphicdesign.png',
    coverImageAlt: 'Graphic design and UI/UX comparison for students',
    tags: ['graphic design vs ui ux', 'design course comparison', 'creative careers'],
    seoTitle: 'Graphic Design vs UI/UX Design Course Comparison | TSDC Blog',
    seoDescription:
      'Compare Graphic Design and UI/UX Design careers, portfolios, tools, and learning paths to choose the right course in Chennai.',
    intro: [
      'Students usually discover both Graphic Design and UI/UX at the same time, especially when they start researching creative careers online.',
      'The confusion makes sense, but the output is different. Graphic Design focuses on communication through visuals. UI/UX focuses on solving product problems through interfaces and user flow.',
      'If you are trying to decide which one fits you better, use the comparison below.',
    ],
    sections: [
      {
        id: 'work-style',
        eyebrow: 'Difference 1',
        heading: 'The day-to-day work style is different',
        paragraphs: [
          'Graphic designers usually work on brand systems, posters, campaigns, packaging, and social creatives. UI/UX designers usually work on apps, websites, dashboards, flows, and design systems.',
          'Both need taste and clarity, but UI/UX usually demands more problem-structuring and product thinking.',
        ],
      },
      {
        id: 'portfolio-output',
        eyebrow: 'Difference 2',
        heading: 'Your portfolio output will not look the same',
        paragraphs: [
          'Graphic Design portfolios usually show identity systems, posters, packaging, and campaign creatives. UI/UX portfolios usually show user problems, wireframes, prototypes, testing, and case studies.',
          'Students should think about what kind of work they want to keep creating for years, not just which software feels exciting today.',
        ],
        bullets: [
          'Graphic Design usually leans into Photoshop, Illustrator, and brand presentation',
          'UI/UX usually leans into Figma, flows, prototypes, and case-study storytelling',
          'Your portfolio should match the jobs you want later',
        ],
        image: '/UIUXDesign.png',
        imageAlt: 'Design portfolio direction for students',
      },
      {
        id: 'decision-filter',
        eyebrow: 'Simple filter',
        heading: 'Choose based on the problems you want to solve',
        paragraphs: [
          'If you enjoy visuals, typography, color, campaign ideas, and brand expression, Graphic Design is usually the better fit. If you enjoy structure, user journeys, app thinking, and clarity through interfaces, UI/UX is usually the stronger path.',
          'Neither path is smaller. They simply reward different kinds of thinking.',
        ],
      },
    ],
    ctaTitle: 'Still deciding between Graphic Design and UI/UX?',
    ctaText:
      'TSDC helps students choose based on strengths, work style, and long-term goals instead of trends alone.',
    ctaLabel: 'Compare Courses',
    ctaHref: '/courses',
  }),
  createPost({
    id: 'digital-marketing-course-chennai-job-market-2026',
    slug: 'digital-marketing-course-chennai-job-market-2026',
    status: 'published',
    featured: false,
    title: 'Is Digital Marketing Still a Smart Career in Chennai in 2026?',
    subtitle: 'Why businesses still need people who understand content, ads, search, and reporting.',
    excerpt:
      'Digital marketing remains one of the most practical entry points into modern business because almost every local company now depends on visibility, leads, and measurable growth.',
    category: 'Digital Marketing Careers',
    author: 'TSDC Creative Team',
    publishedAt: '2026-04-08',
    readTime: '8 min read',
    coverImage: '/Digital_marketing.png',
    coverImageAlt: 'Digital marketing career opportunities in Chennai',
    tags: ['digital marketing chennai', 'seo jobs', 'paid ads', 'growth marketing'],
    seoTitle: 'Digital Marketing Career Scope in Chennai 2026 | TSDC Blog',
    seoDescription:
      'Understand the digital marketing job market in Chennai, including SEO, paid ads, analytics, and content-driven roles in 2026.',
    intro: [
      'Every year students ask whether digital marketing is already too crowded. The better question is whether businesses still need leads, traffic, conversions, and stronger visibility. They do.',
      'In Chennai especially, digital marketing remains relevant because local businesses, startups, clinics, education brands, e-commerce sellers, and service companies all need performance and visibility support.',
      'What has changed is the skill mix employers expect from beginners.',
    ],
    sections: [
      {
        id: 'why-demand-stays',
        eyebrow: 'The reality',
        heading: 'Demand stays because businesses still need measurable growth',
        paragraphs: [
          'A strong digital marketer is useful because they can connect spend to outcomes. Businesses want to know whether a campaign brought calls, leads, signups, store visits, or online sales.',
          'That is why SEO, Google Ads, Meta Ads, content planning, and analytics still matter. The platform names may change over time, but the need for customer acquisition does not.',
        ],
        bullets: [
          'Local businesses need Google visibility and lead generation',
          'Brands still need Meta and Google campaign support',
          'Analytics and reporting remain a major differentiator for beginners',
        ],
      },
      {
        id: 'skills-that-matter',
        eyebrow: 'What employers notice',
        heading: 'The most useful beginner stack is broad but practical',
        paragraphs: [
          'Employers do not expect freshers to be masters at everything, but they do notice when someone understands the relationship between content, search, paid campaigns, and reporting.',
          'A student who can run a clean ad test, improve a landing page headline, track a campaign, and explain results will usually stand out faster than someone who only memorized definitions.',
        ],
        image: '/marketing.png',
        imageAlt: 'Growth reporting and campaign workflow',
      },
      {
        id: 'good-course-check',
        eyebrow: 'Before you join',
        heading: 'Choose a course that shows campaigns, not just slides',
        paragraphs: [
          'The best digital marketing programs make students work through campaign logic, ad setup, reporting, and optimization. Passive theory is not enough here because performance work depends on applied judgment.',
          'Students should look for live exercises, reporting templates, and projects they can discuss during interviews.',
        ],
      },
    ],
    ctaTitle: 'Want practical digital marketing training instead of theory overload?',
    ctaText:
      'TSDC teaches SEO, paid ads, content systems, and analytics through projects designed for job-ready confidence.',
    ctaLabel: 'Explore Digital Marketing Course',
    ctaHref: '/courses/digital-marketing',
  }),
  createPost({
    id: 'video-editing-course-worth-it-creators-brands',
    slug: 'video-editing-course-worth-it-creators-brands',
    status: 'published',
    featured: false,
    title: 'Why Video Editing Skills Are Becoming Essential for Creators and Brands',
    subtitle: 'From reels to ads, editing has become one of the clearest creative income skills students can build.',
    excerpt:
      'Video editing is no longer a niche add-on. It is now tied directly to content growth, brand storytelling, performance marketing, and creator-led business models.',
    category: 'Video Editing Careers',
    author: 'TSDC Creative Team',
    publishedAt: '2026-04-07',
    readTime: '7 min read',
    coverImage: '/graphic.png',
    coverImageAlt: 'Video editing workflow for creators and brand content',
    tags: ['video editing course', 'reels editing', 'after effects', 'creator economy'],
    seoTitle: 'Why Video Editing Skills Matter for Creators and Brands | TSDC Blog',
    seoDescription:
      'Learn why video editing, reels, brand films, and motion-led content are creating strong opportunities for students and freelancers in 2026.',
    intro: [
      'Almost every student sees the demand for video now, but many still underestimate how wide the opportunity has become. Editing is not just for YouTubers anymore.',
      'Brands need reels. Agencies need ad variations. Coaches need course clips. Startups need explainers. Creators need consistent output. Someone has to shape that raw footage into content people actually watch.',
      'That is why video editing has become one of the strongest practical skills for beginners who want visible output and faster monetization potential.',
    ],
    sections: [
      {
        id: 'why-demand',
        eyebrow: 'Why it matters',
        heading: 'The demand is linked to content volume',
        paragraphs: [
          'Content velocity has changed everything. Businesses do not need one annual video anymore. They need constant short-form and campaign-led output. That creates ongoing demand for editors who can work with speed and clarity.',
          'A student who understands pace, transitions, subtitles, hooks, sound, and motion polish can become valuable across multiple industries quickly.',
        ],
        bullets: [
          'Reels and shorts keep demand high for editors',
          'Commercial content now depends on faster turnaround cycles',
          'Motion design adds extra differentiation for editors who want to charge more',
        ],
      },
      {
        id: 'student-opportunities',
        eyebrow: 'Where students start',
        heading: 'Beginners can enter through freelance, internship, or creator support work',
        paragraphs: [
          'Unlike some creative paths that require long timelines before visible output, video editing can become marketable relatively quickly if the student builds a strong reel and works on varied short-form content.',
          'Many students begin by editing reels for local brands, creators, or course businesses before moving into more polished brand and motion work.',
        ],
        image: '/graphicdesign.png',
        imageAlt: 'Creative editing and showreel development setup',
      },
      {
        id: 'course-filter',
        eyebrow: 'Choosing a course',
        heading: 'A good program should teach workflow, not only software buttons',
        paragraphs: [
          'Software matters, but workflow matters more. Good training shows students how to organize footage, pace edits, choose visuals, build hooks, handle audio, and finish polished exports.',
          'That is the difference between someone who knows Premiere Pro and someone who can actually deliver content that performs.',
        ],
      },
    ],
    ctaTitle: 'Want to build a showreel with brand-ready edits and motion work?',
    ctaText:
      'TSDC teaches editing through reels, campaign videos, motion graphics, and practical showreel-building projects.',
    ctaLabel: 'Explore Video Editing Course',
    ctaHref: '/courses/video-editing',
  }),
  createPost({
    id: 'creative-career-options-tamil-nadu-students-2026',
    slug: 'creative-career-options-tamil-nadu-students-2026',
    status: 'published',
    featured: false,
    title: 'Creative Career Options for Students in Tamil Nadu After School or College',
    subtitle: 'A practical look at design, digital, and content paths students can start without waiting years to build proof.',
    excerpt:
      'Students often think creative careers are vague or risky, but many design and marketing paths become clearer once you understand what skills lead to visible portfolio work.',
    category: 'Career Guidance',
    author: 'TSDC Creative Team',
    publishedAt: '2026-04-06',
    readTime: '9 min read',
    coverImage: '/our-story.png',
    coverImageAlt: 'Creative career paths for students in Tamil Nadu',
    tags: ['creative careers tamil nadu', 'design careers', 'career guidance', 'students'],
    seoTitle: 'Creative Career Options for Students in Tamil Nadu | TSDC Blog',
    seoDescription:
      'Explore practical creative career options including Graphic Design, UI/UX, Digital Marketing, and Video Editing for students in Tamil Nadu.',
    intro: [
      'A lot of students know they want a creative career, but they do not know what that actually means in day-to-day work. The result is hesitation.',
      'The good news is that creative careers are more structured now than many students realize. There are clear paths, portfolio expectations, and skill stacks that lead to visible opportunities faster than before.',
      'Here are some of the strongest options students in Tamil Nadu can look at after school or college.',
    ],
    sections: [
      {
        id: 'graphic-design-path',
        eyebrow: 'Option 1',
        heading: 'Graphic Design is strong for students who think visually and love communication',
        paragraphs: [
          'Graphic Design fits students who enjoy posters, branding, layouts, packaging, and social content. The path works well because it creates tangible output quickly and makes portfolio growth visible.',
          'It can lead into agency jobs, in-house design roles, freelance branding, and content-led work for businesses of all sizes.',
        ],
      },
      {
        id: 'uiux-path',
        eyebrow: 'Option 2',
        heading: 'UI/UX Design works for students who enjoy solving structure and usability problems',
        paragraphs: [
          'Students who enjoy apps, websites, interface clarity, and product thinking often fit UI/UX better than communication-heavy visual design. It rewards process, logic, and presentation of decisions.',
          'Because product companies and startups keep growing around Chennai, this path can be especially attractive for students who want a longer-term design career inside tech.',
        ],
      },
      {
        id: 'marketing-video',
        eyebrow: 'Option 3 and 4',
        heading: 'Digital Marketing and Video Editing are practical paths for students who want visible business impact',
        paragraphs: [
          'Digital Marketing suits students who like campaigns, audience behavior, content strategy, and measurable outcomes. Video Editing suits students who want fast-moving visual output and creator or brand-led content work.',
          'Both fields connect closely to how modern businesses grow, which makes them highly relevant to freelancing and entry-level job roles.',
        ],
        bullets: [
          'Digital Marketing can lead into SEO, paid ads, analytics, and social roles',
          'Video Editing can lead into reels, brand content, showreels, and motion-led projects',
          'Both can become freelancing pathways relatively early with the right portfolio',
        ],
      },
    ],
    ctaTitle: 'Need help choosing the right creative path?',
    ctaText:
      'TSDC helps students compare strengths, interests, and practical outcomes so they can pick a course with confidence.',
    ctaLabel: 'Explore All Courses',
    ctaHref: '/courses',
  }),
  createPost({
    id: 'graphic-design-course-chennai-fees-duration-portfolio-guide',
    slug: 'graphic-design-course-chennai-fees-duration-portfolio-guide',
    status: 'published',
    featured: false,
    title: 'Graphic Design Course in Chennai: Fees, Duration, Tools, and Portfolio Expectations',
    subtitle: 'A practical buying guide for students comparing graphic design programs in Chennai.',
    excerpt:
      'Students usually compare design courses based on fees alone, but the better filter is what kind of portfolio, software confidence, and project quality you will actually leave with.',
    category: 'Graphic Design Courses',
    author: 'TSDC Creative Team',
    publishedAt: '2026-05-03',
    readTime: '9 min read',
    coverImage: '/graphicdesign.png',
    coverImageAlt: 'Graphic design course guide for students in Chennai',
    tags: ['graphic design course chennai', 'graphic design fees chennai', 'design course duration', 'portfolio training'],
    seoTitle: 'Graphic Design Course in Chennai: Fees, Duration, and Portfolio Guide | TSDC',
    seoDescription:
      'Compare graphic design course fees, duration, tools, and portfolio expectations in Chennai so you can choose a program that actually improves your job readiness.',
    intro: [
      'Students searching for a graphic design course in Chennai often compare three things first: fees, duration, and software. Those matter, but they do not tell the full story.',
      'A stronger question is what kind of work you will leave with. If the course ends with a certificate but no portfolio, it is harder to convert that learning into interviews or freelance work.',
      'This guide breaks down how students can judge a graphic design program more clearly before they enroll.',
    ],
    sections: [
      {
        id: 'beyond-fees',
        eyebrow: 'Start here',
        heading: 'Fees matter, but portfolio quality matters more',
        paragraphs: [
          'Low-cost programs can look attractive at first, but if they only teach software buttons without live critique or project structure, students often finish with weak output. That creates a second problem: they still need extra time to become job-ready.',
          'A better comparison includes feedback quality, project depth, tools covered, and whether the course helps you present work professionally.',
        ],
        bullets: [
          'Compare project count, not just classroom hours',
          'Check whether branding, layout, and presentation are taught',
          'Ask what portfolio pieces students usually finish by the end',
        ],
      },
      {
        id: 'tools-and-duration',
        eyebrow: 'What to compare',
        heading: 'Duration and software should match the outcome you want',
        paragraphs: [
          'If you want agency-ready or freelance-ready work, the course should cover more than Photoshop. Stronger programs usually include Illustrator, layout thinking, branding systems, and portfolio presentation.',
          'A short course can still work if it is highly practical, but students should be careful about unrealistic promises that compress too much into too little time.',
        ],
        image: '/graphic.png',
        imageAlt: 'Practical design learning and Adobe workflow',
      },
      {
        id: 'portfolio-filter',
        eyebrow: 'Best filter',
        heading: 'Choose the course that gives you proof, not just exposure',
        paragraphs: [
          'The students who grow fastest are the ones who finish with visible proof: identity systems, social media campaigns, packaging, ad creatives, and presentation-ready mockups.',
          'That is what makes interviews easier. It also makes freelance pitching easier because you are not trying to explain your potential only in words.',
        ],
      },
    ],
    ctaTitle: 'Want a graphic design course built around portfolio proof?',
    ctaText:
      'TSDC teaches graphic design through branding, layout systems, real projects, and portfolio reviews designed for practical job readiness in Chennai.',
    ctaLabel: 'Explore Graphic Design Course',
    ctaHref: '/courses/graphic-design',
  }),
  createPost({
    id: 'top-graphic-design-institutes-chennai-india-guide-2026',
    slug: 'top-graphic-design-institutes-chennai-india-how-to-choose',
    status: 'published',
    featured: false,
    title: 'Top Graphic Design Institutes in Chennai and India: How to Choose the Right One',
    subtitle: 'A practical guide to evaluating graphic design programs on what actually matters — portfolio output, mentors, tools, and outcomes.',
    excerpt:
      'Choosing a graphic design institute is less about brand name and more about what kind of portfolio, feedback, and real-world exposure you leave with.',
    category: 'Graphic Design Courses',
    author: 'TSDC Creative Team',
    publishedAt: '2026-05-03',
    readTime: '9 min read',
    coverImage: '/graphicdesign.png',
    coverImageAlt: 'Top graphic design institutes in Chennai — how to choose the right program',
    tags: ['top graphic design institutes chennai', 'best graphic design institute india', 'graphic design course near me', 'affordable graphic design course'],
    seoTitle: 'Top Graphic Design Institutes in Chennai and India: How to Choose | TSDC',
    seoDescription:
      'Compare graphic design institutes in Chennai and India using a practical checklist covering mentors, portfolio outcomes, tools, fees, and real project exposure.',
    intro: [
      'Students searching for the top graphic design institutes in Chennai or India quickly find a long list of options. The harder part is figuring out which one will actually make you more hireable or freelance-ready.',
      'Brand names and certificates matter less than most students think. What matters most is the quality of projects you finish, the feedback you receive, and whether the training prepares you for real design work.',
      'Here is the filter we recommend before you commit to any graphic design program in Chennai or anywhere in India.',
    ],
    sections: [
      {
        id: 'portfolio-output',
        eyebrow: 'Filter 1',
        heading: 'Ask what finished work you will leave with',
        paragraphs: [
          'The single most important question to ask any institute is: what will my portfolio look like at the end? If the answer involves only software certificates or attendance records, that is a warning sign.',
          'Strong graphic design programs produce tangible output — brand identities, packaging mockups, social media campaigns, and print-ready projects. These are what employers and clients actually evaluate. A program that does not prioritize portfolio building is preparing you to talk about design, not do it.',
        ],
        bullets: [
          'Ask how many projects are completed during the course',
          'Check whether students get mentor critique on each project',
          'Look for programs where real briefs replace textbook exercises',
          'Confirm whether your work will be ready to show in interviews and freelance pitches',
        ],
        image: '/graphicdesign.png',
        imageAlt: 'Student graphic design portfolio and project work',
      },
      {
        id: 'mentors-and-tools',
        eyebrow: 'Filter 2',
        heading: 'Check who is teaching and which tools are covered',
        paragraphs: [
          'Graphic design skills are tool-dependent in the early stages. A program that only covers one software — say Photoshop but not Illustrator — limits how versatile you can be as a beginner. Most agency and studio roles expect comfort across Photoshop, Illustrator, and InDesign at minimum.',
          'Equally important is the mentor. A trainer who still works in the industry will give you feedback that matches current employer expectations, not outdated workflows from five years ago.',
        ],
        bullets: [
          'Look for programs covering Photoshop, Illustrator, and InDesign together',
          'Ask whether Canva Pro and Figma are part of the curriculum',
          'Check whether trainers have active industry or freelance experience',
        ],
        image: '/graphic.png',
        imageAlt: 'Adobe tools taught in professional graphic design courses',
      },
      {
        id: 'fee-vs-outcome',
        eyebrow: 'Filter 3',
        heading: 'Affordable does not mean cheap on outcomes',
        paragraphs: [
          'Many students in Chennai search for affordable graphic design courses near them. Price is a real consideration, especially for students who are self-funding their education. But the most expensive course is not always the best, and the cheapest one is rarely the safest bet.',
          'The better comparison is outcome per rupee. A Rs 18,000 program that ends with 8 portfolio projects and mentor reviews is a stronger investment than a Rs 8,000 program that ends with a certificate and no work to show.',
        ],
        bullets: [
          'Compare project count and review quality alongside price',
          'Ask whether EMI options are available to reduce upfront cost',
          'Look for institutes near OMR, Perumbakkam, or your area to reduce travel cost',
        ],
      },
      {
        id: 'tsdc-position',
        eyebrow: 'TSDC in Chennai',
        heading: 'TSDC is built around portfolio outcomes, not just classroom hours',
        paragraphs: [
          'TSDC is a practical creative education institute located near OMR, Perumbakkam in Chennai. The Graphic Design Mastery Program runs for 12 weeks and covers Adobe Photoshop, Illustrator, InDesign, Canva Pro, and Figma through real project briefs.',
          'Students complete 8+ portfolio projects including brand identities, packaging mockups, social media campaigns, and print-ready work — reviewed by working designers before the course ends.',
        ],
      },
    ],
    ctaTitle: 'Looking for the best graphic design institute near you in Chennai?',
    ctaText:
      'TSDC offers a portfolio-first graphic design program near OMR in Chennai — practical, mentor-reviewed, and built around the 8+ projects you need to start your design career.',
    ctaLabel: 'Explore Graphic Design Course',
    ctaHref: '/courses/graphic-design',
  }),
  createPost({
    id: 'types-of-graphic-design-complete-beginner-guide-2026',
    slug: 'types-of-graphic-design-complete-guide-for-beginners',
    status: 'published',
    featured: false,
    title: 'Types of Graphic Design: A Complete Guide for Beginners',
    subtitle: 'What the 7 main types of graphic design actually look like in the real world — and which one fits your strengths.',
    excerpt:
      'Graphic design is not one skill — it is a family of related disciplines. Understanding which type you are drawn to helps you choose the right course, build the right portfolio, and pursue the right career path.',
    category: 'Graphic Design Careers',
    author: 'TSDC Creative Team',
    publishedAt: '2026-05-03',
    readTime: '10 min read',
    coverImage: '/graphicdesign.png',
    coverImageAlt: 'Types of graphic design explained for beginners',
    tags: ['types of graphic design', 'what is graphic design', 'graphic design career', 'logo design', 'brand identity design', 'visual design'],
    seoTitle: 'Types of Graphic Design: A Complete Guide for Beginners | TSDC Blog',
    seoDescription:
      'Discover the 7 main types of graphic design — brand identity, print, packaging, digital, advertising, motion, and UI/UX — and learn which career path fits your strengths.',
    intro: [
      'When students say they want to learn graphic design, they often have one particular type in mind — usually logos, social media creatives, or posters. But graphic design as a field is much broader than that.',
      'Understanding the main types of graphic design helps students choose the right specialisation, build a more targeted portfolio, and pursue jobs or freelance work that actually matches their strengths.',
      'Here is a clear breakdown of the 7 main types of graphic design and what real work in each area looks like.',
    ],
    sections: [
      {
        id: 'brand-identity',
        eyebrow: 'Type 1',
        heading: 'Brand Identity Design',
        paragraphs: [
          'Brand identity design covers logos, color palettes, typography systems, brand guidelines, and the visual language a business uses across every touchpoint. This is one of the most in-demand areas for both freelancers and agency designers.',
          'A brand identity designer is responsible for making a business look consistent and recognisable — from its social media profile to its packaging to its business card.',
        ],
        bullets: [
          'Logo design and construction',
          'Color palette and typography selection',
          'Brand guidelines and style documents',
          'Visual identity applied across channels',
        ],
        image: '/graphic.png',
        imageAlt: 'Brand identity design portfolio work',
      },
      {
        id: 'print-design',
        eyebrow: 'Type 2',
        heading: 'Print Design',
        paragraphs: [
          'Print design includes brochures, flyers, posters, magazines, business cards, and any physical media that requires print-ready artwork. It demands strong layout thinking, understanding of print specifications like bleeds and CMYK colour, and typography control.',
          'Print designers typically use Adobe InDesign and Illustrator for most production work.',
        ],
      },
      {
        id: 'packaging-design',
        eyebrow: 'Type 3',
        heading: 'Packaging Design',
        paragraphs: [
          'Packaging design is one of the most commercially valuable graphic design specialisations. It covers product labels, box dielines, bags, bottles, and retail packaging. Strong packaging design combines visual appeal with structural awareness — the design must work both flat and folded into a 3D shape.',
          'This area is especially strong for designers who enjoy working with FMCG brands, food and beverage, beauty, and retail products.',
        ],
        image: '/graphicdesign.png',
        imageAlt: 'Packaging design portfolio for commercial products',
      },
      {
        id: 'digital-social-design',
        eyebrow: 'Type 4',
        heading: 'Digital and Social Media Design',
        paragraphs: [
          'Digital and social media design covers Instagram creatives, Facebook ads, YouTube thumbnails, website banners, email templates, and any visual made for screens rather than print. It is the highest-volume work area for entry-level designers today.',
          'Social media design is a strong entry point for beginners because the output is visible, clients are everywhere, and the feedback loop is fast.',
        ],
      },
      {
        id: 'advertising-design',
        eyebrow: 'Type 5',
        heading: 'Advertising and Campaign Design',
        paragraphs: [
          'Advertising design combines strategy with visuals — creating campaigns for print ads, outdoor hoardings, digital banners, and brand launches. It is common in agencies where designers work alongside copywriters and creative directors.',
          'Campaign designers need to understand how a single idea adapts across multiple formats and sizes while keeping the message clear.',
        ],
      },
      {
        id: 'motion-graphics',
        eyebrow: 'Type 6',
        heading: 'Motion Graphics Design',
        paragraphs: [
          'Motion graphics design brings visuals to life through animation. It covers logo animations, title sequences, explainer videos, social ad motion, and branded video content. Most motion designers use Adobe After Effects alongside their base graphic design skills.',
          'This is one of the fastest-growing specialisations as brands now need animated content for reels, ads, and launch campaigns constantly.',
        ],
      },
      {
        id: 'ui-ux-design',
        eyebrow: 'Type 7',
        heading: 'UI/UX Design',
        paragraphs: [
          'UI/UX design sits at the intersection of graphic design and product thinking. UI (User Interface) designers create the visual layout of apps and websites. UX (User Experience) designers research, map user journeys, and design interaction flows that solve real problems.',
          'UI/UX is its own distinct career path, but graphic design fundamentals — typography, color, layout, hierarchy — are deeply relevant and transferable into this field.',
        ],
      },
    ],
    ctaTitle: 'Want to build skills across the most in-demand types of graphic design?',
    ctaText:
      'The TSDC Graphic Design Mastery Program covers brand identity, print, packaging, and social media design — the four types that create the most real career opportunities for beginners.',
    ctaLabel: 'Explore Graphic Design Course',
    ctaHref: '/courses/graphic-design',
  }),
  createPost({
    id: 'graphic-design-salary-india-logo-designer-earnings-2026',
    slug: 'graphic-design-salary-india-logo-designer-earnings-2026',
    status: 'published',
    featured: false,
    title: 'Graphic Design Salary in India 2026: What Do Designers Actually Earn?',
    subtitle: 'A realistic look at designer salaries, logo design income, freelance rates, and how portfolio quality affects what you can charge.',
    excerpt:
      'Graphic design salaries in India vary widely based on specialisation, portfolio quality, and location. Here is an honest breakdown of what beginners, mid-level designers, and freelancers actually earn.',
    category: 'Graphic Design Careers',
    author: 'TSDC Creative Team',
    publishedAt: '2026-05-03',
    readTime: '8 min read',
    coverImage: '/graphic.png',
    coverImageAlt: 'Graphic design salary in India — what designers actually earn in 2026',
    tags: ['graphic design salary india', 'logo designer salary', 'graphic designer income', 'design career earnings', 'freelance design rates india'],
    seoTitle: 'Graphic Design Salary in India 2026: What Do Designers Earn? | TSDC Blog',
    seoDescription:
      'Learn what graphic designers earn in India in 2026 — entry-level salaries, logo designer fees, freelance rates, and how portfolio quality determines your income.',
    intro: [
      'One of the most common questions students ask before enrolling in a graphic design course is: what will I actually earn? It is a fair question, and the answer is more nuanced than a single number.',
      'Graphic design income in India depends on several variables: whether you work in-house or freelance, your specialisation, the quality of your portfolio, and the city you work in.',
      'Here is an honest, grounded breakdown of what graphic designers earn at different stages of their career in 2026.',
    ],
    sections: [
      {
        id: 'entry-level-salary',
        eyebrow: 'Starting out',
        heading: 'Entry-level graphic designers in India earn Rs 15,000 to Rs 30,000 per month',
        paragraphs: [
          'Most freshers with a practical certificate course and a strong portfolio can expect starting salaries between Rs 15,000 and Rs 25,000 in cities like Chennai, Coimbatore, and Madurai. In metros like Bengaluru and Mumbai, starting salaries can reach Rs 25,000 to Rs 35,000.',
          'What separates designers at the higher end of this range from those at the lower end is almost always portfolio quality. Freshers with brand identity projects, packaging mockups, and campaign creatives can negotiate better than those with only certificates.',
        ],
        bullets: [
          'Chennai entry-level: Rs 15,000 – Rs 28,000 per month',
          'Bengaluru and Mumbai entry-level: Rs 22,000 – Rs 35,000 per month',
          'Agencies typically start lower; in-house brand roles sometimes start higher',
          'Strong portfolio can move starting salary up by Rs 5,000 – Rs 8,000',
        ],
        image: '/graphicdesign.png',
        imageAlt: 'Entry-level graphic designer salary India',
      },
      {
        id: 'mid-level-salary',
        eyebrow: 'After 2–3 years',
        heading: 'Mid-level designers earn Rs 35,000 to Rs 70,000 per month',
        paragraphs: [
          'Designers with two to three years of strong project experience — especially in brand identity, digital campaigns, or packaging — typically earn Rs 35,000 to Rs 60,000 per month in Chennai and Rs 45,000 to Rs 70,000 in metro cities.',
          'Specialisation is the main salary driver at this level. Designers who focus on brand identity, motion graphics, or UI design tend to earn more than generalists because their skill set is harder to replace.',
        ],
      },
      {
        id: 'logo-design-freelance',
        eyebrow: 'Freelance income',
        heading: 'Logo and brand designers can earn Rs 10,000 to Rs 1,50,000 per project',
        paragraphs: [
          'Logo and brand identity design is one of the highest-value freelance services in the creative industry. Entry-level freelancers may charge Rs 3,000 to Rs 10,000 for a logo. Mid-level brand designers with strong portfolios regularly charge Rs 25,000 to Rs 75,000 for complete brand identity packages.',
          'Senior brand designers and studio owners with premium positioning charge Rs 1,00,000 to Rs 2,50,000 or more per brand project — a rate that is based entirely on portfolio credibility, not years of age.',
        ],
        bullets: [
          'Entry-level logo: Rs 3,000 – Rs 10,000',
          'Mid-level brand identity package: Rs 25,000 – Rs 75,000',
          'Premium studio brand identity: Rs 1,00,000+',
          'Social media design retainers: Rs 8,000 – Rs 25,000 per month per client',
        ],
        image: '/graphic.png',
        imageAlt: 'Freelance logo designer earnings and brand design rates in India',
      },
      {
        id: 'what-determines-income',
        eyebrow: 'The key factor',
        heading: 'Portfolio quality is the biggest determinant of what you earn',
        paragraphs: [
          'Across every level — fresher, mid-level, and senior — the designers who earn more are the ones with a stronger portfolio. A certificate from a well-known institute does not move salaries as much as three polished brand identity projects or a proven packaging design that a real client used.',
          'This is why the TSDC program is built around producing 8+ real portfolio projects. The goal is not to finish the course — it is to finish with proof of skill that earns you more from your very first interview or client pitch.',
        ],
      },
      {
        id: 'is-design-well-paid',
        eyebrow: 'Is it worth it?',
        heading: 'Graphic design is a well-paid and growing career in India',
        paragraphs: [
          'With the growth of e-commerce, social media marketing, D2C brands, and digital advertising in India, the demand for skilled graphic designers continues to expand. Both in-house roles and agency positions are growing, and freelance income potential is significant for designers who build strong brand expertise.',
          'For students who invest in practical training and build a real portfolio, graphic design is one of the most accessible paths to a creative career that pays well and grows with experience.',
        ],
      },
    ],
    ctaTitle: 'Start building the portfolio that determines your salary',
    ctaText:
      'At TSDC, the Graphic Design Mastery Program gives you 8+ real portfolio projects — brand identities, packaging, and social creatives — that help you earn more from your very first role or client.',
    ctaLabel: 'Explore Graphic Design Course',
    ctaHref: '/courses/graphic-design',
  }),
  createPost({
    id: 'can-ai-replace-graphic-designers-future-creativity-2026',
    slug: 'can-ai-replace-graphic-designers-future-of-creativity',
    status: 'published',
    featured: false,
    title: 'Can AI Replace Graphic Designers? The Future of Creativity in 2026',
    subtitle: 'AI tools are transforming how designers work — but human creativity, cultural insight, and strategic thinking remain irreplaceable.',
    excerpt:
      'AI cannot replicate the human touch behind great design. What it can do is help designers work faster, explore more directions, and focus energy on the decisions that actually require creative judgment.',
    category: 'AI and Graphic Design',
    author: 'TSDC Creative Team',
    publishedAt: '2026-05-03',
    readTime: '8 min read',
    coverImage: '/graphicdesign.png',
    coverImageAlt: 'AI and graphic designer working together on creative projects',
    tags: ['ai graphic design', 'future of design', 'adobe sensei', 'canva ai', 'graphic design career', 'TSDC Chennai'],
    seoTitle: 'Can AI Replace Graphic Designers? The Future of Creativity | TSDC Blog',
    seoDescription:
      'Explore whether AI can replace graphic designers in 2026. Learn how tools like Adobe Firefly and Canva AI augment creative work without replacing human insight, strategy, and emotional depth.',
    intro: [
      'In a world increasingly driven by technology, the question of whether AI can replace graphic designers comes up constantly. The honest answer is more useful than a yes or no.',
      'AI tools are genuinely changing how design work gets done. Tasks that used to take hours — resizing assets, generating layout variations, writing first-draft copy — now happen in minutes. That is a real shift.',
      'But design is not just a production task. It is a communication problem. And solving communication problems requires understanding people, context, culture, and intent — none of which AI can do alone.',
    ],
    sections: [
      {
        id: 'rise-of-ai-in-design',
        eyebrow: 'What is changing',
        heading: 'AI is already inside the tools designers use every day',
        paragraphs: [
          'AI-powered features are now embedded across the tools designers rely on. Adobe Firefly generates image variations and background fills. Canva\'s Magic Resize and Magic Design automate repetitive production work. Figma\'s AI features speed up design system generation and content replacement.',
          'These tools reduce friction on the mechanical side of design — the parts that were always more execution than thinking. That means designers who know how to use AI well can produce more output in less time, explore more directions before committing, and bring better-developed ideas to client review.',
        ],
        bullets: [
          'Adobe Firefly and Photoshop Generative Fill for image production',
          'Canva Magic Resize and Magic Write for fast layout and copy work',
          'Figma AI for component suggestions and content replacement',
          'Midjourney and Ideogram for concept mood boards and visual exploration',
        ],
        image: '/Digital_marketing.png',
        imageAlt: 'AI-powered design tools inside creative software',
      },
      {
        id: 'what-ai-cannot-do',
        eyebrow: 'The real limit',
        heading: 'AI cannot understand what the design actually needs to communicate',
        paragraphs: [
          'Graphic design is not just about creating aesthetically pleasing visuals. It is about solving a communication problem for a specific audience in a specific context. A brand identity for a children\'s education startup needs to feel different from one for a law firm — not because of style preferences, but because they need to create different emotional responses in different people.',
          'AI can generate thousands of variations quickly, but it does not know which variation will land with a Chennai-based family buying their child\'s first school bag versus a Mumbai-based investor evaluating a fintech startup. That judgment requires human context, cultural fluency, and strategic thinking.',
        ],
        bullets: [
          'Understanding cultural nuance and regional audience behavior',
          'Reading a client brief for what is actually unsaid',
          'Knowing when a design is wrong even if it looks good',
          'Building long-term brand consistency across campaigns',
        ],
      },
      {
        id: 'collaboration-model',
        eyebrow: 'The smarter frame',
        heading: 'The most useful way to think about AI is as a co-pilot, not a replacement',
        paragraphs: [
          'Designers who use AI as a creative co-pilot produce stronger work faster. They use language models to unpack briefs, identify gaps in their brief understanding, and pressure-test concept directions. They use generative image tools to explore moodboard ideas in minutes instead of hours. They use AI copy tools to generate headline variations they can edit instead of starting from blank.',
          'The result is that more cognitive energy stays on the decisions that require taste, experience, and design judgment. That is what makes final output genuinely better — not just faster.',
        ],
        image: '/UIUXDesign.png',
        imageAlt: 'Designer using AI tools as creative support',
      },
      {
        id: 'what-students-should-learn',
        eyebrow: 'For students',
        heading: 'Learning design fundamentals matters more in an AI world, not less',
        paragraphs: [
          'Some students assume that because AI can generate images, learning design fundamentals is less important. The opposite is true. AI makes it easier to produce average-looking output quickly. What separates strong designers now is the ability to recognise what makes something good — hierarchy, tension, rhythm, whitespace, brand voice — and direct AI output toward that standard.',
          'A student who understands typography will know immediately when an AI-generated layout has weak hierarchy. A student who understands color theory will know when an AI palette is tonally inconsistent. Fundamentals are the editing filter that makes AI-assisted work actually strong.',
        ],
        bullets: [
          'Typography and hierarchy remain the most transferable skills in any AI-assisted workflow',
          'Brand thinking — tone, consistency, audience fit — cannot be delegated to a prompt',
          'Portfolio quality still depends on decision-making, not generation speed',
          'Designers who learn both fundamentals and AI tools will be more hireable, not less',
        ],
      },
      {
        id: 'career-outlook',
        eyebrow: 'Career reality',
        heading: 'The demand for design thinking is growing alongside AI adoption',
        paragraphs: [
          'Companies that adopt AI content tools still need humans to guide brand direction, approve outputs, ensure consistency, and make judgment calls on what actually works for their audience. The volume of design work is increasing, not shrinking, as AI makes content creation faster and more accessible.',
          'What this means for students entering the field: the bar for technical execution is moving. Knowing how to use Photoshop is still important, but knowing how to think through a design problem and direct AI tools toward the right output is what makes a designer genuinely valuable to a team or client.',
        ],
      },
    ],
    ctaTitle: 'Learn graphic design with real AI workflow integration at TSDC',
    ctaText:
      'At TSDC, students learn design fundamentals, professional tools, and how to work with AI as a creative support system — so they are ready for how design actually works in 2026.',
    ctaLabel: 'Explore Graphic Design Course',
    ctaHref: '/courses/graphic-design',
  }),
  createPost({
    id: 'motion-graphics-course-chennai-career-guide-2026',
    slug: 'motion-graphics-course-chennai-career-guide-2026',
    status: 'published',
    featured: false,
    title: 'Motion Graphics Course in Chennai: Who Should Learn It and Where It Leads',
    subtitle: 'A practical guide for students curious about After Effects, animation, and commercial motion work.',
    excerpt:
      'Motion graphics sits at the intersection of design, storytelling, advertising, and video production, which makes it one of the most useful visual skills for modern brands.',
    category: 'Motion Graphics Careers',
    author: 'TSDC Creative Team',
    publishedAt: '2026-05-03',
    readTime: '8 min read',
    coverImage: '/graphic.png',
    coverImageAlt: 'Motion graphics learning path for students in Chennai',
    tags: ['motion graphics course chennai', 'after effects course chennai', 'motion design career', 'animation training'],
    seoTitle: 'Motion Graphics Course in Chennai: Career Guide for Students | TSDC',
    seoDescription:
      'Learn what a motion graphics course in Chennai should cover, who it suits best, and how it can lead to animation, ad creative, and branded content work.',
    intro: [
      'Motion graphics is becoming easier to notice because brands now depend on animated content everywhere: reels, product explainers, ads, launch visuals, and title systems.',
      'For students, that creates a strong opportunity. Motion work combines design thinking with movement, which makes it useful for agencies, creator teams, video studios, and in-house marketing teams.',
      'If you are comparing motion graphics courses in Chennai, here is what to look for first.',
    ],
    sections: [
      {
        id: 'who-it-fits',
        eyebrow: 'Best fit',
        heading: 'This path suits students who enjoy design plus movement',
        paragraphs: [
          'Motion graphics is a strong fit for learners who already like visual composition but want more energy, rhythm, and animation in their work. It rewards timing, pacing, and attention to presentation.',
          'Students coming from graphic design, video editing, or social media content often adapt especially well because they already understand visuals and communication.',
        ],
      },
      {
        id: 'what-to-learn',
        eyebrow: 'Core stack',
        heading: 'A good course should teach systems, not just effects',
        paragraphs: [
          'Many beginners get stuck collecting transitions and flashy presets. Better training focuses on motion principles, typography, brand consistency, scene building, and how to animate with purpose.',
          'That usually means learning After Effects alongside Illustrator or Photoshop workflows, then applying those tools to explainers, logo animation, title systems, and ad motion.',
        ],
        bullets: [
          'Motion principles and timing',
          'Animated typography and logo reveals',
          'Explainer scenes and brand-led ad motion',
          'Portfolio presentation for recruiters and clients',
        ],
      },
      {
        id: 'career-path',
        eyebrow: 'Career direction',
        heading: 'The work can lead into ads, creators, agencies, and content teams',
        paragraphs: [
          'Motion graphics can support freelance projects quickly, especially for short-form ads and social campaigns. It can also grow into studio or agency work where strong motion polish makes campaigns feel premium.',
          'Students who combine motion with editing or design often become more versatile and easier to place because they can support multiple content formats.',
        ],
      },
    ],
    ctaTitle: 'Want to learn motion graphics with portfolio-ready projects?',
    ctaText:
      'TSDC teaches motion graphics through After Effects, animated typography, explainers, social ad visuals, and commercial-style motion projects in Chennai.',
    ctaLabel: 'Explore Motion Graphics Course',
    ctaHref: '/courses/motion-graphics',
  }),
]

const getBlogKey = (post: Pick<BlogPost, 'id' | 'slug'>) => `${post.id}::${post.slug}`

const loadDeletedBlogKeys = () => {
  if (typeof window === 'undefined') return new Set<string>()

  try {
    const stored = window.localStorage.getItem(BLOG_DELETED_KEY)
    if (!stored) return new Set<string>()
    return new Set(JSON.parse(stored) as string[])
  } catch {
    return new Set<string>()
  }
}

const persistDeletedBlogKeys = (keys: Set<string>) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(BLOG_DELETED_KEY, JSON.stringify(Array.from(keys)))
}

export const mergeBlogPosts = (storedPosts: BlogPost[] = []) => {
  const merged = new Map<string, BlogPost>()
  const deletedKeys = loadDeletedBlogKeys()

  defaultBlogPosts.forEach((post) => {
    if (deletedKeys.has(getBlogKey(post))) return
    merged.set(getBlogKey(post), post)
  })

  storedPosts.forEach((post) => {
    if (deletedKeys.has(getBlogKey(post))) return
    merged.set(getBlogKey(post), post)
  })

  return Array.from(merged.values()).sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  })
}

export const loadBlogPosts = () => {
  if (typeof window === 'undefined') return defaultBlogPosts

  try {
    const stored = window.localStorage.getItem(BLOG_STORAGE_KEY)
    if (!stored) return defaultBlogPosts
    return mergeBlogPosts(JSON.parse(stored) as BlogPost[])
  } catch {
    return defaultBlogPosts
  }
}

export const persistBlogPosts = (posts: BlogPost[]) => {
  if (typeof window === 'undefined') return
  const deletedKeys = loadDeletedBlogKeys()
  posts.forEach((post) => deletedKeys.delete(getBlogKey(post)))
  persistDeletedBlogKeys(deletedKeys)
  window.localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(mergeBlogPosts(posts)))
}

export const deleteBlogPost = (post: Pick<BlogPost, 'id' | 'slug'>, posts: BlogPost[]) => {
  if (typeof window === 'undefined') return posts.filter((item) => item.id !== post.id)

  const nextPosts = posts.filter((item) => item.id !== post.id)
  const deletedKeys = loadDeletedBlogKeys()
  deletedKeys.add(getBlogKey(post))
  persistDeletedBlogKeys(deletedKeys)
  window.localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(nextPosts))
  return nextPosts
}
