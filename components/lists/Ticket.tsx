import React from "react";
import DashedLine from "react-native-dashed-line";

import { StyleSheet, TouchableOpacity, View } from "react-native";

import { colors, styles as defaultStyles } from "@/constants";
import { Image, Text } from "../ui";
import { formatAmount, getCountDown, getLocationCode, getTimeFromDate } from "@/utils/lib";
import { Ticket } from "@/utils/models";

interface TicketProps {
    ticket: Ticket;
    onPress: () => void;
    includeCurvatures?: boolean;
}

const TicketItem: React.FC<TicketProps> = ({ ticket, includeCurvatures = true, onPress }) => {
    const countdown = getCountDown(ticket.departureDate, ticket.arrivalDate);

    return ( 
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={[styles.row, styles.padding]}>
                <View>
                    <Text type='default' style={styles.location}>{ticket.location}</Text>
                    <Text type='default' style={styles.code}>{getLocationCode(ticket.location)}</Text>
                    <Text type='default' style={styles.time}>{getTimeFromDate(ticket.departureDate)}</Text>
                </View>

                <View style={styles.flex}>
                    <View style={styles.row}>
                        <View style={styles.dot} />

                        <DashedLine 
                            dashLength={2} 
                            dashThickness={1} 
                            dashGap={3} 
                            style={styles.dash}
                            dashColor={colors.light.borderMid} 
                        />
                        
                        <View style={styles.imageContainer}>
                            <Image src={require("../../assets/images/journey.png")} style={styles.image} />
                        </View>
                        
                        <DashedLine 
                            dashLength={2} 
                            dashThickness={1} 
                            dashGap={3} 
                            style={styles.dash}
                            dashColor={colors.light.borderMid} 
                        />

                        <View style={styles.dot} />
                    </View>

                    <Text type='default' style={styles.duration}>{countdown.days > 0 ? countdown.days + 'D' : null} {countdown.hours}H {countdown.minutes}M</Text>
                </View>

                <View>
                    <Text type='default' style={styles.location}>{ticket.destination}</Text>
                    <Text type='default' style={styles.code}>{getLocationCode(ticket.destination)}</Text>
                    <Text type='default' style={styles.time}>{getTimeFromDate(ticket.arrivalDate)}</Text>
                </View>
            </View>

            <View style={styles.separator}>
                {includeCurvatures && <View style={[styles.ball, { left: -14 }]} />}
               
               <DashedLine 
                    dashLength={2} 
                    dashThickness={1} 
                    dashGap={3} 
                    style={{ flex: 0.9, marginHorizontal: 9 }}
                    dashColor={colors.light.borderMid} 
                /> 

                {includeCurvatures && <View style={[styles.ball, { right: -14 }]} />}
            </View>
            
            <View style={[styles.bottom, styles.padding]}>
               <Image
                    src={ticket.company}
                    style={styles.company}
                />

                <Text type="default-semibold" style={styles.amount}>
                    <Text type="default-semibold">{formatAmount(ticket.amount)}</Text>
                    <Text type="default-semibold" style={styles.amountLabel}>/Trip</Text>
                </Text>
            </View>
        </TouchableOpacity>
     );
};

const styles  = StyleSheet.create({
    amount: {
        color: colors.light.primary,
        fontSize: 18,
        lineHeight: 22,
        fontWeight: defaultStyles.urbanistBold.fontWeight,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
    },
    amountLabel: {
        color: colors.light.graySemi,
        fontSize: 14,
        lineHeight: 17,
        fontWeight: defaultStyles.urbanistMedium.fontWeight,
        fontFamily: defaultStyles.urbanistMedium.fontFamily,
    },
    ball: {
        width: 28,
        height: 28,
        borderRadius: 28,
        position: "absolute",
        backgroundColor: colors.light.input,
    },
    bottom: { 
        flexDirection: "row", 
        alignItems: "center",
        justifyContent: "space-between",
    },
    code: {
        color: colors.light.primary,
        fontSize: 16,
        lineHeight: 26,
        fontWeight: defaultStyles.urbanistBold.fontWeight,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        textTransform: "uppercase"
    },
    company: { 
        width: 35,
        height: 15,
        contentFit: "contain"
    },
    container: {
        width: "100%",
        backgroundColor: colors.light.white,
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 23,
        maxHeight: 180,
    },
    dash: { width: 66 },
    dot: { 
        backgroundColor: colors.light.borderMid,
        width: 7,
        height: 7,
        borderRadius: 7
    },
    duration: {
        color: colors.light.graySemi,
        fontSize: 12,
        lineHeight: 26,
        fontWeight: defaultStyles.urbanistSemibold.fontWeight,
        fontFamily: defaultStyles.urbanistSemibold.fontFamily,
        textTransform: "uppercase",
    },
    flex: { flex: 1 },
    image: { width: 18, height: 18, contentFit: "contain" },
    imageContainer: { 
        width: 35, 
        height: 35,
        borderRadius: 35,
        backgroundColor: colors.light.dew,
        justifyContent: "center",
        alignItems: "center",
    },
    location: {
        color: colors.light.graySemi,
        fontSize: 16,
        lineHeight: 26,
        fontWeight: defaultStyles.urbanistSemibold.fontWeight,
        fontFamily: defaultStyles.urbanistSemibold.fontFamily,
        textTransform: "capitalize"
    },
    row: { 
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    separator: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    time: {
        color: colors.light.graySemi,
        fontSize: 10,
        lineHeight: 26,
        fontWeight: defaultStyles.urbanistBold.fontWeight,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        textTransform: "uppercase"
    },
    padding: {
        paddingVertical: 8,
        paddingHorizontal: 20
    }
});
 
export default TicketItem;