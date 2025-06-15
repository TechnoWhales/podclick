import Link from 'next/link'

import { LanguageSelect } from '@/shared/components'
import { Button, Icon, Typography } from '@/shared/components/ui'

import s from './Header.module.scss'

type Props = {
  authorization: boolean
}

export const Header = ({ authorization }: Props) => {
  return (
    <header>
      <div className={s.container}>
        <nav className={s.navbar}>
          <Typography className={s.logo} as={Link} href={'./'} variant={'large'}>
            Inctagram
          </Typography>
          {authorization ? (
            <div className={s.navbarControls}>
              <Button variant={'icon'}>
                <Icon iconId={'outlineBell'} fill={'red'} />
              </Button>
              <LanguageSelect />
            </div>
          ) : (
            <div className={s.navbarControls}>
              <LanguageSelect />
              <div className={s.wrapperButtons}>
                <Button href={'#'} variant={'link'} as={'a'}>
                  <Typography variant={'bold_text_16'}>Login in</Typography>
                </Button>
                <Button href={'#'} variant={'primary'} as={'a'}>
                  <Typography variant={'bold_text_16'}>Sign up</Typography>
                </Button>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
