
import React from "react";

import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { Text } from "@/src/components/ui";
import { colors, icons, styles as defaultStyles } from "@/src/constants";
import { Destination as DestinationModel } from "@/src/utils/models";

import AvailableRider from "@/src/components/lists/AvailableRider";
import Destination from "@/src/components/lists/Destination";
import CityPicker from "@/src/components/lists/CityPicker";

const SingleLocationPage : React.FC= () => {
    const insets = useSafeAreaInsets();

    const RIDE_TYPES = ['Keke', 'Danfo', 'Bike', 'Boat', 'Uber'];

    const DESTINATIONS: DestinationModel[] = [
        {
            id: 1,
            image: require("@/src/assets/images/map.png"),
            label: 'Ajah, Under Bridge',
            minimumCost: 700,
        },
        {
            id: 2,
            image: require("@/src/assets/images/map.png"),
            label: 'Shoprite, Sangotedo',
            minimumCost: 700,
        },
        {
            id: 3,
            image: require("@/src/assets/images/map.png"),
            label: 'Agungi, Lekki',
            minimumCost: 700,
        },
        {
            id: 4,
            image: require("@/src/assets/images/map.png"),
            label: 'Marwa, Lekki',
            minimumCost: 700,
        },
        {
            id: 5,
            image: require("@/src/assets/images/map.png"),
            label: 'Agege, Lagos',
            minimumCost: 700,
        },
    ];
   
    const AVAILABLE_RIDERS = [
        {
            id: 1,
            image: require("@/src/assets/images/rider.png"),
            firstName: 'Aminu',
            lastName: 'Gabriel',
            location: 'Ogombo road',
            distanceInKm: 7,
        },
    ];

    return ( 
      <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.horizontalPadding}>
                <View style={styles.row}>
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
            
                <View style={styles.rides}>
                    <CityPicker 
                        selectedItem={{ label: 'Lagos', value: 'Lagos' }} 
                        onSelectItem={() => {}} 
                        items={[]}
                        placeholder="Select a city"
                        numberOfColumns={1}
                        width="100%"
                    />

                    <ScrollView horizontal style={{ marginTop: 20 }}>
                        {RIDE_TYPES.map((rideType) => (
                            <TouchableOpacity key={rideType} style={styles.rideType}>
                                <Text type="default-semibold" style={styles.rideTypeText}>{rideType}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>

            <View style={styles.bottom}>
                <View style={[styles.row, { marginBottom: 18 }]}>
                    <Text type="default-semibold" style={styles.title}>Locations</Text>
                </View>

                <ScrollView>
                    <ScrollView contentContainerStyle={{ flexDirection: 'row', gap: 18, flexWrap: 'wrap' }}>
                        {DESTINATIONS.map((destination) => (
                            <View key={destination.id}>
                                <Destination destination={destination} onPress={() => router.push(`/local-trips/location/${destination.id}/details`)}  />
                            </View>
                        ))}
                    </ScrollView>
                
                    <View style={[styles.row, { marginBottom: 18, marginTop: 18 }]}>
                        <Text type="default-semibold" style={styles.title}>Riders in location</Text>
                        <TouchableOpacity>
                            <Text type="default-semibold" style={styles.cta}>View all</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView>
                        {AVAILABLE_RIDERS.map((rider) => (
                            <AvailableRider 
                                key={rider.id}
                                onPress={() => router.push({ pathname: '/local-trips/[rider]', params: { rider: rider.id }})}
                                firstName={rider.firstName}
                                lastName={rider.lastName}
                                location={rider.location}
                                distanceInKm={rider.distanceInKm}
                                image={rider.image}
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
        paddingHorizontal: 20, 
        paddingTop: 65, 
        flex: 1, 
        borderTopRightRadius: 20, 
        borderTopLeftRadius: 20, 
        marginTop: -40,
        paddingBottom: 130 
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
        backgroundColor: colors.light.primary, 
    },
    cta: {
        fontSize: 15,
        lineHeight: 18,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        color: colors.light.primary
    },
    horizontalPadding: { paddingHorizontal: 20 },
    row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    rides: { borderRadius: 20, paddingHorizontal: 11, marginTop: 33, paddingVertical: 24, backgroundColor: colors.light.white, zIndex: 100000 },
    rideType: { 
        alignSelf: 'flex-start', 
        paddingHorizontal: 18, 
        paddingVertical: 3, 
        backgroundColor: colors.light.primaryLight, 
        borderRadius: 8,
        marginRight: 8
    },
    rideTypeText: {
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        fontSize: 18,
        lineHeight: 28,
        color: colors.light.primary,
        textTransform: 'capitalize'
    },
    separator: { width: 16, height: 16 },
    title: {
        fontSize: 20,
        lineHeight: 24,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        color: colors.light.dark,
        textTransform: "capitalize"
    },
});
 
export default SingleLocationPage;
