import { beforeEach, vi } from 'vitest'
import type { ReactNode } from 'react'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
  NextIntlClientProvider: ({ children }: { children: ReactNode }) => children,
}))

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  redirect: vi.fn(),
  permanentRedirect: vi.fn(),
}))

vi.mock('@/shared/lib/notify', () => ({
  notify: {
    error: vi.fn(),
  },
}))

beforeEach(() => {
  vi.clearAllMocks()
})
