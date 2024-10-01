import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors, icons } from '@/constants';

interface Props {
    hasUnread: boolean;
}

const Notification: React.FC<Props> = ({ hasUnread }) => {
    return ( 
        <TouchableOpacity style={styles.notification}>
            {hasUnread && <View style={styles.dot} />}
            
            <Ionicons 
                name='notifications-outline' 
                size={icons.SIZES.NORMAL} 
                color={colors.light.dark} 
            />
        </TouchableOpacity>
     );
}

const styles = StyleSheet.create({
    dot: { width: 6, height: 6, borderRadius: 6, backgroundColor: colors.light.primary, position: 'absolute', top: 8, right: 13 },
    notification: { width: 40, height: 40, backgroundColor: colors.light.white, borderRadius: 40, justifyContent: 'center', alignItems: 'center' },
})
 
export default Notification;