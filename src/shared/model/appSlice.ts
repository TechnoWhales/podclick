import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'

import type { RequestStatus } from '@/shared/types/Status'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle' as RequestStatus,
    error: null as string | null,
    isLoggedIn: false,
  },
  selectors: {
    selectAppStatus: state => state.status,
    selectAppError: state => state.error,
    selectIsLoggedIn: state => state.isLoggedIn,
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
    setAppStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    setAppErrorAC: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
    setIsLoggedInAC: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
  }),
})

export const { selectAppStatus, selectAppError, selectIsLoggedIn } = appSlice.selectors
export const { setAppStatusAC, setAppErrorAC, setIsLoggedInAC } = appSlice.actions
export const appReducer = appSlice.reducer
