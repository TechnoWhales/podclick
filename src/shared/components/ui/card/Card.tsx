import { ComponentPropsWithoutRef, ReactNode } from 'react'

import clsx from 'clsx'

import s from './Card.module.scss'

type Props = {
  children?: ReactNode
  /**
   * Максимальная высота компонента.
   * Может быть одним из стандартных значений: 'sm', 'md', 'lg'.
   *
   * - 'sm' — 72px
   * - 'md' — 96px
   * - 'lg' — 120px
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Настройка флекс-вирівнювання для компонента.
   * Определяет способ выравнивания элементов внутри flex-контейнера.
   *
   * Возможные значения:
   * - 'center' — горизонтальное центрирование (justify-content: center)
   * - 'columnCenter' — вертикальное расположение с центрированием (flex-direction: column + align-items: center)
   * - 'spaceBetween' — элементы распределены с пробелами между (justify-content: space-between)
   * - 'spaceBetweenCenter' — элементы с пробелами между и вертикальным центрированием (justify-content: space-between + align-items: center)
   */
  flex?: 'center' | 'columnCenter' | 'spaceBetween' | 'spaceBetweenCenter'
} & ComponentPropsWithoutRef<'div'>

export const Card = ({ children, size = 'md', flex, className, ...rest }: Props) => {
  const cardStyles = clsx(s.card, flex && [s.flex, s[flex]], s[size])

  return (
    <div className={clsx(cardStyles, className)} {...rest}>
      {children}
    </div>
  )
}
