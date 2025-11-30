'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { GeneralInformation } from '@/features/settings/general-informations/GeneralInformation'
import { usePathname, useRouter } from '@/i18n/navigation'
import { Tabs } from '@/shared/components/ui/tabs/Tabs'

export const Settings = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations('settings')

  const tabs = [
    { title: t('tabs.generalInformation'), value: 'General_information' },
    { title: t('tabs.devices'), value: 'Devices' },
    { title: t('tabs.accountManagement'), value: 'Account_Management' },
    { title: t('tabs.myPayments'), value: 'My_payments' },
  ]

  const getInitialTabValue = () => {
    const part = searchParams.get('part')
    switch (part) {
      case 'info':
        return 'General_information'
      case 'devices':
        return 'Devices'
      case 'account':
        return 'Account_Management'
      case 'payments':
        return 'My_payments'
      default:
        return 'General_information'
    }
  }

  const [activeTab, setActiveTab] = useState(getInitialTabValue)

  const getBasePath = () => {
    return pathname
  }

  useEffect(() => {
    if (pathname.includes('/settings') && !searchParams.has('part')) {
      router.replace(`${getBasePath()}?part=info`)
    }
  }, [pathname, router])

  useEffect(() => {
    setActiveTab(getInitialTabValue())
  }, [searchParams])

  const handleTabChange = (value: string) => {
    setActiveTab(value)

    let partParam = ''
    switch (value) {
      case 'General_information':
        partParam = 'info'
        break
      case 'Devices':
        partParam = 'devices'
        break
      case 'Account_Management':
        partParam = 'account'
        break
      case 'My_payments':
        partParam = 'payments'
        break
      default:
        partParam = 'info'
    }

    router.push(`${getBasePath()}?part=${partParam}`)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'General_information':
        return <GeneralInformation />
      case 'Devices':
        return <div>{t('content.devices')}</div>
      case 'Account_Management':
        return <div>{t('content.accountManagement')}</div>
      case 'My_payments':
        return <div>{t('content.myPayments')}</div>
      default:
        return <GeneralInformation />
    }
  }

  return (
    <div>
      <Tabs tabs={tabs} value={activeTab} onValueChange={handleTabChange} />
      {renderContent()}
    </div>
  )
}
