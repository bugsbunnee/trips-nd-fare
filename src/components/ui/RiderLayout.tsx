import React, { PropsWithChildren, useEffect, useMemo, useRef } from 'react';

import { View,  StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { useReducedMotion } from 'react-native-reanimated';

import { colors, icons, styles as defaultStyles } from '@/src/constants';
import { setLocationFrom } from '@/src/store/ride/slice';
import { useAppDispatch } from '@/src/store/hooks';

import Text from '@/src/components/ui/Text';
import useLocation from '@/src/hooks/useLocation';

interface Props extends PropsWithChildren {
    Map: React.FC;
    label: string;
    allowMapRecenter?: boolean;
}

const RiderLayout: React.FC<Props> = ({ allowMapRecenter = false, children, label, Map }) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const coordinates = useLocation();
    const dispatch = useAppDispatch();
    const insets = useSafeAreaInsets();
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        if (bottomSheetModalRef.current) {
            bottomSheetModalRef.current.present();
        }
    }, []);
   
    const snapPoints = useMemo(() => {
        return ['50%', '65%'];
    }, []);

    return (
        <BottomSheetModalProvider>
            <View style={styles.container}>
                <View style={styles.flex}>
                    <View style={styles.map}>
                        {<Map />}
                    </View>

                    <View style={[styles.header, styles.horizontalPadding, { top: insets.top, position: 'absolute' }]}>
                        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                            <MaterialCommunityIcons name='arrow-left' size={icons.SIZES.NORMAL} color={colors.light.white} />
                        </TouchableOpacity>

                        <Text type='title' style={styles.title}>{label}</Text>
                    </View>

                    {allowMapRecenter && coordinates && (
                        <TouchableOpacity 
                            onPress={() => dispatch(setLocationFrom(coordinates))} 
                            style={[styles.backButton, styles.gps]}
                        >
                            <Ionicons name='locate' size={icons.SIZES.NORMAL} color={colors.light.white} />
                        </TouchableOpacity>
                    )}
                </View>

                <BottomSheetModal 
                    index={0} 
                    snapPoints={snapPoints} 
                    ref={bottomSheetModalRef}
                    style={styles.modal} 
                    animateOnMount={!reducedMotion}
                    enablePanDownToClose={false} 
                >
                    <BottomSheetView style={[styles.content, { paddingBottom: insets.bottom }]}>
                        <BottomSheetScrollView keyboardShouldPersistTaps='always'>
                            {children}
                        </BottomSheetScrollView>
                    </BottomSheetView>
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
    },
    content: {
        backgroundColor: colors.light.white,
        flex: 1,
    },
    modal: { 
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
    flex: { flex: 1 },
    gps: { right: 16, position: 'absolute', top: '30%' },
    horizontalPadding: { paddingHorizontal: 16 },
    header: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    input: {
        backgroundColor: colors.light.input,
    },
    map: {
        flex: 1,
        width: '100%'
    },
    title: {
        fontSize: 24,
        lineHeight: 28,
        color: colors.light.dark,
        textTransform: 'capitalize',
        fontFamily: defaultStyles.jakartaSemibold.fontFamily,
        fontWeight: defaultStyles.jakartaSemibold.fontWeight,
    },
});

export default RiderLayout;