import { Meta, StoryObj } from '@storybook/react'
import { Typography, TypographyVariant } from './Typography'
import { ElementType } from 'react'

const meta = {
  title: "Components/Typography",
  component: Typography,
  
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

const TypographyAll = () => {
  const variants = [
    { name: 'Large', variant: 'large', as: 'h1' },
    { name: 'Heading 1', variant: 'h1', as: 'h1' },
    { name: 'Heading 2', variant: 'h2', as: 'h2' },
    { name: 'Heading 3', variant: 'h3', as: 'h3' },
    { name: 'Regular text 16', variant: 'regular_text_16' },
    { name: 'Bold text 16', variant: 'bold_text_16' },
    { name: 'Regular text 14', variant: 'regular_text_14' },
    { name: 'Medium text 14', variant: 'medium_text_14' },
    { name: 'Bold text 14', variant: 'bold_text_14' },
    { name: 'Small text', variant: 'small_text' },
    { name: 'Semibold small text', variant: 'semibold_small_text' },
    { name: 'Regular Link', variant: 'regular_link' },
    { name: 'Small Link', variant: 'small_link' },
    { name: 'Error', variant: 'error' },
    { name: 'Caption', variant: 'caption' },
  ] satisfies Array<{ name: string; variant: TypographyVariant; as?: ElementType }>

  return (
    <>
      {variants.map(({ name, variant, as }) => (
        <div key={variant}>
          <Typography variant={variant} as={as}>
            {name}
          </Typography>
        </div>
      ))}
    </>
  )
}

export const AllVariants: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of all typography variants',
      },
    },
  },
  render: () => <TypographyAll />,
}

export const Default: Story = {
  args: {
    children: 'I am Paragraph',
    variant: 'regular_text_14',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default typography style (same as RegularText14 variant)',
      },
    },
  },
}

export const Large: Story = {
  args: {
    children: 'I am Large text',
    variant: 'large',
  },
}

export const Heading1: Story = {
  args: {
    children: 'I am Heading Level 1',
    variant: 'h1',
    as: 'h1'
  },
}

export const Heading2: Story = {
  args: {
    children: 'I am Heading Level 2',
    variant: 'h2',
    as: 'h2'
  },
}

export const Heading3: Story = {
  args: {
    children: 'I am Heading Level 3',
    variant: 'h3',
    as: 'h3'
  },
}

export const RegularText16: Story = {
  args: {
    children: 'I am 16px Regular text',
    variant: 'regular_text_16',
  },
}

export const RegularBoldText16: Story = {
  args: {
    children: 'I am 16px Regular Bold text',
    variant: 'bold_text_16',
  },
}

export const RegularText14: Story = {
  args: {
    children: 'I am 14px Regular text',
    variant: 'regular_text_14',
  },
}

export const RegularMediumText14: Story = {
  args: {
    children: 'I am 14px Regular Medium text',
    variant: 'medium_text_14',
  },
}

export const RegularBoldText14: Story = {
  args: {
    children: 'I am 14px Regular Bold text',
    variant: 'bold_text_14',
  },
}

export const SmallText: Story = {
  args: {
    children: 'I am 12px Small text',
    variant: 'small_text',
  },
}

export const SmallSemiboldText: Story = {
  args: {
    children: 'I am 12px Small Semibold text',
    variant: 'semibold_small_text',
  },
}

export const RegularLink: Story = {
  args: {
    children: 'I am 14px regular link',
    variant: 'regular_link',
    as: 'a',
    href: '/', 
    target: '_blank'
  },
}

export const SmallLink: Story = {
  args: {
    children: 'I am 12px small link',
    variant: 'small_link',
    as: 'a',
    href: '/', 
    target: '_blank'
  },
}

export const Error: Story = {
  args: {
    children: 'Oh no! I am Error',
    variant: 'error',
  },
}

export const Caption: Story = {
  args: {
    children: 'I am caption',
    variant: 'caption',
  },
}
