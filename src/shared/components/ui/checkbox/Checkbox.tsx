// components/Checkbox/Checkbox.tsx
'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import React, { useId } from 'react'
import s from './Checkbox.module.scss'
//styles на s
interface CheckboxProps {
  label?: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
}

export const CheckboxUni = ({
  label,
  checked,
  onCheckedChange,
  disabled,

  ...props
}: CheckboxProps) => {
  const checkboxId = useId()
  return (
    <div className={`${s.checkboxWrapper}`}>
      <CheckboxPrimitive.Root
        id={checkboxId}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={s.checkboxRoot}
        {...props}
      >
        <CheckboxPrimitive.Indicator className={s.checkboxIndicator}>
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
