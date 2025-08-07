'use client'

import { useEffect } from 'react'

import { useMeQuery } from '@/shared/api'
import { useAppDispatch } from '@/shared/hooks'
import { setIsInitialized, setIsLoggedIn } from '@/shared/model/appSlice'

export const AuthInitializer = () => {
  const dispatch = useAppDispatch()
  const { data, isLoading, isError } = useMeQuery()

  useEffect(() => {
    if (isLoading) {
      return
    }

    if (data) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
    } else if (isError) {
      dispatch(setIsLoggedIn({ isLoggedIn: false }))
    }

    dispatch(setIsInitialized({ isInitialized: true }))
  }, [isLoading, isError, data, dispatch])

  return null
}
