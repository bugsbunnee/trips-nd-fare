import React from "react";

import { Coordinates } from "@/utils/models";
import { View } from "react-native";

import MapView from "@teovilla/react-native-web-maps";

export type MapMarkerProps = {
    identifier: string;
    image: string;
    coordinate: Coordinates;
    title: string;
    description: string;
}

export type CameraZoomRange = {
    minCenterCoordinateDistance?: number;
    maxCenterCoordinateDistance?: number;
    animated?: boolean;
};

export const Heatmap = () => <View />;
export const Marker = () => <View />;
export const MapViewDirections = () => <View />;
export const PROVIDER_GOOGLE = 'google';

export default MapView;

