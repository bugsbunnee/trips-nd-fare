import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, DimensionValue } from "react-native";

import { Text } from "@/components/ui";
import { colors, styles as defaultStyles } from '@/constants';

export interface PickerProps {
    label?: string;
    value?: string;
    width?: DimensionValue;
    placeholder: string;
    onPress: () => void;
}

const PickerTrigger: React.FC<PickerProps> = ({
  label,
  value,
  placeholder,
  width = '100%',
  onPress
}) => {

  return (
    <TouchableWithoutFeedback style={styles.picker} onPress={onPress}>
        <View style={[styles.container, styles.picker, { width }]}>
            {label && <Text type='default-semibold' style={styles.label}>{label}</Text>}

            <View style={styles.input}>
                {value ? (
                    <Text type='default-semibold' style={styles.text}>{value}</Text>
                ) : (
                    <Text type='default-semibold' style={styles.placeholder}>{placeholder}</Text>
                )}
            </View>
        </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
    container: {
		borderRadius: 8,
		backgroundColor: colors.light.dew,
		paddingVertical: 8,
		paddingHorizontal: 12,
        height: 70
    },
    placeholder: {
        color: colors.light.placeholder,
        fontSize: 15,
        lineHeight: 20,
		letterSpacing: 0.25,
		flex: 1,
        textAlign: 'left',
		fontFamily: defaultStyles.urbanistBold.fontFamily,
    },
    picker: {
		marginBottom: 12,
    },
    input: {
        marginTop: 7,
        flex: 1,
    },
	text: {
        color: colors.light.dark,
        textAlign: 'left',
        fontSize: 15,
        lineHeight: 18,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
    },
    label: {
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        fontSize: 10,
        lineHeight: 12,
        color: colors.light.grayDeep
    },
});

export default PickerTrigger;
