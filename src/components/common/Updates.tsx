import React, { useEffect } from "react";
import * as ExpoUpdates from 'expo-updates';

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Conditional from "./Conditional";
import { colors, icons, styles as defaultStyles } from "@/src/constants";
import { Text } from "../ui";

const Updates: React.FC = () => {
    const { top: paddingTop } = useSafeAreaInsets();
    const { isUpdateAvailable, isDownloading, isUpdatePending } = ExpoUpdates.useUpdates();
    
    useEffect(() => {
        if (isUpdatePending) {
          ExpoUpdates.reloadAsync();
        }
    }, [isUpdatePending]);

    if (isUpdateAvailable) {
        return ( 
            <View style={[styles.container, { paddingTop }]}>
                <MaterialCommunityIcons
                    name='update'
                    size={icons.SIZES.SMALL}
                    color={colors.light.white}
                />
    
                <Text type='default-semibold' style={[styles.text, styles.flex]}>Updates available</Text>
    
                <Conditional visible={!isDownloading}>
                    <TouchableOpacity onPress={ExpoUpdates.fetchUpdateAsync} style={styles.download}>
                        <MaterialCommunityIcons
                            name='download'
                            size={icons.SIZES.SMALL}
                            color={colors.light.primary}
                        />
    
                        <Text type='default-semibold' style={[styles.text, styles.primary]}>download</Text>
                    </TouchableOpacity>
                </Conditional>
    
                <Conditional visible={isDownloading}>
                    <ActivityIndicator
                        animating
                        size='small'
                        color={colors.light.white}
                    />
                </Conditional>
            </View>
        );
    }

    return null;
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
    download: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        padding: 8,
        backgroundColor: colors.light.white,
        borderRadius: 30,
    },
    flex: {
        flex: 1,
    },
    text: {
        textAlign: 'left',
        fontFamily: defaultStyles.urbanistMedium.fontFamily,
        fontSize: 16,
        color: colors.light.white,
    },
    primary: {
        color: colors.light.primary,
    }
});
 
export default Updates;