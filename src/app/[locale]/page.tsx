'use client'

import { useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { TextField } from '@/shared/components/ui'
import Ring from '@/shared/components/ui/loader/ring/Ring'
import { useConfirmEmail } from '@/shared/hooks/useConfirmEmail'
import ReduxProvider from '@/shared/providers/ReduxProvider'
import { colors } from '@/shared/styles/colors'

import s from './app.module.scss'

export default function Home() {
  const [isInitialized, setIsInitialized] = useState(false)
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const email = searchParams.get('email')

  const { isConfirmed } = useConfirmEmail({ code, email })

  useEffect(() => {
    // Заглушка для лоадера
    const timeoutId = setTimeout(() => setIsInitialized(true), 1500)

    return () => clearTimeout(timeoutId)
  }, [])

  if (!isInitialized || !isConfirmed) {
    return (
      <div className={s.circularProgressContainer}>
        <Ring size={150} color={colors.accent['500']} />
      </div>
    )
  }

  return <ReduxProvider>Hello, TechnoWhales!</ReduxProvider>
}
