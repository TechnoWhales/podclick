import { Suspense } from 'react'

import { PublicCards } from '@/features/public-cards/ui/PublicCards'
import { PublicUserCount } from '@/features/public-user-count/ui/PublicUserCount'
import { CircleLoading } from '@/shared/components/circle-loading/CircleLoading'
import { Providers } from '@/shared/providers'

import s from './Page.module.scss'

export default function Home() {
  return (
    <Providers>
      <Suspense fallback={<CircleLoading />}>
        <PublicUserCount className={s.publicUserCount} />
        <PublicCards />
      </Suspense>
    </Providers>
  )
}
