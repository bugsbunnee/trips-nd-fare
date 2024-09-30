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
