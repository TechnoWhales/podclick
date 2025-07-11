import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'

import type { RequestStatus } from '@/shared/types/Status'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle' as RequestStatus,
    error: null as string | null,
    isAuth: false,
    isInitialized: false,
    isLogoutModalOpen: false,
  },
  selectors: {
    selectAppStatus: state => state.status,
    selectAppError: state => state.error,
    selectAppIsAuth: state => state.isAuth,
    selectIsInitialized: state => state.isInitialized,
    selectIsLogoutModalOpen: state => state.isLogoutModalOpen,
  },
  extraReducers: builder => {
    builder
      .addMatcher(isPending, state => {
        state.status = 'loading'
      })
      .addMatcher(isFulfilled, state => {
        state.status = 'succeeded'
      })
      .addMatcher(isRejected, state => {
        state.status = 'failed'
      })
  },
  reducers: create => ({
    setAppStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    setAppError: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isAuth = action.payload.isLoggedIn
    }),
    setIsInitialized: create.reducer<{ isInitialized: boolean }>((state, action) => {
      state.isInitialized = action.payload.isInitialized
    }),
    openLogoutModal: state => {
      state.isLogoutModalOpen = true
    },
    closeLogoutModal: state => {
      state.isLogoutModalOpen = false
    },
  }),
})

export const {
  selectAppStatus,
  selectAppError,
  selectAppIsAuth,
  selectIsInitialized,
  selectIsLogoutModalOpen,
} = appSlice.selectors
export const {
  setAppStatus,
  setAppError,
  setIsLoggedIn,
  setIsInitialized,
  closeLogoutModal,
  openLogoutModal,
} = appSlice.actions
export const appReducer = appSlice.reducer
