import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as yup from 'yup';
import 'yup-phone';

import { useAppSelector } from '@/store/hooks';
import { colors, styles as defaultStyles, icons } from '@/constants';

import ActivityIndicator from '@/components/ui/ActivityIndicator';
import Screen from '@/components/navigation/Screen';

import { Form, FormError, FormField, FormImagePicker, SubmitButton } from '@/components/forms';
import { Notification, Text } from '@/components/ui';


interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    images: string[];
    phoneNumber: string;
}

const profileSchema = yup.object<FormValues>().shape({
  firstName: yup.string().min(5, (data) => `First name must be at least ${data.min} characters`).required().label('Name'),
  lastName: yup.string().min(5, (data) => `Last name must be at least ${data.min} characters`).required().label('Name'),
	email: yup.string().email().required().label('Email Address'),
  images: yup.array().min(1, "Please select at least one image."),
  phoneNumber: yup.string().required()
});

const EditProfilePage = () => {
  const auth = useAppSelector((state) => state.auth);

  const handleSubmit = async (auth: FormValues) => {
    router.push('/account-verified');
  };

  return (
    <Screen style={styles.screen}>
      <StatusBar backgroundColor={colors.light.input} animated />
      <View style={styles.rowBetween}>
          <Text type='subtitle' style={styles.greeting}>Your profile</Text>
          <Notification hasUnread />
      </View>

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Form initialValues={{ firstName: '', lastName: '', email: '', phoneNumber: '', images: [] }} onSubmit={handleSubmit} validationSchema={profileSchema}>
            <ActivityIndicator visible={auth.isAuthenticating} />
            
            <FormError error={auth.error} />

            <View style={styles.image}>
              <FormImagePicker name='images' />
            </View>

            <View style={styles.content}>
              <FormField 
                  autoCapitalize="words"
                  icon='account-outline' 
                  name="firstName" 
                  editable={false}
                  labelStyle={styles.label}
                  label='First name' 
                  placeholder="Enter first name"
                  keyboardType='name-phone-pad'
              />
              
              <FormField 
                  autoCapitalize="words"
                  icon='account-outline' 
                  name="lastName" 
                  editable={false}
                  labelStyle={styles.label}
                  label='Last name' 
                  placeholder="Enter last name"
                  keyboardType='name-phone-pad'
              />

              <FormField 
                  labelStyle={styles.label}
                  autoCapitalize="none" 
                  name="email" 
                  editable={false}
                  label='Email' 
                  placeholder="Enter email address"
                  keyboardType='email-address'
              />

              <View style={{ width: '100%', marginBottom: 16 }}>
                <Text type='default' style={styles.label}>Email status</Text>
                <View style={styles.emailStatus}>

                  <View style={styles.emailStatusVerified}>
                    <MaterialCommunityIcons name='check' size={icons.SIZES.SMALL} color={colors.light.dark}  />
                    <Text type='default' style={styles.emailStatusText}>Verified</Text>
                  </View>
                </View>
              </View>

              <FormField 
                  labelStyle={styles.label}
                  autoCapitalize="none" 
                  name="phoneNumber" 
                  editable={false}
                  label='Phone number' 
                  placeholder="Enter phone number"
                  keyboardType='phone-pad'
              />
            </View>

            <View style={styles.button}>
              <SubmitButton label='Save changes' />
            </View>
        </Form>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
    button: { marginTop: 30, marginBottom: 130 },
    content: { backgroundColor: colors.light.white, borderRadius: 16, padding: 16, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', width: '100%' },
    greeting: { color: colors.light.dark , letterSpacing: 0.25 },
    headerContainer: { height: '100%', width: '100%' },
    label: { 
      color: colors.light.gray,
      fontSize: 15, 
      lineHeight: 20, 
      textAlign: 'left',
      marginBottom: 6,
      fontFamily: defaultStyles.medium.fontFamily, 
      fontWeight: defaultStyles.medium.fontWeight 
    },
    emailStatus: {
      borderWidth: 1,
      borderRadius: 100,
      borderColor: colors.light.input,
      backgroundColor: colors.light.input,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      width: '100%'
    },
    emailStatusVerified: { 
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      alignSelf: 'flex-start',
      gap: 4,
      paddingVertical: 3,
      paddingHorizontal: 16,
      backgroundColor: colors.light.successLight,
      borderWidth: 1,
      borderColor: colors.light.success, 
      borderRadius: 30 
    },
    emailStatusText: {
      color: colors.light.dark,
      fontSize: 15,
    },
    rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
    screen: { backgroundColor: colors.light.input, padding: 16 },
    signinContainer: { marginVertical: 40 },
    image: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 12, marginBottom: 32 }
});

export default EditProfilePage;
