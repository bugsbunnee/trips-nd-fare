import React, { useCallback, useRef } from 'react';
import MapView, { MapViewDirections, Marker, PROVIDER_GOOGLE } from '@/src/components/maps/Map';
import { Platform, StyleSheet, View } from 'react-native';

import _ from 'lodash';
import Conditional from '@/src/components/common/Conditional';

import { colors } from '@/src/constants';
import { Location } from '@/src/utils/models';
import { getCoords } from '@/src/utils/lib';

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
                <Conditional visible={Platform.OS !== 'web'}>
                    <Marker
                        identifier="origin"
                        coordinate={origin}
                        title="Take-off point"
                        description={origin.address ? origin.address : 'Origin'}
                    />

                    <Marker
                        identifier="destination"
                        coordinate={destination}
                        title="Drop-off point"
                        description={destination.address ? destination.address : 'Destination'}
                    />

                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY as string}
                        strokeWidth={5}
                        strokeColor={colors.light.route}
                        onReady={() => handleFocusMap()}
                    />
                </Conditional>
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