import React from "react";
import DashedLine from "react-native-dashed-line";

import { StyleSheet, TouchableOpacity, View } from "react-native";

import { colors, styles as defaultStyles } from "@/src/constants";
import { Image, Skeleton, Text } from "@/src/components/ui";
import { BusTicket } from "@/src/utils/models";


const TicketItemSkeleton: React.FC = () => {
    return ( 
        
        <View style={styles.container}>
            <View style={[styles.row, styles.flex, styles.padding]}>
                <View style={styles.textDetails}>
                    <Skeleton style={styles.state} />
                    <Skeleton style={styles.code} />
                    <Skeleton style={styles.date} />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <View style={styles.dot} />
                    
                    <DashedLine 
                        dashLength={2} 
                        dashThickness={1} 
                        dashGap={3} 
                        style={styles.dash}
                        dashColor={colors.light.borderMid} 
                    />
                    
                    <Skeleton style={styles.image} />

                    <DashedLine 
                        dashLength={2} 
                        dashThickness={1} 
                        dashGap={3} 
                        style={styles.dash}
                        dashColor={colors.light.borderMid} 
                    />

                    <View style={styles.dot} />
                </View>

                <View style={styles.textDetails}>
                    <Skeleton style={styles.state} />
                    <Skeleton style={styles.code} />
                    <Skeleton style={styles.date} />
                </View>
            </View>

            <View style={styles.separator}>
                <View style={[styles.ball, { left: -14 }]} />

                <DashedLine 
                    dashLength={2} 
                    dashThickness={1} 
                    dashGap={3} 
                    style={{ flex: 0.9, marginHorizontal: 9 }}
                    dashColor={colors.light.borderMid} 
                /> 

                <View style={[styles.ball, { right: -14 }]} />
            </View>

            <View style={[styles.bottom, styles.padding]}>
                <Skeleton style={styles.company} />
                <Skeleton style={styles.price} />
            </View>
        </View>
    );
};

const styles  = StyleSheet.create({
    ball: {
        width: 28,
        height: 28,
        borderRadius: 28,
        position: "absolute",
        backgroundColor: colors.light.input,
    },
    bottom: { flex: 0.4, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    code: { width: '50%', marginVertical: 5, borderRadius: 2, height: 10 },
    company: { 
        width: 35,
        height: 15.5,
        borderRadius: 2 
    },
    container: {
        flex: 1,
        backgroundColor: colors.light.white,
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 23,
        maxHeight: 180,
        minHeight: 152,
    },
    dash: { flex: 1 },
    date: { width: '70%', borderRadius: 2, height: 8 },
    dot: { 
        backgroundColor: colors.light.borderMid,
        width: 7,
        height: 7,
        borderRadius: 7
    },
    flex: { flex: 1 },
    image: { 
        width: 35, 
        height: 35,
        borderRadius: 35,
    },
    price: { width: 80, height: 15.5, borderRadius: 2 },
    row: { 
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
    },
    separator: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 8
    },
    state: { width: '100%', borderRadius: 2, height: 10 },
    textDetails: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    padding: {
        paddingVertical: 8,
        paddingHorizontal: 20
    }
});
 
export default TicketItemSkeleton;