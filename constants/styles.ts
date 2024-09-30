import { StyleSheet } from "react-native";
import { APP_COLORS } from "./colors";

const fonts = StyleSheet.create({
    regular: {
        fontFamily: 'PlusJakartaSansRegular',
        fontWeight: '400',
    },
    medium: {
        fontFamily: 'PlusJakartaSansMedium',
        fontWeight: '500',
    },
    semibold: {
        fontFamily: 'PlusJakartaSansSemiBold',
        fontWeight: '600',
    },
    bold: {
        fontFamily: 'PlusJakartaSansBold',
        fontWeight: '700',
    },
    extra: {
        fontFamily: 'PlusJakartaSansExtraBold',
        fontWeight: '800',
    },
});

const styles = StyleSheet.create({
    ...fonts,
    title: {
        fontFamily: fonts.semibold.fontFamily,
        fontWeight: fonts.semibold.fontWeight,
        lineHeight: 33,
        fontSize: 28,
        letterSpacing: 0.1
    },
    body: {
        fontFamily: fonts.medium.fontFamily,
        fontWeight: fonts.medium.fontWeight,
        color: APP_COLORS.GRAY,
        textAlign: 'center',
        lineHeight: 24,
        fontSize: 17,
        letterSpacing: 0.1
    },
    shadow: {
		shadowColor: APP_COLORS.SHADOW,
		shadowOffset: {
			width: 0,
			height: 6,
		},
		shadowOpacity: 0.37,
		shadowRadius: 20.49,
		elevation: 12,
	},
});

export default styles;