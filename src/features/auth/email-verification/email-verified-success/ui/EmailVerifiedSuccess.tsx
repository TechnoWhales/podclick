import Image from 'next/image'
import Link from 'next/link'

import { Button, Container, Typography } from '@/shared/components/ui'
import { ROUTES } from '@/shared/constans'

import s from '@/features/auth/email-verification/email-verified-success/ui/EmailVerifiedSuccess.module.scss'

export const EmailVerifiedSuccess = () => {
  return (
    <Container className={s.container} width={432}>
      <Typography variant={'h1'} style={{ marginBottom: '20px' }}>
        Email verification link expired
      </Typography>
      <Typography className={s.description} variant={'regular_text_16'}>
        Looks like the verification link has expired. Not to worry, we can send the link again
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
