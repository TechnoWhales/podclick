import { ChangeEvent, ComponentPropsWithoutRef, useId, useState } from 'react'

import Icon from '@/components/ui/Icon/Icon'
import clsx from 'clsx'

import s from './Input.module.scss'

type InputVariant = 'fullBorders' | 'horizontalBorders'
type InputMode = 'default' | 'search' | 'password'

type InputProps = {
  value: string
  label?: string
  error?: string
  variant?: InputVariant
  mode?: InputMode
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
} & ComponentPropsWithoutRef<'input'>

export const Input = ({
  onChange,
  className,
  label,
  error,
  variant = 'fullBorders',
  mode = 'default',
  value,
  disabled,
  ...props
}: InputProps) => {
  const [hidePassword, setHidePassword] = useState(false)
  const inputId = useId()

  return (
    <div className={clsx(s.container)}>
      {label && (
        <label className={clsx(s.label)} htmlFor={inputId}>
          {label}
        </label>
      )}
      {mode === 'search' && (
        <div className={clsx(s.searchIcon, disabled && s.disabled)}>
          {<Icon iconId={'search'} width={'18px'} height={'18px'} viewBox={'0 0 18 18'} />}
        </div>
      )}
      <input
        id={inputId}
        type={mode === 'password' && !hidePassword ? 'password' : 'text'}
        onChange={onChange}
        value={value}
        className={clsx(
          s.input,
          error && s.error,
          disabled && s.disabled,
          variant === 'horizontalBorders' && s.horizontalBorders,
          mode === 'search' && s.iconStart,
          mode === 'password' && s.iconEnd
        )}
        disabled={disabled}
        {...props}
      />
      {mode === 'password' && (
        <div className={clsx(s.iconEye, disabled && s.disabled)}>
          <button
            type={'button'}
            disabled={disabled}
            className={clsx(s.eyeBtn)}
            onClick={() => setHidePassword(!hidePassword)}
          >
            {
              <Icon
                iconId={hidePassword ? 'eyeOffOutline' : 'eyeOutline'}
                width={'24px'}
                height={'24px'}
                viewBox={'0 0 24 24'}
              />
            }
          </button>
        </div>
      )}
      {error && <span className={clsx(s.errorText)}>{error}</span>}
    </div>
  )
}
