'use client'
import Image from 'next/image'
import Link from 'next/link'

import { Button, Container, Typography } from '@/shared/components/ui'
import { ROUTES } from '@/shared/constans'

import s from './EmailVerifiedSuccess.module.scss'

export const EmailVerifiedSuccess = () => {
  return (
    <Container className={s.container} width={432} padding={'35px 0 0'}>
      <Typography variant={'h1'} style={{ marginBottom: '20px' }}>
        Congratulations!
      </Typography>
      <Typography variant={'regular_text_16'} style={{ marginBottom: '54px' }}>
        Your email has been confirmed
      </Typography>
      <Link href={ROUTES.AUTH.SIGN_IN} passHref legacyBehavior>
        <Button style={{ marginBottom: '72px' }} as={'a'}>
          Sign in
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
