import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import {
  PostHogProvider,
  PostHogPageview,
} from '@/components/providers/posthog-provider'
import { SessionProvider } from '@/components/providers/session-provider'
import { QueryProvider } from '@/components/providers/query-provider'
import { Header } from '@/components/Header'
import { Suspense } from 'react'
import Loading from './loading'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tailwind Snippets',
  description: 'A collection of reusable Tailwind CSS snippets',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          <SessionProvider>
            <PostHogProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {/* @INFO: Adding dotted grid background container with theme-aware styling */}
                <div className="fixed inset-0 w-full h-full z-[-1]">
                  <div className="absolute inset-0 w-full h-full bg-white dark:bg-background" />
                  <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                      backgroundImage: `radial-gradient(circle, rgb(75 85 99 / 0.2) 1px, transparent 1px)`,
                      backgroundSize: '20px 20px',
                    }}
                  />
                  <div className="hidden dark:block absolute inset-0 w-full h-full" 
                    style={{
                      backgroundImage: `radial-gradient(circle, rgb(107 114 128 / 0.1) 1px, transparent 1px)`,
                      backgroundSize: '20px 20px',
                    }}
                  />
                </div>
                <div className="relative min-h-screen flex flex-col">
                  <Suspense
                    fallback={<div className="h-14 bg-background/95 backdrop-blur" />}
                  >
                    <Header />
                  </Suspense>
                  <main className="flex-1">
                    <Suspense>
                      <PostHogPageview />
                    </Suspense>
                    <Suspense fallback={<Loading />}>{children}</Suspense>
                  </main>
                </div>
              </ThemeProvider>
            </PostHogProvider>
          </SessionProvider>
        </QueryProvider>
      </body>
    </html>
  )
}