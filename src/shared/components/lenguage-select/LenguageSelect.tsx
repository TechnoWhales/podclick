'use client'

import { useEffect, useState } from 'react'

import { useLocale } from 'next-intl'

import { usePathname, useRouter } from '@/i18n/navigation'
import { Icon } from '@/shared/components/ui'
import { type SelectOption, Select } from '@/shared/components/ui/'
import { useSearchParams } from 'next/navigation'
import { useGetAllQueryParams } from '@/shared/hooks/useGetAllQueryParams'

export const LanguageSelect = () => {
  const labelStyle = { display: 'flex', alignItems: 'center', gap: '12px' }

  const options: SelectOption[] = [
    {
      value: 'en',
      label: (
        <span style={labelStyle}>
          <Icon iconId={'flagUnitedKingdom'} />
          English
        </span>
      ),
    },
    {
      value: 'ru',
      label: (
        <span style={labelStyle}>
          <Icon iconId={'flagRussia'} />
          Russia
        </span>
      ),
    },
  ]

  const [value, setValue] = useState(options[0].value)

  const router = useRouter()
  const locale = useLocale()
  const path = usePathname()

  useEffect(() => {
    setValue(locale)
  }, [])

  const query = useGetAllQueryParams()

  const changeLang = (locale: string) => {
    setValue(locale)
    router.replace({ pathname: path, query }, { locale })
  }

  return (
    <Select
      value={value}
      onValueChange={newValue => changeLang(newValue)}
      options={options}
      size={'s'}
    />
  )
}
