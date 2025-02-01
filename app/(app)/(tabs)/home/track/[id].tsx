import React, { useEffect } from 'react';

import { View,  StyleSheet } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

import { colors, icons, styles as defaultStyles } from '@/src/constants';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { Button, Image, RiderLayout, Text } from '@/src/components/ui';
import { trackRide } from '@/src/store/ride/actions';

import ActivityIndicator from '@/src/components/ui/ActivityIndicator';
import RouteMap from '@/src/components/maps/RouteMap';

const RideTrackingPage = () => {
    const ride = useAppSelector((state) => state.ride);
    const insets = useSafeAreaInsets();
    const dispatch = useAppDispatch();
    const { id } = useLocalSearchParams();

    const handleNavigateHome = () => {
       router.replace('/home')
    };

    const handleFetchRide = async () => {
        await dispatch(trackRide(id.toString()));
    };

    useEffect(() => {
        const interval = setInterval(handleFetchRide, 10_000);
        return () => clearInterval(interval);
    }, [id]);

    useEffect(() => {
        handleFetchRide();
    }, [id]);

    if (!ride.rideDetails) {
        return <ActivityIndicator visible />;
    }

    return (
            <RiderLayout 
                label='Track Ride'
                Map={() => (
                    <RouteMap
                        origin={ride.rideDetails!.from!}
                        destination={ride.rideDetails!.to!}
                    />
                )}
            >
                <ActivityIndicator visible={ride.isLoading} />

                <View style={[styles.contentHeader, styles.horizontalPadding]}>
                    <Text type='default-semibold' style={styles.contentTitle}>
                        Arriving in <Text type='default-semibold' style={[styles.contentTitle, styles.contentTitlePrimary]}>{ride.rideDetails!.timeToLocationText}</Text>
                    </Text>
                </View>

                <View style={[styles.content, styles.horizontalPadding]}>
                   {ride.rideDetails && (
                        <View style={styles.metadata}>
                            <View>
                                <Image 
                                    src={ride.rideDetails.driver.profilePhoto} 
                                    alt={ride.rideDetails.driver.firstName} 
                                    style={styles.riderImage} 
                                    contentFit='cover'
                                />

                                <Text type='subtitle' style={styles.name}>{ride.rideDetails.driver.firstName}</Text>
                            </View>

                            <Image
                                src={ride.rideDetails.service.image}
                                alt={ride.rideDetails.service.name} 
                                style={styles.vehicleImage} 
                                contentFit='contain'
                            />
                        </View>
                   )}

                    <View style={styles.location}>
                        <View style={styles.locationItem}>
                            <Octicons
                                name='paper-airplane' 
                                size={icons.SIZES.NORMAL} 
                                color={colors.light.dark} 
                            />

                            <Text type='default-semibold' style={styles.address}>{ride.rideDetails.from.address}</Text>
                        </View>

                        <View style={styles.separator} />

                        <View style={styles.locationItem}>
                            <Octicons
                                name='location'
                                size={icons.SIZES.NORMAL} 
                                color={colors.light.dark} 
                            />

                            <Text type='default-semibold' style={styles.address}>{ride.rideDetails.to.address}</Text>
                        </View>
                    </View>
                </View>

                <View style={[{ paddingBottom: insets.bottom + 10 }, styles.horizontalPadding]}>
                    <Button label='Back Home' onPress={handleNavigateHome} />
                </View>
            </RiderLayout>
    );
};

const styles = StyleSheet.create({
    address: { color: colors.light.dark, fontSize: 15, lineHeight: 20, flex: 1 },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: colors.light.modalOpaque,
    },
    content: { flex: 1, borderTopWidth: 1, borderTopColor: colors.light.grayLight, marginTop: 24, paddingVertical: 24, },
    contentContainer: {
        flex: 1,
        paddingVertical: 24,
        paddingHorizontal: 16,
        backgroundColor: colors.light.white
    },
    contentHeader: { flexDirection: 'row', alignItems: 'center' },
    contentTitle: { fontSize: 20, color: colors.light.dark, flex: 1 },
    contentTitlePrimary: { color: colors.light.primary },
    horizontalPadding: { paddingHorizontal: 16 },
    location: { marginTop: 20 },
    locationItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 16 },
    metadata: { paddingVertical: 16, paddingHorizontal: 24, borderRadius: 16, backgroundColor: colors.light.primaryLight, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    metadataRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.light.white },
    metadataLabel: { color: colors.light.dark, fontSize: 17, lineHeight: 24, textTransform: 'capitalize' },
    name: { fontSize: 15, lineHeight: 20, marginTop: 8, textAlign: 'center' },
    riderDetails: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 12 },
    riderImage: { width: 100, height: 100, borderRadius: 100 },
    separator: { height: 1, backgroundColor: colors.light.grayLight, width: '100%' },
    vehicleImage: { width: 128, height: 72 },
});

export default RideTrackingPage;