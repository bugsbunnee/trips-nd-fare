
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Booking, Location, RideDetails } from '@/utils/models';
import { RootState } from '..';

import http from '@/api/http';

export const bookCarRideAction = createAction<number | undefined>('data/bookCarRide');
export const bookBusRideAction = createAction<number | undefined>('data/bookBusRide');
export const trackRideAction = createAction<number | undefined>('data/trackRide');

interface CarRideBooking {
    driver: string;
    from: Location;
    to: Location;
}

interface BusRideBooking {
    ticketId: string;
    seatNumbers: number[];
    departureDate: string; 
    departureTime: string;
}

export const bookCarRide = createAsyncThunk(bookCarRideAction.type, async (payload: CarRideBooking, thunkAPI) => {
    const config = {
        headers: {
            'x-auth-token': (thunkAPI.getState() as RootState).auth.token
        },
    };

    const response = await http.post<Booking>('/ride/car', payload, config);
    if (response.ok) return response.data;

    return thunkAPI.rejectWithValue(response.originalError);
});

export const bookBusRide = createAsyncThunk(bookBusRideAction.type, async (payload: BusRideBooking, thunkAPI) => {
    const config = {
        headers: {
            'x-auth-token': (thunkAPI.getState() as RootState).auth.token
        },
    };

    const response = await http.post<Booking>('/ride/bus', payload, config);
    if (response.ok) return response.data;

    return thunkAPI.rejectWithValue(response.originalError);
});

export const trackRide = createAsyncThunk(trackRideAction.type, async (rideId: string, thunkAPI) => {
    const config = {
        headers: {
            'x-auth-token': (thunkAPI.getState() as RootState).auth.token
        },
    };

    const response = await http.get<RideDetails>('/ride/track/' + rideId, {}, config);
    if (response.ok) return response.data;

    return thunkAPI.rejectWithValue(response.originalError);
});
