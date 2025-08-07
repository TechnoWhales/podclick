'use client'
import { ReactNode } from 'react'

import { useTranslations } from 'next-intl'

import { Button, Icon, Typography } from '@/shared/components/ui'

import s from '@/features/profile/addPhoto/ui/title/Title.module.scss'

type Props = {
  backBtnAction: () => void
  nextBtnAction: () => void
  children: ReactNode
  textNextBtn?: string
  disableNextBtn?: boolean
}

export const TitlePhotoPages = ({
  nextBtnAction,
  backBtnAction,
  children,
  textNextBtn = 'Next',
  disableNextBtn,
}: Props) => {
  const t = useTranslations('addPost')

  return (
    <div className={s.title}>
      <Button variant={'icon'} className={s.arrowBack} onClick={backBtnAction}>
        <Icon iconId={'arrowIosBack'} />
      </Button>
      <Typography variant={'h1'}>{children}</Typography>
      <Button
        className={s.nextBtn}
        variant={'link'}
        onClick={nextBtnAction}
        disabled={disableNextBtn}
      >
        <Typography variant={'h3'} as={'h3'}>
          {textNextBtn === 'Next' ? t('nextBtn') : textNextBtn}
        </Typography>
      </Button>
    </div>
  )
}
