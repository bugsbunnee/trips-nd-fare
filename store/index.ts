import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/store/auth/slice';
import rideReducer from '@/store/ride/slice';
import bookingReducer from '@/store/booking/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer,
    ride: rideReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;