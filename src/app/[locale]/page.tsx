'use client'

import { useEffect, useState } from 'react'

import { LogOutButton } from '@/features/auth'
import { useMeQuery } from '@/shared/api'
import Ring from '@/shared/components/ui/loader/ring/Ring'
import { COLORS } from '@/shared/constants'
import ReduxProvider from '@/shared/providers/ReduxProvider'

import s from './app.module.scss'

export default function Home() {
  const [isLoadingPage, setIsLoadingPage] = useState(false)
  const { data: user, isError } = useMeQuery()
  const isAuthorized = !!user && !isError

  useEffect(() => {
    // Заглушка для лоадера
    const timeoutId = setTimeout(() => setIsLoadingPage(true), 1500)

    return () => clearTimeout(timeoutId)
  }, [])

  if (!isLoadingPage) {
    return (
      <div className={s.circularProgressContainer}>
        <Ring size={150} color={COLORS.accent['500']} />
      </div>
    )
  }

  return (
    <ReduxProvider>
      Hello, TechnoWhales!
      {isAuthorized && <LogOutButton />}
    </ReduxProvider>
  )
}
