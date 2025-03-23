import React from "react";
import Modal from "react-native-modal";

import * as yup from 'yup';

import { router } from "expo-router";
import { FormikHelpers } from "formik";
import { Keyboard, StyleSheet, TouchableOpacity, View } from "react-native";

import Form from "@/src/components/forms/Form";
import FormError from "@/src/components/forms/FormError";
import FormField from "@/src/components/forms/FormField";
import SubmitButton from "@/src/components/forms/SubmitButton";

import { Text } from "@/src/components/ui";
import { colors, styles as defaultStyles } from "@/src/constants";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { setCancelPasswordReset, setPasswordResetCode } from "@/src/store/auth/slice";


interface FormValues {
    code: string;
}

const schema = yup.object<FormValues>({
    code: yup.string().length(6).required().label('Verification Code')
});

const OTPVerification: React.FC = () => {
    const auth = useAppSelector((state => state.auth));
    const dispatch = useAppDispatch();

    const handleSubmit = async (values: FormValues, helpers: FormikHelpers<FormValues>) => {
        Keyboard.dismiss();
    
        dispatch(setPasswordResetCode(values.code));
        router.push('/change-password');
    };

    const handleCancelPasswordReset = () => {
        dispatch(setCancelPasswordReset());
    };

    if (auth.passwordResetDetails.active) {
        return (
            <Modal isVisible>
                <View style={styles.container}>
                    <Form initialValues={{ code: '' }} onSubmit={handleSubmit} validationSchema={schema}>
                        <View style={styles.details}>
                            <Text type="title" style={styles.title}>Forgot Password</Text>
                            <Text type="default-semibold" style={styles.description}>
                                We've sent a verification code to <Text type="link" style={[styles.description, styles.link]}>{auth.passwordResetDetails.email}</Text>
                            </Text>
                        </View>
    
                        <FormField 
                            primaryIcon='lock' 
                            name="code" 
                            label='Code' 
                            placeholder="12345"
                            keyboardType="number-pad"
                        />
    
                        <FormError error={auth.error} />
    
                        <View style={styles.button}>
                            <SubmitButton label="Continue" />

                            <TouchableOpacity onPress={handleCancelPasswordReset} style={styles.cancel}>
                                <Text type='default-semibold' style={styles.cancelText}>
                                    Change your phone number
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Form>
                </View>
            </Modal> 
        );
    }

    return null;
};

const styles = StyleSheet.create({
    button: { marginTop: 10 },
    cancel: {
        marginTop: 20,
    },
    cancelText: { color: colors.light.primary, textAlign: 'center' },
    container: {
        width: '95%',
        minHeight: 250,
        backgroundColor: colors.light.white,
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 25,
        alignSelf: 'center'
    },
    details: { marginBottom: 16 },
    description: {
        fontFamily: defaultStyles.jakartaSemibold.fontFamily,
        lineHeight: 18,
        color: colors.light.gray,
        textAlign: 'center',
        marginTop: 8
    },
    link: { color: colors.light.primary },
    title: {
        fontSize: 28,
        fontFamily: defaultStyles.jakartaBold.fontFamily,
        lineHeight: 34,
        color: colors.light.dark,
        textAlign: 'center',
        marginBottom: 4,
    },
});
 
export default OTPVerification;