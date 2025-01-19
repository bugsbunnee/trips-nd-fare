import { Booking, Location, PickerItemModel, RideDetails } from "@/src/utils/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { bookBusRide, bookCarRide, trackRide } from "@/src/store/ride/actions";
import { getMessageFromError } from "@/src/utils/lib";

interface RideState {
    error: string;
    isLoading: boolean;
    from: Location | null;
    to: Location | null;
    rider: string;
    booking: Booking | null;
    selectedRoute: PickerItemModel | null;
    selectedRideType: string;
    rideDetails: RideDetails | null;
}

const initialState: RideState = {
    isLoading: false,
    error: '',
    from: null,
    to: null,
    rider: '',
    booking: null,
    selectedRoute: null,
    selectedRideType: '',
    rideDetails: null,
};

const riderSlice = createSlice({
    name: 'ride',
    initialState,
    reducers: {
        setLocationFrom: (state, action: PayloadAction<Location>) => {
            state.from = action.payload;
        },
        setLocationTo: (state, action: PayloadAction<Location>) => {
            state.to = action.payload;
        },
        setLocationDetails: (state, action: PayloadAction<Pick<RideState, 'from' | 'to'>>) => {
            state.from = action.payload.from;
            state.to = action.payload.to;
        },
        setRider: (state, action: PayloadAction<string>) => {
            state.rider = action.payload;
        },
        setSelectedRoute: (state, action: PayloadAction<PickerItemModel | null>) => {
            state.selectedRoute = action.payload;
        },
        setSelectedRideType: (state, action: PayloadAction<string>) => {
            state.selectedRideType = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(bookCarRide.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(bookCarRide.fulfilled, (state, action) => {
            state.booking = action.payload!;
            state.isLoading = false;
        })
        .addCase(bookCarRide.rejected, (state, action) => {
            state.isLoading = false;
            state.error = getMessageFromError(action.payload);
        })
        .addCase(bookBusRide.fulfilled, (state, action) => {
            state.booking = action.payload!;
        })
        builder.addCase(trackRide.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(trackRide.fulfilled, (state, action) => {
            state.rideDetails = action.payload!;
            state.isLoading = false;
        })
        .addCase(trackRide.rejected, (state, action) => {
            state.isLoading = false;
            state.error = getMessageFromError(action.payload);
        })
    },
});

export const { setSelectedRoute, setSelectedRideType, setLocationDetails, setLocationFrom, setLocationTo, setRider } = riderSlice.actions;
export default riderSlice.reducer;