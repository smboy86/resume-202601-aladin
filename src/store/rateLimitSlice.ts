import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type RateLimitState = {
  isAuth: boolean;
  limit: number;
  remaining: number;
};

const initialState: RateLimitState = {
  isAuth: false,
  limit: 0,
  remaining: 0,
};

const rateLimitSlice = createSlice({
  name: 'rateLimit',
  initialState,
  reducers: {
    setRateLimit(state, action: PayloadAction<RateLimitState>) {
      state.isAuth = action.payload.isAuth;
      state.limit = action.payload.limit;
      state.remaining = action.payload.remaining;
    },
  },
});

export const { setRateLimit } = rateLimitSlice.actions;
export default rateLimitSlice.reducer;
