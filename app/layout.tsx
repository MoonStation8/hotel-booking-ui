import type { Metadata } from 'next'
import { Fraunces, Geist_Mono, Manrope } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

const bodyFont = Manrope({
  variable: '--font-body',
  subsets: ['latin']
})

const displayFont = Fraunces({
  variable: '--font-display',
  subsets: ['latin']
})

const monoFont = Geist_Mono({
  variable: '--font-code',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Hotel Bookings',
  description: 'Create. Review. Book.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
