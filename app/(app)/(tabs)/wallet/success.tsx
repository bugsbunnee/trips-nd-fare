import React from "react";
import LottieView from "lottie-react-native";

import ActivityIndicator from "@/src/components/ui/ActivityIndicator";
import Screen from "@/src/components/navigation/Screen";

import { router } from "expo-router";
import { Alert, StyleSheet, useWindowDimensions, View } from "react-native";

import { Button, Text } from "@/src/components/ui";
import { colors, styles as defaultStyles } from "@/src/constants";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { updateVirtualAccount } from "@/src/store/data/actions";
import { getMessageFromError } from "@/src/utils/lib";

const WalletSuccessPage: React.FC = () => {
    const { width } = useWindowDimensions();
    const { isLoading } = useAppSelector((state) => state.data);

    const dispatch = useAppDispatch();

    const handleProceed = async () => {
        try {
            await dispatch(updateVirtualAccount()).unwrap();
            router.push('/wallet');
        } catch (error) {
            const message = getMessageFromError(error);
            Alert.alert('Error', message);
        }
    };

    return ( 
        <>
            <ActivityIndicator visible={isLoading} />

            <Screen style={styles.screen}>
                <View style={styles.imageContainer}>
                    <LottieView
                        autoPlay
                        loop
                        onAnimationFinish={() => {}}
                        source={require("@/src/assets/animations/tick.json")}
                        style={styles.animation}
                    />
                </View>

                <View style={styles.label}>
                    <View style={{ maxWidth: width * 0.8 }}>
                        <Text type='default-semibold' style={styles.title}>Wallet Creation Successful!</Text>
                        <Text type='default' style={styles.description}>
                            Your wallet has been setup successfully! Start making transactions now.
                        </Text>
                    </View>
                </View>

                <View>
                    <Button
                        onPress={handleProceed}
                        label="Continue"
                    />
                </View>
            </Screen>
        </>
    );
};

const styles = StyleSheet.create({
    animation: {
        width: 200,
        height: 200,
    },
    button: { 
        width: 44,
        height: 44,
        borderRadius: 44,
        backgroundColor: colors.light.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    description: {
        fontSize: 17,
        fontFamily: defaultStyles.jakartaMedium.fontFamily,
        textAlign: 'center',
        lineHeight: 24,
        color: colors.light.gray,
        marginTop: 10
    },
    label: { flex: 1, marginTop: 48, alignItems: 'center' },
    rowBetween: { flexDirection: 'row', alignItems: 'center', gap: 24, justifyContent: 'flex-start', marginBottom: 10 },
    screen: { flex: 1, padding: 16 },
    title: {
        fontSize: 28,
        fontFamily: defaultStyles.jakartaBold.fontFamily,
        textAlign: 'center',
        lineHeight: 33,
        color: '#212121'
      },
});
 
export default WalletSuccessPage;