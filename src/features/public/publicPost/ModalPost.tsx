import * as Dialog from '@radix-ui/react-dialog'
import {VisuallyHidden} from '@radix-ui/react-visually-hidden';
import {ComponentPropsWithoutRef} from 'react'

import {Button, Icon} from '@/shared/components/ui'

import s from './ModalPost.module.scss'


type Props = {
    open: boolean
    onClose: () => void
    modalTitle: string
    isShowTitle?: boolean

} & ComponentPropsWithoutRef<'div'>

export const ModalPost = ({

                              modalTitle,
                              isShowTitle = true,
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
                { isShowTitle ? <Dialog.Title
                    className={s.title}>
                    {modalTitle}

                </Dialog.Title>
                    : <VisuallyHidden>
                    <Dialog.Title className={s.title}>
                        {modalTitle}
                    </Dialog.Title>
                </VisuallyHidden> }
               {/* {modalTitle && <Dialog.Title

                    className={s.title}>
                    {modalTitle}

                </Dialog.Title>}*/}
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
