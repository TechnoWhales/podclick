'use client'

import { useEffect } from 'react'

import { useMeQuery } from '@/shared/api'
import { useAppDispatch } from '@/shared/hooks'
import { setIsInitialized, setIsLoggedInAC } from '@/shared/model/appSlice'

export const AuthInitializer = () => {
  const dispatch = useAppDispatch()
  const { data, isLoading, isError } = useMeQuery()

  useEffect(() => {
    if (isLoading) {
      return
    }

    if (data) {
      dispatch(setIsLoggedInAC({ isLoggedIn: true }))
    } else if (isError) {
      dispatch(setIsLoggedInAC({ isLoggedIn: false }))
    }

    dispatch(setIsInitialized({ isInitialized: true }))
  }, [isLoading, isError, data, dispatch])

  return null
}
