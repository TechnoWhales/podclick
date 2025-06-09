'use client'

import { ChangeEvent, ComponentPropsWithoutRef, useId, useState } from 'react'

import { Button, Typography } from '@/shared/components/ui'
import { Icon } from '@/shared/components/ui/icon/Icon'
import clsx from 'clsx'

import s from './TextField.module.scss'

type InputVariant = 'fullBorders' | 'horizontalBorders'

type InputMode = 'default' | 'search' | 'password'

type BaseTextField = {
  value: string
  label?: string
  error?: string
  margin?: string
  fullWidth?: boolean
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
  const { error, fullWidth, disabled, label, margin, className, id } = props
  const [hidePassword, setHidePassword] = useState(false)
  const generatedId = useId()
  const inputId = id || generatedId
  const containerStyle = clsx(s.container, fullWidth && s.fullWidth)
  const marginContainer = margin ? { margin } : undefined
  const labelComponent = label && (
    <Typography
      variant={'regular_text_14'}
      as={'label'}
      className={clsx(s.label)}
      htmlFor={inputId}
    >
      {label}
    </Typography>
  )
  const errorComponent = error && (
    <Typography as={'span'} className={clsx(s.errorText)}>
      {error}
    </Typography>
  )

  if (props.multiline) {
    const { onChange, value, multiline, rows = 4, ...rest } = props

    const textAreaStyle = clsx(
      s.textField,
      s.multiline,
      error && s.error,
      disabled && s.disabled,
      className
    )

    return (
      <div className={containerStyle} style={marginContainer}>
        {labelComponent}
        <textarea
          id={inputId}
          onChange={onChange}
          value={value}
          className={textAreaStyle}
          disabled={disabled}
          rows={rows}
          {...rest}
        />
        {errorComponent}
      </div>
    )
  }

  const { onChange, variant = 'fullBorders', mode = 'default', value, ...rest } = props

  const inputStyle = clsx(
    s.textField,
    error && s.error,
    disabled && s.disabled,
    variant === 'horizontalBorders' && s.horizontalBorders,
    mode === 'search' && s.iconStart,
    mode === 'password' && s.iconEnd,
    className
  )

  return (
    <div className={containerStyle} style={marginContainer}>
      {labelComponent}
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
          <Button
            disabled={disabled}
            className={clsx(s.eyeBtn)}
            onClick={() => setHidePassword(!hidePassword)}
            variant={'icon'}
          >
            {
              <Icon
                iconId={hidePassword ? 'eyeOffOutline' : 'eyeOutline'}
                width={'24px'}
                height={'24px'}
                viewBox={'0 0 24 24'}
              />
            }
          </Button>
        </div>
      )}
      {errorComponent}
    </div>
  )
}
