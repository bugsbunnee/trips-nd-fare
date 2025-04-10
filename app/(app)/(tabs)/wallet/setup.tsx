import React from "react";
import Screen from "@/src/components/navigation/Screen";
import { Alert, StyleSheet, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import ActivityIndicator from "@/src/components/ui/ActivityIndicator";

import { Button, Image, Text } from "@/src/components/ui";
import { colors, icons, styles as defaultStyles } from "@/src/constants";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { createVirtualAccount } from "@/src/store/data/actions";
import { getMessageFromError } from "@/src/utils/lib";
import storage from "@/src/utils/storage";

const SelectBankPage: React.FC = () => {
    const { width } = useWindowDimensions();
    const { isLoading } = useAppSelector((state) => state.data);

    const dispatch = useAppDispatch();
    
    const handleAccountCreation = async () => {
        try {
            const result = await dispatch(createVirtualAccount()).unwrap();
            if (result) storage.storeUser(result);

            router.push('/wallet/pending');
        } catch (error) {
            const message = getMessageFromError(error);
            Alert.alert('Error', message);
        }
    };

    return ( 
        <>
            <ActivityIndicator visible={isLoading} />
        
            <Screen style={styles.screen}>
                <View style={styles.rowBetween}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.button}>
                        <MaterialCommunityIcons name="arrow-left"  size={icons.SIZES.NORMAL} color={colors.light.white} />
                    </TouchableOpacity>

                    <Text type='default-semibold' style={styles.greeting}>Wallet</Text>
                </View>

                <View style={styles.imageContainer}>
                    <Image
                        src={require("@/src/assets/images/wallet.png")} 
                        style={[styles.image, { width: width * 0.7 }]}
                        contentFit="contain" 
                    />
                </View>

                <View style={styles.label}>
                    <View style={{ maxWidth: width * 0.8 }}>
                        <Text type='default-semibold' style={styles.title}>Setup ClikRide Wallet</Text>
                        <Text type='default' style={styles.description}>
                            Configure your ClikRide wallet to allow you make payments, transfer funds and much more.
                        </Text>
                    </View>
                </View>

                <View>
                    <Button
                        onPress={handleAccountCreation}
                        label="Continue"
                    />
                </View>
            </Screen>
        </>
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
    image: {
        height: 274,
        resizeMode: "contain"
    },
    label: { flex: 1, marginTop: 48, alignItems: 'center' },
    greeting: { color: colors.light.dark , letterSpacing: 0.25, fontSize: 24, flex: 1, textAlign: 'left' },
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
 
export default SelectBankPage;