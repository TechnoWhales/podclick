import Link from 'next/link'
import { Select, type Option } from '@/shared/components/ui/select/Select'
import { useState } from 'react'
import s from './Header.module.scss'
import { Typography } from '@/shared/components/ui'

type Props = {
  authorization: boolean
}

export const Header = ({ authorization }: Props) => {
  const options: Option[] = [
    { value: 'en', label: 'flag English' },
    { value: 'ru', label: 'flag Russian' },
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
              <button>Icon</button>
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
                <button>Log in</button>
                <button>Log up</button>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
