import React, { useCallback, useState } from "react";
import _ from "lodash";

import { router, useLocalSearchParams } from "expo-router";
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { setSelectedTicket } from "@/src/store/booking/slice";

import { colors, icons, styles as defaultStyles } from "@/src/constants";
import { Button, Text } from "@/src/components/ui";
import { formatDate, getMessageFromError, parseTime } from "@/src/utils/lib";
import { bookBusRide } from "@/src/store/ride/actions";

import ActivityIndicator from "@/src/components/ui/ActivityIndicator";
import RouteMap from "@/src/components/maps/RouteMap";
import TicketItem from "@/src/components/lists/Ticket";

const TicketDetailsPage: React.FC = () => {
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const dispatch = useAppDispatch();

    const { isBooking } = useAppSelector((state) => state.booking);
    const { top: paddingTop, bottom: paddingBottom } = useSafeAreaInsets();
    const { id } = useLocalSearchParams<{ id: string }>();
    const { busTickets } = useAppSelector((state) => state.data);

    const ticket = busTickets.find((_, index) => index === +id);

    console.log('ticket', ticket)

    const getSeatColor = useCallback((seat: number) => {
        if (ticket!.details.bookedSeats.includes(seat)) {
            return STATUS.UNAVAILABLE.value;
        }

        if (selectedSeats.includes(seat)) {
            return STATUS.SELECTED.value;
        }

        return STATUS.AVAILABLE.value;
    }, [ticket, selectedSeats]);

    const handleNavigateToPayment = useCallback(async () => {
        const payload = {
            ticketId: ticket!.details.ticketId,
            seatNumbers: selectedSeats,
            departureDate: ticket!.details.departureDate,
            departureTime: formatDate(`${ticket!.details.departureDate} ${ticket!.details.departureTime}`, 'HH:mm:ss'),
        };

        try {
            await dispatch(bookBusRide(payload)).unwrap();
            dispatch(setSelectedTicket(ticket!));

            router.dismissTo('/bus-rides/tickets/receipt');
        } catch (error) {
            const errorMessage = getMessageFromError(error);
            Alert.alert('Error', errorMessage);
        }
    }, [dispatch, ticket, selectedSeats]);

    const handleSelectSeat = (newSeat: number) => {
        if (selectedSeats.includes(newSeat)) {
            setSelectedSeats(selectedSeats.filter((seat) => seat !== newSeat));
        } else {
            setSelectedSeats([...selectedSeats, newSeat]);
        }
    };
    
    return ( 
        <View style={[styles.container, { paddingTop, paddingBottom }]}>
            <View style={styles.flex}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.button}>
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

                {ticket!.details.coordinates && (
                    <RouteMap
                        origin={ticket!.details.coordinates[0]}
                        destination={ticket!.details.coordinates[1]}
                    />
                )}
            </View>
  
            <View style={styles.details}>
                <ActivityIndicator visible={isBooking} />

                <ScrollView style={styles.scrollview}>
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
                            {_.range(1, ticket!.details.seatCount + 1).map((seat) => (
                                <TouchableOpacity key={seat} disabled={ticket!.details.bookedSeats.includes(seat)} onPress={() => handleSelectSeat(seat)}>
                                    <MaterialIcons name='person' size={icons.SIZES.LARGE} color={getSeatColor(seat)} style={styles.row} />
                                    <Text type="default-semibold" style={styles.seatLabel}>S{seat}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.date}>
                            <Text type="default" style={styles.dateLabel}>Departure Date</Text>
                            <Text type="default-semibold" style={styles.dateValue}>{formatDate(ticket!.details.departureDate, 'MMM. DD, YYYY')}</Text>
                        </View>

                        <Button 
                            label="Buy ticket" 
                            disabled={selectedSeats.length === 0} 
                            onPress={handleNavigateToPayment} 
                        />
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
        textAlign: "center",
    },
    scrollview: { padding: 16 },
    select: {
        fontSize: 15,
        lineHeight: 18,
        color: colors.light.dark,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
    },
    row: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
    title: {
        fontSize: 20,
        lineHeight: 28,
        color: colors.light.dark,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        textAlign: "center"
    },
});
 
export default TicketDetailsPage;