'use client'
import { GoogleGithubAuth } from '@/features/auth/ui/googleGithubAuth/GogleGithubAuth'

export default function Home() {
  return (
    <>
      <div>Hello, TechnoWhales!</div>
      <GoogleGithubAuth />
    </>
  )
}
