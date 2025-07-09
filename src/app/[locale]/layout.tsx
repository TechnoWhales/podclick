import type { Metadata } from 'next'

import type { ReactNode } from 'react'

import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Inter } from 'next/font/google'

import { Header, Sidebar } from '@/shared/components'
import { Container } from '@/shared/components/ui'
import { Providers } from '@/shared/providers/Providers'

import '@/shared/styles/index.scss'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Podclick',
  description: 'Full-stack social media app inspired by Instagram',
  authors: [{ name: 'TechnoWhales', url: 'https://github.com/TechnoWhales' }],
  creator: 'TechnoWhales',
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }]
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode
  params: { locale: string }
}>) {
  const messages = await getMessages({ locale: params.locale })

  return (
    <html lang={params.locale}>
      <body className={`${inter.className}`}>
        <Providers>
          <NextIntlClientProvider locale={params.locale} messages={messages}>
            <Header />
            <main>
              <Container width={1310} padding={'0 15px'}>
                {/*<Sidebar />*/}
                {children}
              </Container>
            </main>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}
