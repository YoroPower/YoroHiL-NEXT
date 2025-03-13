import type { Metadata } from 'next'
import '@/common/style/globals.css'
import { ThemeProvider } from '@/components/theme-provider';
import ClientOnly from 'app/components/theme-switcher/ClientOnly';

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ClientOnly>
        <ThemeProvider
          attribute="class"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          </ThemeProvider>
        </ClientOnly>
        </body>
    </html>
  )
}
