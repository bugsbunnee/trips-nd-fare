import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNetInfo } from "@react-native-community/netinfo";

import { colors, icons, styles as defaultStyles } from "@/src/constants";
import { Text } from "../ui";

const OfflineNotice: React.FC = () => {
    const { top } = useSafeAreaInsets();
    const { isConnected } = useNetInfo();

    if (isConnected) {
        return null;
    }
    
    return ( 
        <View style={[styles.container, { paddingTop: top }]}>
            <MaterialCommunityIcons
                name='network-off'
                size={icons.SIZES.SMALL}
                color={colors.light.white}
            />

            <Text type='default-semibold' style={styles.text}>No internet connection</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.light.primary,
        padding: 16,
        width: '100%',
        zIndex: 99999999,
        elevation: 20,
        position: 'absolute',
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    text: {
        textAlign: 'center',
        fontFamily: defaultStyles.urbanistMedium.fontFamily,
        fontSize: 18,
        color: colors.light.white,
    },
});
 
export default OfflineNotice;