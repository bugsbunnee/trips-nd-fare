import { createSlice } from "@reduxjs/toolkit";
import { getAvailableBusTickets, getAvailableLocalRiders, getBusLocations, getBusTickets, getLocalRideTypes, getLocalTripsInLocation, getMyBookings, getNearbyRiders, getRidersForTrip, getServices } from "@/src/store/data/actions";
import { getMessageFromError } from "@/src/utils/lib";
import { Booking, BusTicket, Coordinates, PickerItemModel } from "@/src/utils/models";
export interface Service {
    _id: string;
    name: string;
    code: string;
    description: string;
    color: string;
    image: string;
    driver: string;
    route: string;
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
    coordinates: Coordinates & { distance: number; };
    rating: number;
    price: number;
}

export interface BusLocations {
    origins: PickerItemModel[];
    destinations: PickerItemModel[];
}

export interface Route { 
    views: number; 
    route: string; 
    price: number;
}

export interface LocalRiderDetails {
    contactCount: number;
    phoneNumber: string;
    rideType: { _id: string; name: string; };
    rideCount: number;
    reviewCount: number;
    routes: Route[];
}

export type NearbyLocalRider = NearbyRider & LocalRiderDetails;

export interface DataState {
    popularLocations: Route[];
    localTripLocations: Route[];
    busTickets: BusTicket[];
    busLocations: BusLocations;
    localRiders: NearbyLocalRider[];
    localRidersInLocation: NearbyLocalRider[];
    bookings: Booking[];
    services: Service[];
    localRideTypes: PickerItemModel[];
    nearbyRiders: NearbyRider[];
    isLoading: boolean;
    error: string;
}

const initialState: DataState = {
    busTickets: [],
    popularLocations: [],
    localRidersInLocation: [],
    localTripLocations: [],
    busLocations: { origins: [], destinations: [] },
    localRideTypes: [],
    localRiders: [],
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
        .addCase(getBusLocations.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(getBusLocations.fulfilled, (state, action) => {
            state.busLocations = action.payload!;
            state.isLoading = false;
            state.error = '';
        })
        .addCase(getBusLocations.rejected, (state, action) => {
            state.isLoading = false;
            state.error = getMessageFromError(action.payload);
        })
        .addCase(getBusTickets.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(getBusTickets.fulfilled, (state, action) => {
            state.busTickets = action.payload!;
            state.isLoading = false;
            state.error = '';
        })
        .addCase(getBusTickets.rejected, (state, action) => {
            state.isLoading = false;
            state.error = getMessageFromError(action.payload);
        })
        .addCase(getAvailableBusTickets.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(getAvailableBusTickets.fulfilled, (state, action) => {
            state.busTickets = action.payload!;
            state.isLoading = false;
            state.error = '';
        })
        .addCase(getAvailableBusTickets.rejected, (state, action) => {
            state.isLoading = false;
            state.error = getMessageFromError(action.payload);
        })
        .addCase(getAvailableLocalRiders.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(getAvailableLocalRiders.fulfilled, (state, action) => {
            state.localRiders = action.payload!.availableRiders;
            state.popularLocations = action.payload!.popularLocations;
            state.isLoading = false;
            state.error = '';
        })
        .addCase(getAvailableLocalRiders.rejected, (state, action) => {
            state.isLoading = false;
            state.error = getMessageFromError(action.payload);
        })
        .addCase(getLocalRideTypes.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(getLocalRideTypes.fulfilled, (state, action) => {
            state.localRideTypes = action.payload!;
            state.isLoading = false;
            state.error = '';
        })
        .addCase(getLocalRideTypes.rejected, (state, action) => {
            state.isLoading = false;
            state.error = getMessageFromError(action.payload);
        })
        .addCase(getLocalTripsInLocation.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(getLocalTripsInLocation.fulfilled, (state, action) => {
            state.localRidersInLocation = action.payload!.ridersInLocation;
            state.localTripLocations = action.payload!.routeLocations;
            state.isLoading = false;
            state.error = '';
        })
        .addCase(getLocalTripsInLocation.rejected, (state, action) => {
            state.isLoading = false;
            state.error = getMessageFromError(action.payload);
        })
    }
});

export default dataSlice.reducer;