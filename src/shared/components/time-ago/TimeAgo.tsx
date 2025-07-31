'use client'

import { useTranslations } from 'next-intl'

import { Typography } from '@/shared/components/ui'
import { getRelativeTimeToken } from '@/shared/utils/formatRelativeTime'

import s from '@/features/public-cards/ui/public-card/PublicCard.module.scss'

type Props = {
  date: Date | string
}

export const TimeAgo = ({ date }: Props) => {
  const tCommon = useTranslations('common')
  const targetDate = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diff = now.getTime() - targetDate.getTime()

  const { key, count } = getRelativeTimeToken(diff)

  return (
    <Typography as={'span'} variant={'small_text'} className={s.time}>
      {count != null ? tCommon(key, { count }) : tCommon(key)}
    </Typography>
  )
}
