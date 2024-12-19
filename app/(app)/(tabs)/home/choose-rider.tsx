import React, { useEffect, useMemo, useState } from 'react';

import { View,  StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { MapMarkerProps } from 'react-native-maps';

import Rider from '@/components/lists/Rider';
import GeofencingMap from '@/components/maps/GeofencingMap';
import useBottomSheet from '@/hooks/useBottomSheet';

import { colors, icons, styles as defaultStyles } from '@/constants';
import { Button, Text } from '@/components/ui';
import { Rider as RiderModel, UserRide } from '@/utils/models';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setRider } from '@/store/ride/slice';

const ChooseRiderPage = () => {
    const [selectedRider, setSelectedRider] = useState<RiderModel | null>(null);

    const insets = useSafeAreaInsets();
    const dispatch = useAppDispatch();
    const bottomSheet = useBottomSheet();

    const rideDetails = useAppSelector((state) => state.ride);

    const handleSubmitRider = () => {
        if (!selectedRider) return;

        dispatch(setRider(selectedRider));
        
        router.push('/home/ride-information')
    };

    const nearbyRiders: MapMarkerProps[] = useMemo(() => {
        return RIDERS.map((rider) => ({
            identifier: rider.id.toString(),
            title: rider.name,
            description: rider.timeToLocation,
            image: require('@/assets/images/rider-map-pin.png'),
            coordinate: rider.coordinates,
        }))
    }, []);

    return (
        <BottomSheetModalProvider>
            <View style={styles.container}>
                <View style={styles.flex}>
                    <View style={styles.map}>
                        <GeofencingMap
                            destination={selectedRider?.coordinates}
                            origin={rideDetails.origin} 
                            onDestinationChange={console.log} 
                            onOriginChange={console.log} 
                            markers={nearbyRiders} 
                        />
                    </View>
                
                    <View style={[styles.header, styles.horizontalPadding, { top: insets.top, position: 'absolute' }]}>
                        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                            <MaterialCommunityIcons name='arrow-left' size={icons.SIZES.NORMAL} color={colors.light.white} />
                        </TouchableOpacity>

                        <Text type='title' style={styles.title}>Choose a Rider</Text>
                    </View>

                    <TouchableOpacity onPress={bottomSheet.onOpenSheet} style={[styles.backButton, styles.gps]}>
                        <Ionicons name='locate' size={icons.SIZES.NORMAL} color={colors.light.white} />
                    </TouchableOpacity>
                </View>

                <BottomSheetModal style={styles.curved} animateOnMount enablePanDownToClose={false} ref={bottomSheet.ref}>
                    <BottomSheetView style={{ paddingBottom: insets.bottom }}>
                        <BottomSheetFlatList 
                            data={RIDERS}
                            keyExtractor={item => item.id.toString()}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                            renderItem={({ item }) => (
                                <Rider 
                                    isSelected={item.id === selectedRider?.id}
                                    onSelect={() => setSelectedRider(item)}
                                    uri={item.uri}
                                    name={item.name}
                                    rating={item.rating}
                                    price={item.price}
                                    timeToLocation={item.timeToLocation}
                                    numberOfSeats={item.numberOfSeats}
                                    type={item.type as UserRide['type']}
                                />
                            )}
                        />

                        <View style={styles.select}>
                            <Button label='Select Ride' disabled={!selectedRider} onPress={handleSubmitRider} />
                        </View>
                    </BottomSheetView>
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>
    );
};

const RIDERS: RiderModel[] = [
    {
        id: 1,
        uri: 'https://picsum.photos/200/300' ,
        name: 'Joseph Ogbaji',
        rating: 4.9,
        price: 6000,
        timeToLocation: '10 min',
        numberOfSeats: 4,
        type: 'car',
        coordinates: {
            latitude: 6.4683108,
            longitude: 3.5237379
        },
    },
    {
        id: 2,
        uri: 'https://picsum.photos/200/300' ,
        name: 'Ofana Austin',
        rating: 4.9,
        price: 6000,
        timeToLocation: '10 min',
        numberOfSeats: 4,
        type: 'car',
        coordinates: {
            latitude: 6.4657128,
            longitude: 3.5489286
        },
    }
];


const styles = StyleSheet.create({
    backButton: { 
        backgroundColor: colors.light.primary, 
        width: 40, 
        height: 40, 
        borderRadius: 40, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    select: { padding: 16 },
    container: {
        flex: 1,
        backgroundColor: colors.light.modalOpaque,
    },
    contentContainer: {
        flex: 1,
        paddingVertical: 24,
        paddingHorizontal: 16,
        backgroundColor: colors.light.white
    },
    curved: { 
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
    gps: { right: 16, position: 'absolute', top: '30%' },
    header: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    horizontalPadding: { paddingHorizontal: 16 },
    flex: { flex: 1 },
    map: {
        flex: 1,
        width: '100%'
    },
    separator: { height: 1, backgroundColor: colors.light.grayLight, width: '100%' },
    title: {
        fontSize: 24,
        lineHeight: 28,
        color: colors.light.dark,
        fontFamily: defaultStyles.jakartaSemibold.fontFamily,
        fontWeight: defaultStyles.jakartaSemibold.fontWeight,
    },
});

export default ChooseRiderPage;