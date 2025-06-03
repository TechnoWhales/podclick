import type { Meta, StoryObj } from '@storybook/react'

import { fn } from '@storybook/test'

import { Button } from './Button'

const meta = {
  title: 'button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],

  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary button',
  },
}

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'Outlined button',
  },
}

export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
  },
}

export const AsLink: Story = {
  args: {
    as: true,
    children: <a href={'https://it-incubator.by/'}>Link that looks like a button</a>,
    variant: 'primary',
  },
}

export const Icon: Story = {
  args: {
    children: (
      <img src={'https://img.icons8.com/?size=120&id=VdhZFoOECtgD&format=png'} alt={'Icon'} />
    ),
    variant: 'icon',
  },
}
