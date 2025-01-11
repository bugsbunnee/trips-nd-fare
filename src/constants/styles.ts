import { StyleSheet } from "react-native";
import { APP_COLORS } from "./colors";

const jakartaFonts = StyleSheet.create({
    jakartaRegular: {
        fontFamily: 'PlusJakartaSansRegular',
        fontWeight: '400',
    },
    jakartaMedium: {
        fontFamily: 'PlusJakartaSansMedium',
        fontWeight: '500',
    },
    jakartaSemibold: {
        fontFamily: 'PlusJakartaSansSemiBold',
        fontWeight: '600',
    },
    jakartaBold: {
        fontFamily: 'PlusJakartaSansBold',
    },
    jakartaExtra: {
        fontFamily: 'PlusJakartaSansExtraBold',
    },
});

const urbanistFonts = StyleSheet.create({
    urbanistRegular: {
        fontFamily: 'UrbanistRegular',
        fontWeight: '400',
    },
    urbanistMedium: {
        fontFamily: 'UrbanistMedium',
        fontWeight: '500',
    },
    urbanistSemibold: {
        fontFamily: 'UrbanistSemiBold',
        fontWeight: '600',
    },
    urbanistBold: {
        fontFamily: 'UrbanistBold',
    },
    urbanistExtra: {
        fontFamily: 'UrbanistExtraBold',
    },
});

const styles = StyleSheet.create({
    ...jakartaFonts,
    ...urbanistFonts,
    title: {
        fontFamily: jakartaFonts.jakartaSemibold.fontFamily,
        fontWeight: jakartaFonts.jakartaSemibold.fontWeight,
        lineHeight: 33,
        fontSize: 28,
        letterSpacing: 0.1
    },
    body: {
        fontFamily: jakartaFonts.jakartaMedium.fontFamily,
        fontWeight: jakartaFonts.jakartaMedium.fontWeight,
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