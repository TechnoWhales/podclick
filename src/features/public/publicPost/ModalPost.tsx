import * as Dialog from '@radix-ui/react-dialog'
import {ComponentPropsWithoutRef} from 'react'

import {Button, Icon} from '@/shared/components/ui'

import s from './ModalPost.module.scss'


type Props = {
    open: boolean
    onClose: () => void
    modalTitle?: string

} & ComponentPropsWithoutRef<'div'>

export const ModalPost = ({

                              modalTitle,
                              onClose,
                              children,
                              className,
                              open,
                              ...rest
                          }: Props) => (
    <Dialog.Root open={open} onOpenChange={onClose} {...rest}>
        <Dialog.Portal>
            <Dialog.Overlay className={s.overlay}/>
            <Dialog.Content className={s.content}>
                {modalTitle && <Dialog.Title

                    className={s.title}>
                    {modalTitle}

                </Dialog.Title>}
                {children}
                <Dialog.Close asChild>
                    <Button className={s.iconButton} variant={'icon'}>
                        <Icon iconId={'close'}/>
                    </Button>
                </Dialog.Close>

            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
)
