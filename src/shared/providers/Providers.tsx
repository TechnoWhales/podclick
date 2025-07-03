'use client'
import type { ReactNode } from 'react'

import ReduxProvider from '@/shared/providers/ReduxProvider'

import GoogleProvider from './GoogleProvider'

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ReduxProvider>
      <GoogleProvider>{children}</GoogleProvider>
    </ReduxProvider>
  )
}
