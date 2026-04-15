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
