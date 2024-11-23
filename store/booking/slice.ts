import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Booking {
    location: string;
    destination: string;
    departureDate: string;
    numberOfSeats: number;
    bookingType: number;
}

interface BookingState {
    selectedSeat: number;
    booking: Booking;
}

const initialState: BookingState = {
    selectedSeat: 0,
    booking: {
        location: '',
        destination: '',
        departureDate: '',
        numberOfSeats: 0,
        bookingType: 1
    }
}

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setSelectedSeat: (state, action: PayloadAction<number>) => {
            state.selectedSeat = action.payload;
        },
        setBookingType: (state, action: PayloadAction<Booking['bookingType']>) => {
            state.booking.bookingType = action.payload;
        },
        setBooking: (state, action: PayloadAction<Omit<Booking, 'bookingType'>>) => {
            state.booking = { 
                bookingType: state.booking.bookingType,
                location: action.payload.location,
                destination: action.payload.destination,
                departureDate: action.payload.departureDate,
                numberOfSeats: action.payload.numberOfSeats,
            }
        },
    },
});

export const { setBooking, setBookingType, setSelectedSeat } = bookingSlice.actions;
export default bookingSlice.reducer;