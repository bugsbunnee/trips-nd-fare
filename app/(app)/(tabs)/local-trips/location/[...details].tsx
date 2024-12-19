
import React from "react";

import { ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { Image, Text } from "@/components/ui";
import { colors, icons, styles as defaultStyles } from "@/constants";
import { Destination as DestinationModel } from "@/utils/models";

import Destination from "@/components/lists/Destination";

const LocationDetailsPage : React.FC= () => {
    const insets = useSafeAreaInsets();

    const DESTINATIONS: DestinationModel[] = [
        {
            id: 1,
            image: require("@/assets/images/map.png"),
            label: 'Ajah, Under Bridge',
            minimumCost: 700,
        },
        {
            id: 2,
            image: require("@/assets/images/map.png"),
            label: 'Shoprite, Sangotedo',
            minimumCost: 700,
        },
        {
            id: 3,
            image: require("@/assets/images/map.png"),
            label: 'Agungi, Lekki',
            minimumCost: 700,
        },
        {
            id: 4,
            image: require("@/assets/images/map.png"),
            label: 'Marwa, Lekki',
            minimumCost: 700,
        },
        {
            id: 5,
            image: require("@/assets/images/map.png"),
            label: 'Agege, Lagos',
            minimumCost: 700,
        },
    ];
   
    const AVAILABLE_RIDERS = [
        {
            id: 1,
            image: require("@/assets/images/rider.png"),
            firstName: 'Aminu',
            lastName: 'Gabriel',
            location: 'Ogombo road',
            distanceInKm: 7,
        },
        {
            id: 2,
            image: require("@/assets/images/rider.png"),
            firstName: 'Yemi',
            lastName: 'Gabriel',
            location: 'Ogombo road',
            distanceInKm: 12,
        },
        {
            id: 3,
            image: require("@/assets/images/rider.png"),
            firstName: 'Femi',
            lastName: 'Gabriel',
            location: 'Ogombo road',
            distanceInKm: 13,
        },
        {
            id: 4,
            image: require("@/assets/images/rider.png"),
            firstName: 'Bunmi',
            lastName: 'Gabriel',
            location: 'Ogombo road',
            distanceInKm: 5,
        },
    ];

    const source = { uri: "https://docs.expo.dev/static/images/tutorial/background-image.png" };

    return ( 
      <View style={styles.container}>
            <ImageBackground source={source} resizeMode="cover" style={[styles.image, { paddingTop: insets.top }]}>
                <View style={[styles.row, { paddingHorizontal: 16 }]}>
                    <TouchableOpacity style={styles.button} onPress={() => router.back()}>
                        <MaterialCommunityIcons 
                            name='arrow-left'
                            size={icons.SIZES.NORMAL}
                            color={colors.light.primary}
                        />
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.button}>
                        <MaterialCommunityIcons 
                            name='dots-horizontal'
                            size={icons.SIZES.NORMAL}
                            color={colors.light.primary}
                        />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            
            <View style={styles.bottom}>
                <ScrollView>
                    <View style={styles.locationContainer}>
                        <Text type="default-semibold" style={styles.location}>Ajah, under bridge</Text>
                    </View>

                    <View style={styles.riders}>
                        <Text type="default-semibold" style={styles.ridersText}>Riders around location</Text>

                        <ScrollView style={styles.riderList} horizontal showsHorizontalScrollIndicator={false}>
                            {AVAILABLE_RIDERS.map((rider) => (
                                <TouchableOpacity key={rider.id} style={styles.rider}>
                                    <Image
                                        src={rider.image}
                                        style={styles.riderImage}
                                    />

                                    <View style={styles.riderDetails}>
                                        <Text type="default-semibold" style={styles.riderName}>{rider.firstName}</Text>
                                        <Text type="default-semibold" style={styles.riderVehicle}>Keke Rider</Text>
                                        <Text type="default-semibold" style={[styles.riderVehicle, { color: colors.light.primary }]}>{rider.distanceInKm} km away</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={[styles.row, { marginBottom: 11 }]}>
                        <Text type="default-semibold" style={styles.title}>Other localities</Text>
                    </View>

                    <ScrollView horizontal contentContainerStyle={{ alignSelf: "flex-start" }} showsHorizontalScrollIndicator={false}>
                        {DESTINATIONS.map((destination) => (
                            <Destination 
                                key={destination.id}
                                style={styles.locality}
                                destination={destination} 
                                onPress={() => router.push(`/local-trips/location/${destination.id}/details`)}
                            />
                        ))}
                    </ScrollView>
                </ScrollView>
            </View>
      </View>
    );
};

const styles = StyleSheet.create({
    bottom: { 
        backgroundColor: colors.light.dew, 
        paddingHorizontal: 17, 
        paddingTop: 13, 
        marginBottom: 95,
        flex: 1, 
    },
    button: {
        width: 40,
        height: 40,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.light.white
    },
    container: { 
        flex: 1, 
    },
    image: { 
        width: "100%",
        height: 291,
    },
    location: {
        fontSize: 23,
        lineHeight: 28,
        color: colors.light.black,
        textTransform: "capitalize"
    },
    locality: { marginRight: 18 },
    locationContainer: { paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: "#EDEDED" },
    rider: { marginRight: 30 },
    riders: { marginTop: 30, marginBottom: 19 },
    riderList: { marginTop: 20 },
    riderImage: { width: 60, height: 60, borderRadius: 60, resizeMode: "cover" },
    ridersText: {
        fontSize: 20,
        fontWeight: defaultStyles.urbanistSemibold.fontWeight,
        fontFamily: defaultStyles.urbanistSemibold.fontFamily,
        color: colors.light.dark,
    },
    riderDetails: { marginTop: 8 },
    riderName: {
        fontSize: 14,
        lineHeight: 16,
        color: colors.light.dark,
        textAlign: "center",
        fontWeight: defaultStyles.urbanistSemibold.fontWeight,
        fontFamily: defaultStyles.urbanistSemibold.fontFamily,
    },
    riderVehicle: {
        fontSize: 10,
        lineHeight: 16,
        color: colors.light.grayDeep,
        textAlign: "center",
        fontWeight: defaultStyles.urbanistSemibold.fontWeight,
        fontFamily: defaultStyles.urbanistSemibold.fontFamily,
    },
    row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    separator: { width: 16, height: 16 },
    title: {
        fontSize: 15,
        lineHeight: 16,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        color: colors.light.dark,
        textTransform: "capitalize"
    },
});
 
export default LocationDetailsPage;
