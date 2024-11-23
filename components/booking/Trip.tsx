import React, { useMemo } from "react";
import { Keyboard, StyleSheet, View } from "react-native";

import dayjs from "dayjs";
import * as yup from "yup";

import { Form, FormDatePicker, FormField, SubmitButton } from "../forms";
import { useAppDispatch } from "@/store/hooks";
import { setBooking } from "@/store/booking/slice";
import { DATE_TIME_FORMAT } from "@/constants/app";

import BookingField from "./Field";
import { FormikHelpers } from "formik";

interface FormValues {
    location: string;
    destination: string;
    numberOfSeats: number;
    departureDate: Date;
}

const tripSchema = yup.object<FormValues>().shape({
	location: yup.string().required().label('Current Location'),
	destination: yup.string().required().label('Destination'),
	numberOfSeats: yup.number().positive().required().label('Number of Seats'),
    departureDate: yup.date().min(dayjs().toDate()).label("Departure Date")
});

const Trip: React.FC= () => {
    const dispatch = useAppDispatch();

    const today = useMemo(() => {
        return dayjs().toDate();
    }, []);

    const handleSubmit = (booking: FormValues, helpers: FormikHelpers<FormValues>) => {
        Keyboard.dismiss();

        dispatch(setBooking({
            location: booking.location,
            destination: booking.destination,
            numberOfSeats: booking.numberOfSeats,
            departureDate: dayjs(booking.departureDate).format(DATE_TIME_FORMAT),
        }));

        helpers.resetForm();
    };

    return ( 
        <Form initialValues={{ location: '', destination: '', numberOfSeats: '', departureDate: today }} onSubmit={handleSubmit} validationSchema={tripSchema}>
            <FormField
                autoCapitalize="words" 
                label='Current Location'
                name='location'
                width='100%' 
                Component={BookingField}
                placeholder='Enter your current location'
            />
            
            <FormField
                autoCapitalize="words" 
                label='Destination'
                name='destination'
                width='100%' 
                Component={BookingField}
                placeholder='Enter your destination'
            />

            <View style={styles.row}>
                <View style={styles.flex}>
                    <FormDatePicker
                        label='Departure Date'
                        name='departureDate'
                        width='100%' 
                        format='MMM. DD YYYY'
                        mode="datetime"
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
            
            <View style={styles.submitButton}>
                <SubmitButton label="Search transport line" />
            </View>
        </Form>
    );
};

const styles = StyleSheet.create({
    flex: { flex: 1 },
    row: { flexDirection: "row", alignItems: "flex-start", justifyContent: "center", gap: 7 },
    submitButton: { marginTop: 6 },
});
 
export default Trip;