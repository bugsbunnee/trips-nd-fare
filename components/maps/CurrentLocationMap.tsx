import React, { useEffect, useRef } from 'react';
import MapView, { CameraZoomRange, MapMarkerProps, Marker, PROVIDER_GOOGLE } from '@/components/maps/Map';

import Conditional from '../common/Conditional';
import _ from 'lodash';

import { Platform, StyleSheet, View } from 'react-native';
import { Image, Skeleton } from '../ui';

import useLocation from '@/hooks/useLocation';

interface Props {
    markers?: MapMarkerProps[];
}

const CURRENT_USER_IDENTIFIER = 'current-user';

const cameraRangeOptions: CameraZoomRange = {
    minCenterCoordinateDistance: 400,
    animated: true
};

const CurrentLocationMap: React.FC<Props> = ({ markers = [] }) => {
    const coordinates = useLocation();
    const mapRef = useRef<MapView>(null);

    useEffect(() => {
        if (coordinates && markers.length > 0 && mapRef.current) {
            const markerIdentifiers = markers.map((marker) => marker.identifier).concat([CURRENT_USER_IDENTIFIER]) as string[];

            mapRef.current.fitToSuppliedMarkers(markerIdentifiers, {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true
            });
        }
    }, [coordinates, markers]);

    if (coordinates) {
        return ( 
            <View style={styles.container}>
                <MapView 
                    ref={mapRef}
                    provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined} 
                    style={styles.map}
                    zoomEnabled
                    initialRegion={coordinates}
                    cameraZoomRange={cameraRangeOptions}
                >
                    <Conditional visible={Platform.OS !== 'web'}>
                        {markers.length > 0 && markers.map((marker) => (
                            <Marker
                                key={marker.title}
                                identifier={marker.identifier}
                                image={require('@/assets/images/rider-map-pin.png')}
                                coordinate={marker.coordinate}
                                title={marker.title}
                                description={marker.description}
                            />
                        ))}

                        <Marker
                            coordinate={coordinates}
                            identifier={CURRENT_USER_IDENTIFIER}
                            title="You"
                            description="Your current location"
                            image={require("@/assets/images/marker.png")}
                        />
                    </Conditional>
                </MapView>
            </View>
        );
    }

    return (
        <Skeleton style={styles.skeleton}>
            <Image 
                src={require("@/assets/images/marker.png")}
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

export default CurrentLocationMap;