import { useSelector } from 'react-redux'

import type { RootState } from '@/shared/store/store'

export const useAppSelector = useSelector.withTypes<RootState>()
