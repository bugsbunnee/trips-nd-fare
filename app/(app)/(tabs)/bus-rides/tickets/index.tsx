import React, { useCallback } from "react";
import _ from "lodash";

import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { colors, icons, styles as defaultStyles } from "@/src/constants";
import { Text } from "@/src/components/ui";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { getBusTickets } from "@/src/store/data/actions";

import Conditional from "@/src/components/common/Conditional";
import TicketItem from "@/src/components/lists/Ticket";
import TicketItemSkeleton from "@/src/components/lists/TicketSkeleton";
import EmptyItem from "@/src/components/lists/EmptyItem";

const AvailableTicketsPage: React.FC = () => {
    const insets = useSafeAreaInsets();
    const dispatch = useAppDispatch();

    const data = useAppSelector((state) => state.data);

    const handleRefresh = useCallback(() => {
        dispatch(getBusTickets());
    }, [dispatch]);

    return ( 
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <FlatList
                onRefresh={handleRefresh}
                data={data.busTickets}
                refreshing={data.isLoading}
                keyExtractor={(ticket, index) => ticket.details.ticketId + index}
                renderItem={({ item }) => (
                    <TicketItem
                        ticket={item}
                        onPress={() => router.push({
                            pathname: '/bus-rides/tickets/[id]',
                            params: { id: item.details.ticketId }
                        })}
                    />
                )}
                ListHeaderComponent={() => (
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
                                Available Tickets
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
                )}
                ListEmptyComponent={() => (
                    <>
                        <Conditional visible={!data.isLoading}>
                            <EmptyItem
                                label='No Tickets Available Yet' 
                                description="Tickets will show here when available!"
                                onRefresh={handleRefresh}
                            />
                        </Conditional>

                        <Conditional visible={data.isLoading}>
                            {_.range(1, 4).map((fill) => (
                                <TicketItemSkeleton key={fill} />
                            ))}
                        </Conditional>
                    </>
                )}
            />
        </View>
     );
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
        backgroundColor: colors.light.dew,
        flex: 1,
        paddingHorizontal: 16
    },
    flex: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15
    },
    title: {
        fontSize: 20,
        lineHeight: 28,
        color: colors.light.dark,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        textAlign: "center"
    },
});
 
export default AvailableTicketsPage;