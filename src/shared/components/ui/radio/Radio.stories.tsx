import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Radio } from './Radio'

const meta: Meta<typeof Radio.Group> = {
  title: 'Components/Radio',
  component: Radio.Group,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    onValueChange: { action: 'valueChanged' },
  },
}

export default meta

type Story = StoryObj<typeof Radio.Group>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('option1')

    return (
      <Radio.Group value={value} onValueChange={setValue}>
        <Radio.Item value={'option1'} label={'Option 1'} />
        <Radio.Item value={'option2'} label={'Option 2'} />
        <Radio.Item value={'option3'} label={'Option 3'} />
      </Radio.Group>
    )
  },
}

export const WithDefaultSelected: Story = {
  render: () => {
    const [value, setValue] = useState('option2')

    return (
      <Radio.Group value={value} onValueChange={setValue}>
        <Radio.Item value={'option1'} label={'Option 1'} />
        <Radio.Item value={'option2'} label={'Option 2 (default)'} />
        <Radio.Item value={'option3'} label={'Option 3'} />
      </Radio.Group>
    )
  },
}

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState('option1')

    return (
      <Radio.Group value={value} onValueChange={setValue}>
        <Radio.Item value={'option1'} label={'Option 1'} disabled />
        <Radio.Item value={'option2'} label={'Option 2 (disabled)'} disabled />
        <Radio.Item value={'option3'} label={'Option 3'} />
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
        <Radio.Item value={'option1'} label={'Option 1'} />
        <Radio.Item value={'option2'} label={'Option 2 (checked & disabled)'} disabled />
        <Radio.Item value={'option3'} label={'Option 3'} />
      </Radio.Group>
    )
  },
}
