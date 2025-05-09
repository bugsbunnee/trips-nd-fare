import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Channel, DefaultGenerics, StreamChat } from "stream-chat";
import { MessageType } from "stream-chat-expo";

import { createVirtualAccount, getAvailableBusTickets, getAvailableLocalRiders, getBusLocations, getBusTickets, getLocalRideTypes, getLocalTripsInLocation, getMyBookings, getNearbyRiders, getNotifications, getRidersForTrip, getServices, getUpcomingRides, updateNotification, updateVirtualAccount } from "@/src/store/data/actions";
import { getMessageFromError } from "@/src/utils/lib";
import { Booking, BusTicket, Coordinates, Notification, PickerItemModel } from "@/src/utils/models";
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

export interface UpcomingRide {
    _id: string;
    name: string; 
    code: string;
    totalRides: number;
    totalRevenue: number;
    rides: Booking[];
}

export interface LocalRiderDetails {
    contactCount: number;
    phoneNumber: string;
    rideType: { _id: string; name: string; };
    rideCount: number;
    reviewCount: number;
    routes: Route[];
}

export interface Notifications {
    hasUnread: boolean;
    list: Notification[];
}

export type NearbyLocalRider = NearbyRider & LocalRiderDetails;

export interface DataState {
    client: StreamChat<DefaultGenerics> | null;
    channel: Channel | null;
    thread: MessageType | null;
    upcomingRides: UpcomingRide[];
    notifications: Notifications;
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
    client: null,
    channel: null,
    thread: null,
    upcomingRides: [],
    busTickets: [],
    notifications: { hasUnread: false, list: [] },
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
    reducers: {
        setClient: (state, action: PayloadAction<StreamChat<DefaultGenerics> | null>) => {
            state.client = action.payload;
        },
        setChannel: (state, action: PayloadAction<Channel | null>) => {
            state.channel = action.payload;
        },
        setThread: (state, action: PayloadAction<MessageType | null>) => {
            state.thread = action.payload;
        },
    },
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
        .addCase(getUpcomingRides.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(getUpcomingRides.fulfilled, (state, action) => {
            state.upcomingRides = action.payload!;
            state.isLoading = false;
            state.error = '';
        })
        .addCase(getUpcomingRides.rejected, (state, action) => {
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
        .addCase(getNotifications.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(getNotifications.fulfilled, (state, action) => {
            state.notifications = action.payload!;
            state.isLoading = false;
            state.error = '';
        })
        .addCase(updateNotification.fulfilled, (state, action) => {
            state.notifications.list = state.notifications.list.map((notification) => {
                if (notification._id === action.meta.arg) {
                    return { ...notification, isRead: true };
                } 

                return notification;
            });
        })
        .addCase(updateNotification.rejected, (state, action) => {
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
        .addCase(createVirtualAccount.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(createVirtualAccount.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = '';
        })
        .addCase(createVirtualAccount.rejected, (state, action) => {
            state.isLoading = false;
            state.error = getMessageFromError(action.payload);
        })
        .addCase(updateVirtualAccount.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(updateVirtualAccount.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = '';
        })
        .addCase(updateVirtualAccount.rejected, (state, action) => {
            state.isLoading = false;
            state.error = getMessageFromError(action.payload);
        })
    }
});

export const { setClient, setChannel, setThread } = dataSlice.actions;

export default dataSlice.reducer;