import { Coordinates, Rider } from "@/utils/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RideState {
    origin: Coordinates | undefined;
    destination: Coordinates | undefined;
    from: string;
    to: string;
    rider: Rider | null;
    rideID: string;
}

const initialState: RideState = {
    destination: undefined,
    origin: undefined,
    from: '',
    to: '',
    rider: null,
    rideID: ''
}

const riderSlice = createSlice({
    name: 'ride',
    initialState,
    reducers: {
        setOrigin: (state, action: PayloadAction<Coordinates>) => {
            state.origin = action.payload;
        },
        setDestination: (state, action: PayloadAction<Coordinates>) => {
            state.destination = action.payload;
        },
        setLocationDetails: (state, action: PayloadAction<Pick<RideState, 'from' | 'to'>>) => {
            state.from = action.payload.from;
            state.to = action.payload.to;
        },
        setRider: (state, action: PayloadAction<Rider>) => {
            state.rider = action.payload;
        },
        setRideID: (state, action: PayloadAction<string>) => {
            state.rideID = action.payload;
        }
    },
});

export const { setDestination, setLocationDetails, setRider, setRideID, setOrigin } = riderSlice.actions;
export default riderSlice.reducer;