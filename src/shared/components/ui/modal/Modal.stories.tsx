import { useState } from 'react'

import { Modal } from '@/shared/components/ui/modal/Modal'
import { Meta } from '@storybook/react'

export default {
  title: 'Modal',
  component: Modal,
} as Meta<typeof Modal>

const commonArgs = {
  children: (
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci atque blanditiis
      consequatur corporis culpa, eligendi et excepturi fugit iure laboriosam laborum laudantium
      modi molestias odio quas rem voluptatum. Dolores?
    </p>
  ),
  open: true,
  title: 'Что то',
}

export const Open = {
  render: args => {
    const [open, setOpen] = useState(false)

    function handleModalClosed() {
      setOpen(false)
    }
    function handleModalOpened() {
      setOpen(true)
    }

    return (
      <>
        <span>
          {/* eslint-disable-next-line react/button-has-type */}
          <button onClick={handleModalOpened}>Open dialog</button>
        </span>
        <Modal {...args} open={open} onClose={handleModalClosed} />
      </>
    )
  },

  args: {
    ...commonArgs,
  },
}
