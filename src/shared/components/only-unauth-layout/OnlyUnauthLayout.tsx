'use client'

import { type ReactNode, useEffect } from 'react'

import { useRouter } from '@/i18n/navigation'
import { ROUTES } from '@/shared/constants'
import { useAppSelector } from '@/shared/hooks'
import { selectAppIsAuth, selectIsInitialized } from '@/shared/model/appSlice'

export const OnlyUnauthLayout = ({ children }: { children: ReactNode }) => {
  const isAuth = useAppSelector(selectAppIsAuth)
  const isInitialized = useAppSelector(selectIsInitialized)
  const router = useRouter()

  useEffect(() => {
    if (!isInitialized) {
      return
    }
    if (isAuth) {
      router.replace(ROUTES.HOME)
    }
  }, [isAuth, isInitialized])

  if (!isInitialized) {
    return null
  }

  return <>{children}</>
}
