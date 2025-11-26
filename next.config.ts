import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // ✅ THIS disables server-based optimization
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
