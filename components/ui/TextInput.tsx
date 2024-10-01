import React, { useEffect, useState } from 'react';

import { TextInput, StyleSheet, View, TextInputProps, Platform, NativeSyntheticEvent, TextInputFocusEventData, DimensionValue, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
 
import ErrorMessage from '@/components/forms/ErrorMessage';
import Text from './Text';

import { colors, icons, styles as defaultStyles } from '@/constants';

export interface AppTextInputProps extends TextInputProps {
	icon?: string;
	width?: DimensionValue;
	label?: string;
	error?: string;
	containerStyle?: StyleProp<ViewStyle>;
	labelStyle?: StyleProp<TextStyle>
}

const AppTextInput: React.FC<AppTextInputProps> = ({
	width = '100%',
	error,
	label,
	icon,
	containerStyle,
	labelStyle,
	onBlur,
	onFocus,
	...otherProps
}) => {
	const [isFocused, setIsFocused] = useState(false);
	const [isVisible, setVisible] = useState(true);
	const [isEditable, setEditable] = useState(otherProps.editable);

	const getFocusedStyle = () => {
		return {
			width,
			borderColor: isFocused
				? colors.light.border
				: error ? colors.light.dangerLight : colors.light.input,
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

	const handleSetEditable = () => {
		const newEditable = !isEditable;
		if (newEditable) setIsFocused(true);
		
		setEditable(newEditable);
	};

	useEffect(() => {
		setVisible(!otherProps.secureTextEntry);
	}, [otherProps.secureTextEntry]);

	return (
		<View style={[styles.containerMargin, { width }]}>
			{label && <Text type='default-semibold' style={[styles.label, labelStyle]}>{label}</Text>}

			<View style={[styles.container, { width }, getFocusedStyle(), containerStyle]}>
				{icon && (
					<View style={styles.iconContainer}>
						<MaterialCommunityIcons 
							name={icon as any} 
							size={icons.SIZES.NORMAL} 
							color={colors.light.gray} />
					</View>
				)}

				<TextInput
					{...otherProps}
					editable={isEditable}
					style={styles.text}
					placeholderTextColor={colors.light.placeholder}
					selectionColor={colors.light.primary}
					onFocus={handleFocus}
					onBlur={handleBlur}
					secureTextEntry={!isVisible}
				/>

				{otherProps.secureTextEntry && (
					<TouchableOpacity style={styles.iconContainer} onPress={() => setVisible((prev) => !prev)}>
						<MaterialCommunityIcons 
							name={isVisible ? 'eye-outline' : 'eye-off-outline'}
							size={icons.SIZES.NORMAL} 
							color={colors.light.black} />
					</TouchableOpacity>
				)}
				
				{otherProps.editable 
					? null 
					: (
						<TouchableOpacity style={styles.iconContainer} onPress={() => handleSetEditable()}>
							<FontAwesome
								name='pencil-square-o'
								size={icons.SIZES.NORMAL} 
								color={colors.light.primary} />
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
		borderColor: colors.light.border,
		backgroundColor: colors.light.input,
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
		color: colors.light.dark,
		fontSize: 17,
		lineHeight: 24,
		marginBottom: 6,
	},
	text: {
		color: colors.light.dark,
		fontSize: 15,
		flex: 1,
		fontFamily: defaultStyles.semibold.fontFamily,
		fontWeight: defaultStyles.semibold.fontWeight,
	},
});

export default AppTextInput;
