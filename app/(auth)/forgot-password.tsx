import React, { useRef } from 'react';
import { FormikHelpers, FormikProps } from 'formik';

import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Link } from 'expo-router';

import * as yup from 'yup';

import ActivityIndicator from '@/src/components/ui/ActivityIndicator';
import OTPVerification from '@/src/components/forms/OTPVerification';
import ParallaxScrollView from '@/src/components/ParallaxScrollView';

import { ThemedView } from '@/src/components/ThemedView';
import { Form, FormError, FormField, SubmitButton } from '@/src/components/forms';
import { HelloWave, Text } from '@/src/components/ui';

import { colors } from '@/src/constants';
import { forgotPassword } from '@/src/store/auth/actions';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { getFieldErrorsFromError } from '@/src/utils/lib';


interface FormValues {
    email: string;
}

const forgotPasswordSchema = yup.object<FormValues>().shape({
	email: yup.string().email().required().label('Email Address'),
});

const ForgotPasswordPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const formikRef = useRef<FormikProps<FormValues>>(null);

  const handleSubmit = async (auth: FormValues, helpers: FormikHelpers<FormValues>) => {
    try {
      await dispatch(forgotPassword(auth)).unwrap();
    } catch (error) {
      const fieldErrors = getFieldErrorsFromError(error);
      if (fieldErrors) helpers.setErrors(fieldErrors);
    }
  };

  return (
    <>
      <KeyboardAwareScrollView bounces={false}>
        <ParallaxScrollView
            headerBackgroundColor={{ light: colors.light.white, dark: colors.light.white, }}
            headerImage={
              <View style={styles.headerContainer}>
                  <Image
                    source={require('@/src/assets/images/welcome.png')}
                    style={styles.image}
                  />

                  <ThemedView style={styles.titleContainer}>
                    <Text type='subtitle' style={styles.title}>Forgot Password</Text>
                    <HelloWave />
                  </ThemedView>
              </View>
            }
        >
          <Form ref={formikRef} initialValues={{ email: '' }} onSubmit={handleSubmit} validationSchema={forgotPasswordSchema}>
              <FormField 
                  autoCapitalize="none" 
                  primaryIcon='envelope' 
                  name="email" 
                  label='Email' 
                  placeholder="Enter email address"
                  keyboardType='email-address'
              />

              <FormError error={auth.passwordResetDetails.error} />
              
              <SubmitButton label="Reset Password" />

              <Link href='/sign-in' asChild>
                  <TouchableOpacity style={styles.signinContainer}>
                      <Text type='default' style={styles.signinText}>
                          Back to <Text type='default-semibold' style={styles.sigininTextCTA}>Login</Text>
                      </Text>
                  </TouchableOpacity>
              </Link>
          </Form>
        </ParallaxScrollView>
      
        <ActivityIndicator visible={auth.isAuthenticating} />
      </KeyboardAwareScrollView>

      <OTPVerification />
    </>
  );
};

const styles = StyleSheet.create({
    headerContainer: { height: '100%', width: '100%' },
    signinContainer: { marginTop: 10 },
    signinText: { color: colors.light.gray, textAlign: 'center' },
    sigininTextCTA: { color: colors.light.primary },
    title: { 
      color: colors.light.white, 
      letterSpacing: 0.7,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      position: 'absolute',
      bottom: 34,
      left: 24
    },
    image: {
      height: '100%',
      width: '100%',
      bottom: 0,
      left: 0,
      position: 'absolute',
    },
});

export default ForgotPasswordPage;
