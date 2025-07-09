'use client'

import { useEffect, useState } from 'react'

import { CircleLoading } from '@/shared/components/circle-loading/CircleLoading'
import { Providers } from '@/shared/providers'

export default function Home() {
  const [isLoadingPage, setIsLoadingPage] = useState(false)

  useEffect(() => {
    // Заглушка для лоадера
    const timeoutId = setTimeout(() => setIsLoadingPage(true), 1500)

    return () => clearTimeout(timeoutId)
  }, [])

  if (!isLoadingPage) {
    return <CircleLoading />
  }

  return <Providers>Hello, TechnoWhales!</Providers>
}
