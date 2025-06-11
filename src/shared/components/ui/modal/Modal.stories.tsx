import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Button } from '@/shared/components/ui'

import { Modal } from './Modal'

const meta: Meta<typeof Modal> = {
  title: 'Modal',
  component: Modal,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Modal>

const ModalWrapper = ({
  modalTitle,
  size = 'sm',
}: {
  modalTitle: string
  size?: 'sm' | 'md' | 'lg'
}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} modalTitle={modalTitle} size={size}>
        <div style={{ padding: '1rem' }}>
          <p>This is the modal content.</p>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </div>
      </Modal>
    </>
  )
}

export const Small: Story = {
  render: () => <ModalWrapper modalTitle={'Small Modal'} size={'sm'} />,
}

export const Medium: Story = {
  render: () => <ModalWrapper modalTitle={'Medium Modal'} size={'md'} />,
}

export const Large: Story = {
  render: () => <ModalWrapper modalTitle={'Large Modal'} size={'lg'} />,
}
