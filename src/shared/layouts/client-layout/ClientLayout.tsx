'use client'

import { ReactNode } from 'react'
import { useSelector } from 'react-redux'

import clsx from 'clsx'

import { Header, Sidebars } from '@/shared/components'
import { Container } from '@/shared/components/ui'
import { selectAppIsAuth, selectIsInitialized } from '@/shared/model/appSlice'

import s from './ClientLayout.module.scss'

type Props = {
  children: ReactNode
}

export const ClientLayout = ({ children }: Props) => {
  const isAuth = useSelector(selectAppIsAuth)
  const isInitialized = useSelector(selectIsInitialized)

  if (!isInitialized) {
    return null
  }

  return (
    <>
      <Header />
      <Container width={1310} padding={'0 15px'}>
        <div className={clsx(s.appGrid, isAuth ? s.withSidebar : s.centerContent)}>
          {isAuth && <Sidebars />}
          <main>
            <Container width={1020} padding={'36px 24px 0'}>
              {children}
            </Container>
          </main>
        </div>
      </Container>
    </>
  )
}
