import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Button } from '@/shared/components/ui/button/Button'
import { TextField } from '@/shared/components/ui/textfield/TextField'
import { notify } from '@/shared/lib/notify/notify'

import { ToastProvider } from './Toast'

const meta: Meta<typeof ToastProvider> = {
  title: 'Components/Toast',
  component: ToastProvider,
} satisfies Meta<typeof ToastProvider>

export default meta
type Story = StoryObj<typeof meta>

export const ToastsDemo: Story = {
  render: () => {
    const [text, setText] = useState('')

    return (
      <div>
        <ToastProvider />
        <div style={{ backgroundColor: '#0d0d0d', padding: '10px' }}>
          <TextField
            type={'text'}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={'Enter toast text'}
            style={{ padding: 8, minWidth: 200 }}
          />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16, marginBottom: 16 }}>
          <Button
            onClick={() => notify.success(text || 'Успешно!')}
            style={{ backgroundColor: 'var(--color-success-500)' }}
          >
            Show Success
          </Button>
          <Button
            onClick={() => notify.error(text || 'Ошибка!')}
            style={{ backgroundColor: 'var(--color-danger-500)' }}
          >
            Show Error
          </Button>
          <Button
            onClick={() => notify.info(text || 'Информация')}
            style={{ backgroundColor: 'var(--color-accent-500)' }}
          >
            Show Info
          </Button>
          <Button
            onClick={() => notify.warning(text || 'Предупреждение')}
            style={{ backgroundColor: 'var(--color-warning-500)' }}
          >
            Show Warning
          </Button>
        </div>
      </div>
    )
  },

  parameters: {
    docs: {
      description: {
        story: `
            **Логика уведомлений находится в модуле \`notify\`**

            **Пример использования:**
            \`\`\`ts
            notify.success('Успешно!')
            notify.error('Ошибка!')
            notify.info('Информация')
            notify.warning('Предупреждение')
            \`\`\`
        `,
      },
    },
  },
}
