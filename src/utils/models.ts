import { NearbyRider, Route, Service } from "@/src/store/data/slice";
import { ImageSource } from "expo-image";
import { ImageURISource } from "react-native";

export interface AuthUser {
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    sessionId: string;
}

export interface Booking {
    _id: string;
    driver: NearbyRider;
    user: string;
    price: number;
    rideStatus: string;
    paymentStatus: string;
    bookedSeats: number[];
    createdAt: string;
    departureDate: Date;
    from: Location;
    to: Location;
}

export interface BusTicket {
    details: {
        ticketId: string;
        logo: string;
        price: number;
        departureDate: string;
        departureTime: string;
        returnDate: string;
        returnTime: string;
        arrivalTime: string;
        seatCount: number;
        barcode: string;
        bookedSeats: number[];
        location: {
            timeToLocationText: string;
            distanceToLocation: string;
            timeToLocationInSeconds: number;
        },
        coordinates: Location[];
    },
    origin: string;
    originCity: string;
    destination: string;
    destinationCity: string;
}

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface Destination {
    id: number;
    image: ImageSource;
    label: string;
    minimumCost: number;
}

export interface Location extends Coordinates {
    address: string;
}

export interface CoordinatesDelta extends Location {
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface Geolocation {
    timeToLocationText: string;
    distanceToLocation: string;
    timeToLocationInSeconds: number;
}

export interface Notification {
    _id: string;
    title: string;
    body: string;
    isRead: boolean;
    createdAt: string;
}

export interface OnboardingSlide {
    title: string;
    description: string;
    image: ImageURISource;
    coloredText?: string;
}

export interface User {
    _id: string;
    city: string;
    email: string;
    emailVerifiedAt: Date | null;
    firstName: string;
    isEmailVerified: boolean;
    lastName: string;
    phoneNumber: string;
    profilePhoto?: string;
    isVirtualAccountPending: boolean;
}

export interface Wallet {
    _id: string;
    is_viewed: boolean;
    customer_code: string;

    bank_name: string;
    bank_slug: string;
    bank_id: number;
    
    status: 'success' | 'failed';
    active: boolean;
    account_name: string;
    account_number: string;
    currency: string;
    created_at: string;
        
    expired: boolean;
    expired_at: string | null;
}

export interface PickerItemModel {
    label: string; 
    value: string;
}

export interface RideDetails  extends Geolocation {
    _id: string;
    from: Location;
    to: Location;
    service: Service;
    driver: {
        firstName: string;
        lastName: string;
        profilePhoto: string;
        coordinates: Location;
    }
}

export interface Ticket {
    location: string;
    destination: string;
    departureDate: Date | string;
    arrivalDate: Date | string,
    company: ImageSource;
    amount: number;
}

export interface Transaction {
    id: number;
    amount: number;
    status: 'success' | 'failed' | 'pending';
    description: string;
    date: string | number | Date;
    transactionType: 'deposit' | 'withdrawal';
}

