import React from 'react';

import { View,  StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { FormikHelpers } from 'formik';

import * as yup from 'yup';

import { colors, styles as defaultStyles } from '@/constants';
import { Form, FormError, FormLocationField, SubmitButton } from '@/components/forms';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setLocationDetails, setLocationFrom, setLocationTo } from '@/store/ride/slice';
import { getRidersForTrip } from '@/store/data/actions';
import { Location } from '@/utils/models';
import { getFieldErrorsFromError } from '@/utils/lib';

import ActivityIndicator from '@/components/ui/ActivityIndicator';
import GeofencingMap from '@/components/maps/GeofencingMap';
import RiderLayout from '@/components/ui/RiderLayout';

import useNearbyRiders from '@/hooks/useNearbyRiders';
import useLocation from '@/hooks/useLocation';


interface FormValues {
    from: Location;
    to: Location;
}

const locationSchema = yup.object<FormValues>().shape({
	from: yup.object().required().label('Pick-up location'),
	to: yup.object().required().label('Drop-off location'),
});

const RidePage: React.FC = () => {
    const dispatch = useAppDispatch();
    
    const data = useAppSelector((state) => state.data);
    const rideDetails = useAppSelector((state) => state.ride);
    
    const location = useLocation();
    const nearbyRiders = useNearbyRiders();

    const handleSubmit = async (location: FormValues, helpers: FormikHelpers<FormValues>) => {
        const payload = {
            from: location.from,
            to: location.to,
        };

        try {
            dispatch(setLocationDetails(location));
            await dispatch(getRidersForTrip(payload)).unwrap();
            
            router.push('/home/choose-rider');
        } catch (error) {
            const fieldErrors = getFieldErrorsFromError(error);
            if (fieldErrors) helpers.setErrors(fieldErrors);
        }
        
    };

    return (
        <RiderLayout
            label='Ride' 
            allowMapRecenter
            Map={() => (
                <GeofencingMap 
                    destination={rideDetails.to}
                    origin={rideDetails.from || location || null}
                    onDestinationChange={(destination) => dispatch(setLocationTo(destination))} 
                    onOriginChange={(origin) => dispatch(setLocationFrom(origin))} 
                    markers={nearbyRiders} 
                />
            )}
        >
            <ActivityIndicator visible={data.isLoading} />
            
            <View style={styles.horizontalPadding}>
                <Form initialValues={{ from: rideDetails.from, to: rideDetails.to }} onSubmit={handleSubmit} validationSchema={locationSchema}>
                    <FormLocationField 
                        placeholder='Pickup location'
                        name='from'
                        rightIcon='compass'
                        leftIcon='location-pin' 
                        label='From'
                        containerStyle={styles.input}
                    />
                    
                    <FormLocationField 
                        placeholder='Dropoff location'
                        name='to'
                        label='To'
                        rightIcon='map'
                        leftIcon='location-pin' 
                        containerStyle={styles.input}
                    />

                    <FormError error={data.error} />
                    
                    <View style={styles.submitButton}>
                        <SubmitButton label="Find now" />
                    </View>
                </Form>
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