import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{ source: '/:path*', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ] }];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' }],
  },
  async redirects() {
    return [
      { source: '/guides/category/fundamentals', destination: '/blog?category=fundamentals', permanent: true },
      { source: '/guides/category/setup', destination: '/blog?category=setup', permanent: true },
      { source: '/guides/category/performance', destination: '/blog?category=performance', permanent: true },
      { source: '/guides/category/safety', destination: '/blog?category=safety', permanent: true },
      { source: '/guides', destination: '/blog', permanent: true },
      { source: '/guides/:slug', destination: '/blog/:slug', permanent: true },
    ];
  },
};
export default nextConfig;
