import React, { useEffect, useMemo, useRef, useState } from 'react';

import { View,  StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';

import Rider from '@/components/lists/Rider';

import { colors, icons, styles as defaultStyles } from '@/constants';
import { Button, Text } from '@/components/ui';
import { Rider as RiderModel, UserRide } from '@/utils/models';
import { useAppDispatch } from '@/store/hooks';
import { setRider } from '@/store/ride/slice';

const ChooseRiderPage = () => {
    const [selectedRider, setSelectedRider] = useState<RiderModel | null>(null);

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['60%'], []);

    const insets = useSafeAreaInsets();
    const dispatch = useAppDispatch();

    const handleSubmitRider = () => {
        if (!selectedRider) return;

        dispatch(setRider(selectedRider));
        
        router.push('/home/ride-information')
    };

    useEffect(() => {
        bottomSheetModalRef.current?.present();
    }, []);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <View style={[styles.header, { paddingTop: insets.top }]}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <MaterialCommunityIcons name='arrow-left' size={icons.SIZES.NORMAL} color={colors.light.white} />
            </TouchableOpacity>

            <Text type='title' style={styles.title}>Choose a Rider</Text>
        </View>

        <TouchableOpacity style={[styles.backButton, styles.gps]}>
            <Ionicons name='locate' size={icons.SIZES.NORMAL} color={colors.light.white} />
        </TouchableOpacity>

        <BottomSheetModal style={styles.curved} animateOnMount enablePanDownToClose={false} ref={bottomSheetModalRef} index={1} snapPoints={snapPoints}>
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

            <View style={{ padding: 16, paddingBottom: insets.bottom }}>
                <Button label='Select Ride' disabled={!selectedRider} onPress={handleSubmitRider} />
            </View>
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
    container: {
        flex: 1,
        padding: 16,
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
    separator: { height: 1, backgroundColor: colors.light.grayLight, width: '100%' },
    title: {
        fontSize: 24,
        lineHeight: 28,
        color: colors.light.dark,
        fontFamily: defaultStyles.semibold.fontFamily,
        fontWeight: defaultStyles.semibold.fontWeight,
    },
});

export default ChooseRiderPage;