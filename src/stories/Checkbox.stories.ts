// components/Checkbox/Checkbox.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { CheckboxUni } from '../common/components/checkbox/Checkbox' // Убедитесь, что путь правильный

const meta: Meta<typeof CheckboxUni> = {
  title: 'Components/UI/Checkbox', // Улучшенная структура в Storybook
  component: CheckboxUni,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered', // Центрируем компонент для лучшего отображения
  },
  argTypes: {
    id: {
      control: 'text',
      description: 'Уникальный идентификатор чекбокса',
    },
    label: {
      control: 'text',
      description: 'Текстовая метка рядом с чекбоксом',
    },
    checked: {
      control: 'boolean',
      description: 'Состояние чекбокса (выбран/не выбран)',
    },
    onCheckedChange: {
      action: 'checkedChanged',
      description: 'Событие при изменении состояния',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключено ли взаимодействие с чекбоксом',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы',
    },
  },
  args: {
    // Значения по умолчанию для всех историй
    id: 'checkbox-id',
    checked: false,
    disabled: false,
  },
}

export default meta

type Story = StoryObj<typeof CheckboxUni>

// Базовая история
export const Default: Story = {
  args: {
    label: 'Обычный чекбокс',
  },
}

// Выбранный чекбокс
export const Checked: Story = {
  args: {
    label: 'Выбранный чекбокс',
    checked: true,
  },
}

// Отключенный чекбокс
export const Disabled: Story = {
  args: {
    label: 'Отключенный чекбокс',
    disabled: true,
  },
}

// Отключенный и выбранный
export const DisabledChecked: Story = {
  args: {
    label: 'Отключенный и выбранный',
    checked: true,
    disabled: true,
  },
}

// Без метки
export const WithoutLabel: Story = {
  args: {
    label: undefined,
  },
}
