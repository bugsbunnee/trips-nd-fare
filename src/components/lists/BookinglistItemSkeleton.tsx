import React from 'react';

import { Octicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { colors, icons } from '@/src/constants';
import { Skeleton } from '@/src/components/ui';

const BookingListItemSkeleton: React.FC = () => {
    return ( 
        <View style={[styles.container]}>
            <View style={styles.location}>
                <Skeleton style={styles.image} />

                <View style={styles.flex}>
                    <View style={styles.locationItem}>
                        <Octicons
                            name='paper-airplane' 
                            size={icons.SIZES.NORMAL} 
                            color={colors.light.dark} 
                            style={styles.icon}
                        />

                        <Skeleton style={styles.address} />
                    </View>

                    <View style={styles.locationItem}>
                        <Octicons 
                            name='location'
                            size={icons.SIZES.NORMAL} 
                            color={colors.light.dark} 
                            style={styles.icon}
                        />

                        <Skeleton style={styles.address} />
                    </View>
                </View>
            </View>

            <View style={styles.metadata}>
                <View style={[styles.metadataRow, { paddingTop: 0 }]}>
                    <Skeleton style={styles.metadataLabel} />
                    <Skeleton style={styles.metadataValue} />
                </View>
                <View style={styles.metadataRow}>
                    <Skeleton style={styles.metadataLabel} />
                    <Skeleton style={styles.metadataValue} />
                </View>
                <View style={styles.metadataRow}>
                    <Skeleton style={styles.metadataLabel} />
                    <Skeleton style={styles.metadataValue} />
                </View>
                <View style={[styles.metadataRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
                    <Skeleton style={styles.metadataLabel} />
                    <Skeleton style={styles.metadataValue} />
                </View>
            </View>
        </View>
     );
};

const styles = StyleSheet.create({
    address: { flex: 1, height: 10, borderRadius: 2  },
    container: { padding: 14, backgroundColor: colors.light.white, borderRadius: 16, marginBottom: 10 },
    flex: { flex: 1 },
    icon: { width: 24 },
    location: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    locationItem: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
    image: { width: 79, height: 90, borderRadius: 10 },
    metadata: { padding: 16, marginTop: 16, borderRadius: 16, backgroundColor: colors.light.input },
    metadataRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.light.white },
    metadataLabel: { 
        width: 30,
        height: 10,
        borderRadius: 2,
    },
    metadataValue: { 
        width: 50,
        height: 10,
        borderRadius: 2,
    },
});
 
export default BookingListItemSkeleton;