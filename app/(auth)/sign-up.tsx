import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Link, router } from 'expo-router';

import * as yup from 'yup';
import YupPassword from 'yup-password'

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { APP_COLORS } from '@/constants/colors';
import { loginUser } from '@/store/auth/actions';
import { User } from '@/utils/models';

import ActivityIndicator from '@/components/ui/ActivityIndicator';
import ParallaxScrollView from '@/components/ParallaxScrollView';

import { ThemedView } from '@/components/ThemedView';
import { Form, FormError, FormField, SubmitButton } from '@/components/forms';
import { GoogleSignInButton, HelloWave, OrDivider, Text } from '@/components/ui';

import storage from '@/utils/storage';

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

const SignUpPage = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleSubmit = async (auth: FormValues) => {
    const result = await dispatch(loginUser(auth));
    if (loginUser.fulfilled.match(result)) {
      await storage.storeUser(result.payload as unknown as User);
    }

    router.push('/account-verified');
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
                icon='user' 
                name="name" 
                label='Name' 
                placeholder="Enter name"
                keyboardType='name-phone-pad'
            />

            <FormField 
                autoCapitalize="none" 
                icon='envelope' 
                name="email" 
                label='Email' 
                placeholder="Enter email address"
                keyboardType='email-address'
            />

            <FormField 
                icon='lock' 
                name="password" 
                label='Password' 
                placeholder="Enter password"
                secureTextEntry
            />
            
            <View style={styles.buttonContainer}>
                <SubmitButton label="Sign Up" />
                
                <OrDivider />  
                
                <GoogleSignInButton />

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
