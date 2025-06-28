'use client'
import { useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'
import { useGetAllQueryParams } from '@/shared/hooks/useGetAllQueryParams'

type Props = {
  queryParams: string[]
  storeName: string
  redirectUrl?: string
  storeType?: 'sessionStorage' | 'localStorage'
}

export const useCheckQueryParams = ({
  queryParams,
  storeName,
  redirectUrl = '/',
  storeType = 'sessionStorage',
}: Props) => {
  const [isChecked, setIsChecked] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  const allParams = useGetAllQueryParams()

  useEffect(() => {
    let storeItem

    if (storeType === 'sessionStorage') {
      storeItem = sessionStorage.getItem(storeName)
    } else {
      storeItem = localStorage.getItem(storeName)
    }

    let parsedStoreItem: any

    if (storeItem) {
      parsedStoreItem = JSON.parse(storeItem)
    }
    const allParamsMatch = queryParams.every(param => allParams[param] === parsedStoreItem[param])

    if (parsedStoreItem === null || !allParamsMatch) {
      router.replace(redirectUrl)
    } else {
      setIsChecked(true)
    }
  }, [searchParams])

  return { isChecked }
}
