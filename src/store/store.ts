import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux'

import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { authApi } from '@/features/auth/api/authApi'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware),
})

setupListeners(store.dispatch)

type StoreType = typeof store
export type RootState = ReturnType<StoreType['getState']>
export type AppDispatch = StoreType['dispatch']
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore = () => useStore<StoreType>()
export const useAppDispatch = () => useDispatch<AppDispatch>()
