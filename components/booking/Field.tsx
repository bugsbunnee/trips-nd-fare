import React from 'react';

import { TextInput, StyleSheet, View, TextInputProps, DimensionValue } from 'react-native';
import { colors, styles as defaultStyles } from '@/constants';

import ErrorMessage from '@/components/forms/ErrorMessage';
import Text from '../ui/Text';

export interface Props extends TextInputProps {
	width?: DimensionValue;
	label?: string;
	error?: string;
}

const BookingField: React.FC<Props> = ({
	width = '100%',
	label,
	error,
	...otherProps
}) => {
	return (
        <View style={styles.margin}>
            <View style={[styles.container, { width }]}>
                {label && <Text type='default-semibold' style={styles.label}>{label}</Text>}

                <View style={styles.input}>
                    <TextInput
                        {...otherProps}
                        style={styles.text}
                        placeholderTextColor={colors.light.placeholder}
                        selectionColor={colors.light.primary}
                    />
                </View>
            </View>

            {error && (
                <Text type='default-semibold' style={styles.error}>
                    {error}
                </Text>
            )}
        </View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 8,
		backgroundColor: colors.light.dew,
		paddingVertical: 8,
		paddingHorizontal: 12,
	},
    error: {
		color: colors.light.danger,
		fontSize: 13,
		letterSpacing: 0.5,
		textAlign: 'left',
        marginTop: 4
	},
    margin: {
        marginBottom: 12,
    },
    input: {
        marginTop: 7
    },
	text: {
        color: colors.light.dark,
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

export default BookingField;
