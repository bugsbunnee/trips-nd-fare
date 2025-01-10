import React from "react";

import { SimpleLineIcons } from "@expo/vector-icons";
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { colors, icons, styles as defaultStyles } from "@/constants";
import { Location } from "@/utils/models";
import { Text } from ".";

export interface GoogleTextInputProps {
    leftIcon?: string;
    rightIcon?: string;
    initialLocation?: string;
    label?: string;
    placeholder: string;
    containerStyle?: StyleProp<ViewStyle>;
    placeholderStyle?: StyleProp<TextStyle>;
    onPress: (location: Location) => void;
}

const GoogleTextInput: React.FC<GoogleTextInputProps> = ({ containerStyle, initialLocation, label, placeholderStyle, leftIcon, rightIcon, placeholder, onPress }) => {
  return (
    <View>
       {label && <Text type='default-semibold' style={[styles.label]}>{label}</Text>}

        <GooglePlacesAutocomplete
            fetchDetails
            placeholder={placeholder}
            debounce={200}
            styles={{
                textInputContainer: [styles.textInputContainer, containerStyle],
                textInput: styles.textInput,
                listView: [styles.listView],
                description: styles.description,
            }}
            onPress={(data, details = null) => onPress({
                address: data.description,
                latitude: details?.geometry.location.lat!,
                longitude: details?.geometry.location.lng!,
            })}
            query={{
                key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
                language: "en",
            }}
            renderLeftButton={leftIcon ? () => (
                <View>
                    <SimpleLineIcons
                        name={leftIcon as any}
                        size={icons.SIZES.NORMAL} 
                        color={colors.light.gray} 
                    />
                </View>
            ) : undefined}
            renderRightButton={rightIcon ? () => (
                <View>
                    <SimpleLineIcons
                        name={rightIcon as any}
                        size={icons.SIZES.NORMAL} 
                        color={colors.light.dark} 
                    />
                </View>
            ) : undefined}
            textInputProps={{ 
                placeholder: initialLocation ?? placeholder, 
                style: [styles.placeholder, placeholderStyle],
                placeholderTextColor: initialLocation ? colors.light.dark : colors.light.placeholder
            }}
        />
     </View>
  );
};

const styles = StyleSheet.create({
    description: {
        color: colors.light.dark,
        fontSize: 13,
        letterSpacing: 0.25,
        flex: 1,
        fontFamily: defaultStyles.urbanistMedium.fontFamily,
    },
    label: {
		color: colors.light.dark,
		fontSize: 17,
		lineHeight: 24,
		marginBottom: 6,
	},
    listView: {
        marginVertical: 16,
        minHeight: 150,
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.light.dew
    },
    placeholder: { flex: 1, marginLeft: 12 },
    textInput: {
        backgroundColor: 'transparent',
        marginBottom: 0,
        color: colors.light.dark,
        fontSize: 15,
        letterSpacing: 0.25,
        flex: 1,
        fontFamily: defaultStyles.jakartaMedium.fontFamily,
        fontWeight: defaultStyles.jakartaMedium.fontWeight,
    },
    textInputContainer: {
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 1,
		borderColor: colors.light.input,
		backgroundColor: colors.light.input,
        height: 48,
        paddingHorizontal: 16,
    },
})

export default GoogleTextInput;