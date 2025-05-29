type IconPropsType = {
  iconId: string
  width?: string
  height?: string
  viewBox?: string
  gradient?: string
}

const Icon = ({ iconId, height, viewBox, width }: IconPropsType) => {
  return (
    <svg
      width={width || '24'}
      height={height || '24'}
      viewBox={viewBox || '0 0 24 24'}
      fill={'none'}
      xmlns={'http://www.w3.org/2000/svg'}
    >
      <use href={`/icons-sprite.svg#${iconId}`} />
    </svg>
  )
}

export default Icon
