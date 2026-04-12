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

export const defaultBlogPosts: BlogPost[] = [
  {
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
        id: 'chatgpt-claude',
        eyebrow: 'Tool 1',
        heading: 'ChatGPT or Claude for briefs, ideas, and structured thinking',
        paragraphs: [
          'For most students, the first useful AI tool is a strong language model. ChatGPT or Claude can help turn unclear thoughts into clear design directions. Instead of staring at a blank screen, students can ask for brand positioning ideas, social media campaign angles, poster concepts, content hierarchy, or naming directions.',
          'These tools are especially powerful when a student gives good context. A prompt like “Suggest three visual directions for a Chennai-based fashion brand targeting college students” is much more useful than a vague prompt like “give design ideas.”',
          'At TSDC level, this is less about letting AI think for you and more about using it as a thinking partner that speeds up concept development.',
        ],
        bullets: [
          'Use it to unpack briefs and clarify design goals',
          'Generate naming, tagline, and campaign directions',
          'Create structured content for posters, ads, and presentations',
          'Ask it to challenge weak concepts before you move into execution',
        ],
      },
      {
        id: 'perplexity',
        eyebrow: 'Tool 2',
        heading: 'Perplexity for real-world research and audience insight',
        paragraphs: [
          'Perplexity is useful when students need fast, source-backed research. If you are designing for a fitness brand, an education startup, or a local café, research matters. Good design decisions become easier when you know the audience, category trends, and customer language.',
          'Instead of opening many tabs manually, students can use Perplexity to gather insights about competitors, market positioning, user complaints, or trending visual patterns. That becomes especially useful in presentation and portfolio work, where decisions should look intentional rather than random.',
        ],
        bullets: [
          'Collect competitor references and compare positioning',
          'Find audience language for posters, ads, and landing pages',
          'Summarize trends before choosing a visual style',
          'Strengthen case studies with better context and reasoning',
        ],
        image: '/Digital_marketing.png',
        imageAlt: 'Research and content strategy setup for designers',
      },
      {
        id: 'firefly-canva',
        eyebrow: 'Tool 3 and 4',
        heading: 'Adobe Firefly and Canva Magic Studio for fast visual production',
        paragraphs: [
          'When students start producing social posts, ad creatives, simple composites, or campaign mockups, speed matters. Adobe Firefly is useful for generating visual assets, extending images, testing styles, or quickly building concept directions inside the Adobe ecosystem. Canva Magic Studio is useful for simpler fast-turnaround content where layout, content, and image adjustments need to happen quickly.',
          'These tools do not replace strong composition or typography. What they do is reduce the time spent collecting base assets or building quick alternatives when deadlines are short.',
        ],
        bullets: [
          'Use Firefly for concept visuals, image variation, and asset generation',
          'Use Canva Magic Studio for content-led social media layouts and quick campaign assets',
          'Create faster first drafts, then refine them manually for stronger quality',
          'Always polish spacing, hierarchy, typography, and brand consistency yourself',
        ],
      },
      {
        id: 'figma-midjourney',
        eyebrow: 'Tool 5 and 6',
        heading: 'Figma AI and Midjourney for interface ideas and bold concept exploration',
        paragraphs: [
          'Figma AI helps when students move closer to interface layouts, wireframes, and content structuring. It is especially useful for early UI blocks, quick copy filling, and layout experimentation. Midjourney is useful in a different way: it is stronger for mood, visual direction, and high-style concept generation.',
          'For a student portfolio, the combination can be powerful. Midjourney can help establish a creative direction for a brand or campaign, while Figma AI can help translate that direction into a presentable screen or layout framework.',
        ],
        bullets: [
          'Use Figma AI for layout assistance and rapid exploration',
          'Use Midjourney for moodboards, storytelling visuals, and concept direction',
          'Do not submit raw generations without design refinement',
          'Treat AI output as source material, not final creative quality',
        ],
        image: '/og-banner.png',
        imageAlt: 'Design layout and concept development using modern tools',
      },
      {
        id: 'how-to-start',
        eyebrow: 'TSDC advice',
        heading: 'How students should start using AI without becoming dependent on it',
        paragraphs: [
          'The safest way to learn AI in design is to attach every tool to a real creative goal. Use one tool for research, one for ideation, one for image support, and one for final presentation. That is much more valuable than randomly trying ten tools without understanding why.',
          'Students should also keep a rule: first learn the principle, then use the shortcut. If you do not understand hierarchy, typography, spacing, or visual balance, AI output will still look weak. Strong outcomes happen when fundamentals and tools grow together.',
        ],
        bullets: [
          'Start with one workflow, not ten disconnected tools',
          'Use AI to expand thinking, not avoid thinking',
          'Keep improving manual design judgment alongside tool usage',
          'Build portfolio projects that show both process and final output',
        ],
      },
    ],
    ctaTitle: 'Want to learn graphic design with modern AI workflows?',
    ctaText:
      'At TSDC, students do not just watch tools in action. They learn how to use them inside real design projects, portfolio work, and job-ready creative systems.',
    ctaLabel: 'Explore Graphic Design Course',
    ctaHref: '/courses/graphic-design',
  },
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

