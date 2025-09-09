'use client'

import { ReactNode } from 'react'

import { OnlyUnauthLayout } from '@/shared/components'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <OnlyUnauthLayout>{children}</OnlyUnauthLayout>
}
