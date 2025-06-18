import { useStore } from 'react-redux'

import type { AppStore } from '@/shared/store/store'

export const useAppStore = useStore.withTypes<AppStore>()
