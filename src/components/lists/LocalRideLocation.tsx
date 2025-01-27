
import React from "react";
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";

import { Image, Text } from "@/src/components/ui";
import { colors, styles as defaultStyles } from "@/src/constants";

import { formatAmount } from "@/src/utils/lib";
import { Route } from "@/src/store/data/slice";

interface Props {
    route: Route;
    onPress: () => void;
    style?: StyleProp<ViewStyle>
}

const LocalRideLocation: React.FC<Props> = ({ route, onPress, style }) => {
    return (  
        <TouchableOpacity style={[styles.container, defaultStyles.shadow, styles.shadow, style]} onPress={onPress}>
            <Image
                contentFit="cover"
                src={require("@/src/assets/images/map.png")}
                style={styles.image}
            />

            <View style={{ marginTop: 6 }}>
                <Text type="default-semibold" style={styles.label}>{route.route}</Text>
                <Text type="default-semibold">
                    <Text type="default" style={styles.sublabel}>Trips starting from </Text>
                    <Text type="default" style={[styles.sublabel, { color: colors.light.primary }]}>
                        {formatAmount(route.price)}
                    </Text>
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        padding: 6,
        alignSelf: 'flex-start',
        backgroundColor: colors.light.white,
        flex: 1,
        width: 129
    },
    image: { width: "100%", height: 91, borderRadius: 5 },
    label: {
        fontSize: 12,
        lineHeight: 14,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        color: colors.light.dark,
        marginBottom: 8,
    },
    shadow: { shadowRadius: 5, shadowOpacity: .2, shadowOffset: { width: 0, height: 0 }, marginBottom: 5 },
    sublabel: {
        fontSize: 10,
        lineHeight: 12,
        textAlign: "left",
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        marginTop: 8,
        color: colors.light.grayDeep
    },
})
 
export default LocalRideLocation;