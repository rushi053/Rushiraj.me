/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // /projects held fake template projects; /work and /ios-apps were removed
    // but are still in the live sitemap/index. The real work lives at /products.
    return [
      { source: '/projects', destination: '/products', statusCode: 301 },
      { source: '/projects/:path*', destination: '/products', statusCode: 301 },
      { source: '/work', destination: '/products', statusCode: 301 },
      { source: '/work/:path*', destination: '/products', statusCode: 301 },
      { source: '/ios-apps', destination: '/products', statusCode: 301 },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['cdppuoxiinhqxxomjmfe.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdppuoxiinhqxxomjmfe.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
