import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { NearbyRider, Service } from './slice';
import { Booking, Coordinates, Location } from '@/utils/models';
import { RootState } from '..';

import http from '@/api/http';

export const serviceAction = createAction<number | undefined>('data/services');
export const nearbyRidersAction = createAction<number | undefined>('data/nearbyRiders');
export const ridersForTripAction = createAction<number | undefined>('data/ridersForTrip');
export const updateLocationAction = createAction<number | undefined>('data/updateLocation');
export const myRidesAction = createAction<number | undefined>('data/myRides');

interface TripPreparationPayload {
    service: string;
    from: Location;
    to: Location;
}

export const getServices = createAsyncThunk(serviceAction.type, async (_: undefined, thunkAPI) => {
    const response = await http.get<Service[]>('/services/user');
    if (response.ok) return response.data;

    return thunkAPI.rejectWithValue(response.originalError);
});

export const getMyBookings = createAsyncThunk(myRidesAction.type, async (_: undefined, thunkAPI) => {
    const config = {
        headers: {
            'x-auth-token': (thunkAPI.getState() as RootState).auth.token
        },
    };

    const response = await http.get<Booking[]>('/ride/me', undefined, config);
    if (response.ok) return response.data;

    return thunkAPI.rejectWithValue(response.originalError);
});

export const getNearbyRiders = createAsyncThunk(nearbyRidersAction.type, async (coords: Coordinates, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    const config = {
        headers: {
            'x-auth-token': state.auth.token
        },
    };

    const payload = {
        service: state.ride.selectedService,
        coords
    };

    const response = await http.post<NearbyRider[]>('/geolocation/nearby-riders', payload, config);
    if (response.ok) return response.data;

    return thunkAPI.rejectWithValue(response.originalError);
});

export const getRidersForTrip = createAsyncThunk(ridersForTripAction.type, async (payload: TripPreparationPayload, thunkAPI) => {
    const config = {
        headers: {
            'x-auth-token': (thunkAPI.getState() as RootState).auth.token
        },
    };

    const response = await http.post<NearbyRider[]>('/geolocation/trip-preparation', payload, config);
    console.log('response', response.data)
    if (response.ok) return response.data;

    return thunkAPI.rejectWithValue(response.originalError);
});

export const updateLocation = createAsyncThunk(updateLocationAction.type, async (coords: Coordinates, thunkAPI) => {
    const config = {
        headers: {
            'x-auth-token': (thunkAPI.getState() as RootState).auth.token
        },
    };

    const response = await http.patch('/users/user/location', coords, config);
    if (response.ok) return response.data;

    return thunkAPI.rejectWithValue(response.originalError);
});




