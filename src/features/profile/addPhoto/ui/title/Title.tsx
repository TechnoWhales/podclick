import { ReactNode } from 'react'

import { useTranslations } from 'next-intl'

import { Button, Icon, Typography } from '@/shared/components/ui'

import s from '@/features/profile/addPhoto/ui/title/Title.module.scss'

type Props = {
  backBtn: () => void
  nextBtn: () => void
  children: ReactNode
  textNextBtn?: string
}

export const TitlePhotoPages = ({ nextBtn, backBtn, children, textNextBtn = 'Next' }: Props) => {
  const t = useTranslations('addPost')

  return (
    <div className={s.title}>
      <Button variant={'icon'} className={s.arrowBack} onClick={backBtn}>
        <Icon iconId={'arrowIosBack'} />
      </Button>
      <Typography variant={'h1'}>{children}</Typography>
      <Button className={s.nextBtn} variant={'link'} onClick={nextBtn}>
        <Typography variant={'h3'} as={'h3'}>
          {textNextBtn === 'Next' ? t('nextBtn') : textNextBtn}
        </Typography>
      </Button>
    </div>
  )
}
