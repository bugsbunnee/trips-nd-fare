import React from 'react';

import { AntDesign, Octicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { colors, icons, styles as defaultStyles } from '@/src/constants';
import { Image, Text } from '@/src/components/ui';
import { formatDate } from '@/src/utils/lib';
import { Booking } from '@/src/utils/models';
import Conditional from '../common/Conditional';

interface Props {
    booking: Booking;
    date: string | Date;
    isScheduled?: boolean;
    showDriver?: boolean;
    backgroundColor?: string;
}

const BookingListItem: React.FC<Props> = ({ booking, date, backgroundColor = colors.light.primaryLight, isScheduled = false }) => {
    return ( 
        <View style={[styles.container]}>
            <Conditional visible={isScheduled}>
                <View style={styles.calendar}>
                    <AntDesign
                        name='calendar'
                        size={icons.SIZES.SMALL}
                        color={colors.light.black}
                    />
                </View>
            </Conditional>

            <View style={styles.location}>
                <Image 
                    contentFit='contain' 
                    src={require('@/src/assets/images/map.png')} 
                    alt='Map' style={styles.image}
                />

                <View style={styles.flex}>
                    <View style={styles.locationItem}>
                        <Octicons
                            name='paper-airplane' 
                            size={icons.SIZES.NORMAL} 
                            color={colors.light.dark} 
                            style={styles.icon}
                        />

                        <Text type='default' style={[styles.address, isScheduled ? styles.primary : styles.secondary]}>{booking.from.address}</Text>
                    </View>

                    <View style={styles.locationItem}>
                        <Octicons 
                            name='location'
                            size={icons.SIZES.NORMAL} 
                            color={colors.light.dark} 
                            style={styles.icon}
                        />

                        <Text type='default' style={[styles.address, isScheduled ? styles.primary : styles.secondary]}>{booking.to.address}</Text>
                    </View>
                </View>
            </View>

            <View style={[styles.metadata, { backgroundColor }]}>
                <View style={[styles.metadataRow, { paddingTop: 0 }]}>
                    <Text type='default' style={styles.metadataLabel}>Date & Time</Text>
                    <Text type='default-semibold' style={styles.metadataValue}>{formatDate(date)}</Text>
                </View>
                <Conditional visible={!isScheduled}>
                    <View style={styles.metadataRow}>
                        <Text type='default' style={styles.metadataLabel}>Driver</Text>
                        <Text type='default-semibold' style={styles.metadataValue}>{booking.driver.firstName}</Text>
                    </View>
                </Conditional>
                <Conditional visible={booking.bookedSeats.length === 0}>
                    <View style={styles.metadataRow}>
                        <Text type='default' style={styles.metadataLabel}>Car seats</Text>
                        <Text type='default-semibold' style={styles.metadataValue}>{5}</Text>
                    </View>
                </Conditional>
                <Conditional visible={booking.bookedSeats.length > 0}>
                    <View style={styles.metadataRow}>
                        <Text type='default' style={styles.metadataLabel}>Seat Number</Text>
                        <Text type='default-semibold' style={styles.metadataValue}>{booking.bookedSeats.map((seat) => `S${seat}`).join(', ')}</Text>
                    </View>
                </Conditional>
                <View style={[styles.metadataRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
                    <Text type='default' style={styles.metadataLabel}>Payment Status</Text>
                    <Text type='default-semibold' style={[styles.metadataValue, { color: colors.light.primary }]}>{booking.rideStatus}</Text>
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
        lineHeight: 18,
        flex: 1,
        textAlign: 'left'
    },
    calendar: { top: 16, right: 16, position: 'absolute' },
    container: { padding: 14,  backgroundColor: colors.light.white,  borderRadius: 16 },
    flex: { flex: 1 },
    icon: { width: 24 },
    location: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    locationItem: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
    image: { width: 79, height: 90, borderRadius: 10 },
    metadata: { padding: 16, marginTop: 16, borderRadius: 16 },
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
    primary: { color: colors.light.primary, fontFamily: defaultStyles.urbanistSemibold.fontFamily },
    secondary: { color: colors.light.dark },
});
 
export default BookingListItem;