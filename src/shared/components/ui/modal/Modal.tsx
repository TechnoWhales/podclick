import { ComponentPropsWithoutRef } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import clsx from 'clsx'

import s from './Modal.module.scss'

type ModalSize = 'lg' | 'md' | 'sm'

type Props = {
  open: boolean
  onClose: () => void
  modalTitle: string
  size?: ModalSize
} & ComponentPropsWithoutRef<'div'>

export const Modal = ({
  size = 'sm',
  modalTitle,
  onClose,
  children,
  className,
  open,
  ...rest
}: Props) => (
  <Dialog.Root open={open} onOpenChange={onClose} {...rest}>
    <Dialog.Portal>
      <Dialog.Overlay className={s.overlay} />
      <Dialog.Content className={clsx(s.content, s[size], className)}>
        <Dialog.Title className={s.title}>{modalTitle}</Dialog.Title>
        <hr />
        {children}
        <Dialog.Close asChild>
          {/* eslint-disable-next-line react/button-has-type */}
          <button className={s.iconButton} aria-label={'Close'}>
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)
