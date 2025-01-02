import { Booking, Location } from "@/utils/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { bookRide } from "./actions";
import { getMessageFromError } from "@/utils/lib";

interface RideState {
    error: string;
    isLoading: boolean;
    selectedService: string;
    from: Location | null;
    to: Location | null;
    rider: string;
    booking: Booking | null;
}

const initialState: RideState = {
    isLoading: false,
    error: '',
    selectedService: '',
    from: null,
    to: null,
    rider: '',
    booking: null,
};

const riderSlice = createSlice({
    name: 'ride',
    initialState,
    reducers: {
        setSelectedService: (state, action: PayloadAction<string>) => {
            state.selectedService = action.payload;
        },
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(bookRide.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(bookRide.fulfilled, (state, action) => {
            state.booking = action.payload!;
            state.isLoading = false;
        })
        .addCase(bookRide.rejected, (state, action) => {
            state.isLoading = false;
            state.error = getMessageFromError(action.payload);
        })
    },
});

export const { setLocationDetails, setLocationFrom, setLocationTo, setRider, setSelectedService } = riderSlice.actions;
export default riderSlice.reducer;