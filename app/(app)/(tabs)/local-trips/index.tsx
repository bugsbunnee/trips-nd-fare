
import React, { useCallback, useEffect, useMemo, useState } from "react";
import _ from "lodash";

import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { Skeleton, Text } from "@/src/components/ui";
import { colors, icons, styles as defaultStyles } from "@/src/constants";
import { getAvailableLocalRiders, getLocalRideTypes } from "@/src/store/data/actions";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { PickerItemModel } from "@/src/utils/models";

import AvailableRider from "@/src/components/lists/AvailableRider";
import AvailableRiderSkeleton from "@/src/components/lists/AvailableRiderSkeleton";
import Conditional from "@/src/components/common/Conditional";
import EmptyItem from "@/src/components/lists/EmptyItem";
import LocationPickerTrigger from "@/src/components/lists/LocationPickerTrigger";
import LocalRideLocation from "@/src/components/lists/LocalRideLocation";
import LocalRideLocationSkeleton from '@/src/components/lists/LocalRideLocationSkeleton';
import Picker from "@/src/components/lists/Picker";
import Screen from "@/src/components/navigation/Screen";

import useLocation from "@/src/hooks/useLocation";

const LocalTripsIndexPage : React.FC= () => {
    const [selectedItem, setSelectedItem] = useState<PickerItemModel | null>(null);

    const dispatch = useAppDispatch();
    const data = useAppSelector((state) => state.data);
    const location = useLocation();

    const allLocations = useMemo(() => {
        return data.popularLocations.map((location) => ({
            label: location.route,
            value: location.route,
        }));
    }, [data.popularLocations]);

    const getLocalRides = useCallback(() => {
        dispatch(getLocalRideTypes());
    }, [dispatch]);

    const getRiders = useCallback(() => {
        if (location) {
            dispatch(getAvailableLocalRiders({
                latitude: location.latitude,
                longitude: location.longitude,
            }))
        }
    }, [dispatch, location]);

    useEffect(() => {
        getRiders();
    }, [getRiders]);

    useEffect(() => {
        getLocalRides();
    }, [getLocalRides]);

    useEffect(() => {
        if (selectedItem) {
            router.push({
                pathname: '/local-trips/location/[id]',
                params: { id: 1 }
            });
        }
    }, [selectedItem]);

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
                    <Picker 
                        label=''
                        items={allLocations}
                        selectedItem={selectedItem}
                        placeholder='Search location...'
                        icon='magnifier'
                        PickerTriggerComponent={LocationPickerTrigger}
                        onSelectItem={(item) => setSelectedItem(item)}
                    />
                </View>

                <Conditional visible={data.isLoading || data.localRideTypes.length > 0}>
                    <View style={styles.rides}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <Conditional visible={!data.isLoading}>
                                {data.localRideTypes.map((rideType) => (
                                    <TouchableOpacity key={rideType.value} style={styles.rideType}>
                                        <Text type="default-semibold" style={styles.rideTypeText}>{rideType.label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </Conditional>
                            
                            <Conditional visible={data.isLoading}>
                                {_.range(1, 6).map((fill) => (
                                    <Skeleton key={fill} style={styles.rideTypeSkeleton} />
                                ))}
                            </Conditional>
                        </ScrollView>
                    </View>
                </Conditional>
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
                        <Conditional visible={data.isLoading}>
                            {_.range(1, 4).map((fill) => (
                                <LocalRideLocationSkeleton key={fill} />
                            ))}
                        </Conditional>

                        <Conditional visible={!data.isLoading}>
                            {data.popularLocations.map((location, index) => (
                                <LocalRideLocation 
                                    key={index} 
                                    style={{ marginRight: 16 }}
                                    route={location} 
                                    onPress={() => {}} 
                                />
                            ))}
                        </Conditional>
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

                        <Conditional visible={!data.isLoading && data.localRiders.length > 0}>
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

                    <Conditional visible={!data.isLoading && data.localRiders.length === 0}>
                        <EmptyItem
                            label="No Available Riders"
                            description="Looks like there are no available riders at the moment."
                            onRefresh={getRiders}
                        />
                    </Conditional>
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
    rides: { borderRadius: 20, marginTop: 18, paddingHorizontal: 11, paddingVertical: 24, backgroundColor: colors.light.white, zIndex: 100 },
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
