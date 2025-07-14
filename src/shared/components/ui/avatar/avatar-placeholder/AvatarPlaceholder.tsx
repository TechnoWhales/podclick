type Props = {
  size?: 204 | 48 | 36
}

export const AvatarPlaceholder = ({ size = 36 }: Props) => (
  <svg viewBox={'0 0 40 40'} width={size} height={size} xmlns={'http://www.w3.org/2000/svg'}>
    <circle cx={'20'} cy={'20'} r={'20'} fill={'#232136'} />
    <path
      d={'M20 22a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm0 3c-5 0-9 2.5-9 5v2h18v-2c0-2.5-4-5-9-5z'}
      fill={'#8a8fa3'}
    />
  </svg>
)
