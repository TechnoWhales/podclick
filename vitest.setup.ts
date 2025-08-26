import { beforeEach, vi } from 'vitest'
import type { ReactNode } from 'react'

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: vi.fn(),
    push: vi.fn(),
  }),
}))

vi.mock('@/shared/lib/notify', () => ({
  notify: {
    error: vi.fn(),
  },
}))

beforeEach(() => {
  vi.clearAllMocks()
})

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
  NextIntlClientProvider: ({ children }: { children: ReactNode }) => children,
}))
