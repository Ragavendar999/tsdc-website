import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true, // keep this if you don't use next/image optimization
  },
};

export default nextConfig;
