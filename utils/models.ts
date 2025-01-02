import { NearbyRider } from "@/store/data/slice";
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
    createdAt: string;
    from: Location;
    to: Location;
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
}

export interface UserRide {
    id: string;
    carSeats: number;
    date: string;
    driverName: string;
    status: 'paid' | 'pending';
    toAddress: string;
    fromAddress: string;
    price: number;
    type: 'jetty' | 'bus' | 'bike' | 'train' | 'ferry' | 'car'
}

export interface Rider {
    id: string | number;
    uri: string;
    name: string;
    rating: number;
    price: number;
    timeToLocation: string;
    numberOfSeats: number;
    type: UserRide['type'];
    coordinates: Coordinates;
}

export interface PickerItemModel {
    label: string; 
    value: string;
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

