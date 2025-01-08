
import React from "react";

import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Image, Text } from "@/components/ui";
import { colors, styles as defaultStyles } from "@/constants";

interface Props {
    firstName: string;
    lastName: string;
    distanceInKm: number;
    location: string;
    image: string;
    onPress: () => void;
}

const AvailableRider: React.FC<Props> = ({ firstName, lastName, image, distanceInKm, location, onPress }) => {
    return ( 
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Image 
                contentFit="cover"
                src={image}
                style={styles.image}
            />

            <View style={{ marginTop: 3 }}>
                <Text type="default-semibold" style={styles.name}>{firstName} {lastName}</Text>

                <View style={[styles.row, { marginTop: 4 }]}>
                    <Text type="default-semibold" style={styles.location}>{location}</Text>

                    <View style={[styles.row, { gap: 2 }]}>
                        <MaterialCommunityIcons name="map-marker" size={10} color={colors.light.dark} />
                        <Text type="default-semibold" style={styles.distance}>{distanceInKm.toFixed(2)}km</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
     );
};

const styles = StyleSheet.create({
    container: { width: 129 },
    distance: {
        fontSize: 10,
        lineHeight: 12,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        color: colors.light.dark
    },
    image: { height: 138, width: "100%", borderRadius: 8 },
    name: {
        fontSize: 15,
        lineHeight: 18,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        color: colors.light.dark
    },
    location: {
        fontSize: 10,
        lineHeight: 12,
        marginTop: 4,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        color: colors.light.grayDeep
    },
    row: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
    },
});
 
export default AvailableRider;