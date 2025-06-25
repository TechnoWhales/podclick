'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
  const tCommon = useTranslations('common')

  return (
    <div className={s.navbarControls}>
      <Link href={ROUTES.AUTH.SIGN_IN} passHref legacyBehavior>
        <Button variant={'link'} as={'a'}>
          <Typography variant={'bold_text_16'}>{tCommon('button.logIn')}</Typography>
        </Button>
      </Link>
      <Link href={ROUTES.AUTH.SIGN_UP} passHref legacyBehavior>
        <Button variant={'primary'} as={'a'}>
          <Typography variant={'bold_text_16'}>{tCommon('button.signUp')}</Typography>
        </Button>
      </Link>
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

  const isAuthPage = pathname.includes('/auth')

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
