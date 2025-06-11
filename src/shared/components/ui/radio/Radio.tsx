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

const Group = ({ value, onValueChange, children, className }: RadioGroupProps) => {
  return (
    <RadioPrimitive.Root
      className={`${s.group} ${className || ''}`}
      value={value}
      onValueChange={onValueChange}
    >
      {children}
    </RadioPrimitive.Root>
  )
}

const Item = ({ value, label, disabled, className }: RadioItemProps) => {
  const radioId = useId()

  return (
    <div className={`${s.wrapper} ${className || ''}`}>
      <RadioPrimitive.Item id={radioId} value={value} disabled={disabled} className={s.root}>
        <RadioPrimitive.Indicator className={s.indicator} />
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
  Group,
  Item,
}
