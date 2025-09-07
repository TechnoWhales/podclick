'use client'

import { ReactNode } from 'react'

import { ProtectedLayout } from '@/shared/components'
import { useCheckProfileInfo } from '@/shared/hooks/useCheckProfileInfo'

export default function AuthLayout({ children }: { children: ReactNode }) {
  useCheckProfileInfo()

  return <ProtectedLayout>{children}</ProtectedLayout>
}
