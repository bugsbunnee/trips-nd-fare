import React from 'react';

import { StyleSheet, View } from 'react-native';
import { APP_COLORS } from '@/src/constants/colors';

import Text from '@/src/components/ui/Text';


interface ErrorMessageProps {
	errorMessage?: string;
	isVisible: boolean;
}

const ErrorMessage = (props: ErrorMessageProps) => {
	if (!props.isVisible || !props.errorMessage) return null;

	return (
		<View style={styles.container}>
			<Text type='default-semibold' style={styles.text}>{props.errorMessage}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 5,
	},
	text: {
		color: APP_COLORS.DANGER,
		fontSize: 13,
		letterSpacing: 0.5,
		textAlign: 'left',
	},
});

export default ErrorMessage;
