'use client'

import Link from 'next/link'

import { LanguageSelect } from '@/shared/components'
import { Button, Container, Icon, Typography } from '@/shared/components/ui'
import { ROUTES } from '@/shared/constans'

import s from './Header.module.scss'

type Props = {
  isAuthorized?: boolean
}

const BellIconBtn = () => {
  return (
    <div className={s.bellIconWrapper}>
      <Button variant={'icon'}>
        <Icon iconId={'outlineBell'} fill={'red'} />
      </Button>
    </div>
  )
}

const NotAuthorizedNavbarControls = () => {
  return (
    <div className={s.navbarControls}>
      <Link href={ROUTES.AUTH.SIGN_IN} passHref legacyBehavior>
        <Button variant={'link'} as={'a'}>
          <Typography variant={'bold_text_16'}>Log in</Typography>
        </Button>
      </Link>
      <Link href={ROUTES.AUTH.SIGN_UP} passHref legacyBehavior>
        <Button variant={'primary'} as={'a'}>
          <Typography variant={'bold_text_16'}>Sign up</Typography>
        </Button>
      </Link>
    </div>
  )
}

export const Header = ({ isAuthorized }: Props) => {
  return (
    <header>
      <Container width={1310} padding={'0 15px'}>
        <nav className={s.navbar}>
          <Typography className={s.logo} as={Link} href={'#'} variant={'large'}>
            Inctagram
          </Typography>
          <div className={s.authorizedWrapper}>
            {isAuthorized && <BellIconBtn />}
            <LanguageSelect />
            {!isAuthorized && <NotAuthorizedNavbarControls />}
          </div>
        </nav>
      </Container>
    </header>
  )
}
