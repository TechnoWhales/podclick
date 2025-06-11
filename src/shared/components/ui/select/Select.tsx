'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import { forwardRef, type ReactNode } from 'react'

import { clsx } from 'clsx'

import { Icon, Typography } from '@/shared/components/ui'

import s from './Select.module.scss'

export type Option = {
  value: string
  label: string | ReactNode
}

type SelectProps = {
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  options: Option[]
  className?: string
  disabled?: boolean
  label?: string
  required?: boolean
  htmlFor?: string
  maxHeight?: string
  size?: 'm' | 's'
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>((props, ref) => {
  const {
    value,
    onValueChange,
    placeholder = 'Select...',
    options,
    className,
    disabled = false,
    label,
    required = false,
    htmlFor,
    maxHeight = '200px',
    size = 'm',
    ...rest
  } = props

  return (
    <div className={s.wrapper}>
      {label && (
        <Typography as={'label'} className={s.label} htmlFor={htmlFor} variant={'regular_text_14'}>
          {label}
          {required && <span className={s.required}>*</span>}
        </Typography>
      )}
      <SelectPrimitive.Root value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectPrimitive.Trigger
          ref={ref}
          id={htmlFor}
          className={clsx(s.trigger, className, {
            [s.disabled]: disabled,
            [s.sizeS]: size === 's',
          })}
          {...rest}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon>
            <Icon iconId={'arrowIosDownOutline'} />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content className={s.content} position={'popper'}>
            <SelectPrimitive.Viewport
              className={s.viewport}
              style={{ maxHeight, overflowY: 'auto' }}
            >
              {options.map(option => (
                <SelectPrimitive.Item key={option.value} value={option.value} className={s.item}>
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </div>
  )
})

Select.displayName = 'Select'
