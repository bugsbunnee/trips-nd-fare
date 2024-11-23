import React, { useEffect, useMemo, useRef } from 'react';

import { View,  StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';

import { colors, icons, styles as defaultStyles } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button, Text } from '@/components/ui';

import car from '@/assets/images/car.png';

const RideInformationPage = () => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['65%'], []);

    const rideDetails = useAppSelector((state) => state.ride);

    const insets = useSafeAreaInsets();
    const dispatch = useAppDispatch();

    const handleNavigateHome = () => {
       router.replace('/home')
    };

    useEffect(() => {
        bottomSheetModalRef.current?.present();
    }, []);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <View style={[styles.header, { paddingTop: insets.top }]}>
            <TouchableOpacity style={styles.backButton} onPress={handleNavigateHome}>
                <MaterialCommunityIcons name='arrow-left' size={icons.SIZES.NORMAL} color={colors.light.dark} />
            </TouchableOpacity>

            <Text type='title' style={styles.title}>Track Ride</Text>
        </View>

        <BottomSheetModal style={styles.curved} animateOnMount enablePanDownToClose={false} ref={bottomSheetModalRef} index={1} snapPoints={snapPoints}>
            <BottomSheetView style={styles.contentHeader}>
                <Text type='default-semibold' style={styles.contentTitle}>Arriving in <Text type='default-semibold' style={[styles.contentTitle, styles.contentTitlePrimary]}>10 mins</Text></Text>
            </BottomSheetView>

            <BottomSheetView style={styles.content}>
                <View style={styles.metadata}>
                    <View>
                        <Image 
                            source={{ uri: rideDetails.rider!.uri }} 
                            alt={rideDetails.rider!.name} 
                            style={styles.riderImage} 
                        />

                        <Text type='subtitle' style={{ fontSize: 15, lineHeight: 20, marginTop: 8 }}>{rideDetails.rider!.name}</Text>
                    </View>

                    <Image 
                        source={car} 
                        alt={rideDetails.rider!.type} 
                        style={styles.vehicleImage} 
                    />
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

                    <View style={styles.separator} />

                    <View style={styles.locationItem}>
                        <Octicons
                            name='location'
                            size={icons.SIZES.NORMAL} 
                            color={colors.light.dark} 
                        />

                        <Text type='default-semibold' style={styles.address}>Lekki pennisula scheme 2, road 6b</Text>
                    </View>
                </View>
            </BottomSheetView>

            <View style={{ paddingBottom: insets.bottom + 10 }}>
                <Button label='Back Home' onPress={handleNavigateHome} />
            </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
    address: { color: colors.light.dark, fontSize: 15, lineHeight: 20 },
    backButton: { 
        backgroundColor: colors.light.white, 
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
    curved: { 
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        padding: 16,
        backgroundColor: colors.light.white
    },
    gps: { right: 16, position: 'absolute', top: '30%' },
    header: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    location: { marginTop: 20 },
    locationItem: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 16 },
    metadata: { paddingVertical: 16, paddingHorizontal: 24, borderRadius: 16, backgroundColor: colors.light.primaryLight, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    metadataRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.light.white },
    metadataLabel: { color: colors.light.dark, fontSize: 17, lineHeight: 24, textTransform: 'capitalize' },
    rating: { fontSize: 15, lineHeight: 20, color: colors.light.dark },
    ratingContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2},
    riderDetails: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 12 },
    riderImage: { width: 100, height: 100, resizeMode: 'cover', borderRadius: 100 },
    separator: { height: 1, backgroundColor: colors.light.grayLight, width: '100%' },
    vehicleImage: { width: 128, height: 72, resizeMode: 'contain' },
    title: {
        fontSize: 24,
        lineHeight: 28,
        color: colors.light.dark,
        fontFamily: defaultStyles.jakartaSemibold.fontFamily,
        fontWeight: defaultStyles.jakartaSemibold.fontWeight,
    },

});

export default RideInformationPage;