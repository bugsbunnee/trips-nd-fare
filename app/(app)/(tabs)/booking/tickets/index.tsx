import React from "react";

import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { TICKETS } from "@/utils/data";
import { colors, icons, styles as defaultStyles } from "@/constants";
import { Text } from "@/components/ui";

import TicketItem from "@/components/lists/Ticket";

const AvailableTicketsPage: React.FC = () => {
    const insets = useSafeAreaInsets();

    return ( 
        <View style={[styles.container, { paddingTop: insets.top }]}>
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

            <FlatList
                data={TICKETS}
                keyExtractor={(ticket) => ticket.id.toString()}
                renderItem={({ item }) => (
                    <TicketItem
                        key={item.id}
                        ticket={item}
                        onPress={() => router.push({
                            pathname: '/booking/tickets/[id]',
                            params: { id: item.id }
                        })}
                    />
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