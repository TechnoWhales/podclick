import clsx from 'clsx'

import { CounterDisplay } from '@/features/public-user-count/ui/counter-display/CounterDisplay'
import { Title } from '@/features/public-user-count/ui/title/Title'
import { BASE_API } from '@/shared/constants'

import s from './PublicUserCount.module.scss'

type Props = {
  className?: string
}

async function fetchPublicUser() {
  const res = await fetch(`${BASE_API}/public-user`)

  if (!res.ok) {
    throw new Error('Failed to fetch public user count')
  }

  return res.json()
}

export const PublicUserCount = async ({ className }: Props) => {
  const data = await fetchPublicUser()

  return (
    <div className={clsx(s.wrapper, className)}>
      <Title />
      <CounterDisplay count={data.totalCount} />
    </div>
  )
}
