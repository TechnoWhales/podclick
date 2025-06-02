// components/Radio/Radio.tsx
'use client'

import * as RadioPrimitive from '@radix-ui/react-radio-group'
import React, { useId } from 'react'
import s from './Radio.module.scss'

type RadioGroupProps = {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
  className?: string
}

type RadioItemProps = {
  value: string
  label?: string
  disabled?: boolean
  className?: string
}

const RadioGroupRoot = ({ value, onValueChange, children, className }: RadioGroupProps) => {
  return (
    <RadioPrimitive.Root
      className={`${s.radioGroup} ${className || ''}`}
      value={value}
      onValueChange={onValueChange}
    >
      {children}
    </RadioPrimitive.Root>
  )
}

const RadioItem = ({ value, label, disabled, className }: RadioItemProps) => {
  const radioId = useId()
  return (
    <div className={`${s.radioWrapper} ${className || ''}`}>
      <RadioPrimitive.Item id={radioId} value={value} disabled={disabled} className={s.radioRoot}>
        <RadioPrimitive.Indicator className={s.radioIndicator} />
      </RadioPrimitive.Item>

      {label && (
        <label htmlFor={radioId} className={s.label}>
          {label}
        </label>
      )}
    </div>
  )
}

export const Radio = {
  Group: RadioGroupRoot,
  Item: RadioItem,
}
