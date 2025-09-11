'use client'

import { useEffect } from 'react'

import { useSearchParams } from 'next/navigation'

import { GeneralInformation } from '@/features/settings/general-informations/GeneralInformation'
import { usePathname, useRouter } from '@/i18n/navigation'
import { ROUTES } from '@/shared/constants'

export const Settings = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (pathname === '/settings' && !searchParams.has('part')) {
      router.replace(ROUTES.SETTINGS)
    }
  }, [pathname])

  const renderContent = () => {
    switch (searchParams.get('part')) {
      case 'info': {
        return <GeneralInformation />
      }
    }
  }

  return <div>{renderContent()}</div>
}
