import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RideState {
    from: string;
    to: string;
    rider: number;
}

const initialState: RideState = {
    from: '',
    to: '',
    rider: 0
}

const authSlice = createSlice({
    name: 'ride',
    initialState,
    reducers: {
        setLocationDetails: (state, action: PayloadAction<Pick<RideState, 'from' | 'to'>>) => {
            state.from = action.payload.from;
            state.to = action.payload.to;
        },
    },
});

export const { setLocationDetails } = authSlice.actions;
export default authSlice.reducer;