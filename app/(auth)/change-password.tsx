import React, { useRef } from 'react';
import YupPassword from 'yup-password'

import { FormikHelpers, FormikProps } from 'formik';

import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Link, router } from 'expo-router';

import * as yup from 'yup';

import ActivityIndicator from '@/src/components/ui/ActivityIndicator';
import ParallaxScrollView from '@/src/components/ParallaxScrollView';

import { ThemedView } from '@/src/components/ThemedView';
import { Form, FormError, FormField, SubmitButton } from '@/src/components/forms';
import { HelloWave, Text } from '@/src/components/ui';

import { colors } from '@/src/constants';
import { resetPassword } from '@/src/store/auth/actions';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { getFieldErrorsFromError } from '@/src/utils/lib';

YupPassword(yup);

interface FormValues {
    password: string;
    confirmPassword: string;
}

const changePasswordSchema = yup.object<FormValues>().shape({
	password: yup.string()
              .minLowercase(1, 'At least one lowercase character')
              .minUppercase(1, 'At least one uppercase character')
              .minNumbers(1, 'At least one number')
              .minSymbols(1, 'At least one special character')
              .required()
              .label('Password'),
	confirmPassword: yup.string().required().label('Confirm Password').oneOf([yup.ref('password'), ''], 'Passwords must match'),
});

const ChangePasswordPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const formikRef = useRef<FormikProps<FormValues>>(null);

  const handleSubmit = async (auth: FormValues, helpers: FormikHelpers<FormValues>) => {
    try {
      await dispatch(resetPassword(auth)).unwrap();
      router.replace('/sign-in');
    } catch (error) {
      const fieldErrors = getFieldErrorsFromError(error);
      if (fieldErrors) helpers.setErrors(fieldErrors);
    }
  };

  return (
    <KeyboardAwareScrollView bounces={false}>
      <ActivityIndicator visible={auth.isAuthenticating} />

      <ParallaxScrollView
          headerBackgroundColor={{ light: colors.light.white, dark: colors.light.white, }}
          headerImage={
            <View style={styles.headerContainer}>
                <Image
                  source={require('@/src/assets/images/welcome.png')}
                  style={styles.image}
                />

                <ThemedView style={styles.titleContainer}>
                  <Text type='subtitle' style={styles.title}>Change Password</Text>
                  <HelloWave />
                </ThemedView>
            </View>
          }
      >              
        <Form ref={formikRef} initialValues={{ password: '', confirmPassword: '' }} onSubmit={handleSubmit} validationSchema={changePasswordSchema}>
            <FormField 
                primaryIcon='lock' 
                name="password" 
                label='New Password' 
                placeholder="Enter New password"
                secureTextEntry
            />
            
            <FormField 
                primaryIcon='lock' 
                name="confirmPassword" 
                label='Confirm Password' 
                placeholder="Confirm New Password"
                secureTextEntry
            />

            <FormError error={auth.passwordResetDetails.error} />
            
            <View style={styles.buttonContainer}>
              <SubmitButton label="Change Password" />

              <Link href='/sign-in' asChild>
                  <TouchableOpacity style={styles.signinContainer}>
                      <Text type='default' style={styles.signinText}>
                          Back to <Text type='default-semibold' style={styles.sigininTextCTA}>Login</Text>
                      </Text>
                  </TouchableOpacity>
              </Link>
            </View>
        </Form>
      </ParallaxScrollView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
    buttonContainer: { marginTop: 14 },
    signinContainer: { marginTop: 20 },
    signinText: { color: colors.light.gray, textAlign: 'center' },
    sigininTextCTA: { color: colors.light.primary },
    headerContainer: { height: '100%', width: '100%' },
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

export default ChangePasswordPage;
