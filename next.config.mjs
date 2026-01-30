/** @type {import('next').NextConfig} */
const nextConfig = {
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
