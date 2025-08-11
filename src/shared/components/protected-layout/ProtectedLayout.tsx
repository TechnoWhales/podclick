'use client'

import { type ReactNode, useEffect } from 'react'

import { useRouter } from '@/i18n/navigation'
import { ROUTES } from '@/shared/constants'
import { useAppSelector } from '@/shared/hooks'
import { selectAppIsAuth, selectIsInitialized } from '@/shared/model/appSlice'

export const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  const isAuth = useAppSelector(selectAppIsAuth)
  const isInitialized = useAppSelector(selectIsInitialized)
  const router = useRouter()

  useEffect(() => {
    if (!isInitialized) {
      return
    }
    if (!isAuth) {
      router.replace(ROUTES.AUTH.SIGN_IN)
    }
  }, [isAuth, isInitialized])

  if (!isInitialized) {
    return null
  }

  return <>{children}</>
}
