import { TextField } from '@/shared/components/ui'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: TextField,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div style={{ backgroundColor: '#0d0d0d', padding: '100px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    value: {
      description:
        'Текущее значение поля ввода. Используется для управления содержимым компонента.',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    label: {
      description: 'Текст метки, отображаемый над полем ввода. Необязательное свойство.',
      control: { type: 'text' },
      table: {
        type: { summary: 'string | undefined' },
        defaultValue: { summary: 'undefined' },
      },
    },
    error: {
      description:
        'Текст ошибки, который отображается под полем, если введённые данные некорректны.',
      control: { type: 'text' },
      table: {
        type: { summary: 'string | undefined' },
        defaultValue: { summary: 'undefined' },
      },
    },
    margin: {
      description: 'CSS-значение отступов вокруг контейнера поля ввода (например, "10px 0").',
      control: { type: 'text' },
      table: {
        type: { summary: 'string | undefined' },
        defaultValue: { summary: 'undefined' },
      },
    },
    fullWidth: {
      description: 'Если true, компонент занимает всю доступную ширину родительского контейнера.',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean | undefined' },
        defaultValue: { summary: 'false' },
      },
    },
    variant: {
      description:
        'Вариант оформления поля ввода. Возможные значения: "fullBorders" — рамка вокруг всего поля, "horizontalBorders" — рамки сверху и снизу.',
      control: { type: 'select' },
      options: ['fullBorders', 'horizontalBorders'],
      table: {
        type: { summary: '"fullBorders" | "horizontalBorders"' },
        defaultValue: { summary: '"fullBorders"' },
      },
    },
    mode: {
      description:
        'Режим отображения поля. Возможные значения: "default" — обычное поле, "search" — поле с иконкой поиска, "password" — поле для пароля с возможностью показать/скрыть.',
      control: { type: 'select' },
      options: ['default', 'search', 'password'],
      table: {
        type: { summary: '"default" | "search" | "password"' },
        defaultValue: { summary: '"default"' },
      },
    },
    multiline: {
      description:
        'Если true, поле рендерится как многострочный textarea. Если false или не задано — как обычный input.',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean | undefined' },
        defaultValue: { summary: 'false' },
      },
    },
    onChange: {
      description:
        'Обработчик события изменения значения поля. Получает событие изменения для input или textarea соответственно.',
      action: 'changed',
      table: {
        type: { summary: '(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void' },
      },
    },
    disabled: {
      description:
        'Если true, поле становится неактивным и пользователь не может в него вводить данные.',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean | undefined' },
        defaultValue: { summary: 'false' },
      },
    },
    rows: {
      description:
        'Количество видимых строк в textarea. Используется только если multiline = true.',
      control: { type: 'number' },
      table: {
        type: { summary: 'number | undefined' },
        defaultValue: { summary: '4' },
      },
    },
  },
} satisfies Meta<typeof TextField>

export default meta

type Story = StoryObj<typeof TextField>

export const Default: Story = {
  args: {
    value: '',
    label: 'Email',
    placeholder: 'Epam@epam.com',
  },
}

export const HorizontalBorders: Story = {
  args: {
    value: '',
    label: 'Email',
    placeholder: 'Epam@epam.com',
    variant: 'horizontalBorders',
  },
}

export const Search: Story = {
  args: {
    value: '',
    placeholder: 'Input search',
    mode: 'search',
  },
}

export const Password: Story = {
  args: {
    label: 'Password',
    value: 'test123',
    placeholder: 'Input search',
    mode: 'password',
  },
}

export const Error: Story = {
  args: {
    ...Default.args,
    error: 'Incorrect email',
  },
}

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
}

export const Fullwidth: Story = {
  args: {
    ...Default.args,
    fullWidth: true,
  },
}
