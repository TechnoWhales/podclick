'use client'

import { useTranslations } from 'next-intl'

import { Typography } from '@/shared/components/ui'

export const Title = () => {
  const tCommon = useTranslations('common')

  return (
    <Typography as={'h2'} variant={'h2'}>
      {`${tCommon('registeredUsers')}:`}
    </Typography>
  )
}
