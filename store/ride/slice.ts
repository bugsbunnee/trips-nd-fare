import { Rider } from "@/utils/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RideState {
    from: string;
    to: string;
    rider: Rider | null;
    rideID: string;
}

const initialState: RideState = {
    from: '',
    to: '',
    rider: null,
    rideID: ''
}

const authSlice = createSlice({
    name: 'ride',
    initialState,
    reducers: {
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

export const { setLocationDetails, setRider, setRideID } = authSlice.actions;
export default authSlice.reducer;