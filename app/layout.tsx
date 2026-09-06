import { Analytics } from '@vercel/analytics/next'
import { Poppins, DM_Mono } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import { ShadeBackground } from '@/components/shade-background'
import './globals.css'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-poppins' })
const dmMono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-dm-mono' })

export const metadata: Metadata = {
  title: 'ArchitectsWifHat — Put the Hat on Architects',
  description:
    'ArchitectsWifHat is a community NFT collection and meme for everyone who showed up, stayed, and built. No chosen one. Just an Architect, a hat, and a community.',
  metadataBase: new URL('https://architectswifhat.xyz'),
  openGraph: {
    title: 'ArchitectsWifHat — Put the Hat on Architects',
    description: 'A community NFT collection and meme. You either get it… or you don’t have the hat yet.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ArchitectWifHat',
    title: 'ArchitectsWifHat',
    description: 'Put the hat on Architects.',
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#1a2547',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`bg-background ${poppins.variable} ${dmMono.variable}`}>
      <body className="font-sans">
        <ShadeBackground />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
