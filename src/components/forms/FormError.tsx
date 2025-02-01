import React from 'react';

import { colors, icons } from '@/src/constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { StyleSheet, View } from 'react-native';
import { Text } from '@/src/components/ui';

interface Props {
    error: string;
}

const FormError: React.FC<Props> = ({ error }) => {
    if (!error) return null;

    return (  
        <View style={styles.container}>
            <MaterialCommunityIcons
              name='information' 
              color={colors.light.danger} 
              size={icons.SIZES.NORMAL} 
            />

            <Text type='default-semibold' style={styles.text} numberOfLines={2}>{error}</Text>
        </View>
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