import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Notification } from '@/src/utils/models';
import { Text } from '../ui';

import { colors, styles as defaultStyles } from '@/src/constants';
import { getRelativeTime } from '@/src/utils/lib';

interface Props {
    notification: Notification;
    onPress?: () => void;
}

const NotificationItem: React.FC<Props> = ({ notification, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.flex}>
                <Text type='default-semibold' style={styles.title}>{notification.title}</Text>

                <Text type='default-semibold' style={[styles.description, styles.label]}>{notification.body}</Text>
                
                <Text type='default-semibold' style={[styles.description, styles.date]}>{getRelativeTime(notification.createdAt)}</Text>
            </View>

            <View style={[styles.dot, notification.isRead ? styles.read : styles.unread]} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center', gap: 45, paddingVertical: 16 },
    description: {
        fontSize: 14,
        lineHeight: 28,
        fontFamily: defaultStyles.urbanistSemibold.fontFamily,
    },
    dot: {
        width: 7,
        height: 7,
        borderRadius: 7,
    },
    date: { color: colors.light.gray, textTransform: 'capitalize' },
    flex: { flex: 1 },
    title: {
        fontSize: 18,
        lineHeight: 28,
        fontFamily: defaultStyles.urbanistSemibold.fontFamily,
        color: colors.light.black,
    },
    label: { color: colors.light.borderMid },
    read: { backgroundColor: colors.light.borderMid },
    unread: { backgroundColor: colors.light.primary }
});

export default NotificationItem;