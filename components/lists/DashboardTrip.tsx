import Animated from "react-native-reanimated";
import dayjs from "dayjs";

import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useState } from "react";

import { Text } from "@/components/ui";
import { colors, app } from "@/constants";

import useFluidButtonStyle from "@/hooks/useFluidButtonStyle";

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
            <Text type='default-semibold' style={isActive ? styles.tableHeaderActiveText : styles.tableHeaderInactiveText}>
                {label}
            </Text>
        </AnimatedTouchable>
    )
};

const DashboardTrips = () => {
    const [orderBy, setOrderBy] = useState('date');

    return ( 
        <FlatList
            data={app.RIDES}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
                <View style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? colors.light.borderLight : colors.light.background }]}>
                    <Text type='default-semibold' style={styles.tableRowText}>{dayjs(item.date).format('DD MMM.')}</Text>
                    <Text type='default-semibold' style={styles.tableRowText}>{item.type}</Text>
                    <Text type='default-semibold' style={styles.tableRowText}>{dayjs(item.date).format('HH:mm A')}</Text>
                    <Text type='default-semibold' style={styles.tableRowText}>{process.env.EXPO_PUBLIC_CURRENCY}{item.price}</Text>
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
        />
     );
};

const styles = StyleSheet.create({
    tableRow: { flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 4, alignItems: 'center' },
    tableHeader: { flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 4, gap: 5, alignItems: 'center', backgroundColor: colors.light.primaryLight, marginBottom: 10 },
    tableHeaderActive: { paddingHorizontal: 11, paddingVertical: 5, backgroundColor: colors.light.primary, borderRadius: 4, flex: 1 },
    tableHeaderInactive: { paddingHorizontal: 11, paddingVertical: 5, backgroundColor: 'transparent', borderRadius: 4, flex: 1 },
    tableHeaderActiveText: { color: colors.light.white, fontSize: 14, lineHeight: 16, textAlign: 'center' },
    tableHeaderInactiveText: { color: colors.light.dark, fontSize: 14, lineHeight: 16, textAlign: 'center' },
    tableRowText: { color: colors.light.graySemi, fontSize: 14, lineHeight: 16, flex: 1, textAlign: 'center' }
});
 
export default DashboardTrips;