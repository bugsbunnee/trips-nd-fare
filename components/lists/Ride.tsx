import React from 'react';

import { Octicons } from '@expo/vector-icons';
import { Image, StyleSheet, View } from 'react-native';

import { colors, icons, styles as defaultStyles } from '@/constants';
import { Text } from '../ui';
import { formatDate } from '@/utils/lib';

interface UserRide {
    carSeats: number;
    date: string;
    driverName: string;
    status: 'paid' | 'pending';
    toAddress: string;
    fromAddress: string;
}

const Ride: React.FC<UserRide> = ({ carSeats, date, driverName, status, toAddress, fromAddress }) => {
    return ( 
        <View style={[styles.container]}>
            <View style={styles.location}>
                <Image source={require('@/assets/images/map.png')} alt='Map' style={styles.image} />

                <View>
                    <View style={styles.locationItem}>
                        <Octicons
                            name='paper-airplane' 
                            size={icons.SIZES.NORMAL} 
                            color={colors.light.dark} 
                        />

                        <Text type='default' style={styles.address}>{fromAddress}</Text>
                    </View>

                    <View style={styles.locationItem}>
                        <Octicons 
                            name='location'
                            size={icons.SIZES.NORMAL} 
                            color={colors.light.dark} 
                        />

                        <Text type='default' style={styles.address}>{toAddress}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.metadata}>
                <View style={[styles.metadataRow, { paddingTop: 0 }]}>
                    <Text type='default' style={styles.metadataLabel}>Date & Time</Text>
                    <Text type='default-semibold' style={styles.metadataValue}>{formatDate(date)}</Text>
                </View>
                <View style={styles.metadataRow}>
                    <Text type='default' style={styles.metadataLabel}>Driver</Text>
                    <Text type='default-semibold' style={styles.metadataValue}>{driverName}</Text>
                </View>
                <View style={styles.metadataRow}>
                    <Text type='default' style={styles.metadataLabel}>Car seats</Text>
                    <Text type='default-semibold' style={styles.metadataValue}>{carSeats}</Text>
                </View>
                <View style={[styles.metadataRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
                    <Text type='default' style={styles.metadataLabel}>Payment Status</Text>
                    <Text type='default-semibold' style={[styles.metadataValue, { color: colors.light.primary }]}>{status}</Text>
                </View>
            </View>
        </View>
     );
};

const styles = StyleSheet.create({
    address: { color: colors.light.dark, fontSize: 13, lineHeight: 18 },
    container: { padding: 14,  backgroundColor: colors.light.white,  borderRadius: 16 },
    location: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    locationItem: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
    image: { width: 79, height: 90, resizeMode: 'contain' },
    metadata: { padding: 16, marginTop: 16, borderRadius: 16, backgroundColor: colors.light.dangerLight },
    metadataRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.light.white },
    metadataLabel: { color: colors.light.gray, fontSize: 15, lineHeight: 20 },
    metadataValue: { color: colors.light.dark, fontSize: 15, lineHeight: 20, textTransform: 'capitalize' },
});
 
export default Ride;