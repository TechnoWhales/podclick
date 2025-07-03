import { Cross2Icon } from "@radix-ui/react-icons";
import * as PopoverPrimitive from '@radix-ui/react-popover'
import * as React from "react";
import { ReactNode } from 'react'

import clsx from 'clsx'

import { Button } from '@/shared/components/ui'

import s from "./Popover.module.scss";

type Props = {
  // Текст или элемент, который будет отображён внутри кнопки-триггера поповера.
  // Может быть строкой (например, "Открыть") или React-элементом (например, иконкой).
  buttonText?: string | ReactNode;

  // Дочерние элементы, которые будут отображаться внутри самого поповера (его контент).
  children?: ReactNode;

  // Показывать ли иконку закрытия (крестик) внутри поповера.
  showCloseIcon?: boolean;

  // Прозрачность (opacity) как кнопки, так и самого поповера. Значение от 0 до 1.
  opacity?: number;

  // Сторона, с которой будет появляться поповер относительно кнопки (по умолчанию сверху).
  side?: 'top' | 'bottom' | 'left' | 'right';

  // Выравнивание поповера относительно кнопки: в начале, по центру или в конце.
  align?: 'start' | 'center' | 'end';

  // Отступ между кнопкой и поповером (в пикселях).
  sideOffset?: number;
};
export const Popover = ({children, buttonText, showCloseIcon, opacity = 1, sideOffset = 2, side = 'top', align = 'start'}: Props) => (
  <PopoverPrimitive.Root >
    <PopoverPrimitive.Trigger asChild >
      <Button variant={"icon"}  className={clsx(s.IconButton, typeof buttonText === 'string' && s.text)} aria-label={"Update dimensions"} style={{opacity: opacity}}>
        {buttonText}
      </Button>
    </PopoverPrimitive.Trigger>
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content className={clsx(s.Content, showCloseIcon && s.closeIcon)} sideOffset={sideOffset} side={side} align={align} style={{opacity: opacity}}>
        {children}
        {showCloseIcon && <PopoverPrimitive.Close className={s.Close} aria-label={"Close"}>
          <Cross2Icon />
        </PopoverPrimitive.Close>}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  </PopoverPrimitive.Root>
);
