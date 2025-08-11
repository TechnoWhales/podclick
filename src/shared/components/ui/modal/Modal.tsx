import * as Dialog from '@radix-ui/react-dialog'
import { ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import { Button, Icon } from '@/shared/components/ui'

import s from './Modal.module.scss'

type ModalSize = 'lg' | 'md' | 'sm'

type Props = {
  open?: boolean
  onClose?: () => void
  modalTitle?: string
  size?: ModalSize
  padding?: string
  showCloseButton?: boolean
  modalDescription?: string
  offBackgroundAnimation?: boolean
} & ComponentPropsWithoutRef<'div'>

export const Modal = ({
  size = 'sm',
  modalTitle,
  onClose,
  children,
  className,
  open,
  modalDescription,
                        offBackgroundAnimation,
  ...rest
}: Props) => (
  <Dialog.Root open={open} onOpenChange={onClose} {...rest}>
    <Dialog.Portal>
      <Dialog.Overlay className={clsx(s.overlay, offBackgroundAnimation && s.offBackgroundAnimation)}/>
      <Dialog.Content className={clsx(s.content, s[size], className)}>
        <Dialog.Title className={clsx(s.title, !modalTitle && s.hideTitle)}>
          {modalTitle && modalTitle}
        </Dialog.Title>
        {modalTitle && (
          <>
            <hr />
            <Dialog.Close asChild>
              <Button className={s.iconButton} variant={'icon'}>
                <Icon iconId={'close'} />
              </Button>
            </Dialog.Close>
          </>
        )}
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)
