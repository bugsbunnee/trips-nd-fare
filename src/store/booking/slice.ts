import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { bookBusRide } from "@/src/store/ride/actions";
import { Booking, BusTicket } from "@/src/utils/models";

interface BookingState {
    isBooking: boolean;
    bookingType: number;
    selectedTicket: BusTicket | null;
    receipt: Booking | null;
}

const initialState: BookingState = {
    isBooking: false,
    bookingType: 0,
    selectedTicket: null,
    receipt: null,
};

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setBookingType: (state, action: PayloadAction<number>) => {
            state.bookingType = action.payload;
        },
        setSelectedTicket: (state, action: PayloadAction<BusTicket | null>) => {
            state.selectedTicket = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(bookBusRide.pending, (state) => {
            state.isBooking = true;
        })
        .addCase(bookBusRide.fulfilled, (state, action) => {
            state.isBooking = false;
            state.receipt = action.payload!;
        })
        .addCase(bookBusRide.rejected, (state) => {
            state.isBooking = false;
        })
    }
});

export const { setBookingType, setSelectedTicket } = bookingSlice.actions;
export default bookingSlice.reducer;