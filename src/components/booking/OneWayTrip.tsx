import React, { useEffect, useMemo } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import { FormikHelpers } from "formik";
import { router } from "expo-router";

import dayjs from "dayjs";
import * as yup from "yup";

import { Form, FormDatePicker, FormError, FormField, FormPicker, SubmitButton } from "@/src/components/forms";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { PickerItemModel } from "@/src/utils/models";
import { getAvailableBusTickets, getBusLocations } from "@/src/store/data/actions";
import { formatDate, getFieldErrorsFromError } from "@/src/utils/lib";

import ActivityIndicator from "@/src/components/ui/ActivityIndicator";
import BookingField from "@/src/components/booking/Field";
import Conditional from "@/src/components/common/Conditional";

interface FormValues {
    location: PickerItemModel | null;
    destination: PickerItemModel | null;
    numberOfSeats: number;
    departureDate: Date;
    returnDate?: Date;
}

const tripSchema = yup.object<FormValues>().shape({
	location: yup.object().required().label('Current Location'),
	destination: yup.object().required().label('Destination'),
	numberOfSeats: yup.number().positive().required().label('Number of Seats'),
    departureDate: yup.date().min(dayjs().toDate()).label("Departure Date"),
    returnDate: yup.date().min(dayjs().toDate()).optional().label("Departure Date")
});

const OneWayTrip: React.FC= () => {
    const dispatch = useAppDispatch();
    const booking = useAppSelector((state) => state.booking);
    const data = useAppSelector((state) => state.data);

    const today = useMemo(() => {
        return dayjs().toDate();
    }, []);

    const initialValues: FormValues = useMemo(() => {
        return { 
            location: null, 
            destination: null, 
            numberOfSeats: 0, 
            departureDate: today, 
            returnDate: booking.bookingType === 0 ? undefined : dayjs().add(7, 'day').toDate()
        };
    }, [booking.bookingType, today]);

    const handleSubmit = async (booking: FormValues, helpers: FormikHelpers<FormValues>) => {
        Keyboard.dismiss();

        const payload = {
            origin: booking.location!.label.split(' -- ')[0],
            originCity: booking.location!.value.toString(),
            destination: booking.destination!.label.split(' -- ')[0],
            destinationCity: booking.destination!.value.toString(),
            departureDate: formatDate(booking.departureDate, 'YYYY-MM-DD'),
            returnDate: booking.returnDate ? formatDate(booking.returnDate, 'YYYY-MM-DD') : undefined,
            numberOfSeats: +booking.numberOfSeats,
        };

        try {
            await dispatch(getAvailableBusTickets(payload)).unwrap();
            router.push('/bus-rides/tickets');
        } catch (error) {
            const fieldErrors = getFieldErrorsFromError(error);
            if (fieldErrors) helpers.setErrors(fieldErrors);
        }
    };

    useEffect(() => {
        dispatch(getBusLocations());
    }, [dispatch]);

    return ( 
        <>
            <ActivityIndicator visible={data.isLoading} />
            
            <Form initialValues={initialValues} onSubmit={handleSubmit} validationSchema={tripSchema}>
                <FormPicker 
                    items={data.busLocations.origins}
                    name='location'
                    label='Departure'
                    placeholder='Select your take-off point'
                />
                
                <FormPicker 
                    items={data.busLocations.destinations}
                    name='destination'
                    label='Destination'
                    placeholder='Select your destination'
                />

                <View style={styles.row}>
                    <View style={styles.flex}>
                        <FormDatePicker
                            label='Departure Date'
                            name='departureDate'
                            width='100%' 
                            format='MMM. DD YYYY'
                            mode="date"
                            minimumDate={today}
                            placeholder='Select a departure date'
                        />
                    </View>

                    <View style={styles.flex}>
                        <FormField
                            autoCapitalize="words" 
                            label='Seats'
                            name='numberOfSeats'
                            keyboardType="numeric"
                            width='100%' 
                            Component={BookingField}
                            placeholder='Enter number of seats'
                        />
                    </View>
                </View>

                <Conditional visible={booking.bookingType === 1}>
                    <FormDatePicker
                        label='Return Date'
                        name='returnDate'
                        width='100%' 
                        format='MMM. DD YYYY'
                        mode="datetime"
                        minimumDate={today}
                        placeholder='Select a return date'
                    />
                </Conditional>

                <FormError error={data.error} />
                
                <View style={styles.submitButton}>
                    <SubmitButton label="Search transport line" />
                </View>
            </Form>
        </>
    );
};

const styles = StyleSheet.create({
    flex: { flex: 1 },
    row: { flexDirection: "row", alignItems: "flex-start", justifyContent: "center", gap: 7 },
    submitButton: { marginTop: 6 },
});
 
export default OneWayTrip;