import React, { useCallback, useRef } from 'react';
import MapViewDirections from 'react-native-maps-directions';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Platform, StyleSheet, View } from 'react-native';

import _ from 'lodash';

import { colors } from '@/constants';
import { Location } from '@/utils/models';
import { getCoords } from '@/utils/lib';

interface Props {
    origin: Location;
    destination: Location;
}

const RouteMap: React.FC<Props> = ({ origin, destination }) => {
    const mapRef = useRef<MapView>(null);

    const handleFocusMap = useCallback(() => {
        if (origin && destination && mapRef.current) {
            mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true
            });
        }
    }, [origin, destination]);

    return ( 
        <View style={styles.container}>
            <MapView 
                provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined} 
                style={styles.map}
                zoomEnabled
                ref={mapRef}
                initialRegion={getCoords({
                    address: origin.address,
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                    accuracy: 10,
                    speed: null,
                    altitude: null,
                    altitudeAccuracy: null,
                    heading: null
                })}
            >
                <Marker
                    identifier="origin"
                    coordinate={origin}
                    title="origin"
                    description="Take-off point"
                />

                <Marker
                    identifier="destination"
                    coordinate={destination}
                    title="destination"
                    description="Drop-off point"
                />

                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY as string}
                    strokeWidth={5}
                    strokeColor={colors.light.route}
                    onReady={() => handleFocusMap()}
                />
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

export default RouteMap;