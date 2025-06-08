// components/Checkbox/Checkbox.tsx
'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import React, { useId } from 'react'
import s from './Checkbox.module.scss'

interface CheckboxProps {
  label?: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
}

export const Checkbox = ({
  label,
  checked,
  onCheckedChange,
  disabled,
  ...props
}: CheckboxProps) => {
  const checkboxId = useId()
  return (
    <div className={s.wrapper}>
      <CheckboxPrimitive.Root
        id={checkboxId}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={s.root}
        {...props}
      >
        <CheckboxPrimitive.Indicator className={s.indicator}>
          <div className={s.checkmark} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      {label && (
        <label htmlFor={checkboxId} className={s.label}>
          {label}
        </label>
      )}
    </div>
  )
}
