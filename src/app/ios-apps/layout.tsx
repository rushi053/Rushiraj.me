import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'iOS Apps by Rushiraj Jadeja — CashLens & More',
  description: 'Privacy-first iOS applications. CashLens expense tracker rated 4.8★ on the App Store.',
  alternates: {
    canonical: '/ios-apps',
  },
  openGraph: {
    title: 'iOS Apps by Rushiraj Jadeja — CashLens & More',
    description: 'Privacy-first iOS applications. CashLens expense tracker rated 4.8★ on the App Store.',
  },
}

export default function IosAppsLayout({ children }: { children: React.ReactNode }) {
  return children
}
