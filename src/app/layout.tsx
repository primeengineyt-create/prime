import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import MouseMoveHandler from '@/components/MouseMoveHandler'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Prime Engine | Build Apps & AI Agents without Code',
  description: 'The world\'s first AI-powered no-code platform to build full-stack web apps, AI agents, and AI models using natural language.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <MouseMoveHandler />
        {children}
      </body>
    </html>
  )
}
