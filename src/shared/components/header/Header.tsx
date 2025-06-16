'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { LanguageSelect } from '@/shared/components'
import { Button, Container, Icon, Typography } from '@/shared/components/ui'
import { ROUTES } from '@/shared/constans'

import s from './Header.module.scss'

type Props = {
  isAuthorized?: boolean
}

const AuthorizedNavbarControls = () => {
  return (
    <div className={s.navbarControls}>
      <Button variant={'icon'}>
        <Icon iconId={'outlineBell'} fill={'red'} />
      </Button>
      <LanguageSelect />
    </div>
  )
}

const NotAuthorizedNavbarControls = () => {
  return (
    <div className={s.navbarControls}>
      <LanguageSelect />
      <div className={s.wrapperButtons}>
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
    </div>
  )
}

const AuthHeader = () => {
  return (
    <Container width={1310} padding={'0 15px'}>
      <nav className={s.navbar}>
        <Typography className={s.logo} as={Link} href={'#'} variant={'large'}>
          Inctagram
        </Typography>
        <LanguageSelect />
      </nav>
    </Container>
  )
}

export const Header = ({ isAuthorized }: Props) => {
  const pathname = usePathname()

  const isAuthPage = pathname?.startsWith('/auth')

  if (isAuthPage) {
    return <AuthHeader />
  }

  return (
    <header>
      <Container width={1310} padding={'0 15px'}>
        <nav className={s.navbar}>
          <Typography className={s.logo} as={Link} href={'#'} variant={'large'}>
            Inctagram
          </Typography>
          {isAuthorized ? <AuthorizedNavbarControls /> : <NotAuthorizedNavbarControls />}
        </nav>
      </Container>
    </header>
  )
}
