import React from "react";
import Modal from "react-native-modal";

import * as yup from 'yup';

import ActivityIndicator from "../ui/ActivityIndicator";
import AccountVerified from "./AccountVerified";
import Form from "./Form";
import FormError from "./FormError";
import FormField from "./FormField";
import SubmitButton from "./SubmitButton";

import { FormikHelpers } from "formik";
import { StyleSheet, View } from "react-native";

import { Text } from "../ui";
import { colors, styles as defaultStyles } from "@/constants";
import { getFieldErrorsFromError } from "@/utils/lib";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { verifyEmail } from "@/store/auth/actions";


interface FormValues {
    code: string;
}

const schema = yup.object<FormValues>({
    code: yup.string().length(6).required().label('Verification Code')
});

const EmailVerification = () => {
    const auth = useAppSelector((state => state.auth));
    const dispatch = useAppDispatch();

    const handleSubmit = async (values: FormValues, helpers: FormikHelpers<FormValues>) => {
        const payload = {
            email: auth.waitingRoom!.user!.email,
            token: values.code,
        };

        try {
            await dispatch(verifyEmail(payload)).unwrap();
        } catch (error) {
            const fieldErrors = getFieldErrorsFromError(error);
            if (fieldErrors) helpers.setErrors(fieldErrors);
        }
    };

    if (auth.isVerified) {
        return <AccountVerified />;
    }

    if (auth.waitingRoom) {
        return (
            <Modal isVisible>
                <ActivityIndicator visible={auth.isAuthenticating} />
            
                <View style={styles.container}>
                    <Form initialValues={{ code: '' }} onSubmit={handleSubmit} validationSchema={schema}>
                        <View style={styles.details}>
                            <Text type="title" style={styles.title}>Verification</Text>
                            <Text type="default-semibold" style={styles.description}>
                                We've sent a verification code to <Text type="link" style={[styles.description, styles.link]}>{auth.waitingRoom!.user!.email}</Text>
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
                            <SubmitButton label="Verify Email" />
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
        fontSize: 12,
        fontFamily: defaultStyles.jakartaSemibold.fontFamily,
        lineHeight: 18,
        color: colors.light.gray,
        textAlign: 'left',
    },
    link: { color: colors.light.primary },
    title: {
        fontSize: 28,
        fontFamily: defaultStyles.jakartaBold.fontFamily,
        lineHeight: 34,
        color: colors.light.dark,
        textAlign: 'left',
        marginBottom: 4,
    },
});
 
export default EmailVerification;