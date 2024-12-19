import React, { useCallback, useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { StyleSheet, View, DimensionValue, TouchableOpacity } from 'react-native';
import { colors, styles as defaultStyles } from '@/constants';
import { formatDate } from '@/utils/lib';

import ErrorMessage from '@/components/forms/ErrorMessage';
import Text from '../ui/Text';

export interface DatePickerProps {
	width?: DimensionValue;
	label?: string;
	error?: string;
    minimumDate?: Date;
    value: Date;
    placeholder: string;
    format: string;
    mode: "date" | "datetime" | "countdown" | "time";
    onPress: () => void;
    onChange: (value: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
	width = '100%',
	label,
	error,
	...otherProps
}) => {
    const [isPickerVisible, setPickerVisible] = useState(false);

    const handleChange = useCallback((event: DateTimePickerEvent, selectedDate?: Date) => {
        setPickerVisible(false);
        if (selectedDate) otherProps.onChange(selectedDate);
    }, []);

    const handleTap = useCallback(() => {
        otherProps.onPress();
        setPickerVisible(true);
    }, []);

	return (
        <View style={styles.margin}>
            <TouchableOpacity style={[styles.container, { width }]} onPress={handleTap}>
                {label && <Text type='default-semibold' style={styles.label}>{label}</Text>}

                <View style={styles.input}>
                    {otherProps.value ? (
                        <Text type='default-semibold' style={styles.text}>
                            {formatDate(otherProps.value, otherProps.format)}
                        </Text>
                    ) : (
                        <Text type='default-semibold' numberOfLines={1} style={[styles.text, styles.placeholder]}>
                            {otherProps.placeholder}
                        </Text>
                    )}
                    
                </View>
            </TouchableOpacity>

            {isPickerVisible && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={otherProps.value}
                    mode={otherProps.mode}
                    minimumDate={otherProps.minimumDate}
                    is24Hour
                    onChange={handleChange}
                    style={{ marginVertical: 10 }}
                />
            )}

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
        height: 70
	},
    error: {
		color: colors.light.danger,
		fontSize: 13,
        lineHeight: 16,
		letterSpacing: 0.5,
		textAlign: 'left',
        marginTop: 4
	},
    input: {
        marginTop: 7
    },
    margin: {
        marginBottom: 12,
    },
	text: {
        color: colors.light.dark,
        fontSize: 15,
        lineHeight: 18,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
    },
	placeholder: {
        color: colors.light.grayDeep,
    },
    label: {
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        fontSize: 10,
        lineHeight: 12,
        color: colors.light.grayDeep
    },
});

export default DatePicker;
