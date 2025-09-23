import SettingsClient from '@/features/settings/Settings'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'

type Props = {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export default async function SettingsPage({ params }: Props) {
  const { locale } = await params

  // Валидация локали
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Включаем статическую генерацию
  setRequestLocale(locale)

  return <SettingsClient />
}
