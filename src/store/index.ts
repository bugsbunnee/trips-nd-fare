import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/src/store/auth/slice';
import bookingReducer from '@/src/store/booking/slice';
import dataReducer from '@/src/store/data/slice';
import rideReducer from '@/src/store/ride/slice';

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