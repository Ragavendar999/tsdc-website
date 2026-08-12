import 'server-only'
import { createDocStore } from '@/lib/content-store'
import { defaultBlogPosts, type BlogPost } from '@/app/lib/blogPosts'

const isBlogPosts = (value: unknown): value is BlogPost[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'object' && item !== null && 'slug' in item && 'title' in item)

export const blogPostsStore = createDocStore('blogPosts', defaultBlogPosts, isBlogPosts)
