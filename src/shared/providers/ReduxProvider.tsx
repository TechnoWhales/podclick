'use client'

import { ReactNode } from 'react'
import { Provider } from 'react-redux'

import { makeStore } from '@/shared/store/store'

export default function ReduxProvider({ children }: { children: ReactNode }) {
  return <Provider store={makeStore()}>{children}</Provider>
}
