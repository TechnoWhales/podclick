import Ring from '@/shared/components/ui/loader/ring/Ring'
import { COLORS } from '@/shared/constants'

import s from './CircleLoading.module.scss'

export const CircleLoading = () => {
  return (
    <div className={s.container}>
      <Ring size={150} color={COLORS.accent['500']} />
    </div>
  )
}
