import { ChangeEvent, ComponentPropsWithoutRef, useId } from 'react'

import clsx from 'clsx'

import s from './TextArea.module.scss'

type TextAreaProps = {
  value: string
  label?: string
  error?: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
} & ComponentPropsWithoutRef<'textarea'>

export const TextArea = ({
  onChange,
  className,
  label,
  error,
  value,
  disabled,
  ...props
}: TextAreaProps) => {
  const inputId = useId()

  return (
    <div className={clsx(s.container)}>
      {label && (
        <label className={clsx(s.label)} htmlFor={inputId}>
          {label}
        </label>
      )}
      <TextArea
        id={inputId}
        onChange={onChange}
        value={value}
        className={clsx(s.input, error && s.error, disabled && s.disabled)}
        disabled={disabled}
        {...props}
      />
      {error && <span className={clsx(s.errorText)}>{error}</span>}
    </div>
  )
}
