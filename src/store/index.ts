import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import rateLimitReducer from './rateLimitSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    rateLimit: rateLimitReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
