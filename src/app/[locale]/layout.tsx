import type { Metadata } from 'next'

import type { ReactNode } from 'react'

import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Inter } from 'next/font/google'

import { LogoutModal } from '@/features/auth'
import { ToastProvider } from '@/shared/components/ui'
import { ClientLayout } from '@/shared/layouts'
import { Providers } from '@/shared/providers/Providers'
import { AuthInitializer } from '@/shared/utils/init'

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
  params: Promise<{ locale: string }>
}>) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const messages = await getMessages({ locale })

  return (
    <html lang={locale}>
      <body className={`${inter.className}`}>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <AuthInitializer />
            <ClientLayout>{children}</ClientLayout>
            <LogoutModal />
            <ToastProvider />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}
