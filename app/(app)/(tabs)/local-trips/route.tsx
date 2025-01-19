
import React from "react";
import _ from "lodash";

import { ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useAppSelector } from "@/src/store/hooks";
import { Text } from "@/src/components/ui";
import { colors, icons, styles as defaultStyles } from "@/src/constants";

import AvailableRider from "@/src/components/lists/AvailableRider";
import AvailableRiderSkeleton from "@/src/components/lists/AvailableRiderSkeleton";
import Conditional from "@/src/components/common/Conditional";
import LocalRideLocation from "@/src/components/lists/LocalRideLocation";
import LocalRideLocationSkeleton from "@/src/components/lists/LocalRideLocationSkeleton";
import LocalRideTypes from "@/src/components/lists/LocalRideTypes";

const SingleLocationPage : React.FC= () => {
    const insets = useSafeAreaInsets();
    const data = useAppSelector((state) => state.data);
    const ride = useAppSelector((state) => state.ride);
    
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
                    <TouchableWithoutFeedback onPress={() => router.back()}>
                        <View style={styles.picker}>
                            <Text type="default" style={styles.pickerLabel}>{ride.selectedRoute!.label}</Text>

                            <Ionicons
                                name="caret-down"
                                size={icons.SIZES.SMALL}
                                color={colors.light.dark}
                            />
                        </View>
                    </TouchableWithoutFeedback>

                    <ScrollView horizontal style={{ marginTop: 20 }}>
                       <LocalRideTypes />
                    </ScrollView>
                </View>
            </View>

            <View style={styles.bottom}>
                <View style={[styles.row, { marginBottom: 18 }]}>
                    <Text type="default-semibold" style={styles.title}>Locations</Text>
                </View>

                <ScrollView>
                    <ScrollView contentContainerStyle={{ flexDirection: 'row', gap: 18, flexWrap: 'wrap' }}>
                        <Conditional visible={data.isLoading}>
                            {_.range(1, 4).map((fill) => (
                                <LocalRideLocationSkeleton key={fill} />
                            ))}
                        </Conditional>

                        <Conditional visible={!data.isLoading}>
                            {data.popularLocations.map((location, index) => (
                                <LocalRideLocation 
                                    key={index} 
                                    style={{ marginRight: 16, maxWidth: 129 }}
                                    route={location} 
                                    onPress={() => router.push({
                                        pathname: '/local-trips/location/[location]',
                                        params: { location: location.route },
                                    })} 
                                />
                            ))}
                        </Conditional>
                    </ScrollView>
                
                    <View style={[styles.row, { marginBottom: 18, marginTop: 18 }]}>
                        <Text type="default-semibold" style={styles.title}>Riders in location</Text>
                        <TouchableOpacity>
                            <Text type="default-semibold" style={styles.cta}>View all</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView>
                        <Conditional visible={data.isLoading}>
                            {_.range(1, 4).map((fill) => (
                                <AvailableRiderSkeleton key={fill} />
                            ))}
                        </Conditional>

                        <Conditional visible={!data.isLoading && data.localRiders.length > 0}>
                            {data.localRiders.map((rider) => (
                                <AvailableRider 
                                    key={rider._id}
                                    onPress={() => router.push({ pathname: '/local-trips/[rider]', params: { rider: rider._id }})}
                                    firstName={rider.firstName}
                                    lastName={rider.lastName}
                                    location={rider.rideType.name}
                                    distanceInKm={rider.coordinates.distance}
                                    image={rider.profileDisplayImage}
                                />
                            ))}
                        </Conditional>
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
    picker: {
        borderRadius: 25,
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    pickerLabel: {
        fontSize: 20,
        lineHeight: 28,
        color: colors.light.dark,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
    },
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
    rideTypeSkeleton: { 
        width: 80,
        height: 20,
        borderRadius: 4,
        marginRight: 10
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
