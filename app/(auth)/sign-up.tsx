import React from 'react';

import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Link } from 'expo-router';
import { FormikHelpers } from 'formik';

import * as yup from 'yup';
import YupPassword from 'yup-password'

import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { APP_COLORS } from '@/src/constants/colors';
import { registerUser } from '@/src/store/auth/actions';

import ActivityIndicator from '@/src/components/ui/ActivityIndicator';
import EmailVerification from '@/src/components/forms/EmailVerification';
import ParallaxScrollView from '@/src/components/ParallaxScrollView';

import { ThemedView } from '@/src/components/ThemedView';
import { Form, FormError, FormField, SubmitButton } from '@/src/components/forms';
import { GoogleSignInButton, HelloWave, OrDivider, Text } from '@/src/components/ui';
import { getFieldErrorsFromError } from '@/src/utils/lib';

YupPassword(yup);

interface FormValues {
    name: string
    email: string;
    password: string;
}

const signupSchema = yup.object<FormValues>().shape({
  name: yup.string().min(5, (data) => `Name must be at least ${data.min} characters`).required().label('Name'),
	email: yup.string().email().required().label('Email Address'),
	password: yup.string()
            .minLowercase(1, 'At least one lowercase character')
            .minUppercase(1, 'At least one uppercase character')
            .minNumbers(1, 'At least one number')
            .minSymbols(1, 'At least one special character')
            .required()
            .label('Password')
});

const SignUpPage: React.FC = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleSubmit = async (auth: FormValues, helpers: FormikHelpers<FormValues>) => {
    try {
      await dispatch(registerUser(auth)).unwrap();
    } catch (error) {
      const fieldErrors = getFieldErrorsFromError(error);
      if (fieldErrors) helpers.setErrors(fieldErrors);
    }
  };

  return (
    <ParallaxScrollView
        headerBackgroundColor={{ light: APP_COLORS.WHITE, dark: APP_COLORS.WHITE }}
        headerImage={
          <View style={styles.headerContainer}>
              <Image
                source={require('@/src/assets/images/welcome.png')}
                style={styles.image}
              />

              <ThemedView style={styles.titleContainer}>
                <Text type='subtitle' style={styles.title}>Create Your Account</Text>
                <HelloWave />
              </ThemedView>
          </View>
        }
    >
      <KeyboardAwareScrollView>
        <Form initialValues={{ name: '', email: '', password: '' }} onSubmit={handleSubmit} validationSchema={signupSchema}>
            <ActivityIndicator visible={auth.isAuthenticating} />
            
            <FormError error={auth.error} />

            <FormField 
                autoCapitalize="words"
                primaryIcon='user' 
                name="name" 
                label='Name' 
                placeholder="Enter name"
                keyboardType='name-phone-pad'
            />

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
            
            <View style={styles.buttonContainer}>
                <SubmitButton label="Sign Up" />
                
                <OrDivider />  
                
                <GoogleSignInButton label='Login with Google' />

                <Link href='/sign-in' asChild>
                  <TouchableOpacity style={styles.signinContainer}>
                    <Text type='default' style={styles.signinText}>
                      Already have an account? <Text type='default-semibold' style={styles.sigininTextCTA}>Log in</Text>
                    </Text>
                  </TouchableOpacity>
                </Link>
            </View>
        </Form>
      </KeyboardAwareScrollView>

      <EmailVerification />
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
    buttonContainer: { marginTop: 40 },
    headerContainer: { height: '100%', width: '100%' },
    signinContainer: { marginVertical: 40 },
    signinText: { color: APP_COLORS.GRAY, textAlign: 'center' },
    sigininTextCTA: { color: APP_COLORS.PRIMARY },
    title: { 
      color: APP_COLORS.WHITE, 
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

export default SignUpPage;
