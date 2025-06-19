'use client'

import type { ReactNode } from 'react'
import { Provider } from 'react-redux'

import { makeStore } from '@/shared/store/store'

export const ReduxProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={makeStore()}>{children}</Provider>
}
