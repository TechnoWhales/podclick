import clsx from 'clsx'
import Image from 'next/image'

import s from './CoverPlacehoder.module.scss'

type Props = {
  width?: number
  height?: number
  circle?: boolean
  className?: string
}

export const CoverPlaceholder = ({width=222, height=228, circle=false, className=''}: Props) => {
  return (
    <Image
        className={clsx(s.img, className, { [s.circle]: circle })}
        src={'/empty-photo.svg'}
        alt={'Empty photo'}
        width={width}
        height={height}
    />
  )
}