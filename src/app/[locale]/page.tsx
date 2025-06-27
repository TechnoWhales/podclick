'use client'

import { useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'

import Ring from '@/shared/components/ui/loader/ring/Ring'
import { COLORS } from '@/shared/constans'
import { useCheckConfirmEmail } from '@/shared/hooks'
import ReduxProvider from '@/shared/providers/ReduxProvider'

import s from './app.module.scss'

export default function Home() {
  const [isLoadingPage, setIsLoadingPage] = useState(false)
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const email = searchParams.get('email')

  const { isConfirmed } = useCheckConfirmEmail({ code, email })

  useEffect(() => {
    // Заглушка для лоадера
    const timeoutId = setTimeout(() => setIsLoadingPage(true), 1500)

    return () => clearTimeout(timeoutId)
  }, [])

  if (!isLoadingPage || !isConfirmed) {
    return (
      <div className={s.circularProgressContainer}>
        <Ring size={150} color={COLORS.accent['500']} />
      </div>
    )
  }

  return <ReduxProvider>Hello, TechnoWhales!</ReduxProvider>
}
