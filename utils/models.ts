import { ImageURISource } from "react-native";

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

export interface PickerItemModel {
    label: string; 
    value: string;
}