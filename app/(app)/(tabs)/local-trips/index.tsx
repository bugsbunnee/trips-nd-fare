
import React from "react";

import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { Text, TextInput } from "@/components/ui";
import { colors, icons, styles as defaultStyles } from "@/constants";
import { Destination as DestinationModel } from "@/utils/models";

import AvailableRider from "@/components/lists/AvailableRider";
import Destination from "@/components/lists/Destination";

const LocalTripsIndexPage : React.FC= () => {
    const insets = useSafeAreaInsets();

    const RIDE_TYPES = ['Keke', 'Danfo', 'Bike', 'Boat', 'Uber'];

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
            
                <View style={styles.inputContainer}>
                    <TextInput 
                        primaryIcon="magnifier" 
                        placeholder="Search location" 
                        primaryIconColor={colors.light.primary}
                        onSubmitEditing={() => router.push({
                            pathname: '/local-trips/location/[id]',
                            params: { id: 1 }
                        })} 
                    />
                </View>

                <View style={styles.rides}>
                    <ScrollView horizontal>
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
                    <Text type="default-semibold" style={styles.title}>Popular Destinations</Text>
                    <TouchableOpacity>
                        <Text type="default-semibold" style={styles.cta}>View all</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <FlatList
                        data={DESTINATIONS}
                        horizontal
                        keyExtractor={(item) => item.id.toString()}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        renderItem={({ item }) => <Destination destination={item} onPress={() => {}} />}
                    />
                </View>
                
                <View style={[styles.row, { marginBottom: 18, marginTop: 30 }]}>
                    <Text type="default-semibold" style={styles.title}>Available Riders</Text>
                    <TouchableOpacity>
                        <Text type="default-semibold" style={styles.cta}>View all</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <FlatList
                        data={AVAILABLE_RIDERS}
                        horizontal
                        keyExtractor={(item) => item.id.toString()}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        renderItem={({ item }) => (
                            <AvailableRider 
                                onPress={() => router.push({ pathname: '/local-trips/[rider]', params: { rider: item.id }})}
                                firstName={item.firstName}
                                lastName={item.lastName}
                                location={item.location}
                                distanceInKm={item.distanceInKm}
                                image={item.image}
                            />
                        )}
                    />
                </View>
            </View>

           
      </View>
    );
};

const styles = StyleSheet.create({
    bottom: { 
        backgroundColor: colors.light.dew, 
        paddingHorizontal: 18, 
        paddingTop: 38, 
        flex: 1, 
        borderTopRightRadius: 20, 
        borderTopLeftRadius: 20, 
        marginTop: -20,
        paddingBottom: 70 
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
        fontWeight: defaultStyles.urbanistBold.fontWeight,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        color: colors.light.primary
    },
    horizontalPadding: { paddingHorizontal: 20 },
    inputContainer: { marginTop: 33 },
    row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    rides: { borderRadius: 20, paddingHorizontal: 11, paddingVertical: 24, backgroundColor: colors.light.white, zIndex: 100000 },
    rideType: { 
        alignSelf: 'flex-start', 
        paddingHorizontal: 18, 
        paddingVertical: 3, 
        backgroundColor: colors.light.primaryLight, 
        borderRadius: 8,
        marginRight: 8
    },
    rideTypeText: {
        fontWeight: defaultStyles.urbanistBold.fontWeight,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        fontSize: 18,
        lineHeight: 28,
        color: colors.light.primary,
        textTransform: 'capitalize'
    },
    separator: { width: 16 },
    title: {
        fontSize: 20,
        lineHeight: 24,
        fontWeight: defaultStyles.urbanistBold.fontWeight,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        color: colors.light.dark,
        textTransform: "capitalize"
    },
});
 
export default LocalTripsIndexPage;
