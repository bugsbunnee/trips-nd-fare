import React, { useMemo } from 'react';

import { View,  StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { colors, icons, styles as defaultStyles } from '@/src/constants';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { bookCarRide } from '@/src/store/ride/actions';
import { formatAmount, getFieldErrorsFromError } from '@/src/utils/lib';
import { Button, Image, RiderLayout, Text } from '@/src/components/ui';
import { FormError } from '@/src/components/forms';

import ActivityIndicator from '@/src/components/ui/ActivityIndicator';
import RouteMap from '@/src/components/maps/RouteMap';

interface ApiErrorResponse {
    driver?: [string];
    from?: [string];
    to?: [string];
}

const RideInformationPage: React.FC = () => {
    const auth = useAppSelector((state) => state.auth);
    const data = useAppSelector((state) => state.data);
    const rideDetails = useAppSelector((state) => state.ride);

    const insets = useSafeAreaInsets();
    const dispatch = useAppDispatch();

    const rider = useMemo(() => {
        return data.nearbyRiders.find((rider) => rider._id === rideDetails.rider);
    }, [data.nearbyRiders, rideDetails.rider]);

    const handleChatUpDriver = async () => {
        if (data.client) {
            try {
                const channel = data.client.channel("messaging", {
                    members: [auth.user!._id, rider!._id],
                    name: "New Car Ride Request with " + rider!.firstName,
                });
        
                await channel.create();
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleBookRide = async () => {
        const payload = {
            driver: rider!._id,
            from: rideDetails.from!,
            to: rideDetails.to!
        };

        try {
            await dispatch(bookCarRide(payload)).unwrap();
            await handleChatUpDriver();

            router.dismissTo('/home/track');
        } catch (error) {
            console.log('error', error);
            const fieldErrors = getFieldErrorsFromError(error) as ApiErrorResponse | undefined;
            if (!fieldErrors) return;

            const actualError = fieldErrors.driver || fieldErrors.from || fieldErrors.to;
            if (actualError) return Alert.alert('Error', actualError[0]);
        }
    };

    return (
        <RiderLayout 
            label='Choose a Rider'
            Map={() => (
                <RouteMap
                    origin={rideDetails.from!}
                    destination={rideDetails.to!}
                />
            )}
        >
            <ActivityIndicator visible={rideDetails.isLoading} />
            
            <FormError error={rideDetails.error} />

            <View style={styles.header}>
                <Text type="default-semibold" style={styles.title}>Ride Information</Text>

                <TouchableOpacity onPress={() => router.back()}>
                    <MaterialCommunityIcons name='close' size={icons.SIZES.NORMAL} color={colors.light.gray} />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <View style={styles.riderDetailsContainer}>
                    <Image src={rider!.profileDisplayImage} contentFit='cover' alt={rider!.firstName} style={styles.riderImage} />

                    <View style={styles.riderDetails}>
                        <Text type='subtitle'>{rider!.firstName}</Text>

                        <View style={styles.ratingContainer}>
                            <MaterialCommunityIcons name='star' color={colors.light.primary} size={icons.SIZES.NORMAL} />
                            <Text type='default-semibold' style={styles.rating}>{rider!.rating}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.metadata}>
                    <View style={[styles.metadataRow, { paddingTop: 0 }]}>
                        <Text type='default' style={styles.metadataLabel}>Ride Price</Text>
                        <Text type='default-semibold' style={[styles.metadataLabel, { color: colors.light.primary }]}>{formatAmount(rider!.price)}</Text>
                    </View>
                    <View style={styles.metadataRow}>
                        <Text type='default' style={styles.metadataLabel}>Pickup Time</Text>
                        <Text type='default-semibold' style={styles.metadataLabel}>{rider!.timeToLocation}</Text>
                    </View>
                    <View style={[styles.metadataRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
                        <Text type='default' style={styles.metadataLabel}>Car seats</Text>
                        <Text type='default-semibold' style={styles.metadataLabel}>5</Text>
                    </View>
                </View>

                <View style={styles.location}>
                    <View style={styles.locationItem}>
                        <Octicons
                            name='paper-airplane' 
                            size={icons.SIZES.NORMAL} 
                            color={colors.light.dark} 
                        />

                        <Text type='default-semibold' style={styles.address}>{rideDetails.from!.address}</Text>
                    </View>

                    <View style={[styles.locationItem, styles.locationBorderBottom]}>
                        <Octicons
                            name='location'
                            size={icons.SIZES.NORMAL} 
                            color={colors.light.dark} 
                        />

                        <Text type='default-semibold' style={styles.address}>{rideDetails.to!.address}</Text>
                    </View>
                </View>
            </View>

            <View style={{ padding: 16, paddingBottom: insets.bottom }}>
                <Button label='Confirm Ride'  onPress={handleBookRide} />
            </View>
        </RiderLayout>
    );
};

const styles = StyleSheet.create({
    address: { color: colors.light.dark, fontSize: 15, lineHeight: 20, flex: 1 },
    content: { flex: 1, borderTopWidth: 1, borderTopColor: colors.light.grayLight, marginTop: 16, padding: 16 },
    header: { paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 24 },
    location: { marginTop: 20 },
    locationItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 16, borderTopColor: colors.light.grayLight, borderTopWidth: 1 },
    locationBorderBottom: { borderBottomColor: colors.light.grayLight, borderBottomWidth: 1 },
    metadata: { padding: 16, marginTop: 20, borderRadius: 16, backgroundColor: colors.light.primaryLight },
    metadataRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.light.white },
    metadataLabel: { color: colors.light.dark, fontSize: 17, lineHeight: 24, textTransform: 'capitalize' },
    rating: { fontSize: 15, lineHeight: 20, color: colors.light.dark },
    ratingContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2},
    riderDetails: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 12 },
    riderDetailsContainer: { justifyContent: 'center', alignItems: 'center' },
    riderImage: { width: 100, height: 100, borderRadius: 100 },
    title: {
        fontSize: 20,
        lineHeight: 24,
        fontFamily: defaultStyles.jakartaSemibold.fontFamily,
        color: colors.light.dark,
        flex: 1,
    },
});

export default RideInformationPage;