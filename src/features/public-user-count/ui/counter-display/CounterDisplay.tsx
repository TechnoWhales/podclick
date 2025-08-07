import { Typography } from '@/shared/components/ui'

import s from './CounterDisplay.module.scss'

type CounterDisplayProps = {
  count: number
}

export const CounterDisplay = ({ count }: CounterDisplayProps) => {
  const formatted = count.toString().padStart(6, '0')

  return (
    <div className={s.wrapper}>
      {formatted.split('').map((digit, idx) => (
        <Typography className={s.item} key={idx} as={'span'} variant={'h2'}>
          {digit}
        </Typography>
      ))}
    </div>
  )
}
