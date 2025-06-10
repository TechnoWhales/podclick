import { IconsId } from '@/shared/types/Icons'

type IconProps = {
  iconId: IconsId
  fill?: string
  width?: string
  height?: string
  viewBox?: string
  gradient?: string
}

export const Icon = ({ iconId, fill, height, viewBox, width }: IconProps) => {
  return (
    <svg
      width={width || '24'}
      height={height || '24'}
      viewBox={viewBox || '0 0 24 24'}
      fill={fill || 'none'}
      xmlns={'http://www.w3.org/2000/svg'}
    >
      <use href={`/icons-sprite.svg#${iconId}`} />
    </svg>
  )
}
