'use client'
import { useRef, useEffect, useState } from 'react'

import AirDatepicker, {AirDatepickerDate, AirDatepickerOptions} from 'air-datepicker'
import localeEn from 'air-datepicker/locale/en';
import localeRu from 'air-datepicker/locale/ru';
import clsx from 'clsx'
import { useLocale } from 'next-intl'

import { TextField } from '@/shared/components/ui'

import 'air-datepicker/air-datepicker.css'
import './Datepicker.scss'

type Props = {
  label?: string
  fullWidth?: boolean
  error?: string
  startDate?: Date
  onSelect: ({formattedDate, date}: SelectType) => void
} &  AirDatepickerOptions<HTMLInputElement>

export type SelectType = {
  date: Date | Date[];
  formattedDate: string | string[];
  datepicker: AirDatepicker<HTMLInputElement>;
}

export const Datepicker = ({ onSelect, label, fullWidth, error, startDate, ...rest }: Props) => {
  const today = startDate || new Date();
  const [dates, setDates] = useState<AirDatepickerDate[]>([today])
  const dpRef = useRef<HTMLInputElement | null>(null)
  const instanceRef = useRef<AirDatepicker | null>(null)

  const locale = useLocale();

  const onSelectHandler = ({ formattedDate, datepicker, date }: SelectType) => {
    if (Array.isArray(date)) {
      setDates(date)
    } else {
      setDates([date])
    }
    onSelect({formattedDate, date, datepicker})
  }

  useEffect(() => {
    if (!dpRef.current) {
      return
    }

    instanceRef.current = new AirDatepicker(dpRef.current, {
      dateFormat: 'yyyy/MM/dd',
      view: 'days',
      multipleDatesSeparator: ' - ',
      classes: 'air-datepicker--custom',
      selectedDates: dates,
      fixedHeight: true,
      navTitles: {
        days: 'MMMM <i>yyyy</i>'
      },
      locale:  locale === 'en' ? localeEn : localeRu,
      onSelect: onSelectHandler,
      ...rest
    })

    const pickerEl = instanceRef.current.$datepicker;

    const preventBlur = (e: MouseEvent) => {
      e.preventDefault();
    };

    pickerEl.addEventListener('mousedown', preventBlur);

    return () => {
      dpRef.current?.blur()
      instanceRef.current?.destroy()
      instanceRef.current = null
      pickerEl.removeEventListener('mousedown', preventBlur);
    }
  }, [onSelect])

  return <TextField className={clsx('air-datepicker--input', dates.length > 1 && 'large', error && 'error')} label={label} error={error ? 'error' : ''} ref={dpRef}  fullWidth={fullWidth}/>
}
