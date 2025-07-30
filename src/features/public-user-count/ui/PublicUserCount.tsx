import { CounterDisplay } from '@/features/public-user-count/ui/counter-display/CounterDisplay'
import { Typography } from '@/shared/components/ui'
import { BASE_API } from '@/shared/constants'

import s from './PublicUserCount.module.scss'

export const PublicUserCount = async () => {
  const res = await fetch(`${BASE_API}/public-user`)
  const data = await res.json()

  return (
    <div className={s.wrapper}>
      <Typography as={'h2'} variant={'h2'}>
        Registered users:
      </Typography>
      <CounterDisplay count={data.totalCount} />
    </div>
  )
}
