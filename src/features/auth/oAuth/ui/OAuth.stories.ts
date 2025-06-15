import { Meta, StoryObj } from '@storybook/react'

import { OAuth } from './ui'

const meta = {
  title: 'Auth/OAuth',
  component: OAuth,
} satisfies Meta<typeof OAuth>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: `Компонент OAuth объединяет кнопки авторизации через Google и GitHub. Дизайн кнопок сохраняется неизменным на разных разрешениях экрана. Для кнопок используется компонент **Button** с вариантом \`variant="icon"\`. Используется на страницах входа и регистрации для быстрого входа через внешние сервисы.`,
      },
    },
  },
}
