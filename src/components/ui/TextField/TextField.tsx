import { ChangeEvent, ComponentPropsWithoutRef, useId, useState } from 'react'

import Icon from '@/components/ui/Icon/Icon'
import clsx from 'clsx'

import s from './TextField.module.scss'

type InputVariant = 'fullBorders' | 'horizontalBorders'

type InputMode = 'default' | 'search' | 'password'

type BaseTextField = {
  value: string
  label?: string
  error?: string
  margin?: string // margin контейнера
  fullWidth?: boolean // занимает всю ширину контейнера
}

type InputProps = BaseTextField & {
  variant?: InputVariant
  mode?: InputMode
  multiline?: false
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
} & ComponentPropsWithoutRef<'input'>

type TextAreaProps = BaseTextField & {
  multiline: true
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
} & ComponentPropsWithoutRef<'textarea'>

type TextFieldProps = InputProps | TextAreaProps

export const TextField = (props: TextFieldProps) => {
  const [hidePassword, setHidePassword] = useState(false)
  const inputId = useId()
  const { error, fullWidth, disabled } = props
  const containerStyle = clsx(s.container, fullWidth && s.fullWidth)

  // Если передан multiline рендерим textarea
  if (props.multiline) {
    const {
      onChange,
      className,
      label,
      value,
      multiline,
      fullWidth,
      rows = 4,
      disabled,
      margin,
      ...rest
    } = props

    const textAreaStyle = clsx(s.textField, s.multiline, error && s.error, disabled && s.disabled)

    return (
      <div className={containerStyle} style={{ margin: margin && margin }}>
        {label && (
          <label className={clsx(s.label)} htmlFor={inputId}>
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          onChange={onChange}
          value={value}
          className={textAreaStyle}
          disabled={disabled}
          rows={rows}
          {...rest}
        />
        {error && <span className={clsx(s.errorText)}>{error}</span>}
      </div>
    )
  }

  const {
    onChange,
    className,
    label,
    variant = 'fullBorders',
    mode = 'default',
    value,
    margin,
    ...rest
  } = props

  const inputStyle = clsx(
    s.textField,
    error && s.error,
    disabled && s.disabled,
    variant === 'horizontalBorders' && s.horizontalBorders,
    mode === 'search' && s.iconStart,
    mode === 'password' && s.iconEnd
  )

  return (
    <div className={containerStyle} style={{ margin: margin && margin }}>
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
        className={inputStyle}
        disabled={disabled}
        {...rest}
      />
      {mode === 'password' && (
        <div className={clsx(s.eyeIcon, disabled && s.disabled)}>
          <button
            type={'button'}
            disabled={disabled}
            className={clsx(s.eyeBtn)}
            onClick={() => setHidePassword(!hidePassword)}
            // aria-label={language === 'ru' ? 'Показать/скрыть пароль' : 'Show/hide password'}
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
