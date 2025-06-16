import type { ReactNode } from 'react'

import { ReduxProvider } from '@/shared/providers/ReduxProvider'

export const Providers = ({ children }: { children: ReactNode }) => {
  return <ReduxProvider>{children}</ReduxProvider>
}
