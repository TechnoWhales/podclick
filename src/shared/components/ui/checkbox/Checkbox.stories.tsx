// components/Checkbox/Checkbox.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { CheckboxUni } from './Checkbox'
import { useState } from 'react'

const styles = `
  :root {
    /* Цветовые переменные */
    --color-accent-100: #73A5FF;
    --color-accent-300: #4C8DFF;
    --color-accent-500: #397DF6;
    --color-accent-700: #2F68CC;
    --color-accent-900: #234E99;

    --color-light-100: #FFFFFF;
    --color-light-500: #EDF3FA;
    --color-light-700: #D5DAE0;
    --color-light-900: #8D9094;

    --color-dark-100: #4C4C4C;
    --color-dark-300: #333333;
    --color-dark-500: #171717;
    --color-dark-700: #0D0D0D;
    --color-dark-900: #000000;

    /* Типографика */
    --font-family-primary: 'Inter', sans-serif;
    --font-size-xs: 0.875rem;
    --font-weight-400: 400;
    --line-height-m: 1.385;
  }

  .checkboxWrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    user-select: none;
    width: fit-content;
  }

  .checkboxRoot {
    all: unset;
    width: 18px;
    height: 18px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
    background: transparent;
    border: 2px solid var(--color-light-500);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    /* Checked state */
    &[data-state='checked'] {
      background: var(--color-accent-500);
      border-color: var(--color-accent-500);
    }

    /* Circle effect */
    &::before {
      content: '';
      position: absolute;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: transparent;
      z-index: -1;
      opacity: 0;
      transition: all 0.2s ease;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    /* Hover state - light gray circle */
    &:hover:not([disabled])::before {
      background: var(--color-dark-300);
      opacity: 0.1;
    }

    /* Focus state - medium gray circle */
    &:focus-visible::before {
      background: var(--color-dark-300);
      opacity: 0.3;
      outline: none;
    }

    /* Active state - dark gray circle */
    &:active:not([disabled])::before {
      background: var(--color-dark-100);
      opacity: 0.3;
    }

    /* Checked hover state */
    &[data-state='checked']:hover:not([disabled]) {
      background: var(--color-accent-300);
      border-color: var(--color-accent-300);
    }

    /* Disabled states */
    &[disabled] {
      cursor: not-allowed;
      
      &[data-state='checked'] {
        background: var(--color-dark-300);
        border-color: var(--color-dark-300);
      }
      
      &[data-state='unchecked'] {
        border-color: var(--color-light-900);
      }
    }
  }

  .checkboxIndicator {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    .checkmark {
      width: 16px;
      height: 12px;
      background: var(--color-light-100);
      clip-path: polygon(
        10% 50%,
        0% 65%,
        40% 100%,
        100% 15%,
        90% 0%,
        38% 75%
      );
      transform: translateY(-1px);
    }
  }

  .label {
    color: var(--color-light-100);
    font-family: var(--font-family-primary);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-400);
    line-height: var(--line-height-m);
    cursor: pointer;

    .checkboxRoot[disabled] + & {
      cursor: not-allowed;
      opacity: 0.7;
    }
  }
`

const meta: Meta<typeof CheckboxUni> = {
  title: 'Components/Checkbox',
  component: CheckboxUni,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    onCheckedChange: { action: 'checked' },
  },
  decorators: [
    Story => (
      <>
        <style>{styles}</style>
        <div style={{ padding: '24px' }}>
          <Story />
        </div>
      </>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof CheckboxUni>

// Базовые сторисы
export const Default: Story = { args: { label: 'Default checkbox' } }
export const Checked: Story = { args: { label: 'Checked', checked: true } }
export const Disabled: Story = { args: { label: 'Disabled', disabled: true } }
export const CheckedDisabled: Story = {
  name: 'Checked & Disabled',
  args: { label: 'Checked & Disabled', checked: true, disabled: true },
}
