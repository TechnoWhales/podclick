import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ToastContainer, Zoom } from 'react-toastify'

import { Button } from '@/shared/components/ui/button/Button'
import { TextField } from '@/shared/components/ui/textfield/TextField'
import { notify } from '@/shared/lib/notify/notify'

const description = `
**ToastContainer отвечает за отображение всплывающих уведомлений (toast) на странице. <br/> 
Параметры ToastContainer можно изменять через controls**

*Пример использования:*

\`\`\`tsx
<ToastContainer
  position="bottom-left"
  autoClose={3000}
  hideProgressBar
  transition={Zoom}
  closeOnClick
  pauseOnHover
  draggable
  theme="colored"
  icon={false}
/>
\`\`\`

**Логика уведомлений находится в модуле \`notify\`**

*Пример использования:*

\`\`\`ts
notify.success('Успешно!')
notify.error('Ошибка!')
notify.info('Информация')
notify.warning('Предупреждение')
\`\`\`
      `

const meta: Meta<typeof ToastContainer> = {
  title: 'Components/Toast',
  component: ToastContainer,
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-right',
        'top-center',
        'bottom-left',
        'bottom-right',
        'bottom-center',
      ],
      defaultValue: 'bottom-left',
    },
    autoClose: {
      control: 'select',
      options: [1000, 2000, 3000, 5000, false],
      defaultValue: 3000,
    },
    hideProgressBar: { control: 'boolean', defaultValue: true },
    icon: { control: 'boolean', defaultValue: true },
    theme: { control: 'select', options: ['light', 'dark', 'colored'], defaultValue: 'colored' },
  },
} satisfies Meta<typeof ToastContainer>

export default meta
type Story = StoryObj<typeof meta>

export const AllVariants: Story = {
  args: {
    position: 'bottom-left',
    autoClose: 3000,
    hideProgressBar: true,
    icon: false,
    theme: 'colored',
  },
  render: args => {
    const [text, setText] = useState('')

    return (
      <div>
        <ToastContainer
          position={args.position}
          autoClose={args.autoClose}
          hideProgressBar={args.hideProgressBar}
          transition={Zoom}
          closeOnClick
          pauseOnHover
          draggable
          theme={args.theme}
          icon={args.icon}
        />
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
}
