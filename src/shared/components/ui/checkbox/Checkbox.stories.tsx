import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Checkbox } from './Checkbox'

const styles = `
  :root {
    /* Цветовые переменные */
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

  body {
    background: var(--color-dark-500);
    color: var(--color-light-100);
    font-family: var(--font-family-primary);
    padding: 20px;
  }
`

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    onCheckedChangeAction: { action: 'checked' },
  },
  decorators: [
    Story => (
      <>
        <style>{styles}</style>
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Story />
        </div>
      </>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof Checkbox>

// Базовые сторисы
export const Default: Story = {
  args: { label: 'Default checkbox' },
  render: args => {
    const [checked, setChecked] = useState(false)

    return <Checkbox {...args} checked={checked} onCheckedChangeAction={setChecked} />
  },
}

export const Checked: Story = {
  args: { label: 'Checked' },
  render: args => {
    const [checked, setChecked] = useState(true)

    return <Checkbox {...args} checked={checked} onCheckedChangeAction={setChecked} />
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
  render: args => <Checkbox {...args} />,
}

export const CheckedDisabled: Story = {
  name: 'Checked & Disabled',
  args: {
    label: 'Checked & Disabled',
    checked: true,
    disabled: true,
  },
  render: args => <Checkbox {...args} />,
}

export const InteractiveDemo = {
  render: () => {
    const [checked1, setChecked1] = useState(false)
    const [checked2, setChecked2] = useState(true)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Checkbox
          label={'Uncontrolled checkbox'}
          onCheckedChangeAction={checked => console.log('Checked:', checked)}
        />
        <Checkbox
          label={'Controlled checkbox'}
          checked={checked1}
          onCheckedChangeAction={setChecked1}
        />
        <Checkbox
          label={'Checked by default'}
          checked={checked2}
          onCheckedChangeAction={setChecked2}
        />
        <Checkbox label={'Disabled unchecked'} disabled />
        <Checkbox label={'Disabled checked'} checked disabled />
      </div>
    )
  },
}
