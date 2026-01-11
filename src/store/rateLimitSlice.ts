import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type RateLimitState = {
  limit: number;
  remaining: number;
};

const initialState: RateLimitState = {
  limit: 0,
  remaining: 0,
};

const rateLimitSlice = createSlice({
  name: 'rateLimit',
  initialState,
  reducers: {
    setRateLimit(state, action: PayloadAction<RateLimitState>) {
      state.limit = action.payload.limit;
      state.remaining = action.payload.remaining;
    },
  },
});

export const { setRateLimit } = rateLimitSlice.actions;
export default rateLimitSlice.reducer;
