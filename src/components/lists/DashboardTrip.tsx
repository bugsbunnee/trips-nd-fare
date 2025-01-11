
import React, { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

import Animated from "react-native-reanimated";
import dayjs from "dayjs";
import _ from 'lodash';

import Conditional from "@/src/components/common/Conditional";
import EmptyItem from "@/src/components/lists/EmptyItem";

import { Skeleton, Text } from "@/src/components/ui";
import { colors, styles as defaultStyles } from "@/src/constants";
import { formatAmount } from "@/src/utils/lib";

import useFluidButtonStyle from "@/src/hooks/useFluidButtonStyle";
import useBookings from "@/src/hooks/useRecentBookings";

interface TableCellProps {
    isActive: boolean;
    label: string;
    onPress: () => void;
}

const TableHeaderCell: React.FC<TableCellProps> = ({ isActive, label, onPress }) => {
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

    const style = useFluidButtonStyle({ 
        triggerAnimation: isActive, 
        colorList: ['transparent', colors.light.primary],
    });

    return (
        <AnimatedTouchable style={[isActive ? styles.tableHeaderActive : styles.tableHeaderInactive, style]} onPress={onPress}>
            <Text type='default-semibold' style={[styles.tableHeaderText, isActive ? styles.tableHeaderActiveText : styles.tableHeaderInactiveText]}>
                {label}
            </Text>
        </AnimatedTouchable>
    )
};

const DashboardTrips: React.FC = () => {
    const [orderBy, setOrderBy] = useState('date');
    const bookings = useBookings();

    return ( 
        <View style={styles.container}>
            <FlatList
                data={bookings.bookings.slice(0, 4)}
                refreshing={bookings.isLoading}
                onRefresh={bookings.onRefresh}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }) => (
                    <View style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? colors.light.borderLight : colors.light.background }]}>
                        <Text type='default-semibold' style={styles.tableRowText}>{dayjs(item.createdAt).format('DD MMM.')}</Text>
                        <Text type='default-semibold' style={styles.tableRowText}>{item.driver.serviceCode}</Text>
                        <Text type='default-semibold' style={styles.tableRowText}>{dayjs(item.createdAt).format('HH:mm A')}</Text>
                        <Text type='default-semibold' style={styles.tableRowText}>{formatAmount(item.price)}</Text>
                    </View>
                )}
                ListHeaderComponent={() => (
                    <View style={styles.tableHeader}>
                        <TableHeaderCell 
                            isActive={orderBy === 'date'} 
                            label="Date" 
                            onPress={() => setOrderBy('date')}
                        />
                        <TableHeaderCell 
                            isActive={orderBy === 'type'} 
                            label="Location" 
                            onPress={() => setOrderBy('type')}
                        />
                        <TableHeaderCell 
                            isActive={orderBy === 'time'} 
                            label="Time" 
                            onPress={() => setOrderBy('time')}
                        />
                        <TableHeaderCell 
                            isActive={orderBy === 'price'} 
                            label="Price" 
                            onPress={() => setOrderBy('price')}
                        />
                    </View>
                )}
                ListEmptyComponent={() => (
                    <>
                        <Conditional visible={!bookings.isLoading}>
                            <EmptyItem
                                label='No Trips Yet' 
                                description="You haven't booked any trips yet!"
                                onRefresh={bookings.onRefresh}
                            />
                        </Conditional>

                        <Conditional visible={bookings.isLoading}>
                            {_.range(1, 5).map((fill) => (
                                <View key={fill} style={[styles.tableRow, styles.skeletonContainer]}>
                                    <Skeleton style={styles.skeleton} />
                                    <Skeleton style={styles.skeleton} />
                                    <Skeleton style={styles.skeleton} />
                                    <Skeleton style={styles.skeleton} />
                                </View>
                            ))}
                        </Conditional>
                    </>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {  },
    skeleton: { height: 10, flex: 1, borderRadius: 2 },
    skeletonContainer: { backgroundColor: colors.light.background, gap: 10 },
    tableRow: { flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 4, alignItems: 'center' },
    tableHeader: { flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 4, gap: 5, alignItems: 'center', backgroundColor: colors.light.primaryLight, marginBottom: 10 },
    tableHeaderActive: { paddingHorizontal: 11, paddingVertical: 5, backgroundColor: colors.light.primary, borderRadius: 4, flex: 1 },
    tableHeaderInactive: { paddingHorizontal: 11, paddingVertical: 5, backgroundColor: 'transparent', borderRadius: 4, flex: 1 },
    tableHeaderText: { 
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        fontSize: 14, 
        lineHeight: 16, 
        textAlign: 'center' 
    },
    tableHeaderActiveText: { 
        color: colors.light.white, 
    },
    tableHeaderInactiveText: { 
        color: colors.light.dark, 
    },
    tableRowText: { 
        color: colors.light.graySemi,
        fontSize: 14, 
        lineHeight: 16, 
        flex: 1, 
        textAlign: 'center',
        fontWeight: defaultStyles.urbanistSemibold.fontWeight,
        fontFamily: defaultStyles.urbanistSemibold.fontFamily,
    }
});
 
export default DashboardTrips;