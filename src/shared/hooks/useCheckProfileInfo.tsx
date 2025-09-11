import { useEffect, useState } from 'react'

import { useGetProfileInformationQuery } from '@/features/settings/general-informations/api/generalInformationApi'
import { usePathname, useRouter } from '@/i18n/navigation'
import { CircleLoading } from '@/shared/components/circle-loading/CircleLoading'
import { ROUTES } from '@/shared/constants'

export const useCheckProfileInfo = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { data } = useGetProfileInformationQuery()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (data) {
      const { firstName, lastName } = data

      if (!firstName || !lastName) {
        router.replace(ROUTES.SETTINGS)
      } else {
        setIsLoading(false)
      }
    }
  }, [pathname, data])

  if (isLoading) {
    return <CircleLoading />
  }
}
