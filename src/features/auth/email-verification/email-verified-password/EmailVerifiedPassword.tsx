'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Button, Container, Typography } from '@/shared/components/ui'
import { ROUTES } from '@/shared/constants'

import s from './EmailVerifiedPassword.module.scss'

export const EmailVerifiedPassword = () => {
  return (
    <Container className={s.container} width={432}>
      <div>
        <Typography className={s.title} variant={'h1'} style={{ marginBottom: '20px' }}>
          Email verification link expired
        </Typography>
        <Typography className={s.description} variant={'regular_text_16'}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </Typography>

        <Link href={ROUTES.AUTH.FORGOT_PASSWORD} passHref legacyBehavior>
          <Button style={{ marginBottom: '36px' }} as={'a'} fullwidth>
            Resend link
          </Button>
        </Link>
      </div>

      <Image src={'/time-management.svg'} alt={'Time management'} width={432} height={300} />
    </Container>
  )
}
