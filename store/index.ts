import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/store/auth/slice';
import rideReducer from '@/store/ride/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    rider: rideReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;