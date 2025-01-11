import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Text } from "../ui";
import { colors, icons, styles as defaultStyles } from "@/src/constants";

interface Props {
    value?: string;
    placeholder: string;
    onPress: () => void;
}

const RidePicker: React.FC<Props> = ({ placeholder, value, onPress }) => {
    return ( 
        <TouchableOpacity onPress={onPress} style={styles.container}>
            {value ? (
                <Text type='default' style={styles.label}>{value}</Text>
            ) : (
                <Text type='default-semibold' style={styles.placeholder}>{placeholder}</Text>
            )}

            <MaterialCommunityIcons name='chevron-down' size={icons.SIZES.NORMAL} color={colors.light.primary} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, flexDirection: 'row', alignItems: 'center' },
    label: { fontSize: 13, color: colors.light.primary, lineHeight: 16, fontFamily: defaultStyles.jakartaSemibold.fontFamily, textTransform: 'capitalize' },
    placeholder: {
        color: colors.light.gray,
        fontSize: 13,
        lineHeight: 20,
		letterSpacing: 0.25,
        textAlign: 'left',
		fontFamily: defaultStyles.jakartaSemibold.fontFamily,
    },
});
 
export default RidePicker;