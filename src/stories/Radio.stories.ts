// src/stories/Radio.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from '../common/components/radio/Radio';
import React from 'react';

// Определим типы для компонентов
type RadioGroupProps = {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
};

type RadioItemProps = {
  id: string;
  value: string;
  label?: string;
  disabled?: boolean;
  className?: string;
};

const meta: Meta<typeof Radio.Group> = {
  title: 'Components/Radio',
  component: Radio.Group,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      control: 'text',
    },
    onValueChange: { action: 'changed' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'option1',
    onValueChange: (value: string) => console.log(value),
  },
  render: (args: RadioGroupProps) => (
    <Radio.Group {...args}>
      <Radio.Item id="radio-1" value="option1" label="Option 1" />
      <Radio.Item id="radio-2" value="option2" label="Option 2" />
      <Radio.Item id="radio-3" value="option3" label="Option 3" />
    </Radio.Group>
  ),
};
