import { createSlice } from "@reduxjs/toolkit";
import { getMyBookings, getNearbyRiders, getRidersForTrip, getServices } from "./actions";
import { getMessageFromError } from "@/utils/lib";
import { Booking, Coordinates } from "@/utils/models";

export interface Service {
    _id: string;
    name: string;
    code: string;
    description: string;
    color: string;
    image: string;
    driver: string;
}

export interface NearbyRider {
    _id: string;
    firstName: string;
    lastName: string;
    serviceCode?: string;
    profileDisplayImage: string;
    serviceDisplayImage: string;
    timeToLocation: string;
    distanceToLocation: string;
    coordinates: Coordinates;
    rating: number;
    price: number;
}

export interface DataState {
    bookings: Booking[];
    services: Service[];
    nearbyRiders: NearbyRider[];
    isLoading: boolean;
    error: string;
}

const initialState: DataState = {
    bookings: [],
    services: [],
    nearbyRiders: [],
    isLoading: false,
    error: '',
};

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
     extraReducers: (builder) => {
        builder.addCase(getServices.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getServices.fulfilled, (state, action) => {
            state.services = action.payload!;
            state.isLoading = false;
        })
        .addCase(getServices.rejected, (state, action) => {
            state.isLoading = false;
            state.error = getMessageFromError(action.payload);
        })
        .addCase(getNearbyRiders.fulfilled, (state, action) => {
            state.nearbyRiders = action.payload!;
        })
        .addCase(getRidersForTrip.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(getRidersForTrip.fulfilled, (state, action) => {
            state.nearbyRiders = action.payload!;
            state.isLoading = false;
            state.error = '';
        })
        .addCase(getRidersForTrip.rejected, (state, action) => {
            state.isLoading = false;
            state.error = getMessageFromError(action.payload);
        })
        .addCase(getMyBookings.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(getMyBookings.fulfilled, (state, action) => {
            state.bookings = action.payload!;
            state.isLoading = false;
            state.error = '';
        })
        .addCase(getMyBookings.rejected, (state, action) => {
            state.isLoading = false;
            state.error = getMessageFromError(action.payload);
        })
    }
});

export default dataSlice.reducer;