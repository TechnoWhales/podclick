'use client'

import { ReactNode, useEffect, useState } from 'react'

import { useTranslations } from 'next-intl'

import { Typography } from '@/shared/components/ui'

import s from './TimeAgo.module.scss'

interface TimeAgoProps {
  date: Date | string
}

export const TimeAgo = ({ date }: TimeAgoProps) => {
  const t = useTranslations('timeAgo')
  const [timeAgo, setTimeAgo] = useState<ReactNode>('')

  useEffect(() => {
    const updateTimeAgo = () => {
      const now = new Date()
      const postDate = typeof date === 'string' ? new Date(date) : date
      const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000)

      let interval = Math.floor(seconds / 31536000)

      if (interval >= 1) {
        setTimeAgo(
          t('yearsAgo', {
            count: interval,
          })
        )

        return
      }
      interval = Math.floor(seconds / 2592000)
      if (interval >= 1) {
        setTimeAgo(
          t('monthsAgo', {
            count: interval,
          })
        )

        return
      }
      interval = Math.floor(seconds / 86400)
      if (interval >= 1) {
        setTimeAgo(
          t('daysAgo', {
            count: interval,
          })
        )

        return
      }
      interval = Math.floor(seconds / 3600)
      if (interval >= 1) {
        setTimeAgo(
          t('hoursAgo', {
            count: interval,
          })
        )

        return
      }
      interval = Math.floor(seconds / 60)
      if (interval >= 1) {
        setTimeAgo(
          t('minutesAgo', {
            count: interval,
          })
        )

        return
      }
      setTimeAgo(t('justNow'))
    }

    updateTimeAgo()
    const timer = setInterval(updateTimeAgo, 60000)

    return () => clearInterval(timer)
  }, [date, t])

  return (
    <Typography as={'span'} variant={'small_text'} className={s.timeAgo}>
      {timeAgo}
    </Typography>
  )
}
