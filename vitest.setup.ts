import { beforeEach, vi } from 'vitest'

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
