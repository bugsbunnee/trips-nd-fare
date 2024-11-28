import React from 'react';

import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import * as yup from 'yup';

import ParallaxScrollView from '@/components/ParallaxScrollView';

import { ThemedView } from '@/components/ThemedView';
import { Form, FormField, SubmitButton } from '@/components/forms';
import { GoogleSignInButton, HelloWave, OrDivider, Text } from '@/components/ui';

import { APP_COLORS } from '@/constants/colors';
import { Link } from 'expo-router';

interface FormValues {
    email: string;
    password: string;
}

const authSchema = yup.object<FormValues>().shape({
	email: yup.string().email().required().label('Email Address'),
	password: yup.string().required().label('Password'),
});

const SignInPage: React.FC = () => {
  const handleSubmit = (auth: FormValues) => {
    console.log(auth);
  };

  return (
    <ParallaxScrollView
        headerBackgroundColor={{ light: APP_COLORS.WHITE, dark: APP_COLORS.WHITE }}
        headerImage={
            <View style={styles.headerContainer}>
                <Image
                source={require('@/assets/images/welcome.png')}
                style={styles.image}
                />

                <ThemedView style={styles.titleContainer}>
                <Text type='subtitle' style={styles.title}>Welcome</Text>
                <HelloWave />
                </ThemedView>
            </View>
        }
    >
        <KeyboardAwareScrollView>
            <Form initialValues={{ email: '', password: '' }} onSubmit={handleSubmit} validationSchema={authSchema}>
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
                    <SubmitButton label="Sign In" />
                    
                    <OrDivider />  
                    
                    <GoogleSignInButton />

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

export default SignInPage;
