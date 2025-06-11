import { useState } from 'react'

import Link from 'next/link'

import { Button, Icon, Typography } from '@/shared/components/ui'
import { Select, type Option } from '@/shared/components/ui/select/Select'

import s from './Header.module.scss'

type Props = {
  authorization: boolean
}

export const Header = ({ authorization }: Props) => {
  const options: Option[] = [
    {
      value: 'en',
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Icon iconId={'flagUnitedKingdom'} />
          English
        </span>
      ),
    },
    {
      value: 'ru',
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Icon iconId={'flagRussia'} />
          Russia
        </span>
      ),
    },
  ]

  const [value, setValue] = useState(options[0].value)

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
              <Select
                value={value}
                onValueChange={newValue => setValue(newValue)}
                options={options}
              />
            </div>
          ) : (
            <div className={s.navbarControls}>
              <Select
                value={value}
                onValueChange={newValue => setValue(newValue)}
                options={options}
              />
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
