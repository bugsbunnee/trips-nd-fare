import React, { useEffect, useMemo, useRef } from 'react';

import { View,  StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetModal, BottomSheetScrollView, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import * as yup from 'yup';

import { colors, icons, styles as defaultStyles } from '@/constants';
import { Text } from '@/components/ui';
import { Form, FormField, SubmitButton } from '@/components/forms';

import { useAppDispatch } from '@/store/hooks';
import { setLocationDetails } from '@/store/ride/slice';

interface FormValues {
    from: string;
    to: string;
}

const locationSchema = yup.object<FormValues>().shape({
	from: yup.string().required().label('From location'),
	to: yup.string().required().label('To location'),
});

const RidePage = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['40%', '60%'], []);

  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const handleSubmit = (location: FormValues) => {
    dispatch(setLocationDetails(location));
    router.push('/home/choose-rider');
  };

  const handleInputFocus = () => {
    bottomSheetModalRef.current?.snapToIndex(2);
  };

  const handleInputBlur = () => {
    bottomSheetModalRef.current?.snapToIndex(1);
  };

  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <View style={[styles.header, { paddingTop: insets.top }]}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <MaterialCommunityIcons name='arrow-left' size={icons.SIZES.NORMAL} color={colors.light.white} />
            </TouchableOpacity>

            <Text type='title' style={styles.title}>Ride</Text>
        </View>

        <TouchableOpacity style={[styles.backButton, styles.gps]}>
            <Ionicons name='locate' size={icons.SIZES.NORMAL} color={colors.light.white} />
        </TouchableOpacity>

        <BottomSheetModal style={styles.curved} animateOnMount enablePanDownToClose={false} ref={bottomSheetModalRef} index={1} snapPoints={snapPoints}>
            <KeyboardAwareScrollView>
                <BottomSheetScrollView style={styles.contentContainer}>
                    <Form initialValues={{ from: '', to: '' }} onSubmit={handleSubmit} validationSchema={locationSchema}>
                        <FormField 
                            autoCapitalize="none" 
                            primaryIcon='location-pin' 
                            label='From'
                            name='from'
                            width='100%' 
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            trailingButtonParams={{ icon: 'locate', onPress: () => {} }}
                            placeholder='From location'
                            containerStyle={styles.input} 
                        />

                        <FormField
                            primaryIcon='location-pin' 
                            label='To'
                            name='to'
                            width='100%' 
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            trailingButtonParams={{ icon: 'map-outline', onPress: () => {} }}
                            placeholder='To location'
                            containerStyle={styles.input} 
                        />
                        
                        <View style={styles.submitButton}>
                            <SubmitButton label="Find now" />
                        </View>
                    </Form>
                </BottomSheetScrollView>
            </KeyboardAwareScrollView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
    backButton: { 
        backgroundColor: colors.light.primary, 
        width: 40, 
        height: 40, 
        borderRadius: 40, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: colors.light.modalOpaque,
    },
    contentContainer: {
        flex: 1,
        paddingVertical: 24,
        paddingHorizontal: 16,
        backgroundColor: colors.light.white
    },
    curved: { 
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
    gps: { right: 16, position: 'absolute', top: '30%' },
    header: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    input: {
        backgroundColor: colors.light.input,
    },
    submitButton: { marginTop: 6 },
    title: {
        fontSize: 24,
        lineHeight: 28,
        color: colors.light.dark,
        fontFamily: defaultStyles.jakartaSemibold.fontFamily,
        fontWeight: defaultStyles.jakartaSemibold.fontWeight,
    },
});

export default RidePage;