
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Booking, Location } from '@/utils/models';
import { RootState } from '..';

import http from '@/api/http';

export const bookRideAction = createAction<number | undefined>('data/bookRide');

interface RideBooking {
    driver: string;
    from: Location;
    to: Location;
}

export const bookRide = createAsyncThunk(bookRideAction.type, async (payload: RideBooking, thunkAPI) => {
    const config = {
        headers: {
            'x-auth-token': (thunkAPI.getState() as RootState).auth.token
        },
    };

    const response = await http.post<Booking>('/ride', payload, config);
    if (response.ok) return response.data;

    return thunkAPI.rejectWithValue(response.originalError);
});
