import React from 'react';

import { View,  StyleSheet } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { colors, icons, styles as defaultStyles } from '@/constants';
import { useAppSelector } from '@/store/hooks';
import { Button, Image, RiderLayout, Text } from '@/components/ui';

import RouteMap from '@/components/maps/RouteMap';

const RideTrackingPage = () => {
    const rideDetails = useAppSelector((state) => state.ride);
    const insets = useSafeAreaInsets();

    const handleNavigateHome = () => {
       router.replace('/home')
    };

    return (
            <RiderLayout 
                label='Track Ride'
                Map={() => (
                    <RouteMap
                        origin={rideDetails.booking!.from}
                        destination={rideDetails.booking!.to}
                    />
                )}
            >
                <View style={[styles.contentHeader, styles.horizontalPadding]}>
                    <Text type='default-semibold' style={styles.contentTitle}>
                        Arriving in <Text type='default-semibold' style={[styles.contentTitle, styles.contentTitlePrimary]}>{rideDetails.booking!.driver.timeToLocation}</Text>
                    </Text>
                </View>

                <View style={[styles.content, styles.horizontalPadding]}>
                    <View style={styles.metadata}>
                        <View>
                            <Image 
                                src={rideDetails.booking!.driver.profileDisplayImage} 
                                alt={rideDetails.booking!.driver.firstName} 
                                style={styles.riderImage} 
                                contentFit='cover'
                            />

                            <Text type='subtitle' style={styles.name}>{rideDetails.booking!.driver.firstName}</Text>
                        </View>

                        <Image
                            src={rideDetails.booking!.driver.serviceDisplayImage}
                            alt={rideDetails.booking!.driver.lastName} 
                            style={styles.vehicleImage} 
                            contentFit='contain'
                        />
                    </View>

                    <View style={styles.location}>
                        <View style={styles.locationItem}>
                            <Octicons
                                name='paper-airplane' 
                                size={icons.SIZES.NORMAL} 
                                color={colors.light.dark} 
                            />

                            <Text type='default-semibold' style={styles.address}>{rideDetails.booking!.from.address}</Text>
                        </View>

                        <View style={styles.separator} />

                        <View style={styles.locationItem}>
                            <Octicons
                                name='location'
                                size={icons.SIZES.NORMAL} 
                                color={colors.light.dark} 
                            />

                            <Text type='default-semibold' style={styles.address}>{rideDetails.booking!.to.address}</Text>
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
    locationItem: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 16 },
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