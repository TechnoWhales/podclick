import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'

import type { RequestStatus } from '@/shared/types/Status'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle' as RequestStatus,
    error: null as string | null,
  },
  selectors: {
    selectAppStatus: state => state.status,
    selectAppError: state => state.error,
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
  }),
})

export const { selectAppStatus, selectAppError } = appSlice.selectors
export const { setAppStatus, setAppError } = appSlice.actions
export const appReducer = appSlice.reducer
