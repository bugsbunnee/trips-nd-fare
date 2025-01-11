import React from 'react';
import Animated, { ZoomIn } from 'react-native-reanimated';

import { colors, icons } from '@/src/constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { StyleSheet } from 'react-native';
import { Text } from '../ui';

interface Props {
    error: string;
}

const FormError: React.FC<Props> = ({ error }) => {
    if (!error) return null;

    return (  
        <Animated.View entering={ZoomIn} style={styles.container}>
            <MaterialCommunityIcons
              name='information' 
              color={colors.light.danger} 
              size={icons.SIZES.NORMAL} 
            />

            <Text type='default-semibold' style={styles.text} numberOfLines={2}>{error}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 16, 
        borderRadius: 5,
        backgroundColor: colors.light.dangerLight,
        gap: 5, 
        marginBottom: 16
    },
    text: {
        fontSize: 14,
        letterSpacing: 0.25,
        color: colors.light.danger,
        flex: 1,
        alignItems: "flex-start"
    }
})
 
export default FormError;