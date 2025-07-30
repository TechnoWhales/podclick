import { useRef, useEffect, useMemo, useState } from 'react'

import AirDatepicker, { AirDatepickerOptions } from 'air-datepicker'
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
  error: string
  onSelect: ({formattedDate, date}: SelectType) => void
} &  AirDatepickerOptions<HTMLInputElement>

export type SelectType = {
  formattedDate: string | string[],
  date: Date | Date[],
  datepicker: AirDatepicker<HTMLInputElement>
}

export const Datepicker = ({ onSelect, label, fullWidth, error, ...rest }: Props) => {
  const [inputValueLength, setInputValueLength] = useState<number>(0)
  const [isOpen, setIsOpen] = useState(false)
  const dpRef = useRef<HTMLInputElement | null>(null)
  const instanceRef = useRef<AirDatepicker | null>(null)
  const today = useMemo(() => {
    const d = new Date();
    const year  = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day   = String(d.getDate()).padStart(2, '0');

    return `${year}/${month}/${day}`;
  }, []);
  const locale = useLocale();

  const onSelectHandler = ({ formattedDate, datepicker, date }: SelectType) => {
    onSelect({formattedDate, date, datepicker})
    if (formattedDate.length === 1) {
      setInputValueLength(formattedDate[0].length - 3)

      return
    }
    const sumLength = formattedDate[0].length - 1 + formattedDate[1].length - 1

    setInputValueLength(sumLength)
  }

  useEffect(() => {
    if (!dpRef.current) {
      return
    }

     setInputValueLength(today.length - 3)

    instanceRef.current = new AirDatepicker(dpRef.current, {
      dateFormat: 'yyyy/MM/dd',
      view: 'days',
      inline: true,
      multipleDatesSeparator: ' - ',
      classes: 'air-datepicker--custom',
      selectedDates: [today],
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
      instanceRef.current?.destroy()
      instanceRef.current = null
      pickerEl.removeEventListener('mousedown', preventBlur);
    }
  }, [onSelect])



  return <TextField size={inputValueLength} className={clsx('air-datepicker--input', rest.range && 'range', error && 'error')} label={label} error={error ? 'error' : ''} ref={dpRef}  fullWidth={fullWidth}/>
}
