'use client'

import { useLocale } from 'next-intl'

import { redirect } from '@/i18n/navigation'
import { useMeQuery } from '@/shared/api'
import { CircleLoading } from '@/shared/components/circle-loading/CircleLoading'
import { ROUTES } from '@/shared/constants'

export default function ProfilePage() {
  const locale = useLocale()
  const { data: user, isLoading } = useMeQuery()
  const myProfileId = user?.userId

  if (isLoading) {
    return <CircleLoading />
  }

  if (!user || typeof myProfileId !== 'number') {
    redirect({
      href: ROUTES.AUTH.SIGN_IN,
      locale,
    })

    return null
  }

  redirect({
    href: ROUTES.PROFILE.MY_PAGE(myProfileId),
    locale,
  })
}
