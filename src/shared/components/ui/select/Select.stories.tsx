// Select.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { fn } from '@storybook/test'

import { Select } from './Select'

const meta: Meta<typeof Select> = {
  title: 'Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['s', 'm'],
      control: { type: 'radio' },
      description: 'Размер компонента',
    },
    disabled: {
      control: 'boolean',
      description: 'Неактивное состояние',
    },
    required: {
      control: 'boolean',
      description: 'Обязательное поле',
    },
    maxHeight: {
      control: 'text',
      description: 'Максимальная высота выпадающего списка',
    },
    onValueChange: {
      action: 'valueChanged',
      description: 'Обработчик изменения значения',
    },
  },
  args: {
    value: '',
    onValueChange: fn(),
    placeholder: 'Выберите вариант',
    options: [
      { value: 'option1', label: 'Вариант 1' },
      { value: 'option2', label: 'Вариант 2' },
      { value: 'option3', label: 'Вариант 3' },
    ],
    size: 'm',
    disabled: false,
    required: false,
    maxHeight: '200px',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLabel: Story = {
  args: {
    label: 'Выберите вариант',
  },
}

export const RequiredField: Story = {
  args: {
    label: 'Обязательный выбор',
    required: true,
  },
}

export const DisabledState: Story = {
  args: {
    disabled: true,
    label: 'Неактивное поле',
  },
}

export const SmallSize: Story = {
  args: {
    size: 's',
    label: 'Компактный вариант',
  },
}

export const WithPreselectedValue: Story = {
  args: {
    value: 'option2',
    label: 'С предвыбранным значением',
  },
}

export const LongList: Story = {
  args: {
    options: Array.from({ length: 20 }, (_, i) => ({
      value: `item-${i}`,
      label: `Элемент списка ${i + 1}`,
    })),
    maxHeight: '300px',
    label: 'Длинный список',
  },
}

export const Controlled: Story = {
  render: args => {
    const [value, setValue] = useState('')

    return <Select {...args} value={value} onValueChange={setValue} options={args.options} />
  },
  args: {
    label: 'Контролируемый компонент',
  },
}
