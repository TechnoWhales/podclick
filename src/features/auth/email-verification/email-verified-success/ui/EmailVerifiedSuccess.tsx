'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

import { Button, Container, Typography } from '@/shared/components/ui'
import Ring from '@/shared/components/ui/loader/ring/Ring'
import { COLORS, ROUTES } from '@/shared/constans'
import { useCheckQueryParams } from '@/shared/hooks/useCheckQueryParams'

import s from './EmailVerifiedSuccess.module.scss'

export const EmailVerifiedSuccess = () => {
  const t = useTranslations('emailVerifiedSuccess')
  const tCommon = useTranslations('common')

  const { isChecked } = useCheckQueryParams({
    queryParams: ['code', 'email'],
    storeName: 'emailVerifiedParams',
  })

  if (!isChecked) {
    return (
      <div className={s.circularProgressContainer}>
        <Ring size={150} color={COLORS.accent['500']} />
      </div>
    )
  }

  return (
    <Container className={s.container} width={432} padding={'35px 0 0'}>
      <Typography variant={'h1'} style={{ marginBottom: '20px' }}>
        {t('title')}
      </Typography>
      <Typography variant={'regular_text_16'} style={{ marginBottom: '54px' }}>
        {t('description')}
      </Typography>
      <Link href={ROUTES.AUTH.SIGN_IN} passHref legacyBehavior>
        <Button style={{ marginBottom: '72px' }} as={'a'}>
          {tCommon('button.logIn')}
        </Button>
      </Link>

      <Image
        src={'/woman-leaning-against-the-wall.svg'}
        alt={'Woman leaning against the wall'}
        width={432}
        height={300}
      />
    </Container>
  )
}
