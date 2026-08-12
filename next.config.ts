import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/projects', destination: '/live-projects', permanent: true },
      { source: '/student-work', destination: '/live-projects', permanent: true },
    ]
  },
}

export default nextConfig