import type { Card } from '../lib'

import clsx from 'clsx'

import { PublicCard } from '@/features/public-cards/ui/public-card/PublicCard'
import { BASE_API } from '@/shared/constants'

import s from './PublicCards.module.scss'

type Props = {
  className?: string
}

export const PublicCards = async ({ className }: Props) => {
  const res = await fetch(`${BASE_API}/public-posts/all?pageSize=4`)

  if (!res.ok) {
    throw new Error('Failed to fetch public posts')
  }

  const data = await res.json()
  const items: Card[] = data.items

  return (
    <div className={clsx(s.wrapper, className)}>
      {items.map(item => (
        <PublicCard key={item.id} item={item} />
      ))}
    </div>
  )
}
