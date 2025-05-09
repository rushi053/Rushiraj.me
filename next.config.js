/** @type {import('next').NextConfig} */
const nextConfig = {
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
}

module.exports = nextConfig 