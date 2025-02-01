import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Skeleton } from '../ui';
import { colors } from '@/src/constants';

const NotificationItemSkeleton: React.FC = () => {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.flex}>
                <Skeleton style={styles.title} />
                <Skeleton style={styles.description} />
                <Skeleton style={styles.date} />
            </View>

            <Skeleton style={styles.dot} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center', gap: 45, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.light.dewDark },
    dot: {
        width: 7,
        height: 7,
        borderRadius: 7,
    },
    flex: { flex: 1 },
    date: { width: '30%', height: 8, borderRadius: 2 },
    description: { width: '80%', height: 8, borderRadius: 2, marginVertical: 8 },
    title: { width: '60%', height: 8, borderRadius: 2 },
});

export default NotificationItemSkeleton;