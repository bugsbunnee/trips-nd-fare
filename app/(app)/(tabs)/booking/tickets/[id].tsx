import React, { useCallback } from "react";
import _ from "lodash";

import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedSeat } from "@/store/booking/slice";

import { colors, icons, styles as defaultStyles } from "@/constants";
import { Button, Text } from "@/components/ui";
import { TICKETS } from "@/utils/data";
import { formatDate } from "@/utils/lib";

import TicketItem from "@/components/lists/Ticket";
import Map from "@/components/ui/Map";


const TicketDetailsPage: React.FC = () => {
    const dispatch = useAppDispatch();

    const { selectedSeat } = useAppSelector((state) => state.booking);
    const { top: paddingTop, bottom: paddingBottom } = useSafeAreaInsets();
    const { id } = useLocalSearchParams();

    let ticket = TICKETS.find((ticket) => ticket.id.toString() === id.toString());
    let seatCount = 16;
    let bookedSeats = [7, 8, 14, 15, 16]; 

    const getSeatColor = useCallback((seat: number) => {
        if (bookedSeats.includes(seat)) {
            return STATUS.UNAVAILABLE.value;
        }

        if (seat === selectedSeat) {
            return STATUS.SELECTED.value;
        }

        return STATUS.AVAILABLE.value;
    }, [selectedSeat]);

    return ( 
        <View style={[styles.container, { paddingTop, paddingBottom }]}>
            <View style={styles.flex}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.button}>
                        <MaterialCommunityIcons 
                            name='arrow-left'
                            size={icons.SIZES.NORMAL}
                            color={colors.light.primary}
                        />
                    </TouchableOpacity>

                    <View style={styles.flex}>
                        <Text type="default-semibold" style={styles.title}>
                            Transport Bookings
                        </Text>
                    </View>
                    
                    <TouchableOpacity style={styles.button}>
                        <MaterialCommunityIcons 
                            name='dots-horizontal'
                            size={icons.SIZES.NORMAL}
                            color={colors.light.primary}
                        />
                    </TouchableOpacity>
                </View>

                <Map 
                    showCurrentLocation={false}
                    markers={[
                        {
                            title: "From",
                            description: "Current Location",
                            coordinate: {
                                latitude: 6.4393028,
                                longitude: 3.3487916,
                            }
                        },
                        {
                            title: "To",
                            description: "Destination",
                            coordinate: {
                                latitude: 6.4739524,
                                longitude: 3.3916235,
                            }
                        },
                    ]}
                />
            </View>

         
            <View style={styles.details}>
                <ScrollView style={{ padding: 16 }}>
                    <TicketItem 
                        ticket={ticket!} 
                        onPress={() => {}} 
                        includeCurvatures={false} 
                    />

                    <View style={styles.seatDetails}>
                        <View style={styles.row}>
                            <View style={styles.flex}>
                                <Text type="default-semibold" style={styles.select}>Select Seat</Text>
                            </View>
                            
                            <View style={[styles.row, { gap: 5 }]}>
                                {Object.values(STATUS).map((status) => (
                                    <View key={status.label} style={styles.keyItem}>
                                        <View style={[styles.keyColor, { backgroundColor: status.value }]} />
                                        <Text type="default-semibold" style={styles.dateLabel}>{status.label}</Text>
                                    </View>
                                ))}
                            </View>


                        </View>

                        <View style={styles.seats}>
                            {_.range(1, seatCount + 1).map((seat) => (
                                <TouchableOpacity key={seat} disabled={bookedSeats.includes(seat)} onPress={() => dispatch(setSelectedSeat(seat))}>
                                    <MaterialIcons name='person' size={icons.SIZES.LARGE} color={getSeatColor(seat)} style={styles.row}>
                                        <Text type="default-semibold" style={styles.seatLabel}>S{seat}</Text>
                                    </MaterialIcons>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.date}>
                            <Text type="default" style={styles.dateLabel}>Departure Date</Text>
                            <Text type="default-semibold" style={styles.dateValue}>{formatDate(ticket!.departureDate, 'MMM. DD, YYYY')}</Text>
                        </View>

                        <Button label="Buy ticket" disabled={!selectedSeat} onPress={() => {}} />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const STATUS = {
    SELECTED: {
        label: "Selected",
        value: colors.light.primary
    },
    AVAILABLE: {
        label: "Available",
        value: colors.light.dewDark
    },
    UNAVAILABLE: {
        label: "Unvailable",
        value: colors.light.primaryLight
    },
};

const styles = StyleSheet.create({
    button: {
        width: 40,
        height: 40,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.light.white
    },
    container: {
        backgroundColor: colors.light.white,
        flex: 1,
    },
    date: {
        backgroundColor: colors.light.primaryLight,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: colors.light.primary,
        paddingVertical: 5,
        paddingHorizontal: 18,
        borderRadius: 100,
        width: "100%",
        marginBottom: 21
    },
    dateLabel: {
        fontSize: 10,
        lineHeight: 12,
        color: colors.light.graySemi,
        fontFamily: defaultStyles.urbanistSemibold.fontFamily,
        fontWeight: defaultStyles.urbanistSemibold.fontWeight,
        textAlign: "left",
    },
    dateValue: {
        fontSize: 15,
        lineHeight: 18,
        color: colors.light.dark,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        fontWeight: defaultStyles.urbanistBold.fontWeight,
        textAlign: "left",
        marginTop: 3
    },
    details: {
        flex: 1,
        backgroundColor: colors.light.white,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    flex: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
        marginBottom: 15,
        position: "absolute",
        top: 6,
        width: "100%",
        zIndex: 1000000000
    },
    keyColor: {
        width: 11,
        height: 11,
        borderRadius: 2
    },
    keyItem: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 3
    },
    seats: { 
        marginTop: 21, 
        marginBottom: 31,
        flexDirection: "row", 
        gap: 12, 
        alignItems: "center", 
        justifyContent: "flex-start",
        flexWrap: "wrap"
    },
    seatDetails: { paddingHorizontal: 20, marginTop: 22 },
    seatLabel: {
        fontSize: 10,
        lineHeight: 12,
        color: colors.light.black,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        fontWeight: defaultStyles.urbanistBold.fontWeight,
        textAlign: "center",
    },
    select: {
        fontSize: 15,
        lineHeight: 18,
        color: colors.light.dark,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        fontWeight: defaultStyles.urbanistBold.fontWeight,
    },
    row: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
    title: {
        fontSize: 20,
        lineHeight: 28,
        color: colors.light.dark,
        fontWeight: defaultStyles.urbanistBold.fontWeight,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        textAlign: "center"
    },
});
 
export default TicketDetailsPage;