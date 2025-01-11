
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";

import { Text } from "@/src/components/ui";
import { colors, icons, styles as defaultStyles } from "@/src/constants";

import Conditional from "@/src/components/common/Conditional";
import EmptyItem from "@/src/components/lists/EmptyItem";
import OneWayTrip from "@/src/components/booking/OneWayTrip";
import TicketItemSkeleton from "@/src/components/lists/TicketSkeleton";
import TicketItem from "@/src/components/lists/Ticket";

import { BOOKING_TYPES } from "@/src/constants/app";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { setBookingType } from "@/src/store/booking/slice";
import { getBusTickets } from "@/src/store/data/actions";

const BookingIndexPage : React.FC= () => {
    const data = useAppSelector((state) => state.data);
    const booking = useAppSelector((state) => state.booking);
    const dispatch = useAppDispatch();
    const insets = useSafeAreaInsets();

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
            </View>

            <ScrollView style={styles.flex} bounces={false}>
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
                                    style={[styles.tab, bookingType.value === booking.bookingType ? styles.tabActive : undefined]}
                                >
                                    <Text type="default" style={styles.tabText}>{bookingType.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.form}>
                            <OneWayTrip />
                        </View>
                    </View>
                </View>

                <View style={styles.bottom}>
                    <View style={styles.row}>
                        <Text type="default-semibold" style={styles.schedulesLabel}>Available Schedule</Text>

                        <Link href="/bus-rides/tickets" asChild>
                            <TouchableOpacity>
                                <Text type="default-semibold" style={styles.viewAll}>View all</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>

                    <View style={styles.tickets}>
                        <Conditional visible={data.isLoading}>
                            <TicketItemSkeleton />
                        </Conditional>
                        
                        <Conditional visible={!data.isLoading}>
                            <Conditional visible={data.busTickets.length > 0}>
                                {data.busTickets.slice(0, 4).map((ticket, index) => (
                                    <TicketItem 
                                        key={index}
                                        ticket={ticket}
                                        onPress={() => router.push({
                                            pathname: '/bus-rides/tickets/[id]',
                                            params: { id: ticket.details.ticketId }
                                        })}
                                    />
                                ))}
                            </Conditional>

                            <Conditional visible={data.busTickets.length === 0}>
                                <EmptyItem
                                    label='No Tickets Available Yet' 
                                    description="Tickets will show here when available!"
                                    onRefresh={() => dispatch(getBusTickets())}
                                />
                            </Conditional>
                        </Conditional>
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
        zIndex: 10000000000,
        elevation: 4
    },
    bottom: { 
        backgroundColor: colors.light.dewMid, 
        borderTopRightRadius: 20, 
        borderTopLeftRadius: 20, 
        paddingHorizontal: 16,
        marginTop: -150,
        paddingTop: 172,
        height: '100%',
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
    flex: { flex: 1 },
    form: { marginTop: 9 },
    horizontalPadding: { paddingHorizontal: 16 },
    title: {
        fontSize: 18,
        color: colors.light.white,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        lineHeight: 21,
    },
    question: { marginTop: 18, marginBottom: 22 },
    row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    schedulesLabel: {
        fontSize: 20,
        lineHeight: 24,
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
        fontFamily: defaultStyles.urbanistBold.fontFamily,
    },
    tickets: { 
        marginTop: 22,
        paddingBottom: 92
    },
    viewAll: {
        fontSize: 15,
        lineHeight: 18,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        color: colors.light.primary,
    },
});
 
export default BookingIndexPage;
