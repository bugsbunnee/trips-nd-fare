import React from 'react';
import Constants from 'expo-constants';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { MapMarkerProps, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import _ from 'lodash';

import { Platform, StyleSheet, View } from 'react-native';
import { colors } from '@/constants';

import useLocation from '@/hooks/useLocation';

interface Props {
    showCurrentLocation: boolean;
    markers: MapMarkerProps[];
}

const Map: React.FC<Props> = ({ showCurrentLocation, markers }) => {
    const coordinates = useLocation();

    return ( 
        <View style={styles.container}>
            <MapView 
                provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined} 
                style={styles.map}
                zoomEnabled
                cameraZoomRange={{
                    minCenterCoordinateDistance: 20_000,
                    animated: true
                }}
            >
                {markers.length > 0 && markers.map((marker) => (
                    <Marker
                        key={marker.title}
                        coordinate={marker.coordinate}
                        title={marker.title}
                        description={marker.description}
                    />
                ))}

                {showCurrentLocation && coordinates && (
                    <Marker
                        coordinate={coordinates}
                        title="You"
                        description="Your current location"
                    />
                )}

                {markers.length > 1 && (
                    <MapViewDirections
                        origin={markers[0].coordinate}
                        destination={markers[markers.length - 1].coordinate}
                        apikey={Constants.expoConfig!.android!.config!.googleMaps!.apiKey as string}
                        strokeWidth={5}
                        strokeColor={colors.light.danger}
                    />
                )}
            </MapView>
        </View>
    );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Map;