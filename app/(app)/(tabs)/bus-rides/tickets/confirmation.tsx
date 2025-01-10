import React from 'react';

import { View,  StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';

import { useAppSelector } from '@/store/hooks';
import { Button, Text } from '@/components/ui';
import { colors, icons, styles as defaultStyles } from '@/constants';

const BookingConfirmationPage = () => {
    const rideDetails = useAppSelector((state) => state.ride);
    const insets = useSafeAreaInsets();

    const trackRide = () => {
        router.push('/home');
    };

    return (
        <View style={[styles.overlay, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <Link href='/' asChild>
                <Pressable style={StyleSheet.absoluteFill} />
            </Link>

            <View style={styles.center}>
                <View style={styles.content}>
                    <MaterialCommunityIcons name='check-circle' color={colors.light.success} size={icons.SIZES.XX_LARGE} />
                    
                    <View style={styles.contentInner}>
                        <Text type='subtitle' style={styles.modalTitle}>Booking placed successfully!</Text>
                        <Text type='default' style={styles.description}>Thank you for your booking! Your reservation has been successfully placed. Please proceed with your trip.</Text>
                    </View>
                    
                    <Button label='Go track' onPress={() => trackRide()} />
                    
                    <TouchableOpacity onPress={() => router.push('/')} style={styles.homeButton}>
                        <Text type='subtitle' style={styles.homeButtonText}>Back home</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    address: { color: colors.light.dark, fontSize: 15, lineHeight: 20 },
    backButton: { 
        backgroundColor: colors.light.white, 
        width: 40, 
        height: 40, 
        borderRadius: 40, 
        elevation: 0,
        zIndex: -1000,
        justifyContent: 'center', 
        alignItems: 'center'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: '90%',
        paddingHorizontal: 16,
        paddingVertical: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.light.white,
    },
    homeButton: { padding: 16, marginTop: 16, backgroundColor: colors.light.input, width: "100%", borderRadius: 50  },
    homeButtonText: { textAlign: 'center', color: colors.light.dark, lineHeight: 24, fontSize: 20 },
    modalTitle: { textAlign: 'center', fontSize: 28, lineHeight: 34 },
    overlay: {
        flex: 1,
        backgroundColor: colors.light.modalOpaque,
        elevation: 10,
        zIndex: 100
    },
    contentInner: { paddingHorizontal: 10, marginTop: 40 },
    description: {
        fontSize: 15,
        lineHeight: 20,
        marginTop: 14,
        marginBottom: 40
    },
    title: {
        fontSize: 24,
        lineHeight: 28,
        flex: 1,
        textAlign: 'center',
        color: colors.light.dark,
        fontFamily: defaultStyles.jakartaSemibold.fontFamily,
        fontWeight: defaultStyles.jakartaSemibold.fontWeight,
    },

});

export default BookingConfirmationPage;
