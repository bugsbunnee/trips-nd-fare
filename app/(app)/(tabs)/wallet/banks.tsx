import React from "react";
import { StyleSheet, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { Button, Text } from "@/src/components/ui";
import { colors, icons, styles as defaultStyles } from "@/src/constants";

import Screen from "@/src/components/navigation/Screen";

const SelectBankPage: React.FC = () => {
    const { width } = useWindowDimensions();

    return ( 
        <Screen style={styles.screen}>
            <View style={styles.rowBetween}>
                <TouchableOpacity onPress={() => router.back()} style={styles.button}>
                    <MaterialCommunityIcons name="arrow-left"  size={icons.SIZES.NORMAL} color={colors.light.white} />
                </TouchableOpacity>

                <Text type='default-semibold' style={styles.greeting}>Select a preferred provider</Text>
            </View>

             <View style={styles.label}>
                <Text type='default-semibold' style={styles.title}>Setup ClikRide Wallet</Text>
                <Text type='default' style={styles.description}>
                    Configure your ClikRide wallet to allow you make payments, transfer funds and much more.
                </Text>
            </View>

            <View>
                <Button
                    onPress={() => {}}
                    label="Continue"
                />
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    button: { 
        width: 44,
        height: 44,
        borderRadius: 44,
        backgroundColor: colors.light.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    description: {
        fontSize: 17,
        fontFamily: defaultStyles.jakartaMedium.fontFamily,
        textAlign: 'center',
        lineHeight: 24,
        color: colors.light.gray,
        marginTop: 10
    },
    image: {
        height: 274,
        resizeMode: "contain"
    },
    label: { flex: 1, marginTop: 48, alignItems: 'center' },
    greeting: { color: colors.light.dark , letterSpacing: 0.25, fontSize: 24, flex: 1, textAlign: 'left' },
    rowBetween: { flexDirection: 'row', alignItems: 'center', gap: 24, justifyContent: 'flex-start', marginBottom: 10 },
    screen: { backgroundColor: colors.light.input, flex: 1, padding: 16 },
    title: {
        fontSize: 28,
        fontFamily: defaultStyles.jakartaBold.fontFamily,
        textAlign: 'center',
        lineHeight: 33,
        color: '#212121'
      },
});
 
export default SelectBankPage;