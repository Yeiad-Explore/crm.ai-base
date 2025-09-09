import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CRM.AI - AI-Powered CRM Agents for B2B Companies',
  description: 'Rent intelligent AI agents for your CRM system. Deploy AI-powered customer service, lead management, and sales assistance with zero coding required.',
  keywords: 'AI, CRM, B2B, customer service, lead management, sales automation, artificial intelligence, business intelligence',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
