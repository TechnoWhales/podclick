import { Suspense } from 'react'

import { PublicUserCount } from '@/features/public-user-count'
import { CircleLoading } from '@/shared/components/circle-loading/CircleLoading'
import { Providers } from '@/shared/providers'

export default function Home() {
  return (
    <Providers>
      <Suspense fallback={<CircleLoading />}>
        <PublicUserCount />
      </Suspense>
    </Providers>
  )
}
