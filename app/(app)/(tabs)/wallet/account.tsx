import React from "react";
import Screen from "@/src/components/navigation/Screen";

import * as Clipboard from 'expo-clipboard';

import { router } from "expo-router";
import { Button, Text } from "@/src/components/ui";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";

import { colors, icons, styles as defaultStyles } from "@/src/constants";
import { useAppSelector } from "@/src/store/hooks";

const WalletAccountPage: React.FC = () => {
    const { wallet } = useAppSelector((state) => state.auth);

    const handleCopyToClipboard = async () => {
        await Clipboard.setStringAsync(wallet!.account_number);

        Alert.alert('Copied', 'Account number copied to clipboard!');
    };

    const handleViewWallet = () => {
        router.push('/wallet');
    };

    return ( 
        <Screen style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.replace('/profile')} style={styles.back}>
                    <MaterialCommunityIcons 
                        name='arrow-left' 
                        size={icons.SIZES.NORMAL} 
                        color={colors.light.dark}
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleViewWallet} style={styles.action}>
                <View style={styles.actionIcon}>
                    <MaterialCommunityIcons name='bank' size={icons.SIZES.NORMAL} color={colors.light.dark} />
                </View>

                <View style={styles.flex}>
                    <Text type='default-semibold' style={styles.actionTitle}>Bank Transfer</Text>
                    <Text type='default-semibold' style={styles.actionDescription}>Transfer to external account.</Text>
                </View>

                <MaterialCommunityIcons name='chevron-right' size={icons.SIZES.SMALL} color={colors.light.primary} />

            </TouchableOpacity>

            <View style={styles.separatorContainer}>
                <View style={styles.separator} />

                <Text type='default-semibold' style={styles.separatorText}>OR</Text>
                <View style={styles.separator} />
            </View>
            
            <TouchableOpacity onPress={handleViewWallet} style={styles.action}>
                <View style={styles.actionIcon}>
                    <MaterialCommunityIcons name='transfer' size={icons.SIZES.NORMAL} color={colors.light.dark} />
                </View>

                <View style={styles.flex}>
                    <Text type='default-semibold' style={styles.actionTitle}>Fund Wallet</Text>
                    <Text type='default-semibold' style={styles.actionDescription}>Fund personal account</Text>
                </View>

                <MaterialCommunityIcons name='chevron-right' size={icons.SIZES.SMALL} color={colors.light.primary} />

            </TouchableOpacity>

            <View style={styles.details}>
                <View style={styles.account}>
                    <View style={styles.accountSection}>
                        <Text type='default-semibold' style={styles.accountName}>Account Name</Text>
                        <Text type='default-semibold' style={styles.accountNumber}>{wallet!.account_name}</Text>
                    </View>

                    <View style={styles.accountSection}>
                        <Text type='default-semibold' style={styles.accountName}>Account Number</Text>
                        <Text type='default-semibold' style={styles.accountNumber}>{wallet!.account_number}</Text>
                    </View>
                    
                    <View style={[styles.accountSection, { borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0}]}>
                        <Text type='default-semibold' style={styles.accountName}>Bank</Text>
                        <Text type='default-semibold' style={styles.accountNumber}>{wallet!.bank_name}</Text>
                    </View>
                </View>
            </View>

            <Button label="Copy Account Number" onPress={handleCopyToClipboard} />
        </Screen>
     );
};

const styles = StyleSheet.create({
    account: {
        backgroundColor: colors.light.dew,
        padding: 16,
        borderRadius: 4,
    },
    accountName: {
        fontSize: 14,
        lineHeight: 18,
        color: colors.light.gray,
        fontFamily: defaultStyles.urbanistMedium.fontFamily,
    },
    accountNumber: {
        fontSize: 18,
        lineHeight: 20,
        marginTop: 2,
        color: colors.light.dark,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        textTransform: 'capitalize'
    },
    accountSection: {
        paddingBottom: 10,
        marginBottom: 10,
    },
    action: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 12,
        borderRadius: 8,
        paddingHorizontal: 13,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.light.dew,
    },
    actionDescription: {
        fontSize: 14,
        color: colors.light.gray,
        fontFamily: defaultStyles.urbanistMedium.fontFamily,
        marginTop: 2,
        lineHeight: 20
    },
    actionIcon: {
        width: 40,
        height: 40,
        backgroundColor: colors.light.dew,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionTitle: {
        fontSize: 18,
        color: colors.light.dark,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
    },
    back: {
        width: 40,
        height: 40,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.light.dew
    },
    container: {
        backgroundColor: colors.light.white,
        padding : 16,
    },
    details: {
        marginVertical: 24
    },
    flex: { flex: 1 },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 16,
        gap: 16
    },
    separator: {
        flex: 1,
        height: 1,
        maxWidth: 50,
        backgroundColor: colors.light.dew
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        marginVertical: 16,
    },
    separatorText: {
        fontSize: 12,
        color: colors.light.dark,
        lineHeight: 18,
        fontFamily: defaultStyles.urbanistMedium.fontFamily,
    },
    title: {
        color: colors.light.dark,
        fontSize: 20,
        lineHeight: 28,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        textAlign: 'left'
    },
});

export default WalletAccountPage;