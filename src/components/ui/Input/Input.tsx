import { ChangeEvent, ComponentPropsWithoutRef, useId } from 'react'

import clsx from 'clsx'

import s from './Input.module.scss'

type InputVariant = 'fullBorders' | 'horizontalBorders'

type InputProps = {
  label?: string
  error?: string
  variant?: InputVariant
  iconEnd?: string
  iconStart?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
} & ComponentPropsWithoutRef<'input'>

export const Input = ({
  onChange,
  className,
  label,
  error,
  variant = 'fullBorders',
  iconEnd,
  iconStart,
  ...props
}: InputProps) => {
  const inputId = useId()

  return (
    <div className={clsx(s.container)}>
      {label && (
        <label className={clsx(s.label)} htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className={clsx(s.inputWrapper)}>
        <input
          id={inputId}
          onChange={onChange}
          className={clsx(
            s.input,
            error && s.error,
            variant === 'horizontalBorders' && s.horizontalBorders,
            iconStart && s.iconStart,
            iconEnd && s.iconEnd
          )}
          {...props}
        />
      </div>
      {error && <span className={clsx(s.errorText)}>{error}</span>}
    </div>
  )
}
