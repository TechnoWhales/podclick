import Ring from '@/shared/components/ui/loader/ring/Ring'
import { COLORS } from '@/shared/constants'

import s from './CircleLoading.module.scss'

export const CircleLoading = ({size=150}: {size?: number}) => {
  return (
    <div className={s.container}>
      <Ring size={size} color={COLORS.accent['500']} />
    </div>
  )
}
