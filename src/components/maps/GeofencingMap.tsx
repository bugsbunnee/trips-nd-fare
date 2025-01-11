import React, { useCallback, useEffect, useRef } from 'react';
import MapView, { MapViewDirections, Heatmap, MapMarkerProps, Marker, PROVIDER_GOOGLE } from '@/src/components/maps/Map';

import _ from 'lodash';

import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics';
import { Platform, StyleSheet, View } from 'react-native';

import { Location } from '@/src/utils/models';
import { getCoords } from '@/src/utils/lib';
import { Image, Skeleton } from '@/src/components/ui';
import { colors } from '@/src/constants';

import useLocation from '@/src/hooks/useLocation';
import Conditional from '@/src/components/common/Conditional';

interface Props {
    origin: Location | null;
    destination: Location | null;
    markers: MapMarkerProps[];
    onDestinationChange?: (location: Location) => void;
    onOriginChange?: (coordinates: Location) => void;
}

const GeofencingMap: React.FC<Props> = ({ destination, markers, origin, onOriginChange, onDestinationChange }) => {
    const mapRef = useRef<MapView>(null);
    const coords = useLocation();

    const isAndroid = Platform.OS === 'android';

    const handleFitToRoute = useCallback(() => {
        if (origin && destination && mapRef.current) {
            mapRef.current.fitToCoordinates([origin, destination], {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true
            });
        }
    }, [origin, destination]);

    useEffect(() => {
        if (origin && mapRef.current) {
            const coordinates = markers.map((marker) => marker.coordinate).concat([origin]);

            mapRef.current.fitToCoordinates(coordinates, {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true
            });
        }
    }, [origin, markers]);

    if (origin) {
        return ( 
            <View style={styles.container}>
                <MapView 
                    ref={mapRef}
                    provider={isAndroid ? PROVIDER_GOOGLE : undefined} 
                    style={styles.map}
                    zoomEnabled
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
                        {markers.length > 0 && markers.map((marker) => (
                            <React.Fragment key={marker.identifier}>
                                <Marker
                                    key={marker.title}
                                    identifier={marker.identifier}
                                    image={require('@/src/assets/images/rider-map-pin.png')}
                                    coordinate={marker.coordinate}
                                    title={marker.title}
                                    description={marker.description}
                                />
                        
                                {coords && isAndroid && (
                                    <Heatmap
                                        opacity={0.5}
                                        radius={30}
                                        points={[coords]}
                                    />
                                )}
                            </React.Fragment>
                        ))}

                        {destination && (
                            <>
                                <MapViewDirections
                                    origin={origin}
                                    destination={destination}
                                    apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY as string}
                                    strokeWidth={5}
                                    strokeColor={colors.light.primary}
                                    onReady={() => handleFitToRoute()}
                                />
                            
                                <Marker
                                    draggable
                                    image={require('@/src/assets/images/destination-map-pin.png')}
                                    coordinate={destination}
                                    title="Suggested dropoff"
                                    onDragEnd={onDestinationChange ? (event) => {
                                        impactAsync(ImpactFeedbackStyle.Medium);
                                        onDestinationChange({
                                            latitude: event.nativeEvent.coordinate.latitude,
                                            longitude: event.nativeEvent.coordinate.longitude,
                                            address: '',
                                        });
                                    } : undefined}
                                />
                            </>
                        )}
        
                        <Marker
                            draggable
                            coordinate={origin}
                            title="Suggested pickup"
                            image={require("@/src/assets/images/marker.png")}
                            onDragEnd={onOriginChange ? (event) => {
                                impactAsync(ImpactFeedbackStyle.Medium);
                                onOriginChange({
                                    latitude: event.nativeEvent.coordinate.latitude,
                                    longitude: event.nativeEvent.coordinate.longitude,
                                    address: '',
                                });
                            } : undefined}
                        />  
                    </Conditional>
                </MapView>
            </View>
        );
    }

    return (
        <Skeleton style={styles.skeleton}>
            <Image 
                src={require("@/src/assets/images/marker.png")}
                style={styles.pin} 
            />
        </Skeleton>
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
  pin: { position: 'absolute', width: 30, height: 42, resizeMode: 'contain' },
  skeleton: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default GeofencingMap;