'use client'

import { ReactNode } from 'react'

import { ProtectedLayout } from '@/shared/components'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <ProtectedLayout>{children}</ProtectedLayout>
}
