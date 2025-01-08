
import React, { useMemo } from 'react';

import { FormikHelpers } from 'formik';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as yup from 'yup';
import 'yup-phone';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { colors, styles as defaultStyles, icons } from '@/constants';
import { Form, FormError, FormField, FormImagePicker, SubmitButton } from '@/components/forms';
import { updateUser } from '@/store/auth/actions';
import { getFieldErrorsFromError } from '@/utils/lib';
import { Notification, Text } from '@/components/ui';

import ActivityIndicator from '@/components/ui/ActivityIndicator';
import Conditional from '@/components/common/Conditional';
import Screen from '@/components/navigation/Screen';

import storage from '@/utils/storage';


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

const EditProfilePage: React.FC = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleSubmit = async (auth: FormValues, helpers: FormikHelpers<FormValues>) => {
    const formData = new FormData();

    formData.append('firstName', auth.firstName);
    formData.append('lastName', auth.lastName);
    formData.append('email', auth.email);
    formData.append('phoneNumber', auth.phoneNumber); // @ts-ignore
    formData.append('profilePhoto', {
      name: `${auth.firstName}${auth.lastName}.jpg`,
      uri: auth.images[0],
      type: 'image/jpeg',
    });

    try {
      const result = await dispatch(updateUser(formData)).unwrap();
      if (result) storage.storeUser(result);

      router.back();
    } catch (error) {
      const fieldErrors = getFieldErrorsFromError(error);
      if (fieldErrors) helpers.setErrors(fieldErrors);
    }
  };

  const initialValues = useMemo(() => {
    return { 
        firstName: auth.user!.firstName, 
        lastName: auth.user!.lastName, 
        email: auth.user!.email, 
        phoneNumber: auth.user!.phoneNumber, 
        images: auth.user!.profilePhoto ? [auth.user!.profilePhoto] : [],
    };
  }, [auth.user]);

  return (
    <Screen style={styles.screen}>
      <View style={styles.rowBetween}>
          <Text type='subtitle' style={styles.greeting}>Your profile</Text>
          <Notification hasUnread />
      </View>

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Form initialValues={initialValues} onSubmit={handleSubmit} validationSchema={profileSchema}>
            <ActivityIndicator visible={auth.isAuthenticating} />
            
            <View style={styles.image}>
              <FormImagePicker name='images' />
            </View>

            <View style={styles.content}>
              <FormField 
                  autoCapitalize="words"
                  name="firstName" 
                  editable={false}
                  labelStyle={styles.label}
                  label='First name' 
                  placeholder="Enter first name"
                  keyboardType='name-phone-pad'
              />
              
              <FormField 
                  autoCapitalize="words"
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

              <View style={styles.email}>
                <Text type='default' style={styles.label}>Email status</Text>
                <View style={styles.emailStatus}>

                  <Conditional visible={auth.user!.isEmailVerified}>
                    <View style={styles.emailStatusVerified}>
                      <MaterialCommunityIcons name='check' size={icons.SIZES.SMALL} color={colors.light.dark}  />
                      <Text type='default' style={styles.emailStatusText}>Verified</Text>
                    </View>
                  </Conditional>
                  
                  <Conditional visible={!auth.user!.isEmailVerified}>
                    <View style={styles.emailStatusNotVerified}>
                      <MaterialCommunityIcons name='close' size={icons.SIZES.SMALL} color={colors.light.dark}  />
                      <Text type='default' style={styles.emailStatusText}>Not Verified</Text>
                    </View>
                  </Conditional>
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

            <FormError error={auth.error} />

            <View style={styles.button}>
              <SubmitButton label='Save changes' />
            </View>
        </Form>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
    button: { marginTop: 30, marginBottom: 50 },
    content: { backgroundColor: colors.light.white, borderRadius: 16, padding: 16, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', width: '100%' },
    email: { width: '100%', marginBottom: 16 },
    greeting: { color: colors.light.dark , letterSpacing: 0.25 },
    headerContainer: { height: '100%', width: '100%' },
    label: { 
      color: colors.light.gray,
      fontSize: 15, 
      lineHeight: 20, 
      textAlign: 'left',
      marginBottom: 6,
      fontFamily: defaultStyles.jakartaMedium.fontFamily, 
      fontWeight: defaultStyles.jakartaMedium.fontWeight 
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
    emailStatusNotVerified: { 
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      alignSelf: 'flex-start',
      gap: 4,
      paddingVertical: 3,
      paddingHorizontal: 16,
      backgroundColor: colors.light.dangerLight,
      borderWidth: 1,
      borderColor: colors.light.danger, 
      borderRadius: 30 
    },
    emailStatusText: {
      color: colors.light.dark,
      fontSize: 15,
    },
    rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
    screen: { backgroundColor: colors.light.input, padding: 16 },
    image: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 12, marginBottom: 32 }
});

export default EditProfilePage;
