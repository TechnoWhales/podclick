import { Meta, StoryObj } from '@storybook/react'

import { Avatar } from './Avatar'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const NoImageAvatar: Story = {
  args: {
    url: '',
    size: 204,
    title: 'Avatar',
  },
}
export const BigAvatar: Story = {
  args: {
    url: '/mock/avatar.png',
    size: 204,
    title: 'Big avatar',
  },
}
export const MiddleAvatar: Story = {
  args: {
    url: '/mock/avatar.png',
    size: 48,
    title: 'Middle avatar',
  },
}
export const SmallAvatar: Story = {
  args: {
    url: '/mock/avatar.png',
    size: 36,
    title: 'Small avatar',
  },
}
