import React, { useCallback, useEffect } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors, icons } from '@/src/constants';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { Link, useFocusEffect } from 'expo-router';
import { getNotifications } from '@/src/store/data/actions';

const Notification: React.FC = () => {
    const notifications = useAppSelector((state) => state.data.notifications);
    const dispatch = useAppDispatch();

    useFocusEffect(
        useCallback(() => {
            dispatch(getNotifications());
        }, [dispatch])
    );

    return ( 
        <Link href='/home/notifications' asChild>
            <TouchableOpacity style={styles.notification}>
                {notifications.hasUnread && <View style={styles.dot} />}
                
                <Ionicons 
                    name='notifications-outline' 
                    size={icons.SIZES.NORMAL} 
                    color={colors.light.dark} 
                />
            </TouchableOpacity>
        </Link>
     );
}

const styles = StyleSheet.create({
    dot: { width: 6, height: 6, borderRadius: 6, backgroundColor: colors.light.primary, position: 'absolute', top: 2, left: 14, elevation: 10, zIndex: 10 },
    notification: { width: 28, height: 28, backgroundColor: colors.light.white, borderRadius: 40, justifyContent: 'center', alignItems: 'center' },
})
 
export default Notification;