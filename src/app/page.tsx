'use client'

import { Logout } from '@/features/auth/log-out/Logout'

export default function Home() {
  return (
    <div>
      Hello, TechnoWhales!
      <Logout />
    </div>
  )
}
