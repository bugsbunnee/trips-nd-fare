import React from 'react';

import { Octicons } from '@expo/vector-icons';
import { Image, StyleSheet, View } from 'react-native';

import { colors, icons, styles as defaultStyles } from '@/constants';
import { Text } from '../ui';
import { formatDate } from '@/utils/lib';
import { UserRide } from '@/utils/models';

interface Props {
    ride: UserRide,
    backgroundColor?: string;
}

const Ride: React.FC<Props> = ({ ride, backgroundColor = colors.light.primaryLight }) => {
    const { carSeats, date, driverName, status, toAddress, fromAddress } = ride;

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
                            style={styles.icon}
                        />

                        <Text type='default' style={styles.address}>{fromAddress}</Text>
                    </View>

                    <View style={styles.locationItem}>
                        <Octicons 
                            name='location'
                            size={icons.SIZES.NORMAL} 
                            color={colors.light.dark} 
                            style={styles.icon}
                        />

                        <Text type='default' style={styles.address}>{toAddress}</Text>
                    </View>
                </View>
            </View>

            <View style={[styles.metadata, { backgroundColor }]}>
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
    address: { 
        fontWeight: defaultStyles.urbanistMedium.fontWeight,
        fontFamily: defaultStyles.urbanistMedium.fontFamily,
        color: colors.light.dark, 
        fontSize: 13, 
        lineHeight: 18 
    },
    container: { padding: 14,  backgroundColor: colors.light.white,  borderRadius: 16 },
    icon: { width: 24 },
    location: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    locationItem: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
    image: { width: 79, height: 90, resizeMode: 'contain' },
    metadata: { padding: 16, marginTop: 16, borderRadius: 16, backgroundColor: colors.light.dangerLight },
    metadataRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.light.white },
    metadataLabel: { 
        fontWeight: defaultStyles.urbanistMedium.fontWeight,
        fontFamily: defaultStyles.urbanistMedium.fontFamily,
        color: colors.light.gray, 
        fontSize: 15, 
        lineHeight: 20 
    },
    metadataValue: { 
        color: colors.light.dark, 
        fontSize: 15, 
        lineHeight: 20, 
        textTransform: 'capitalize',
        fontWeight: defaultStyles.urbanistSemibold.fontWeight,
        fontFamily: defaultStyles.urbanistSemibold.fontFamily,
    },
});
 
export default Ride;