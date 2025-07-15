import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ContactProvider } from '@/contexts/ContactContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { MissionProvider } from '@/contexts/MissionContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'offgigs - Build Your DJ Career',
  description: 'Professional DJ career development platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-white dark:bg-[#0F0F11] text-black dark:text-white antialiased transition-colors duration-300`}>
        <ThemeProvider>
          <AuthProvider>
            <MissionProvider>
              <ContactProvider>
                {children}
              </ContactProvider>
            </MissionProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
