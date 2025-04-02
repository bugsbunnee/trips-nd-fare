import React from "react";
import Screen from "@/src/components/navigation/Screen";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, useWindowDimensions, View } from "react-native";

import { Button, Image, Text } from "@/src/components/ui";
import { colors, icons, styles as defaultStyles } from "@/src/constants";

const ComingSoonPage: React.FC = () => {
    const { width } = useWindowDimensions();

    return ( 
        <Screen style={styles.screen}>
            <View style={styles.rowBetween}>
                <TouchableOpacity onPress={() => router.back()} style={styles.button}>
                    <MaterialCommunityIcons name="arrow-left"  size={icons.SIZES.NORMAL} color={colors.light.white} />
                </TouchableOpacity>
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
                    <Text type='default-semibold' style={styles.title}>Ferry Trips</Text>
                    <Text type='default' style={styles.description}>
                        Book jetties and ferry rides from the comfort of your home. Coming soon.
                    </Text>
                </View>
            </View>

            <View>
                <Button
                    onPress={() => router.push('/(app)/(tabs)/home')}
                    label="Explore other options"
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
 
export default ComingSoonPage;