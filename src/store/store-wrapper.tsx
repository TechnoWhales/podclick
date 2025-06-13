'use client'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'

import { store } from '@/store/store'

type ReactChild = ReactElement | undefined | null | ReactNode

export const StoreWrapper = ({ children }: { children: ReactChild }) => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <Provider store={store}>{children}</Provider>
    </GoogleOAuthProvider>
  )
}
