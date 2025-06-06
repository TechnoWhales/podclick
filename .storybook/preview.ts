import type { Preview } from '@storybook/react'
import '@/shared/styles/index.scss'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: 'var(--color-dark-900)',
        },
        {
          name: 'gray',
          value: 'var(--color-dark-100)',
        },
        {
          name: 'light',
          value: 'var(--color-light-100)',
        },
      ],
    },
  },
};

export default preview;