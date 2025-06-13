'use client'

import { useState } from 'react'

import { Icon } from '@/shared/components/ui'
import { type SelectOption, Select } from '@/shared/components/ui/'

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

  return (
    <Select
      value={value}
      onValueChange={newValue => setValue(newValue)}
      options={options}
      size={'s'}
    />
  )
}
