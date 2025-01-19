
import React, { useMemo } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useAppSelector } from "@/src/store/hooks";

import { Image, Text } from "@/src/components/ui";
import { colors, icons, styles as defaultStyles } from "@/src/constants";

import LocalRideLocation from "@/src/components/lists/LocalRideLocation";
import AvailableRider from "@/src/components/lists/AvailableRider";

const SingleRiderPage : React.FC= () => {
    const insets = useSafeAreaInsets();
    
    const { localRiders } = useAppSelector((state) => state.data);
    const { rider: riderId } = useLocalSearchParams<{ rider: string; }>();
   
    const SIMILAR_RIDERS = [
        {
            id: 1,
            image: require("@/src/assets/images/rider.png"),
            firstName: 'Aminu',
            lastName: 'Gabriel',
            location: 'Ogombo road',
            distanceInKm: 7,
        },
    ];

    const riderMatch = useMemo(() => {
        return localRiders.find((rider) => rider._id === riderId);
    }, [localRiders, riderId]);

    return ( 
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={[styles.horizontalPadding, { zIndex: 1000}]}>
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

                <View style={styles.center}>
                    <View style={styles.imageContainer}>
                        <Image 
                            src={riderMatch!.profileDisplayImage} 
                            style={styles.image}
                        />

                        <View style={[styles.phone, defaultStyles.shadow]}>
                            <MaterialCommunityIcons name="phone" size={icons.SIZES.NORMAL} color={colors.light.primary} />
                        </View>
                    </View>
                </View>
            </View>

        <View style={styles.bottom}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Text type="default-semibold" style={styles.name}>{riderMatch!.firstName} {riderMatch!.lastName}</Text>

                    <View style={styles.bullets}>
                        <Text type="default" style={styles.bullet}>{riderMatch!.rideType!.name} rider</Text>
                        <View style={styles.dot} />
                        <Text type="default" style={styles.bullet}>Ogombo road</Text>
                        <View style={styles.dot} />
                        <Text type="default" style={styles.bullet}>{riderMatch!.coordinates.distance.toFixed(2)}km away</Text>
                    </View>
                </View>

                <View style={styles.summary}>
                    <View style={styles.flex}>
                        <Text type="default-semibold" style={styles.value}>{riderMatch!.contactCount}</Text>
                        <Text type="default-semibold" style={styles.label}>Contacted</Text>
                    </View>

                    <View style={styles.flex}>
                        <Text type="default-semibold" style={styles.value}>{riderMatch!.rideCount}</Text>
                        <Text type="default-semibold" style={styles.label}>Trips</Text>
                    </View>

                    <View style={styles.flex}>
                        <Text type="default-semibold" style={styles.value}>{riderMatch!.reviewCount}</Text>
                        <Text type="default-semibold" style={styles.label}>Reviews</Text>
                    </View>
                </View>

                <View style={[styles.row, { marginBottom: 18 }]}>
                    <Text type="default-semibold" style={styles.title}>Routes</Text>
                </View>
                
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {riderMatch!.routes.map((route, index) => (
                        <LocalRideLocation 
                            key={index} 
                            style={{ marginRight: 16 }}
                            route={route} 
                            onPress={() => {}} 
                        />
                    ))}
                </ScrollView>
                
                <View style={[styles.row, { marginBottom: 18, marginTop: 30 }]}>
                    <Text type="default-semibold" style={styles.title}>Similar Riders</Text>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {SIMILAR_RIDERS.map((rider) => (
                        <View key={rider.id} style={{ marginRight: 16 }}>
                            <AvailableRider 
                                onPress={() => router.push({ pathname: '/local-trips/[rider]', params: { rider: rider.id }})}
                                firstName={rider.firstName}
                                lastName={rider.lastName}
                                location={rider.location}
                                distanceInKm={rider.distanceInKm}
                                image={rider.image}
                            />
                        </View>
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
        paddingHorizontal: 18, 
        paddingTop: 70, 
        flex: 1, 
        borderTopRightRadius: 100, 
        borderTopLeftRadius: 100, 
        marginTop: -60,
        paddingBottom: 100,
        overflow: "hidden"
    },
    button: {
        width: 40,
        height: 40,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.light.white
    },
    bullet: {
        fontSize: 12, 
        lineHeight: 15,
        color: colors.light.grayDark,
        textTransform: "capitalize"
    },
    bullets: { 
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 7
    },
    center: {
        justifyContent: "center", 
        alignItems: "center", 
    },
    container: { 
        flex: 1, 
        backgroundColor: colors.light.primary, 
    },
    dot: { 
        width: 8, 
        height: 8,  
        backgroundColor: colors.light.grayDark, 
        marginHorizontal: 4,
        borderRadius: 20
    },
    flex: { flex: 1 },
    horizontalPadding: { paddingHorizontal: 20 },
    inputContainer: { marginTop: 33 },
    image: { width: 150, height: 150, objectFit: "contain", borderRadius: 150 },
    imageContainer: { width: 150, height: 150, position: "relative" },
    name:  {
        fontSize: 30,
        lineHeight: 37,
        color: colors.light.black,
        textTransform: "capitalize",
        textAlign: "center"
    },
    phone: { 
        position: "absolute", 
        width: 32, 
        height: 32, 
        backgroundColor: colors.light.white, 
        justifyContent: 'center', 
        alignItems: 'center',
        borderRadius: 32,
        bottom: 5,
        right: 5
    },
    row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    separator: { width: 16 },
    summary: { 
        flexDirection: "row", 
        alignItems: "center",
        gap: 40,
        paddingVertical: 9,
        paddingHorizontal: 13,
        backgroundColor: colors.light.white,
        borderRadius: 10,
        marginBottom: 28,
        marginTop: 35
    },
    title: {
        fontSize: 20,
        lineHeight: 24,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        color: colors.light.dark,
        textTransform: "capitalize"
    },
    value: {
        fontSize: 50,
        lineHeight: 63,
        textAlign: "center",
        color: colors.light.black,
    },
    label: {
        fontSize: 15,
        lineHeight: 18,
        textAlign: "center",
        color: colors.light.graySemi,
    }
});
 
export default SingleRiderPage;
