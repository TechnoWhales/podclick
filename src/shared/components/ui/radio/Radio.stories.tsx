// components/Radio/Radio.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Radio } from './Radio'
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

  .radioGroup {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .radioWrapper {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    position: relative;
    user-select: none;
    width: fit-content;
  }

  .radioRoot {
    all: unset;
    position: relative;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;
    background: transparent;
    border: 2px solid var(--color-light-500);
    display: flex;
    align-items: center;
    justify-content: center;

    &[data-state='checked'] {
      border-color: var(--color-light-100);
    }

    &::before {
      content: '';
      position: absolute;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: transparent;
      z-index: -1;
      opacity: 0;
      transition:
        opacity 0.1s,
        background 0.1s;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    &:hover:not([disabled])::before {
      background: var(--color-dark-300);
      opacity: 0.2;
    }

    &:focus:not([disabled])::before {
      background: var(--color-dark-500);
      opacity: 0.3;
    }

    &:active:not([disabled]):hover::before {
      background: var(--color-dark-100);
      opacity: 0.3;
    }

    &[disabled] {
      cursor: not-allowed;

      &[data-state='checked'] {
        border-color: var(--color-light-900);

        .radioIndicator {
          background: var(--color-light-700);
        }
      }

      &[data-state='unchecked'] {
        border-color: var(--color-light-900);
      }
    }
  }

  .radioIndicator {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--color-light-100);
  }

  .label {
    margin-left: 10px;
    color: var(--color-light-100);
    font-family: var(--font-family-primary);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-400);
    line-height: var(--line-height-m);
    cursor: pointer;

    .radioRoot[disabled] + & {
      cursor: not-allowed;
      opacity: 0.7;
    }
  }
`

const meta: Meta<typeof Radio.Group> = {
  title: 'Components/Radio',
  component: Radio.Group,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    onValueChange: { action: 'valueChanged' },
    disabled: { control: 'boolean' },
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

type Story = StoryObj<typeof Radio.Group>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('option1')
    return (
      <Radio.Group value={value} onValueChange={setValue}>
        <Radio.Item value="option1" label="Option 1" />
        <Radio.Item value="option2" label="Option 2" />
        <Radio.Item value="option3" label="Option 3" />
      </Radio.Group>
    )
  },
}

export const WithDefaultSelected: Story = {
  render: () => {
    const [value, setValue] = useState('option2')
    return (
      <Radio.Group value={value} onValueChange={setValue}>
        <Radio.Item value="option1" label="Option 1" />
        <Radio.Item value="option2" label="Option 2 (default)" />
        <Radio.Item value="option3" label="Option 3" />
      </Radio.Group>
    )
  },
}

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState('option1')
    return (
      <Radio.Group value={value} onValueChange={setValue}>
        <Radio.Item value="option1" label="Option 1" disabled />
        <Radio.Item value="option2" label="Option 2 (disabled)" disabled />
        <Radio.Item value="option3" label="Option 3" />
      </Radio.Group>
    )
  },
}

export const DisabledChecked: Story = {
  name: 'Disabled & Checked',
  render: () => {
    const [value, setValue] = useState('option2')
    return (
      <Radio.Group value={value} onValueChange={setValue}>
        <Radio.Item value="option1" label="Option 1" />
        <Radio.Item value="option2" label="Option 2 (checked & disabled)" disabled />
        <Radio.Item value="option3" label="Option 3" />
      </Radio.Group>
    )
  },
}
