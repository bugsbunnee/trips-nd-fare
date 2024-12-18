import { ImageSource } from "expo-image";
import { ImageURISource } from "react-native";

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

export interface OnboardingSlide {
    title: string;
    description: string;
    image: ImageURISource;
    coloredText?: string;
}

export interface User {
    accountType: 'driver' | 'customer';
    name: string;
    email: string;
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
    departureDate: Date | string,
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