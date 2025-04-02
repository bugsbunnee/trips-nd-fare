import React from "react";
import LottieView from "lottie-react-native";
import Screen from "@/src/components/navigation/Screen";

import { StyleSheet, useWindowDimensions, View } from "react-native";
import { router } from "expo-router";

import { Button, Text } from "@/src/components/ui";
import { colors, styles as defaultStyles } from "@/src/constants";

const WalletPendingPage: React.FC = () => {
    const { width } = useWindowDimensions();

    return ( 
        <Screen style={styles.screen}>
            <View style={styles.imageContainer}>
                <LottieView
                    autoPlay
                    loop
                    onAnimationFinish={() => {}}
                    source={require("@/src/assets/animations/done.json")}
                    style={styles.animation}
                />
            </View>

             <View style={styles.label}>
                <View style={{ maxWidth: width * 0.8 }}>
                    <Text type='default-semibold' style={styles.title}>In Progress</Text>
                    <Text type='default' style={styles.description}>
                        Your wallet setup is in progress. We'll notify you once this is completed.
                    </Text>
                </View>
            </View>

            <View>
                <Button
                    onPress={() => router.replace('/profile')}
                    label="Continue"
                />
            </View>
        </Screen>
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
 
export default WalletPendingPage;