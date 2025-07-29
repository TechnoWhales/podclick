import { useRef, useEffect, useMemo } from 'react'

import AirDatepicker from 'air-datepicker'
import localeEn from 'air-datepicker/locale/en';
import localeRu from 'air-datepicker/locale/ru';
import { useLocale } from 'next-intl'

import { TextField } from '@/shared/components/ui'

import 'air-datepicker/air-datepicker.css'
import './Datepicker.scss'

type Props = {
  defaultDate?: string
  onSelect?: (formattedDate: string, date: Date) => void
}

export const Datepicker = ({ defaultDate, onSelect }: Props) => {
  const dpRef = useRef<HTMLInputElement>(null)
  const instanceRef = useRef<AirDatepicker | null>(null)
  const today = useMemo(() => new Date(), [])
  const locale = useLocale();

  useEffect(() => {
    if (!dpRef.current) {
      return
    }

    instanceRef.current = new AirDatepicker(dpRef.current, {
      dateFormat: 'yyyy/MM/dd',
      inline: true,
      startDate: '2021-01-01',
      classes: 'air-datepicker--custom',
      selectedDates: defaultDate ? [defaultDate] : [today],
      fixedHeight: true,
      navTitles: {
        days: 'MMMM <i>yyyy</i>'
      },
      locale:  locale === 'en' ? localeEn : localeRu ,
      onRenderCell: ({date, cellType, datepicker}) => {

      },

    })

    return () => {
      instanceRef.current?.destroy()
      instanceRef.current = null
    }
  }, [defaultDate, onSelect])

  return <TextField ref={dpRef} variant={'horizontalBorders'} style={{ width: '150px' }} />
}
