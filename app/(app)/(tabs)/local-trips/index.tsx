
import React, { useEffect } from "react";
import _ from "lodash";

import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { Text } from "@/components/ui";
import { colors, icons, styles as defaultStyles } from "@/constants";
import { getAvailableLocalRiders } from "@/store/data/actions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Destination as DestinationModel } from "@/utils/models";

import AvailableRider from "@/components/lists/AvailableRider";
import Destination from "@/components/lists/Destination";
import GoogleTextInput from "@/components/ui/GoogleTextInput";
import Screen from "@/components/navigation/Screen";

import useLocation from "@/hooks/useLocation";
import AvailableRiderSkeleton from "@/components/lists/AvailableRiderSkeleton";
import Conditional from "@/components/common/Conditional";

const LocalTripsIndexPage : React.FC= () => {
    const insets = useSafeAreaInsets();
    const dispatch = useAppDispatch();
    const data = useAppSelector((state) => state.data);

    const location = useLocation();

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

    useEffect(() => {
        function getRiders() {
            if (location) {
                dispatch(getAvailableLocalRiders({
                    latitude: location.latitude,
                    longitude: location.longitude,
                }))
            }
        }

        getRiders();
    }, [dispatch, location]);

    return ( 
        <Screen style={styles.container}>
            <View style={[styles.horizontalPadding, { flexDirection: 'column', justifyContent: 'flex-start' }]}>
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
                    <GoogleTextInput
                        placeholderStyle={styles.placeholder}
                        containerStyle={styles.input}
                        leftIcon="magnifier"
                        placeholder="Search location"
                        onPress={() => {
                            router.push({
                                pathname: '/local-trips/location/[id]',
                                params: { id: 1 }
                            });
                        }}
                    />
                </View>

                <View style={styles.rides}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {RIDE_TYPES.map((rideType) => (
                            <TouchableOpacity key={rideType} style={styles.rideType}>
                                <Text type="default-semibold" style={styles.rideTypeText}>{rideType}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>

            <View style={[styles.bottom, styles.horizontalPadding]}>
                <ScrollView>
                    <View style={[styles.row, { marginBottom: 18 }]}>
                        <Text type="default-semibold" style={styles.title}>Popular Destinations</Text>
                        <TouchableOpacity>
                            <Text type="default-semibold" style={styles.cta}>View all</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {DESTINATIONS.map((destination) => (
                            <Destination 
                                key={destination.id} 
                                style={{ marginRight: 16 }}
                                destination={destination} 
                                onPress={() => {}} 
                            />
                        ))}
                    </ScrollView>
                    
                    <View style={[styles.row, styles.sectionMargin]}>
                        <Text type="default-semibold" style={styles.title}>Available Riders</Text>
                        <TouchableOpacity>
                            <Text type="default-semibold" style={styles.cta}>View all</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <Conditional visible={data.isLoading}>
                            {_.range(1, 4).map((fill) => (
                                <AvailableRiderSkeleton key={fill} />
                            ))}
                        </Conditional>

                        <Conditional visible={!data.isLoading}>
                            {data.localRiders.map((rider) => (
                                <AvailableRider 
                                    key={rider._id}
                                    onPress={() => router.push({ pathname: '/local-trips/[rider]', params: { rider: rider._id }})}
                                    firstName={rider.firstName}
                                    lastName={rider.lastName}
                                    location={rider.lastName}
                                    distanceInKm={rider.coordinates.distance}
                                    image={rider.profileDisplayImage}
                                />
                            ))}
                        </Conditional>
                    </ScrollView>
                </ScrollView>
            </View>   
        </Screen>
    );
};

const styles = StyleSheet.create({
    bottom: { 
        backgroundColor: colors.light.dew, 
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
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        color: colors.light.primary
    },
    horizontalPadding: { paddingHorizontal: 20 },
    input: { backgroundColor: colors.light.white, borderWidth: 0, width: '100%', },
    inputContainer: { marginTop: 33 },
    placeholder: { flex: 1, color: colors.light.black, fontFamily: defaultStyles.urbanistBold.fontFamily, marginLeft: 4, fontSize: 16 },
    row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    rides: { borderRadius: 20, marginTop: 80, paddingHorizontal: 11, paddingVertical: 24, backgroundColor: colors.light.white, zIndex: 100000 },
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
    sectionMargin: { marginBottom: 18, marginTop: 30 },
    title: {
        fontSize: 20,
        lineHeight: 24,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        color: colors.light.dark,
        textTransform: "capitalize"
    },
});
 
export default LocalTripsIndexPage;
