import React, { useState } from 'react';

import { View,  StyleSheet } from 'react-native';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';

import Rider from '@/src/components/lists/Rider';
import GeofencingMap from '@/src/components/maps/GeofencingMap';
import RiderLayout from '@/src/components/ui/RiderLayout';
import useNearbyRiders from '@/src/hooks/useNearbyRiders';

import { colors, styles as defaultStyles } from '@/src/constants';
import { Button } from '@/src/components/ui';

import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { setRider } from '@/src/store/ride/slice';

const ChooseRiderPage = () => {
    const [selectedRider, setSelectedRider] = useState<string>('');

    const dispatch = useAppDispatch();
    const nearbyRiders = useNearbyRiders();

    const data = useAppSelector((state) => state.data);
    const rideDetails = useAppSelector((state) => state.ride);

    const handleSubmitRider = () => {
        if (!selectedRider) return;

        dispatch(setRider(selectedRider));
        router.push('/home/ride-information')
    };

    return (
        <RiderLayout
            label='Choose a Rider'
            Map={() => (
                <GeofencingMap 
                    destination={rideDetails.to}
                    origin={rideDetails.from} 
                    markers={nearbyRiders} 
                />
            )}
        >
            <BottomSheetFlatList 
                data={data.nearbyRiders}
                keyExtractor={item => item._id}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                renderItem={({ item }) => (
                    <Rider 
                        isSelected={item._id === selectedRider}
                        onSelect={() => setSelectedRider(item._id)}
                        rider={item}
                    />
                )}
            />

            <View style={styles.select}>
                <Button 
                    label='Select Ride' 
                    disabled={!selectedRider} 
                    onPress={handleSubmitRider} 
                />
            </View>
        </RiderLayout>
    );
};

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
    },
});

export default ChooseRiderPage;