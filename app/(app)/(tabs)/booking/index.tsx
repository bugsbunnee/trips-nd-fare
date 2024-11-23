
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";

import { Text } from "@/components/ui";
import { colors, icons, styles as defaultStyles } from "@/constants";

import Trip from "@/components/booking/Trip";
import TicketItem from "@/components/lists/Ticket";

import { BOOKING_TYPES } from "@/constants/app";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setBookingType } from "@/store/booking/slice";
import { TICKETS } from "@/utils/data";

const BookingIndexPage : React.FC= () => {
    const booking = useAppSelector((state) => state.booking);
    const insets = useSafeAreaInsets();
    const dispatch = useAppDispatch();

    return ( 
      <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.horizontalPadding}>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.button}>
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
            </View>

            <ScrollView bounces={false}>
                <View style={styles.horizontalPadding}>
                    <View style={styles.question}>
                        <Text type="default-semibold" style={styles.title}>Where do you want to go?</Text>
                        <Text type="default-semibold" style={styles.subtitle}>Enter a new place, Get new experience</Text>
                    </View>

                    <View style={[styles.action, defaultStyles.shadow]}>
                        <View style={styles.tabContainer}>
                            {BOOKING_TYPES.map((bookingType) => (
                                <TouchableOpacity 
                                    key={bookingType.value} 
                                    onPress={() => dispatch(setBookingType(bookingType.value))}
                                    style={[styles.tab, bookingType.value === booking.booking.bookingType ? styles.tabActive : undefined]}
                                >
                                    <Text type="default" style={styles.tabText}>{bookingType.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.form}>
                            <Trip />
                        </View>
                    </View>
                </View>

                <View style={styles.bottom}>
                    <View style={styles.row}>
                        <Text type="default-semibold" style={styles.schedulesLabel}>Today's Schedule</Text>

                        <Link href="/(app)/(tabs)/booking/tickets" asChild>
                            <TouchableOpacity>
                                <Text type="default-semibold" style={styles.viewAll}>View all</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>

                    <View style={styles.tickets}>
                        {TICKETS.map((ticket) => (
                            <TicketItem 
                                key={ticket.id}
                                ticket={ticket}
                                onPress={() => router.push({
                                    pathname: '/booking/tickets/[id]',
                                    params: { id: ticket.id }
                                })}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
      </View>
    );
};

const styles = StyleSheet.create({
    action: { 
        backgroundColor: colors.light.white,
        borderRadius: 20,
        paddingVertical: 19,
        paddingHorizontal: 17,
        zIndex: 1000000,
    },
    bottom: { 
        backgroundColor: colors.light.dewMid, 
        borderTopRightRadius: 20, 
        borderTopLeftRadius: 20, 
        paddingHorizontal: 16,
        marginTop: -150,
        paddingTop: 172,
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
    form: { padding: 9 },
    horizontalPadding: { paddingHorizontal: 16 },
    title: {
        fontSize: 18,
        color: colors.light.white,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        fontWeight: defaultStyles.urbanistBold.fontWeight,
        lineHeight: 21,
    },
    question: { marginTop: 18, marginBottom: 22 },
    row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    schedulesLabel: {
        fontSize: 20,
        lineHeight: 24,
        fontWeight: defaultStyles.urbanistBold.fontWeight,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        color: colors.light.dark,
    },
    subtitle: {
        fontSize: 12,
        color: colors.light.white,
        fontFamily: defaultStyles.urbanistRegular.fontFamily,
        fontWeight: defaultStyles.urbanistRegular.fontWeight,
        lineHeight: 14,
        marginTop: 3
    },
    tab: {
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 6
    },
    tabActive: {
        backgroundColor: colors.light.dew,
    },
    tabContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 5
    },
    tabText: {
        color: colors.light.grayDark,
        fontSize: 12,
        lineHeight: 14,
        fontWeight: defaultStyles.urbanistBold.fontWeight,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
    },
    tickets: { 
        marginTop: 22,
        marginBottom: 120
    },
    viewAll: {
        fontSize: 15,
        lineHeight: 18,
        fontWeight: defaultStyles.urbanistBold.fontWeight,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        color: colors.light.primary,
    },
});
 
export default BookingIndexPage;
