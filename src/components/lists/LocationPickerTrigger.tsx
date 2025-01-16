import React from 'react';

import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
 
import Text from '@/src/components/ui/Text';

import { colors, icons, styles as defaultStyles } from '@/src/constants';
import { PickerProps } from './PickerTrigger';

export interface Props extends PickerProps {
	icon: string;
}

const LocationPickerTrigger: React.FC<Props> = ({ 
	icon,
	value,
	placeholder,
	onPress
 }) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.container}>
			{icon && (
				<View style={styles.iconContainer}>
					<SimpleLineIcons 
						name={icon as any} 
						size={icons.SIZES.NORMAL} 
						color={colors.light.primary} />
				</View>
			)}

			{value ? (
				<Text type='default-semibold' style={styles.text}>{value}</Text>
			) : (
				<Text type='default-semibold' style={[styles.text, styles.placeholder]}>{placeholder}</Text>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 100,
		backgroundColor: colors.light.input,
		flexDirection: 'row',
		alignItems: 'center',
		height: 48,
		width: '100%',
		paddingHorizontal: 16,
	},
	iconContainer: {
		marginRight: 10,
	},
	placeholder: {
		color: colors.light.placeholder,
	},
	text: {
		color: colors.light.dark,
		fontSize: 16,
		flex: 1,
		fontFamily: defaultStyles.urbanistBold.fontFamily,
	},
});

export default LocationPickerTrigger;
