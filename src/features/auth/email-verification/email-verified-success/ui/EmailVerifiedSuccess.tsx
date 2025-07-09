'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

import { useConfirmationEmailMutation } from '@/features/auth/email-verification/email-verified-success/api/emailVerifiedSuccessApi'
import { CircleLoading } from '@/shared/components/circle-loading/CircleLoading'
import { Button, Container, Typography } from '@/shared/components/ui'
import { ROUTES } from '@/shared/constants'
import { useCheckCodeConfirm } from '@/shared/hooks'
import { useCheckQueryParams } from '@/shared/hooks/useCheckQueryParams'

import s from './EmailVerifiedSuccess.module.scss'

export const EmailVerifiedSuccess = () => {
  const t = useTranslations('emailVerifiedSuccess')
  const tCommon = useTranslations('common')

  const [confirmEmail] = useConfirmationEmailMutation()

  const { isChecked } = useCheckQueryParams({ redirectUrl: ROUTES.HOME })

  const { isConfirmed } = useCheckCodeConfirm({
    confirmAction: confirmEmail,
    urlPath: ROUTES.AUTH.EMAIL_VERIFIED,
  })

  if (!isConfirmed || !isChecked) {
    return <CircleLoading />
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
