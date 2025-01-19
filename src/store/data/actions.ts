import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { BusLocations, NearbyLocalRider, NearbyRider, Route, Service } from '@/src/store/data/slice';
import { Booking, BusTicket, Coordinates, Location, PickerItemModel } from '@/src/utils/models';
import { RootState } from '@/src/store';
import { AuthResponse } from '@/src/store/auth/actions';

import http from '@/src/api/http';

export const serviceAction = createAction<number | undefined>('data/services');
export const nearbyRidersAction = createAction<number | undefined>('data/nearbyRiders');
export const ridersForTripAction = createAction<number | undefined>('data/ridersForTrip');
export const updateLocationAction = createAction<number | undefined>('data/updateLocation');
export const updateDeviceAction = createAction<number | undefined>('auth/updateDevice');
export const myRidesAction = createAction<number | undefined>('data/myRides');
export const busLocationsAction = createAction<number | undefined>('data/busLocations');
export const busTicketsAction = createAction<number | undefined>('data/busTickets');
export const busAvailableTicketsAction = createAction<number | undefined>('data/busAvailableTickets');
export const localRidersAvailableAction = createAction<number | undefined>('data/localRidersAvailable');
export const localRideTypesAction = createAction<number | undefined>('data/localRideTypes');
export const localRidersInLocation = createAction<number | undefined>('data/localRidersInLocation');

interface TripPreparationPayload {
    from: Location;
    to: Location;
}

interface AvailableBusTicketsPayload {
    origin: string;
    originCity: string;
    destination: string;
    destinationCity: string;
    departureDate: string;
    returnDate?: string;
    numberOfSeats: number;
}

interface LocalRidersResponse { 
    popularLocations: Route[]; 
    availableRiders: NearbyLocalRider[];
}

interface LocalRidersPayload extends Coordinates {
    rideType?: string;
}

interface LocalRidersInLocationPayload {
    rideType?: string;
    route: string;
}

interface LocalRidersInLocationResponse {
    ridersInLocation: NearbyLocalRider[];
    routeLocations: Route[];
}

export const getLocalRideTypes = createAsyncThunk(localRideTypesAction.type, async (_: undefined, thunkAPI) => {
    const response = await http.get<PickerItemModel[]>('/local-ride-types');
    if (response.ok) return response.data;

    return thunkAPI.rejectWithValue(response.originalError);
});

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

export const getBusLocations = createAsyncThunk(busLocationsAction.type, async (_: undefined, thunkAPI) => {
    const response = await http.get<BusLocations>('/ride/bus/locations');
    if (response.ok) return response.data;

    return thunkAPI.rejectWithValue(response.originalError);
});

export const getAvailableLocalRiders = createAsyncThunk(localRidersAvailableAction.type, async (payload: LocalRidersPayload, thunkAPI) => {
    const response = await http.post<LocalRidersResponse>('/geolocation/available-riders', payload);
    console.log('result', response.data, response.config);
    if (response.ok) return response.data;

    return thunkAPI.rejectWithValue(response.originalError);
});

export const getLocalTripsInLocation = createAsyncThunk(localRidersInLocation.type, async (payload: LocalRidersInLocationPayload , thunkAPI) => {
    const response = await http.post<LocalRidersInLocationResponse>('/geolocation/local-trips/location', payload);
    if (response.ok) return response.data;

    return thunkAPI.rejectWithValue(response.originalError);
});

export const getAvailableBusTickets = createAsyncThunk(busAvailableTicketsAction.type, async (payload: AvailableBusTicketsPayload, thunkAPI) => {
    const response = await http.post<BusTicket[]>('/ride/bus/tickets/query', payload);
    if (response.ok) return response.data;

    return thunkAPI.rejectWithValue(response.originalError);
});

export const getBusTickets = createAsyncThunk(busTicketsAction.type, async (_: undefined, thunkAPI) => {
    const response = await http.get<BusTicket[]>('/ride/bus/tickets');
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

    const response = await http.post<NearbyRider[]>('/geolocation/nearby-riders', coords, config);
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

export const updateDeviceToken = createAsyncThunk(updateDeviceAction.type, async (token: string, thunkAPI) => {
    const config = {
        headers: {
            'x-auth-token': (thunkAPI.getState() as RootState).auth.token,
        },
    };

    const response = await http.patch<AuthResponse>('/users/me/token', { token }, config);
    if (response.ok) return response.data;

    return thunkAPI.rejectWithValue(response.originalError);
});


