import type { Meta, StoryObj } from '@storybook/react'

import { fn } from '@storybook/test'

import { Button } from './Button'

const meta = {
  title: 'button',
  component: Button,
  parameters: {
    layout: 'centered',
  },

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

export const Fullwidth: Story = {
  args: {
    children: 'Fullwidth button',
    fullwidth: true,
    variant: 'primary',
  },
}
