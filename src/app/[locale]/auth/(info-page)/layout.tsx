import type { ReactNode } from 'react'

import Link from 'next/link'

import { Container, Icon, Typography } from '@/shared/components/ui'

import { ROUTES } from '../../../shared/constants'

export default function InfoPageLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <Container width={1310} padding={'24px 15px 227px'}>
        <Link href={ROUTES.AUTH.SIGN_UP} passHref legacyBehavior>
          <Typography
            as={'a'}
            variant={'regular_text_14'}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '60px' }}
          >
            <Icon iconId={'arrowBackOutline'} /> Back to Sign Up
          </Typography>
        </Link>
        <Container width={988} padding={'23px 15px 0'}>
          {children}
        </Container>
      </Container>
    </main>
  )
}
