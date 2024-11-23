import React, { useEffect, useMemo, useRef } from 'react';

import { View,  StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';

import { colors, icons, styles as defaultStyles } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button, Text } from '@/components/ui';
import { setRideID } from '@/store/ride/slice';
import { formatAmount } from '@/utils/lib';

const RideInformationPage = () => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['80%'], []);

    const rideDetails = useAppSelector((state) => state.ride);

    const insets = useSafeAreaInsets();
    const dispatch = useAppDispatch();

    const handleSubmitRider = () => {
        dispatch(setRideID('12345'));
        
        router.replace({ pathname: '/home/track' });
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

            <Text type='title' style={styles.title}>Ride Information</Text>
        </View>

        <BottomSheetModal style={styles.curved} animateOnMount enablePanDownToClose={false} ref={bottomSheetModalRef} index={1} snapPoints={snapPoints}>
            <BottomSheetView style={styles.contentHeader}>
                <Text type='default-semibold' style={styles.contentTitle}>Ride Information</Text>

                <TouchableOpacity onPress={() => router.back()}>
                    <MaterialCommunityIcons name='close' color={colors.light.gray} size={icons.SIZES.NORMAL}  />
                </TouchableOpacity>
            </BottomSheetView>

            <BottomSheetView style={styles.content}>
                <View style={styles.riderDetailsContainer}>
                    <Image source={{ uri: rideDetails.rider!.uri }} alt={rideDetails.rider!.name} style={styles.riderImage} />

                    <View style={styles.riderDetails}>
                        <Text type='subtitle'>{rideDetails.rider!.name}</Text>

                        <View style={styles.ratingContainer}>
                            <MaterialCommunityIcons name='star' color={colors.light.primary} size={icons.SIZES.NORMAL} />
                            <Text type='default-semibold' style={styles.rating}>{rideDetails.rider!.rating}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.metadata}>
                    <View style={[styles.metadataRow, { paddingTop: 0 }]}>
                        <Text type='default' style={styles.metadataLabel}>Ride Price</Text>
                        <Text type='default-semibold' style={[styles.metadataLabel, { color: colors.light.primary }]}>{formatAmount(6000)}</Text>
                    </View>
                    <View style={styles.metadataRow}>
                        <Text type='default' style={styles.metadataLabel}>Pickup Time</Text>
                        <Text type='default-semibold' style={styles.metadataLabel}>10 mins</Text>
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

                        <Text type='default-semibold' style={styles.address}>Ogombo road</Text>
                    </View>

                    <View style={[styles.locationItem, styles.locationBorderBottom]}>
                        <Octicons
                            name='location'
                            size={icons.SIZES.NORMAL} 
                            color={colors.light.dark} 
                        />

                        <Text type='default-semibold' style={styles.address}>Lekki pennisula scheme 2, road 6b</Text>
                    </View>
                </View>
            </BottomSheetView>

            <View style={{ padding: 16, paddingBottom: insets.bottom }}>
                <Button label='Confirm Ride'  onPress={handleSubmitRider} />
            </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
    address: { color: colors.light.dark, fontSize: 15, lineHeight: 20 },
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
    content: { flex: 1, borderTopWidth: 1, borderTopColor: colors.light.grayLight, marginTop: 16, padding: 16 },
    contentContainer: {
        flex: 1,
        paddingVertical: 24,
        paddingHorizontal: 16,
        backgroundColor: colors.light.white
    },
    contentHeader: { flexDirection: 'row', alignItems: 'center', padding: 16 },
    contentTitle: { fontSize: 20, color: colors.light.dark, flex: 1 },
    curved: { 
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        backgroundColor: colors.light.white
    },
    gps: { right: 16, position: 'absolute', top: '30%' },
    header: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    location: { marginTop: 20 },
    locationItem: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 16, borderTopColor: colors.light.grayLight, borderTopWidth: 1 },
    locationBorderBottom: { borderBottomColor: colors.light.grayLight, borderBottomWidth: 1 },
    metadata: { padding: 16, marginTop: 20, borderRadius: 16, backgroundColor: colors.light.primaryLight },
    metadataRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.light.white },
    metadataLabel: { color: colors.light.dark, fontSize: 17, lineHeight: 24, textTransform: 'capitalize' },
    rating: { fontSize: 15, lineHeight: 20, color: colors.light.dark },
    ratingContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2},
    riderDetails: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 12 },
    riderDetailsContainer: { justifyContent: 'center', alignItems: 'center' },
    riderImage: { width: 100, height: 100, resizeMode: 'cover', borderRadius: 100 },
    separator: { height: 1, backgroundColor: colors.light.grayLight, width: '100%' },
    title: {
        fontSize: 24,
        lineHeight: 28,
        color: colors.light.dark,
        fontFamily: defaultStyles.jakartaSemibold.fontFamily,
        fontWeight: defaultStyles.jakartaSemibold.fontWeight,
    },

});

export default RideInformationPage;