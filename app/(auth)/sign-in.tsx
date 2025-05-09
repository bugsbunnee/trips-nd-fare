import React, { useRef } from 'react';
import { FormikHelpers, FormikProps } from 'formik';

import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Link } from 'expo-router';

import * as yup from 'yup';

import ActivityIndicator from '@/src/components/ui/ActivityIndicator';
import ParallaxScrollView from '@/src/components/ParallaxScrollView';
import storage from '@/src/utils/storage';

import { ThemedView } from '@/src/components/ThemedView';
import { Form, FormError, FormField, SubmitButton } from '@/src/components/forms';
import { GoogleSignInButton, HelloWave, OrDivider, Text } from '@/src/components/ui';

import { colors } from '@/src/constants';
import { loginUser } from '@/src/store/auth/actions';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { getFieldErrorsFromError } from '@/src/utils/lib';


interface FormValues {
    email: string;
    password: string;
}

const authSchema = yup.object<FormValues>().shape({
	email: yup.string().email().required().label('Email Address'),
	password: yup.string().required().label('Password'),
});

const SignInPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const formikRef = useRef<FormikProps<FormValues>>(null);

  const handleSubmit = async (auth: FormValues, helpers: FormikHelpers<FormValues>) => {
    try {
      const result = await dispatch(loginUser(auth)).unwrap();
      if (result) storage.storeUser(result);
    } catch (error) {
      const fieldErrors = getFieldErrorsFromError(error);
      if (fieldErrors) helpers.setErrors(fieldErrors);
    }
  };

  return (
    <ParallaxScrollView
        headerBackgroundColor={{ light: colors.light.white, dark: colors.light.white, }}
        headerImage={
            <View style={styles.headerContainer}>
                <Image
                source={require('@/src/assets/images/welcome.png')}
                style={styles.image}
                />

                <ThemedView style={styles.titleContainer}>
                <Text type='subtitle' style={styles.title}>Welcome</Text>
                <HelloWave />
                </ThemedView>
            </View>
        }
    >
      <KeyboardAwareScrollView bounces={false}>
          <ActivityIndicator visible={auth.isAuthenticating} />
          
          <Form ref={formikRef} initialValues={{ email: '', password: '' }} onSubmit={handleSubmit} validationSchema={authSchema}>
              <FormField 
                  autoCapitalize="none" 
                  primaryIcon='envelope' 
                  name="email" 
                  label='Email' 
                  placeholder="Enter email address"
                  keyboardType='email-address'
              />

              <FormField 
                  primaryIcon='lock' 
                  name="password" 
                  label='Password' 
                  placeholder="Enter password"
                  secureTextEntry
              />

              <Link href='/forgot-password' asChild>
                  <TouchableOpacity style={styles.forgotPassword}>
                      <Text type='default' style={styles.signinText}>
                          Forgot your <Text type='default-semibold' style={styles.sigininTextCTA}>password?</Text>
                      </Text>
                  </TouchableOpacity>
              </Link>

              <FormError error={auth.error} />
              
              <View style={styles.buttonContainer}>
                  <SubmitButton label="Sign In" />
                  
                  <OrDivider />  
                  
                  <GoogleSignInButton label='Login with Google' />

                  <Link href='/sign-up' asChild>
                      <TouchableOpacity style={styles.signinContainer}>
                          <Text type='default' style={styles.signinText}>
                              Don't have an account? <Text type='default-semibold' style={styles.sigininTextCTA}>Sign up</Text>
                          </Text>
                      </TouchableOpacity>
                  </Link>
              </View>
          </Form>
        </KeyboardAwareScrollView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
    buttonContainer: { marginTop: 14 },
    headerContainer: { height: '100%', width: '100%' },
    signinContainer: { marginVertical: 40 },
    signinText: { color: colors.light.gray, textAlign: 'center' },
    sigininTextCTA: { color: colors.light.primary },
    forgotPassword: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 0,
      marginBottom: 16
    },
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
    stepContainer: {
      gap: 8,
      marginBottom: 8,
    },
    image: {
      height: '100%',
      width: '100%',
      bottom: 0,
      left: 0,
      position: 'absolute',
    },
});

export default SignInPage;
