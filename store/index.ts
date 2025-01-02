import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/store/auth/slice';
import bookingReducer from '@/store/booking/slice';
import dataReducer from '@/store/data/slice';
import rideReducer from '@/store/ride/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer,
    data: dataReducer,
    ride: rideReducer,
  },
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;