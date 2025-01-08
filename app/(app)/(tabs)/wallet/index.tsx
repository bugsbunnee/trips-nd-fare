import React, { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";

import Screen from "@/components/navigation/Screen";
import Transaction from "@/components/lists/Transaction";

import { colors, icons, styles as defaultStyles } from "@/constants";
import { DATE_FORMAT } from "@/constants/app";
import { Image, Text } from "@/components/ui";
import { formatAmount, formatDate, getTransactionStatusColors } from '@/utils/lib';
import { Transaction as TransactionModel } from "@/utils/models";

const WalletHomePage: React.FC = () => {
    const [activeTransaction, setActiveTransaction] = useState<TransactionModel | null>(null);

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['40%'], []);

    useEffect(() => {
        if (bottomSheetModalRef.current) {
            if (activeTransaction) bottomSheetModalRef.current.present();
            else bottomSheetModalRef.current.dismiss();
        }
    }, [activeTransaction]);

    const statusColors = useMemo(() => {
        if (activeTransaction) {
            return getTransactionStatusColors(activeTransaction.status);
        }

        return null
    }, [activeTransaction]);

    return ( 
        <BottomSheetModalProvider>
            <Screen style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.back}>
                        <MaterialCommunityIcons 
                            name='arrow-left' 
                            size={icons.SIZES.NORMAL} 
                            color={colors.light.primary}
                        />
                    </TouchableOpacity>

                    <View style={styles.flex}>
                        <Text type='default-semibold' style={styles.title}>Wallet</Text>
                    </View>
                </View>

                <LinearGradient
                    colors={[colors.light.dew, colors.light.primaryLight]}
                    style={styles.balanceContainer}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Image contentFit="cover" src={require('@/assets/images/polygons.png')} style={styles.image} />
                    
                    <View style={styles.balanceContainerPaddingHorizontal}>
                        <Text type='default' style={styles.balanceLabel}>Click Ride Cash</Text>
                        <Text type='default-semibold' style={styles.balanceValue}>{formatAmount(40000)}</Text>
                    </View>

                    <View style={styles.balanceAction}>
                        <TouchableOpacity style={styles.balanceActionButton}>
                            <MaterialCommunityIcons
                                name='plus'
                                size={icons.SIZES.SMALL}
                                color={colors.light.black}
                            />

                            <Text type='default' style={styles.balanceActionButtonText}>Add Funds</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.balanceActionButton}>
                            <MaterialCommunityIcons
                                name='share-variant'
                                size={icons.SIZES.SMALL}
                                color={colors.light.black}
                            />

                            <Text type='default' style={styles.balanceActionButtonText}>Share Funds</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
                
                <ScrollView>
                    <Text type='default-semibold' style={styles.sectionTitle}>Payment methods</Text>

                    <View style={{ marginTop: 25 }}>
                        <View style={styles.paymentMethod}>
                            <View style={styles.paymentMethodIcon}>
                                <FontAwesome
                                    name='cc-visa'
                                    size={icons.SIZES.LARGE}
                                    color='#1665c0'
                                />
                            </View>

                            <View style={styles.flex}>
                                <Text type='default' style={styles.paymentMethodLabel}>****** 4526</Text>
                            </View>
                        </View>
                        
                        <View style={styles.paymentMethod}>
                            <View style={styles.paymentMethodIcon}>
                                <FontAwesome
                                    name='cc-mastercard'
                                    size={icons.SIZES.LARGE}
                                    color='#1665c0'
                                />
                            </View>

                            <View style={styles.flex}>
                                <Text type='default' style={styles.paymentMethodLabel}>****** 4526</Text>
                            </View>
                        </View>
                    </View>

                    <Text type='default-semibold' style={styles.sectionTitle}>Transaction history</Text>

                    <View style={{ marginTop: 10 }}>
                        {transactions.map((transaction) => (
                            <Transaction
                                key={transaction.id}
                                onPress={() => setActiveTransaction(transaction)}
                                transaction={transaction}
                            />
                        ))}
                    </View>
                </ScrollView>
            </Screen>
    
            <BottomSheetModal onDismiss={() => setActiveTransaction(null)} style={[styles.curved, defaultStyles.shadow]} animateOnMount ref={bottomSheetModalRef} index={1} snapPoints={snapPoints}>
                <BottomSheetView style={{ padding: 16 }}>
                    {activeTransaction && (
                        <View style={styles.summary}>
                            <View style={styles.transfer}>
                                <Text type='default' style={styles.transferLabel}>Amount</Text>
                                <Text type='default' style={[styles.transferLabel, { color: colors.light.black }]}>{formatAmount(activeTransaction.amount)}</Text>
                            </View>
                            <View style={styles.transfer}>
                                <Text type='default' style={styles.transferLabel}>Status</Text>
                                {statusColors && (
                                    <View style={[{ backgroundColor: statusColors.bg, padding: 2 }]}>
                                        <Text type='default' style={[styles.transferLabel, { color: statusColors.text }]}>{activeTransaction.status}</Text>
                                    </View>
                                )}
                            </View>
                            <View style={styles.transfer}>
                                <Text type='default' style={styles.transferLabel}>Transaction type</Text>
                                <Text type='default' style={[styles.transferLabel, { color: colors.light.black }]}>{activeTransaction.transactionType}</Text>
                            </View>
                            <View style={styles.transfer}>
                                <Text type='default' style={styles.transferLabel}>Date</Text>
                                <Text type='default' style={[styles.transferLabel, { color: colors.light.black }]}>{formatDate(activeTransaction.date, DATE_FORMAT.DATE_MID)}</Text>
                            </View>
                            <View style={[styles.transfer, { borderBottomWidth: 0 }]}>
                                <Text type='default' style={styles.transferLabel}>Description</Text>
                                <Text type='default' style={[styles.transferLabel, { color: colors.light.black }]}>{activeTransaction.description}</Text>
                            </View>
                        </View>
                    )}
                </BottomSheetView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
     );
};

