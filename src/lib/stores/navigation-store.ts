import 'server-only'
import { createDocStore } from '@/lib/content-store'
import { defaultNavigation, type NavigationContent } from '@/app/lib/navigation'

const isNavigationContent = (value: unknown): value is NavigationContent =>
  typeof value === 'object' && value !== null && 'navbar' in value && 'footer' in value

export const navigationStore = createDocStore('navigation', defaultNavigation, isNavigationContent)
