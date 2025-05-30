import { useState } from 'react'

import { TextField } from '@/components/ui/TextField/TextField'

export const TestInput = () => {
  const [value, setValue] = useState<string>(''.slice(0, 20))

  return (
    <div>
      {
        <TextField
          label={'Email'}
          placeholder={'Epam@epam.com'}
          onChange={e => setValue(e.currentTarget.value)}
          value={value}
          mode={'search'}
          variant={'horizontalBorders'}
        />
      }
    </div>
  )
}