const transactions: TransactionModel[] = [
    {
        id: 1,
        status: 'success',
        description: 'Deposit into wallet',
        date: '2024-01-20',
        amount: 100000,
        transactionType: 'deposit'
    }
];

const styles = StyleSheet.create({
    back: {
        width: 40,
        height: 40,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.light.dew
    },
    balanceAction: { 
        marginTop: 19, 
        paddingBottom: 20,
        paddingLeft: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    balanceActionButton: {
        borderRadius: 90,
        backgroundColor: colors.light.white,
        padding: 6,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    balanceActionButtonText: {
        fontSize: 13,
        lineHeight: 16,
        color: colors.light.black,
        fontFamily: defaultStyles.urbanistBold.fontFamily
    },
    balanceContainer: { 
        marginTop: 24, 
        width: '100%',
        borderRadius: 20,
        paddingTop: 41
    },
    balanceContainerPaddingHorizontal: {
        paddingHorizontal: 20,
    },
    balanceLabel: {
        color: colors.light.primary,
        fontSize: 15,
        lineHeight: 18,
        textAlign: 'left',
        fontFamily: defaultStyles.urbanistMedium.fontFamily,
    },
    balanceValue: {
        color: colors.light.black,
        fontSize: 50,
        lineHeight: 60,
        textAlign: 'left',
        fontFamily: defaultStyles.urbanistBold.fontFamily,
    },
    container: {
        backgroundColor: colors.light.white,
        paddingLeft: 16,
        paddingRight: 16,
    },
    curved: { 
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        zIndex: 10
    },
    flex: { flex: 1 },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    image: {
        width: 108,
        height: 120,
        position: 'absolute',
        right: -20,
        top: -40,
    },
    paymentMethod: { 
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 18,
        marginBottom: 8
    },
    paymentMethodIcon: { maxWidth: 40 },
    paymentMethodLabel: {
        color: colors.light.dark,
        fontSize: 14,
        lineHeight: 16,
        textAlign: 'left',
        fontFamily: defaultStyles.urbanistRegular.fontFamily,
    },
    sectionTitle: {
        color: colors.light.black,
        fontSize: 20,
        lineHeight: 24,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        textAlign: 'left',
        marginTop: 29
    },
    title: {
        color: colors.light.dark,
        fontSize: 20,
        lineHeight: 28,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        textAlign: 'center'
    },
    summary: { borderWidth: 1, borderColor: '#E0E0E0', padding: 10, borderRadius: 20 },
    transfer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 11,
        borderBottomWidth: 1,
        borderBottomColor: colors.light.dew
    },
    transferLabel: {
        fontFamily: defaultStyles.jakartaMedium.fontFamily,
        fontSize: 15,
        lineHeight: 18,
        color: colors.light.graySemi
    },
});
 
export default WalletHomePage;