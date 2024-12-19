import React, { useCallback, useEffect, useMemo } from 'react';

import { View,  StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { MapMarkerProps } from 'react-native-maps';

import * as yup from 'yup';

import { colors, icons, styles as defaultStyles } from '@/constants';
import { Text } from '@/components/ui';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { Form, FormField, SubmitButton } from '@/components/forms';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setDestination, setLocationDetails, setOrigin } from '@/store/ride/slice';

import GeofencingMap from '@/components/maps/GeofencingMap';
import useBottomSheet from '@/hooks/useBottomSheet';
import useLocation from '@/hooks/useLocation';

interface FormValues {
    from: string;
    to: string;
}

const locationSchema = yup.object<FormValues>().shape({
	from: yup.string().required().label('From location'),
	to: yup.string().required().label('To location'),
});

const RidePage: React.FC = () => {
    const bottomSheet = useBottomSheet();
    const insets = useSafeAreaInsets();
    const dispatch = useAppDispatch();

    const rideDetails = useAppSelector((state) => state.ride);

    const coordinates = useLocation();

    const handleSubmit = (location: FormValues) => {
        dispatch(setLocationDetails(location));
        router.push('/home/choose-rider');
    };

    const handleResetOrigin = useCallback(() => {
        if (coordinates) {
            dispatch(setOrigin(coordinates));
        }
    }, [dispatch, coordinates]);

    useEffect(() => {
        handleResetOrigin();
    }, [handleResetOrigin]);

    return (
        <BottomSheetModalProvider>
            <View style={styles.container}>
                <View style={styles.flex}>
                    <View style={styles.map}>
                        <GeofencingMap 
                            destination={rideDetails.destination}
                            origin={rideDetails.origin} 
                            onDestinationChange={(destination) => dispatch(setDestination(destination))} 
                            onOriginChange={(origin) => dispatch(setOrigin(origin))} 
                            markers={nearbyRiders} 
                        />
                    </View>

                    <View style={[styles.header, styles.horizontalPadding, { top: insets.top, position: 'absolute' }]}>
                        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                            <MaterialCommunityIcons name='arrow-left' size={icons.SIZES.NORMAL} color={colors.light.white} />
                        </TouchableOpacity>

                        <Text type='title' style={styles.title}>Ride</Text>
                    </View>

                    {coordinates && (
                        <TouchableOpacity 
                            onPress={handleResetOrigin} 
                            style={[styles.backButton, styles.gps]}
                        >
                            <Ionicons name='locate' size={icons.SIZES.NORMAL} color={colors.light.white} />
                        </TouchableOpacity>
                    )}
                </View>

                <BottomSheetModal keyboardBehavior='interactive' keyboardBlurBehavior='restore' style={styles.modal} animateOnMount enablePanDownToClose={false} ref={bottomSheet.ref}>
                    <BottomSheetView style={[styles.content, { paddingBottom: insets.bottom > 0 ? insets.bottom : 16 }]}>
                        <Form initialValues={{ from: '', to: '' }} onSubmit={handleSubmit} validationSchema={locationSchema}>
                            <FormField 
                                autoCapitalize="none" 
                                primaryIcon='location-pin' 
                                label='From'
                                name='from'
                                width='100%' 
                                InputComponent={BottomSheetTextInput}
                                trailingButtonParams={{ icon: 'locate', onPress: () => {} }}
                                placeholder='From location'
                                containerStyle={styles.input} 
                            />

                            <FormField
                                primaryIcon='location-pin' 
                                label='To'
                                name='to'
                                width='100%' 
                                InputComponent={BottomSheetTextInput}
                                trailingButtonParams={{ icon: 'map-outline', onPress: () => {} }}
                                placeholder='To location'
                                containerStyle={styles.input} 
                            />
                            
                            <View style={styles.submitButton}>
                                <SubmitButton label="Find now" />
                            </View>
                        </Form>
                    </BottomSheetView>
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>
    );
};

const nearbyRiders: MapMarkerProps[] = [
    {
      identifier: 'joseph-ahmed',
      title: 'Joseph Ahmed',
      description: 'Currently at Ajah',
      image: require('@/assets/images/rider-map-pin.png'),
      coordinate: {
        latitude: 6.4683108,
        longitude: 3.5237379
      },
    },
    {
      identifier: 'michael-rako',
      title: 'Michael Rako',
      description: 'Currently at Abraham Adesanya',
      image: require('@/assets/images/rider-map-pin.png'),
      coordinate: {
        latitude: 6.4657128,
        longitude: 3.5489286
      },
    },
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
    },
    content: {
        paddingHorizontal: 16,
        backgroundColor: colors.light.white,
        flex: 1,
    },
    modal: { 
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
    flex: { flex: 1 },
    gps: { right: 16, position: 'absolute', top: '30%' },
    horizontalPadding: { paddingHorizontal: 16 },
    header: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    input: {
        backgroundColor: colors.light.input,
    },
    map: {
        flex: 1,
        width: '100%'
    },
    submitButton: { marginTop: 6 },
    title: {
        fontSize: 24,
        lineHeight: 28,
        color: colors.light.dark,
        fontFamily: defaultStyles.jakartaSemibold.fontFamily,
        fontWeight: defaultStyles.jakartaSemibold.fontWeight,
    },
});

export default RidePage;