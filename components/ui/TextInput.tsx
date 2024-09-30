import React, { useEffect, useState } from 'react';

import { TextInput, StyleSheet, View, TextInputProps, Platform, NativeSyntheticEvent, TextInputFocusEventData, DimensionValue, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
 
import ErrorMessage from '@/components/forms/ErrorMessage';
import Text from './Text';

import { icons, styles as defaultStyles } from '@/constants';
import { APP_COLORS } from '@/constants/colors';

export interface AppTextInputProps extends TextInputProps {
	icon?: string;
	width?: DimensionValue;
	label?: string;
	error?: string;
	containerStyle?: StyleProp<ViewStyle>;
}

const AppTextInput: React.FC<AppTextInputProps> = ({
	width = '100%',
	error,
	label,
	icon,
	containerStyle,
	onBlur,
	onFocus,
	...otherProps
}) => {
	const [isFocused, setIsFocused] = useState(false);
	const [isVisible, setVisible] = useState(true);

	const getFocusedStyle = () => {
		return {
			width,
			borderColor: isFocused
				? APP_COLORS.BORDER
				: error ? APP_COLORS.DANGER_LIGHT : APP_COLORS.INPUT,
		};
	};

	const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		if (onBlur) onBlur(e);
		setIsFocused(false);
	};

	const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		if (onFocus) onFocus(e);
		setIsFocused(true);
	};

	useEffect(() => {
		setVisible(!otherProps.secureTextEntry);
	}, [otherProps.secureTextEntry])

	return (
		<View style={[styles.containerMargin, { width }]}>
			{label && <Text type='default-semibold' style={styles.label}>{label}</Text>}

			<View style={[styles.container, { width }, getFocusedStyle(), containerStyle]}>
				{icon && (
					<View style={styles.iconContainer}>
						<MaterialCommunityIcons 
							name={icon as any} 
							size={icons.SIZES.NORMAL} 
							color={APP_COLORS.GRAY} />
					</View>
				)}

				<TextInput
					{...otherProps}
					style={styles.text}
					placeholderTextColor={APP_COLORS.PLACEHOLDER}
					selectionColor={APP_COLORS.PRIMARY}
					onFocus={handleFocus}
					onBlur={handleBlur}
					secureTextEntry={!isVisible}
				/>

				{otherProps.secureTextEntry && (
					<TouchableOpacity style={styles.iconContainer} onPress={() => setVisible((prev) => !prev)}>
						<MaterialCommunityIcons 
							name={isVisible ? 'eye-outline' : 'eye-off-outline'}
							size={icons.SIZES.NORMAL} 
							color={APP_COLORS.BLACK} />
					</TouchableOpacity>
				)}
			</View>

			<ErrorMessage isVisible={!!error} errorMessage={error} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderRadius: 100,
		borderColor: APP_COLORS.BORDER,
		backgroundColor: APP_COLORS.INPUT,
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 12,
		paddingHorizontal: 16,
	},
	containerMargin: {
		marginBottom: 16,
	},
	iconContainer: {
		marginRight: 10,
	},
	label: {
		color: APP_COLORS.DARK,
		fontSize: 17,
		lineHeight: 24,
		marginBottom: 6,
	},
	text: {
		color: APP_COLORS.DARK,
		fontSize: 15,
		flex: 1,
		fontFamily: defaultStyles.semibold.fontFamily,
		fontWeight: defaultStyles.semibold.fontWeight,
	},
});

export default AppTextInput;
