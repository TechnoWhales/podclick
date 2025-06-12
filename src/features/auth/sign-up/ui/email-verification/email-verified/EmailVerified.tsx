'use client'
import Image from 'next/image'

import { Button, Container, Typography } from '@/shared/components/ui'

import s from './EmailVerified.module.scss'

export const EmailVerified = () => {
  return (
    <Container className={s.container} width={432}>
      <Typography variant={'h1'} style={{ marginBottom: '20px' }}>
        Congratulations!
      </Typography>
      <Typography variant={'regular_text_16'} style={{ marginBottom: '54px' }}>
        Your email has been confirmed
      </Typography>
      <Button style={{ marginBottom: '72px' }}>Sign in</Button>
      <Image
        src={'/woman-leaning-against-the-wall.svg'}
        alt={'woman leaning against the wall'}
        width={432}
        height={300}
      />
    </Container>
  )
}
